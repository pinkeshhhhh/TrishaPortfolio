document.addEventListener('DOMContentLoaded', () => {

  // -----------------------------
  // 0. DYNAMIC DARK SKY STARS GENERATOR
  // -----------------------------
  const starsContainer = document.getElementById('starsContainer');
  if (starsContainer) {
    const isMobileDevice = window.innerWidth <= 768 || 'ontouchstart' in window;
    const starCount = isMobileDevice ? 18 : 50;
    const frag = document.createDocumentFragment();
    
    for (let i = 0; i < starCount; i++) {
      const topPct = (Math.random() * 100).toFixed(2);
      const leftPct = (Math.random() * 100).toFixed(2);
      const size = (Math.random() * 3 + 1.5).toFixed(1);
      const duration = (Math.random() * 4 + 2).toFixed(1);
      const delay = (Math.random() * 5).toFixed(1);
      
      const isSparkle = !isMobileDevice && Math.random() > 0.72;
      
      if (isSparkle) {
        const sparkle = document.createElement('div');
        sparkle.className = 'bg-star-sparkle';
        sparkle.style.cssText = `top:${topPct}%;left:${leftPct}%;animation-duration:${parseFloat(duration)+2}s;animation-delay:${delay}s`;
        const svgSize = Math.floor(parseFloat(size) * 4);
        sparkle.innerHTML = `<svg width="${svgSize}" height="${svgSize}" viewBox="0 0 20 20" fill="currentColor"><path d="M10 0C10.5 5.2 14.8 9.5 20 10C14.8 10.5 10.5 14.8 10 20C9.5 14.8 5.2 10.5 0 10C5.2 9.5 9.5 5.2 10 0Z"/></svg>`;
        frag.appendChild(sparkle);
      } else {
        const star = document.createElement('div');
        star.className = 'bg-star';
        star.style.cssText = `top:${topPct}%;left:${leftPct}%;width:${size}px;height:${size}px;animation-duration:${duration}s;animation-delay:${delay}s`;
        frag.appendChild(star);
      }
    }
    starsContainer.appendChild(frag);
  }

  // -----------------------------
  // 1. LOADER
  // -----------------------------
  const loader = document.getElementById('loader');
  const loaderLogo = document.querySelector('.loader-logo');
  
  if (loader && loaderLogo) {
    setTimeout(() => {
      loaderLogo.style.opacity = '1';
    }, 50);
    
    setTimeout(() => {
      loader.classList.add('loader-fade-up');
    }, 1200);
    
    setTimeout(() => {
      loader.classList.add('loader-slide-up');
    }, 1400);
    
    setTimeout(() => {
      loader.remove();
      document.querySelectorAll('#hero .reveal').forEach(el => {
        el.classList.add('active');
      });
    }, 1800);
  }

  // -----------------------------
  // 2. CUSTOM CURSOR & STAR TRAIL (Desktop only — skip on touch devices)
  // -----------------------------
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const cursorRing = document.querySelector('.cursor-ring');
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorStarTrail = document.getElementById('cursorStarTrail');
  
  if (cursorRing && cursorDot && !isTouchDevice) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let lastStarX = 0;
    let lastStarY = 0;
    let lastStarTime = 0;

    const starColors = ['#E8C06A', '#E6B0B8', '#FFFFFF', '#F5C6CB', '#D49E35'];

    const spawnCursorStar = (x, y) => {
      if (!cursorStarTrail) return;
      const star = document.createElement('div');
      star.className = 'cursor-star-particle';
      
      const size = Math.floor(Math.random() * 8 + 8); // 8px to 16px
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      const dx = (Math.random() * 30 - 15).toFixed(1) + 'px';
      const dy = (Math.random() * 20 - 10).toFixed(1) + 'px';
      const rot = (Math.random() * 90 - 45).toFixed(1) + 'deg';
      
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.color = color;
      star.style.setProperty('--dx', dx);
      star.style.setProperty('--dy', dy);
      star.style.setProperty('--rot', rot);
      
      star.innerHTML = `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C12.5 6.5 17.5 11.5 24 12C17.5 12.5 12.5 17.5 12 24C11.5 17.5 6.5 12.5 0 12C6.5 11.5 11.5 6.5 12 0Z"/>
        </svg>
      `;
      
      cursorStarTrail.appendChild(star);
      setTimeout(() => star.remove(), 700);
    };

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
      
      // Spawn star particle on cursor movement if distance or time threshold reached
      const now = performance.now();
      const dist = Math.hypot(mouseX - lastStarX, mouseY - lastStarY);
      if (dist > 16 && now - lastStarTime > 30) {
        spawnCursorStar(mouseX, mouseY);
        lastStarX = mouseX;
        lastStarY = mouseY;
        lastStarTime = now;
      }
    });

    const renderCursor = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;
      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    document.querySelectorAll('[data-cursor="grow"]').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
    });
    
    document.querySelectorAll('a:not([data-cursor="grow"]), button:not([data-cursor="grow"])').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-link'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-link'));
    });
  } else {
    if (cursorRing) cursorRing.style.display = 'none';
    if (cursorDot) cursorDot.style.display = 'none';
    if (cursorStarTrail) cursorStarTrail.style.display = 'none';
  }

  // -----------------------------
  // 3. NAV & MOBILE MENU
  // -----------------------------
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active Link Tracking
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.desktop-nav a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => {
    if (section.id) navObserver.observe(section);
  });

  // -----------------------------
  // 4. SCROLL REVEAL
  // -----------------------------
  const revealElements = document.querySelectorAll('.reveal:not(#hero .reveal)');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

  revealElements.forEach(el => revealObserver.observe(el));

  // -----------------------------
  // 5. FEATURED WORK CAROUSEL
  // (Empty state ready for new items to be dropped in)
  // -----------------------------
  const workItems = [
    { title: 'Online Course Poster', category: 'Poster Design · Education', img: 'images/online-course-poster.png' },
    { title: 'Vlog YouTube Thumbnail', category: 'Thumbnail · Content', img: 'images/vlog-routine-thumbnail.jpg' },
    { title: 'Café Open Hours Poster', category: 'Poster Design · Brand', img: 'images/cafe-poster.jpg' },
    { title: 'Coffee Menu Design', category: 'Menu Design · Print', img: 'images/coffee-menu.jpg' },
    { title: 'Kiara Advani Fan Edit', category: 'Celebrity Design · Visual', img: 'images/kiara-advani-design.png' },
    { title: 'Science Event Poster', category: 'Poster Design · Education', img: 'images/science-event-poster.png' },
    { title: 'Fashion Instagram Post', category: 'Social Media · Fashion', img: 'images/fashion-instagram-post.jpg' },
    { title: 'Creative Digital Art 1', category: 'Digital Art · Visual Edit', img: 'images/picsart-1.png' },
    { title: 'Creative Digital Art 2', category: 'Digital Art · Visual Edit', img: 'images/picsart-2.png' },
    { title: 'Creative Digital Art 3', category: 'Digital Art · Visual Edit', img: 'images/picsart-3.png' },
    { title: 'Creative Digital Art 4', category: 'Digital Art · Visual Edit', img: 'images/picsart-4.png' },
    { title: 'Creative Digital Art 5', category: 'Digital Art · Visual Edit', img: 'images/picsart-5.png' },
    { title: 'Creative Digital Art 6', category: 'Digital Art · Visual Edit', img: 'images/picsart-6.png' },
    { title: 'Creative Digital Art 7', category: 'Digital Art · Visual Edit', img: 'images/picsart-7.jpg' },
    { title: 'Creative Digital Art 8', category: 'Digital Art · Visual Edit', img: 'images/picsart-8.jpg' },
    { title: 'Creative Digital Art 9', category: 'Digital Art · Visual Edit', img: 'images/picsart-9.jpg' },
    { title: 'Creative Digital Art 10', category: 'Digital Art · Visual Edit', img: 'images/picsart-10.jpg' },
    { title: 'Creative Digital Art 11', category: 'Digital Art · Visual Edit', img: 'images/picsart-11.png' }
  ];

  const stackContainer = document.querySelector('.stack-container');
  const workSection = document.getElementById('work');
  const counterEl = document.querySelector('.card-counter');
  let currentCardIndex = 0;
  let domCards = [];
  const hintEl = document.querySelector('.swipe-hint');

  const buildStack = () => {
    if (!stackContainer) return;
    stackContainer.innerHTML = '';
    domCards = [];
    currentCardIndex = 0;
    
    // Build empty state
    const emptyState = document.createElement('div');
    emptyState.className = 'stack-empty-state active';
    
    if (workItems.length === 0) {
      emptyState.innerHTML = `
        <div class="empty-sparkle">✦</div>
        <h3>New Projects Loading</h3>
        <p class="empty-desc">Curating fresh graphic design and video editing showcases. New work will be featured here soon!</p>
        <a href="#contact" class="cta-button" data-cursor="grow">Get in Touch</a>
      `;
      stackContainer.appendChild(emptyState);
      if (counterEl) counterEl.textContent = '00 / 00';
      if (hintEl) hintEl.style.display = 'none';
      return;
    }

    // When items are populated:
    if (hintEl) hintEl.style.display = 'block';
    emptyState.classList.remove('active');
    emptyState.innerHTML = `
      <h3>You've seen it all 🎉</h3>
      <button class="cta-button" id="reshuffle-btn" data-cursor="grow">Shuffle & Restart</button>
    `;
    stackContainer.appendChild(emptyState);

    const reshuffleBtn = document.getElementById('reshuffle-btn');
    if (reshuffleBtn) {
      reshuffleBtn.addEventListener('click', () => {
        emptyState.classList.remove('active');
        buildStack();
      });
    }

    for (let i = workItems.length - 1; i >= 0; i--) {
      const item = workItems[i];
      const numStr = (i + 1).toString().padStart(2, '0');
      
      const card = document.createElement('div');
      card.className = 'work-card';
      card.innerHTML = `
        <img src="${item.img}" alt="${item.title}" loading="lazy" decoding="async">
        <div class="work-card-overlay">
          <div class="work-meta">
            <span class="work-num">${numStr}</span>
            <span class="work-cat">${item.category}</span>
          </div>
          <h3>${item.title}</h3>
        </div>
      `;
      stackContainer.appendChild(card);
      domCards.unshift(card);
    }
    
    updateStackVisuals();
    initCardInteractions();
    workSection.classList.add('show-hint');
  };

  const updateStackVisuals = () => {
    if (workItems.length === 0) return;
    if (counterEl) counterEl.textContent = `${(currentCardIndex + 1).toString().padStart(2, '0')} / ${workItems.length.toString().padStart(2, '0')}`;
    
    domCards.forEach((card, i) => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s, box-shadow 0.5s';
      card.style.pointerEvents = 'none';
      
      if (i < currentCardIndex) {
        // swiped away
      } else if (i === currentCardIndex) {
        card.style.transform = 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
        card.style.opacity = '1';
        card.style.zIndex = 10;
        card.style.pointerEvents = 'auto';
        card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(139, 30, 46, 0.3)';
      } else if (i === currentCardIndex + 1) {
        card.style.transform = 'translate3d(0, 10px, 0) scale(0.96) rotate(-3.5deg)';
        card.style.opacity = '0.95';
        card.style.zIndex = 9;
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(139, 30, 46, 0.2)';
      } else if (i === currentCardIndex + 2) {
        card.style.transform = 'translate3d(0, 20px, 0) scale(0.92) rotate(3deg)';
        card.style.opacity = '0.9';
        card.style.zIndex = 8;
        card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(139, 30, 46, 0.15)';
      } else if (i === currentCardIndex + 3) {
        card.style.transform = 'translate3d(0, 30px, 0) scale(0.88) rotate(-1.5deg)';
        card.style.opacity = '0.5';
        card.style.zIndex = 7;
        card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(139, 30, 46, 0.1)';
      } else {
        card.style.transform = 'translate3d(0, 40px, 0) scale(0.84) rotate(0deg)';
        card.style.opacity = '0';
        card.style.zIndex = 1;
      }
    });

    if (currentCardIndex >= domCards.length && domCards.length > 0) {
      const empty = document.querySelector('.stack-empty-state');
      if (empty) empty.classList.add('active');
      if (counterEl) counterEl.textContent = `-- / ${workItems.length.toString().padStart(2, '0')}`;
    }
  };

  const swipeTopCard = (direction) => {
    if (workItems.length === 0 || currentCardIndex >= domCards.length) return;
    workSection.classList.remove('show-hint');
    
    const card = domCards[currentCardIndex];
    const throwX = direction === 'left' ? -window.innerWidth : window.innerWidth;
    const rotate = direction === 'left' ? -25 : 25;
    
    card.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s';
    card.style.transform = `translate3d(${throwX}px, -50px, 0) rotate(${rotate}deg)`;
    card.style.opacity = '0';
    
    currentCardIndex++;
    setTimeout(updateStackVisuals, 100);

    // Sparkle star on card swipe
    const star = document.getElementById('floatingStar');
    if (star) {
      star.classList.add('star-sparkle');
      setTimeout(() => star.classList.remove('star-sparkle'), 600);
    }
  };

  const initCardInteractions = () => {
    if (workItems.length === 0) return;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let dragRafId = null;
    
    // Prevent scroll interference on the card stack
    stackContainer.style.touchAction = 'pan-y';
    
    stackContainer.addEventListener('pointerdown', (e) => {
      if (currentCardIndex >= domCards.length) return;
      if (e.target.closest('.stack-empty-state')) return;
      
      isDragging = true;
      startX = e.clientX;
      currentX = e.clientX;
      const card = domCards[currentCardIndex];
      card.style.transition = 'none';
      workSection.classList.remove('show-hint');
    });

    const updateDragVisual = () => {
      if (!isDragging || currentCardIndex >= domCards.length) return;
      const deltaX = currentX - startX;
      const card = domCards[currentCardIndex];
      const rotate = deltaX * 0.08;
      card.style.transform = `translate3d(${deltaX}px, 0, 0) rotate(${rotate}deg)`;
      dragRafId = null;
    };

    window.addEventListener('pointermove', (e) => {
      if (!isDragging || currentCardIndex >= domCards.length) return;
      currentX = e.clientX;
      if (!dragRafId) {
        dragRafId = requestAnimationFrame(updateDragVisual);
      }
    });

    const handleRelease = () => {
      if (!isDragging || currentCardIndex >= domCards.length) return;
      isDragging = false;
      if (dragRafId) { cancelAnimationFrame(dragRafId); dragRafId = null; }
      const deltaX = currentX - startX;
      const threshold = Math.min(window.innerWidth * 0.15, 120);
      const card = domCards[currentCardIndex];
      
      if (Math.abs(deltaX) > threshold) {
        swipeTopCard(deltaX > 0 ? 'right' : 'left');
      } else {
        card.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        card.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
      }
      startX = 0; currentX = 0;
    };

    window.addEventListener('pointerup', handleRelease);
    window.addEventListener('pointercancel', handleRelease);
  };

  buildStack();

  const prevArrow = document.querySelector('.prev-arrow');
  const nextArrow = document.querySelector('.next-arrow');

  if (prevArrow && nextArrow) {
    prevArrow.addEventListener('click', () => swipeTopCard('left'));
    nextArrow.addEventListener('click', () => swipeTopCard('right'));
  }

  window.addEventListener('keydown', (e) => {
    const rect = workSection.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      if (e.key === 'ArrowLeft') swipeTopCard('left');
      if (e.key === 'ArrowRight') swipeTopCard('right');
    }
  });

  // -----------------------------
  // 6. FLOATING MASCOT ELEMENTS (CAT + STAR)
  // -----------------------------
  const walkingCat = document.getElementById('walkingCat');
  const floatingStar = document.getElementById('floatingStar');
  
  let scrollTimeout = null;
  let lastScrollY = window.scrollY;

  const updateCatMovement = () => {
    if (!walkingCat) return;
    
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight - winHeight;
    const scrollFraction = docHeight > 0 ? Math.min(Math.max(window.scrollY / docHeight, 0), 1) : 0;
    
    // Accurate viewport bounds calculation for desktop & mobile screens
    const isMobile = window.innerWidth <= 768;
    const catWidth = isMobile ? 64 : 96;
    const padding = isMobile ? 12 : 40;
    
    const travelRange = Math.max(window.innerWidth - catWidth - (padding * 2), 40);
    const catOffset = scrollFraction * travelRange;
    
    // Determine scroll direction so cat faces forward in direction of motion
    const isScrollingDown = window.scrollY >= lastScrollY;
    lastScrollY = window.scrollY;
    
    // SVG cat head points left by default.
    // Moving leftward (scrolling down) -> scaleX(1). Moving rightward (scrolling up) -> scaleX(-1).
    const scaleX = isScrollingDown ? 1 : -1;
    
    // Hardware accelerated 3D transform for smooth mobile rendering
    walkingCat.style.transform = `translate3d(-${catOffset.toFixed(1)}px, 0, 0) scaleX(${scaleX})`;
    
    // Run leg stride animation ONLY while actively scrolling
    walkingCat.classList.add('is-walking');
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      walkingCat.classList.remove('is-walking');
    }, 120);
  };

  // Passive event listeners for desktop scroll, mobile touch scroll, and window resize
  window.addEventListener('scroll', updateCatMovement, { passive: true });
  window.addEventListener('touchmove', updateCatMovement, { passive: true });
  window.addEventListener('resize', updateCatMovement, { passive: true });
  updateCatMovement();

  // Interactive Star Sparkle
  if (floatingStar) {
    floatingStar.addEventListener('mouseenter', () => {
      floatingStar.classList.add('star-sparkle');
      setTimeout(() => floatingStar.classList.remove('star-sparkle'), 600);
    });

    floatingStar.addEventListener('click', () => {
      floatingStar.classList.add('star-sparkle');
      setTimeout(() => floatingStar.classList.remove('star-sparkle'), 600);
    });
  }

  // -----------------------------
  // 7. REELS MODAL
  // -----------------------------
  const reelsData = [
    { id: 'DT8LdexEqbJ', title: 'Mid-Form Celebrity Edit', desc: 'Social Media', img: 'https://i.pinimg.com/736x/35/8d/c1/358dc12cb6009f28cc2eef113c81168e.jpg' },
    { id: 'DQw01UbkrWm', title: 'Women in Love', desc: 'Short Reel', img: 'https://i.pinimg.com/736x/a3/6e/bc/a36ebc55fcbe8e88f00dd8a9fd1cbc94.jpg' },
    { id: 'DSbuHJHkhEJ', title: 'Kiara Advani Edit', desc: 'Fan Edit', img: 'https://i.pinimg.com/736x/c7/98/a6/c798a66e7d4765f2d700843aafee2286.jpg' },
    { id: 'DQraUbUkie3', title: 'Short-Form Content', desc: 'Social Media', img: 'https://i.pinimg.com/736x/82/90/25/82902575d2b4c5d6a88a50fce2f772e4.jpg' }
  ];

  const reelsTrack = document.getElementById('reels-track');
  const reelModal = document.getElementById('reel-modal');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.querySelector('.modal-close');
  const modalPrev = document.querySelector('.modal-prev');
  const modalNext = document.querySelector('.modal-next');
  let currentReelIndex = 0;

  if (reelsTrack && reelModal) {
    reelsData.forEach((reel, index) => {
      const card = document.createElement('div');
      card.className = 'reel-card';
      card.innerHTML = `
        <img src="${reel.img}" alt="${reel.title}">
        <div class="reel-overlay">
          <div class="reel-meta">${(index + 1).toString().padStart(2, '0')} · ${reel.desc}</div>
          <h3>${reel.title}</h3>
        </div>
        <div class="play-btn"></div>
      `;
      card.addEventListener('click', () => openReel(index));
      card.style.cursor = 'none';
      card.setAttribute('data-cursor', 'grow');
      reelsTrack.appendChild(card);
    });

    const openReel = (index) => {
      currentReelIndex = index;
      const reelId = reelsData[index].id;
      modalContent.innerHTML = `<iframe src="https://www.instagram.com/p/${reelId}/embed/" allowtransparency="true" frameborder="0" scrolling="no"></iframe>`;
      reelModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeReel = () => {
      reelModal.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => { modalContent.innerHTML = ''; }, 300);
    };

    modalClose.addEventListener('click', closeReel);
    reelModal.addEventListener('click', (e) => {
      if (e.target === reelModal) closeReel();
    });

    modalPrev.addEventListener('click', () => {
      let nextIndex = currentReelIndex - 1;
      if (nextIndex < 0) nextIndex = reelsData.length - 1;
      openReel(nextIndex);
    });

    modalNext.addEventListener('click', () => {
      let nextIndex = currentReelIndex + 1;
      if (nextIndex >= reelsData.length) nextIndex = 0;
      openReel(nextIndex);
    });

    let touchStartX = 0;
    let touchEndX = 0;

    reelModal.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    });

    reelModal.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleModalSwipe();
    });

    const handleModalSwipe = () => {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        modalNext.click();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        modalPrev.click();
      }
    };
  }

  // -----------------------------
  // 8. STATS COUNTER
  // -----------------------------
  const statsSection = document.getElementById('stats');
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let statsAnimated = false;

  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();
            
            const animateCount = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeProgress = progress * (2 - progress);
              const current = Math.floor(easeProgress * target);
              stat.textContent = current;
              
              if (progress < 1) {
                requestAnimationFrame(animateCount);
              } else {
                stat.textContent = target;
              }
            };
            requestAnimationFrame(animateCount);
          });
        }
      });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
  }

  // -----------------------------
  // 9. CONTACT FORM
  // -----------------------------
  const form = document.getElementById('contact-form');
  const submitBtn = document.querySelector('.submit-btn');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const prevText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.style.pointerEvents = 'none';

      const formData = new FormData(form);
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          submitBtn.textContent = '✓ Sent — Thank you!';
          submitBtn.classList.add('success');
          form.reset();
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        submitBtn.textContent = 'Error. Click to mail directly.';
        submitBtn.addEventListener('click', () => {
          window.location.href = 'mailto:trishapanday37@gmail.com';
        }, { once: true });
      }
      
      setTimeout(() => {
        if (!submitBtn.classList.contains('success')) {
          submitBtn.textContent = prevText;
          submitBtn.style.pointerEvents = 'auto';
        }
      }, 5000);
    });
  }

  // -----------------------------
  // 10. SCROLL-TO-TOP & FOOTER EASTER EGG
  // -----------------------------
  const scrollTopBtn = document.getElementById('scroll-top');
  
  window.addEventListener('scroll', () => {
    if (scrollTopBtn) {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const footerLogo = document.querySelector('.footer-logo');
  if (footerLogo) {
    footerLogo.innerHTML = '';
    const name = "Trisha Pandey";
    [...name].forEach((char, i) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char;
      if (char === ' ') span.style.width = '10px';
      span.style.transitionDelay = `${i * 30}ms`;
      footerLogo.appendChild(span);
    });
    
    const dot = document.createElement('span');
    dot.className = 'logo-dot';
    dot.textContent = '.';
    footerLogo.appendChild(dot);
  }

});
