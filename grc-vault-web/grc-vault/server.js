const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const Datastore = require("nedb-promises");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ ok: false, error: "Username and password required" });
    const user = await db.users.findOne({ username: username.toLowerCase() });
    if (!user) return res.status(401).json({ ok: false, error: "Invalid credentials" });
    if (user.disabled) return res.status(401).json({ ok: false, error: "Account is disabled" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ ok: false, error: "Invalid credentials" });
    const token = generateToken(user);
    await logAudit(req, "login", "auth", user._id, "User logged in");
    res.json({ ok: true, token, user: { _id: user._id, username: user.username, name: user.name, role: user.role, email: user.email } });
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
    const safe = users.map(u => ({ _id: u._id, username: u.username, name: u.name, email: u.email, role: u.role, disabled: u.disabled, createdAt: u.createdAt }));
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
    if (req.body.name !== undefined) updates.name = req.body.name;
    if (req.body.email !== undefined) updates.email = req.body.email;
    if (req.body.role !== undefined) updates.role = req.body.role;
    if (req.body.disabled !== undefined) updates.disabled = req.body.disabled;
    if (req.body.password) updates.password = await bcrypt.hash(req.body.password, 10);
    await db.users.update({ _id: req.params.id }, { $set: updates });
    await logAudit(req, "update-user", "users", req.params.id, "Updated user fields: " + Object.keys(updates).filter(k => k !== "password").join(", "));
    const user = await db.users.findOne({ _id: req.params.id });
    res.json({ ok: true, data: { _id: user._id, username: user.username, name: user.name, email: user.email, role: user.role, disabled: user.disabled } });
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
