/* Amsteldijk 64-1 — Woningdashboard: app logica */

let STATE = null;
let EXPENSES = [];
let KOSTEN = [];
let syncTimer = null;
let syncInFlight = false;

/* ---------- State ---------- */

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return getDefaultState();
  try {
    const parsed = JSON.parse(raw);
    const fresh = getDefaultState();
    const merged = { ...fresh, ...parsed };
    mergeSeedPhotos(merged);
    return merged;
  } catch (e) {
    return getDefaultState();
  }
}

function mergeSeedPhotos(state) {
  if (!state.fotos) state.fotos = { photos: [] };
  if (!Array.isArray(state.fotos.photos)) state.fotos.photos = [];
  const existingIds = new Set(state.fotos.photos.map((p) => p.id));
  SEED_PHOTOS.forEach((p) => {
    if (!existingIds.has(p.id)) state.fotos.photos.push(p);
  });
}

function saveState() {
  STATE.meta.lastUpdated = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE));
}

function loadExpenses() {
  const raw = localStorage.getItem(EXPENSES_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function saveExpenses() {
  localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(EXPENSES));
  saveState();
}

function loadKosten() {
  const raw = localStorage.getItem(KOSTEN_STORAGE_KEY);
  if (!raw) {
    const seeded = JSON.parse(JSON.stringify(KOSTEN_SEED_ITEMS));
    localStorage.setItem(KOSTEN_STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    return JSON.parse(JSON.stringify(KOSTEN_SEED_ITEMS));
  }
}

function saveKosten() {
  localStorage.setItem(KOSTEN_STORAGE_KEY, JSON.stringify(KOSTEN));
  saveState();
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function formatEUR(value) {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: value % 1 === 0 ? 0 : 2 }).format(value);
}

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('visible');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('visible'), 2400);
}

/* ---------- Init ---------- */

document.addEventListener('DOMContentLoaded', () => {
  STATE = loadState();
  EXPENSES = loadExpenses();
  KOSTEN = loadKosten();
  applyTheme();
  initTabs();
  initThemeToggle();
  initOverzicht();
  initHuishouden();
  initSettingsModal();
  initFotos();
  initChat();
  initExpenses();
  initKosten();
  initAuth();
  renderAll();
  startCountdownTicker();
});

/* ---------- Login ---------- */

let CURRENT_USER = null;

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
  } catch (e) {
    return null;
  }
}

function saveSession(user) {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ user }));
}

function clearSession() {
  localStorage.removeItem(SESSION_STORAGE_KEY);
}

function initAuth() {
  document.getElementById('login-submit').addEventListener('click', attemptLogin);
  document.getElementById('login-password').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') attemptLogin();
  });
  document.getElementById('logout-btn').addEventListener('click', logout);

  const session = loadSession();
  if (session && USERS[session.user]) {
    document.getElementById('login-user').value = session.user;
    loginAs(session.user);
  }
}

function attemptLogin() {
  const user = document.getElementById('login-user').value;
  const password = document.getElementById('login-password').value;
  const errorEl = document.getElementById('login-error');
  const card = document.querySelector('.login-card');

  if (USERS[user] && USERS[user].password === password) {
    errorEl.classList.remove('visible');
    saveSession(user);
    loginAs(user);
  } else {
    errorEl.classList.add('visible');
    card.classList.remove('shake');
    void card.offsetWidth;
    card.classList.add('shake');
  }
}

function loginAs(user) {
  CURRENT_USER = user;
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('login-password').value = '';
  document.getElementById('user-initial').textContent = USERS[user].initial;
  document.getElementById('user-badge').style.display = 'flex';
  syncNow();
  initAutoSyncIfConfigured();
}

function logout() {
  clearInterval(syncTimer);
  clearSession();
  CURRENT_USER = null;
  document.getElementById('user-badge').style.display = 'none';
  document.getElementById('login-error').classList.remove('visible');
  document.getElementById('login-password').value = '';
  document.getElementById('login-screen').classList.remove('hidden');
}

function renderAll() {
  renderOverzicht();
  renderPlanning();
  renderKamers();
  renderHuishouden();
  renderSfeer();
  renderPapierwerk();
  renderFinancien();
  renderKosten();
  renderExpenses();
  renderAutos();
  renderProjecten();
  renderFotos();
  renderChat();
  renderDossier();
  updateSyncUI();
}

/* ---------- Tabs ---------- */

function initTabs() {
  document.querySelectorAll('.tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      document.querySelectorAll('.tab').forEach((b) => b.classList.toggle('active', b === btn));
      document.querySelectorAll('.panel').forEach((p) => p.classList.toggle('active', p.id === `panel-${target}`));
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    });
  });
}

/* ---------- Thema ---------- */

function applyTheme() {
  const theme = STATE.settings.theme || 'light';
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.querySelector('#theme-toggle i');
  if (icon) icon.className = theme === 'dark' ? 'ti ti-sun' : 'ti ti-moon';
}

function initThemeToggle() {
  document.getElementById('theme-toggle').addEventListener('click', () => {
    STATE.settings.theme = STATE.settings.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
    saveState();
  });
}

/* ---------- Countdown ---------- */

function startCountdownTicker() {
  updateCountdown();
  setInterval(updateCountdown, 60 * 60 * 1000);
}

function updateCountdown() {
  const now = new Date();
  const target = new Date(MOVE_IN_DATE);
  const diffMs = target - now;
  const totalDays = Math.max(0, Math.ceil(diffMs / 86400000));
  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;
  document.getElementById('countdown-weeks').textContent = weeks;
  document.getElementById('countdown-days').textContent = days;
  document.getElementById('stat-days').textContent = totalDays;
}

