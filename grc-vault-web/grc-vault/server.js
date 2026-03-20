const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const Datastore = require("nedb-promises");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

// ─── Database Setup ────────────────────────────────────────────────────────
const dbDir = process.env.DB_PATH || path.join(__dirname, "db", "data");
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

const STORES = ["audits", "risks", "controls", "policies", "findings", "evidence", "benchmarks", "config"];
const db = {};
STORES.forEach((name) => {
  db[name] = Datastore.create({ filename: path.join(dbDir, `${name}.db`), autoload: true, timestampData: true });
});

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

// ─── Generic CRUD for all stores ───────────────────────────────────────────
STORES.forEach((store) => {
  // List all
  app.get(`/api/${store}`, async (req, res) => {
    try {
      const docs = await db[store].find({}).sort({ createdAt: -1 });
      res.json({ ok: true, data: docs });
    } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
  });

  // Get one
  app.get(`/api/${store}/:id`, async (req, res) => {
    try {
      const doc = await db[store].findOne({ _id: req.params.id });
      if (!doc) return res.status(404).json({ ok: false, error: "Not found" });
      res.json({ ok: true, data: doc });
    } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
  });

  // Create
  app.post(`/api/${store}`, async (req, res) => {
    try {
      const doc = { _id: req.body._id || uuidv4(), ...req.body };
      const result = await db[store].insert(doc);
      res.status(201).json({ ok: true, data: result });
    } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
  });

  // Update
  app.put(`/api/${store}/:id`, async (req, res) => {
    try {
      delete req.body._id;
      await db[store].update({ _id: req.params.id }, { $set: req.body });
      const doc = await db[store].findOne({ _id: req.params.id });
      res.json({ ok: true, data: doc });
    } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
  });

  // Delete
  app.delete(`/api/${store}/:id`, async (req, res) => {
    try {
      const n = await db[store].remove({ _id: req.params.id });
      res.json({ ok: true, deleted: n });
    } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
  });
});

// ─── Bulk operations ───────────────────────────────────────────────────────
app.get("/api/stats/counts", async (req, res) => {
  try {
    const counts = {};
    for (const s of STORES) counts[s] = await db[s].count({});
    res.json({ ok: true, data: counts });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

// Export all data
app.get("/api/data/export", async (req, res) => {
  try {
    const data = {};
    for (const s of STORES) data[s] = await db[s].find({});
    res.setHeader("Content-Disposition", `attachment; filename=grc-vault-export-${new Date().toISOString().slice(0, 10)}.json`);
    res.json(data);
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

// Import data
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
    res.json({ ok: true, imported });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

// Clear all data
app.post("/api/data/clear", async (req, res) => {
  try {
    for (const s of STORES) await db[s].remove({}, { multi: true });
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

// API health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true, version: "2.0.0", uptime: process.uptime(), dbPath: dbDir });
});

// External API proxy test
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
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false, error: "No file provided" });
  res.json({ ok: true, data: { filename: req.file.filename, originalName: req.file.originalname, size: req.file.size } });
});

app.get("/api/uploads/:filename", (req, res) => {
  const safe = path.basename(req.params.filename);
  const filePath = path.join(uploadDir, safe);
  if (!fs.existsSync(filePath)) return res.status(404).json({ ok: false, error: "File not found" });
  res.sendFile(filePath);
});

// SPA fallback — serve index.html for any non-API route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ─── Start ─────────────────────────────────────────────────────────────────
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
