// ═══════════════════════════════════════════════════════════════════════════
// Policy Gap Analysis — framework-agnostic analyzer that evaluates a
// governance policy against every control of a selected framework using an
// AI engine (Anthropic Claude by default; other providers are pluggable).
//
// Design notes
// ─────────────
// • Frameworks are data, not code. FW and FW_META are shared with the browser
//   via framework-data.js. Iteration is uniform: every framework looks the
//   same to the analyzer.
// • Analyze control-by-control. Stuffing an entire catalog plus policy into
//   one prompt degrades accuracy dramatically. Per-control calls run in
//   parallel with a bounded concurrency limit (default 5).
// • Structured JSON via tool-use. The model is forced to invoke the
//   report_control_analysis tool; the schema guarantees every result carries
//   status / confidence / evidence_quotes / gap / remediation.
// • Evidence quotes are verified server-side against the policy text. If a
//   claimed "met" has no verifiable quote, we downgrade to "gap" — this is
//   the hedge against hallucinated compliance.
// • Catalogs are versioned. Each stored analysis records the version string
//   from FW_META so reports remain reproducible when frameworks are revised.
// • Prompt caching is applied to the system prompt and the policy body, so
//   per-control calls within a run only pay the tokens for the control text.
// ═══════════════════════════════════════════════════════════════════════════

const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Framework catalogs are shared between browser and Node. The shim at the end
// of framework-data.js re-exports them via module.exports when running in
// Node; in the browser it's a no-op because `module` is undefined there.
const { FW, FW_META } = require(path.join(__dirname, "public", "js", "framework-data.js"));

// Optional AI SDKs — loaded lazily so the server still starts if the user
// hasn't run `npm install` yet. The policy-gap endpoint returns a clear 503
// in that case.
let Anthropic = null;
try {
  const mod = require("@anthropic-ai/sdk");
  Anthropic = mod.default || mod.Anthropic || mod;
} catch (e) {
  console.warn("@anthropic-ai/sdk not installed — policy gap analysis disabled until `npm install`");
}

const DEFAULT_CONCURRENCY = 5;
const DEFAULT_ANTHROPIC_MODEL = "claude-opus-4-7";

// Provider registry — the UI uses this to render the AI Providers section in
// Settings. Adding a new engine is: add an entry here, add a buildClient and
// analyzeControl branch below, surface the provider in the UI dropdown.
const PROVIDER_DEFAULTS = {
  anthropic:    { label: "Anthropic Claude", defaultModel: DEFAULT_ANTHROPIC_MODEL, fields: ["apiKey", "model"],                           implemented: true  },
  openai:       { label: "OpenAI",           defaultModel: "gpt-4o",                 fields: ["apiKey", "model"],                           implemented: false },
  azure_openai: { label: "Azure OpenAI",     defaultModel: "",                       fields: ["apiKey", "endpoint", "deployment", "model"], implemented: false },
  google:       { label: "Google Gemini",    defaultModel: "gemini-2.5-pro",         fields: ["apiKey", "model"],                           implemented: false }
};

// ─── Config accessors ────────────────────────────────────────────────────
async function getAiConfig(db) {
  const rec = await db.ai_config.findOne({ _id: "ai_providers" });
  if (rec) return rec;
  const seed = {
    _id: "ai_providers",
    activeProvider: "anthropic",
    providers: {
      anthropic:    { enabled: true,  apiKey: "", model: PROVIDER_DEFAULTS.anthropic.defaultModel },
      openai:       { enabled: false, apiKey: "", model: PROVIDER_DEFAULTS.openai.defaultModel },
      azure_openai: { enabled: false, apiKey: "", endpoint: "", deployment: "", model: "" },
      google:       { enabled: false, apiKey: "", model: PROVIDER_DEFAULTS.google.defaultModel }
    }
  };
  await db.ai_config.insert(seed);
  return seed;
}