/* ---------- Overzicht ---------- */

function initOverzicht() {
  const notitie = document.getElementById('overzicht-notitie');
  notitie.value = STATE.overzicht.notitie;
  notitie.addEventListener('input', () => {
    STATE.overzicht.notitie = notitie.value;
    saveState();
  });

  document.getElementById('action-list').addEventListener('click', (e) => {
    const row = e.target.closest('[data-action-id]');
    if (!row) return;
    if (e.target.matches('.checkbox')) {
      const item = STATE.overzicht.actions.find((a) => a.id === row.dataset.actionId);
      item.done = e.target.checked;
      saveState();
      renderOverzicht();
    }
  });

  document.getElementById('settings-btn').addEventListener('click', openSettingsModal);
}

function computeStats() {
  const booleanCollections = [
    STATE.overzicht.actions,
    ...STATE.planning.phases.map((p) => p.items),
    ...STATE.projecten.projects.map((p) => p.steps),
  ].flat();
  const statusCollections = [
    ...STATE.papierwerk.sections.map((s) => s.items),
    STATE.dossier.documents,
  ].flat();

  let done = 0;
  let total = 0;
  booleanCollections.forEach((i) => { total++; if (i.done) done++; });
  statusCollections.forEach((i) => { total++; if (i.status === 'gereed') done++; });

  return { done, todo: total - done };
}

function renderOverzicht() {
  const stats = computeStats();
  document.getElementById('stat-done').textContent = stats.done;
  document.getElementById('stat-todo').textContent = stats.todo;

  const list = document.getElementById('action-list');
  list.innerHTML = STATE.overzicht.actions.map((a) => `
    <div class="action-item ${a.done ? 'done' : ''}" data-action-id="${a.id}">
      <input type="checkbox" class="checkbox" ${a.done ? 'checked' : ''}>
      <span class="action-item-text">${a.text}</span>
      <div class="tag-row">${a.tags.map((t) => `<span class="tag ${tagClass(t)}">${t}</span>`).join('')}</div>
    </div>
  `).join('');

  const paperworkTotal = STATE.papierwerk.sections.flatMap((s) => s.items);
  const paperworkPct = Math.round((paperworkTotal.filter((i) => i.status === 'gereed').length / paperworkTotal.length) * 100);
  const planningTotal = STATE.planning.phases.flatMap((p) => p.items);
  const planningPct = Math.round((planningTotal.filter((i) => i.done).length / planningTotal.length) * 100);
  const furniturePct = Math.round((STATE.huishouden.items.filter((i) => i.status !== 'later').length / STATE.huishouden.items.length) * 100);

  const rows = [
    { label: 'Papierwerk', pct: paperworkPct },
    { label: 'Planning', pct: planningPct },
    { label: 'Meubels', pct: furniturePct },
  ];
  document.getElementById('progress-rows').innerHTML = rows.map((r) => `
    <div>
      <div class="progress-row-label"><span>${r.label}</span><span>${r.pct}%</span></div>
      <div class="progress-track"><div class="progress-fill" style="width:${r.pct}%"></div></div>
    </div>
  `).join('');

  const strip = document.getElementById('photo-strip');
  const photos = STATE.fotos.photos.slice(0, 3);
  if (photos.length) {
    strip.innerHTML = photos.map((p) => `<div class="photo-thumb"><img src="${p.dataUrl}" alt="${p.name}" loading="lazy"></div>`).join('')
      + Array(3 - photos.length).fill('<div class="photo-placeholder"><i class="ti ti-photo"></i></div>').join('');
  }
}

function tagClass(tag) {
  const map = { Urgent: 'tag-urgent', Bastiaan: 'tag-bastiaan', Vivian: 'tag-vivian', Beiden: 'tag-beiden' };
  return map[tag] || '';
}

/* ---------- Planning ---------- */

function renderPlanning() {
  const bar = document.getElementById('phase-bar');
  bar.innerHTML = STATE.planning.phases.map((phase) => {
    const allDone = phase.items.every((i) => i.done);
    const anyDone = phase.items.some((i) => i.done);
    const cls = allDone ? 'completed' : (anyDone ? 'current' : '');
    return `<div class="phase-pill ${cls}">${phase.label}<span class="phase-pill-sub">${phase.sublabel}</span></div>`;
  }).join('');

  const container = document.getElementById('planning-phases');
  container.innerHTML = STATE.planning.phases.map((phase) => `
    <div class="card phase-section">
      <h2 class="phase-section-title">${phase.label} — ${phase.sublabel}</h2>
      <div class="action-list">
        ${phase.items.map((i) => `
          <div class="action-item ${i.done ? 'done' : ''}" data-phase="${phase.id}" data-item-id="${i.id}">
            <input type="checkbox" class="checkbox planning-checkbox" ${i.done ? 'checked' : ''}>
            <span class="action-item-text">${i.text}</span>
            <div class="tag-row">${i.tags.map((t) => `<span class="tag ${tagClass(t)}">${t}</span>`).join('')}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.planning-checkbox').forEach((cb) => {
    cb.addEventListener('change', (e) => {
      const row = e.target.closest('[data-item-id]');
      const phase = STATE.planning.phases.find((p) => p.id === row.dataset.phase);
      const item = phase.items.find((i) => i.id === row.dataset.itemId);
      item.done = e.target.checked;
      saveState();
      renderPlanning();
      renderOverzicht();
    });
  });
}

/* ---------- Kamers ---------- */

