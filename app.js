const products = [
  {
    name: "ARSAS",
    tagline: "IEC 61850 engineering workstation",
    description: "Discover IEDs, monitor reports, test approved IO Lists, inspect GOOSE and Sampled Values, generate SCL, and export attributable FAT/SAT evidence.",
    category: "power",
    status: "Stable",
    platform: "Windows x64",
    format: "Installer · Portable",
    license: "GPL-3.0+",
    tags: ["iec 61850", "mms", "goose", "sampled values", "scl", "fat", "sat", "commissioning", "io list"],
    website: "https://masarray.github.io/arsas/",
    download: "https://github.com/masarray/arsas/releases/latest",
    repo: "https://github.com/masarray/arsas",
    featured: true,
    icon: "substation"
  },
  {
    name: "ARIEC60870",
    tagline: "Protocol tester & evidence analyzer",
    description: "Free Windows tester for IEC 60870-5-101, IEC 60870-5-103 and IEC 60870-5-104 with raw-frame interpretation, Smart Findings and PDF evidence export.",
    category: "power",
    status: "Stable",
    platform: "Windows x64",
    format: "Portable ZIP",
    license: "Apache-2.0",
    tags: ["iec 60870", "iec 101", "iec 103", "iec 104", "scada", "telecontrol", "protocol analyzer", "pdf report"],
    website: "https://masarray.github.io/ARIEC60870/",
    download: "https://github.com/masarray/ARIEC60870/releases/latest",
    repo: "https://github.com/masarray/ARIEC60870",
    featured: true,
    icon: "protocol"
  },
  {
    name: "ARIEC61850",
    tagline: "Native .NET IEC 61850 toolkit",
    description: "A .NET 8 engineering stack for MMS discovery and reporting, guarded IED control, GOOSE, Sampled Values, SCL, PCAP, simulation and repeatable evidence workflows.",
    category: "power",
    status: "Engineering alpha",
    platform: ".NET 8 · Windows UI",
    format: "Source · Releases",
    license: "GPL-3.0+",
    tags: ["iec 61850", "dotnet", "mms", "goose", "sampled values", "scl", "pcap", "ied control", "sdk"],
    website: "https://masarray.github.io/ARIEC61850/",
    download: "https://github.com/masarray/ARIEC61850/releases/latest",
    repo: "https://github.com/masarray/ARIEC61850",
    icon: "stack"
  },
  {
    name: "ArIEC103",
    tagline: "IEC-103 master tester for protection relays",
    description: "Active IEC 60870-5-103 master tester and analyzer with readable relay evidence, raw frames, value and event review, mapping profiles and exportable test records.",
    category: "power",
    status: "Stable",
    platform: "Windows x64",
    format: "Portable ZIP",
    license: "Apache-2.0",
    tags: ["iec 103", "protection relay", "serial", "master tester", "fat", "sat", "events"],
    website: "https://masarray.github.io/ARIEC103/",
    download: "https://github.com/masarray/ARIEC103/releases/latest",
    repo: "https://github.com/masarray/ARIEC103",
    icon: "relay"
  },
  {
    name: "IEC101 Master Tester",
    tagline: "Serial SCADA master & FAT/SAT workspace",
    description: "IEC 60870-5-101 master tester with General Interrogation, Class 1/Class 2 polling, commands, SOE review, NUC dual-link redundancy and decoded line evidence.",
    category: "power",
    status: "Stable",
    platform: "Windows",
    format: "Portable ZIP",
    license: "Apache-2.0",
    tags: ["iec 101", "scada", "serial", "rtu", "gateway", "redundancy", "soe", "commissioning"],
    website: "https://masarray.github.io/IEC101MasterTester/",
    download: "https://github.com/masarray/IEC101MasterTester/releases/latest",
    repo: "https://github.com/masarray/IEC101MasterTester",
    icon: "protocol"
  },
  {
    name: "DNP3 Interoperability Tester",
    tagline: "DNP3 commissioning evidence workspace",
    description: "Master-side DNP3 workspace for IED commissioning, point and event inspection, command lifecycle evidence, SOE audit, protocol trace and structured FAT reporting.",
    category: "power",
    status: "Stable",
    platform: "Windows",
    format: "Installer · Releases",
    license: "Apache-2.0",
    tags: ["dnp3", "scada", "outstation", "master tester", "soe", "command", "fat", "commissioning"],
    website: "https://masarray.github.io/DNPTester/",
    download: "https://github.com/masarray/DNPTester/releases/latest",
    repo: "https://github.com/masarray/DNPTester",
    icon: "protocol"
  },
  {
    name: "ARNet Discovery",
    tagline: "Substation LAN scanner",
    description: "Portable Windows tool for relay IP discovery, approved target-list verification, reachability checks, protocol evidence, device classification and CSV export.",
    category: "power",
    status: "Stable",
    platform: "Windows x64",
    format: "Portable ZIP",
    license: "Apache-2.0",
    tags: ["network scanner", "substation lan", "relay ip", "ied", "iec 61850", "iec 104", "modbus", "dnp3", "fat"],
    website: "https://masarray.github.io/ARNetDiscovery/",
    download: "https://github.com/masarray/ARNetDiscovery/releases/latest",
    repo: "https://github.com/masarray/ARNetDiscovery",
    icon: "network"
  },
  {
    name: "Process Bus Insight",
    tagline: "Receive-only Process Bus analyzer",
    description: "Inspect IEC 61850 Sampled Values, GOOSE, PTPv2 context and SCL expected-vs-observed evidence from live Npcap capture or bounded PCAP replay.",
    category: "power",
    status: "Public beta",
    platform: "Windows 10/11",
    format: "Portable ZIP",
    license: "GPL-3.0+",
    tags: ["process bus", "sampled values", "goose", "ptp", "scl", "pcap", "analyzer", "npcap"],
    website: "https://masarray.github.io/DigSubAnalyzer/",
    download: "https://github.com/masarray/DigSubAnalyzer/releases/latest",
    repo: "https://github.com/masarray/DigSubAnalyzer",
    icon: "wave"
  },
  {
    name: "ARVREL",
    tagline: "Virtual protection relay laboratory",
    description: "Vendor-neutral IEC 61850 Sampled Values virtual relay lab with stream trust, phasors, protection elements, virtual trip evidence and deterministic test scenarios.",
    category: "power",
    status: "Public beta",
    platform: "Windows 10/11",
    format: "Installer · Portable",
    license: "GPL-3.0+",
    tags: ["virtual relay", "protection", "sampled values", "iec 61850", "phasor", "50", "51", "67", "27", "59"],
    website: "https://masarray.github.io/arvrel/",
    download: "https://github.com/masarray/arvrel/releases/latest",
    repo: "https://github.com/masarray/arvrel",
    featured: true,
    icon: "relay"
  },
  {
    name: "Process Bus Timing Lab",
    tagline: "PTPv2 simulator & timing-health monitor",
    description: "Laboratory companion for generating and monitoring Layer-2 PTP traffic, validating VLAN/QinQ paths, exercising timing symptoms and exporting evidence packages.",
    category: "lab",
    status: "Lab",
    platform: "Windows",
    format: "Desktop · CLI",
    license: "Apache-2.0",
    tags: ["ptp", "ptpv2", "iec 61850-9-3", "process bus", "timing", "vlan", "qinq", "simulator"],
    website: "https://masarray.github.io/PtpLabClock/",
    download: "https://github.com/masarray/PtpLabClock/releases/latest",
    repo: "https://github.com/masarray/PtpLabClock",
    icon: "clock"
  },
  {
    name: "Line Differential Relay Lab",
    tagline: "Communication-aware 87L simulator",
    description: "Deterministic, one-screen browser laboratory for studying line differential protection, packet delay, jitter, loss, alignment confidence and protection permission.",
    category: "lab",
    status: "Lab",
    platform: "Web browser",
    format: "Interactive simulator",
    license: "GPL-3.0",
    tags: ["87l", "line differential", "protection", "communication", "jitter", "packet loss", "simulation", "training"],
    website: "https://masarray.github.io/line-differential-relay-lab/",
    repo: "https://github.com/masarray/line-differential-relay-lab",
    icon: "lab"
  },
  {
    name: "ARIEC61850 C++ Port",
    tagline: "Portable C++20 protocol-stack migration",
    description: "Incremental C++20 port covering BER, MMS foundations, GOOSE, Sampled Values, SCL, COMTRADE, PCAP and transport-injected association/reporting runtime.",
    category: "lab",
    status: "Engineering alpha",
    platform: "Windows · Linux",
    format: "C++ library · CLI",
    license: "Repository terms",
    tags: ["iec 61850", "c++", "cpp", "ber", "mms", "goose", "sampled values", "scl", "comtrade", "sdk"],
    repo: "https://github.com/masarray/arstack61850",
    icon: "stack"
  },
  {
    name: "ArGrid Energy",
    tagline: "Industrial energy-management demo",
    description: "Browser-based multi-site EMS demonstration with one-line views, analytics, alarms, opportunity management, billing, sustainability and local PDF export.",
    category: "web",
    status: "Demo",
    platform: "Web browser",
    format: "Static web app",
    license: "GPL-3.0",
    tags: ["energy management", "ems", "dashboard", "one line", "analytics", "billing", "sustainability", "demo"],
    website: "https://masarray.github.io/argrid-energy/",
    repo: "https://github.com/masarray/argrid-energy",
    icon: "energy"
  },
  {
    name: "Cable Advisor",
    tagline: "Preliminary IEC 60364 cable sizing",
    description: "Mobile-friendly PWA for preliminary load-current, voltage-drop, derating and short-circuit withstand checks before formal engineering verification.",
    category: "web",
    status: "Demo",
    platform: "Web · PWA",
    format: "Interactive calculator",
    license: "Repository terms",
    tags: ["cable sizing", "iec 60364", "voltage drop", "short circuit", "electrical", "pwa", "calculator"],
    website: "https://masarray.github.io/cable-advisor/",
    repo: "https://github.com/masarray/cable-advisor",
    icon: "cable"
  },
  {
    name: "SC220 Live",
    tagline: "Windows live audio console",
    description: "Combine Recording Tech SC220 input and PC playback, shape the result with ASK-P Signature, monitor levels and route broadcast-ready audio to OBS or TikTok Live Studio.",
    category: "audio",
    status: "Stable",
    platform: "Windows 10/11",
    format: "Setup installer",
    license: "Product terms",
    tags: ["sc220", "recording tech", "karaoke", "audio mixer", "obs", "tiktok live", "streaming", "dsp"],
    website: "https://masarray.github.io/sc220-download/",
    download: "https://github.com/masarray/sc220-download/releases/latest",
    repo: "https://github.com/masarray/sc220-download",
    featured: true,
    icon: "mixer"
  },
  {
    name: "SONKUPIK STUDIO",
    tagline: "Professional K500 processor control",
    description: "Windows control and preset-management application for compatible K500 karaoke processors with PEQ, crossover, dynamics, mixer control and mass upload.",
    category: "audio",
    status: "Stable",
    platform: "Windows 10/11",
    format: "Setup · Portable",
    license: "Product terms",
    tags: ["k500", "karaoke processor", "peq", "crossover", "compressor", "preset", "usb hid", "bluetooth"],
    website: "https://masarray.github.io/sonkupik-studio/",
    download: "https://github.com/masarray/sonkupik-studio/releases/latest",
    repo: "https://github.com/masarray/sonkupik-studio",
    featured: true,
    icon: "mixer"
  },
  {
    name: "ArSonKuPik VST",
    tagline: "Musical VST3 & standalone enhancer",
    description: "A focused audio-enhancement workflow for fuller body, clearer presence, stereo depth and polished detail through six musical macro controls and curated presets.",
    category: "audio",
    status: "Stable",
    platform: "Windows · macOS",
    format: "VST3 · Standalone",
    license: "Proprietary",
    tags: ["vst3", "audio enhancer", "mastering", "eq", "stereo", "limiter", "windows", "macos", "plugin"],
    website: "https://masarray.github.io/vst-enhancer/",
    download: "https://github.com/masarray/vst-enhancer/releases/latest",
    repo: "https://github.com/masarray/vst-enhancer",
    featured: true,
    icon: "audio"
  },
  {
    name: "ArSonKuPik for Chrome",
    tagline: "Local browser audio mastering",
    description: "Privacy-first Chrome extension with parametric EQ, compression, harmonic color, multiband width, limiter protection and local presets—without cloud audio upload.",
    category: "audio",
    status: "Stable",
    platform: "Chrome 116+",
    format: "Manifest V3 extension",
    license: "Source available",
    tags: ["chrome extension", "browser audio", "web audio", "eq", "compressor", "stereo width", "limiter", "privacy"],
    website: "https://masarray.github.io/arsonkupik-extension/",
    download: "https://github.com/masarray/arsonkupik-extension/releases/latest",
    repo: "https://github.com/masarray/arsonkupik-extension",
    icon: "browser"
  },
  {
    name: "ArVisual for OBS",
    tagline: "Scene-adaptive smart color enhancer",
    description: "Native OBS video filter for cleaner, brighter and more vivid sources with bounded scene analysis, neutral protection, skin-aware controls and creator presets.",
    category: "audio",
    status: "Stable",
    platform: "Windows · macOS · Linux",
    format: "OBS native filter",
    license: "GPL-2.0+",
    tags: ["obs studio", "video filter", "color enhancer", "webcam", "streaming", "creator", "skin tone", "gpu"],
    website: "https://masarray.github.io/arvisual-obs/",
    download: "https://github.com/masarray/arvisual-obs/releases/latest",
    repo: "https://github.com/masarray/arvisual-obs",
    icon: "video"
  },
  {
    name: "SonRapTune",
    tagline: "Rap pitch & melody processor",
    description: "C++/JUCE VST3 and standalone engineering project exploring causal pitch tracking, scale/MIDI targeting and period-synchronous pitch correction for rap vocals.",
    category: "audio",
    status: "Engineering alpha",
    platform: "Windows · macOS · Linux",
    format: "VST3 · Standalone",
    license: "Repository terms",
    tags: ["pitch correction", "rap", "autotune", "vst3", "juce", "psola", "midi", "vocal"],
    download: "https://github.com/masarray/sonraptune/releases/latest",
    repo: "https://github.com/masarray/sonraptune",
    icon: "voice"
  }
];

