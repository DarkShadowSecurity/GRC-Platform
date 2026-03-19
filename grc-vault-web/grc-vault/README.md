# GRC Vault — Enterprise Governance, Risk & Compliance Platform

A web-based GRC platform for audit collection, risk assessment, compliance tracking,
and enterprise risk benchmarking. Install on any **Linux** or **Windows** server and
access from any browser.

---

## Quick Start

```bash
# 1. Install Node.js 18+ (https://nodejs.org)

# 2. Clone/extract the project
cd grc-vault

# 3. Install dependencies
npm install

# 4. Start the server
npm start
```

Open your browser to **http://localhost:3000**

Access from other devices on your network using `http://<server-ip>:3000`

---

## Configuration

### Environment Variables

| Variable  | Default       | Description                    |
|-----------|---------------|--------------------------------|
| `PORT`    | `3000`        | Web server port                |
| `HOST`    | `0.0.0.0`     | Bind address                   |
| `DB_PATH` | `./db/data`   | Database file directory        |

```bash
# Example: custom port and database location
PORT=8080 DB_PATH=/var/lib/grc-vault npm start
```

---

## Install as a System Service

### Linux (systemd)

```bash
# Copy the service file
sudo cp grc-vault.service /etc/systemd/system/

# Edit to match your install path
sudo nano /etc/systemd/system/grc-vault.service

# Enable and start
sudo systemctl daemon-reload
sudo systemctl enable grc-vault
sudo systemctl start grc-vault

# Check status
sudo systemctl status grc-vault
```

### Windows

```powershell
# Option 1: Use node-windows (npm install -g node-windows)
# Option 2: Use NSSM (https://nssm.cc)
nssm install GRCVault "C:\Program Files\nodejs\node.exe" "C:\grc-vault\server.js"
nssm start GRCVault
```

---

## Production Deployment

### Behind nginx (recommended)

```nginx
server {
    listen 443 ssl;
    server_name grc.yourcompany.com;

    ssl_certificate     /etc/ssl/certs/grc.crt;
    ssl_certificate_key /etc/ssl/private/grc.key;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Application Modules

### 1. Dashboard
Real-time overview: open audits, critical risks, open findings, compliance score,
risk distribution chart, compliance donut, and recent activity.

### 2. Audit Collection
Create audits mapped to 7 frameworks (NIST CSF, ISO 27001, SOC 2, HIPAA,
PCI DSS, GDPR, CMMC). Record findings with severity, related controls, and
remediation recommendations. Full audit lifecycle tracking.

### 3. Risk Register
5×5 Likelihood × Impact scoring with control effectiveness. Interactive heat
map, residual risk calculation, and four treatment strategies (Mitigate,
Accept, Transfer, Avoid).

### 4. Risk Benchmarks
Industry data across 8 sectors. Financial impact modeling: estimated breach
cost, compliance fines, Annual Expected Loss, Risk Capital, and composite
Risk Index — all adjustable by company size and revenue.

### 5. Compliance Tracking
Framework-specific control mapping. Track implementation status across all 7
frameworks. Coverage percentage with partial implementation weighting.

### 6. Governance
Policy, procedure, standard, guideline, and plan management with versioning,
approval status, ownership, and scheduled review dates.

### 7. Reports
Generate Executive Summary, Risk Register, and Audit Findings reports with
timestamps.

### 8. User Manual
Built-in documentation covering every module, scoring methodology, API
configuration, and operational procedures.

### 9. Settings
- External REST API configuration with connection testing
- JSON data export and import
- Database store viewer with record counts
- Full data clear

---

## REST API

All data is accessible via RESTful API endpoints:

```
GET    /api/{store}         List all records
GET    /api/{store}/:id     Get single record
POST   /api/{store}         Create record
PUT    /api/{store}/:id     Update record
DELETE /api/{store}/:id     Delete record

GET    /api/stats/counts    Record counts per store
GET    /api/data/export     Export all data (JSON)
POST   /api/data/import     Import data (JSON body)
POST   /api/data/clear      Delete all data
GET    /api/health          Server health check
```

**Stores:** audits, risks, controls, policies, findings, evidence, benchmarks, config

---

## Risk Scoring

```
Raw Score       = Likelihood (1-5) × Impact (1-5)
Residual Score  = Raw × (1 − Control Effectiveness%)

Risk Levels:
  Critical  = 20–25   → Immediate action
  High      = 12–19   → 30-day remediation
  Medium    =  6–11   → 90-day remediation
  Low       =  1–5    → Accept / monitor

Benchmark Financial Model:
  Est. Breach Cost  = Industry Baseline × Size × Revenue Factor
  AEL               = (Breach × Surface + Fines × Reg.) × (Incidents/20)
  Risk Capital      = AEL × 1.5
  Risk Index        = (Avg Residual / 25) × 100 × Attack Surface
```

---

## Project Structure

```
grc-vault/
├── server.js              # Express web server + API routes
├── package.json           # Dependencies
├── public/                # Static web frontend
│   ├── index.html         # SPA shell
│   ├── css/app.css        # Design system
│   └── js/app.js          # Application logic
├── db/data/               # NeDB database files (auto-created)
├── grc-vault.service      # systemd service file
├── setup.sh               # Linux setup script
├── setup.bat              # Windows setup script
└── README.md
```

---

## Technology

- **Node.js + Express** — Web server and REST API
- **NeDB** — Embedded persistent database (zero config)
- **Vanilla JS SPA** — No build step, no framework dependencies
- **IBM Plex** — Professional typography

---

## License

MIT