function maskConfig(cfg) {
  const out = JSON.parse(JSON.stringify(cfg));
  if (out.providers) {
    for (const k of Object.keys(out.providers)) {
      const p = out.providers[k] || {};
      if (p.apiKey) p.apiKey = "•".repeat(Math.min(String(p.apiKey).length, 32));
    }
  }
  return out;
}

// ─── Anthropic client factory ────────────────────────────────────────────
function buildAnthropicClient(cfg) {
  if (!Anthropic) throw new Error("Anthropic SDK is not installed. Run `npm install` in the grc-vault directory.");
  const stored = (cfg.providers && cfg.providers.anthropic) || {};
  const apiKey = stored.apiKey || process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("No Anthropic API key configured. Set one under Settings → AI Providers, or export ANTHROPIC_API_KEY.");
  const model = stored.model || DEFAULT_ANTHROPIC_MODEL;
  return { client: new Anthropic({ apiKey }), model };
}

// ─── Tool schema ─────────────────────────────────────────────────────────
// Forcing tool_use guarantees structured output. The analyzer will reject
// any response that doesn't include this tool call.
const CONTROL_TOOL = {
  name: "report_control_analysis",
  description: "Report the analysis of a single framework control requirement against a governance policy.",
  input_schema: {
    type: "object",
    required: ["status", "confidence", "evidence_quotes", "gap_description", "remediation", "remediation_effort"],
    properties: {
      status: {
        type: "string",
        enum: ["met", "partial", "gap", "not_applicable"],
        description: "met = policy fully addresses the control; partial = some aspects addressed, clear gaps remain; gap = policy does not address the control; not_applicable = control is clearly outside the scope of this policy type."
      },
      confidence: {
        type: "number",
        minimum: 0,
        maximum: 1,
        description: "Confidence in the assessment, 0.0 to 1.0."
      },
      evidence_quotes: {
        type: "array",
        items: { type: "string" },
        description: "Verbatim quotes from the policy that demonstrate coverage. Required for status 'met' or 'partial'. Never fabricate quotes — only include text that literally appears in the provided policy."
      },
      gap_description: {
        type: "string",
        description: "When status is partial or gap, describe specifically what is missing. Empty string if status is met or not_applicable."
      },
      remediation: {
        type: "string",
        description: "When status is partial or gap, describe the specific language, sections, or clauses the organization should add to the policy. Write it so the user could paste it into a revised policy. Empty string if status is met or not_applicable."
      },
      remediation_effort: {
        type: "string",
        enum: ["low", "medium", "high", "none"],
        description: "Estimated effort to close the gap. Use 'none' when status is met or not_applicable."
      }
    }
  }
};

const SYSTEM_PROMPT = `You are a senior compliance analyst. You evaluate whether a governance policy addresses a specific regulatory or framework control requirement.

Rules:
- "met" status requires at least one direct quote from the policy that substantively addresses the control. Never invent text — only quote text that literally appears in the provided policy body.
- "partial" means the policy touches the topic but clearly leaves some aspects of the requirement uncovered. Quote what is covered; describe what is missing.
- "gap" means the requirement is not addressed. No quotes required. Describe exactly what must be added.
- "not_applicable" is rare — use it only when the control is clearly outside the scope of the policy type being analyzed (e.g., a physical security control against a data retention policy).
- Be conservative. If uncertain between met and partial, choose partial. If uncertain between partial and gap, choose gap.
- Remediation must be specific and actionable — language the policy author could paste into a revised document.

You MUST respond by calling the report_control_analysis tool. Do not respond with prose.`;

