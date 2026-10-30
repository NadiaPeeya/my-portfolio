/*
 * Page behaviour: i18n, content rendering, scroll ↔ 3D sync, HUD, nav,
 * typing effect, reveal-on-scroll, contact form and the loader.
 */
(function () {
  'use strict';

  const DATA = window.PORTFOLIO;
  const LANG_KEY = 'peeya.lang';
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  let lang = pickInitialLang();
  let activeFilter = 'all';
  let booted = false; // reveals wait until the loader is gone

  /* ---------------------------------------------------------- i18n */

  function pickInitialLang() {
    const fromUrl = new URLSearchParams(location.search).get('lang');
    if (fromUrl === 'en' || fromUrl === 'ja') return fromUrl;
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === 'en' || saved === 'ja') return saved;
    } catch (e) { /* storage unavailable */ }
    return (navigator.language || '').toLowerCase().startsWith('ja') ? 'ja' : 'en';
  }

  const t = (key) => DATA.ui[lang][key] ?? DATA.ui.en[key] ?? key;
  const pick = (v) => (v && typeof v === 'object' && 'en' in v ? v[lang] : v);

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function setLang(next) {
    lang = next;
    try { localStorage.setItem(LANG_KEY, next); } catch (e) { /* ignore */ }
    document.documentElement.lang = next;
    document.title = next === 'ja'
      ? 'ピーヤ ナディア · ソフトウェア／AI エンジニア'
      : 'Peeya Nadia · Software & AI Engineer';
    $$('.lang__btn').forEach((b) => b.classList.toggle('is-active', b.dataset.lang === next));
    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    // these strings are authored in content.js (trusted), and contain inline <em>/<span>
    $$('[data-i18n-html]').forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
    renderAll();
    typer.restart();
  }

  /* ---------------------------------------------------------- rendering */

  function renderStats() {
    $('#stats').innerHTML = DATA.stats.map((s) => `
      <div class="stat">
        <div class="stat__value gradient-text">${esc(pick(s.value))}</div>
        <div class="stat__label">${esc(t(s.key))}</div>
      </div>`).join('');
  }

  function renderTimeline() {
    $('#timeline').innerHTML = DATA.experience.map((x, i) => `
      <li class="tl-item glass card reveal" style="--delay:${i * 0.08}s">
        <p class="tl-item__date mono">${esc(pick(x.date))}</p>
        <h3 class="tl-item__role">${esc(pick(x.role))}</h3>
        <p class="tl-item__org">${esc(pick(x.org))}</p>
        <ul>${x.points[lang].map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
        <div class="chips chips--sm">${x.tags.map((tg) => `<span class="chip">${esc(tg)}</span>`).join('')}</div>
      </li>`).join('');
    $('#earlier').innerHTML = DATA.earlier.map((e) => `
      <li><span>${esc(e[lang])}</span><span class="mono dim">${esc(pick(e.date))}</span></li>`).join('');
  }

  function filterColor(id) {
    const f = DATA.filters.find((x) => x.id === id);
    return (f && f.color) || '#e8507a';
  }

  function renderFilters() {
    $('#filters').innerHTML = DATA.filters.map((f) => `
      <button type="button" role="tab" class="chip chip--btn${f.id === activeFilter ? ' is-active' : ''}"
        data-filter="${f.id}" style="--c:${f.color || '#3b2232'}" aria-selected="${f.id === activeFilter}">
        ${esc(pick(f.label))}
      </button>`).join('');
  }

  function renderProjects() {
    $('#projectGrid').innerHTML = DATA.projects.map((p, i) => {
      const c = filterColor(p.cats[0]);
      const team = p.meta.team ? ` · ${p.meta.team}${lang === 'ja' ? '名' : ' ppl'}` : '';
      return `
      <article class="project glass reveal${p.featured ? ' project--featured' : ''}" data-cats="${p.cats.join(' ')}" style="--c:${c};--delay:${(i % 3) * 0.08}s">
        <span class="project__glow"></span>
        <div class="project__top mono">
          <span class="project__kind"><span class="tag-dot"></span>${esc(pick(p.kind))}</span>
          <span class="project__meta">${esc(p.meta.date)}${esc(team)}</span>
        </div>
        <h3 class="project__name">${esc(pick(p.name))}</h3>
        <p class="project__desc">${esc(pick(p.desc))}</p>
        <div class="chips chips--sm">${p.stack.map((s) => `<span class="chip">${esc(s)}</span>`).join('')}</div>
      </article>`;
    }).join('');
    applyFilter();
  }

  function applyFilter() {
    $$('.project').forEach((el) => {
      const show = activeFilter === 'all' || el.dataset.cats.split(' ').includes(activeFilter);
      el.classList.toggle('is-hidden', !show);
    });
  }

  function renderResearch() {
    $('#phases').innerHTML = DATA.phases.map((ph) => `<li>${esc(ph[lang])}</li>`).join('');
  }

  function renderSkills() {
    $('#skillGroups').innerHTML = DATA.skills.map((g, i) => `
      <div class="skills__group glass reveal" style="--delay:${(i % 2) * 0.08}s">
        <h3 class="skills__name"><span class="skills__icon">${g.icon}</span>${esc(pick(g.name))}</h3>
        <div class="chips">${g.items.map((s) => `<span class="chip">${esc(s)}</span>`).join('')}</div>
      </div>`).join('');
  }

  function renderJourney() {
    $('#education').innerHTML = DATA.education.map((e, i) => `
      <div class="edu glass reveal" style="--delay:${i * 0.08}s">
        <span class="edu__icon">${e.icon}</span>
        <div>
          <p class="mono accent">${esc(pick(e.date))}</p>
          <h3 class="edu__title">${esc(pick(e.title))}</h3>
          <p class="edu__org">${esc(pick(e.org))}</p>
        </div>
      </div>`).join('');
    $('#milestones').innerHTML = DATA.milestones.map((m) => `
      <li><span class="mono">${esc(m.date)}</span><span>${esc(m[lang])}</span></li>`).join('');
    $('#languages').innerHTML = DATA.languages.map((l) => `
      <div class="lang-row">
        <div class="lang-row__top"><b>${esc(pick(l.name))}</b><span class="dim mono">${esc(pick(l.level))}</span></div>
        <div class="lang-row__bar"><span style="--pct:${l.pct}%"></span></div>
      </div>`).join('');
  }

  function renderAll() {
    renderStats();
    renderTimeline();
    renderFilters();
    renderProjects();
    renderResearch();
    renderSkills();
    renderJourney();
    if (booted) observeReveals();
  }

  /* ---------------------------------------------------------- reveal */

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

  function observeReveals() {
    $$('.reveal:not(.is-visible)').forEach((el) => revealObserver.observe(el));
  }

  /* ---------------------------------------------------------- typing */

  const typer = (function () {
    const el = $('#typed');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timer = null, word = 0, chars = 0, deleting = false;

    function tick() {
      const words = DATA.roles[lang];
      const current = words[word % words.length];
      if (reduce) { el.textContent = words.join(' · '); return; }
      chars += deleting ? -1 : 1;
      el.textContent = current.slice(0, chars);
      let delay = deleting ? 35 : 75;
      if (!deleting && chars === current.length) { deleting = true; delay = 1800; }
      else if (deleting && chars === 0) { deleting = false; word++; delay = 350; }
      timer = setTimeout(tick, delay);
    }

    return {
      restart() {
        clearTimeout(timer);
        word = 0; chars = 0; deleting = false;
        tick();
      },
    };
  })();

  /* ---------------------------------------------------------- scroll / HUD */

  const sections = $$('main > .section');
  const navLinks = $$('#navLinks a');

  function buildHud() {
    $('#hudDots').innerHTML = sections.map((s) => `<a href="#${s.id}" aria-label="${s.id}"></a>`).join('');
    $('#hudTotal').textContent = String(sections.length).padStart(2, '0');
  }

  let lastActive = -1;
  function onScroll() {
    const mid = window.scrollY + window.innerHeight * 0.5;
    const centres = sections.map((s) => s.offsetTop + s.offsetHeight / 2);

    // fractional index between section centres → drives the 3D camera
    let p = 0;
    if (mid <= centres[0]) p = 0;
    else if (mid >= centres[centres.length - 1]) p = centres.length - 1;
    else {
      for (let i = 0; i < centres.length - 1; i++) {
        if (mid >= centres[i] && mid < centres[i + 1]) {
          p = i + (mid - centres[i]) / (centres[i + 1] - centres[i]);
          break;
        }
      }
    }
    if (window.SakuraScene) window.SakuraScene.setProgress(p);

    const active = Math.round(p);
    if (active !== lastActive) {
      lastActive = active;
      const id = sections[active].id;
      $('#hudKanji').textContent = sections[active].dataset.kanji;
      $('#hudCurrent').textContent = String(active + 1).padStart(2, '0');
      $$('#hudDots a').forEach((d, i) => {
        d.classList.toggle('is-active', i === active);
        d.classList.toggle('is-done', i < active);
      });
      navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`));
    }
  }

  /* ---------------------------------------------------------- interactions */

  function bindNav() {
    const toggle = $('#navToggle');
    const links = $('#navLinks');
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    $$('.lang__btn').forEach((b) => b.addEventListener('click', () => {
      if (b.dataset.lang !== lang) setLang(b.dataset.lang);
    }));
  }

  function bindFilters() {
    $('#filters').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-filter]');
      if (!btn) return;
      activeFilter = btn.dataset.filter;
      $$('#filters .chip--btn').forEach((b) => {
        const on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', String(on));
      });
      applyFilter();
    });
  }

  function bindForm() {
    const form = $('#contactForm');
    const status = $('#formStatus');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = String(fd.get('name') || '').trim();
      const email = String(fd.get('email') || '').trim();
      const message = String(fd.get('message') || '').trim();
      if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = t('contact.invalid');
        status.classList.add('is-error');
        return;
      }
      status.classList.remove('is-error');
      status.textContent = t('contact.opening');
      const subject = encodeURIComponent(`Portfolio — ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:nadiapeeya05@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // a tiny sakura burst wherever you click
  function bindBloom() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.addEventListener('pointerdown', (e) => {
      if (e.target.closest('input, textarea, button, a')) return;
      const b = document.createElement('span');
      b.className = 'bloom';
      b.style.left = `${e.clientX}px`;
      b.style.top = `${e.clientY}px`;
      for (let i = 0; i < 6; i++) {
        const p = document.createElement('i');
        p.style.setProperty('--r', `${i * 60 + Math.random() * 30}deg`);
        p.style.setProperty('--d', `${26 + Math.random() * 26}px`);
        b.appendChild(p);
      }
      document.body.appendChild(b);
      setTimeout(() => b.remove(), 950);
    });
  }

  function bindPointer() {
    window.addEventListener('pointermove', (e) => {
      if (!window.SakuraScene) return;
      window.SakuraScene.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    }, { passive: true });
  }

  /* ---------------------------------------------------------- loader */

  function logStep(key) {
    const li = document.createElement('li');
    li.innerHTML = `<span>${esc(t(key))}</span><span class="dim">…</span>`;
    $('#loaderLog').appendChild(li);
    return {
      done(ok, label) {
        const s = li.lastElementChild;
        s.textContent = label || (ok ? 'ok' : 'skip');
        s.className = ok ? 'ok' : 'err';
      },
    };
  }

  async function boot() {
    const fonts = logStep('loader.fonts');
    await Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise((r) => setTimeout(r, 2500))]);
    fonts.done(true);

    const canvas = $('#webgl');
    const steps = {};
    try {
      await window.SakuraScene.init(canvas, (name, state) => {
        if (state === 'start') steps[name] = logStep(name === 'scene' ? 'loader.scene' : 'loader.petals');
        else steps[name].done(true);
      });
    } catch (err) {
      console.warn('[portfolio] 3D scene unavailable:', err);
      Object.values(steps).forEach((s) => s.done(false));
      logStep('loader.no3d').done(false, '2D');
      canvas.classList.add('webgl--fallback');
      window.SakuraScene = null;
    }

    logStep('loader.ready').done(true, '✿');
    onScroll();
    setTimeout(() => {
      $('#loader').classList.add('is-done');
      booted = true;
      observeReveals();
    }, 350);
  }

  /* ---------------------------------------------------------- start */

  $('#year').textContent = new Date().getFullYear();
  buildHud();
  bindNav();
  bindFilters();
  bindForm();
  bindBloom();
  bindPointer();
  setLang(lang);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  boot();
})();