function renderKamers() {
  const grid = document.getElementById('rooms-grid');
  grid.innerHTML = STATE.kamers.rooms.map((room) => {
    const photo = STATE.fotos.photos.find((p) => p.room === room.id);
    return `
      <div class="room-card">
        <div class="room-thumb">${photo ? `<img src="${photo.dataUrl}" alt="${room.name}" loading="lazy">` : '<i class="ti ti-photo"></i>'}</div>
        <div class="room-body">
          <h3 class="room-name">${room.name}</h3>
          <p class="room-desc">${room.description}</p>
          <div class="progress-track" data-room-id="${room.id}" style="cursor:pointer">
            <div class="progress-fill" style="width:${room.progress}%"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('[data-room-id]').forEach((el) => {
    el.addEventListener('click', () => {
      const room = STATE.kamers.rooms.find((r) => r.id === el.dataset.roomId);
      const steps = [0, 25, 50, 75, 100];
      const idx = steps.indexOf(room.progress);
      room.progress = steps[(idx + 1) % steps.length];
      saveState();
      renderKamers();
    });
  });
}

/* ---------- Huishouden ---------- */

let householdFilters = { category: 'Alle', status: 'Alle', search: '' };

function initHuishouden() {
  document.getElementById('household-search').addEventListener('input', (e) => {
    householdFilters.search = e.target.value.toLowerCase();
    renderHouseholdList();
  });
}

function renderHuishouden() {
  const statsEl = document.getElementById('status-stats');
  statsEl.innerHTML = STATUS_OPTIONS.map((s) => {
    const count = STATE.huishouden.items.filter((i) => i.status === s.id).length;
    return `<div class="status-stat ${s.colorClass}">${count} ${s.label}</div>`;
  }).join('');

  const catBar = document.getElementById('filter-category');
  catBar.innerHTML = ['Alle', ...HOUSEHOLD_CATEGORIES].map((c) => `<button class="filter-chip ${householdFilters.category === c ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('');
  catBar.querySelectorAll('.filter-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      householdFilters.category = btn.dataset.cat;
      renderHuishouden();
    });
  });

  const statBar = document.getElementById('filter-status');
  statBar.innerHTML = ['Alle', ...STATUS_OPTIONS.map((s) => s.label)].map((label) => `<button class="filter-chip ${householdFilters.status === label ? 'active' : ''}" data-status="${label}">${label}</button>`).join('');
  statBar.querySelectorAll('.filter-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      householdFilters.status = btn.dataset.status;
      renderHuishouden();
    });
  });

  renderHouseholdList();
}

function renderHouseholdList() {
  const list = document.getElementById('household-list');
  const items = STATE.huishouden.items.filter((item) => {
    if (householdFilters.category !== 'Alle' && item.category !== householdFilters.category) return false;
    if (householdFilters.status !== 'Alle') {
      const statusOpt = STATUS_OPTIONS.find((s) => s.label === householdFilters.status);
      if (item.status !== statusOpt.id) return false;
    }
    if (householdFilters.search && !item.name.toLowerCase().includes(householdFilters.search)) return false;
    return true;
  });

  if (!items.length) {
    list.innerHTML = '<p class="gallery-empty">Geen items gevonden</p>';
    return;
  }

  list.innerHTML = items.map((item) => {
    const statusOpt = STATUS_OPTIONS.find((s) => s.id === item.status);
    return `
      <div class="household-item">
        <div class="household-item-top">
          <span class="household-item-name">${item.name}</span>
          <span class="household-item-cat">${item.category}</span>
        </div>
        <div class="household-item-controls">
          <select class="pill-select ${statusOpt.colorClass}" data-item-id="${item.id}" data-field="status">
            ${STATUS_OPTIONS.map((s) => `<option value="${s.id}" ${s.id === item.status ? 'selected' : ''}>${s.label}</option>`).join('')}
          </select>
          <select class="pill-select owner-select" data-item-id="${item.id}" data-field="owner">
            ${OWNER_OPTIONS.map((o) => `<option value="${o}" ${o === item.owner ? 'selected' : ''}>${o}</option>`).join('')}
          </select>
        </div>
      </div>
    `;
  }).join('');

  list.querySelectorAll('select').forEach((sel) => {
    sel.addEventListener('change', (e) => {
      const item = STATE.huishouden.items.find((i) => i.id === sel.dataset.itemId);
      item[sel.dataset.field] = sel.value;
      saveState();
      renderHuishouden();
    });
  });
}

/* ---------- Sfeer ---------- */

function renderSfeer() {
  document.getElementById('palette-row').innerHTML = SFEER.palette.map((c) => `<div class="palette-swatch" style="background:${c.hex}">${c.name}</div>`).join('');
  document.getElementById('style-tags').innerHTML = SFEER.styleTags.map((t) => `<span class="tag">${t}</span>`).join('');

  const notitie = document.getElementById('sfeer-notitie');
  notitie.value = STATE.sfeer.notitie;
  notitie.oninput = () => { STATE.sfeer.notitie = notitie.value; saveState(); };

  const shopList = document.getElementById('shop-list');
  shopList.innerHTML = STATE.sfeer.shops.map((s) => `
    <div class="check-item ${s.checked ? 'done' : ''}" data-shop-id="${s.id}">
      <input type="checkbox" class="checkbox" ${s.checked ? 'checked' : ''}>
      <span class="check-item-text">${s.name}</span>
    </div>
  `).join('');
  shopList.querySelectorAll('.checkbox').forEach((cb) => {
    cb.addEventListener('change', (e) => {
      const row = e.target.closest('[data-shop-id]');
      const shop = STATE.sfeer.shops.find((s) => s.id === row.dataset.shopId);
      shop.checked = e.target.checked;
      saveState();
      renderSfeer();
    });
  });
}

/* ---------- Papierwerk ---------- */

