document.addEventListener('DOMContentLoaded', () => {

  // -----------------------------
  // 1. LOADER
  // -----------------------------
  const loader = document.getElementById('loader');
  const loaderLogo = document.querySelector('.loader-logo');
  
  if (loader && loaderLogo) {
    // 0ms: Logo fades in (handled by CSS transition initially set to 0, so we set to 1)
    setTimeout(() => {
      loaderLogo.style.opacity = '1';
    }, 50);
    
    // 1200ms: Logo slides up & fades out
    setTimeout(() => {
      loader.classList.add('loader-fade-up');
    }, 1200);
    
    // 1400ms: Panel slides off-screen
    setTimeout(() => {
      loader.classList.add('loader-slide-up');
    }, 1400);
    
    // 1800ms: Remove loader from DOM and trigger hero animations
    setTimeout(() => {
      loader.remove();
      document.querySelectorAll('#hero .reveal').forEach(el => {
        el.classList.add('active');
      });
    }, 1800);
  }

  // -----------------------------
  // 2. CUSTOM CURSOR
  // -----------------------------
  const cursorRing = document.querySelector('.cursor-ring');
  const cursorDot = document.querySelector('.cursor-dot');
  
  if (cursorRing && cursorDot) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isHovering = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Dot snaps immediately
      cursorDot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
    });

    const renderCursor = () => {
      // Lerp for ring
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;
      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    // Hover logic
    const setupCursorHovers = () => {
      document.querySelectorAll('[data-cursor="grow"]').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
      });
      
      document.querySelectorAll('a:not([data-cursor="grow"]), button:not([data-cursor="grow"])').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-link'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-link'));
      });
    };
    
    setupCursorHovers();
    
    // Re-run setup if dynamic elements are added (like card stack)
    const observer = new MutationObserver(setupCursorHovers);
    observer.observe(document.body, { childList: true, subtree: true });
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
  });

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
  // 6. CARD STACK
  // -----------------------------
  const workItems = [
    { title: 'Online Course Poster', category: 'Poster Design · Education', img: 'images/online-course-poster.png' },
    { title: 'Vlog YouTube Thumbnail', category: 'Thumbnail · Content', img: 'images/vlog-routine-thumbnail.png' },
    { title: 'Café Open Hours Poster', category: 'Poster Design · Brand', img: 'images/cafe-poster.png' },
    { title: 'Coffee Menu Design', category: 'Menu Design · Print', img: 'images/coffee-menu.png' },
    { title: 'Kiara Advani Fan Edit', category: 'Celebrity Design · Visual', img: 'images/kiara-advani-design.png' },
    { title: 'Science Event Poster', category: 'Poster Design · Education', img: 'images/science-event-poster.png' },
    { title: 'Fashion Instagram Post', category: 'Social Media · Fashion', img: 'images/fashion-instagram-post.png' },
    { title: 'Creative Digital Art 1', category: 'Digital Art · Picsart', img: 'images/picsart-1.png' },
    { title: 'Creative Digital Art 2', category: 'Digital Art · Picsart', img: 'images/picsart-2.png' },
    { title: 'Creative Digital Art 3', category: 'Digital Art · Picsart', img: 'images/picsart-3.png' },
    { title: 'Creative Digital Art 4', category: 'Digital Art · Picsart', img: 'images/picsart-4.png' },
    { title: 'Creative Digital Art 5', category: 'Digital Art · Picsart', img: 'images/picsart-5.png' },
    { title: 'Creative Digital Art 6', category: 'Digital Art · Picsart', img: 'images/picsart-6.png' },
    { title: 'Creative Digital Art 7', category: 'Digital Art · Picsart', img: 'images/picsart-7.jpg' },
    { title: 'Creative Digital Art 8', category: 'Digital Art · Picsart', img: 'images/picsart-8.jpg' },
    { title: 'Creative Digital Art 9', category: 'Digital Art · Picsart', img: 'images/picsart-9.jpg' },
    { title: 'Creative Digital Art 10', category: 'Digital Art · Picsart', img: 'images/picsart-10.jpg' },
    { title: 'Creative Digital Art 11', category: 'Digital Art · Picsart', img: 'images/picsart-11.png' }
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
    emptyState.className = 'stack-empty-state';
    emptyState.innerHTML = `
      <h3>You've seen it all 🎉</h3>
      <button class="cta-button" id="reshuffle-btn" data-cursor="grow">Shuffle & Restart</button>
    `;
    stackContainer.appendChild(emptyState);

    document.getElementById('reshuffle-btn').addEventListener('click', () => {
      // Optional: shuffle workItems array here
      emptyState.classList.remove('active');
      buildStack();
    });

    // Build cards from bottom to top (reverse order so item 0 is on top)
    for (let i = workItems.length - 1; i >= 0; i--) {
      const item = workItems[i];
      const numStr = (i + 1).toString().padStart(2, '0');
      
      const card = document.createElement('div');
      card.className = 'work-card';
      card.innerHTML = `
        <img src="${item.img}" alt="${item.title}" loading="lazy">
        <div class="work-card-overlay">
          <div class="work-meta">
            <span class="work-num">${numStr}</span>
            <span class="work-cat">${item.category}</span>
          </div>
          <h3>${item.title}</h3>
        </div>
      `;
      stackContainer.appendChild(card);
      domCards.unshift(card); // Keep domCards array in normal order (index 0 is top)
    }
    
    updateStackVisuals();
    initCardInteractions();
    
    // Show hint initially
    workSection.classList.add('show-hint');
  };

  const updateStackVisuals = () => {
    if(counterEl) counterEl.textContent = `${(currentCardIndex + 1).toString().padStart(2, '0')} / ${workItems.length}`;
    
    domCards.forEach((card, i) => {
      card.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s';
      card.style.pointerEvents = 'none';
      
      if (i < currentCardIndex) {
        // Swiped away
      } else if (i === currentCardIndex) {
        // Top card
        card.style.transform = 'translateY(0) scale(1)';
        card.style.opacity = '1';
        card.style.zIndex = 10;
        card.style.pointerEvents = 'auto';
      } else if (i === currentCardIndex + 1) {
        // Second card
        card.style.transform = 'translateY(12px) scale(0.95)';
        card.style.opacity = '1';
        card.style.zIndex = 9;
      } else if (i === currentCardIndex + 2) {
        // Third card
        card.style.transform = 'translateY(24px) scale(0.9)';
        card.style.opacity = '1';
        card.style.zIndex = 8;
      } else {
        // Hidden
        card.style.transform = 'translateY(40px) scale(0.85)';
        card.style.opacity = '0';
        card.style.zIndex = 1;
      }
    });

    if (currentCardIndex >= domCards.length) {
      document.querySelector('.stack-empty-state').classList.add('active');
      if(counterEl) counterEl.textContent = `-- / ${workItems.length}`;
    }
  };

  const swipeTopCard = (direction) => {
    if (currentCardIndex >= domCards.length) return;
    workSection.classList.remove('show-hint');
    
    const card = domCards[currentCardIndex];
    const throwX = direction === 'left' ? -window.innerWidth : window.innerWidth;
    const rotate = direction === 'left' ? -25 : 25;
    
    card.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s';
    card.style.transform = `translate(${throwX}px, -50px) rotate(${rotate}deg)`;
    card.style.opacity = '0';
    
    currentCardIndex++;
    setTimeout(updateStackVisuals, 100);
  };

  const initCardInteractions = () => {
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    
    stackContainer.addEventListener('pointerdown', (e) => {
      if (currentCardIndex >= domCards.length) return;
      if (e.target.closest('.stack-empty-state')) return;
      
      isDragging = true;
      startX = e.clientX;
      const card = domCards[currentCardIndex];
      card.style.transition = 'none';
      workSection.classList.remove('show-hint');
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging || currentCardIndex >= domCards.length) return;
      currentX = e.clientX;
      const deltaX = currentX - startX;
      const card = domCards[currentCardIndex];
      
      const rotate = deltaX * 0.08;
      card.style.transform = `translateX(${deltaX}px) rotate(${rotate}deg)`;
    });

    window.addEventListener('pointerup', (e) => {
      if (!isDragging || currentCardIndex >= domCards.length) return;
      isDragging = false;
      const deltaX = currentX - startX;
      const threshold = window.innerWidth * 0.15; // commit threshold
      
      const card = domCards[currentCardIndex];
      
      if (Math.abs(deltaX) > threshold) {
        swipeTopCard(deltaX > 0 ? 'right' : 'left');
      } else {
        // snap back
        card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
      }
      startX = 0; currentX = 0;
    });
  };

  buildStack();

  const prevArrow = document.querySelector('.prev-arrow');
  const nextArrow = document.querySelector('.next-arrow');

  if (prevArrow && nextArrow) {
    prevArrow.addEventListener('click', () => swipeTopCard('left'));
    nextArrow.addEventListener('click', () => swipeTopCard('right'));
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    const rect = workSection.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      if (e.key === 'ArrowLeft') swipeTopCard('left');
      if (e.key === 'ArrowRight') swipeTopCard('right');
    }
  });


  // -----------------------------
  // 7. REELS MODAL
  // -----------------------------
  const reelsData = [
    { id: 'DT8LdexEqbJ', title: 'Mid-Form Celebrity Edit', desc: 'Social Media', img: 'images/vlog-routine-thumbnail.png' },
    { id: 'DQw01UbkrWm', title: 'Women in Love', desc: 'Short Reel', img: 'images/picsart-3.png' },
    { id: 'DSbuHJHkhEJ', title: 'Kiara Advani Edit', desc: 'Fan Edit', img: 'images/kiara-advani-design.png' },
    { id: 'DQraUbUkie3', title: 'Short-Form Content', desc: 'Social Media', img: 'images/picsart-4.png' }
  ];

  const reelsTrack = document.getElementById('reels-track');
  const reelModal = document.getElementById('reel-modal');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.querySelector('.modal-close');
  const modalPrev = document.querySelector('.modal-prev');
  const modalNext = document.querySelector('.modal-next');
  let currentReelIndex = 0;

  if (reelsTrack && reelModal) {
    // Inject reel cards
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
      // We don't have real poster images for reels in the folder, so we use IG media endpoint or fallback.
      
      card.addEventListener('click', () => openReel(index));
      card.style.cursor = 'none'; // so custom cursor handles it
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

    // Touch swipe support for mobile
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
        // Swipe left -> Next
        modalNext.click();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right -> Prev
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
            let current = 0;
            const duration = 2000;
            const startTime = performance.now();
            
            const animateCount = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out quad
              const easeProgress = progress * (2 - progress);
              current = Math.floor(easeProgress * target);
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
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Footer Logo Easter Egg
  const footerLogo = document.querySelector('.footer-logo');
  if (footerLogo) {
    const text = footerLogo.textContent.replace('.', ''); // remove the static dot span if exists
    // Actually in HTML we have: Trisha Pandey<span class="logo-dot">.</span>
    // Let's just wrap text nodes
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