const categoryNames = {
  power: "Power systems",
  audio: "Audio & creator",
  lab: "Lab & simulation",
  web: "Web tool"
};

const iconPaths = {
  substation: '<path d="M4 20h16M6 20v-7h12v7M9 13V8h6v5M12 8V3M8 5h8M8 16h2m4 0h2"/>',
  protocol: '<path d="M4 7h6v4H4zM14 13h6v4h-6zM10 9h4m-4 6h4M12 9v6"/>',
  stack: '<path d="m12 3 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4M4 17l8 4 8-4"/>',
  relay: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h3m2 0h3M8 15h8M9 18h6"/>',
  network: '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><path d="M12 7v4M5 16v-2h14v2M12 11H5m7 0h7"/>',
  wave: '<path d="M3 13h3l2-7 4 13 3-10 2 6h4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  lab: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M7.5 15h9"/>',
  energy: '<path d="M13 2 5 14h6l-1 8 9-13h-6V2Z"/>',
  cable: '<path d="M5 5h5v5H5zM14 14h5v5h-5zM10 7.5h2a5 5 0 0 1 5 5V14"/>',
  mixer: '<path d="M6 4v16M12 4v16M18 4v16M3 9h6M9 15h6M15 8h6"/><circle cx="6" cy="9" r="1.5"/><circle cx="12" cy="15" r="1.5"/><circle cx="18" cy="8" r="1.5"/>',
  audio: '<path d="M4 14h3l2-8 4 14 2-9 2 5h3"/>',
  browser: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
  video: '<rect x="3" y="5" width="13" height="14" rx="2"/><path d="m16 10 5-3v10l-5-3z"/>',
  voice: '<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/>'
};

