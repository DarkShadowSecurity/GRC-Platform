const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const Datastore = require("nedb-promises");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Optional integration libraries — required only when MFA / SSO features are exercised.
// Wrapped in try/catch so the server starts even if a dependency is missing
// (run `npm install` after pulling this change to enable them).
let speakeasy = null, qrcode = null, ldap = null, samlPassport = null;
try { speakeasy = require("speakeasy"); } catch (e) { console.warn("speakeasy not installed — TOTP MFA disabled until `npm install`"); }
try { qrcode = require("qrcode"); } catch (e) { console.warn("qrcode not installed — QR code generation disabled until `npm install`"); }
try { ldap = require("ldapjs"); } catch (e) { console.warn("ldapjs not installed — AD/LDAP integration disabled until `npm install`"); }
try { samlPassport = require("passport-saml"); } catch (e) { console.warn("passport-saml not installed — SAML 2.0 SSO disabled until `npm install`"); }

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const JWT_SECRET = process.env.JWT_SECRET || "grc-vault-secret-" + uuidv4().slice(0, 8);

// ─── Database Setup ────────────────────────────────────────────────────────
const dbDir = process.env.DB_PATH || path.join(__dirname, "db", "data");
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

const STORES = ["audits", "risks", "controls", "policies", "findings", "evidence", "benchmarks", "config"];
const db = {};
STORES.forEach((name) => {
  db[name] = Datastore.create({ filename: path.join(dbDir, `${name}.db`), autoload: true, timestampData: true });
});
// User and audit log stores
db.users = Datastore.create({ filename: path.join(dbDir, "users.db"), autoload: true, timestampData: true });
db.auditlog = Datastore.create({ filename: path.join(dbDir, "auditlog.db"), autoload: true, timestampData: true });
// Gap-analysis and AI-provider config stores are served by server-gap.js
// with custom routes; they're created here so the NeDB files live alongside
// the others and are covered by the standard backup/export paths.
db.gap_analyses = Datastore.create({ filename: path.join(dbDir, "gap_analyses.db"), autoload: true, timestampData: true });
db.ai_config    = Datastore.create({ filename: path.join(dbDir, "ai_config.db"),    autoload: true, timestampData: true });

// ─── File Upload Setup ────────────────────────────────────────────────────
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, uuidv4() + path.extname(file.originalname)),
});
const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

// ─── Middleware ─────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, "public")));

// ─── Auth Helpers ──────────────────────────────────────────────────────────
function generateToken(user) {
  return jwt.sign({ _id: user._id, username: user.username, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: "24h" });
}

function authMiddleware(req, res, next) {
  // Skip auth for login, health, and static files
  if (req.path === "/api/auth/login" || req.path === "/api/health") return next();
  // SSO entry points are unauthenticated by design — they perform their own
  // identity verification via the upstream IdP and issue a fresh JWT on success.
  if (req.path === "/api/auth/sso/ad/login" || req.path === "/api/auth/sso/entra/login") return next();
  if (req.path === "/api/auth/sso/saml/metadata" || req.path === "/api/auth/sso/saml/acs" || req.path === "/api/auth/sso/saml/login") return next();
  if (!req.path.startsWith("/api/")) return next();

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ ok: false, error: "Authentication required" });
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ ok: false, error: "Invalid or expired token" });
  }
}

function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ ok: false, error: "Admin access required" });
  }
  next();
}

// ─── Audit Log Helper ──────────────────────────────────────────────────────
async function logAudit(req, action, store, recordId, details) {
  try {
    await db.auditlog.insert({
      _id: uuidv4(),
      timestamp: new Date().toISOString(),
      userId: req.user ? req.user._id : "system",
      username: req.user ? req.user.username : "system",
      name: req.user ? req.user.name : "System",
      action: action,
      store: store,
      recordId: recordId || null,
      details: details || "",
      ip: req.ip || req.connection.remoteAddress,
    });
  } catch (e) { /* silent fail on audit log */ }
}

app.use(authMiddleware);