const PAPERWORK_STATUS_CYCLE = ['gereed', 'te-doen', 'wacht-op'];
const PAPERWORK_STATUS_LABEL = { gereed: 'Gereed', 'te-doen': 'Te doen', 'wacht-op': 'Wacht op' };

function renderPapierwerk() {
  const container = document.getElementById('paperwork-sections');
  container.innerHTML = STATE.papierwerk.sections.map((section) => `
    <div class="card paperwork-section">
      <div class="card-header"><h2>${section.title}</h2></div>
      ${section.intro ? `<p class="paperwork-intro">${section.intro}</p>` : ''}
      ${section.items.map((item) => `
        <div class="paperwork-item">
          <span class="paperwork-item-text">${item.text}</span>
          <button class="status-badge ${item.status}" data-section="${section.id}" data-item-id="${item.id}">${PAPERWORK_STATUS_LABEL[item.status]}</button>
        </div>
      `).join('')}
    </div>
  `).join('');

  container.querySelectorAll('.status-badge').forEach((btn) => {
    btn.addEventListener('click', () => {
      const section = STATE.papierwerk.sections.find((s) => s.id === btn.dataset.section);
      const item = section.items.find((i) => i.id === btn.dataset.itemId);
      const idx = PAPERWORK_STATUS_CYCLE.indexOf(item.status);
      item.status = PAPERWORK_STATUS_CYCLE[(idx + 1) % PAPERWORK_STATUS_CYCLE.length];
      saveState();
      renderPapierwerk();
      renderOverzicht();
    });
  });
}

/* ---------- Financien ---------- */

function renderFinancien() {
  document.getElementById('finance-grid').innerHTML = FINANCE.cards.map((c) => `
    <div class="finance-card">
      <div class="finance-card-label">${c.label}</div>
      <div class="finance-card-value">${c.suffix ? formatEUR(c.value) + c.suffix : formatEUR(c.value)}</div>
    </div>
  `).join('');

  const budgetInput = document.getElementById('budget-input');
  budgetInput.value = STATE.financien.inrichtingsbudget;
  budgetInput.oninput = () => {
    STATE.financien.inrichtingsbudget = Number(budgetInput.value) || 0;
    saveState();
  };

  const inbreng = FINANCE.inbreng;
  document.getElementById('inbreng-details').innerHTML = `
    <div class="inbreng-row"><span>Inbreng Vivian</span><span>${formatEUR(inbreng.vivian)}</span></div>
    <div class="inbreng-row"><span>Inbreng Bastiaan</span><span>${formatEUR(inbreng.bastiaan)}</span></div>
    <div class="inbreng-row"><span>Verschil</span><span>${formatEUR(inbreng.verschil)}</span></div>
    <div class="inbreng-row"><span>Bastiaan lost af aan Vivian</span><span>${formatEUR(inbreng.maandbedrag)}/mnd × ${inbreng.maanden} mnd</span></div>
  `;
}

/* ---------- Kostenoverzicht ---------- */

function initKosten() {
  const container = document.getElementById('kosten-categories');

  container.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.kosten-add-row');
    if (addBtn) {
      KOSTEN.push({
        id: uid(),
        category: addBtn.dataset.category,
        name: '',
        amount: 0,
        status: 'te-kopen',
        note: '',
      });
      saveKosten();
      renderKosten();
      const row = container.querySelector(`[data-category-add="${cssEscape(addBtn.dataset.category)}"] tr:last-child .kosten-input`);
      if (row) row.focus();
      return;
    }
    const delBtn = e.target.closest('.expense-delete');
    if (delBtn) {
      KOSTEN = KOSTEN.filter((k) => k.id !== delBtn.dataset.id);
      saveKosten();
      renderKosten();
    }
  });

  container.addEventListener('input', (e) => {
    const input = e.target.closest('.kosten-input');
    if (!input) return;
    const row = input.closest('tr');
    const item = KOSTEN.find((k) => k.id === row.dataset.id);
    if (!item) return;
    const field = input.dataset.field;
    item[field] = field === 'amount' ? Number(input.value) || 0 : input.value;
    saveKosten();
    if (field === 'amount' || field === 'status') renderKostenTotals();
  });

  container.addEventListener('change', (e) => {
    const input = e.target.closest('.kosten-input');
    if (!input) return;
    const row = input.closest('tr');
    const item = KOSTEN.find((k) => k.id === row.dataset.id);
    if (!item) return;
    const field = input.dataset.field;
    item[field] = field === 'amount' ? Number(input.value) || 0 : input.value;
    saveKosten();
    renderKosten();
  });
}

