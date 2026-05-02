/**
 * GRC Vault — Seed Data
 * Run: node seed.js
 * Populates the database with realistic demo data across all modules.
 */

const http = require("http");

const BASE = `http://localhost:${process.env.PORT || 3000}`;
const ADMIN_USER = process.env.SEED_USER || "admin";
const ADMIN_PASS = process.env.SEED_PASS || "admin123";

let TOKEN = null;

function req(method, path, data) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE);
    const headers = { "Content-Type": "application/json" };
    if (TOKEN) headers["Authorization"] = "Bearer " + TOKEN;
    const opts = { method, headers };
    if (data !== undefined) {
      const body = JSON.stringify(data);
      headers["Content-Length"] = Buffer.byteLength(body);
      const r = http.request(url, opts, (res) => {
        let d = ""; res.on("data", (c) => (d += c));
        res.on("end", () => { try { resolve(JSON.parse(d)); } catch { resolve({ ok: false, raw: d }); } });
      });
      r.on("error", reject); r.write(body); r.end();
    } else {
      const r = http.request(url, opts, (res) => {
        let d = ""; res.on("data", (c) => (d += c));
        res.on("end", () => { try { resolve(JSON.parse(d)); } catch { resolve({ ok: false, raw: d }); } });
      });
      r.on("error", reject); r.end();
    }
  });
}
const post  = (p, d) => req("POST",  p, d);
const get   = (p)    => req("GET",   p);
const put   = (p, d) => req("PUT",   p, d);

async function login() {
  const r = await post("/api/auth/login", { username: ADMIN_USER, password: ADMIN_PASS });
  if (!r.ok || !r.token) throw new Error("Login failed: " + (r.error || JSON.stringify(r)));
  TOKEN = r.token;
}