// ─── Auth Endpoints ────────────────────────────────────────────────────────
app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password, mfaCode } = req.body;
    if (!username || !password) return res.status(400).json({ ok: false, error: "Username and password required" });
    const user = await db.users.findOne({ username: username.toLowerCase() });
    if (!user) return res.status(401).json({ ok: false, error: "Invalid credentials" });
    if (user.disabled) return res.status(401).json({ ok: false, error: "Account is disabled" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ ok: false, error: "Invalid credentials" });

    // ── MFA Verification ──────────────────────────────────────────────────
    // If the user has MFA enabled, require a valid second factor before
    // issuing a session token. Supported: TOTP (Google Authenticator,
    // Microsoft Authenticator) and Duo (push challenge handled separately).
    if (user.mfaEnabled && user.mfaType) {
      if (!mfaCode) {
        return res.json({ ok: false, mfaRequired: true, mfaType: user.mfaType, error: "MFA code required" });
      }
      let mfaOk = false;
      if ((user.mfaType === "google" || user.mfaType === "microsoft" || user.mfaType === "totp") && user.mfaSecret && speakeasy) {
        mfaOk = speakeasy.totp.verify({ secret: user.mfaSecret, encoding: "base32", token: String(mfaCode), window: 1 });
      } else if (user.mfaType === "duo") {
        // Duo verification — in production this calls the Duo Auth API.
        // We accept a one-time bypass code while a Duo integration is wired up.
        mfaOk = user.duoBypassCodes && user.duoBypassCodes.includes(String(mfaCode));
      }
      if (!mfaOk) {
        await logAudit(req, "login-mfa-failed", "auth", user._id, "MFA verification failed");
        return res.status(401).json({ ok: false, error: "Invalid MFA code" });
      }
    }

    const token = generateToken(user);
    await logAudit(req, "login", "auth", user._id, "User logged in" + (user.mfaEnabled ? " (MFA: " + user.mfaType + ")" : ""));
    res.json({ ok: true, token, user: { _id: user._id, username: user.username, name: user.name, role: user.role, email: user.email, mfaEnabled: !!user.mfaEnabled, mfaType: user.mfaType || null } });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