function cssEscape(str) {
  return String(str).replace(/"/g, '\\"');
}

function renderKosten() {
  const container = document.getElementById('kosten-categories');
  container.innerHTML = KOSTEN_CATEGORIES.map((cat) => {
    const items = KOSTEN.filter((k) => k.category === cat);
    const subtotal = items.reduce((sum, k) => sum + (Number(k.amount) || 0), 0);
    return `
      <div class="card kosten-category-card" data-category-add="${cat}">
        <div class="kosten-category-header">
          <h3 class="kosten-category-title">${cat}</h3>
          <span class="kosten-category-subtotal">${formatEUR(subtotal)}</span>
        </div>
        <div class="table-scroll">
          <table class="kosten-table">
            <thead>
              <tr>
                <th>Omschrijving</th>
                <th>Bedrag</th>
                <th>Status</th>
                <th>Notitie</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${items.map((k) => `
                <tr data-id="${k.id}">
                  <td><input type="text" class="expense-input kosten-input" data-field="name" value="${escapeHtml(k.name)}" placeholder="Omschrijving"></td>
                  <td><input type="number" class="expense-input kosten-input expense-amount" data-field="amount" value="${k.amount}" step="0.01" min="0"></td>
                  <td>
                    <select class="kosten-input pill-select ${KOSTEN_STATUS_OPTIONS.find((s) => s.id === k.status).colorClass}" data-field="status">
                      ${KOSTEN_STATUS_OPTIONS.map((s) => `<option value="${s.id}" ${s.id === k.status ? 'selected' : ''}>${s.label}</option>`).join('')}
                    </select>
                  </td>
                  <td><input type="text" class="expense-input kosten-input" data-field="note" value="${escapeHtml(k.note)}" placeholder="Notitie"></td>
                  <td><button class="icon-btn expense-delete" data-id="${k.id}" aria-label="Verwijder rij"><i class="ti ti-x"></i></button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <button class="btn btn-secondary btn-sm kosten-add-row" data-category="${cat}"><i class="ti ti-plus"></i> Toevoegen</button>
      </div>
    `;
  }).join('');

  renderKostenTotals();
}

function renderKostenTotals() {
  const directKopen = KOSTEN.filter((k) => k.status === 'te-kopen').reduce((s, k) => s + (Number(k.amount) || 0), 0);
  const uitgesteld = KOSTEN.filter((k) => k.status === 'uitstel').reduce((s, k) => s + (Number(k.amount) || 0), 0);
  const totaalAlles = KOSTEN.reduce((s, k) => s + (Number(k.amount) || 0), 0);
  const alBesteld = KOSTEN.filter((k) => k.status === 'besteld').reduce((s, k) => s + (Number(k.amount) || 0), 0);
  const nogTeRegelen = directKopen + uitgesteld;

  document.getElementById('kosten-totals').innerHTML = `
    <div class="finance-card">
      <div class="finance-card-label">Subtotaal direct kopen</div>
      <div class="finance-card-value">${formatEUR(directKopen)}</div>
    </div>
    <div class="finance-card">
      <div class="finance-card-label">Subtotaal uitgesteld</div>
      <div class="finance-card-value">${formatEUR(uitgesteld)}</div>
    </div>
    <div class="finance-card">
      <div class="finance-card-label">Totaal alles</div>
      <div class="finance-card-value">${formatEUR(totaalAlles)}</div>
    </div>
    <div class="finance-card">
      <div class="finance-card-label">Al besteld/gekocht</div>
      <div class="finance-card-value">${formatEUR(alBesteld)}</div>
    </div>
    <div class="finance-card">
      <div class="finance-card-label">Nog te regelen</div>
      <div class="finance-card-value">${formatEUR(nogTeRegelen)}</div>
    </div>
  `;
}

/* ---------- Uitgaven ---------- */

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function initExpenses() {
  document.getElementById('expense-add-btn').addEventListener('click', () => {
    EXPENSES.push({
      id: uid(),
      date: todayISO(),
      description: '',
      category: EXPENSE_CATEGORIES[0],
      amount: 0,
      paidBy: 'Samen',
      forWhom: 'Beiden',
    });
    saveExpenses();
    renderExpenses();
    const tbody = document.getElementById('expense-tbody');
    const lastInput = tbody.querySelector('tr:last-child .expense-input');
    if (lastInput) lastInput.focus();
  });

  const tbody = document.getElementById('expense-tbody');

  tbody.addEventListener('input', (e) => {
    const input = e.target.closest('.expense-input');
    if (!input) return;
    const row = input.closest('tr');
    const expense = EXPENSES.find((x) => x.id === row.dataset.id);
    if (!expense) return;
    const field = input.dataset.field;
    expense[field] = field === 'amount' ? Number(input.value) || 0 : input.value;
    saveExpenses();
    if (field === 'paidBy' || field === 'amount') renderExpenseTotals();
  });

  tbody.addEventListener('change', (e) => {
    const input = e.target.closest('.expense-input');
    if (!input) return;
    const row = input.closest('tr');
    const expense = EXPENSES.find((x) => x.id === row.dataset.id);
    if (!expense) return;
    const field = input.dataset.field;
    expense[field] = field === 'amount' ? Number(input.value) || 0 : input.value;
    saveExpenses();
    renderExpenseTotals();
  });

  tbody.addEventListener('click', (e) => {
    const btn = e.target.closest('.expense-delete');
    if (!btn) return;
    EXPENSES = EXPENSES.filter((x) => x.id !== btn.dataset.id);
    saveExpenses();
    renderExpenses();
  });
}

function renderExpenses() {
  const tbody = document.getElementById('expense-tbody');
  if (!EXPENSES.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="expense-table-empty">Nog geen uitgaven. Klik op "Toevoegen" om te beginnen.</td></tr>`;
  } else {
    tbody.innerHTML = EXPENSES.map((e) => `
      <tr data-id="${e.id}">
        <td><input type="date" class="expense-input" data-field="date" value="${e.date}"></td>
        <td><input type="text" class="expense-input" data-field="description" value="${escapeHtml(e.description)}" placeholder="Omschrijving"></td>
        <td>
          <select class="expense-input" data-field="category">
            ${EXPENSE_CATEGORIES.map((c) => `<option value="${c}" ${c === e.category ? 'selected' : ''}>${c}</option>`).join('')}
          </select>
        </td>
        <td><input type="number" class="expense-input expense-amount" data-field="amount" value="${e.amount}" step="0.01" min="0"></td>
        <td>
          <select class="expense-input" data-field="paidBy">
            ${EXPENSE_PAID_BY.map((p) => `<option value="${p}" ${p === e.paidBy ? 'selected' : ''}>${p}</option>`).join('')}
          </select>
        </td>
        <td>
          <select class="expense-input" data-field="forWhom">
            ${EXPENSE_FOR.map((f) => `<option value="${f}" ${f === e.forWhom ? 'selected' : ''}>${f}</option>`).join('')}
          </select>
        </td>
        <td><button class="icon-btn expense-delete" data-id="${e.id}" aria-label="Verwijder rij"><i class="ti ti-x"></i></button></td>
      </tr>
    `).join('');
  }
  renderExpenseTotals();
}

function renderExpenseTotals() {
  let bastiaan = 0;
  let vivian = 0;
  let samen = 0;
  EXPENSES.forEach((e) => {
    const amount = Number(e.amount) || 0;
    if (e.paidBy === 'Bastiaan') bastiaan += amount;
    else if (e.paidBy === 'Vivian') vivian += amount;
    else samen += amount;
  });
  const diff = bastiaan - vivian;
  let saldoLabel = 'Gelijk verdeeld';
  let saldoClass = '';
  if (diff > 0) { saldoLabel = `Bastiaan +${formatEUR(diff)}`; saldoClass = 'saldo-negative'; }
  else if (diff < 0) { saldoLabel = `Vivian +${formatEUR(-diff)}`; saldoClass = 'saldo-positive'; }

  document.getElementById('expense-totals').innerHTML = `
    <div class="finance-card">
      <div class="finance-card-label">Totaal Bastiaan</div>
      <div class="finance-card-value">${formatEUR(bastiaan)}</div>
    </div>
    <div class="finance-card">
      <div class="finance-card-label">Totaal Vivian</div>
      <div class="finance-card-value">${formatEUR(vivian)}</div>
    </div>
    <div class="finance-card">
      <div class="finance-card-label">Totaal samen</div>
      <div class="finance-card-value">${formatEUR(samen)}</div>
    </div>
    <div class="finance-card ${saldoClass}">
      <div class="finance-card-label">Saldo</div>
      <div class="finance-card-value">${saldoLabel}</div>
    </div>
  `;
}

/* ---------- Auto's ---------- */

function renderAutos() {
  const mini = STATE.autos.mini;
  const porsche = STATE.autos.porsche;
  document.getElementById('cars-list').innerHTML = `
    <div class="card car-card" data-car="mini">
      <div class="car-card-header">
        <span class="car-model">${mini.model}</span>
        <span class="car-owner">${mini.owner}</span>
      </div>
      <p class="car-task">${mini.task}</p>
      <div class="check-item">
        <input type="checkbox" class="checkbox" ${mini.done ? 'checked' : ''} data-car-done="mini">
        <span class="check-item-text ${mini.done ? '' : ''}">Geregeld</span>
      </div>
    </div>
    <div class="card car-card" data-car="porsche">
      <div class="car-card-header">
        <span class="car-model">${porsche.model}</span>
        <span class="car-owner">${porsche.owner}</span>
      </div>
      <p class="car-task">${porsche.task}<br><span style="color:var(--text-tertiary)">${porsche.currentLocation}</span></p>
      <div class="car-tip">
        <strong>Tip: ${porsche.tip.name}</strong>
        <span>${porsche.tip.phone} · ${porsche.tip.rating}★ · ${porsche.tip.feature}</span>
      </div>
      <div class="check-item">
        <input type="checkbox" class="checkbox" ${porsche.done ? 'checked' : ''} data-car-done="porsche">
        <span class="check-item-text">Geregeld</span>
      </div>
    </div>
  `;

  document.querySelectorAll('[data-car-done]').forEach((cb) => {
    cb.addEventListener('change', (e) => {
      STATE.autos[cb.dataset.carDone].done = e.target.checked;
      saveState();
    });
  });
}

/* ---------- Projecten ---------- */

function renderProjecten() {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = STATE.projecten.projects.map((p) => `
    <div class="card project-card">
      <h2 class="project-title">${p.title}</h2>
      <p class="project-desc">${p.description}</p>
      ${p.budgetMax ? `<span class="project-budget">${formatEUR(p.budgetMin)} – ${formatEUR(p.budgetMax)}</span>` : ''}
      <div class="project-steps" data-project="${p.id}">
        ${p.steps.map((s) => `
          <div class="action-item ${s.done ? 'done' : ''}">
            <input type="checkbox" class="checkbox project-step" data-project="${p.id}" data-step-id="${s.id}" ${s.done ? 'checked' : ''}>
            <span class="action-item-text">${s.text}</span>
          </div>
        `).join('')}
      </div>
      <textarea class="textarea project-note" data-project="${p.id}" placeholder="Notities…">${p.note}</textarea>
    </div>
  `).join('');

  grid.querySelectorAll('.project-step').forEach((cb) => {
    cb.addEventListener('change', (e) => {
      const project = STATE.projecten.projects.find((p) => p.id === cb.dataset.project);
      const step = project.steps.find((s) => s.id === cb.dataset.stepId);
      step.done = e.target.checked;
      saveState();
      renderProjecten();
      renderOverzicht();
    });
  });

  grid.querySelectorAll('.project-note').forEach((ta) => {
    ta.addEventListener('input', () => {
      const project = STATE.projecten.projects.find((p) => p.id === ta.dataset.project);
      project.note = ta.value;
      saveState();
    });
  });
}

/* ---------- Foto's ---------- */

let activePhotoCategory = 'Alle';
let lightboxPhotos = [];
let lightboxIndex = 0;

function initFotos() {
  document.getElementById('photo-upload').addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    const room = activePhotoCategory === 'Alle' ? 'algemeen' : activePhotoCategory;
    let remaining = files.length;
    if (!remaining) return;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        STATE.fotos.photos.push({ id: uid(), room, name: file.name, dataUrl: reader.result });
        remaining--;
        if (remaining === 0) {
          saveState();
          renderFotos();
          renderKamers();
          renderOverzicht();
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  });

  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev').addEventListener('click', () => stepLightbox(-1));
  document.getElementById('lightbox-next').addEventListener('click', () => stepLightbox(1));
  document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (!document.getElementById('lightbox').classList.contains('visible')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') stepLightbox(-1);
    if (e.key === 'ArrowRight') stepLightbox(1);
  });
}