// ─── Prompt construction ─────────────────────────────────────────────────
function buildPolicyBlock(policy) {
  const parts = [];
  if (policy.title) parts.push("Policy title: " + policy.title);
  if (policy.type) parts.push("Policy type: " + policy.type);
  if (policy.version) parts.push("Policy version: " + policy.version);
  if (policy.owner) parts.push("Policy owner: " + policy.owner);
  if (policy.content) parts.push("\nPolicy body:\n" + policy.content);
  if (Array.isArray(policy.reqs) && policy.reqs.length) {
    parts.push("\nInternal requirement checklist (evidence notes):");
    for (const r of policy.reqs) {
      const tag = r.met ? " [marked met]" : "";
      const note = r.notes ? " — " + r.notes : "";
      parts.push("- " + (r.text || "") + tag + note);
    }
  }
  return parts.join("\n");
}

function buildUserMessage(policyBlock, control) {
  return [
    // Cache breakpoint: the policy content is repeated across every control
    // call within a run. Marking it ephemeral lets follow-up calls hit the
    // cache and only pay for the control-specific suffix.
    { type: "text", text: policyBlock, cache_control: { type: "ephemeral" } },
    {
      type: "text",
      text:
        "Framework: " + control.framework + " (version " + control.frameworkVersion + ")\n" +
        "Control ID: " + control.id + "\n" +
        "Control requirement: " + control.text + "\n\n" +
        "Analyze whether the policy above addresses this specific control requirement. Call the report_control_analysis tool with your findings."
    }
  ];
}

// ─── Hallucination hedge ─────────────────────────────────────────────────
// Every quote returned as evidence must actually appear in the policy text.
// We match after normalizing whitespace. Unverified quotes are dropped;
// if that leaves no evidence for a met/partial, we downgrade to gap.
function verifyEvidence(result, policyText) {
  const hay = policyText.toLowerCase().replace(/\s+/g, " ");
  const verified = [];
  for (const q of (result.evidence_quotes || [])) {
    if (!q || typeof q !== "string") continue;
    const needle = q.trim().toLowerCase().replace(/\s+/g, " ");
    if (needle.length >= 10 && hay.indexOf(needle) >= 0) verified.push(q.trim());
  }
  result.evidence_quotes = verified;
  if ((result.status === "met" || result.status === "partial") && verified.length === 0) {
    const originalStatus = result.status;
    result.status = "gap";
    result.verification_note = "Model claimed '" + originalStatus + "' but no evidence quote was found in the policy text — downgraded to gap.";
    if (!result.remediation) result.remediation = "Add explicit policy language that covers this control requirement.";
    if (!result.remediation_effort || result.remediation_effort === "none") result.remediation_effort = "medium";
  }
  return result;
}

// ─── Per-control analyzer ────────────────────────────────────────────────
async function analyzeControlAnthropic(client, model, policyBlock, policyTextForVerify, control) {
  const resp = await client.messages.create({
    model: model,
    max_tokens: 1024,
    system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
    tools: [CONTROL_TOOL],
    tool_choice: { type: "tool", name: "report_control_analysis" },
    messages: [{ role: "user", content: buildUserMessage(policyBlock, control) }]
  });
  let parsed = null;
  for (const block of (resp.content || [])) {
    if (block.type === "tool_use" && block.name === "report_control_analysis") {
      parsed = block.input;
      break;
    }
  }
  if (!parsed) {
    return {
      status: "gap", confidence: 0, evidence_quotes: [],
      gap_description: "Model did not return structured output.",
      remediation: "Re-run the analysis.", remediation_effort: "medium",
      error: "no_tool_use"
    };
  }
  const cleaned = {
    status: parsed.status || "gap",
    confidence: typeof parsed.confidence === "number" ? parsed.confidence : 0.5,
    evidence_quotes: Array.isArray(parsed.evidence_quotes) ? parsed.evidence_quotes : [],
    gap_description: parsed.gap_description || "",
    remediation: parsed.remediation || "",
    remediation_effort: parsed.remediation_effort || "medium"
  };
  return verifyEvidence(cleaned, policyTextForVerify);
}

