const projectData = {
  phishing: {
    category: "THREAT INTELLIGENCE",
    title: "Phishing Email Investigation & IOC Analysis",
    intro: "A structured investigation of a simulated employee-reported phishing email, following the kind of evidence-first workflow used to assess suspicious messages.",
    why: "I built this to understand how a SOC analyst can move from a user report to a defensible verdict instead of relying on a single reputation check.",
    objective: "Analyse a simulated phishing email, identify indicators of compromise, validate suspicious infrastructure and document the investigation.",
    tools: ["Email header analysis", "VirusTotal", "CyberChef", "URL/domain analysis"],
    work: [
      "Analysed email headers and sending infrastructure",
      "Checked sender details and extracted relevant indicators",
      "Extracted URLs and other suspicious artifacts",
      "Analysed suspicious links and encoded/obfuscated data",
      "Checked indicators against threat-intelligence sources",
      "Documented evidence and reached a final malicious/benign verdict"
    ],
    skills: ["Email investigation", "IOC extraction", "Threat intelligence", "Evidence documentation", "Analytical reasoning"],
    outcome: "Created a structured phishing investigation report containing the evidence, analysis and final verdict.",
    relevance: "The workflow mirrors an entry-level SOC triage scenario: collect evidence, enrich indicators, assess context and record a conclusion that another analyst can review.",
    evidence: ["Investigation report", "Analysis screenshots", "Sample email headers", "IOC list"],
    links: [
      {label:"Investigation report", placeholder:"Add report URL"},
      {label:"Screenshots", placeholder:"Add screenshot gallery URL"},
      {label:"IOC list", placeholder:"Add IOC evidence URL"}
    ]
  },
  soc: {
    category: "SOC / SIEM",
    title: "Building a Mini SOC Lab for Threat Detection",
    intro: "A home security lab designed to generate Windows telemetry, collect it in a SIEM and investigate suspicious PowerShell activity.",
    why: "I wanted to understand the analyst workflow behind security monitoring: generate activity, collect useful telemetry, search it, investigate it and turn the finding into a detection.",
    objective: "Build a small environment for security-event generation, log collection, investigation and basic detection engineering.",
    tools: ["Windows virtual machine", "Sysmon", "Splunk", "Windows Event Logs", "PowerShell"],
    work: [
      "Set up a Windows virtual machine",
      "Installed and configured Sysmon",
      "Generated different security events",
      "Collected and searched logs in Splunk",
      "Investigated suspicious PowerShell activity",
      "Created a basic detection query",
      "Documented the investigation process"
    ],
    skills: ["Windows security logging", "SIEM fundamentals", "Log analysis", "Detection engineering", "Threat investigation"],
    outcome: "Built a working home SOC environment and created a basic detection for suspicious PowerShell activity.",
    relevance: "The lab provides practical exposure to the telemetry and investigation cycle that underpins security operations and detection work.",
    evidence: ["Architecture diagram", "Lab screenshots", "Splunk detection query", "Sample logs", "Investigation notes", "GitHub repository"],
    links: [
      {label:"GitHub repository", placeholder:"Add repository URL"},
      {label:"Architecture diagram", placeholder:"Add diagram URL"},
      {label:"Detection query", placeholder:"Add query/write-up URL"},
      {label:"Investigation notes", placeholder:"Add write-up URL"}
    ]
  },
  ioc: {
    category: "SECURITY AUTOMATION",
    title: "Python IOC Enrichment Tool",
    intro: "A proof-of-concept Python utility that automates an initial threat-intelligence lookup for indicators such as IP addresses or domains.",
    why: "During investigations, analysts can spend time repeating the same enrichment steps. I wanted to automate part of that process while learning how security tools interact with APIs.",
    objective: "Create a simple analyst-facing tool that accepts an IOC, queries a threat-intelligence API and returns useful enrichment information.",
    tools: ["Python", "REST APIs", "JSON", "VirusTotal API", "GitHub"],
    work: [
      "Created a Python script that accepts an IOC as input",
      "Connected the script to a threat-intelligence API",
      "Parsed the API response",
      "Extracted useful information for an analyst",
      "Displayed results in a simple analyst-friendly format",
      "Added basic error handling"
    ],
    skills: ["Python scripting", "REST APIs", "JSON parsing", "Security automation", "Technical documentation"],
    outcome: "Created a working proof-of-concept IOC enrichment tool that can speed up the initial investigation of suspicious indicators.",
    relevance: "IOC enrichment is a common investigation step. Automating repetitive lookups can reduce manual effort and create a consistent starting point for analyst triage.",
    evidence: ["GitHub repository", "Source code", "Terminal screenshots", "Example API response", "Short demo"],
    links: [
      {label:"GitHub repository", placeholder:"Add repository URL"},
      {label:"Demo", placeholder:"Add demo URL"},
      {label:"Terminal screenshots", placeholder:"Add screenshot URL"},
      {label:"Documentation", placeholder:"Add technical documentation URL"}
    ]
  }
};

const modal = document.getElementById("projectModal");
const modalContent = document.getElementById("modalContent");
const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function renderProject(key) {
  const p = projectData[key];
  if (!p) return;
  modalContent.innerHTML = `
    <div class="modal-header">
      <span class="tag">${p.category}</span>
      <h2 id="modalTitle">${p.title}</h2>
      <p>${p.intro}</p>
    </div>
    <div class="detail-grid">
      <div class="detail-block"><h4>WHY I BUILT IT</h4><p>${p.why}</p></div>
      <div class="detail-block"><h4>OBJECTIVE</h4><p>${p.objective}</p></div>
      <div class="detail-block"><h4>TOOLS / TECHNOLOGIES</h4><div class="skill-cloud">${p.tools.map(x => `<span>${x}</span>`).join("")}</div></div>
      <div class="detail-block"><h4>WHAT I ACTUALLY DID</h4><ul>${p.work.map(x => `<li>${x}</li>`).join("")}</ul></div>
      <div class="detail-block"><h4>SKILLS DEVELOPED</h4><div class="skill-cloud">${p.skills.map(x => `<span>${x}</span>`).join("")}</div></div>
      <div class="detail-block"><h4>OUTCOME</h4><p>${p.outcome}</p></div>
      <div class="detail-block"><h4>REAL-WORLD RELEVANCE</h4><p>${p.relevance}</p></div>
      <div class="detail-block"><h4>EVIDENCE AVAILABLE</h4><div class="evidence-grid">${p.evidence.map(x => `<div class="evidence-tile">${x}</div>`).join("")}</div></div>
    </div>
    <div class="modal-actions">
      ${p.links.map(x => `<a href="#" class="btn btn-ghost placeholder-link" data-placeholder="${x.placeholder}">${x.label} ↗</a>`).join("")}
    </div>
  `;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modal.querySelectorAll(".placeholder-link").forEach(bindPlaceholder);
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-open]").forEach(btn => {
  btn.addEventListener("click", () => renderProject(btn.dataset.open));
});

document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});

function bindPlaceholder(el) {
  el.addEventListener("click", e => {
    e.preventDefault();
    showToast(el.dataset.placeholder || "Add your evidence URL here.");
  });
}
document.querySelectorAll(".placeholder-link").forEach(bindPlaceholder);

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