function renderFotos() {
  const tabs = document.getElementById('photo-tabs');
  const categories = ['Alle', ...ROOMS.map((r) => r.id)];
  tabs.innerHTML = categories.map((c) => {
    const label = c === 'Alle' ? 'Alle' : ROOMS.find((r) => r.id === c).name;
    return `<button class="filter-chip ${activePhotoCategory === c ? 'active' : ''}" data-cat="${c}">${label}</button>`;
  }).join('');
  tabs.querySelectorAll('.filter-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      activePhotoCategory = btn.dataset.cat;
      renderFotos();
    });
  });

  const photos = activePhotoCategory === 'Alle'
    ? STATE.fotos.photos
    : STATE.fotos.photos.filter((p) => p.room === activePhotoCategory);

  const gallery = document.getElementById('photo-gallery');
  if (!photos.length) {
    gallery.innerHTML = '<p class="gallery-empty">Nog geen foto\'s. Voeg ze hieronder toe.</p>';
    return;
  }
  gallery.innerHTML = photos.map((p, idx) => `
    <div class="photo-thumb" data-idx="${idx}"><img src="${p.dataUrl}" alt="${p.name}" loading="lazy"></div>
  `).join('');
  gallery.querySelectorAll('.photo-thumb').forEach((el) => {
    el.addEventListener('click', () => {
      lightboxPhotos = photos;
      openLightbox(Number(el.dataset.idx));
    });
  });
}

