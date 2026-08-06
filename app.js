(() => {
  'use strict';

  const API_URL = 'https://api.github.com/users/masarray/repos?per_page=100&sort=updated&type=owner';
  const PROFILE_URL = 'https://github.com/masarray';
  const EXCLUDED_REPOS = new Set(['masarray.github.io', 'masarray', '.github']);

  const OVERRIDES = {
    'sc220-download': {
      name: 'SC220 Live',
      category: 'audio',
      featured: true,
      priority: 120,
      description: 'Mixer audio karaoke dan live streaming untuk Recording Tech SC220, audio PC, DSP, OBS Studio, dan TikTok Live Studio.',
      homepage: 'https://masarray.github.io/sc220-download/'
    },
    'ktv-studio-mixer-pro': {
      name: 'KTV Studio Mixer Pro',
      category: 'audio',
      featured: true,
      priority: 112,
      description: 'Software mixer dan control workflow karaoke profesional dengan fokus pada DSP, preset, metering, dan pengalaman operator.'
    },
    'askp-vst': {
      name: 'ASK-P VST',
      category: 'audio',
      featured: true,
      priority: 108
    },
    'sonkupik-player': {
      name: 'SonkuPik Player',
      category: 'audio',
      featured: true,
      priority: 106
    }
  };

  const CATEGORY_LABELS = {
    audio: 'Audio & DSP',
    engineering: 'Engineering',
    apps: 'Apps & Tools',
    web: 'Web & Docs'
  };

  const KEYWORDS = {
    audio: [
      'audio', 'dsp', 'vst', 'karaoke', 'ktv', 'mixer', 'music', 'player',
      'sonkupik', 'sc220', 'sound', 'visualizer', 'spectrum', 'equalizer',
      'compressor', 'limiter', 'reverb', 'microphone', 'obs', 'streaming', 'asio'
    ],
    engineering: [
      'engineering', 'electrical', 'power system', 'substation', 'automation',
      'relay', 'protection', 'iec 61850', '61850', 'siprotec', 'rtu', 'sas',
      'scada', 'modbus', 'goose', 'commissioning', 'testing', 'test tool',
      'pln', 'switchgear', 'circuit breaker', 'calculator'
    ],
    web: [
      'website', 'landing', 'documentation', 'docs', 'download', 'github pages',
      'portfolio', 'web app', 'frontend', 'html', 'css', 'javascript'
    ],
    apps: [
      'android', 'windows', 'desktop', 'electron', 'c#', 'csharp', '.net',
      'utility', 'tool', 'converter', 'generator', 'editor', 'extension',
      'application', 'app', 'mobile', 'compose', 'kotlin', 'python'
    ]
  };

  const FALLBACK_REPOS = [
    {
      id: 1,
      name: 'sc220-download',
      full_name: 'masarray/sc220-download',
      html_url: 'https://github.com/masarray/sc220-download',
      homepage: 'https://masarray.github.io/sc220-download/',
      description: OVERRIDES['sc220-download'].description,
      language: 'HTML',
      topics: ['audio', 'dsp', 'karaoke', 'windows', 'live-streaming'],
      fork: false,
      archived: false,
      size: 1,
      updated_at: '2026-08-06T00:00:00Z'
    },
    {
      id: 2,
      name: 'ktv-studio-mixer-pro',
      full_name: 'masarray/ktv-studio-mixer-pro',
      html_url: 'https://github.com/masarray/ktv-studio-mixer-pro',
      homepage: '',
      description: OVERRIDES['ktv-studio-mixer-pro'].description,
      language: 'TypeScript',
      topics: ['audio', 'dsp', 'karaoke', 'electron'],
      fork: false,
      archived: false,
      size: 1,
      updated_at: '2026-08-01T00:00:00Z'
    }
  ];

  const state = {
    repos: [],
    query: '',
    category: 'all',
    sort: 'priority'
  };

  const els = {
    header: document.querySelector('[data-header]'),
    themeToggle: document.querySelector('[data-theme-toggle]'),
    search: document.querySelector('[data-search]'),
    filters: [...document.querySelectorAll('[data-filter]')],
    sort: document.querySelector('[data-sort]'),
    list: document.querySelector('[data-product-list]'),
    template: document.querySelector('#product-template'),
    count: document.querySelector('[data-result-count]'),
    statProjects: document.querySelector('[data-stat-projects]'),
    statAudio: document.querySelector('[data-stat-audio]'),
    statEngineering: document.querySelector('[data-stat-engineering]'),
    directoryStatus: document.querySelector('[data-directory-status]'),
    syncLabel: document.querySelector('[data-sync-label]'),
    year: document.querySelector('[data-year]')
  };

  function normalize(value = '') {
    return String(value)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[_-]+/g, ' ')
      .trim();
  }

  function safeHttpUrl(value) {
    if (!value) return '';
    try {
      const url = new URL(value);
      return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
    } catch {
      return '';
    }
  }

  function humanizeName(name) {
    const special = {
      api: 'API', dsp: 'DSP', vst: 'VST', ktv: 'KTV', sc220: 'SC220',
      iec: 'IEC', rtu: 'RTU', sas: 'SAS', obs: 'OBS', ui: 'UI', ux: 'UX',
      android: 'Android', github: 'GitHub', sonkupik: 'SonkuPik', askp: 'ASK-P'
    };

    return normalize(name)
      .split(' ')
      .filter(Boolean)
      .map(word => special[word] || word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  function searchableText(repo) {
    return normalize([
      repo.name,
      repo.displayName,
      repo.description,
      repo.language,
      ...(repo.topics || [])
    ].join(' '));
  }

  function classify(repo) {
    const override = OVERRIDES[repo.name];
    if (override?.category) return override.category;

    const haystack = searchableText(repo);
    const scores = Object.fromEntries(Object.keys(KEYWORDS).map(key => [key, 0]));

    for (const [category, keywords] of Object.entries(KEYWORDS)) {
      for (const keyword of keywords) {
        if (haystack.includes(normalize(keyword))) scores[category] += keyword.includes(' ') ? 3 : 1;
      }
    }

    const ordered = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    if (ordered[0][1] === 0) return repo.homepage ? 'web' : 'apps';
    return ordered[0][0];
  }

  function priorityFor(repo) {
    const override = OVERRIDES[repo.name];
    let score = override?.priority || 0;
    if (override?.featured) score += 20;
    if (repo.homepage) score += 12;
    if ((repo.topics || []).length) score += Math.min(repo.topics.length, 6);
    if (repo.description) score += 3;
    if (repo.category === 'audio') score += 5;

    const ageDays = Math.max(0, (Date.now() - new Date(repo.updated_at).getTime()) / 86400000);
    score += Math.max(0, 10 - ageDays / 45);
    return score;
  }

  function prepareRepo(repo) {
    const override = OVERRIDES[repo.name] || {};
    const prepared = {
      ...repo,
      homepage: safeHttpUrl(override.homepage || repo.homepage),
      displayName: override.name || humanizeName(repo.name),
      description: override.description || repo.description || 'Repository publik MasArray untuk software, eksperimen, atau dokumentasi teknis.',
      topics: Array.isArray(repo.topics) ? repo.topics : [],
      featured: Boolean(override.featured)
    };
    prepared.category = classify(prepared);
    prepared.priority = priorityFor(prepared);
    prepared.searchText = searchableText(prepared);
    return prepared;
  }

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Tanggal tidak tersedia';
    return `Diperbarui ${new Intl.DateTimeFormat('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric'
    }).format(date)}`;
  }

  function getVisibleRepos() {
    const query = normalize(state.query);
    const filtered = state.repos.filter(repo => {
      const categoryMatches = state.category === 'all' || repo.category === state.category;
      const queryMatches = !query || repo.searchText.includes(query);
      return categoryMatches && queryMatches;
    });

    return filtered.sort((a, b) => {
      if (state.sort === 'name') return a.displayName.localeCompare(b.displayName, 'id');
      if (state.sort === 'updated') return new Date(b.updated_at) - new Date(a.updated_at);
      return b.priority - a.priority || new Date(b.updated_at) - new Date(a.updated_at);
    });
  }

  function topicLabels(repo) {
    const topics = repo.topics.slice(0, 4);
    if (!topics.length) topics.push(CATEGORY_LABELS[repo.category]);
    if (repo.language && !topics.some(topic => normalize(topic) === normalize(repo.language))) {
      topics.push(repo.language);
    }
    return topics.slice(0, 5);
  }

  function render() {
    const visible = getVisibleRepos();
    els.list.replaceChildren();
    els.count.textContent = String(visible.length);
    els.list.setAttribute('aria-busy', 'false');

    if (!visible.length) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      const title = document.createElement('strong');
      title.textContent = 'Belum menemukan proyek yang cocok.';
      const text = document.createElement('span');
      text.textContent = 'Coba kata kunci lain atau pilih filter Semua.';
      empty.append(title, text);
      els.list.append(empty);
      return;
    }

    const fragment = document.createDocumentFragment();
    visible.forEach((repo, index) => {
      const node = els.template.content.cloneNode(true);
      const row = node.querySelector('.product-row');
      const title = node.querySelector('h3');
      const description = node.querySelector('.product-summary > p');
      const status = node.querySelector('.product-status');
      const tags = node.querySelector('.product-tags');
      const language = node.querySelector('.product-language');
      const date = node.querySelector('time');
      const site = node.querySelector('.product-site');
      const release = node.querySelector('.product-release');
      const code = node.querySelector('.product-code');

      row.dataset.category = repo.category;
      node.querySelector('.product-index').textContent = String(index + 1).padStart(2, '0');
      title.textContent = repo.displayName;
      description.textContent = repo.description;
      status.textContent = repo.featured ? 'FEATURED' : 'PUBLIC';
      status.style.borderColor = repo.featured ? 'rgba(239,125,56,.30)' : '';
      status.style.color = repo.featured ? '#b85a24' : '';

      topicLabels(repo).forEach(topic => {
        const item = document.createElement('span');
        item.textContent = topic;
        tags.append(item);
      });

      language.textContent = repo.language || CATEGORY_LABELS[repo.category];
      date.dateTime = repo.updated_at || '';
      date.textContent = formatDate(repo.updated_at);

      if (repo.homepage) {
        site.href = repo.homepage;
        site.setAttribute('aria-label', `Buka website ${repo.displayName}`);
      } else {
        site.remove();
      }

      release.href = `${repo.html_url}/releases`;
      release.setAttribute('aria-label', `Lihat rilis ${repo.displayName}`);
      code.href = repo.html_url;
      code.setAttribute('aria-label', `Buka source code ${repo.displayName}`);
      fragment.append(node);
    });

    els.list.append(fragment);
  }

  function updateStats() {
    const audio = state.repos.filter(repo => repo.category === 'audio').length;
    const engineering = state.repos.filter(repo => repo.category === 'engineering').length;
    els.statProjects.textContent = String(state.repos.length).padStart(2, '0');
    els.statAudio.textContent = String(audio).padStart(2, '0');
    els.statEngineering.textContent = String(engineering).padStart(2, '0');
  }

  function setSyncStatus(success, fallback = false) {
    const now = new Date();
    const time = new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit' }).format(now);
    els.syncLabel.textContent = success ? `Sinkron ${time}` : 'Mode cadangan';
    els.directoryStatus.textContent = fallback
      ? 'GitHub API sedang tidak tersedia — menampilkan proyek utama.'
      : `${state.repos.length} repository publik berhasil dimuat dari GitHub.`;
  }

  async function fetchRepos() {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch(API_URL, {
        headers: { Accept: 'application/vnd.github+json' },
        signal: controller.signal
      });
      if (!response.ok) throw new Error(`GitHub API ${response.status}`);
      const repos = await response.json();
      if (!Array.isArray(repos)) throw new Error('Respons GitHub tidak valid');

      state.repos = repos
        .filter(repo => !repo.fork && !repo.archived && repo.size > 0 && !EXCLUDED_REPOS.has(repo.name))
        .map(prepareRepo);

      if (!state.repos.length) throw new Error('Tidak ada repository untuk ditampilkan');
      setSyncStatus(true, false);
    } catch (error) {
      console.warn('MasArray directory fallback:', error);
      state.repos = FALLBACK_REPOS.map(prepareRepo);
      setSyncStatus(false, true);
    } finally {
      window.clearTimeout(timeout);
    }

    updateStats();
    render();
  }

  function initTheme() {
    const stored = localStorage.getItem('masarray-theme');
    const preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    document.documentElement.dataset.theme = stored || preferred;

    els.themeToggle?.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('masarray-theme', next);
    });
  }

  function initInteractions() {
    window.addEventListener('scroll', () => {
      els.header?.classList.toggle('scrolled', window.scrollY > 16);
    }, { passive: true });

    els.search?.addEventListener('input', event => {
      state.query = event.target.value;
      render();
    });

    els.filters.forEach(button => {
      button.addEventListener('click', () => {
        state.category = button.dataset.filter;
        els.filters.forEach(item => item.classList.toggle('active', item === button));
        render();
      });
    });

    els.sort?.addEventListener('change', event => {
      state.sort = event.target.value;
      render();
    });

    document.addEventListener('keydown', event => {
      const target = event.target;
      const typing = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement;
      if (event.key === '/' && !typing) {
        event.preventDefault();
        els.search?.focus();
      }
      if (event.key === 'Escape' && document.activeElement === els.search) {
        els.search.value = '';
        state.query = '';
        els.search.blur();
        render();
      }
    });
  }

  els.year.textContent = new Date().getFullYear();
  initTheme();
  initInteractions();
  fetchRepos();
})();