// ─── Bounded-concurrency parallel map ────────────────────────────────────
async function mapWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  async function runner() {
    while (true) {
      const i = cursor++;
      if (i >= items.length) return;
      try {
        results[i] = await worker(items[i], i);
      } catch (e) {
        results[i] = {
          status: "gap", confidence: 0, evidence_quotes: [],
          gap_description: "Analyzer error: " + (e && e.message ? e.message : String(e)),
          remediation: "Retry or check AI provider configuration.",
          remediation_effort: "medium",
          error: e && e.message ? e.message : String(e)
        };
      }
    }
  }
  const runners = Array.from({ length: Math.min(limit, items.length) }, runner);
  await Promise.all(runners);
  return results;
}

// ─── Summary roll-up ─────────────────────────────────────────────────────
function summarize(results) {
  const summary = { met: 0, partial: 0, gap: 0, not_applicable: 0, errors: 0, total: results.length };
  let confSum = 0, confCount = 0;
  for (const r of results) {
    if (!r) continue;
    if (r.error && !r.status) { summary.errors++; continue; }
    const s = r.status || "gap";
    if (summary[s] !== undefined) summary[s]++;
    if (typeof r.confidence === "number") { confSum += r.confidence; confCount++; }
  }
  const evaluated = summary.met + summary.partial + summary.gap;
  summary.coveragePct = evaluated > 0
    ? Math.round(((summary.met + summary.partial * 0.5) / evaluated) * 100)
    : 0;
  summary.avgConfidence = confCount > 0 ? +(confSum / confCount).toFixed(2) : 0;
  return summary;
}