function openLightbox(idx) {
  lightboxIndex = idx;
  document.getElementById('lightbox-img').src = lightboxPhotos[idx].dataUrl;
  document.getElementById('lightbox').classList.add('visible');
}

function stepLightbox(delta) {
  lightboxIndex = (lightboxIndex + delta + lightboxPhotos.length) % lightboxPhotos.length;
  document.getElementById('lightbox-img').src = lightboxPhotos[lightboxIndex].dataUrl;
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('visible');
}

/* ---------- Chat ---------- */

function initChat() {
  const keyInput = document.getElementById('chat-api-key');
  keyInput.value = STATE.chat.apiKey;
  document.getElementById('chat-key-save').addEventListener('click', () => {
    STATE.chat.apiKey = keyInput.value.trim();
    saveState();
    toast('API-sleutel opgeslagen');
    renderChat();
  });

  document.getElementById('chat-send').addEventListener('click', sendChatMessage);
  document.getElementById('chat-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendChatMessage();
  });
}

function renderChat() {
  document.getElementById('chat-key-card').classList.toggle('visible', !STATE.chat.apiKey);

  const win = document.getElementById('chat-window');
  win.innerHTML = STATE.chat.history.map((m) => `<div class="chat-bubble ${m.role}">${escapeHtml(m.content)}</div>`).join('');
  win.scrollTop = win.scrollHeight;

  document.getElementById('chat-suggestions').innerHTML = CHAT_SUGGESTIONS.map((s) => `<button class="chat-suggestion-btn" data-suggestion="${escapeHtml(s)}">${s}</button>`).join('');
  document.querySelectorAll('.chat-suggestion-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.getElementById('chat-input').value = btn.dataset.suggestion;
      sendChatMessage();
    });
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

async function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  if (!STATE.chat.apiKey) {
    toast('Vul eerst je Claude API-sleutel in');
    return;
  }
  STATE.chat.history.push({ role: 'user', content: text });
  input.value = '';
  saveState();
  renderChat();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': STATE.chat.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 1024,
        system: buildChatSystemPrompt(),
        messages: STATE.chat.history.map((m) => ({ role: m.role, content: m.content })),
      }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'Onbekende fout');
    const reply = data.content?.map((c) => c.text).join('') || '(geen antwoord)';
    STATE.chat.history.push({ role: 'assistant', content: reply });
  } catch (err) {
    STATE.chat.history.push({ role: 'assistant', content: `Er ging iets mis: ${err.message}` });
  }
  saveState();
  renderChat();
}

/* ---------- Dossier ---------- */

const DOC_STATUS_CYCLE = ['gereed', 'te-doen', 'wacht-op'];

