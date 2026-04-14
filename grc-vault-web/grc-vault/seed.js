/**
 * GRC Vault — Seed Data
 * Run: node seed.js
 * Populates the database with realistic demo data across all modules.
 */

const http = require("http");

const BASE = `http://localhost:${process.env.PORT || 3000}`;

function post(path, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const url = new URL(path, BASE);
    const req = http.request(url, { method: "POST", headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) } }, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => resolve(JSON.parse(d)));
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function seed() {
  console.log("\n  Seeding GRC Vault with demo data...\n");

  // ── Audits ───────────────────────────────────────────────────────────────
  const audits = [
    { name: "Q1 2026 SOC 2 Type II", framework: "SOC 2", status: "In Progress", scope: "Cloud infrastructure, CI/CD pipeline, production databases", auditor: "Sarah Chen", startDate: "2026-01-15", endDate: "2026-03-30", notes: "Annual SOC 2 engagement covering Security, Availability, and Confidentiality trust service criteria." },
    { name: "Annual HIPAA Security Assessment", framework: "HIPAA", status: "Planning", scope: "EHR system, patient portal, data warehouse", auditor: "Marcus Johnson", startDate: "2026-04-01", endDate: "2026-05-15", notes: "Required annual HIPAA security risk assessment per §164.308(a)(1)." },
    { name: "PCI DSS v4.0 Compliance Audit", framework: "PCI DSS v4.0", status: "Completed", scope: "Payment processing, cardholder data environment, network segmentation", auditor: "External: Coalfire", startDate: "2025-10-01", endDate: "2025-12-15", notes: "Full PCI DSS v4.0 assessment. SAQ D merchant level 2." },
    { name: "ISO 27001 Surveillance Audit", framework: "ISO 27001", status: "Review", scope: "Information security management system (ISMS)", auditor: "David Park, BSI Group", startDate: "2026-02-01", endDate: "2026-02-28", notes: "Year 2 surveillance audit for ISO 27001:2022 certification." },
    { name: "NIST CSF Gap Analysis", framework: "NIST CSF", status: "Completed", scope: "Enterprise-wide cybersecurity posture", auditor: "Internal: Risk Team", startDate: "2025-11-01", endDate: "2025-12-20", notes: "Baseline gap analysis against NIST CSF 2.0 to prioritize security investments." },
    { name: "GDPR Article 30 Records Review", framework: "GDPR", status: "In Progress", scope: "EU customer data processing activities", auditor: "Elena Vasquez, DPO", startDate: "2026-02-15", endDate: "2026-04-01", notes: "Review of processing activity records and data protection impact assessments." },
  ];
  for (const a of audits) { const r = await post("/api/audits", a); console.log(`  ✓ Audit: ${a.name}`); }

  // ── Findings ─────────────────────────────────────────────────────────────
  // Get audit IDs
  const auditRes = await new Promise((resolve, reject) => {
    http.get(`${BASE}/api/audits`, (res) => { let d = ""; res.on("data", c => d += c); res.on("end", () => resolve(JSON.parse(d))); }).on("error", reject);
  });
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
  ];
  for (const p of policies) { await post("/api/policies", p); }
  console.log(`  ✓ ${policies.length} policies created`);

  console.log("\n  ✅ Seed complete! Refresh the browser to see data.\n");
}

seed().catch((e) => { console.error("Seed failed:", e.message); console.error("Make sure the server is running: npm start"); process.exit(1); });
