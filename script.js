/* =========================================================
   Trisha Pandey — Portfolio v4
   GSAP + ScrollTrigger + Lenis (smooth scroll) + Matter.js (toolkit physics)
   ========================================================= */
(() => {
  'use strict';

  /* ---------------- DATA ---------------- */
  const IMG = 'images/web/';

  // Visual Archive — floating pieces (order = scroll order)
  const archive = [
    'cafe-poster', 'picsart-3', 'coffee-menu', 'fashion-instagram-post',
    'picsart-1', 'online-course-poster', 'picsart-8', 'kiara-advani-design',
    'picsart-5', 'science-event-poster', 'picsart-2', 'vlog-routine-thumbnail',
    'picsart-9', 'picsart-4', 'picsart-11', 'picsart-7'
  ];

  // Beyond the Visuals — tabs
  const work = {
    'Editorial Posters': [
      { img: 'picsart-1',  title: 'Extra — Editorial Cover',   cat: 'Poster Series' },
      { img: 'picsart-2',  title: 'Extra — Pink Edition',      cat: 'Poster Series' },
      { img: 'picsart-11', title: 'Extra — Rose Edition',      cat: 'Poster Series' },
      { img: 'picsart-3',  title: 'I Am My Own Enemy',         cat: 'Typographic Poster' },
      { img: 'picsart-4',  title: 'I Am My Own Enemy — Torn',  cat: 'Typographic Poster' },
      { img: 'picsart-6',  title: 'I Am My Own Enemy — Cream', cat: 'Typographic Poster' },
      { img: 'picsart-7',  title: 'Eyes Never Lie — Mono',     cat: 'Collage Poster' },
      { img: 'picsart-8',  title: 'Eyes Never Lie — Blush',    cat: 'Collage Poster' },
      { img: 'picsart-9',  title: 'Eyes Never Lie — Red',      cat: 'Collage Poster' }
    ],
    'Brand & Print': [
      { img: 'cafe-poster',          title: 'Café Opening Hours',  cat: 'Poster · Brand' },
      { img: 'coffee-menu',          title: 'Coffee Menu',         cat: 'Menu · Print' },
      { img: 'online-course-poster', title: 'Online Course Promo', cat: 'Poster · Education' },
      { img: 'science-event-poster', title: 'Welcome to 2026',     cat: 'Event Poster' }
    ],
    'Social & Thumbnails': [
      { img: 'fashion-instagram-post', title: 'Red Brave — Fashion Post', cat: 'Instagram · Fashion' },
      { img: 'kiara-advani-design',    title: 'Kiara Advani Tribute',     cat: 'Social Banner', wide: true },
      { img: 'vlog-routine-thumbnail', title: 'One Day Vlog',             cat: 'YouTube Thumbnail', wide: true },
      { img: 'picsart-10',             title: 'Eyes Never Lie — Sage',    cat: 'Instagram Post' },
      { img: 'picsart-5',              title: 'My Own Enemy — Mono',      cat: 'Instagram Post' }
    ]
  };

  // Reels — Instagram ids (opens embed)
  const reels = [
    { id: 'DT8LdexEqbJ', title: 'Mid-Form Celebrity Edit', desc: 'Social Media', img: 'https://i.pinimg.com/736x/35/8d/c1/358dc12cb6009f28cc2eef113c81168e.jpg' },
    { id: 'DQw01UbkrWm', title: 'Women in Love',          desc: 'Short Reel',   img: 'https://i.pinimg.com/736x/a3/6e/bc/a36ebc55fcbe8e88f00dd8a9fd1cbc94.jpg' },
    { id: 'DSbuHJHkhEJ', title: 'Kiara Advani Edit',      desc: 'Fan Edit',     img: 'https://i.pinimg.com/736x/c7/98/a6/c798a66e7d4765f2d700843aafee2286.jpg' },
    { id: 'DQraUbUkie3', title: 'Short-Form Content',     desc: 'Social Media', img: 'https://i.pinimg.com/736x/82/90/25/82902575d2b4c5d6a88a50fce2f772e4.jpg' }
  ];

  // Toolkit — polaroid cards. x/y/r = resting place used only when physics is unavailable
  const tools = [
    { name: 'Photoshop',       x: 16, y: 26, r: -24, logo: '<div class="tool-logo txt" style="background:#001E36;color:#31A8FF">Ps</div>' },
    { name: 'Premiere Pro',    x: 33, y: 64, r: 14,  logo: '<div class="tool-logo txt" style="background:#00005B;color:#9999FF">Pr</div>' },
    { name: 'DaVinci Resolve', x: 50, y: 22, r: -9,  logo: '<div class="tool-logo" style="background:#1b1b1b"><svg viewBox="0 0 100 100" width="72%"><ellipse cx="50" cy="32" rx="15" ry="22" fill="#F25C3B"/><ellipse cx="34" cy="62" rx="15" ry="22" transform="rotate(-60 34 62)" fill="#3FA9F5"/><ellipse cx="66" cy="62" rx="15" ry="22" transform="rotate(60 66 62)" fill="#F7C548"/></svg></div>' },
    { name: 'Adobe Express',   x: 66, y: 66, r: 22,  logo: '<div class="tool-logo txt" style="background:linear-gradient(135deg,#FF3C5A,#8B3DFF);color:#fff">Ex</div>' },
    { name: 'Figma',           x: 82, y: 28, r: -16, logo: '<div class="tool-logo" style="background:#fff"><svg viewBox="0 0 38 57" width="46%"><path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/><path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/><path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262"/><path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/><path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/></svg></div>' },
    { name: 'Canva',           x: 20, y: 76, r: 28,  logo: '<div class="tool-logo" style="background:#fff"><div style="width:82%;aspect-ratio:1;border-radius:50%;background:linear-gradient(135deg,#00C4CC,#7D2AE8);display:grid;place-items:center;color:#fff;font-family:var(--serif);font-style:italic;font-size:clamp(1.1rem,1.9vw,1.9rem)">Canva</div></div>' },
    { name: 'Picsart',         x: 84, y: 74, r: -30, logo: '<div class="tool-logo txt" style="background:linear-gradient(135deg,#FF2BB3,#7F3CFF);color:#fff">P</div>' }
  ];

  const folderSVG = '<svg viewBox="0 0 100 80"><defs><linearGradient id="fg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6CBBFF"/><stop offset="1" stop-color="#1E5BEF"/></linearGradient><linearGradient id="fb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2F78F5"/><stop offset="1" stop-color="#1546C9"/></linearGradient></defs><path d="M6 8h28l8 8h52a6 6 0 0 1 6 6v6H0V14a6 6 0 0 1 6-6z" fill="url(#fb)"/><rect x="0" y="22" width="100" height="58" rx="7" fill="url(#fg)"/></svg>';

  /* ---------------- HELPERS ---------------- */
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const MOBILE_Q = '(max-width: 768px)';
  const isMobile = () => window.matchMedia(MOBILE_Q).matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  // Animations always run (the OS "reduced motion" setting is intentionally ignored).
  // The static fallback below is only used if the animation libraries fail to load.
  const animate = hasGSAP;
  const body = document.body;

  const splitChars = el => {
    const t = el.textContent;
    el.innerHTML = [...t].map(c => `<span class="ch">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
    return $$('.ch', el);
  };
  // splits into word spans, keeping <em> accents styled
  const splitWords = el => {
    const out = [];
    const nodes = [...el.childNodes];
    el.textContent = '';
    nodes.forEach(n => {
      const isEm = n.nodeType === 1 && n.tagName === 'EM';
      n.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) { el.appendChild(document.createTextNode(' ')); return; }
        const s = document.createElement(isEm ? 'em' : 'span');
        s.className = 'w';
        s.textContent = part;
        el.appendChild(s);
        out.push(s);
      });
    });
    return out;
  };

  /* ---------------- BUILD: service rings ---------------- */
  $$('.ring').forEach(svg => {
    const g = $('.ring-lines', svg);
    const grad = g.getAttribute('stroke');
    let html = `<circle cx="100" cy="100" r="80" fill="${grad}"/>`;
    for (let r = 6; r <= 80; r += 4.2) html += `<circle cx="100" cy="100" r="${r}" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="1.1"/>`;
    for (let i = 0; i < 36; i++) {
      const a = (i / 36) * Math.PI * 2;
      html += `<circle cx="${100 + Math.cos(a) * 26}" cy="${100 + Math.sin(a) * 26}" r="52" fill="none" stroke="rgba(255,255,255,.22)" stroke-width=".8"/>`;
    }
    html += '<circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5"/>';
    g.removeAttribute('stroke');
    g.innerHTML = html;
  });

  /* ---------------- BUILD: archive ---------------- */
  const archiveLayer = $('#archiveLayer');
  let archiveItems = [];
  const layoutArchive = mob => {
    archiveLayer.innerHTML = '';
    archiveItems = [];
    const lanesD = [5, 27, 53, 75];
    const widthsD = [15, 13, 14, 16, 12, 14];
    archive.forEach((src, i) => {
      const el = document.createElement('figure');
      el.className = 'a-item';
      el.dataset.cursor = 'View';
      const wide = /kiara|vlog/.test(src);
      let left, width;
      if (mob) {
        left = i % 2 === 0 ? 4 : 52;
        width = wide ? 68 : 44;
        if (wide) left = 16;
      } else {
        left = lanesD[i % 4] + ((i * 7) % 5) - 2;
        width = wide ? 22 : widthsD[i % widthsD.length];
        if (wide && left > 70) left = 68;
      }
      const top = 4 + (i / archive.length) * 80 + (i % 3) * 1.5;   // % of section height
      el.style.left = left + '%';
      el.style.top = top + '%';
      el.style.width = width + 'vw';
      el.dataset.speed = mob ? (0.8 + ((i * 37) % 5) / 10).toFixed(2) : (0.6 + ((i * 37) % 9) / 10).toFixed(2);
      el.dataset.rot = (((i * 53) % 9) - 4) * 0.8;
      el.innerHTML = `<div class="a-item-in"><img src="${IMG + src}.webp" alt="Design by Trisha Pandey" fetchpriority="low" decoding="async"></div>`;
      el.addEventListener('click', () => openMedia(`<img src="${IMG + src}.webp" alt="">`));
      archiveLayer.appendChild(el);
      archiveItems.push(el);
    });
    const folders = mob ? [[80, 12], [6, 38], [84, 62], [10, 86]] : [[90, 10], [2, 30], [44, 46], [92, 58], [22, 72], [64, 88]];
    folders.forEach(([l, t], i) => {
      const f = document.createElement('div');
      f.className = 'a-folder';
      f.style.left = l + '%';
      f.style.top = t + '%';
      f.dataset.speed = (1.5 + (i % 3) * 0.25).toFixed(2);
      f.innerHTML = folderSVG;
      archiveLayer.appendChild(f);
      archiveItems.push(f);
    });
  };
  layoutArchive(isMobile());

  /* ---------------- BUILD: tools ---------------- */
  const toolWrap = $('#toolCards');
  const toolEls = tools.map(t => {
    const el = document.createElement('div');
    el.className = 'tool';
    el.innerHTML = t.logo + `<span class="tool-name">${t.name}</span>`;
    toolWrap.appendChild(el);
    return el;
  });
  const placeToolsStatic = () => {
    toolEls.forEach((el, i) => {
      const t = tools[i];
      el.style.left = t.x + '%';
      el.style.top = t.y + '%';
      el.style.transform = `translate(-50%,-50%) rotate(${t.r}deg)`;
    });
  };

  /* ---------------- BUILD: work tabs ---------------- */
  const tabsEl = $('#tabs');
  const tabPill = $('.tab-pill', tabsEl);
  const grid = $('#workGrid');
  const moveTabPill = () => {
    const a = $('.tab.active', tabsEl);
    if (!a) return;
    tabPill.style.width = a.offsetWidth + 'px';
    tabPill.style.transform = `translateX(${a.offsetLeft}px)`;
  };
  const renderGrid = (cat, anim) => {
    grid.innerHTML = work[cat].map(w => `
      <div class="w-card${w.wide ? ' wide' : ''}" data-cursor="View" data-src="${IMG + w.img}.webp">
        <img src="${IMG + w.img}.webp" alt="${w.title}" loading="lazy" decoding="async">
        <div class="w-meta"><small>${w.cat}</small><h3>${w.title}</h3></div>
      </div>`).join('');
    $$('.w-card', grid).forEach(c => c.addEventListener('click', () => openMedia(`<img src="${c.dataset.src}" alt="">`)));
    if (anim && hasGSAP) {
      gsap.fromTo($$('.w-card', grid), { y: 50, autoAlpha: 0, scale: .96 }, { y: 0, autoAlpha: 1, scale: 1, duration: .9, stagger: .05, ease: 'expo.out', onComplete: () => ScrollTrigger.refresh() });
    } else if (hasGSAP) ScrollTrigger.refresh();
  };
  Object.keys(work).forEach((cat, i) => {
    const b = document.createElement('button');
    b.className = 'tab' + (i === 0 ? ' active' : '');
    b.textContent = cat;
    b.setAttribute('role', 'tab');
    b.setAttribute('data-hover', '');
    b.addEventListener('click', () => {
      if (b.classList.contains('active')) return;
      $$('.tab', tabsEl).forEach(t => t.classList.remove('active'));
      b.classList.add('active');
      moveTabPill();
      b.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
      if (hasGSAP) gsap.to($$('.w-card', grid), { autoAlpha: 0, y: -20, duration: .3, stagger: .02, ease: 'power2.in', onComplete: () => renderGrid(cat, true) });
      else renderGrid(cat, false);
    });
    tabsEl.appendChild(b);
  });

  /* ---------------- BUILD: reels ---------------- */
  const reelsRow = $('#reelsRow');
  reels.forEach((r, i) => {
    const el = document.createElement('div');
    el.className = 'reel';
    el.dataset.cursor = 'Play';
    el.innerHTML = `<img src="${r.img}" alt="${r.title}" loading="lazy" decoding="async">
      <div class="play"><svg viewBox="0 0 20 20"><path d="M4 2l14 8-14 8z"/></svg></div>
      <div class="r-meta"><small>${String(i + 1).padStart(2, '0')} · ${r.desc}</small><h3>${r.title}</h3></div>`;
    el.addEventListener('click', () => openMedia(`<iframe src="https://www.instagram.com/p/${r.id}/embed/" allowtransparency="true" scrolling="no" title="${r.title}"></iframe>`));
    reelsRow.appendChild(el);
  });

  /* ---------------- MODALS + MENU ---------------- */
  const contactModal = $('#contactModal');
  const mediaModal = $('#mediaModal');
  const mediaContent = $('#mediaContent');
  const burger = $('#burger');
  let lenis = null;
  let locks = 0;
  const lock = on => {
    locks = Math.max(0, locks + (on ? 1 : -1));
    const locked = locks > 0;
    if (lenis) locked ? lenis.stop() : lenis.start();
    document.documentElement.style.overflow = locked ? 'hidden' : '';
  };
  function openMedia(html) { mediaContent.innerHTML = html; mediaModal.classList.add('open'); mediaModal.setAttribute('aria-hidden', 'false'); lock(true); }
  const closeMedia = () => {
    if (!mediaModal.classList.contains('open')) return;
    mediaModal.classList.remove('open'); mediaModal.setAttribute('aria-hidden', 'true'); lock(false);
    setTimeout(() => (mediaContent.innerHTML = ''), 450);
  };
  const openContact = () => {
    if (body.classList.contains('menu-open')) toggleMenu(false);
    contactModal.classList.add('open'); contactModal.setAttribute('aria-hidden', 'false'); lock(true);
    setTimeout(() => $('input', contactModal).focus({ preventScroll: true }), 500);
  };
  const closeContact = () => {
    if (!contactModal.classList.contains('open')) return;
    contactModal.classList.remove('open'); contactModal.setAttribute('aria-hidden', 'true'); lock(false);
  };
  function toggleMenu(force) {
    const open = typeof force === 'boolean' ? force : !body.classList.contains('menu-open');
    if (open === body.classList.contains('menu-open')) return;
    body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    $('#menu').setAttribute('aria-hidden', String(!open));
    lock(open);
  }
  burger.addEventListener('click', () => toggleMenu());
  $$('.open-contact').forEach(b => b.addEventListener('click', openContact));
  $('.modal-close', contactModal).addEventListener('click', closeContact);
  contactModal.addEventListener('click', e => { if (e.target === contactModal) closeContact(); });
  $('.modal-close', mediaModal).addEventListener('click', closeMedia);
  mediaModal.addEventListener('click', e => { if (e.target === mediaModal) closeMedia(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMedia(); closeContact(); toggleMenu(false); } });

  const form = $('#contactForm');
  const status = $('#formStatus');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    status.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error();
      status.textContent = 'Thank you! I\'ll get back to you soon ✦';
      form.reset();
    } catch {
      status.textContent = 'Something went wrong — please email trishapanday37@gmail.com';
    }
  });

  // in-page anchors (smooth via Lenis when available)
  const scrollToTarget = target => {
    if (lenis) lenis.scrollTo(target, { duration: 1.6, easing: t => 1 - Math.pow(1 - t, 4) });
    else target.scrollIntoView({ behavior: 'smooth' });
  };
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const t = $(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    if (body.classList.contains('menu-open')) { toggleMenu(false); setTimeout(() => scrollToTarget(t), 350); }
    else scrollToTarget(t);
  }));

  /* ---------------- CURSOR (event delegation) ---------------- */
  const cursor = $('.cursor');
  const cursorDot = $('.cursor-dot');
  const cursorLabel = $('.cursor-label');
  if (finePointer) {
    const HOVER = '[data-cursor], [data-hover], a, button, .tool';
    document.addEventListener('pointerover', e => {
      const t = e.target.closest(HOVER);
      const label = t && (t.dataset.cursor || (t.classList.contains('tool') && toolsPhysics ? 'Drag' : ''));
      body.classList.toggle('cursor-hover', !!t && !label);
      body.classList.toggle('cursor-label-on', !!label);
      if (label) cursorLabel.textContent = label;
    });
    document.addEventListener('pointerleave', () => body.classList.remove('cursor-hover', 'cursor-label-on'));
    if (hasGSAP) {
      const dx = gsap.quickTo(cursorDot, 'x', { duration: .1, ease: 'power3' }), dy = gsap.quickTo(cursorDot, 'y', { duration: .1, ease: 'power3' });
      const rx = gsap.quickTo(cursor, 'x', { duration: .5, ease: 'power3' }), ry = gsap.quickTo(cursor, 'y', { duration: .5, ease: 'power3' });
      window.addEventListener('pointermove', e => {
        if (e.pointerType !== 'mouse') return;
        body.classList.add('cursor-ready');
        dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      }, { passive: true });
    }
  }

  renderGrid(Object.keys(work)[0], false);
  requestAnimationFrame(moveTabPill);

  /* ---------------- TOOLKIT PHYSICS ---------------- */
  let toolsPhysics = null;
  const initPhysics = () => {
    if (typeof window.Matter === 'undefined') return null;
    const { Engine, Bodies, Body, Composite, Mouse, MouseConstraint } = Matter;
    const box = toolWrap;
    let W = box.clientWidth, H = box.clientHeight;
    const engine = Engine.create({ gravity: { x: 0, y: 1.1 } });
    const wallOpts = { isStatic: true, render: { visible: false } };
    const FLOOR = 14; // keep a little breathing room under the pile
    const ground = Bodies.rectangle(W / 2, H + 60 - FLOOR, 6000, 120, wallOpts);
    const left = Bodies.rectangle(-60, H / 2 - 1000, 120, H + 4000, wallOpts);
    const right = Bodies.rectangle(W + 60, H / 2 - 1000, 120, H + 4000, wallOpts);
    Composite.add(engine.world, [ground, left, right]);

    const items = toolEls.map((el, i) => {
      el.style.left = '0'; el.style.top = '0';
      const w = el.offsetWidth, h = el.offsetHeight;
      return { el, w, h, body: null, i };
    });

    let mc = null;
    if (finePointer) {
      const mouse = Mouse.create(box);
      ['wheel', 'mousewheel', 'DOMMouseScroll'].forEach(ev => mouse.element.removeEventListener(ev, mouse.mousewheel));
      ['touchmove'].forEach(ev => mouse.element.removeEventListener(ev, mouse.mousemove));
      ['touchstart'].forEach(ev => mouse.element.removeEventListener(ev, mouse.mousedown));
      ['touchend'].forEach(ev => mouse.element.removeEventListener(ev, mouse.mouseup));
      mc = MouseConstraint.create(engine, { mouse, constraint: { stiffness: .18, damping: .12, render: { visible: false } } });
      Composite.add(engine.world, mc);
      window.addEventListener('mouseup', e => mouse.mouseup(e));
      toolEls.forEach(el => el.classList.add('grab'));
    }

    let dropped = false;
    const drop = () => {
      if (dropped) return;
      dropped = true;
      const n = items.length;
      items.forEach((it, i) => {
        // spawn in the middle band so cards land on each other and pile up
        const x = W * (isMobile() ? .2 : .26) + ((i + 0.5) / n) * W * (isMobile() ? .6 : .48) + gsap.utils.random(-24, 24);
        const y = -it.h - i * (isMobile() ? 110 : 140) - gsap.utils.random(0, 80);
        it.body = Bodies.rectangle(x, y, it.w, it.h, {
          chamfer: { radius: 8 }, restitution: .32, friction: .55, frictionAir: .012, density: .0018,
          angle: gsap.utils.random(-.7, .7)
        });
        Body.setAngularVelocity(it.body, gsap.utils.random(-.06, .06));
        Composite.add(engine.world, it.body);
      });
    };

    const sync = () => {
      items.forEach(it => {
        if (!it.body) return;
        const { x, y } = it.body.position;
        it.el.style.transform = `translate3d(${(x - it.w / 2).toFixed(1)}px, ${(y - it.h / 2).toFixed(1)}px, 0) rotate(${it.body.angle.toFixed(4)}rad)`;
      });
    };

    let running = false;
    const tick = (time, delta) => {
      if (!running || !dropped) return;
      Engine.update(engine, Math.min(delta, 32));
      sync();
    };
    gsap.ticker.add(tick);

    const resize = () => {
      const nW = box.clientWidth, nH = box.clientHeight;
      if (nW === W && nH === H) return;
      W = nW; H = nH;
      Body.setPosition(ground, { x: W / 2, y: H + 60 - FLOOR });
      Body.setPosition(right, { x: W + 60, y: H / 2 - 1000 });
      Body.setPosition(left, { x: -60, y: H / 2 - 1000 });
      items.forEach(it => {
        if (!it.body) return;
        const p = it.body.position;
        Body.setPosition(it.body, { x: Math.min(Math.max(p.x, it.w / 2), W - it.w / 2), y: Math.min(p.y, H - it.h) });
      });
    };

    return { drop, resize, setRunning: v => { running = v; } };
  };

  /* ---------------- NO-ANIMATION FALLBACK ---------------- */
  const loader = $('#loader');
  if (!animate) {
    loader.remove();
    body.classList.remove('is-loading');
    placeToolsStatic();
    // keep the cursor readable over dark sections
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => entries.forEach(en => {
        if (en.isIntersecting) body.classList.toggle('on-dark', en.target.dataset.bg.toLowerCase() === '#0e0b09');
      }), { rootMargin: '-50% 0px -50% 0px' });
      $$('section[data-bg]').forEach(s => io.observe(s));
    }
    return;
  }
  document.documentElement.classList.add('bg-anim');

  /* =========================================================
     ANIMATIONS
     ========================================================= */
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsap.defaults({ ease: 'expo.out' });

  // Entrance helper: always an explicit fromTo() (never from()), so a resize/refresh
  // before the reveal plays can't re-record the hidden state as the end state.
  const REST = { x: 0, y: 0, xPercent: 0, yPercent: 0, rotation: 0, scale: 1, autoAlpha: 1, opacity: 1 };
  const reveal = (targets, from, vars = {}) => {
    const to = { ...vars };
    Object.keys(from).forEach(k => { if (k in REST) to[k] = REST[k]; });
    return gsap.fromTo(targets, from, to);
  };

  // Smooth scroll (wheel only — touch keeps native momentum)
  if (typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: .085, smoothWheel: true, wheelMultiplier: .95 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }

  /* ---------- background colour follows the section in view ---------- */
  const DARK = '#0e0b09';
  const setBg = c => {
    gsap.to(body, { backgroundColor: c, duration: .8, ease: 'power2.out', overwrite: 'auto' });
    body.classList.toggle('on-dark', c.toLowerCase() === DARK);
  };
  $$('section[data-bg]').forEach(sec => {
    ScrollTrigger.create({
      trigger: sec, start: 'top 55%', end: 'bottom 55%',
      onEnter: () => setBg(sec.dataset.bg), onEnterBack: () => setBg(sec.dataset.bg)
    });
  });

  /* ---------- nav: active pill + hide on scroll down ---------- */
  const nav = $('#nav');
  const navPill = $('.nav-pill');
  const setActive = key => {
    const link = $(`.nav-link[data-nav="${key}"]`);
    $$('.nav-link').forEach(l => l.classList.toggle('active', l === link));
    if (!link) { navPill.style.opacity = '0'; return; }
    navPill.style.opacity = '1';
    navPill.style.width = link.offsetWidth + 'px';
    navPill.style.transform = `translateX(${link.offsetLeft}px)`;
  };
  $$('[data-nav]', $('main')).forEach(sec => {
    ScrollTrigger.create({ trigger: sec, start: 'top 50%', end: 'bottom 50%', onToggle: self => self.isActive && setActive(sec.dataset.nav) });
  });
  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: self => {
      const y = self.scroll();
      nav.classList.toggle('hide', self.direction === 1 && y > 300 && !body.classList.contains('menu-open'));
    }
  });

  /* ---------- HERO intro timeline (plays after loader) ---------- */
  const nameChars = splitChars($('.hn-inner'));
  // explicit set() + to() (not from()) so a resize before playback can't corrupt the end state
  gsap.set(nameChars, { yPercent: 115 });
  gsap.set('.hero-img', { y: 160, scale: .94, autoAlpha: 0 });
  gsap.set('.hero-glow', { scale: .3, autoAlpha: 0 });
  gsap.set('.spark', { scale: 0, rotation: -140 });
  gsap.set('.hero-intro > *', { y: 40, autoAlpha: 0 });
  gsap.set('.badge-in', { scale: 0, rotation: -120 });
  gsap.set('.hero-scroll', { autoAlpha: 0, x: -20 });
  const heroTl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
  heroTl
    .to(nameChars, { yPercent: 0, duration: 1.6, stagger: 0.06 }, 0)
    .to('.hero-img', { y: 0, scale: 1, autoAlpha: 1, duration: 1.8 }, 0.15)
    .to('.hero-glow', { scale: 1, autoAlpha: 1, duration: 2 }, 0.2)
    .to('.spark', { scale: 1, rotation: 0, duration: 1.4, stagger: 0.07, ease: 'back.out(2)' }, 0.55)
    .to('.hero-intro > *', { y: 0, autoAlpha: 1, duration: 1.3, stagger: 0.09 }, 0.65)
    .to('.badge-in', { scale: 1, rotation: 0, duration: 1.4, ease: 'back.out(1.6)' }, 0.8)
    .to('.hero-scroll', { autoAlpha: 1, x: 0, duration: 1 }, 1);

  // gentle floating sparkles (start once the entrance has finished)
  heroTl.eventCallback('onComplete', () => {
    $$('.spark').forEach((s, i) => {
      gsap.to(s, { y: gsap.utils.random(-18, 18), rotation: gsap.utils.random(-30, 30), duration: gsap.utils.random(2.8, 4.4), yoyo: true, repeat: -1, ease: 'sine.inOut', delay: i * 0.12 });
    });
  });

  // mouse parallax in hero (desktop)
  if (finePointer) {
    const sparkMovers = $$('.spark').map((s, i) => ({ fn: gsap.quickTo(s, 'x', { duration: 1.2, ease: 'power3' }), depth: (i % 3 + 1) * 12 }));
    const nameX = gsap.quickTo('.hn-inner', 'x', { duration: 1.6, ease: 'power3' });
    const imgX = gsap.quickTo('.hero-img', 'x', { duration: 1.6, ease: 'power3' });
    const hero = $('.hero');
    hero.addEventListener('pointermove', e => {
      const p = e.clientX / window.innerWidth - 0.5;
      sparkMovers.forEach(m => m.fn(p * m.depth * 2));
      nameX(p * -40);
      imgX(p * 14);
    });
  }

  // hero on scroll
  const heroST = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true };
  gsap.to('.hero-name', { yPercent: 40, ease: 'none', scrollTrigger: heroST });
  gsap.to('.hero-figure .hero-img, .hero-glow', { yPercent: -8, ease: 'none', scrollTrigger: heroST });
  gsap.to('.hero-intro', { y: -100, autoAlpha: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: '15% top', end: '70% top', scrub: true } });
  ScrollTrigger.create({ trigger: '.hero', start: '8% top', onToggle: self => $('.hero-scroll').classList.toggle('gone', self.isActive) });
  gsap.to('.hero-badge', { rotation: 220, y: -60, ease: 'none', scrollTrigger: heroST });

  /* ---------- RIBBON marquee: speeds up with scroll velocity ---------- */
  const track = $('.ribbon-track');
  track.innerHTML += track.innerHTML;
  const ribbonTween = gsap.to(track, { xPercent: -50, ease: 'none', duration: 26, repeat: -1 });
  let ribbonReset;
  ScrollTrigger.create({
    trigger: '.ribbon', start: 'top bottom', end: 'bottom top',
    onUpdate: self => {
      const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 350, 5);
      gsap.to(ribbonTween, { timeScale: boost, duration: .25, overwrite: true });
      clearTimeout(ribbonReset);
      ribbonReset = setTimeout(() => gsap.to(ribbonTween, { timeScale: 1, duration: 1.2, ease: 'power2.out', overwrite: true }), 120);
    }
  });
  gsap.fromTo('.ribbon', { rotation: -4 }, { rotation: 0, ease: 'none', scrollTrigger: { trigger: '.ribbon', start: 'top bottom', end: 'bottom top', scrub: true } });

  /* ---------- INTRO: words light up as you read ---------- */
  const introWords = splitWords($('.intro-text'));
  gsap.fromTo(introWords, { opacity: .12 }, {
    opacity: 1, ease: 'none', stagger: .05,
    scrollTrigger: { trigger: '.intro-text', start: 'top 82%', end: 'bottom 52%', scrub: .6 }
  });
  reveal('.intro .eyebrow', { y: 20, autoAlpha: 0 }, { duration: 1, scrollTrigger: { trigger: '.intro', start: 'top 80%' } });
  reveal('.intro .btn', { y: 30, autoAlpha: 0 }, { duration: 1.1, scrollTrigger: { trigger: '.intro .btn', start: 'top 94%' } });

  /* ---------- line reveals (titles) ---------- */
  $$('.services-title, .cta-title').forEach(t => {
    reveal($$('.line > span', t), { yPercent: 110, rotation: 3 }, { duration: 1.4, stagger: .1, scrollTrigger: { trigger: t, start: 'top 85%' } });
  });

  /* ---------- SERVICES: rings spin, hover tilt ---------- */
  const ringTweens = $$('.ring').map((r, i) => gsap.to(r, { rotation: i % 2 ? -360 : 360, duration: 48, ease: 'none', repeat: -1, transformOrigin: '50% 50%' }));
  if (finePointer) {
    $$('.card').forEach((card, i) => {
      const inner = $('.card-inner', card);
      gsap.set(inner, { transformPerspective: 900 });
      const rx = gsap.quickTo(inner, 'rotationX', { duration: .6, ease: 'power3' });
      const ry = gsap.quickTo(inner, 'rotationY', { duration: .6, ease: 'power3' });
      card.addEventListener('pointerenter', () => {
        gsap.to(inner, { y: -22, scale: 1.04, duration: .7, ease: 'expo.out', overwrite: 'auto' });
        gsap.to(ringTweens[i], { timeScale: 7, duration: .8, ease: 'power2.out' });
      });
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - .5) * 16);
        rx(-((e.clientY - r.top) / r.height - .5) * 12);
      });
      card.addEventListener('pointerleave', () => {
        gsap.to(inner, { y: 0, scale: 1, duration: .9, ease: 'expo.out', overwrite: 'auto' });
        rx(0); ry(0);
        gsap.to(ringTweens[i], { timeScale: 1, duration: 1.2, ease: 'power2.out' });
      });
    });
  }

  /* ---------- breakpoint-specific scroll choreography ---------- */
  const mm = gsap.matchMedia();
  let firstLayout = true;

  mm.add({ mob: MOBILE_Q, desk: '(min-width: 769px)' }, ctx => {
    const { mob } = ctx.conditions;

    // services: fanned cards settle as you scroll
    const cards = $$('.card');
    const startRot = mob ? [-8, 8, -6, 6] : [-16, -6, 7, 16];
    const endRot = mob ? [-2.5, 2, -1.5, 2.5] : [-4, -1.5, 2, 4.5];
    const startY = mob ? [120, 160, 200, 240] : [280, 340, 310, 390];
    const endY = mob ? [0, 10, 0, 10] : [8, -6, 4, -10];
    cards.forEach((c, i) => {
      gsap.fromTo(c,
        { y: startY[i], rotation: startRot[i], x: mob ? 0 : (i - 1.5) * -50 },
        { y: endY[i], rotation: endRot[i], x: 0, ease: 'none',
          scrollTrigger: { trigger: '.cards', start: 'top bottom', end: mob ? 'top 35%' : 'top 30%', scrub: 1.2 } });
    });

    // archive: rebuild layout for this breakpoint (first run already built)
    if (!firstLayout) layoutArchive(mob);
    firstLayout = false;
    const aTl = gsap.timeline({ scrollTrigger: { trigger: '.archive', start: 'top bottom', end: 'bottom top', scrub: .9, invalidateOnRefresh: true } });
    archiveItems.forEach(el => {
      const sp = parseFloat(el.dataset.speed);
      // every piece starts pushed down and ends pushed up, so nothing drifts into the section above
      aTl.fromTo(el, { y: () => sp * window.innerHeight * .45 }, { y: () => -sp * window.innerHeight * .45, ease: 'none', duration: 1 }, 0);
    });
    const inners = $$('.a-item-in');
    gsap.set(inners, { scale: .7, autoAlpha: 0, rotation: (i, el) => parseFloat(el.parentNode.dataset.rot) * 2.5 });
    const batch = ScrollTrigger.batch(inners, {
      start: 'top 95%',
      onEnter: b => gsap.to(b, { scale: 1, autoAlpha: 1, rotation: (i, el) => parseFloat(el.parentNode.dataset.rot), duration: 1.2, stagger: .08, ease: 'expo.out', overwrite: true })
    });
    gsap.fromTo('.archive-title', { scale: .8 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.archive', start: 'top bottom', end: 'top top', scrub: true } });
    gsap.to('.archive-title', { scale: .9, autoAlpha: .4, ease: 'none', scrollTrigger: { trigger: '.archive', start: 'bottom 120%', end: 'bottom top', scrub: true } });

    // beyond: giant title slides sideways
    const bt = $('.beyond-title');
    gsap.fromTo(bt,
      { x: () => window.innerWidth * .5 },
      { x: () => -(bt.scrollWidth - window.innerWidth * .94), ease: 'none',
        scrollTrigger: { trigger: '.beyond', start: 'top bottom', end: mob ? 'top -10%' : 'top -40%', scrub: .8, invalidateOnRefresh: true } });

    // reels
    if (mob) {
      reveal('.reel', { x: 120, autoAlpha: 0 }, { duration: 1.2, stagger: .1, scrollTrigger: { trigger: '.reels', start: 'top 88%' } });
    } else {
      reveal('.reel', { y: 200, autoAlpha: 0, rotation: i => [-8, 5, -4, 8][i % 4] }, { duration: 1.4, stagger: .14, scrollTrigger: { trigger: '.reels', start: 'top 92%' } });
    }

    return () => { batch.forEach(b => b.kill()); gsap.set(inners, { clearProps: 'all' }); };
  });

  /* ---------- TOOLKIT ---------- */
  toolsPhysics = initPhysics();
  if (toolsPhysics) {
    ScrollTrigger.create({ trigger: '.toolkit', start: 'top 70%', once: true, onEnter: () => toolsPhysics.drop() });
    ScrollTrigger.create({ trigger: '.toolkit', start: 'top bottom', end: 'bottom top', onToggle: self => toolsPhysics.setRunning(self.isActive) });
  } else {
    placeToolsStatic();
    toolEls.forEach((el, i) => gsap.fromTo(el,
      { xPercent: -50, yPercent: -50, y: () => -window.innerHeight, rotation: tools[i].r + (i % 2 ? 160 : -160) },
      { xPercent: -50, yPercent: -50, y: 0, rotation: tools[i].r, duration: 1.6, delay: i * .1, ease: 'bounce.out', scrollTrigger: { trigger: '.toolkit', start: 'top 60%' } }));
  }
  reveal('.toolkit-title', { yPercent: 40, autoAlpha: 0 }, { duration: 1.4, scrollTrigger: { trigger: '.toolkit', start: 'top 70%' } });

  /* ---------- BEYOND ---------- */
  reveal('.tabs', { y: 30, autoAlpha: 0 }, { duration: 1, scrollTrigger: { trigger: '.tabs', start: 'top 92%' } });
  reveal('.work-grid .w-card', { y: 90, autoAlpha: 0 }, { duration: 1.2, stagger: .07, scrollTrigger: { trigger: '.work-grid', start: 'top 88%' } });

  /* ---------- VIDEO EDITING: letters assemble ---------- */
  const vChars = splitChars($('#videoTitle'));
  vChars.forEach(ch => {
    gsap.fromTo(ch,
      { yPercent: gsap.utils.random(-60, 60), xPercent: gsap.utils.random(-50, 50), rotation: gsap.utils.random(-30, 30), scale: gsap.utils.random(.6, 1.4), opacity: .1 },
      { yPercent: 0, xPercent: 0, rotation: 0, scale: 1, opacity: 1, ease: 'none',
        scrollTrigger: { trigger: '.video', start: 'top 95%', end: 'top 30%', scrub: 1 } });
  });
  $$('.spec').forEach((s, i) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.specialties', start: 'top 88%' }, delay: i * .1 });
    tl.fromTo(s, { '--line': 0 }, { '--line': 1, duration: 1.4, ease: 'expo.inOut' })
      .fromTo(s.children, { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: .06 }, .25);
  });
  reveal('.ig-line', { y: 20, autoAlpha: 0 }, { duration: 1, scrollTrigger: { trigger: '.ig-line', start: 'top 95%' } });

  /* ---------- CTA ---------- */
  reveal('.cta-sub, .cta .btn', { y: 40, autoAlpha: 0 }, { duration: 1.2, stagger: .12, scrollTrigger: { trigger: '.cta-sub', start: 'top 90%' } });
  $$('.cta-spark').forEach((s, i) => {
    gsap.to(s, { rotation: i % 2 ? -360 : 360, duration: 14 + i * 4, ease: 'none', repeat: -1 });
    gsap.fromTo(s, { y: 80 * (i + 1) }, { y: -60 * (i + 1), ease: 'none', scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* ---------- FOOTER ---------- */
  const fChars = splitChars($('#footerGiant'));
  reveal(fChars, { yPercent: 100 }, { ease: 'none', stagger: .06, scrollTrigger: { trigger: '.footer', start: 'top 85%', end: 'bottom bottom', scrub: .8 } });
  reveal('.footer-top > *', { y: 50, autoAlpha: 0 }, { duration: 1.2, stagger: .1, scrollTrigger: { trigger: '.footer', start: 'top 80%' } });

  /* ---------- magnetic buttons (desktop) ---------- */
  if (finePointer) {
    $$('.btn, .nav-cta').forEach(b => {
      const strength = b.classList.contains('btn-lg') ? .4 : .28;
      const mx = gsap.quickTo(b, 'x', { duration: .6, ease: 'power3' }), my = gsap.quickTo(b, 'y', { duration: .6, ease: 'power3' });
      b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); mx((e.clientX - r.left - r.width / 2) * strength); my((e.clientY - r.top - r.height / 2) * strength * 1.3); });
      b.addEventListener('pointerleave', () => { mx(0); my(0); });
    });
  }

  /* ---------- LOADER → hero ---------- */
  const loaderNum = $('#loaderNum');
  const heroImg = $('.hero-img');
  const ready = Promise.race([
    Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      heroImg.complete ? Promise.resolve() : new Promise(r => { heroImg.onload = heroImg.onerror = r; })
    ]),
    new Promise(r => setTimeout(r, 3000))
  ]);
  gsap.set(loader, { clipPath: 'inset(0% 0% 0% 0%)' });
  reveal('.loader-inner > *', { yPercent: 120 }, { duration: 1, stagger: .08 });
  const counter = { v: 0 };
  const countTween = gsap.to(counter, { v: 100, duration: 1.3, ease: 'power2.inOut', onUpdate: () => (loaderNum.textContent = Math.round(counter.v)) });
  Promise.all([ready, countTween.then()]).then(() => {
    const out = gsap.timeline({
      onComplete: () => {
        loader.remove();
        body.classList.remove('is-loading');
        if (lenis) lenis.start();
        ScrollTrigger.refresh();
      }
    });
    out.to('.loader-inner, .loader-count', { yPercent: -60, autoAlpha: 0, duration: .6, ease: 'power3.in' })
      .to(loader, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'expo.inOut' }, .3)
      .add(() => heroTl.play(), .75);
  });

  /* ---------- resize handling ---------- */
  let rT;
  window.addEventListener('resize', () => {
    clearTimeout(rT);
    rT = setTimeout(() => {
      moveTabPill();
      const a = $('.nav-link.active');
      if (a) setActive(a.dataset.nav);
      if (toolsPhysics) toolsPhysics.resize();
    }, 150);
  });
  window.addEventListener('load', () => { ScrollTrigger.refresh(); moveTabPill(); });
  if (document.fonts) document.fonts.ready.then(() => {
    moveTabPill();
    const a = $('.nav-link.active');
    if (a) setActive(a.dataset.nav);
    ScrollTrigger.refresh();
  });
})();