function renderDossier() {
  const info = [
    ['Adres', `${HOME_INFO.address}, ${HOME_INFO.postcode} ${HOME_INFO.city}`],
    ['Aankoopprijs', formatEUR(HOME_INFO.purchasePrice) + ' k.k.'],
    ['Taxatiewaarde', `${formatEUR(HOME_INFO.appraisalValue)} (${HOME_INFO.appraisalDate}, ${HOME_INFO.appraisalInstitute})`],
    ['WOZ-waarde', `${formatEUR(HOME_INFO.wozValue)} (${HOME_INFO.wozDate})`],
    ['Oppervlak', `${HOME_INFO.surface}m² + dakterras ${HOME_INFO.terraceSurface}m² (${HOME_INFO.terraceOrientation})`],
    ['Bouwjaar', `${HOME_INFO.buildYear} — ${HOME_INFO.heritageStatus}`],
    ['Eigendom', HOME_INFO.ownership],
    ['Energielabel', HOME_INFO.energyLabel],
    ['Verwarming', HOME_INFO.heating],
    ['Airco', HOME_INFO.airco],
    ['Speakers', HOME_INFO.speakers],
    ['Plafondhoogte', `${HOME_INFO.ceilingHeight}m`],
    ['VvE bijdrage', `${formatEUR(HOME_INFO.vveContribution)}/mnd incl. opstal`],
    ['VvE reservefonds', `${formatEUR(HOME_INFO.vveReserveFund)} (laag, MJOP ontbreekt)`],
  ];
  document.getElementById('dossier-info').innerHTML = info.map(([l, v]) => `<div class="dossier-row"><span class="dossier-row-label">${l}</span><span class="dossier-row-value">${v}</span></div>`).join('');

  document.getElementById('dossier-fundering').innerHTML = `
    <div class="dossier-row"><span class="dossier-row-label">Hersteld</span><span class="dossier-row-value">${HOME_INFO.foundationRepairYear}</span></div>
    <div class="dossier-row"><span class="dossier-row-label">Methode</span><span class="dossier-row-value">${HOME_INFO.foundationMethod}</span></div>
  `;

  const list = document.getElementById('document-list');
  list.innerHTML = STATE.dossier.documents.map((doc) => `
    <div class="document-item">
      <span class="document-item-name">${doc.alert ? '<i class="ti ti-alert-triangle"></i>' : ''}${doc.name}</span>
      <button class="status-badge ${doc.status}" data-doc-id="${doc.id}">${PAPERWORK_STATUS_LABEL[doc.status]}</button>
    </div>
  `).join('');
  list.querySelectorAll('.status-badge').forEach((btn) => {
    btn.addEventListener('click', () => {
      const doc = STATE.dossier.documents.find((d) => d.id === btn.dataset.docId);
      const idx = DOC_STATUS_CYCLE.indexOf(doc.status);
      doc.status = DOC_STATUS_CYCLE[(idx + 1) % DOC_STATUS_CYCLE.length];
      saveState();
      renderDossier();
      renderOverzicht();
    });
  });
}

/* ---------- JSONBin sync ---------- */

function jsonbinConfigured() {
  return Boolean(JSONBIN_BIN_ID) && Boolean(JSONBIN_MASTER_KEY) && JSONBIN_MASTER_KEY !== 'JOUW_MASTER_KEY_HIER';
}

function openSettingsModal() {
  document.getElementById('autosync-toggle').checked = STATE.settings.autoSync;
  document.getElementById('settings-modal').classList.add('visible');
}

function closeSettingsModal() {
  document.getElementById('settings-modal').classList.remove('visible');
}

function initSettingsModal() {
  document.getElementById('settings-close').addEventListener('click', closeSettingsModal);
  document.getElementById('settings-modal').addEventListener('click', (e) => {
    if (e.target.id === 'settings-modal') closeSettingsModal();
  });

  document.getElementById('autosync-toggle').addEventListener('change', (e) => {
    STATE.settings.autoSync = e.target.checked;
    saveState();
    initAutoSyncIfConfigured();
  });

  document.getElementById('sync-now-btn').addEventListener('click', () => syncNow());
}

function initAutoSyncIfConfigured() {
  clearInterval(syncTimer);
  updateSyncUI();
  if (CURRENT_USER && STATE.settings.autoSync && jsonbinConfigured()) {
    syncTimer = setInterval(syncNow, 30000);
  }
}

async function syncNow() {
  if (!jsonbinConfigured() || syncInFlight) return;
  syncInFlight = true;
  updateSyncUI('pending');
  try {
    const getRes = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
      headers: { 'X-Master-Key': JSONBIN_MASTER_KEY },
    });
    const getData = await getRes.json();
    if (!getRes.ok) throw new Error(getData.message || 'Ophalen mislukt');
    const remote = getData.record;

    if (remote?.meta?.lastUpdated && (!STATE.meta.lastUpdated || remote.meta.lastUpdated > STATE.meta.lastUpdated)) {
      const remoteExpenses = remote.uitgaven || [];
      const remoteKosten = remote.kosten || [];
      STATE = { ...getDefaultState(), ...remote };
      mergeSeedPhotos(STATE);
      EXPENSES = remoteExpenses;
      KOSTEN = remoteKosten;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE));
      localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(EXPENSES));
      localStorage.setItem(KOSTEN_STORAGE_KEY, JSON.stringify(KOSTEN));
      renderAll();
      applyTheme();
    } else {
      const putRes = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Master-Key': JSONBIN_MASTER_KEY },
        body: JSON.stringify({ ...STATE, uitgaven: EXPENSES, kosten: KOSTEN }),
      });
      if (!putRes.ok) throw new Error('Opslaan naar JSONBin mislukt');
    }
    updateSyncUI('success');
  } catch (err) {
    updateSyncUI('error');
  } finally {
    syncInFlight = false;
  }
}

function updateSyncUI(state) {
  const dot = document.getElementById('sync-dot');
  const label = document.getElementById('sync-label');
  const modalDot = document.getElementById('modal-sync-dot');
  const modalLabel = document.getElementById('modal-sync-label');

  [dot, modalDot].forEach((d) => d.classList.remove('green', 'orange', 'red'));

  if (!jsonbinConfigured()) {
    label.textContent = 'Niet gesynchroniseerd';
    modalLabel.textContent = 'Niet gesynchroniseerd';
    return;
  }

  let text;
  let color;
  if (state === 'pending') {
    color = 'orange';
    text = 'Synchroniseren…';
  } else if (state === 'error') {
    color = 'red';
    text = 'Sync mislukt';
  } else {
    color = 'green';
    const time = new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
    text = `Gesynchroniseerd om ${time}`;
  }
  [dot, modalDot].forEach((d) => d.classList.add(color));
  label.textContent = text;
  modalLabel.textContent = text;
}
