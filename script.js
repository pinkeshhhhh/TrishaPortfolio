// Mark JS as active
document.documentElement.classList.add('js-on');

// ═══ HAMBURGER MENU ═══
(function() {
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  
  // Create overlay for mobile
  var overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  function toggleMenu() {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  }
  function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);
  // Close menu and navigate when clicking a nav link
  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var targetId = this.getAttribute('href');
      closeMenu();
      // Small delay so overflow:hidden is removed before scrolling
      setTimeout(function() {
        var target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  });
})();

// ═══ NAV COMPACT ON SCROLL ═══
var nav = document.getElementById('nav');
window.addEventListener('scroll', function() {
  nav.classList.toggle('compact', window.scrollY > 60);
}, { passive: true });

// ═══ ACTIVE NAV HIGHLIGHTING (#4) ═══
(function() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a[data-section]');

  function updateActive() {
    var scrollY = window.scrollY + 120;
    sections.forEach(function(sec) {
      var top = sec.offsetTop;
      var height = sec.offsetHeight;
      var id = sec.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === id) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();

// ═══ SCROLL REVEAL ═══
var io = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(function(el) { io.observe(el); });

// ═══ SCROLL TO TOP (#3) ═══
(function() {
  var btn = document.getElementById('scrollTop');
  window.addEventListener('scroll', function() {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ═══ TABS ═══
document.querySelectorAll('.tab-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('on'); });
    document.querySelectorAll('.tab-pane').forEach(function(p) { p.classList.remove('on'); });
    btn.classList.add('on');
    document.getElementById('pane-' + btn.dataset.pane).classList.add('on');
  });
});

// ═══ CONTACT FORM — Formspree ═══
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = this;
  var btn = document.getElementById('sendBtn');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  }).then(function(res) {
    if (res.ok) {
      btn.textContent = 'Message Sent ✦';
      btn.classList.add('sent');
      form.reset();
      setTimeout(function() { btn.textContent = 'Send Message'; btn.classList.remove('sent'); btn.disabled = false; }, 3500);
    } else {
      btn.textContent = 'Error — Try Again';
      btn.disabled = false;
      setTimeout(function() { btn.textContent = 'Send Message'; }, 3000);
    }
  }).catch(function() {
    btn.textContent = 'Error — Try Again';
    btn.disabled = false;
    setTimeout(function() { btn.textContent = 'Send Message'; }, 3000);
  });
});

// ═══ LIGHTBOX ═══
(function() {
  var overlay = document.getElementById('lightbox');
  var lbImg   = document.getElementById('lbImg');
  var lbWrap  = document.getElementById('lbWrap');
  var lbCap   = document.getElementById('lbCaption');
  var lbCtr   = document.getElementById('lbCounter');
  var items   = [];
  var cur     = 0;
  var zoom    = 1;
  var minZ    = 0.5, maxZ = 4, zStep = 0.35;

  document.querySelectorAll('.gfx-item').forEach(function(el, i) {
    items.push({
      src:   el.querySelector('img').src,
      title: el.querySelector('.gfx-title') ? el.querySelector('.gfx-title').textContent : '',
      type:  el.querySelector('.gfx-type')  ? el.querySelector('.gfx-type').textContent  : ''
    });
    el.addEventListener('click', function(e) {
      e.preventDefault();
      openLB(i);
    });
  });

  function openLB(i) {
    cur = i; zoom = 1;
    showSlide();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLB() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    zoom = 1;
    lbImg.style.transform = '';
  }
  function showSlide() {
    lbImg.src = items[cur].src;
    lbImg.alt = items[cur].title;
    lbCap.innerHTML = '<div class="gfx-title">' + items[cur].title + '</div>' +
                      '<div class="gfx-type">' + items[cur].type + '</div>';
    lbCtr.textContent = (cur + 1) + ' / ' + items.length;
    zoom = 1;
    lbImg.style.transform = 'scale(1)';
  }
  function goPrev() { cur = (cur - 1 + items.length) % items.length; showSlide(); }
  function goNext() { cur = (cur + 1) % items.length; showSlide(); }
  function zoomIn()  { zoom = Math.min(maxZ, zoom + zStep); lbImg.style.transform = 'scale(' + zoom + ')'; }
  function zoomOut() { zoom = Math.max(minZ, zoom - zStep); lbImg.style.transform = 'scale(' + zoom + ')'; }

  function downloadImg() {
    var a = document.createElement('a');
    a.href = items[cur].src;
    a.download = (items[cur].title || 'image') + '.jpg';
    a.target = '_blank';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  document.getElementById('lbClose').addEventListener('click', closeLB);
  document.getElementById('lbPrev').addEventListener('click', goPrev);
  document.getElementById('lbNext').addEventListener('click', goNext);
  document.getElementById('lbZoomIn').addEventListener('click', zoomIn);
  document.getElementById('lbZoomOut').addEventListener('click', zoomOut);
  document.getElementById('lbDownload').addEventListener('click', downloadImg);

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeLB();
  });

  document.addEventListener('keydown', function(e) {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLB();
    if (e.key === 'ArrowLeft')  goPrev();
    if (e.key === 'ArrowRight') goNext();
    if (e.key === '+' || e.key === '=') zoomIn();
    if (e.key === '-')          zoomOut();
  });

  overlay.addEventListener('wheel', function(e) {
    e.preventDefault();
    if (e.deltaY < 0) zoomIn(); else zoomOut();
  }, { passive: false });
})();