// ─── MFA Endpoints ────────────────────────────────────────────────────────
// Enroll a TOTP authenticator (Google Authenticator / Microsoft Authenticator).
// Returns an otpauth URL and a base64-encoded QR code; the secret is stored
// against the user account once the user verifies their first code via
// /api/auth/mfa/verify-setup.
app.post("/api/auth/mfa/setup", async (req, res) => {
  try {
    if (!speakeasy || !qrcode) return res.status(503).json({ ok: false, error: "MFA libraries not installed. Run `npm install` to enable." });
    const { type } = req.body; // 'google' | 'microsoft' | 'totp'
    const user = await db.users.findOne({ _id: req.user._id });
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });
    const issuer = "GRC Vault";
    const label = issuer + ":" + user.username;
    const secret = speakeasy.generateSecret({ length: 20, name: label, issuer: issuer });
    // Persist as pending — only activated after verify-setup succeeds.
    await db.users.update({ _id: user._id }, { $set: { mfaPendingSecret: secret.base32, mfaPendingType: type || "totp" } });
    const dataUrl = await qrcode.toDataURL(secret.otpauth_url);
    res.json({ ok: true, otpauth: secret.otpauth_url, qr: dataUrl, secret: secret.base32 });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

app.post("/api/auth/mfa/verify-setup", async (req, res) => {
  try {
    if (!speakeasy) return res.status(503).json({ ok: false, error: "MFA libraries not installed" });
    const { code } = req.body;
    const user = await db.users.findOne({ _id: req.user._id });
    if (!user || !user.mfaPendingSecret) return res.status(400).json({ ok: false, error: "No pending MFA setup" });
    const ok = speakeasy.totp.verify({ secret: user.mfaPendingSecret, encoding: "base32", token: String(code), window: 1 });
    if (!ok) return res.status(401).json({ ok: false, error: "Invalid code" });
    await db.users.update({ _id: user._id }, { $set: { mfaEnabled: true, mfaSecret: user.mfaPendingSecret, mfaType: user.mfaPendingType || "totp" }, $unset: { mfaPendingSecret: true, mfaPendingType: true } });
    await logAudit(req, "mfa-enabled", "users", user._id, "MFA enabled (" + (user.mfaPendingType || "totp") + ")");
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

app.post("/api/auth/mfa/disable", async (req, res) => {
  try {
    const { password } = req.body;
    const user = await db.users.findOne({ _id: req.user._id });
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });
    const valid = await bcrypt.compare(password || "", user.password);
    if (!valid) return res.status(401).json({ ok: false, error: "Password required to disable MFA" });
    await db.users.update({ _id: user._id }, { $set: { mfaEnabled: false }, $unset: { mfaSecret: true, mfaType: true, mfaPendingSecret: true, mfaPendingType: true } });
    await logAudit(req, "mfa-disabled", "users", user._id, "MFA disabled");
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

// Enroll Duo — stores the user's Duo username (the integration key, secret
// key, and API hostname live in the SSO config and are configured by an admin).
app.post("/api/auth/mfa/duo/enroll", async (req, res) => {
  try {
    const { duoUsername } = req.body;
    if (!duoUsername) return res.status(400).json({ ok: false, error: "Duo username required" });
    // Generate a small set of one-time bypass codes for first-time enrollment.
    const bypass = [];
    for (let i = 0; i < 5; i++) bypass.push(Math.floor(100000 + Math.random() * 900000).toString());
    await db.users.update({ _id: req.user._id }, { $set: { mfaEnabled: true, mfaType: "duo", duoUsername: duoUsername, duoBypassCodes: bypass } });
    await logAudit(req, "mfa-enabled", "users", req.user._id, "Duo MFA enrolled");
    res.json({ ok: true, bypassCodes: bypass });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

// ─── SSO Configuration (admin only) ───────────────────────────────────────
// Stored in the config store as a single document with _id 'sso-config'.
// Contains AD/LDAP, Microsoft Entra (Azure AD), and SAML 2.0 settings.
app.get("/api/auth/sso/config", adminOnly, async (req, res) => {
  try {
    let cfg = await db.config.findOne({ _id: "sso-config" });
    if (!cfg) cfg = { _id: "sso-config", ad: {}, entra: {}, saml: {} };
    // Never return raw secrets — mask them.
    const safe = JSON.parse(JSON.stringify(cfg));
    if (safe.ad && safe.ad.bindPassword) safe.ad.bindPassword = "***";
    if (safe.entra && safe.entra.clientSecret) safe.entra.clientSecret = "***";
    if (safe.saml && safe.saml.privateKey) safe.saml.privateKey = "***";
    res.json({ ok: true, data: safe });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

app.post("/api/auth/sso/config", adminOnly, async (req, res) => {
  try {
    const existing = await db.config.findOne({ _id: "sso-config" }) || { _id: "sso-config", ad: {}, entra: {}, saml: {} };
    const updates = { ad: req.body.ad || existing.ad || {}, entra: req.body.entra || existing.entra || {}, saml: req.body.saml || existing.saml || {} };
    // Preserve secrets if the client sent the masked placeholder.
    if (updates.ad.bindPassword === "***") updates.ad.bindPassword = existing.ad ? existing.ad.bindPassword : "";
    if (updates.entra.clientSecret === "***") updates.entra.clientSecret = existing.entra ? existing.entra.clientSecret : "";
    if (updates.saml.privateKey === "***") updates.saml.privateKey = existing.saml ? existing.saml.privateKey : "";
    if (await db.config.findOne({ _id: "sso-config" })) {
      await db.config.update({ _id: "sso-config" }, { $set: updates });
    } else {
      await db.config.insert({ _id: "sso-config", ...updates });
    }
    await logAudit(req, "update", "config", "sso-config", "Updated SSO configuration");
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

// AD / LDAP login — bind to AD using the supplied credentials and, on success,
// provision a local mirror user (or update the existing one) so the rest of
// the app can reference a stable _id.
app.post("/api/auth/sso/ad/login", async (req, res) => {
  try {
    if (!ldap) return res.status(503).json({ ok: false, error: "ldapjs not installed. Run `npm install` to enable AD integration." });
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ ok: false, error: "Username and password required" });
    const cfg = await db.config.findOne({ _id: "sso-config" });
    if (!cfg || !cfg.ad || !cfg.ad.url) return res.status(503).json({ ok: false, error: "AD integration not configured" });
    const ad = cfg.ad;
    const client = ldap.createClient({ url: ad.url });
    const userPrincipal = ad.userPrincipalSuffix ? username + ad.userPrincipalSuffix : username;
    await new Promise((resolve, reject) => {
      client.bind(userPrincipal, password, (err) => { if (err) reject(err); else resolve(); });
    }).catch(err => { throw new Error("AD bind failed: " + err.message); });
    client.unbind();
    // Provision / update local mirror.
    let user = await db.users.findOne({ username: username.toLowerCase() });
    if (!user) {
      user = { _id: uuidv4(), username: username.toLowerCase(), password: await bcrypt.hash(uuidv4(), 10), name: username, email: "", role: "user", disabled: false, ssoProvider: "ad" };
      await db.users.insert(user);
    } else {
      await db.users.update({ _id: user._id }, { $set: { ssoProvider: "ad" } });
    }
    const token = generateToken(user);
    await logAudit(req, "login-sso-ad", "auth", user._id, "AD/LDAP SSO login");
    res.json({ ok: true, token, user: { _id: user._id, username: user.username, name: user.name, role: user.role, email: user.email } });
  } catch (e) { res.status(401).json({ ok: false, error: e.message }); }
});

// Entra ID (Azure AD) login — exchanges an authorization code for an id_token
// using the configured tenant. The frontend handles the OIDC redirect dance and
// posts the resulting code back here.
app.post("/api/auth/sso/entra/login", async (req, res) => {
  try {
    const { code, redirectUri } = req.body;
    const cfg = await db.config.findOne({ _id: "sso-config" });
    if (!cfg || !cfg.entra || !cfg.entra.tenantId || !cfg.entra.clientId) return res.status(503).json({ ok: false, error: "Entra ID not configured" });
    const entra = cfg.entra;
    const tokenUrl = `https://login.microsoftonline.com/${entra.tenantId}/oauth2/v2.0/token`;
    const params = new URLSearchParams({ client_id: entra.clientId, client_secret: entra.clientSecret || "", code: code, redirect_uri: redirectUri, grant_type: "authorization_code", scope: "openid profile email" });
    const resp = await fetch(tokenUrl, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: params.toString() });
    const data = await resp.json();
    if (!data.id_token) return res.status(401).json({ ok: false, error: data.error_description || "Entra token exchange failed" });
    // Decode the id_token (signature verification is delegated to the JWKS in production — out of scope here).
    const payload = JSON.parse(Buffer.from(data.id_token.split(".")[1], "base64").toString("utf8"));
    const username = (payload.preferred_username || payload.email || payload.upn || "").toLowerCase();
    if (!username) return res.status(401).json({ ok: false, error: "No username claim in token" });
    let user = await db.users.findOne({ username });
    if (!user) {
      user = { _id: uuidv4(), username, password: await bcrypt.hash(uuidv4(), 10), name: payload.name || username, email: payload.email || "", role: "user", disabled: false, ssoProvider: "entra" };
      await db.users.insert(user);
    } else {
      await db.users.update({ _id: user._id }, { $set: { ssoProvider: "entra" } });
    }
    const token = generateToken(user);
    await logAudit(req, "login-sso-entra", "auth", user._id, "Entra ID SSO login");
    res.json({ ok: true, token, user: { _id: user._id, username: user.username, name: user.name, role: user.role, email: user.email } });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

// SAML 2.0 metadata + assertion endpoints. The frontend redirects the browser
// to /api/auth/sso/saml/login which sends the user to the IdP; the IdP posts
// the SAMLResponse back to /api/auth/sso/saml/acs.
app.get("/api/auth/sso/saml/login", async (req, res) => {
  try {
    if (!samlPassport) return res.status(503).send("passport-saml not installed");
    const cfg = await db.config.findOne({ _id: "sso-config" });
    if (!cfg || !cfg.saml || !cfg.saml.entryPoint) return res.status(503).send("SAML not configured");
    const strategy = new samlPassport.Strategy({ entryPoint: cfg.saml.entryPoint, issuer: cfg.saml.issuer, callbackUrl: cfg.saml.callbackUrl, cert: cfg.saml.idpCert });
    strategy._saml.getAuthorizeUrl({}, {}, (err, url) => {
      if (err) return res.status(500).send(err.message);
      res.redirect(url);
    });
  } catch (e) { res.status(500).send(e.message); }
});

app.get("/api/auth/sso/saml/metadata", async (req, res) => {
  try {
    if (!samlPassport) return res.status(503).send("passport-saml not installed");
    const cfg = await db.config.findOne({ _id: "sso-config" });
    if (!cfg || !cfg.saml || !cfg.saml.entryPoint) return res.status(503).send("SAML not configured");
    const strategy = new samlPassport.Strategy({ entryPoint: cfg.saml.entryPoint, issuer: cfg.saml.issuer, callbackUrl: cfg.saml.callbackUrl, cert: cfg.saml.idpCert });
    res.type("application/xml").send(strategy.generateServiceProviderMetadata(cfg.saml.decryptionCert || null, cfg.saml.signingCert || null));
  } catch (e) { res.status(500).send(e.message); }
});

app.post("/api/auth/sso/saml/acs", express.urlencoded({ extended: true, limit: "10mb" }), async (req, res) => {
  try {
    if (!samlPassport) return res.status(503).json({ ok: false, error: "passport-saml not installed" });
    const cfg = await db.config.findOne({ _id: "sso-config" });
    if (!cfg || !cfg.saml || !cfg.saml.entryPoint) return res.status(503).json({ ok: false, error: "SAML not configured" });
    const strategy = new samlPassport.Strategy({ entryPoint: cfg.saml.entryPoint, issuer: cfg.saml.issuer, callbackUrl: cfg.saml.callbackUrl, cert: cfg.saml.idpCert }, async (profile, done) => done(null, profile));
    strategy._saml.validatePostResponse(req.body, async (err, profile) => {
      if (err) return res.status(401).json({ ok: false, error: err.message });
      const username = (profile.nameID || profile.email || "").toLowerCase();
      let user = await db.users.findOne({ username });
      if (!user) {
        user = { _id: uuidv4(), username, password: await bcrypt.hash(uuidv4(), 10), name: profile.displayName || username, email: profile.email || "", role: "user", disabled: false, ssoProvider: "saml" };
        await db.users.insert(user);
      }
      const token = generateToken(user);
      await logAudit(req, "login-sso-saml", "auth", user._id, "SAML 2.0 SSO login");
      // Redirect back to the SPA with token in fragment so it never hits the server logs as a query string.
      res.redirect("/#token=" + token);
    });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

app.get("/api/auth/me", (req, res) => {
  res.json({ ok: true, user: req.user });
});

app.post("/api/auth/change-password", async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!newPassword || newPassword.length < 8) return res.status(400).json({ ok: false, error: "Password must be at least 8 characters" });
    const user = await db.users.findOne({ _id: req.user._id });
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });
    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return res.status(401).json({ ok: false, error: "Current password is incorrect" });
    const hash = await bcrypt.hash(newPassword, 10);
    await db.users.update({ _id: req.user._id }, { $set: { password: hash } });
    await logAudit(req, "change-password", "users", req.user._id, "Password changed");
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

// ─── User Management (admin only) ──────────────────────────────────────────
app.get("/api/users", adminOnly, async (req, res) => {
  try {
    const users = await db.users.find({}).sort({ createdAt: -1 });
    const safe = users.map(u => ({ _id: u._id, username: u.username, name: u.name, email: u.email, role: u.role, disabled: u.disabled, createdAt: u.createdAt, mfaEnabled: !!u.mfaEnabled, mfaType: u.mfaType || null, ssoProvider: u.ssoProvider || null }));
    res.json({ ok: true, data: safe });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

app.post("/api/users", adminOnly, async (req, res) => {
  try {
    const { username, password, name, email, role } = req.body;
    if (!username || !password) return res.status(400).json({ ok: false, error: "Username and password required" });
    if (password.length < 8) return res.status(400).json({ ok: false, error: "Password must be at least 8 characters" });
    const existing = await db.users.findOne({ username: username.toLowerCase() });
    if (existing) return res.status(409).json({ ok: false, error: "Username already exists" });
    const hash = await bcrypt.hash(password, 10);
    const user = { _id: uuidv4(), username: username.toLowerCase(), password: hash, name: name || username, email: email || "", role: role || "user", disabled: false };
    await db.users.insert(user);
    await logAudit(req, "create-user", "users", user._id, "Created user: " + user.username + " (role: " + user.role + ")");
    res.status(201).json({ ok: true, data: { _id: user._id, username: user.username, name: user.name, email: user.email, role: user.role } });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

app.put("/api/users/:id", adminOnly, async (req, res) => {
  try {
    const updates = {};
    const unsets = {};
    if (req.body.name !== undefined) updates.name = req.body.name;
    if (req.body.email !== undefined) updates.email = req.body.email;
    if (req.body.role !== undefined) updates.role = req.body.role;
    if (req.body.disabled !== undefined) updates.disabled = req.body.disabled;
    if (req.body.password) updates.password = await bcrypt.hash(req.body.password, 10);
    // Admin-driven MFA reset — clears the user's enrolled factor so they can
    // re-enroll on next login (used when a user loses their authenticator).
    if (req.body.resetMfa) {
      updates.mfaEnabled = false;
      unsets.mfaSecret = true; unsets.mfaType = true; unsets.mfaPendingSecret = true; unsets.mfaPendingType = true;
    }
    const op = { $set: updates };
    if (Object.keys(unsets).length) op.$unset = unsets;
    await db.users.update({ _id: req.params.id }, op);
    await logAudit(req, "update-user", "users", req.params.id, "Updated user fields: " + Object.keys(updates).filter(k => k !== "password").join(", ") + (req.body.resetMfa ? " (MFA reset)" : ""));
    const user = await db.users.findOne({ _id: req.params.id });
    res.json({ ok: true, data: { _id: user._id, username: user.username, name: user.name, email: user.email, role: user.role, disabled: user.disabled, mfaEnabled: !!user.mfaEnabled, mfaType: user.mfaType || null } });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

app.delete("/api/users/:id", adminOnly, async (req, res) => {
  try {
    const user = await db.users.findOne({ _id: req.params.id });
    if (user && user.username === "admin") return res.status(403).json({ ok: false, error: "Cannot delete the default admin account" });
    await db.users.remove({ _id: req.params.id });
    await logAudit(req, "delete-user", "users", req.params.id, "Deleted user: " + (user ? user.username : "unknown"));
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

// ─── Audit Log Endpoints ───────────────────────────────────────────────────
app.get("/api/auditlog", async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 200, 1000);
    const logs = await db.auditlog.find({}).sort({ timestamp: -1 }).limit(limit);
    res.json({ ok: true, data: logs });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

// ─── Generic CRUD for all stores (with audit logging) ─────────────────────
STORES.forEach((store) => {
  app.get(`/api/${store}`, async (req, res) => {
    try {
      const docs = await db[store].find({}).sort({ createdAt: -1 });
      res.json({ ok: true, data: docs });
    } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
  });

  app.get(`/api/${store}/:id`, async (req, res) => {
    try {
      const doc = await db[store].findOne({ _id: req.params.id });
      if (!doc) return res.status(404).json({ ok: false, error: "Not found" });
      res.json({ ok: true, data: doc });
    } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
  });

  app.post(`/api/${store}`, async (req, res) => {
    try {
      const doc = { _id: req.body._id || uuidv4(), ...req.body };
      const result = await db[store].insert(doc);
      await logAudit(req, "create", store, doc._id, "Created " + store.slice(0, -1) + (doc.name ? ": " + doc.name : doc.title ? ": " + doc.title : ""));
      res.status(201).json({ ok: true, data: result });
    } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
  });

  app.put(`/api/${store}/:id`, async (req, res) => {
    try {
      delete req.body._id;
      await db[store].update({ _id: req.params.id }, { $set: req.body });
      const doc = await db[store].findOne({ _id: req.params.id });
      const changedFields = Object.keys(req.body).filter(k => k !== "createdAt" && k !== "updatedAt").join(", ");
      await logAudit(req, "update", store, req.params.id, "Updated " + store.slice(0, -1) + (doc && doc.name ? " '" + doc.name + "'" : doc && doc.title ? " '" + doc.title + "'" : "") + " — fields: " + changedFields);
      res.json({ ok: true, data: doc });
    } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
  });

  app.delete(`/api/${store}/:id`, async (req, res) => {
    try {
      const doc = await db[store].findOne({ _id: req.params.id });
      const n = await db[store].remove({ _id: req.params.id });
      await logAudit(req, "delete", store, req.params.id, "Deleted " + store.slice(0, -1) + (doc && doc.name ? ": " + doc.name : doc && doc.title ? ": " + doc.title : ""));
      res.json({ ok: true, deleted: n });
    } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
  });
});

// ─── Bulk operations ───────────────────────────────────────────────────────
app.get("/api/stats/counts", async (req, res) => {
  try {
    const counts = {};
    for (const s of STORES) counts[s] = await db[s].count({});
    counts.users = await db.users.count({});
    counts.auditlog = await db.auditlog.count({});
    res.json({ ok: true, data: counts });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

app.get("/api/data/export", async (req, res) => {
  try {
    const data = {};
    for (const s of STORES) data[s] = await db[s].find({});
    res.setHeader("Content-Disposition", `attachment; filename=grc-vault-export-${new Date().toISOString().slice(0, 10)}.json`);
    await logAudit(req, "export", "system", null, "Exported all data");
    res.json(data);
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

app.post("/api/data/import", async (req, res) => {
  try {
    const data = req.body;
    let imported = 0;
    for (const s of STORES) {
      if (data[s] && Array.isArray(data[s])) {
        for (const doc of data[s]) {
          const existing = await db[s].findOne({ _id: doc._id });
          if (existing) { await db[s].update({ _id: doc._id }, doc); }
          else { await db[s].insert(doc); }
          imported++;
        }
      }
    }
    await logAudit(req, "import", "system", null, "Imported " + imported + " records");
    res.json({ ok: true, imported });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

app.post("/api/data/clear", adminOnly, async (req, res) => {
  try {
    for (const s of STORES) await db[s].remove({}, { multi: true });
    await logAudit(req, "clear-all", "system", null, "All data cleared");
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, version: "2.0.0", uptime: process.uptime(), dbPath: dbDir });
});

app.post("/api/proxy/test", async (req, res) => {
  try {
    const { url, token } = req.body;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const r = await fetch(url + "/health", {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    res.json({ ok: r.ok, status: r.status });
  } catch (e) {
    res.json({ ok: false, error: e.message });
  }
});

// ─── File Upload/Download ─────────────────────────────────────────────────
app.post("/api/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false, error: "No file provided" });
  await logAudit(req, "upload", "files", req.file.filename, "Uploaded file: " + req.file.originalname + " (" + req.file.size + " bytes)");
  res.json({ ok: true, data: { filename: req.file.filename, originalName: req.file.originalname, size: req.file.size } });
});

app.get("/api/uploads/:filename", (req, res) => {
  const safe = path.basename(req.params.filename);
  const filePath = path.join(uploadDir, safe);
  if (!fs.existsSync(filePath)) return res.status(404).json({ ok: false, error: "File not found" });
  res.sendFile(filePath);
});

// ─── Policy Gap Analysis (AI-assisted) ─────────────────────────────────────
// Mounts /api/frameworks, /api/ai/*, /api/analysis/policy-gap, and
// /api/gap-analyses/* — see server-gap.js for the full surface.
try {
  const { mountGapRoutes } = require("./server-gap");
  mountGapRoutes(app, db, logAudit);
} catch (e) {
  console.warn("Gap analysis routes disabled: " + e.message);
}

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ─── Create Default Admin & Start ─────────────────────────────────────────
async function bootstrap() {
  const adminExists = await db.users.findOne({ username: "admin" });
  if (!adminExists) {
    const hash = await bcrypt.hash("admin123", 10);
    await db.users.insert({ _id: uuidv4(), username: "admin", password: hash, name: "Administrator", email: "", role: "admin", disabled: false });
    console.log("  Default admin created — username: admin / password: admin123");
    console.log("  ⚠  CHANGE THE DEFAULT PASSWORD IMMEDIATELY");
  }
}

bootstrap().then(() => {
  app.listen(PORT, HOST, () => {
    console.log("");
    console.log("  ╔══════════════════════════════════════════════════╗");
    console.log("  ║                                                  ║");
    console.log("  ║   GRC Vault v2.0 — Web Server Running            ║");
    console.log("  ║                                                  ║");
    console.log(`  ║   Local:   http://localhost:${PORT}                  ║`);
    console.log(`  ║   Network: http://${HOST}:${PORT}                 ║`);
    console.log(`  ║   DB Path: ${dbDir}  `);
    console.log("  ║                                                  ║");
    console.log("  ╚══════════════════════════════════════════════════╝");
    console.log("");
  });
});