async function seed() {
  console.log("\n  Seeding GRC Vault with demo data...\n");
  await login();
  console.log(`  ✓ Authenticated as ${ADMIN_USER}`);

  // ── Audits ───────────────────────────────────────────────────────────────
  const audits = [
    { name: "Q1 2026 SOC 2 Type II", framework: "SOC 2", status: "In Progress", scope: "Cloud infrastructure, CI/CD pipeline, production databases", auditor: "Sarah Chen", startDate: "2026-01-15", endDate: "2026-03-30", notes: "Annual SOC 2 engagement covering Security, Availability, and Confidentiality trust service criteria." },
    { name: "Annual HIPAA Security Assessment", framework: "HIPAA", status: "Planning", scope: "EHR system, patient portal, data warehouse", auditor: "Marcus Johnson", startDate: "2026-04-01", endDate: "2026-05-15", notes: "Required annual HIPAA security risk assessment per §164.308(a)(1)." },
    { name: "PCI DSS v4.0 Compliance Audit", framework: "PCI DSS v4.0", status: "Completed", scope: "Payment processing, cardholder data environment, network segmentation", auditor: "External: Coalfire", startDate: "2025-10-01", endDate: "2025-12-15", notes: "Full PCI DSS v4.0 assessment. SAQ D merchant level 2." },
    { name: "ISO 27001 Surveillance Audit", framework: "ISO 27001", status: "Review", scope: "Information security management system (ISMS)", auditor: "David Park, BSI Group", startDate: "2026-02-01", endDate: "2026-02-28", notes: "Year 2 surveillance audit for ISO 27001:2022 certification." },
    { name: "NIST CSF Gap Analysis", framework: "NIST CSF", status: "Completed", scope: "Enterprise-wide cybersecurity posture", auditor: "Internal: Risk Team", startDate: "2025-11-01", endDate: "2025-12-20", notes: "Baseline gap analysis against NIST CSF 2.0 to prioritize security investments." },
    { name: "GDPR Article 30 Records Review", framework: "GDPR", status: "In Progress", scope: "EU customer data processing activities", auditor: "Elena Vasquez, DPO", startDate: "2026-02-15", endDate: "2026-04-01", notes: "Review of processing activity records and data protection impact assessments." },
    { name: "ISO 42001 AIMS Readiness Assessment", framework: "ISO 42001", status: "In Progress", scope: "AI management system across all production AI models, training pipelines, and third-party AI services", auditor: "Internal: AI Governance Office", startDate: "2026-03-01", endDate: "2026-06-30", notes: "Pre-certification readiness review against ISO/IEC 42001:2023 Annex A. Targeting external Stage 1 audit in Q3 2026." },
    { name: "NIST AI RMF Maturity Review", framework: "NIST CSF 2.0", status: "Planning", scope: "Generative AI deployments (customer support copilot, marketing copy assistant) and predictive risk-scoring model", auditor: "Priya Nair, Director of AI Risk", startDate: "2026-04-15", endDate: "2026-05-30", notes: "First formal maturity review against NIST AI RMF 1.0. Outputs feed the FY26 AI risk register and the board-level AI oversight committee." },
  ];
  for (const a of audits) { await post("/api/audits", a); console.log(`  ✓ Audit: ${a.name}`); }

  // ── Findings ─────────────────────────────────────────────────────────────
  const auditRes = await get("/api/audits");
  const auditIds = (auditRes.data || []).map((a) => a._id);

  const findings = [
    { auditId: auditIds[0], title: "Missing MFA on administrative accounts", severity: "Critical", control: "CC6.1", description: "12 of 45 admin accounts in AWS IAM lack multi-factor authentication. These accounts have full access to production infrastructure.", recommendation: "Enforce MFA on all IAM accounts with administrative privileges within 14 days. Implement hardware security keys for tier-1 admins.", status: "Open" },
    { auditId: auditIds[0], title: "Encryption at rest not enabled on staging databases", severity: "High", control: "CC6.7", description: "Three PostgreSQL staging databases contain copies of production data without encryption at rest enabled.", recommendation: "Enable AES-256 encryption on all database instances. Implement automated checks in CI/CD to prevent unencrypted deployments.", status: "Open" },
    { auditId: auditIds[0], title: "Incomplete access review documentation", severity: "Medium", control: "CC6.2", description: "Quarterly access reviews for Q3 and Q4 2025 lack sign-off from system owners for 8 of 22 applications.", recommendation: "Obtain retroactive sign-offs and implement automated reminder workflows for future review cycles.", status: "Open" },
    { auditId: auditIds[0], title: "Logging gaps in API gateway", severity: "High", control: "CC7.2", description: "API gateway logs do not capture request/response bodies for authentication endpoints, limiting forensic capability.", recommendation: "Enable full request logging for auth endpoints with PII redaction. Ship to SIEM within 30 days.", status: "Open" },
    { auditId: auditIds[2], title: "Unpatched POS terminals", severity: "Critical", control: "Req 6", description: "14 point-of-sale terminals running firmware version 3.1.2 with known vulnerabilities CVE-2025-1234.", recommendation: "Emergency firmware update to v3.2.0. Implement automated patch management for all POS devices.", status: "Closed" },
    { auditId: auditIds[2], title: "Weak network segmentation", severity: "High", control: "Req 1", description: "Cardholder data environment accessible from corporate VLAN via misconfigured firewall rules.", recommendation: "Implement micro-segmentation. Quarterly penetration testing of CDE boundaries.", status: "Closed" },
    { auditId: auditIds[4], title: "No formal incident response plan", severity: "High", control: "RS.RP", description: "Organization lacks a documented and tested incident response plan. Ad-hoc response procedures exist but are not formalized.", recommendation: "Develop comprehensive IRP aligned to NIST SP 800-61. Conduct tabletop exercise within 60 days.", status: "Open" },
    { auditId: auditIds[4], title: "Asset inventory incomplete", severity: "Medium", control: "ID.AM", description: "Hardware asset inventory covers only 72% of deployed devices. Shadow IT assets discovered during network scanning.", recommendation: "Deploy network discovery tool. Integrate with CMDB for automated inventory updates.", status: "Open" },
    { auditId: auditIds[5], title: "Missing DPIA for marketing analytics", severity: "High", control: "Art.35", description: "New marketing analytics platform processing EU user behavioral data lacks required Data Protection Impact Assessment.", recommendation: "Complete DPIA before next data processing cycle. Engage DPO for review.", status: "Open" },
    // ── ISO 42001 readiness findings ───────────────────────────────────────
    { auditId: auditIds[6], title: "AI policy not approved at executive level", severity: "High", control: "A.2.2", description: "Draft AI policy exists but has not been formally approved by the executive AI governance committee. References to NIST trustworthy AI characteristics are inconsistent.", recommendation: "Finalize policy, secure CEO and board sign-off, and publish via the GRC portal. Include explicit alignment with the security and privacy policies.", status: "Open" },
    { auditId: auditIds[6], title: "AI system inventory incomplete", severity: "Medium", control: "A.4.2", description: "Inventory of production AI systems covers customer-facing models but excludes internal copilots and shadow Jupyter workloads on data-science laptops.", recommendation: "Extend the inventory to cover all AI systems regardless of deployment surface; integrate with the model registry and the SaaS-discovery feed.", status: "Open" },
    { auditId: auditIds[6], title: "No documented AI impact assessment process", severity: "High", control: "A.5.2", description: "AIIA (AI impact assessment) is performed informally for some systems and not at all for others. No common methodology, criteria, or approval gates are defined.", recommendation: "Adopt an AIIA template aligned with ISO 42001 A.5 and NIST AI RMF MAP. Require AIIA before development, before deployment, and on material change.", status: "Open" },
    { auditId: auditIds[6], title: "Limited data provenance for model training", severity: "Medium", control: "A.7.5", description: "Training-data provenance is captured manually in spreadsheets for the predictive risk model. Web-scraped corpora used by the marketing copy assistant lack documented lawful basis.", recommendation: "Stand up an automated data-lineage capture in the feature store. Re-evaluate web-scraped data with legal/DPO review before next training cycle.", status: "Open" },
    // ── NIST AI RMF maturity findings ──────────────────────────────────────
    { auditId: auditIds[7], title: "Trustworthy-AI characteristics not measured", severity: "Medium", control: "MS-2.1", description: "Robustness, fairness, and explainability are discussed qualitatively but not measured with consistent metrics across AI systems.", recommendation: "Define measurement plans per system using AI RMF MEASURE. Wire fairness, drift, and robustness metrics into the existing observability stack.", status: "Open" },
    { auditId: auditIds[7], title: "Post-deployment monitoring plan missing for copilot", severity: "High", control: "MG-4.1", description: "The customer-support copilot lacks a formal post-deployment monitoring plan, including incident response, override, and feedback channels.", recommendation: "Adopt the org standard MG-4 monitoring template. Wire copilot feedback into the incident-response workflow with SLAs by severity.", status: "Open" },
  ];
  for (const f of findings) { await post("/api/findings", f); }
  console.log(`  ✓ ${findings.length} findings created`);

  // ── Risks ────────────────────────────────────────────────────────────────
  const risks = [
    { name: "Ransomware attack on production systems", category: "Cybersecurity", likelihood: 4, impact: 5, controlEffectiveness: 45, treatment: "Mitigate", owner: "CISO — James Wright", description: "Sophisticated ransomware targeting cloud-hosted production infrastructure. Recent industry attacks demonstrate increasing frequency and impact." },
    { name: "Cloud provider service outage", category: "Operational", likelihood: 3, impact: 4, controlEffectiveness: 60, treatment: "Transfer", owner: "VP Engineering — Lisa Chang", description: "Extended AWS region outage exceeding 4 hours affecting all production services. Multi-region failover partially implemented." },
    { name: "Insider threat — data exfiltration", category: "Cybersecurity", likelihood: 3, impact: 5, controlEffectiveness: 35, treatment: "Mitigate", owner: "CISO — James Wright", description: "Privileged employee or contractor exfiltrating sensitive customer data. DLP controls partially deployed." },
    { name: "Regulatory non-compliance fine (GDPR)", category: "Compliance", likelihood: 3, impact: 4, controlEffectiveness: 55, treatment: "Mitigate", owner: "DPO — Elena Vasquez", description: "Potential GDPR Article 83 fine for inadequate data protection measures or breach notification delays." },
    { name: "Supply chain software compromise", category: "Cybersecurity", likelihood: 3, impact: 5, controlEffectiveness: 30, treatment: "Mitigate", owner: "CTO — Alex Rivera", description: "Compromise of third-party library or CI/CD tool introducing malicious code into production builds." },
    { name: "Key personnel departure", category: "Operational", likelihood: 4, impact: 3, controlEffectiveness: 40, treatment: "Mitigate", owner: "VP People — Rachel Kim", description: "Loss of critical engineering or security staff with institutional knowledge. No formal succession planning." },
    { name: "Third-party data breach", category: "Reputational", likelihood: 3, impact: 4, controlEffectiveness: 25, treatment: "Transfer", owner: "VP Legal — Thomas Brown", description: "Data breach at a key vendor exposing shared customer data. Vendor risk assessments show gaps in SaaS provider security." },
    { name: "DDoS attack on customer-facing services", category: "Cybersecurity", likelihood: 4, impact: 3, controlEffectiveness: 70, treatment: "Mitigate", owner: "Director SRE — Mike Santos", description: "Volumetric DDoS attack overwhelming CDN and origin infrastructure. CloudFlare mitigation in place but untested against >500Gbps." },
    { name: "Failed SOC 2 audit", category: "Strategic", likelihood: 2, impact: 5, controlEffectiveness: 60, treatment: "Mitigate", owner: "VP Compliance — Sarah Chen", description: "Material exceptions in SOC 2 report impacting customer trust and sales pipeline. Enterprise customers require clean report." },
    { name: "Intellectual property theft", category: "Legal", likelihood: 2, impact: 5, controlEffectiveness: 40, treatment: "Mitigate", owner: "VP Legal — Thomas Brown", description: "Unauthorized access to proprietary algorithms and trade secrets through compromised development environments." },
    { name: "Physical facility disruption", category: "Environmental", likelihood: 2, impact: 3, controlEffectiveness: 50, treatment: "Accept", owner: "Facilities — Karen Wu", description: "Natural disaster or infrastructure failure at primary office. Fully remote-capable workforce mitigates impact." },
    { name: "API rate limiting bypass", category: "Cybersecurity", likelihood: 3, impact: 3, controlEffectiveness: 55, treatment: "Mitigate", owner: "Director SRE — Mike Santos", description: "Attackers bypassing API rate limits to scrape data or cause resource exhaustion. Current limits set too high." },
    // ── AI-specific risks ──────────────────────────────────────────────────
    { name: "Generative AI hallucination in customer copilot", category: "AI/ML", likelihood: 4, impact: 4, controlEffectiveness: 35, treatment: "Mitigate", owner: "Director of AI Risk — Priya Nair", description: "Customer-support copilot fabricates policy details, refunds, or technical guidance. Risk of regulatory exposure (FTC), customer harm, and reputational damage. Output guardrails partial; human-in-the-loop only on escalations." },
    { name: "Training-data bias in risk-scoring model", category: "AI/ML", likelihood: 3, impact: 5, controlEffectiveness: 30, treatment: "Mitigate", owner: "Head of Data Science — Yuki Tanaka", description: "Predictive risk-scoring model exhibits disparate outcomes across protected attributes due to historical bias in training data. Fairness audits not yet institutionalized; potential for discrimination claims and regulator scrutiny." },
    { name: "EU AI Act non-compliance for high-risk AI", category: "AI/ML", likelihood: 3, impact: 5, controlEffectiveness: 25, treatment: "Mitigate", owner: "VP Legal — Thomas Brown", description: "EU AI Act enters enforcement Aug 2026. Risk-scoring model likely classified as high-risk. Conformity assessment, risk management, post-market monitoring, and CE-marking obligations not yet operationalized." },
    { name: "Prompt injection / jailbreak of internal LLM agents", category: "AI/ML", likelihood: 4, impact: 4, controlEffectiveness: 40, treatment: "Mitigate", owner: "CISO — James Wright", description: "Adversarial prompts cause internal LLM agents to leak system prompts, bypass guardrails, or invoke unintended tools. Tool-use sandbox in place but not fully audited; red-team exercises only ad hoc." },
    { name: "Model drift degrading production decisions", category: "AI/ML", likelihood: 3, impact: 3, controlEffectiveness: 50, treatment: "Mitigate", owner: "Head of MLOps — Daniel Okafor", description: "Concept and data drift cause production models to silently degrade, producing bad business decisions. Drift detection deployed for the risk-scoring model only; copilot and marketing assistant uninstrumented." },
    { name: "Third-party foundation-model vendor instability", category: "AI/ML", likelihood: 2, impact: 4, controlEffectiveness: 30, treatment: "Transfer", owner: "VP Procurement — Maria Lopez", description: "Sole-source dependency on a single foundation-model API exposes the org to outages, price hikes, deprecations, and policy changes (TOS, data-use). No fallback model qualified." },
  ];
  for (const r of risks) {
    const s = r.likelihood * r.impact;
    r.rawScore = s;
    r.residualScore = Math.round(s * (1 - r.controlEffectiveness / 100) * 10) / 10;
    await post("/api/risks", r);
  }
  console.log(`  ✓ ${risks.length} risks created`);

  // ── Controls ─────────────────────────────────────────────────────────────
  const controls = [
    { framework: "NIST CSF", controlId: "ID.AM", name: "Asset Management", status: "Partially Implemented", owner: "IT Operations" },
    { framework: "NIST CSF", controlId: "ID.RA", name: "Risk Assessment Program", status: "Implemented", owner: "Risk Management" },
    { framework: "NIST CSF", controlId: "PR.AC", name: "Identity & Access Management", status: "Implemented", owner: "IAM Team" },
    { framework: "NIST CSF", controlId: "PR.DS", name: "Data Security Controls", status: "Partially Implemented", owner: "Security Engineering" },
    { framework: "NIST CSF", controlId: "PR.IP", name: "Information Protection Processes", status: "Implemented", owner: "Security Engineering" },
    { framework: "NIST CSF", controlId: "PR.AT", name: "Security Awareness Training", status: "Implemented", owner: "People Team" },
    { framework: "NIST CSF", controlId: "DE.CM", name: "Continuous Monitoring", status: "Partially Implemented", owner: "SOC Team" },
    { framework: "NIST CSF", controlId: "DE.AE", name: "Anomaly & Event Detection", status: "Not Started", owner: "SOC Team" },
    { framework: "NIST CSF", controlId: "RS.RP", name: "Incident Response Planning", status: "Not Started", owner: "CISO Office" },
    { framework: "NIST CSF", controlId: "RS.CO", name: "Incident Communications", status: "Partially Implemented", owner: "Communications" },
    { framework: "NIST CSF", controlId: "RC.RP", name: "Recovery Planning", status: "Not Started", owner: "SRE Team" },
    { framework: "SOC 2", controlId: "CC1", name: "Control Environment", status: "Implemented", owner: "Compliance" },
    { framework: "SOC 2", controlId: "CC2", name: "Communication & Information", status: "Implemented", owner: "Compliance" },
    { framework: "SOC 2", controlId: "CC3", name: "Risk Assessment", status: "Implemented", owner: "Risk Management" },
    { framework: "SOC 2", controlId: "CC5", name: "Control Activities", status: "Partially Implemented", owner: "Security Engineering" },
    { framework: "SOC 2", controlId: "CC6", name: "Logical & Physical Access", status: "Partially Implemented", owner: "IAM Team" },
    { framework: "SOC 2", controlId: "CC7", name: "System Operations", status: "Implemented", owner: "SRE Team" },
    { framework: "SOC 2", controlId: "CC8", name: "Change Management", status: "Implemented", owner: "Engineering" },
    { framework: "SOC 2", controlId: "CC9", name: "Risk Mitigation", status: "Partially Implemented", owner: "CISO Office" },
    { framework: "ISO 27001", controlId: "A.5", name: "Information Security Policies", status: "Implemented", owner: "CISO Office" },
    { framework: "ISO 27001", controlId: "A.6", name: "Organization of Information Security", status: "Implemented", owner: "CISO Office" },
    { framework: "ISO 27001", controlId: "A.8", name: "Asset Management", status: "Partially Implemented", owner: "IT Operations" },
    { framework: "ISO 27001", controlId: "A.9", name: "Access Control", status: "Implemented", owner: "IAM Team" },
    { framework: "ISO 27001", controlId: "A.12", name: "Operations Security", status: "Implemented", owner: "SRE Team" },
    { framework: "ISO 27001", controlId: "A.16", name: "Incident Management", status: "Not Started", owner: "SOC Team" },
    { framework: "GDPR", controlId: "Art.30", name: "Records of Processing Activities", status: "Partially Implemented", owner: "DPO" },
    { framework: "GDPR", controlId: "Art.32", name: "Security of Processing", status: "Implemented", owner: "Security Engineering" },
    { framework: "GDPR", controlId: "Art.33", name: "Breach Notification (72hr)", status: "Partially Implemented", owner: "Legal / DPO" },
    { framework: "GDPR", controlId: "Art.35", name: "Data Protection Impact Assessment", status: "Not Started", owner: "DPO" },
    // ── ISO 42001 AI Management System controls ───────────────────────────
    { framework: "ISO 42001", controlId: "A.2.2", name: "AI policy", status: "Partially Implemented", owner: "AI Governance Office" },
    { framework: "ISO 42001", controlId: "A.3.2", name: "AI roles and responsibilities", status: "Implemented", owner: "AI Governance Office" },
    { framework: "ISO 42001", controlId: "A.4.2", name: "Resource documentation", status: "Partially Implemented", owner: "MLOps" },
    { framework: "ISO 42001", controlId: "A.4.3", name: "Data resources", status: "Partially Implemented", owner: "Data Governance" },
    { framework: "ISO 42001", controlId: "A.5.2", name: "AI system impact assessment process", status: "Not Started", owner: "AI Governance Office" },
    { framework: "ISO 42001", controlId: "A.6.2.4", name: "AI system verification and validation", status: "Partially Implemented", owner: "MLOps" },
    { framework: "ISO 42001", controlId: "A.6.2.6", name: "AI system operation and monitoring", status: "Implemented", owner: "MLOps" },
    { framework: "ISO 42001", controlId: "A.6.2.8", name: "AI system event log", status: "Implemented", owner: "MLOps" },
    { framework: "ISO 42001", controlId: "A.7.4", name: "Quality of data for AI systems", status: "Partially Implemented", owner: "Data Governance" },
    { framework: "ISO 42001", controlId: "A.7.5", name: "Data provenance", status: "Not Started", owner: "Data Governance" },
    { framework: "ISO 42001", controlId: "A.8.4", name: "Communication of incidents", status: "Implemented", owner: "AI Governance Office" },
    { framework: "ISO 42001", controlId: "A.10.3", name: "Suppliers", status: "Partially Implemented", owner: "Procurement" },
  ];
  for (const c of controls) { await post("/api/controls", c); }
  console.log(`  ✓ ${controls.length} controls created`);

  // ── Policies ─────────────────────────────────────────────────────────────
  const policies = [
    { title: "Information Security Policy", type: "Policy", status: "Approved", version: "3.2", owner: "CISO — James Wright", reviewDate: "2026-06-01", content: "Establishes the organization's approach to managing information security risks, including roles, responsibilities, and the security governance framework." },
    { title: "Acceptable Use Policy", type: "Policy", status: "Approved", version: "2.1", owner: "IT Director — Anna Lee", reviewDate: "2026-09-01", content: "Defines acceptable use of company IT resources including hardware, software, email, internet access, and mobile devices." },
    { title: "Incident Response Plan", type: "Plan", status: "Draft", version: "1.0", owner: "CISO — James Wright", reviewDate: "2026-04-01", content: "Procedures for detecting, responding to, and recovering from security incidents. Includes escalation paths, communication templates, and forensic procedures." },
    { title: "Data Classification Standard", type: "Standard", status: "Approved", version: "2.0", owner: "DPO — Elena Vasquez", reviewDate: "2026-07-01", content: "Defines data classification levels (Public, Internal, Confidential, Restricted) and handling requirements for each level." },
    { title: "Vulnerability Management Procedure", type: "Procedure", status: "Approved", version: "1.5", owner: "Security Engineering Lead", reviewDate: "2026-05-01", content: "Process for identifying, assessing, prioritizing, and remediating vulnerabilities. Includes SLA targets by severity: Critical 24hr, High 7 days, Medium 30 days." },
    { title: "Access Control Policy", type: "Policy", status: "Approved", version: "2.3", owner: "IAM Team Lead", reviewDate: "2026-08-01", content: "Governs user access provisioning, de-provisioning, privilege management, and periodic access reviews. Requires MFA for all privileged access." },
    { title: "Business Continuity Plan", type: "Plan", status: "Review", version: "1.8", owner: "COO — Michael Torres", reviewDate: "2026-03-15", content: "Strategies and procedures for maintaining critical business functions during and after a disruption. RTO targets by tier." },
    { title: "Change Management Procedure", type: "Procedure", status: "Approved", version: "3.0", owner: "VP Engineering — Lisa Chang", reviewDate: "2026-10-01", content: "Process for requesting, reviewing, approving, and implementing changes to production systems. Includes emergency change process." },
    { title: "Third-Party Risk Management Policy", type: "Policy", status: "Approved", version: "1.2", owner: "VP Legal — Thomas Brown", reviewDate: "2026-07-01", content: "Framework for assessing and managing risks associated with third-party vendors, suppliers, and service providers." },
    { title: "Data Retention & Disposal Guideline", type: "Guideline", status: "Draft", version: "1.0", owner: "DPO — Elena Vasquez", reviewDate: "2026-05-01", content: "Guidelines for data retention periods by category and secure disposal methods. Aligned with GDPR Article 5(1)(e) storage limitation principle." },
    { title: "Cryptographic Controls Standard", type: "Standard", status: "Approved", version: "1.1", owner: "Security Engineering Lead", reviewDate: "2026-06-01", content: "Approved cryptographic algorithms, key lengths, and key management practices. Mandates AES-256 for data at rest, TLS 1.3 for transit." },
    // ── AI governance policies ─────────────────────────────────────────────
    { title: "AI Use & Governance Policy", type: "Policy", status: "Draft", version: "0.9", owner: "AI Governance Office — Priya Nair", reviewDate: "2026-06-15", content: "Defines the organization's approach to developing, deploying, and using AI systems. References ISO/IEC 42001 and the NIST AI RMF trustworthy-AI characteristics. Establishes prohibited use cases, mandatory impact assessments, and human-oversight expectations." },
    { title: "AI Impact Assessment (AIIA) Procedure", type: "Procedure", status: "Draft", version: "0.5", owner: "AI Governance Office — Priya Nair", reviewDate: "2026-07-01", content: "Procedure for performing an AI impact assessment before development, before deployment, and on material change. Aligned with ISO 42001 A.5 and NIST AI RMF MAP. Covers fairness, privacy, safety, security, transparency, and societal-impact dimensions." },
    { title: "Acceptable Use of Generative AI", type: "Policy", status: "Approved", version: "1.0", owner: "CISO — James Wright", reviewDate: "2026-09-15", content: "Defines acceptable use of public and internal generative-AI tools by employees and contractors. Prohibits sharing of confidential or regulated data with unsanctioned tools. Lists approved tools and required logging." },
  ];
  for (const p of policies) { await post("/api/policies", p); }
  console.log(`  ✓ ${policies.length} policies created`);

  // ── Framework Maturity Scores ────────────────────────────────────────────
  // Tier scale (1=Initial/Partial, 2=Defined/Risk Informed, 3=Managed/Repeatable, 4=Optimized/Adaptive).
  // Stored on the main config document so the dashboard widget and per-framework
  // assessment pages light up without needing a clicker to score every subcategory.
  const csf2Scores = {
    "GV.OC-01": 3, "GV.OC-02": 3, "GV.OC-03": 2, "GV.OC-04": 2, "GV.OC-05": 3,
    "GV.RM-01": 3, "GV.RM-02": 2, "GV.RM-03": 3, "GV.RM-04": 2, "GV.RM-05": 2, "GV.RM-06": 1, "GV.RM-07": 2,
    "GV.RR-01": 3, "GV.RR-02": 3, "GV.RR-03": 2, "GV.RR-04": 2,
    "GV.PO-01": 3, "GV.PO-02": 2,
    "GV.OV-01": 2, "GV.OV-02": 2, "GV.OV-03": 1,
    "ID.AM-01": 3, "ID.AM-02": 2, "ID.AM-03": 2, "ID.AM-04": 2, "ID.AM-05": 3, "ID.AM-07": 1, "ID.AM-08": 2,
    "ID.RA-01": 3, "ID.RA-02": 3, "ID.RA-03": 2, "ID.RA-04": 2, "ID.RA-05": 3, "ID.RA-06": 2, "ID.RA-07": 2, "ID.RA-08": 1, "ID.RA-09": 2, "ID.RA-10": 2,
    "PR.AA-01": 4, "PR.AA-02": 3, "PR.AA-03": 4, "PR.AA-04": 3, "PR.AA-05": 4, "PR.AA-06": 3,
    "PR.AT-01": 3, "PR.AT-02": 3,
    "PR.DS-01": 3, "PR.DS-02": 3, "PR.DS-10": 2, "PR.DS-11": 2,
    "PR.IR-01": 3, "PR.IR-02": 3, "PR.IR-03": 2, "PR.IR-04": 3,
    "DE.CM-01": 3, "DE.CM-02": 2, "DE.CM-03": 3, "DE.CM-06": 2, "DE.CM-09": 3,
    "DE.AE-02": 2, "DE.AE-03": 3, "DE.AE-04": 2, "DE.AE-06": 2, "DE.AE-07": 2, "DE.AE-08": 1,
    "RS.MA-01": 2, "RS.MA-02": 2, "RS.MA-03": 2, "RS.MA-04": 2, "RS.MA-05": 1,
    "RS.AN-03": 2, "RS.AN-06": 2, "RS.AN-07": 2, "RS.AN-08": 1,
    "RS.CO-02": 2, "RS.CO-03": 2,
    "RS.MI-01": 2, "RS.MI-02": 2,
    "RC.RP-01": 1, "RC.RP-02": 1, "RC.RP-03": 1, "RC.RP-04": 1, "RC.RP-05": 1, "RC.RP-06": 1,
    "RC.CO-03": 1, "RC.CO-04": 1
  };

  const rmfAiScores = {
    // GOVERN — generally further along (policy + accountability work in flight)
    "GV-1.1": 2, "GV-1.2": 2, "GV-1.3": 2, "GV-1.4": 2, "GV-1.5": 2, "GV-1.6": 2, "GV-1.7": 1,
    "GV-2.1": 3, "GV-2.2": 2, "GV-2.3": 3,
    "GV-3.1": 2, "GV-3.2": 2,
    "GV-4.1": 2, "GV-4.2": 2, "GV-4.3": 1,
    "GV-5.1": 2, "GV-5.2": 1,
    "GV-6.1": 2, "GV-6.2": 1,
    // MAP
    "MP-1.1": 2, "MP-1.2": 2, "MP-1.3": 1, "MP-1.4": 2, "MP-1.5": 1, "MP-1.6": 1,
    "MP-2.1": 2, "MP-2.2": 1, "MP-2.3": 2,
    "MP-3.1": 1, "MP-3.2": 1, "MP-3.3": 2, "MP-3.4": 1, "MP-3.5": 2,
    "MP-4.1": 2, "MP-4.2": 1,
    "MP-5.1": 1, "MP-5.2": 1,
    // MEASURE — earliest maturity stage; metrics not yet institutionalized
    "MS-1.1": 1, "MS-1.2": 1, "MS-1.3": 1,
    "MS-2.1": 1, "MS-2.2": 1, "MS-2.3": 1, "MS-2.4": 1, "MS-2.5": 1, "MS-2.6": 1, "MS-2.7": 1,
    "MS-3.1": 1, "MS-3.2": 1, "MS-3.3": 1,
    "MS-4.1": 1, "MS-4.2": 1, "MS-4.3": 1,
    // MANAGE
    "MG-1.1": 2, "MG-1.2": 2, "MG-1.3": 1, "MG-1.4": 1,
    "MG-2.1": 2, "MG-2.2": 1, "MG-2.3": 2, "MG-2.4": 1,
    "MG-3.1": 2, "MG-3.2": 1,
    "MG-4.1": 1, "MG-4.2": 2, "MG-4.3": 2
  };

  const iso42001Scores = {
    "A.2.2": 2, "A.2.3": 2, "A.2.4": 1,
    "A.3.2": 3, "A.3.3": 2,
    "A.4.2": 2, "A.4.3": 2, "A.4.4": 2, "A.4.5": 3, "A.4.6": 2,
    "A.5.2": 1, "A.5.3": 1, "A.5.4": 1, "A.5.5": 1,
    "A.6.1.2": 2, "A.6.1.3": 2,
    "A.6.2.2": 2, "A.6.2.3": 2, "A.6.2.4": 2, "A.6.2.5": 2, "A.6.2.6": 3, "A.6.2.7": 2, "A.6.2.8": 3,
    "A.7.2": 2, "A.7.3": 2, "A.7.4": 2, "A.7.5": 1, "A.7.6": 2,
    "A.8.2": 2, "A.8.3": 2, "A.8.4": 3, "A.8.5": 2,
    "A.9.2": 2, "A.9.3": 1, "A.9.4": 2,
    "A.10.2": 2, "A.10.3": 2, "A.10.4": 2
  };

  const sspData = {
    systemName: "GRC Vault Production Web Application",
    systemAbbrev: "GRCV",
    systemId: "SYS-2026-001",
    systemVersion: "v2.0",
    systemType: "Major Application",
    operationalStatus: "Operational",
    sspDate: "2026-04-15",
    sspRevision: "1.0",
    infoTypesDesc: "Audit findings, control attestations, risk assessments, policy artifacts, evidence files. May contain low-volume PII (employee names/emails of control owners) and confidential business information.",
    confidentiality: "Moderate",
    integrity: "Moderate",
    availability: "Low",
    overallCat: "Moderate",
    categorizationJustification: "Loss of confidentiality or integrity of audit findings, control statuses, or risk treatments could impact regulator reporting and audit defensibility. Availability is Low as the system is internal and short outages are tolerable.",
    systemOwner: "Sarah Chen",
    systemOwnerTitle: "VP Compliance",
    systemOwnerEmail: "sarah.chen@example.com",
    authOfficial: "James Wright",
    authOfficialTitle: "CISO",
    authOfficialEmail: "james.wright@example.com",
    isso: "Marcus Johnson",
    issoTitle: "Senior Security Analyst",
    issoEmail: "marcus.johnson@example.com",
    purposeDesc: "Centralized governance, risk, and compliance platform for tracking audits, controls, risks, findings, policies, and framework maturity across NIST CSF 2.0, ISO 27001, ISO 42001 (AIMS), SOC 2, HIPAA, PCI DSS, GDPR, and NIST AI RMF.",
    environmentDesc: "Single Node.js (Express) application on a hardened Ubuntu 22.04 VM. NeDB file-backed datastore on the local volume. Reverse-proxied by an internal nginx instance with TLS termination. No external internet exposure.",
    boundaryDesc: "The authorization boundary includes the application server, its NeDB datastore directory, the reverse-proxy front end, and supporting OS services. External integrations (SSO via Entra/SAML/AD, SMTP relay) sit outside the boundary and are documented as interconnections.",
    userDesc: "Approximately 80 internal users in three roles: admin (compliance + IT), analyst (auditors, risk owners, control owners), and viewer (executive consumers of dashboards and reports). Access is granted via Entra ID SSO with MFA enforced.",
    dataFlowDesc: "Users authenticate via Entra ID (OIDC) and receive a JWT. All API requests are HTTPS to the reverse proxy, which forwards to the Node application. Writes persist to local NeDB files; nightly snapshot to encrypted S3. No customer or production data flows in or out.",
    portProtocols: "443/TCP HTTPS (public), 3000/TCP HTTP (loopback only, behind reverse proxy), 22/TCP SSH (admin VPN only).",
    interconnDesc: "Entra ID (OIDC, SCIM provisioning), internal SMTP relay (port 587, STARTTLS), corporate Splunk SIEM (HEC over 8088).",
    interconnAgreements: "MOU with IT Identity team (renewed 2026-01) and Security Operations team (renewed 2026-02).",
    externalServices: "Anthropic Claude API (TLS 1.3, API-key auth) — used by the AI-assisted policy gap analysis feature. Disabled by default; enabled only with admin opt-in and per-tenant key.",
    monitorStrategy: "Continuous monitoring via Splunk dashboards, weekly vulnerability scans (Nessus), monthly access reviews, and quarterly tabletop exercises. Audit logs streamed in real time to Splunk with 1-year retention.",
    monitorFrequency: "Weekly: vulnerability scans. Monthly: access review, patching attestation. Quarterly: tabletop exercise, control self-assessment. Annual: full security control assessment, penetration test.",
    monitorTools: "Splunk Enterprise Security (SIEM), Nessus Pro (VM scanning), CrowdStrike Falcon (EDR), AWS Config (configuration compliance), GRC Vault itself for control attestation.",
    poamRef: "POA&M document tracked in this GRC Vault instance under Findings module. Open critical/high findings are reviewed weekly at the CISO staff meeting.",
    ato: "Initial ATO granted 2026-04-30 for 1 year. Conditions: complete tabletop exercise within 90 days; remediate all critical findings within 30 days."
  };

  // Update the main config doc with maturity scores and the active-framework set
  // so the dashboard maturity widget and the per-framework pages light up.
  // Maturity scores and SSP data are JSON-stringified because NeDB rejects field
  // names with dots (subcategory IDs like "GV.OC-01" or "A.6.2.4").
  const cfgRes = await get("/api/config");
  const existing = (cfgRes.data || []).find(c => c._id === "main-config");
  const cfgPayload = {
    activeFrameworks: ["NIST CSF","NIST CSF 2.0","ISO 27001","ISO 42001","SOC 2","GDPR","NIST 800-53 Rev 5"],
    csf2ScoresJson:     JSON.stringify(csf2Scores),
    rmfAiScoresJson:    JSON.stringify(rmfAiScores),
    iso42001ScoresJson: JSON.stringify(iso42001Scores),
    sspDataJson:        JSON.stringify(sspData)
  };
  let cfgRespOk;
  if (existing) {
    const r = await put("/api/config/main-config", cfgPayload);
    cfgRespOk = r && r.ok;
  } else {
    const r = await post("/api/config", { _id: "main-config", ...cfgPayload });
    cfgRespOk = r && r.ok;
  }
  if (!cfgRespOk) throw new Error("Config update did not return ok=true — server logs may have details");
  console.log(`  ✓ Maturity scored: CSF2=${Object.keys(csf2Scores).length}, RMF AI=${Object.keys(rmfAiScores).length}, ISO 42001=${Object.keys(iso42001Scores).length}; SSP populated`);

  console.log("\n  ✅ Seed complete! Refresh the browser to see data.\n");
}

seed().catch((e) => { console.error("Seed failed:", e.message); console.error("Make sure the server is running: npm start"); process.exit(1); });
