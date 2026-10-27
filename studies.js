/* =========================================================================
   OpenEconomics STUDIES — comportamenti della home
   Stessa logica della versione precedente: barra, scroll-spy, filtri e viste
   dei report, ricerca rapida dalla lente. Nessuna dipendenza.
   ========================================================================= */
(function () {
  'use strict';

  /* ---- Barra: bordo sottile quando la pagina scorre ---------------------- */
  var site = document.getElementById('site');
  function onScroll() { if (site) site.classList.toggle('is-scrolled', window.scrollY > 24); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Scroll-spy: evidenzia in barra la sezione corrente ----------------
     Si osservano TUTTE le sezioni con id: quelle senza link in barra (hero)
     azzerano l'evidenziazione invece di lasciare acceso il link precedente. */
  var links = [].slice.call(document.querySelectorAll('.site__link'));
  var map = {};
  links.forEach(function (a) { if (a.hash) map[a.hash.slice(1)] = a; });
  function setActive(a) {
    links.forEach(function (l) { l.classList.remove('is-active'); });
    if (a) a.classList.add('is-active');
  }
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) setActive(map[e.target.id]); });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    [].slice.call(document.querySelectorAll('section[id]')).forEach(function (s) { spy.observe(s); });
  }
  links.forEach(function (a) { a.addEventListener('click', function () { setActive(a); }); });

  /* ---- Report: filtro per categoria + ricerca testuale + viste ---------- */
  var list = document.getElementById('reportsList');
  if (!list) return;
  var cards = [].slice.call(list.querySelectorAll('.study'));
  var search = document.getElementById('reportsSearch');
  var chips = [].slice.call(document.querySelectorAll('.reports__cats .oe-segment__btn'));
  var views = [].slice.call(document.querySelectorAll('.reports__views .oe-segment__btn'));
  var empty = document.getElementById('reportsEmpty');
  var state = { cat: 'all', q: '' };

  function press(group, btn) {
    group.forEach(function (b) { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
    btn.classList.add('is-active'); btn.setAttribute('aria-pressed', 'true');
  }

  function apply() {
    var n = 0;
    cards.forEach(function (c) {
      var okCat = state.cat === 'all' || c.getAttribute('data-cat') === state.cat;
      var okQ = !state.q || c.textContent.toLowerCase().indexOf(state.q) > -1;
      var show = okCat && okQ;
      c.hidden = !show;
      if (show) n++;
    });
    if (empty) empty.hidden = n > 0;
  }

  chips.forEach(function (ch) {
    ch.addEventListener('click', function () { press(chips, ch); state.cat = ch.getAttribute('data-cat'); apply(); });
  });
  if (search) search.addEventListener('input', function () { state.q = search.value.trim().toLowerCase(); apply(); });
  views.forEach(function (v) {
    v.addEventListener('click', function () {
      press(views, v);
      list.classList.remove('is-compact', 'is-list');
      var m = v.getAttribute('data-view');
      if (m === 'compact') list.classList.add('is-compact');
      else if (m === 'list') list.classList.add('is-list');
    });
  });

  /* ---- Ricerca rapida dalla lente in barra ------------------------------
     L'indice si costruisce dalle card della pagina: titolo, descrizione,
     categoria, riga di meta (che contiene i committenti) e miniatura.
     Nessun elenco duplicato da tenere aggiornato a mano. */
  var trigger = document.getElementById('navSearch');
  if (!trigger || !cards.length) return;

  var MAX = 5;
  var DIACRITICS = /[̀-ͯ]/g;
  function txt(el, sel) { var n = el.querySelector(sel); return n ? n.textContent.replace(/\s+/g, ' ').trim() : ''; }
  // Accenti e maiuscole fuori dai piedi: "siccita" deve trovare "siccità".
  function fold(s) { return s.toLowerCase().normalize('NFD').replace(DIACRITICS, ''); }
  // Si cerca per INIZIO DI PAROLA: cercando "eni" esce Eni, non "sostENIbile".
  function words(s) { return fold(s).split(/[^a-z0-9]+/).filter(Boolean); }

  var index = cards.map(function (card) {
    var img = card.querySelector('.study__media img');
    var meta = [].slice.call(card.querySelectorAll('.study__meta span'))
      .map(function (s) { return s.textContent.trim(); })
      .filter(function (t) { return t && t !== '·'; });
    var e = {
      href: card.getAttribute('href'),
      target: card.getAttribute('target'),
      title: txt(card, '.study__title'),
      desc: txt(card, '.study__desc'),
      cat: txt(card, '.study__cat'),
      lang: txt(card, '.study__lang'),
      thumb: img ? img.getAttribute('src') : ''
    };
    e.wTitle = words(e.title);
    e.wMeta = words(meta.join(' ') + ' ' + (card.getAttribute('data-client') || '') + ' ' + (card.getAttribute('data-cat') || ''));
    e.wDesc = words(e.desc);
    return e;
  });

  function startsAny(arr, q) { for (var i = 0; i < arr.length; i++) if (arr[i].indexOf(q) === 0) return true; return false; }
  // Il titolo pesa più della riga di meta, che pesa più della descrizione.
  function score(e, qs) {
    var total = 0;
    for (var i = 0; i < qs.length; i++) {
      var s = startsAny(e.wTitle, qs[i]) ? 3 : startsAny(e.wMeta, qs[i]) ? 2 : startsAny(e.wDesc, qs[i]) ? 1 : 0;
      if (!s) return 0;
      total += s;
    }
    return total;
  }

  var panel = document.createElement('div');
  panel.className = 'navsearch';
  panel.innerHTML =
    '<div class="oe-container"><div class="navsearch__panel">' +
      '<div class="navsearch__field">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.4-3.4"/></svg>' +
        '<input class="navsearch__input" type="search" autocomplete="off" spellcheck="false" ' +
               'placeholder="Cerca uno studio, un settore, un committente…" aria-label="Cerca uno studio">' +
      '</div>' +
      '<div class="navsearch__results" role="listbox"></div>' +
    '</div></div>';
  document.body.appendChild(panel);

  var input = panel.querySelector('.navsearch__input');
  var results = panel.querySelector('.navsearch__results');
  var cursor = -1;

  // Evidenzia la parte digitata nel titolo lavorando su nodi di testo.
  function highlight(node, value, q) {
    node.textContent = '';
    var at = -1;
    if (q) {
      var safe = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      var m = new RegExp('(^|[^a-z0-9])(' + safe + ')').exec(fold(value));
      if (m) at = m.index + m[1].length;
    }
    if (at < 0) { node.textContent = value; return; }
    node.appendChild(document.createTextNode(value.slice(0, at)));
    var mark = document.createElement('span');
    mark.className = 'navsearch__mark';
    mark.textContent = value.slice(at, at + q.length);
    node.appendChild(mark);
    node.appendChild(document.createTextNode(value.slice(at + q.length)));
  }

  function render(q) {
    var qs = words(q);
    var shown = !qs.length ? index.slice(0, MAX) : index
      .map(function (e, i) { return { e: e, s: score(e, qs), i: i }; })
      .filter(function (r) { return r.s > 0; })
      .sort(function (a, b) { return b.s - a.s || a.i - b.i; })
      .slice(0, MAX)
      .map(function (r) { return r.e; });
    cursor = -1;
    results.innerHTML = '';
    if (!shown.length) {
      var none = document.createElement('p');
      none.className = 'navsearch__empty';
      none.textContent = 'Nessuno studio per “' + q.trim() + '”.';
      results.appendChild(none);
      return;
    }
    shown.forEach(function (e) {
      var a = document.createElement('a');
      a.className = 'navsearch__item';
      a.href = e.href;
      a.setAttribute('role', 'option');
      if (e.target) { a.target = e.target; a.rel = 'noopener'; }
      var th = document.createElement('span');
      th.className = 'navsearch__thumb';
      if (e.thumb) th.style.backgroundImage = 'url("' + e.thumb + '")';
      var body = document.createElement('span');
      var cat = document.createElement('span');
      cat.className = 'navsearch__cat';
      cat.textContent = e.cat + (e.lang ? ' · ' + e.lang : '');
      var title = document.createElement('span');
      title.className = 'navsearch__title';
      highlight(title, e.title, qs[0] || '');
      var desc = document.createElement('span');
      desc.className = 'navsearch__desc';
      desc.textContent = e.desc;
      body.appendChild(cat); body.appendChild(title); body.appendChild(desc);
      a.appendChild(th); a.appendChild(body);
      results.appendChild(a);
    });
  }

  function moveCursor(step) {
    var items = [].slice.call(results.querySelectorAll('.navsearch__item'));
    if (!items.length) return;
    if (cursor >= 0) items[cursor].classList.remove('is-cursor');
    cursor = (cursor + step + items.length) % items.length;
    items[cursor].classList.add('is-cursor');
    items[cursor].scrollIntoView({ block: 'nearest' });
  }

  function isOpen() { return panel.classList.contains('is-open'); }
  function open() { panel.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); render(input.value); input.focus(); }
  function close() { panel.classList.remove('is-open'); trigger.setAttribute('aria-expanded', 'false'); }

  trigger.setAttribute('aria-expanded', 'false');
  trigger.addEventListener('click', function (e) { e.preventDefault(); if (isOpen()) close(); else open(); });
  input.addEventListener('input', function () { render(input.value); });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); moveCursor(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); moveCursor(-1); }
    else if (e.key === 'Enter') {
      var items = results.querySelectorAll('.navsearch__item');
      var pick = items[cursor >= 0 ? cursor : 0];
      if (pick) { e.preventDefault(); pick.click(); }
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) { close(); trigger.focus(); }
    // Scorciatoia "/" per aprire la ricerca, come su molti archivi.
    else if (e.key === '/' && !isOpen()) {
      var t = e.target.tagName;
      if (t === 'INPUT' || t === 'TEXTAREA' || e.target.isContentEditable) return;
      e.preventDefault();
      open();
    }
  });
  document.addEventListener('click', function (e) {
    if (!isOpen() || panel.contains(e.target) || trigger.contains(e.target)) return;
    close();
  });
})();