// ─── Route mounting ──────────────────────────────────────────────────────
function mountGapRoutes(app, db, logAudit) {
  // Framework catalog (read-only). The client already has FW bundled, but
  // this endpoint lets the UI query versions/control counts cheaply and is
  // useful for any future headless tooling.
  app.get("/api/frameworks", (req, res) => {
    const out = {};
    for (const name of Object.keys(FW)) {
      out[name] = {
        ref: FW[name].ref,
        meta: FW_META[name] || null,
        controlCount: (FW[name].controls || []).length
      };
    }
    res.json({ ok: true, data: out });
  });

  // Single-framework catalog fetch (for framework-update suggestions).
  app.get("/api/frameworks/:name", (req, res) => {
    const fw = FW[req.params.name];
    if (!fw) return res.status(404).json({ ok: false, error: "Unknown framework" });
    res.json({
      ok: true,
      data: {
        name: req.params.name,
        ref: fw.ref,
        meta: FW_META[req.params.name] || null,
        controls: fw.controls
      }
    });
  });

  // ─── AI provider config (masked keys on read) ─────────────────────────
  app.get("/api/ai/config", async (req, res) => {
    try {
      const cfg = await getAiConfig(db);
      res.json({ ok: true, data: maskConfig(cfg), providers: PROVIDER_DEFAULTS });
    } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
  });

  app.put("/api/ai/config", async (req, res) => {
    try {
      const current = await getAiConfig(db);
      const body = req.body || {};
      const merged = Object.assign({}, current, body, { _id: "ai_providers" });
      // If the incoming API key is all bullets (the masked placeholder the
      // client sent back unchanged), preserve the existing key rather than
      // overwriting it with the mask.
      if (merged.providers) {
        for (const k of Object.keys(merged.providers)) {
          const incoming = (merged.providers[k] || {}).apiKey;
          const existing = (current.providers && current.providers[k] && current.providers[k].apiKey) || "";
          if (incoming && /^•+$/.test(incoming) && existing) merged.providers[k].apiKey = existing;
        }
      }
      await db.ai_config.update({ _id: "ai_providers" }, { $set: merged }, { upsert: true });
      await logAudit(req, "update", "ai_config", "ai_providers", "Updated AI provider configuration (active: " + (merged.activeProvider || "?") + ")");
      res.json({ ok: true, data: maskConfig(merged) });
    } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
  });

  app.post("/api/ai/test", async (req, res) => {
    try {
      const provider = (req.body && req.body.provider) || "anthropic";
      const cfg = await getAiConfig(db);
      if (provider !== "anthropic") {
        return res.json({ ok: false, error: "Provider '" + provider + "' is not yet wired in. Anthropic is currently the only implemented engine." });
      }
      const { client, model } = buildAnthropicClient(cfg);
      const resp = await client.messages.create({
        model: model, max_tokens: 32,
        messages: [{ role: "user", content: "Respond with exactly: OK" }]
      });
      const text = (resp.content || []).filter(b => b.type === "text").map(b => b.text).join("").trim();
      res.json({ ok: true, model: model, reply: text.slice(0, 64) });
    } catch (e) {
      res.json({ ok: false, error: e.message });
    }
  });

  // ─── Policy gap analysis ──────────────────────────────────────────────
  app.post("/api/analysis/policy-gap", async (req, res) => {
    try {
      const body = req.body || {};
      const policyId = body.policyId;
      const framework = body.framework;
      if (!policyId || !framework) {
        return res.status(400).json({ ok: false, error: "policyId and framework are required" });
      }
      const fw = FW[framework];
      if (!fw) return res.status(400).json({ ok: false, error: "Unknown framework: " + framework });
      const policy = await db.policies.findOne({ _id: policyId });
      if (!policy) return res.status(404).json({ ok: false, error: "Policy not found" });

      const cfg = await getAiConfig(db);
      const activeProvider = cfg.activeProvider || "anthropic";
      if (activeProvider !== "anthropic") {
        return res.status(501).json({ ok: false, error: "Active provider '" + activeProvider + "' is not yet implemented. Switch to Anthropic under Settings → AI Providers." });
      }
      const { client, model } = buildAnthropicClient(cfg);

      const meta = FW_META[framework] || {};
      const frameworkVersion = meta.version || "";
      const controls = (fw.controls || []).map(c => ({
        id: c[0], text: c[1], framework: framework, frameworkVersion: frameworkVersion
      }));

      const policyBlock = buildPolicyBlock(policy);
      // For substring verification we also include the raw reqs in the
      // haystack since reviewers often paste evidence there.
      const policyVerifyText = policyBlock;

      const limit = Math.max(1, Math.min(10, parseInt(body.concurrency) || DEFAULT_CONCURRENCY));
      const analyzed = await mapWithConcurrency(controls, limit, async (ctrl) => {
        const r = await analyzeControlAnthropic(client, model, policyBlock, policyVerifyText, ctrl);
        return Object.assign({ controlId: ctrl.id, controlText: ctrl.text }, r);
      });

      const summary = summarize(analyzed);
      const record = {
        _id: uuidv4(),
        policyId: policy._id,
        policyTitle: policy.title,
        policyType: policy.type || "",
        framework: framework,
        frameworkVersion: frameworkVersion,
        frameworkPublisher: meta.publisher || "",
        analyzedAt: new Date().toISOString(),
        analyzedBy: req.user ? (req.user.username || "system") : "system",
        provider: activeProvider,
        model: model,
        controlsAnalyzed: controls.length,
        summary: summary,
        results: analyzed
      };
      await db.gap_analyses.insert(record);
      await logAudit(
        req, "create", "gap_analyses", record._id,
        "Gap analysis: " + policy.title + " vs " + framework + " — " +
        summary.coveragePct + "% coverage, " + summary.gap + " gaps, " +
        summary.partial + " partial, " + summary.met + " met"
      );
      res.json({ ok: true, data: record });
    } catch (e) {
      console.error("policy-gap error:", e);
      res.status(500).json({ ok: false, error: e.message });
    }
  });

  // ─── Gap analysis history ─────────────────────────────────────────────
  app.get("/api/gap-analyses", async (req, res) => {
    try {
      const filter = {};
      if (req.query.policyId) filter.policyId = req.query.policyId;
      if (req.query.framework) filter.framework = req.query.framework;
      const docs = await db.gap_analyses.find(filter).sort({ analyzedAt: -1 });
      // Omit full per-control results from the list view to keep payloads small.
      const slim = docs.map(d => ({
        _id: d._id, policyId: d.policyId, policyTitle: d.policyTitle, policyType: d.policyType,
        framework: d.framework, frameworkVersion: d.frameworkVersion,
        analyzedAt: d.analyzedAt, analyzedBy: d.analyzedBy,
        provider: d.provider, model: d.model,
        controlsAnalyzed: d.controlsAnalyzed, summary: d.summary
      }));
      res.json({ ok: true, data: slim });
    } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
  });

  app.get("/api/gap-analyses/:id", async (req, res) => {
    try {
      const doc = await db.gap_analyses.findOne({ _id: req.params.id });
      if (!doc) return res.status(404).json({ ok: false, error: "Not found" });
      res.json({ ok: true, data: doc });
    } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
  });

  app.delete("/api/gap-analyses/:id", async (req, res) => {
    try {
      const doc = await db.gap_analyses.findOne({ _id: req.params.id });
      const n = await db.gap_analyses.remove({ _id: req.params.id });
      await logAudit(
        req, "delete", "gap_analyses", req.params.id,
        "Deleted gap analysis" + (doc ? " for " + doc.policyTitle + " vs " + doc.framework : "")
      );
      res.json({ ok: true, deleted: n });
    } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
  });

  // ─── Framework update suggestions (AI-assisted, human-verified) ──────
  // Self-contained catalogs ship with the app; this endpoint lets an admin
  // ask Claude whether a framework has been revised since the shipped
  // version. Results are advisory only — they do not mutate FW directly.
  app.post("/api/analysis/framework-update", async (req, res) => {
    try {
      const framework = req.body && req.body.framework;
      if (!framework || !FW[framework]) return res.status(400).json({ ok: false, error: "Unknown framework" });
      const cfg = await getAiConfig(db);
      if ((cfg.activeProvider || "anthropic") !== "anthropic") {
        return res.status(501).json({ ok: false, error: "Active provider not yet implemented for framework updates." });
      }
      const { client, model } = buildAnthropicClient(cfg);
      const meta = FW_META[framework] || {};
      const currentIds = FW[framework].controls.map(c => c[0]).join(", ");
      const resp = await client.messages.create({
        model: model,
        max_tokens: 2048,
        system: "You are a compliance standards analyst. Respond ONLY with valid minified JSON — no prose, no code fences.",
        messages: [{
          role: "user",
          content:
            "The application ships a catalog for \"" + framework + "\" at version \"" + (meta.version || "unknown") + "\" " +
            "(published " + (meta.publishedDate || "unknown") + "). Current control IDs shipped: " + currentIds + ". " +
            "Return JSON with shape: {\"latestKnownVersion\":\"...\",\"latestKnownDate\":\"YYYY-MM-DD\",\"changesSinceShipped\":\"string\"," +
            "\"suggestedAdditions\":[{\"id\":\"...\",\"text\":\"...\"}],\"suggestedRemovals\":[\"...\"],\"confidenceNote\":\"...\"}. " +
            "Only include additions/removals if you are highly confident. If no changes, return empty arrays."
        }]
      });
      const text = (resp.content || []).filter(b => b.type === "text").map(b => b.text).join("");
      let parsed = null;
      const stripped = text.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
      try { parsed = JSON.parse(stripped); }
      catch (e) { parsed = { raw: text, parseError: e.message }; }
      res.json({ ok: true, data: parsed, shipped: { version: meta.version || null, publishedDate: meta.publishedDate || null } });
    } catch (e) {
      res.status(500).json({ ok: false, error: e.message });
    }
  });
}

module.exports = { mountGapRoutes, PROVIDER_DEFAULTS };
