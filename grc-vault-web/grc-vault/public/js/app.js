// ═══════════════════════════════════════════════════════════════════════════
// GRC VAULT — Web Application
// ═══════════════════════════════════════════════════════════════════════════

// ─── API Client ────────────────────────────────────────────────────────────
const API = {
  async get(store)        { return (await fetch(`/api/${store}`)).json(); },
  async getOne(store, id) { return (await fetch(`/api/${store}/${id}`)).json(); },
  async create(store, d)  { return (await fetch(`/api/${store}`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(d) })).json(); },
  async update(store,id,d){ return (await fetch(`/api/${store}/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(d) })).json(); },
  async del(store, id)    { return (await fetch(`/api/${store}/${id}`, { method:'DELETE' })).json(); },
  async counts()          { return (await fetch('/api/stats/counts')).json(); },
  async exportAll()       { const r = await fetch('/api/data/export'); return r.json(); },
  async importAll(data)   { return (await fetch('/api/data/import', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) })).json(); },
  async clearAll()        { return (await fetch('/api/data/clear', { method:'POST' })).json(); },
  async health()          { return (await fetch('/api/health')).json(); },
  async testProxy(url,tk) { return (await fetch('/api/proxy/test', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({url,token:tk}) })).json(); },
};

// ─── State ─────────────────────────────────────────────────────────────────
const S = { module:'dashboard', audits:[], risks:[], controls:[], policies:[], findings:[], config:{} };

// ─── Helpers ───────────────────────────────────────────────────────────────
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const uid = () => crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36)+Math.random().toString(36).slice(2,8);
const esc = s => { if(!s) return ''; const d=document.createElement('div'); d.textContent=s; return d.innerHTML; };

function riskScore(l,i,eff){ const raw=l*i; return { raw, residual: Math.round(raw*(1-eff/100)*10)/10 }; }
function riskLevel(s){
  if(s>=20) return {level:'Critical',cls:'b-critical',color:'var(--red)'};
  if(s>=12) return {level:'High',cls:'b-high',color:'var(--orange)'};
  if(s>=6)  return {level:'Medium',cls:'b-medium',color:'var(--yellow)'};
  return {level:'Low',cls:'b-low',color:'var(--green)'};
}
function heatColor(s){
  if(s>=20) return {bg:'var(--red-bg)',fg:'var(--red)'};
  if(s>=12) return {bg:'var(--orange-bg)',fg:'var(--orange)'};
  if(s>=6)  return {bg:'var(--yellow-bg)',fg:'var(--yellow)'};
  return {bg:'var(--green-bg)',fg:'var(--green)'};
}
function statusCls(s){
  const m={'Planning':'b-neutral','In Progress':'b-info','Review':'b-purple','Completed':'b-low','Open':'b-critical','Closed':'b-low','Draft':'b-neutral','Approved':'b-low','Retired':'b-neutral','Not Started':'b-critical','Partially Implemented':'b-medium','Implemented':'b-low'};
  return m[s]||'b-neutral';
}
function toast(msg, type='success') {
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

// ─── Icons ─────────────────────────────────────────────────────────────────
const I = {
  dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="4" rx="1.5"/><rect x="14" y="11" width="7" height="10" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>`,
  audit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><path d="M9 14l2 2 4-4"/></svg>`,
  risk: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  benchmark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  compliance: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`,
  governance: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`,
  reports: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>`,
  manual: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  upload: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>`,
};

// ─── Nav Config ────────────────────────────────────────────────────────────
const NAV = [
  {s:'OVERVIEW'},{id:'dashboard',l:'Dashboard',i:'dashboard'},
  {s:'MODULES'},{id:'audits',l:'Audit Collection',i:'audit'},{id:'risks',l:'Risk Register',i:'risk'},
  {id:'benchmarks',l:'Benchmarks',i:'benchmark'},{id:'compliance',l:'Compliance',i:'compliance'},
  {id:'governance',l:'Governance',i:'governance'},
  {s:'OUTPUT'},{id:'reports',l:'Reports',i:'reports'},{id:'manual',l:'User Manual',i:'manual'},
  {id:'settings',l:'Settings',i:'settings'},
];

const FW = {
  "NIST CSF":{c:["ID.AM","ID.BE","ID.GV","ID.RA","ID.RM","ID.SC","PR.AC","PR.AT","PR.DS","PR.IP","PR.MA","PR.PT","DE.AE","DE.CM","DE.DP","RS.RP","RS.CO","RS.AN","RS.MI","RS.IM","RC.RP","RC.IM","RC.CO"]},
  "ISO 27001":{c:["A.5","A.6","A.7","A.8","A.9","A.10","A.11","A.12","A.13","A.14","A.15","A.16","A.17","A.18"]},
  "SOC 2":{c:["CC1","CC2","CC3","CC4","CC5","CC6","CC7","CC8","CC9","A1","C1","PI1","P1"]},
  "HIPAA":{c:["§164.308(a)(1)","§164.308(a)(2)","§164.308(a)(3)","§164.308(a)(4)","§164.310(a)","§164.310(b)","§164.310(c)","§164.310(d)","§164.312(a)","§164.312(b)","§164.312(c)","§164.312(d)","§164.312(e)"]},
  "PCI DSS":{c:["Req 1","Req 2","Req 3","Req 4","Req 5","Req 6","Req 7","Req 8","Req 9","Req 10","Req 11","Req 12"]},
  "GDPR":{c:["Art.5","Art.6","Art.7","Art.9","Art.12-14","Art.15-20","Art.25","Art.28","Art.30","Art.32","Art.33","Art.35","Art.37"]},
  "CMMC":{c:["AC","AT","AU","CM","IA","IR","MA","MP","PE","PS","RA","RE","RM","CA","SC","SI","PM"]},
};

const BM = {
  healthcare:{breach:10930000,incidents:22,fines:4500000,surface:.78,reg:.92},
  finance:{breach:5970000,incidents:31,fines:8200000,surface:.85,reg:.95},
  technology:{breach:4970000,incidents:28,fines:2100000,surface:.82,reg:.65},
  retail:{breach:3280000,incidents:15,fines:1800000,surface:.60,reg:.55},
  manufacturing:{breach:4470000,incidents:12,fines:900000,surface:.55,reg:.60},
  government:{breach:2600000,incidents:18,fines:500000,surface:.70,reg:.88},
  energy:{breach:4720000,incidents:14,fines:3200000,surface:.72,reg:.82},
  education:{breach:3650000,incidents:10,fines:600000,surface:.48,reg:.58},
};

// ─── Cross-Framework Control Mapping ─────────────────────────────────────
const CROSS_MAP = [
  { domain:"Governance & Policy", map:{"NIST CSF":["ID.GV"],"ISO 27001":["A.5"],"SOC 2":["CC1"],"HIPAA":["§164.308(a)(1)"],"PCI DSS":["Req 12"],"GDPR":["Art.5"],"CMMC":["PM"]}},
  { domain:"Asset Management", map:{"NIST CSF":["ID.AM"],"ISO 27001":["A.8"],"SOC 2":["CC6"],"PCI DSS":["Req 2"],"CMMC":["CM"]}},
  { domain:"Business Environment", map:{"NIST CSF":["ID.BE"],"ISO 27001":["A.5"],"SOC 2":["CC1"],"CMMC":["PM"]}},
  { domain:"Risk Assessment", map:{"NIST CSF":["ID.RA"],"ISO 27001":["A.12"],"SOC 2":["CC3","CC4"],"HIPAA":["§164.308(a)(1)"],"PCI DSS":["Req 6"],"GDPR":["Art.35"],"CMMC":["RA","RM"]}},
  { domain:"Risk Strategy", map:{"NIST CSF":["ID.RM"],"ISO 27001":["A.5"],"SOC 2":["CC3"],"CMMC":["RM"]}},
  { domain:"Supply Chain", map:{"NIST CSF":["ID.SC"],"ISO 27001":["A.15"],"SOC 2":["CC9"],"GDPR":["Art.28"],"CMMC":["PS"]}},
  { domain:"Access Control", map:{"NIST CSF":["PR.AC"],"ISO 27001":["A.9"],"SOC 2":["CC6"],"HIPAA":["§164.312(a)","§164.312(d)"],"PCI DSS":["Req 7","Req 8"],"GDPR":["Art.32"],"CMMC":["AC","IA"]}},
  { domain:"Awareness & Training", map:{"NIST CSF":["PR.AT"],"ISO 27001":["A.7"],"SOC 2":["CC1","CC2"],"HIPAA":["§164.308(a)(2)"],"PCI DSS":["Req 12"],"CMMC":["AT"]}},
  { domain:"Data Security", map:{"NIST CSF":["PR.DS"],"ISO 27001":["A.10","A.13"],"SOC 2":["CC6"],"HIPAA":["§164.312(a)","§164.312(e)"],"PCI DSS":["Req 3","Req 4"],"GDPR":["Art.32","Art.25"],"CMMC":["SC"]}},
  { domain:"Information Protection", map:{"NIST CSF":["PR.IP"],"ISO 27001":["A.12","A.14"],"SOC 2":["CC7","CC8"],"HIPAA":["§164.308(a)(4)"],"PCI DSS":["Req 6"],"GDPR":["Art.25"],"CMMC":["CM","SI"]}},
  { domain:"Maintenance", map:{"NIST CSF":["PR.MA"],"ISO 27001":["A.11"],"SOC 2":["CC6"],"HIPAA":["§164.310(a)"],"PCI DSS":["Req 6"],"CMMC":["MA"]}},
  { domain:"Protective Technology", map:{"NIST CSF":["PR.PT"],"ISO 27001":["A.13"],"SOC 2":["CC6","CC7"],"HIPAA":["§164.312(e)"],"PCI DSS":["Req 1"],"GDPR":["Art.32"],"CMMC":["SC","AC"]}},
  { domain:"Anomalies & Events", map:{"NIST CSF":["DE.AE"],"ISO 27001":["A.16"],"SOC 2":["CC7"],"HIPAA":["§164.312(b)"],"PCI DSS":["Req 10"],"CMMC":["AU","SI"]}},
  { domain:"Continuous Monitoring", map:{"NIST CSF":["DE.CM"],"ISO 27001":["A.12"],"SOC 2":["CC7"],"HIPAA":["§164.312(b)"],"PCI DSS":["Req 10","Req 11"],"CMMC":["AU","CA"]}},
  { domain:"Detection Processes", map:{"NIST CSF":["DE.DP"],"ISO 27001":["A.16","A.18"],"SOC 2":["CC7"],"HIPAA":["§164.308(a)(1)"],"PCI DSS":["Req 11"],"CMMC":["CA"]}},
  { domain:"Response Planning", map:{"NIST CSF":["RS.RP"],"ISO 27001":["A.16"],"SOC 2":["CC7"],"HIPAA":["§164.308(a)(4)"],"PCI DSS":["Req 12"],"CMMC":["IR"]}},
  { domain:"Response Communications", map:{"NIST CSF":["RS.CO"],"ISO 27001":["A.16"],"SOC 2":["CC2","CC7"],"HIPAA":["§164.308(a)(4)"],"GDPR":["Art.33"],"CMMC":["IR"]}},
  { domain:"Response Analysis", map:{"NIST CSF":["RS.AN"],"ISO 27001":["A.16"],"SOC 2":["CC7"],"CMMC":["IR"]}},
  { domain:"Response Mitigation", map:{"NIST CSF":["RS.MI"],"ISO 27001":["A.16"],"SOC 2":["CC7"],"CMMC":["IR"]}},
  { domain:"Response Improvements", map:{"NIST CSF":["RS.IM"],"ISO 27001":["A.16","A.18"],"SOC 2":["CC4"],"CMMC":["IR"]}},
  { domain:"Recovery Planning", map:{"NIST CSF":["RC.RP"],"ISO 27001":["A.17"],"SOC 2":["A1"],"HIPAA":["§164.308(a)(4)"],"PCI DSS":["Req 12"],"CMMC":["RE"]}},
  { domain:"Recovery Improvements", map:{"NIST CSF":["RC.IM"],"ISO 27001":["A.17"],"SOC 2":["A1"],"CMMC":["RE"]}},
  { domain:"Recovery Communications", map:{"NIST CSF":["RC.CO"],"ISO 27001":["A.17"],"SOC 2":["CC2"],"CMMC":["IR"]}},
  { domain:"Physical Security", map:{"ISO 27001":["A.11"],"HIPAA":["§164.310(a)","§164.310(b)","§164.310(c)","§164.310(d)"],"PCI DSS":["Req 9"],"CMMC":["PE","MP"]}},
  { domain:"Personnel Security", map:{"ISO 27001":["A.7"],"HIPAA":["§164.308(a)(3)"],"PCI DSS":["Req 12"],"CMMC":["PS"]}},
  { domain:"Data Privacy & Rights", map:{"GDPR":["Art.6","Art.7","Art.9","Art.12-14","Art.15-20"],"SOC 2":["P1"],"HIPAA":["§164.312(c)"]}},
  { domain:"Privacy by Design", map:{"GDPR":["Art.25","Art.30"],"SOC 2":["P1","PI1"],"CMMC":["PM"]}},
  { domain:"Privacy Officer / DPO", map:{"GDPR":["Art.37"],"HIPAA":["§164.308(a)(2)"]}},
  { domain:"Vulnerability Management", map:{"PCI DSS":["Req 5","Req 6"],"ISO 27001":["A.12"],"CMMC":["SI"]}},
  { domain:"Network Security", map:{"PCI DSS":["Req 1"],"ISO 27001":["A.13"],"CMMC":["SC","AC"]}},
  { domain:"Cryptography", map:{"ISO 27001":["A.10"],"PCI DSS":["Req 3","Req 4"],"CMMC":["SC"]}},
  { domain:"Confidentiality", map:{"SOC 2":["C1"],"ISO 27001":["A.8"],"CMMC":["SC"]}},
  { domain:"Availability & Recovery", map:{"SOC 2":["A1"],"ISO 27001":["A.17"],"CMMC":["RE"]}},
  { domain:"Processing Integrity", map:{"SOC 2":["PI1"],"ISO 27001":["A.14"],"CMMC":["SI"]}},
  { domain:"Monitoring & Assurance", map:{"SOC 2":["CC5"],"ISO 27001":["A.18"],"CMMC":["CA"]}},
];

function findMappedControls(framework, controlId) {
  const results = [];
  for (const group of CROSS_MAP) {
    const fwCtrls = group.map[framework] || [];
    if (fwCtrls.includes(controlId)) {
      for (const [fw, cids] of Object.entries(group.map)) {
        if (fw === framework) continue;
        for (const cid of cids) {
          if (!results.find(r => r.framework === fw && r.controlId === cid))
            results.push({ framework: fw, controlId: cid, domain: group.domain });
        }
      }
    }
  }
  return results;
}

function getControlDomains(framework, controlId) {
  const domains = [];
  for (const group of CROSS_MAP) {
    const fwCtrls = group.map[framework] || [];
    if (fwCtrls.includes(controlId)) domains.push(group.domain);
  }
  return domains;
}

// ─── Sidebar ───────────────────────────────────────────────────────────────
function renderSidebar() {
  $('#sidebarNav').innerHTML = NAV.map(n => {
    if (n.s) return `<div class="nav-label">${n.s}</div>`;
    return `<button class="nav-btn ${S.module===n.id?'active':''}" onclick="go('${n.id}')">${I[n.i]}<span>${n.l}</span></button>`;
  }).join('');
  const has = S.config && S.config.apiUrl;
  $('#statusDot').className = `status-dot ${has?'on':'off'}`;
  $('#statusTxt').textContent = has ? 'API Connected' : 'Local Database';
}

function toggleSidebar() { $('.sidebar').classList.toggle('collapsed'); }

function go(id) { S.module = id; renderSidebar(); render(); }

// ─── Modal ─────────────────────────────────────────────────────────────────
function modal(title, body, size='md', footer='') {
  closeModal();
  const el = document.createElement('div');
  el.className = 'overlay'; el.id = 'overlay';
  el.onclick = e => { if(e.target===el) closeModal(); };
  el.innerHTML = `<div class="modal modal-${size}"><div class="modal-head"><h3>${title}</h3><button class="modal-x" onclick="closeModal()">×</button></div><div class="modal-body">${body}</div>${footer?`<div class="modal-foot">${footer}</div>`:''}</div>`;
  document.body.appendChild(el);
}
function closeModal() { const o=$('#overlay'); if(o) o.remove(); }

// ─── Render Router ─────────────────────────────────────────────────────────
function render() {
  const c = $('#content');
  const fn = {dashboard:pgDash,audits:pgAudits,risks:pgRisks,benchmarks:pgBench,compliance:pgComp,governance:pgGov,reports:pgReports,manual:pgManual,settings:pgSettings};
  c.innerHTML = (fn[S.module]||pgDash)();
  if (S.module==='settings') settingsPostRender();
}

// ═══════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════
function pgDash() {
  const oa = S.audits.filter(a=>a.status!=='Completed').length;
  const levels = {Critical:0,High:0,Medium:0,Low:0};
  S.risks.forEach(r=>{ levels[riskLevel(r.residualScore||0).level]++; });
  const ic = S.controls.filter(c=>c.status==='Implemented').length;
  const cp = S.controls.length ? Math.round(ic/S.controls.length*100) : 0;
  const of_ = S.findings.filter(f=>f.status==='Open').length;
  const circ = Math.round(cp * 3.77);
  const mx = Math.max(levels.Critical,levels.High,levels.Medium,levels.Low,1);

  return `<div class="page">
    <div class="page-head"><div><h2>Dashboard</h2><p>Enterprise risk and compliance overview</p></div></div>
    <div class="grid g4 mb-24">
      <div class="card stat"><div class="stat-val" style="color:var(--blue)">${oa}</div><div class="stat-lbl">Open Audits</div></div>
      <div class="card stat"><div class="stat-val" style="color:var(--red)">${levels.Critical}</div><div class="stat-lbl">Critical Risks</div></div>
      <div class="card stat"><div class="stat-val" style="color:var(--orange)">${of_}</div><div class="stat-lbl">Open Findings</div></div>
      <div class="card stat"><div class="stat-val" style="color:var(--green)">${cp}%</div><div class="stat-lbl">Compliance</div></div>
    </div>
    <div class="grid g2 mb-24">
      <div class="card"><div class="card-head"><h3>Risk Distribution</h3></div>
        <div class="bars">${[['Critical','var(--red)',levels.Critical],['High','var(--orange)',levels.High],['Medium','var(--yellow)',levels.Medium],['Low','var(--green)',levels.Low]].map(([l,c,v])=>`<div class="bar-c"><div class="bar-v" style="color:${c}">${v}</div><div class="bar-f" style="background:${c};height:${Math.max(v/mx*100,4)}%"></div><div class="bar-l">${l}</div></div>`).join('')}</div>
      </div>
      <div class="card"><div class="card-head"><h3>Compliance Coverage</h3></div>
        <div class="donut"><svg viewBox="0 0 150 150"><circle cx="75" cy="75" r="62" fill="none" stroke="var(--border-0)" stroke-width="11"/><circle cx="75" cy="75" r="62" fill="none" stroke="var(--green)" stroke-width="11" stroke-dasharray="${circ} 390" stroke-linecap="round"/></svg><div class="donut-val" style="color:var(--green)">${cp}%</div></div>
        <div class="tac mt-8" style="font-size:12px;color:var(--t3)">${ic} of ${S.controls.length} controls implemented</div>
      </div>
    </div>
    <div class="card"><div class="card-head"><h3>Recent Audits</h3></div>
      ${S.audits.length===0?'<div class="empty"><p>No audits yet — create one in Audit Collection</p></div>':
        S.audits.slice(0,6).map(a=>`<div class="act-item"><div><div class="act-name">${esc(a.name)}</div><div class="act-meta">${esc(a.framework)} · ${esc(a.scope||'—')}</div></div><span class="badge ${statusCls(a.status)}">${a.status}</span></div>`).join('')}
    </div>
  </div>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// AUDITS
// ═══════════════════════════════════════════════════════════════════════════
function pgAudits() {
  return `<div class="page">
    <div class="page-head"><div><h2>Audit Collection</h2><p>Manage audits, record findings, and track evidence</p></div>
      <div class="page-head-actions"><button class="btn btn-primary" onclick="modalNewAudit()">${I.plus} New Audit</button></div></div>
    <div class="table-wrap"><table><thead><tr><th>Audit Name</th><th>Framework</th><th>Scope</th><th>Auditor</th><th>Status</th><th>Start</th><th>Findings</th><th class="cell-actions"></th></tr></thead>
      <tbody>${S.audits.length===0?'<tr><td colspan="8"><div class="empty"><p>No audits yet</p></div></td></tr>':
        S.audits.map(a=>{const fc=S.findings.filter(f=>f.auditId===a._id).length;
        return `<tr onclick="modalAuditDetail('${a._id}')" style="cursor:pointer"><td class="cell-bold">${esc(a.name)}</td><td>${esc(a.framework)}</td><td class="cell-dim">${esc(a.scope||'—')}</td><td class="cell-dim">${esc(a.auditor||'—')}</td><td><span class="badge ${statusCls(a.status)}">${a.status}</span></td><td class="cell-mono">${a.startDate||'—'}</td><td class="cell-mono">${fc}</td><td class="cell-actions"><button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();delAudit('${a._id}')">${I.trash}</button></td></tr>`;}).join('')}
      </tbody></table></div></div>`;
}

function modalNewAudit() {
  const fwOpts = Object.keys(FW).map(f=>`<option>${f}</option>`).join('');
  modal('Create New Audit',`
    <div class="fg"><label class="fl">Audit Name</label><input class="fi" id="fN" placeholder="e.g., Q1 2026 SOC 2 Type II"></div>
    <div class="fr fr2"><div class="fg"><label class="fl">Framework</label><select class="fs" id="fFw">${fwOpts}</select></div><div class="fg"><label class="fl">Status</label><select class="fs" id="fSt"><option>Planning</option><option>In Progress</option><option>Review</option><option>Completed</option></select></div></div>
    <div class="fg"><label class="fl">Scope</label><input class="fi" id="fSc" placeholder="e.g., Cloud infrastructure, data processing"></div>
    <div class="fr fr3"><div class="fg"><label class="fl">Lead Auditor</label><input class="fi" id="fAu" placeholder="Name"></div><div class="fg"><label class="fl">Start Date</label><input class="fi" id="fSD" type="date"></div><div class="fg"><label class="fl">End Date</label><input class="fi" id="fED" type="date"></div></div>
    <div class="fg"><label class="fl">Notes</label><textarea class="ft" id="fNo" placeholder="Audit objectives and criteria..."></textarea></div>
  `,'md',`<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveAudit()">Create Audit</button>`);
}

async function saveAudit() {
  const name=$('#fN').value.trim(); if(!name) return;
  const doc={_id:uid(),name,framework:$('#fFw').value,status:$('#fSt').value,scope:$('#fSc').value,auditor:$('#fAu').value,startDate:$('#fSD').value,endDate:$('#fED').value,notes:$('#fNo').value};
  await API.create('audits',doc); S.audits.unshift(doc); closeModal(); render(); toast('Audit created');
}

async function delAudit(id) {
  if(!confirm('Delete this audit and all its findings?')) return;
  await API.del('audits',id); S.audits=S.audits.filter(a=>a._id!==id);
  const linked=S.findings.filter(f=>f.auditId===id);
  for(const f of linked) await API.del('findings',f._id);
  S.findings=S.findings.filter(f=>f.auditId!==id); render(); toast('Audit deleted');
}

function modalAuditDetail(id) {
  const a=S.audits.find(x=>x._id===id); if(!a) return;
  const af=S.findings.filter(f=>f.auditId===id);
  modal(esc(a.name),`
    <div class="fr fr4">${[['Framework',a.framework],['Scope',a.scope||'—'],['Auditor',a.auditor||'—']].map(([l,v])=>`<div><div class="fl">${l}</div><div style="margin-top:5px">${esc(v)}</div></div>`).join('')}<div><div class="fl">Status</div><div style="margin-top:5px"><span class="badge ${statusCls(a.status)}">${a.status}</span></div></div></div>
    ${a.notes?`<div style="font-size:13px;color:var(--t2);line-height:1.7;padding:14px 0;border-top:1px solid var(--border-0)">${esc(a.notes)}</div>`:''}
    <div style="display:flex;justify-content:space-between;align-items:center"><h4 style="font-size:14px;font-weight:600">Findings (${af.length})</h4><button class="btn btn-primary btn-sm" onclick="closeModal();modalNewFinding('${id}')">${I.plus} Add Finding</button></div>
    ${af.length===0?'<div class="empty"><p>No findings recorded</p></div>':af.map(f=>`<div class="card" style="padding:16px;margin-top:6px"><div style="display:flex;justify-content:space-between;align-items:start"><div><div class="cell-bold">${esc(f.title)}</div><div style="font-size:12px;color:var(--t2);margin-top:5px;line-height:1.6">${esc(f.description)}</div>${f.recommendation?`<div style="font-size:12px;color:var(--accent);margin-top:6px">Rec: ${esc(f.recommendation)}</div>`:''}<div style="font-size:11px;color:var(--t4);margin-top:6px">Control: ${esc(f.control||'—')}</div></div><span class="badge ${f.severity==='Critical'?'b-critical':f.severity==='High'?'b-high':f.severity==='Medium'?'b-medium':'b-low'}">${f.severity}</span></div></div>`).join('')}
  `,'lg');
}

function modalNewFinding(aid) {
  modal('Add Finding',`
    <input type="hidden" id="fAid" value="${aid}">
    <div class="fg"><label class="fl">Title</label><input class="fi" id="fFT" placeholder="e.g., Missing MFA on admin accounts"></div>
    <div class="fr fr2"><div class="fg"><label class="fl">Severity</label><select class="fs" id="fFS"><option>Critical</option><option>High</option><option selected>Medium</option><option>Low</option></select></div><div class="fg"><label class="fl">Related Control</label><input class="fi" id="fFC" placeholder="e.g., PR.AC-1"></div></div>
    <div class="fg"><label class="fl">Description</label><textarea class="ft" id="fFD" placeholder="Detailed description..."></textarea></div>
    <div class="fg"><label class="fl">Recommendation</label><textarea class="ft" id="fFR" placeholder="Remediation steps..."></textarea></div>
  `,'md',`<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveFinding()">Save Finding</button>`);
}

async function saveFinding() {
  const t=$('#fFT').value.trim(); if(!t) return;
  const doc={_id:uid(),auditId:$('#fAid').value,title:t,severity:$('#fFS').value,control:$('#fFC').value,description:$('#fFD').value,recommendation:$('#fFR').value,status:'Open'};
  await API.create('findings',doc); S.findings.unshift(doc); closeModal(); render(); toast('Finding added');
}

// ═══════════════════════════════════════════════════════════════════════════
// RISK REGISTER
// ═══════════════════════════════════════════════════════════════════════════
function pgRisks() {
  let hm='';
  for(let l=5;l>=1;l--){
    hm+=`<div class="hm-y">${l}</div>`;
    for(let imp=1;imp<=5;imp++){const s=l*imp;const hc=heatColor(s);const cnt=S.risks.filter(r=>r.likelihood==l&&r.impact==imp).length;
      hm+=`<div class="hm-cell" style="background:${hc.bg};color:${hc.fg};${cnt?`box-shadow:inset 0 0 0 2px ${hc.fg}`:''}">${s}${cnt?`<div class="dot">●${cnt}</div>`:''}</div>`;
    }
  }
  hm+=`<div></div>${[1,2,3,4,5].map(i=>`<div class="hm-x">${i}</div>`).join('')}`;

  return `<div class="page">
    <div class="page-head"><div><h2>Risk Register</h2><p>Assess, quantify, and manage enterprise risks</p></div><div class="page-head-actions"><button class="btn btn-primary" onclick="modalNewRisk()">${I.plus} Add Risk</button></div></div>
    <div class="card mb-24"><div class="card-head"><h3>Risk Heat Map</h3><span style="font-size:12px;color:var(--t3)">Likelihood (Y) × Impact (X)</span></div><div class="hm">${hm}</div></div>
    <div class="table-wrap"><table><thead><tr><th>Risk</th><th>Category</th><th>Raw</th><th>Residual</th><th>Level</th><th>Treatment</th><th>Owner</th><th class="cell-actions"></th></tr></thead>
      <tbody>${S.risks.length===0?'<tr><td colspan="8"><div class="empty"><p>No risks registered</p></div></td></tr>':
        S.risks.map(r=>{const rl=riskLevel(r.residualScore||0);return `<tr><td class="cell-bold">${esc(r.name)}</td><td class="cell-dim">${r.category}</td><td class="cell-mono">${r.rawScore}</td><td class="cell-mono" style="color:${rl.color};font-weight:700">${r.residualScore}</td><td><span class="badge ${rl.cls}">${rl.level}</span></td><td class="cell-dim">${r.treatment}</td><td class="cell-dim">${esc(r.owner||'—')}</td><td class="cell-actions"><button class="btn btn-ghost btn-sm" onclick="delRisk('${r._id}')">${I.trash}</button></td></tr>`;}).join('')}
      </tbody></table></div></div>`;
}

function modalNewRisk() {
  modal('Add Risk Assessment',`
    <div class="fg"><label class="fl">Risk Name</label><input class="fi" id="rN" placeholder="e.g., Ransomware attack on production"></div>
    <div class="fr fr2"><div class="fg"><label class="fl">Category</label><select class="fs" id="rCat"><option>Operational</option><option>Financial</option><option>Strategic</option><option>Compliance</option><option>Reputational</option><option>Cybersecurity</option><option>Legal</option><option>Environmental</option></select></div><div class="fg"><label class="fl">Treatment</label><select class="fs" id="rTr"><option>Mitigate</option><option>Accept</option><option>Transfer</option><option>Avoid</option></select></div></div>
    <div class="fg"><label class="fl">Owner</label><input class="fi" id="rOw" placeholder="Person or team"></div>
    <div class="fg"><label class="fl">Description</label><textarea class="ft" id="rDe" placeholder="Risk description..."></textarea></div>
    <div class="fr fr3">
      <div class="range-wrap"><label class="fl">Likelihood (1–5)</label><input type="range" min="1" max="5" value="3" id="rL" oninput="riskPreview()"><div class="range-val" id="rvL" style="color:var(--accent)">3</div></div>
      <div class="range-wrap"><label class="fl">Impact (1–5)</label><input type="range" min="1" max="5" value="3" id="rI" oninput="riskPreview()"><div class="range-val" id="rvI" style="color:var(--orange)">3</div></div>
      <div class="range-wrap"><label class="fl">Control Eff. %</label><input type="range" min="0" max="100" value="50" id="rE" oninput="riskPreview()"><div class="range-val" id="rvE" style="color:var(--green)">50%</div></div>
    </div>
    <div class="card" style="padding:18px;background:var(--bg-input)"><div style="display:flex;justify-content:space-around;text-align:center">
      <div><div class="stat-val" style="font-size:22px" id="rvRaw">9</div><div class="stat-lbl">Raw</div></div>
      <div><div class="stat-val" style="font-size:22px" id="rvRes">4.5</div><div class="stat-lbl">Residual</div></div>
      <div><div class="stat-val" style="font-size:18px" id="rvLv">Low</div><div class="stat-lbl">Level</div></div>
    </div></div>
  `,'md',`<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveRisk()">Save Risk</button>`);
  riskPreview();
}

function riskPreview() {
  const l=+$('#rL').value,i=+$('#rI').value,e=+$('#rE').value,s=riskScore(l,i,e),rl=riskLevel(s.residual);
  $('#rvL').textContent=l;$('#rvI').textContent=i;$('#rvE').textContent=e+'%';
  $('#rvRaw').textContent=s.raw;$('#rvRes').textContent=s.residual;$('#rvRes').style.color=rl.color;
  $('#rvLv').textContent=rl.level;$('#rvLv').style.color=rl.color;
}

async function saveRisk() {
  const name=$('#rN').value.trim(); if(!name) return;
  const l=+$('#rL').value,i=+$('#rI').value,e=+$('#rE').value,s=riskScore(l,i,e);
  const doc={_id:uid(),name,category:$('#rCat').value,treatment:$('#rTr').value,owner:$('#rOw').value,description:$('#rDe').value,likelihood:l,impact:i,controlEffectiveness:e,rawScore:s.raw,residualScore:s.residual};
  await API.create('risks',doc); S.risks.unshift(doc); closeModal(); render(); toast('Risk added');
}

async function delRisk(id) { await API.del('risks',id); S.risks=S.risks.filter(r=>r._id!==id); render(); }

// ═══════════════════════════════════════════════════════════════════════════
// BENCHMARKS
// ═══════════════════════════════════════════════════════════════════════════
let bmI='technology',bmSz='mid',bmRv=50;

function pgBench() {
  const b=BM[bmI],sm=bmSz==='small'?.4:bmSz==='mid'?1:bmSz==='large'?2.5:5,rv=bmRv/100;
  const eb=Math.round(b.breach*sm*rv),ef=Math.round(b.fines*sm*rv);
  const ael=Math.round((eb*b.surface+ef*b.reg)*(b.incidents/20)),rc=Math.round(ael*1.5);
  const ar=S.risks.length?S.risks.reduce((s,r)=>s+(r.residualScore||0),0)/S.risks.length:0;
  const ri=Math.min(100,Math.round((ar/25)*100*b.surface));
  const indOpts=Object.keys(BM).map(k=>`<option value="${k}" ${bmI===k?'selected':''}>${k[0].toUpperCase()+k.slice(1)}</option>`).join('');
  const szOpts=[['small','Small (1–100)'],['mid','Mid (100–1K)'],['large','Large (1K–10K)'],['enterprise','Enterprise (10K+)']].map(([v,l])=>`<option value="${v}" ${bmSz===v?'selected':''}>${l}</option>`).join('');

  return `<div class="page">
    <div class="page-head"><div><h2>Risk Benchmarks</h2><p>Industry benchmarks to quantify true risk exposure and financial impact</p></div></div>
    <div class="card mb-24"><div class="card-head"><h3>Company Profile</h3></div>
      <div class="fr fr3"><div class="fg"><label class="fl">Industry</label><select class="fs" onchange="bmI=this.value;render()">${indOpts}</select></div><div class="fg"><label class="fl">Company Size</label><select class="fs" onchange="bmSz=this.value;render()">${szOpts}</select></div><div class="range-wrap"><label class="fl">Revenue ($M)</label><input type="range" min="1" max="500" value="${bmRv}" oninput="bmRv=+this.value;render()"><div style="font-size:18px;font-weight:700;font-family:var(--mono);color:var(--accent);text-align:center">$${bmRv}M</div></div></div>
    </div>
    <div class="grid g4 mb-24">
      <div class="card stat"><div class="stat-val" style="color:var(--red)">$${(eb/1e6).toFixed(1)}M</div><div class="stat-lbl">Est. Breach Cost</div><div class="stat-sub">Avg: $${(b.breach/1e6).toFixed(1)}M</div></div>
      <div class="card stat"><div class="stat-val" style="color:var(--orange)">$${(ef/1e6).toFixed(1)}M</div><div class="stat-lbl">Compliance Fines</div><div class="stat-sub">Burden: ${Math.round(b.reg*100)}%</div></div>
      <div class="card stat"><div class="stat-val" style="color:var(--yellow)">$${(ael/1e6).toFixed(1)}M</div><div class="stat-lbl">Annual Expected Loss</div><div class="stat-sub">Capital: $${(rc/1e6).toFixed(1)}M</div></div>
      <div class="card stat"><div class="stat-val" style="color:${ri>70?'var(--red)':ri>40?'var(--orange)':'var(--green)'}">${ri}</div><div class="stat-lbl">Risk Index</div><div class="stat-sub">Surface: ${Math.round(b.surface*100)}%</div></div>
    </div>
    <div class="card mb-24"><div class="card-head"><h3>Industry Comparison</h3></div>
      <div class="table-wrap" style="border:none"><table><thead><tr><th>Industry</th><th>Breach Cost</th><th>Incidents/yr</th><th>Attack Surface</th><th>Regulatory</th></tr></thead><tbody>
      ${Object.entries(BM).map(([k,v])=>`<tr style="${k===bmI?'background:var(--accent-dim)':''}"><td class="cell-bold" style="text-transform:capitalize">${k}</td><td class="cell-mono">$${(v.breach/1e6).toFixed(1)}M</td><td class="cell-mono">${v.incidents}</td><td><div class="pbar"><div class="pfill" style="width:${v.surface*100}%;background:${v.surface>.7?'var(--red)':'var(--accent)'}"></div></div></td><td><div class="pbar"><div class="pfill" style="width:${v.reg*100}%;background:${v.reg>.8?'var(--orange)':'var(--accent)'}"></div></div></td></tr>`).join('')}
      </tbody></table></div></div>
    <div class="card"><div class="card-head"><h3>Scoring Methodology</h3></div>
      <div class="code"><span class="k">Raw Score</span> = Likelihood × Impact <span class="c">(1–25 scale)</span>
<span class="k">Residual</span> = Raw × (1 − Control Effectiveness%) <span class="c">(after controls)</span>
<span class="f">AEL</span> = (Breach Cost × Attack Surface + Fines × Reg. Burden) × (Incidents / 20)
<span class="f">Risk Capital</span> = AEL × 1.5 <span class="c">(tail risk buffer)</span>
<span class="f">Risk Index</span> = (Avg Residual / 25) × 100 × Attack Surface <span class="c">(0–100)</span></div></div></div>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPLIANCE
// ═══════════════════════════════════════════════════════════════════════════
let compFw='NIST CSF';
let compView='framework';

function pgComp() {
  const activeFws = S.config.activeFrameworks || [];
  const allFws = Object.keys(FW);
  const displayFws = activeFws.length > 0 ? allFws.filter(fw => activeFws.includes(fw)) : allFws;
  if (!displayFws.includes(compFw) && displayFws.length > 0) compFw = displayFws[0];

  const fc = S.controls.filter(c => c.framework === compFw);
  const impl = fc.filter(c => c.status === 'Implemented').length;
  const part = fc.filter(c => c.status === 'Partially Implemented').length;
  const ns = fc.filter(c => c.status === 'Not Started').length;
  const cov = fc.length ? Math.round((impl + part * .5) / fc.length * 100) : 0;

  const fwCovData = displayFws.map(fw => {
    const fwc = S.controls.filter(c => c.framework === fw);
    const fi = fwc.filter(c => c.status === 'Implemented').length;
    const fp = fwc.filter(c => c.status === 'Partially Implemented').length;
    const pct = fwc.length ? Math.round((fi + fp * .5) / fwc.length * 100) : 0;
    return { fw, total: fwc.length, implemented: fi, partial: fp, pct };
  });

  const fwCheckboxes = allFws.map(fw => {
    const isActive = activeFws.includes(fw);
    return '<label class="fw-check ' + (isActive ? 'active' : '') + '" onclick="toggleActiveFramework(\'' + fw + '\')">'
      + '<span class="fw-check-box">' + (isActive ? '\u2713' : '') + '</span><span>' + fw + '</span></label>';
  }).join('');

  let crossMapHtml = '';
  if (compView === 'crossmap') {
    const filteredGroups = CROSS_MAP.filter(g => {
      let count = 0;
      for (const fw of displayFws) { if (g.map[fw] && g.map[fw].length) count++; }
      return count >= 2;
    });
    let cmRows = '';
    for (const g of filteredGroups) {
      let cells = '';
      for (const fw of displayFws) {
        const cids = g.map[fw] || [];
        if (!cids.length) { cells += '<td class="crossmap-cell" style="color:var(--t4)">\u2014</td>'; continue; }
        const statuses = cids.map(cid => {
          const ctrl = S.controls.find(c => c.framework === fw && c.controlId === cid);
          return ctrl ? ctrl.status : null;
        });
        let color = 'var(--t4)', icon = '\u25cb';
        if (statuses.some(s => s === 'Implemented')) { color = 'var(--green)'; icon = '\u25cf'; }
        else if (statuses.some(s => s === 'Partially Implemented')) { color = 'var(--yellow)'; icon = '\u25d0'; }
        else if (statuses.some(s => s === 'Not Started')) { color = 'var(--red)'; icon = '\u25cb'; }
        cells += '<td class="crossmap-cell" style="color:' + color + '" title="' + esc(cids.join(', ')) + '">' + icon + '<div class="cm-ids">' + esc(cids.join(', ')) + '</div></td>';
      }
      cmRows += '<tr><td class="cell-bold" style="font-size:12px">' + esc(g.domain) + '</td>' + cells + '</tr>';
    }
    let cmHeaders = '';
    for (const fw of displayFws) { cmHeaders += '<th style="text-align:center;font-size:9px;padding:10px 4px">' + esc(fw) + '</th>'; }
    crossMapHtml = '<div class="card mb-24"><div class="card-head"><h3>Cross-Framework Control Mapping</h3>'
      + '<span style="font-size:12px;color:var(--t3)">Controls that satisfy multiple frameworks simultaneously</span></div>'
      + '<div class="table-wrap" style="border:none"><table><thead><tr><th>Security Domain</th>' + cmHeaders
      + '</tr></thead><tbody>' + cmRows + '</tbody></table></div>'
      + '<div style="display:flex;gap:18px;padding:14px 0;font-size:11px;color:var(--t3)">'
      + '<span><span style="color:var(--green)">\u25cf</span> Implemented</span>'
      + '<span><span style="color:var(--yellow)">\u25d0</span> Partial</span>'
      + '<span><span style="color:var(--red)">\u25cb</span> Not Started</span>'
      + '<span><span style="color:var(--t4)">\u25cb</span> Not Tracked</span>'
      + '</div></div>';
  }

  let coverageSummary = '';
  if (displayFws.length > 1 && compView === 'framework') {
    let bars = '';
    for (const d of fwCovData) {
      const barColor = d.pct >= 80 ? 'var(--green)' : d.pct >= 50 ? 'var(--yellow)' : 'var(--red)';
      const labelColor = compFw === d.fw ? 'var(--accent)' : 'var(--t2)';
      bars += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">'
        + '<div style="min-width:80px;font-size:12px;font-weight:600;color:' + labelColor + '">' + esc(d.fw) + '</div>'
        + '<div class="pbar" style="flex:1;height:6px"><div class="pfill" style="width:' + d.pct + '%;background:' + barColor + '"></div></div>'
        + '<div style="min-width:80px;font-size:12px;font-family:var(--mono);color:var(--t2);text-align:right">' + d.pct + '% (' + d.total + ')</div></div>';
    }
    coverageSummary = '<div class="card mb-24"><div class="card-head"><h3>Framework Coverage Summary</h3></div>' + bars + '</div>';
  }

  let controlRows = '';
  if (compView === 'framework') {
    if (fc.length === 0) {
      controlRows = '<tr><td colspan="6"><div class="empty"><p>No controls for this framework \u2014 click Add Control to begin</p></div></td></tr>';
    } else {
      for (const c of fc) {
        const mapped = findMappedControls(c.framework, c.controlId);
        const mappedActive = mapped.filter(m => activeFws.length === 0 || activeFws.includes(m.framework));
        const mappedDone = mappedActive.filter(m => S.controls.find(x => x.framework === m.framework && x.controlId === m.controlId && x.status === 'Implemented'));
        let mapBadge = '<span style="color:var(--t4);font-size:11px">\u2014</span>';
        if (mappedActive.length > 0) {
          const mapTitle = esc(mappedActive.map(m => m.framework + ' ' + m.controlId).join(', '));
          mapBadge = '<span class="badge b-cyan" style="cursor:pointer" onclick="showMappedControls(\'' + c.framework + '\',\'' + c.controlId + '\')" title="' + mapTitle + '">\u2194 ' + mappedActive.length + ' fw' + (mappedDone.length ? ' \u00b7 ' + mappedDone.length + ' done' : '') + '</span>';
        }
        controlRows += '<tr>'
          + '<td class="cell-mono" style="color:var(--accent);font-weight:600">' + esc(c.controlId) + '</td>'
          + '<td class="cell-bold">' + esc(c.name) + '</td>'
          + '<td><select class="ctrl-status-sel" onchange="changeCtrlStatus(\'' + c._id + '\',this.value)">'
          + '<option' + (c.status === 'Not Started' ? ' selected' : '') + '>Not Started</option>'
          + '<option' + (c.status === 'Partially Implemented' ? ' selected' : '') + '>Partially Implemented</option>'
          + '<option' + (c.status === 'Implemented' ? ' selected' : '') + '>Implemented</option></select></td>'
          + '<td>' + mapBadge + '</td>'
          + '<td class="cell-dim">' + esc(c.owner || '\u2014') + '</td>'
          + '<td class="cell-actions"><button class="btn btn-ghost btn-sm" onclick="delCtrl(\'' + c._id + '\')">' + I.trash + '</button></td></tr>';
      }
    }
  }

  let html = '<div class="page">'
    + '<div class="page-head"><div><h2>Compliance Tracking</h2><p>Select frameworks, map controls, and track cross-framework implementation</p></div>'
    + '<div class="page-head-actions"><button class="btn btn-primary" onclick="modalNewCtrl()">' + I.plus + ' Add Control</button></div></div>'
    + '<div class="card mb-24"><div class="card-head"><h3>Active Frameworks</h3>'
    + '<span style="font-size:12px;color:var(--t3)">Select which frameworks apply to your organization</span></div>'
    + '<div class="fw-checks">' + fwCheckboxes + '</div>'
    + (activeFws.length === 0 ? '<div style="font-size:12px;color:var(--t4);margin-top:10px">No frameworks selected \u2014 showing all. Select the ones that apply to your organization.</div>' : '')
    + '</div>'
    + '<div class="tabs mb-24">'
    + '<button class="tab-btn ' + (compView === 'framework' ? 'on' : '') + '" onclick="compView=\'framework\';render()">Framework View</button>'
    + '<button class="tab-btn ' + (compView === 'crossmap' ? 'on' : '') + '" onclick="compView=\'crossmap\';render()">Cross-Framework Map</button></div>';

  if (compView === 'crossmap') {
    html += crossMapHtml;
  } else {
    let pillsHtml = '';
    for (const fw of displayFws) {
      pillsHtml += '<button class="pill ' + (compFw === fw ? 'on' : '') + '" onclick="compFw=\'' + fw + '\';render()">' + esc(fw) + '</button>';
    }
    html += '<div class="pills mb-24">' + pillsHtml + '</div>'
      + '<div class="grid g4 mb-24">'
      + '<div class="card stat"><div class="stat-val" style="color:var(--blue)">' + fc.length + '</div><div class="stat-lbl">Total Controls</div></div>'
      + '<div class="card stat"><div class="stat-val" style="color:var(--green)">' + impl + '</div><div class="stat-lbl">Implemented</div></div>'
      + '<div class="card stat"><div class="stat-val" style="color:var(--yellow)">' + part + '</div><div class="stat-lbl">Partial</div></div>'
      + '<div class="card stat"><div class="stat-val" style="color:var(--red)">' + ns + '</div><div class="stat-lbl">Not Started</div></div></div>';
    if (fc.length > 0) {
      html += '<div class="card mb-24"><div class="card-head"><h3>' + esc(compFw) + ' Coverage</h3><span class="cell-mono" style="color:var(--green)">' + cov + '%</span></div>'
        + '<div class="pbar" style="height:8px"><div class="pfill" style="width:' + cov + '%;background:var(--green)"></div></div></div>';
    }
    html += coverageSummary
      + '<div class="table-wrap"><table><thead><tr><th>Control ID</th><th>Name</th><th>Status</th><th>Maps To</th><th>Owner</th><th class="cell-actions"></th></tr></thead><tbody>'
      + controlRows + '</tbody></table></div>';
  }
  html += '</div>';
  return html;
}

async function toggleActiveFramework(fw) {
  if (!S.config.activeFrameworks) S.config.activeFrameworks = [];
  const idx = S.config.activeFrameworks.indexOf(fw);
  if (idx >= 0) S.config.activeFrameworks.splice(idx, 1);
  else S.config.activeFrameworks.push(fw);
  if (S.config._id) {
    await API.update('config', S.config._id, S.config);
  } else {
    S.config._id = 'main-config';
    await API.create('config', S.config);
  }
  render();
}

async function changeCtrlStatus(id, newStatus) {
  const ctrl = S.controls.find(c => c._id === id);
  if (!ctrl) return;
  ctrl.status = newStatus;
  await API.update('controls', id, { status: newStatus });

  const mapped = findMappedControls(ctrl.framework, ctrl.controlId);
  const activeFws = S.config.activeFrameworks || [];
  const mappedActive = mapped.filter(m => activeFws.length === 0 || activeFws.includes(m.framework));
  const rank = { 'Not Started': 0, 'Partially Implemented': 1, 'Implemented': 2 };
  let propagated = 0;

  for (const m of mappedActive) {
    const existing = S.controls.find(c => c.framework === m.framework && c.controlId === m.controlId);
    if (existing && rank[newStatus] > rank[existing.status]) {
      existing.status = newStatus;
      await API.update('controls', existing._id, { status: newStatus });
      propagated++;
    }
  }
  if (propagated > 0) toast('Status propagated to ' + propagated + ' mapped control' + (propagated > 1 ? 's' : ''));
  render();
}

function showMappedControls(framework, controlId) {
  const mapped = findMappedControls(framework, controlId);
  const domains = getControlDomains(framework, controlId);

  let rows = '';
  for (const m of mapped) {
    const existing = S.controls.find(c => c.framework === m.framework && c.controlId === m.controlId);
    const badge = existing
      ? '<span class="badge ' + statusCls(existing.status) + '">' + existing.status + '</span>'
      : '<span style="color:var(--t4);font-size:11px">Not tracked</span>';
    rows += '<tr><td class="cell-mono" style="color:var(--accent)">' + esc(m.controlId) + '</td>'
      + '<td class="cell-bold">' + esc(m.framework) + '</td>'
      + '<td style="font-size:12px;color:var(--t3)">' + esc(m.domain) + '</td>'
      + '<td>' + badge + '</td></tr>';
  }

  modal('Cross-Framework Mapping \u2014 ' + esc(controlId),
    '<div style="margin-bottom:16px"><span class="badge b-info">' + esc(framework) + '</span> <span style="font-size:14px;font-weight:700;margin-left:6px">' + esc(controlId) + '</span></div>'
    + '<div style="font-size:12px;color:var(--t3);margin-bottom:16px">Security domains: ' + esc(domains.join(', ')) + '</div>'
    + '<p style="font-size:12px;color:var(--t2);margin-bottom:16px">When you upgrade this control\'s status, mapped controls below will automatically be upgraded too.</p>'
    + '<div class="table-wrap" style="border:none"><table><thead><tr><th>Control ID</th><th>Framework</th><th>Domain</th><th>Status</th></tr></thead><tbody>'
    + (rows || '<tr><td colspan="4"><div class="empty"><p>No cross-framework mappings</p></div></td></tr>')
    + '</tbody></table></div>', 'lg');
}

function modalNewCtrl() {
  let opts = '';
  const ctrls = FW[compFw]?.c || [];
  for (const c of ctrls) opts += '<option value="' + esc(c) + '">' + esc(c) + '</option>';
  modal('Add Control \u2014 ' + esc(compFw),
    '<div class="fr fr2"><div class="fg"><label class="fl">Control ID</label><select class="fs" id="cId" onchange="previewMapping()">' + opts + '</select></div>'
    + '<div class="fg"><label class="fl">Status</label><select class="fs" id="cSt"><option>Not Started</option><option>Partially Implemented</option><option>Implemented</option></select></div></div>'
    + '<div class="fg"><label class="fl">Control Name</label><input class="fi" id="cNm" placeholder="e.g., Access Control Policy"></div>'
    + '<div class="fg"><label class="fl">Owner</label><input class="fi" id="cOw" placeholder="Responsible person or team"></div>'
    + '<div class="fg"><label class="fl">Notes</label><textarea class="ft" id="cNo" placeholder="Implementation notes..."></textarea></div>'
    + '<div id="mapPreview"></div>'
    + '<label class="fw-check-inline"><input type="checkbox" id="cPropagate" checked> <span>Auto-create mapped controls in other active frameworks</span></label>',
    'md',
    '<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveCtrl()">Save Control</button>');
  previewMapping();
}

function previewMapping() {
  const el = document.querySelector('#mapPreview');
  if (!el) return;
  const sel = document.querySelector('#cId');
  const controlId = sel ? sel.value : '';
  if (!controlId) { el.textContent = ''; return; }
  const mapped = findMappedControls(compFw, controlId);
  const activeFws = S.config.activeFrameworks || [];
  const mappedActive = mapped.filter(m => activeFws.length === 0 || activeFws.includes(m.framework));
  if (mappedActive.length === 0) {
    el.textContent = 'No cross-framework mappings for this control';
    el.style.cssText = 'font-size:12px;color:var(--t4);padding:8px 0';
    return;
  }
  el.style.cssText = '';
  let badges = '';
  for (const m of mappedActive) {
    const exists = S.controls.find(c => c.framework === m.framework && c.controlId === m.controlId);
    badges += '<span class="badge ' + (exists ? statusCls(exists.status) : 'b-neutral') + '" style="font-size:10px">' + esc(m.framework) + ': ' + esc(m.controlId) + (exists ? '' : ' (new)') + '</span>';
  }
  el.innerHTML = '<div class="card" style="padding:14px;background:var(--bg-input)">'
    + '<div style="font-size:11px;font-weight:600;color:var(--cyan);text-transform:uppercase;letter-spacing:0.8px;margin-bottom:8px">\u2194 Cross-Framework Mappings</div>'
    + '<div style="display:flex;flex-wrap:wrap;gap:6px">' + badges + '</div></div>';
}

async function saveCtrl() {
  const name = document.querySelector('#cNm').value.trim(); if (!name) return;
  const controlId = document.querySelector('#cId').value;
  const status = document.querySelector('#cSt').value;
  const owner = document.querySelector('#cOw').value;
  const notes = document.querySelector('#cNo').value;
  const propEl = document.querySelector('#cPropagate');
  const propagate = propEl ? propEl.checked : false;

  const doc = { _id: uid(), framework: compFw, controlId: controlId, name: name, status: status, owner: owner, notes: notes };
  await API.create('controls', doc);
  S.controls.unshift(doc);

  if (propagate) {
    const mapped = findMappedControls(compFw, controlId);
    const activeFws = S.config.activeFrameworks || [];
    const mappedActive = mapped.filter(m => activeFws.length === 0 || activeFws.includes(m.framework));
    let created = 0;
    for (const m of mappedActive) {
      const exists = S.controls.find(c => c.framework === m.framework && c.controlId === m.controlId);
      if (!exists) {
        const mappedDoc = { _id: uid(), framework: m.framework, controlId: m.controlId, name: m.domain + ' \u2014 ' + name, status: status, owner: owner, notes: 'Auto-mapped from ' + compFw + ' ' + controlId };
        await API.create('controls', mappedDoc);
        S.controls.unshift(mappedDoc);
        created++;
      }
    }
    toast(created > 0 ? 'Control created + ' + created + ' mapped control' + (created > 1 ? 's' : '') : 'Control added');
  } else {
    toast('Control added');
  }
  closeModal(); render();
}

async function delCtrl(id) { await API.del('controls',id); S.controls=S.controls.filter(c=>c._id!==id); render(); }

// ═══════════════════════════════════════════════════════════════════════════
// GOVERNANCE
// ═══════════════════════════════════════════════════════════════════════════
function pgGov() {
  return `<div class="page">
    <div class="page-head"><div><h2>Governance</h2><p>Manage policies, procedures, and governance documentation</p></div><div class="page-head-actions"><button class="btn btn-primary" onclick="modalNewPol()">${I.plus} New Document</button></div></div>
    <div class="grid g3 mb-24">
      <div class="card stat"><div class="stat-val" style="color:var(--blue)">${S.policies.filter(p=>p.type==='Policy').length}</div><div class="stat-lbl">Policies</div></div>
      <div class="card stat"><div class="stat-val" style="color:var(--purple)">${S.policies.filter(p=>p.type==='Procedure').length}</div><div class="stat-lbl">Procedures</div></div>
      <div class="card stat"><div class="stat-val" style="color:var(--accent)">${S.policies.filter(p=>p.type==='Standard').length}</div><div class="stat-lbl">Standards</div></div>
    </div>
    <div class="table-wrap"><table><thead><tr><th>Document</th><th>Type</th><th>Version</th><th>Status</th><th>Owner</th><th>Review Date</th><th class="cell-actions"></th></tr></thead><tbody>
      ${S.policies.length===0?'<tr><td colspan="7"><div class="empty"><p>No governance documents</p></div></td></tr>':
        S.policies.map(p=>`<tr><td class="cell-bold">${esc(p.title)}</td><td><span class="badge ${p.type==='Policy'?'b-info':p.type==='Procedure'?'b-purple':'b-accent'}">${p.type}</span></td><td class="cell-mono">v${esc(p.version)}</td><td><span class="badge ${statusCls(p.status)}">${p.status}</span></td><td class="cell-dim">${esc(p.owner||'—')}</td><td class="cell-mono">${p.reviewDate||'—'}</td><td class="cell-actions"><button class="btn btn-ghost btn-sm" onclick="delPol('${p._id}')">${I.trash}</button></td></tr>`).join('')}
    </tbody></table></div></div>`;
}

function modalNewPol() {
  modal('New Governance Document',`
    <div class="fg"><label class="fl">Title</label><input class="fi" id="pTi" placeholder="e.g., Information Security Policy"></div>
    <div class="fr fr3"><div class="fg"><label class="fl">Type</label><select class="fs" id="pTy"><option>Policy</option><option>Procedure</option><option>Standard</option><option>Guideline</option><option>Plan</option></select></div><div class="fg"><label class="fl">Status</label><select class="fs" id="pSt"><option>Draft</option><option>Review</option><option>Approved</option><option>Retired</option></select></div><div class="fg"><label class="fl">Version</label><input class="fi" id="pVr" value="1.0"></div></div>
    <div class="fr fr2"><div class="fg"><label class="fl">Owner</label><input class="fi" id="pOw" placeholder="Document owner"></div><div class="fg"><label class="fl">Review Date</label><input class="fi" id="pRd" type="date"></div></div>
    <div class="fg"><label class="fl">Content / Summary</label><textarea class="ft" id="pCo" placeholder="Document content..." style="min-height:120px"></textarea></div>
  `,'md',`<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="savePol()">Save Document</button>`);
}

async function savePol() {
  const t=$('#pTi').value.trim(); if(!t) return;
  const doc={_id:uid(),title:t,type:$('#pTy').value,status:$('#pSt').value,version:$('#pVr').value,owner:$('#pOw').value,reviewDate:$('#pRd').value,content:$('#pCo').value};
  await API.create('policies',doc); S.policies.unshift(doc); closeModal(); render(); toast('Document saved');
}

async function delPol(id) { await API.del('policies',id); S.policies=S.policies.filter(p=>p._id!==id); render(); }

// ═══════════════════════════════════════════════════════════════════════════
// REPORTS
// ═══════════════════════════════════════════════════════════════════════════
let rptTab='Executive Summary';

function pgReports() {
  const tabs=['Executive Summary','Risk Register','Audit Findings'];
  const cp=S.controls.length?Math.round(S.controls.filter(c=>c.status==='Implemented').length/S.controls.length*100):0;
  const cr=S.risks.filter(r=>riskLevel(r.residualScore||0).level==='Critical');
  const ar=S.risks.length?(S.risks.reduce((s,r)=>s+(r.residualScore||0),0)/S.risks.length).toFixed(1):'N/A';
  const of_=S.findings.filter(f=>f.status==='Open');
  let body='';
  if(rptTab==='Executive Summary'){
    body=`<div class="man-sec"><h4>Risk Posture</h4><p>${S.risks.length} identified risks — ${cr.length} critical, average residual: ${ar}</p></div>
      <div class="man-sec"><h4>Compliance</h4><p>${cp}% implementation across ${S.controls.length} controls. ${S.controls.filter(c=>c.status==='Not Started').length} not started.</p></div>
      <div class="man-sec"><h4>Audits</h4><p>${S.audits.length} total. ${S.audits.filter(a=>a.status==='In Progress').length} in progress. ${of_.length} open findings.</p></div>
      <div class="man-sec"><h4>Governance</h4><p>${S.policies.length} documents. ${S.policies.filter(p=>p.status==='Approved').length} approved, ${S.policies.filter(p=>p.status==='Draft').length} draft.</p></div>`;
  } else if(rptTab==='Risk Register'){
    body=S.risks.length===0?'<div class="empty"><p>No risks</p></div>':S.risks.map(r=>{const rl=riskLevel(r.residualScore||0);return `<div class="man-sec"><h4>${esc(r.name)} <span class="badge ${rl.cls}" style="font-size:10px;vertical-align:middle">${rl.level}</span></h4><p>Category: ${r.category} · Owner: ${esc(r.owner||'—')} · Raw: ${r.rawScore} · Residual: ${r.residualScore} · Treatment: ${r.treatment}</p></div>`;}).join('');
  } else {
    body=S.findings.length===0?'<div class="empty"><p>No findings</p></div>':S.findings.map(f=>`<div class="man-sec"><h4>${esc(f.title)} <span class="badge ${f.severity==='Critical'?'b-critical':f.severity==='High'?'b-high':f.severity==='Medium'?'b-medium':'b-low'}" style="font-size:10px;vertical-align:middle">${f.severity}</span></h4><p>${esc(f.description)}${f.recommendation?'<br>Recommendation: '+esc(f.recommendation):''}</p></div>`).join('');
  }
  return `<div class="page">
    <div class="page-head"><div><h2>Reports</h2><p>Generate compliance and risk reports</p></div></div>
    <div class="tabs mb-24">${tabs.map(t=>`<button class="tab-btn ${rptTab===t?'on':''}" onclick="rptTab='${t}';render()">${t}</button>`).join('')}</div>
    <div class="card"><h3 style="font-size:18px;font-weight:700;margin-bottom:4px">${rptTab}</h3><div style="font-size:11px;color:var(--t4);margin-bottom:24px">Generated ${new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})} at ${new Date().toLocaleTimeString()}</div>${body}</div></div>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// MANUAL
// ═══════════════════════════════════════════════════════════════════════════
let manSec='overview';
const MAN={
  overview:{t:'Overview',s:[{h:'About GRC Vault',p:'GRC Vault is a modular Governance, Risk, and Compliance web platform for audit collection, risk assessment, compliance tracking, and governance document management. It runs as a Node.js web server accessible from any browser on your network.'},{h:'Architecture',p:'The application uses Express.js for the web server, NeDB as an embedded database, and a REST API for all data operations. The frontend is a single-page application served as static files. No external database server is required.'},{h:'Network Access',p:'By default, the server binds to 0.0.0.0:3000, making it accessible from any device on your network. Set HOST and PORT environment variables to customize. For production, place behind a reverse proxy (nginx/caddy) with TLS.'}]},
  audits:{t:'Audit Module',s:[{h:'Creating Audits',p:'Navigate to Audit Collection and click "New Audit". Select a compliance framework (NIST CSF, ISO 27001, SOC 2, HIPAA, PCI DSS, GDPR, or CMMC), define scope, assign a lead auditor, and set timeline. Audits progress through Planning → In Progress → Review → Completed.'},{h:'Recording Findings',p:'Open any audit to see details and add findings. Each finding needs a title, severity (Critical/High/Medium/Low), related control ID, description, and remediation recommendation. Findings link to the parent audit and appear in reports.'},{h:'Evidence Chain',p:'Reference evidence by control ID. Evidence includes screenshots, documents, logs, and configuration exports. Maintain timestamps and collector identity for chain of custody.'},{h:'Audit Lifecycle',p:'Planning: Define scope, objectives, schedule. In Progress: Execute testing, collect evidence, document findings. Review: QA findings, validate evidence. Completed: Finalize, distribute, track remediation.'}]},
  risks:{t:'Risk Register',s:[{h:'Scoring',p:'Risks assessed on Likelihood (1–5) × Impact (1–5). Raw Score = L × I (1–25 scale). Control Effectiveness (0–100%) reduces to Residual: Residual = Raw × (1 − Eff/100).'},{h:'Levels',p:'Critical (20–25): Immediate action. High (12–19): 30-day remediation. Medium (6–11): 90-day remediation. Low (1–5): Accept or monitor annually.'},{h:'Heat Map',p:'5×5 grid plots all risks. Bordered cells indicate risk presence. Use to identify clusters and prioritize.'},{h:'Treatment',p:'Mitigate (reduce L/I), Accept (acknowledge), Transfer (insurance/outsource), Avoid (eliminate source). Document treatment plans per risk.'}]},
  benchmarks:{t:'Benchmarks',s:[{h:'Industry Data',p:'Benchmarks across 8 sectors: Healthcare, Finance, Technology, Retail, Manufacturing, Government, Energy, Education. Metrics include average breach cost, incident frequency, attack surface, and regulatory burden.'},{h:'Financial Model',p:'Estimates breach cost, compliance fines, Annual Expected Loss (AEL), and Risk Capital. AEL = (Breach × Surface + Fines × Reg. Burden) × (Incidents/20). Risk Capital = AEL × 1.5.'},{h:'Risk Index',p:'Composite score (0–100) combining average residual risk with industry attack surface. >70 = Critical, 40–70 = Elevated, <40 = Manageable.'},{h:'Budget Use',p:'Present Risk Capital alongside industry comparisons to justify cybersecurity investments to leadership.'}]},
  compliance:{t:'Compliance',s:[{h:'Frameworks',p:'7 frameworks supported: NIST CSF (23 subcategories), ISO 27001 (14 domains), SOC 2 (13 criteria), HIPAA (13 safeguards), PCI DSS (12 requirements), GDPR (13 articles), CMMC (17 domains).'},{h:'Control Mapping',p:'Map controls to framework requirements. Track Control ID, Name, Status (Not Started / Partial / Implemented), Owner, and Notes.'},{h:'Coverage',p:'Coverage = (Implemented + Partial×50%) / Total. Aim for 100% before audit readiness.'}]},
  api:{t:'API & Settings',s:[{h:'External API',p:'In Settings, configure a REST API endpoint with bearer token auth. API supports GET/POST/PUT/DELETE on /api/v1/{resource}. Resources: audits, risks, controls, policies, findings, evidence.'},{h:'Data Management',p:'Export: Downloads complete JSON backup. Import: Merges by ID. Clear: Permanently removes all data.'},{h:'Database',p:'NeDB files stored in ./db/data/ by default. Set DB_PATH environment variable to customize. Each collection is a separate .db file.'}]},
};

function pgManual() {
  const sec=MAN[manSec];
  return `<div class="page">
    <div class="page-head"><div><h2>User Manual</h2><p>Complete documentation for GRC Vault</p></div></div>
    <div class="man-layout">
      <div class="man-nav">${Object.entries(MAN).map(([k,v])=>`<button class="man-btn ${manSec===k?'on':''}" onclick="manSec='${k}';render()">${v.t}</button>`).join('')}</div>
      <div class="man-body"><h3>${sec.t}</h3>${sec.s.map(s=>`<div class="man-sec"><h4>${s.h}</h4><p>${s.p}</p></div>`).join('')}</div>
    </div></div>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// SETTINGS
// ═══════════════════════════════════════════════════════════════════════════
function pgSettings() {
  const cfg=S.config||{};
  return `<div class="page">
    <div class="page-head"><div><h2>Settings</h2><p>Configure storage, API integration, and data management</p></div></div>

    <div class="card mb-24"><div class="card-head"><h3 class="inline-flex gap-8">${I.link} External API Configuration</h3></div>
      <div style="display:flex;flex-direction:column;gap:16px">
        <div class="fg"><label class="fl">API Endpoint URL</label><input class="fi" id="cfgUrl" value="${esc(cfg.apiUrl||'')}" placeholder="https://your-grc-api.example.com/api/v1"></div>
        <div class="fr fr2"><div class="fg"><label class="fl">API Key / Bearer Token</label><input class="fi" id="cfgKey" type="password" value="${esc(cfg.apiKey||'')}" placeholder="sk-..."></div><div class="fg"><label class="fl">Sync Interval (seconds)</label><input class="fi" id="cfgSync" type="number" value="${cfg.syncInterval||300}"></div></div>
        <div style="display:flex;gap:10px;align-items:center"><button class="btn btn-primary" onclick="saveCfg()">Save Configuration</button><button class="btn btn-secondary" onclick="testCfg()">Test Connection</button><span id="testRes" style="font-size:12px;font-weight:600"></span></div>
      </div>
      <div class="api-box"><span style="color:var(--accent)">GET</span>    /api/v1/{resource}       — List records
<span style="color:var(--green)">POST</span>   /api/v1/{resource}       — Create record
<span style="color:var(--yellow)">PUT</span>    /api/v1/{resource}/{id}  — Update record
<span style="color:var(--red)">DELETE</span> /api/v1/{resource}/{id}  — Delete record

Resources: audits, risks, controls, policies, findings, evidence
Auth: Bearer token in Authorization header</div>
    </div>

    <div class="card mb-24"><div class="card-head"><h3>Data Management</h3></div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px">
        <button class="btn btn-secondary" onclick="doExport()">${I.download} Export All Data</button>
        <button class="btn btn-secondary" onclick="doImport()">${I.upload} Import Data</button>
        <button class="btn btn-danger" onclick="doClear()">${I.trash} Clear All Data</button>
      </div>
      <p style="font-size:13px;color:var(--t2);line-height:1.7">Data is stored in NeDB database files on the server. Export creates a JSON backup you can download. Import merges records by ID. Clear permanently deletes all data.</p>
      <div id="dbInfo" style="font-size:12px;color:var(--t4);margin-top:10px;font-family:var(--mono)"></div>
    </div>

    <div class="card"><div class="card-head"><h3>Database Stores</h3></div><div class="store-grid" id="storeGrid"></div></div>
  </div>`;
}

async function settingsPostRender() {
  try {
    const h = await API.health();
    const el = $('#dbInfo'); if(el) el.textContent = 'DB Path: ' + (h.dbPath||'—') + ' · Uptime: ' + Math.round(h.uptime||0) + 's';
    const c = await API.counts();
    const g = $('#storeGrid');
    if(g && c.ok) g.innerHTML = Object.entries(c.data).map(([k,v])=>`<div class="store-cell"><div class="nm">${k}</div><div class="ct">${v} records</div></div>`).join('');
  } catch(e) {}
}

async function saveCfg() {
  const cfg={_id:S.config._id||'main-config',apiUrl:$('#cfgUrl').value.trim(),apiKey:$('#cfgKey').value.trim(),syncInterval:+$('#cfgSync').value||300};
  if(S.config._id) await API.update('config',cfg._id,cfg); else await API.create('config',cfg);
  S.config=cfg; renderSidebar(); toast('Configuration saved');
}

async function testCfg() {
  const el=$('#testRes'); const url=$('#cfgUrl').value.trim(), key=$('#cfgKey').value.trim();
  if(!url){el.textContent='No URL';el.style.color='var(--red)';return;}
  el.textContent='Testing...';el.style.color='var(--t2)';
  const r=await API.testProxy(url,key);
  el.textContent=r.ok?`Connected (${r.status})`:`Failed: ${r.error||r.status}`;
  el.style.color=r.ok?'var(--green)':'var(--red)';
}

async function doExport() {
  const data = await API.exportAll();
  const blob = new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `grc-vault-export-${new Date().toISOString().slice(0,10)}.json`;
  a.click(); URL.revokeObjectURL(a.href);
  toast('Data exported');
}

async function doImport() {
  const input = document.createElement('input'); input.type='file'; input.accept='.json';
  input.onchange = async e => {
    const file = e.target.files[0]; if(!file) return;
    try {
      const data = JSON.parse(await file.text());
      const r = await API.importAll(data);
      await loadData(); render(); toast(`Imported ${r.imported} records`);
    } catch(err) { toast('Import failed: '+err.message, 'error'); }
  };
  input.click();
}

async function doClear() {
  if(!confirm('This will PERMANENTLY delete ALL data. Are you sure?')) return;
  await API.clearAll(); await loadData(); render(); toast('All data cleared');
}

// ═══════════════════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════════════════
async function loadData() {
  const [a,r,c,p,f] = await Promise.all([API.get('audits'),API.get('risks'),API.get('controls'),API.get('policies'),API.get('findings')]);
  S.audits=a.data||[]; S.risks=r.data||[]; S.controls=c.data||[]; S.policies=p.data||[]; S.findings=f.data||[];
  const cfgs = await API.get('config');
  S.config = (cfgs.data||[])[0] || {};
}

async function init() {
  await loadData();
  renderSidebar();
  render();
}

init();