const featuredGrid = document.querySelector("[data-featured-grid]");
const productList = document.querySelector("[data-product-list]");
const emptyState = document.querySelector("[data-empty]");
const visibleCount = document.querySelector("[data-visible-count]");
const totalCount = document.querySelector("[data-product-count]");
const searchInput = document.querySelector("[data-search]");
const filterContainer = document.querySelector("[data-filters]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const header = document.querySelector("[data-header]");

let activeFilter = "all";
let searchTerm = "";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function icon(name) {
  const path = iconPaths[name] || iconPaths.stack;
  return `<span class="product-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${path}</svg></span>`;
}

function actionLinks(product, compact = false) {
  const links = [];
  if (product.website) {
    links.push(`<a class="${compact ? "primary-action" : "button small primary"}" href="${escapeHtml(product.website)}">Website</a>`);
  }
  if (product.download) {
    links.push(`<a class="${compact ? "" : "button small secondary"}" href="${escapeHtml(product.download)}">Download</a>`);
  }
  if (product.repo) {
    links.push(`<a class="${compact ? "" : "button small ghost"}" href="${escapeHtml(product.repo)}">Repository</a>`);
  }
  return links.join("");
}

function renderFeatured() {
  const featured = products.filter((product) => product.featured);
  featuredGrid.innerHTML = featured.map((product) => `
    <article class="feature-card" data-category="${product.category}" data-status="${escapeHtml(product.status)}">
      <div class="card-top">
        ${icon(product.icon)}
        <span class="status-badge">${escapeHtml(product.status)}</span>
      </div>
      <h3>${escapeHtml(product.name)}</h3>
      <span class="product-kicker">${escapeHtml(product.tagline)}</span>
      <p>${escapeHtml(product.description)}</p>
      <div class="product-meta">
        <span>${escapeHtml(product.platform)}</span>
        <span>${escapeHtml(product.format)}</span>
      </div>
      <div class="card-actions">${actionLinks(product)}</div>
    </article>
  `).join("");
}

function normalizedProductText(product) {
  return [
    product.name,
    product.tagline,
    product.description,
    product.platform,
    product.format,
    product.license,
    categoryNames[product.category],
    ...(product.tags || [])
  ].join(" ").toLocaleLowerCase("id");
}

function matches(product) {
  const categoryMatches = activeFilter === "all" || product.category === activeFilter;
  const termMatches = !searchTerm || normalizedProductText(product).includes(searchTerm);
  return categoryMatches && termMatches;
}

function renderCatalogue() {
  const filtered = products.filter(matches);
  productList.innerHTML = filtered.map((product) => `
    <article class="product-row" data-category="${product.category}" data-status="${escapeHtml(product.status)}">
      <div class="row-title">
        ${icon(product.icon)}
        <div class="row-title-text">
          <h3>${escapeHtml(product.name)}</h3>
          <p>${escapeHtml(categoryNames[product.category])} · ${escapeHtml(product.status)}</p>
        </div>
      </div>
      <p class="row-description">${escapeHtml(product.description)}</p>
      <div class="row-meta" aria-label="Informasi produk">
        <span>${escapeHtml(product.platform)}</span>
        <span>${escapeHtml(product.format)}</span>
        <span>${escapeHtml(product.license)}</span>
      </div>
      <div class="row-actions">${actionLinks(product, true)}</div>
    </article>
  `).join("");

  visibleCount.textContent = String(filtered.length);
  emptyState.hidden = filtered.length !== 0;
}

function setFilter(filter) {
  activeFilter = filter;
  filterContainer.querySelectorAll("[data-filter]").forEach((button) => {
    const active = button.dataset.filter === activeFilter;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  renderCatalogue();
}

function preferredTheme() {
  const stored = localStorage.getItem("masarray-theme");
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("masarray-theme", theme);
  themeToggle.setAttribute("aria-label", theme === "dark" ? "Gunakan tema terang" : "Gunakan tema gelap");
  themeToggle.setAttribute("title", theme === "dark" ? "Tema terang" : "Tema gelap");
}

searchInput.addEventListener("input", (event) => {
  searchTerm = event.target.value.trim().toLocaleLowerCase("id");
  renderCatalogue();
});

filterContainer.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  setFilter(button.dataset.filter);
});

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
});

document.addEventListener("keydown", (event) => {
  const target = event.target;
  const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target.isContentEditable;
  if (event.key === "/" && !isTyping) {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Escape" && document.activeElement === searchInput) {
    searchInput.value = "";
    searchTerm = "";
    searchInput.blur();
    renderCatalogue();
  }
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 8);
}, { passive: true });

applyTheme(preferredTheme());
totalCount.textContent = String(products.length);
renderFeatured();
setFilter("all");
