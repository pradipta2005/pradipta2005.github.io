/**
 * ============================================================================
 * Pradipta Khan (Mr. P.K) — Data Science & Analytics Portfolio
 * Interactive Script with Tactile Keyboard, Creative Dialogs & State Machine
 * ============================================================================
 */

/* --------------------------------------------------------------------------
   Global Configuration
   -------------------------------------------------------------------------- */
const CONFIG = {
  name: 'Pradipta Khan',
  brandName: 'Mr. P.K',
  email: 'pradiptakhan005@gmail.com',
  github: 'https://github.com/pradipta2005/',
  linkedin: 'https://www.linkedin.com/in/pradipta-khan/',
  title: 'Data Analyst | Data Scientist | Data Engineer | SQL Developer',
};

let soundEnabled = true;
let audioCtx = null;

function getAudioContext() {
  try {
    if (!audioCtx) {
      const AudioContextClass = typeof window !== 'undefined' ? (window.AudioContext || window.webkitAudioContext) : null;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
  } catch (e) {
    // Autoplay restrictions gracefully handled
  }
  return audioCtx;
}

function playTone(freq, type = 'sine', duration = 0.08, volume = 0.15) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq * 0.4), now + duration);
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  } catch (e) {
    // Autoplay restrictions gracefully handled
  }
}

/**
 * Tactile acoustic chimes & haptics for portfolio interactions (Assistant, Drawer, Lightbox, Fullscreen)
 */
function playAssistantSound(type) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === 'fullscreen') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.14);
    } else if (type === 'open') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.09);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'close') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, now);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.09);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'message') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.setValueAtTime(880, now + 0.05);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    }
  } catch (e) {
    // Audio context error guard
  }
}

function startPortfolio() {
  const initSteps = [
    ['Preloader', initPreloader],
    ['ThemeSystem', initThemeSystem],
    ['BrandConfig', syncBrandConfig],
    ['KeyboardScaling', initKeyboardScaling],
    ['KeyboardSequence', initKeyboardSequence],
    ['Dialogs', initDialogs],
    ['MarqueeSpeed', initMarqueeSpeed],
    ['ProjectFilters', initProjectFilters],
    ['ThemeAtmosphere', initThemeAdaptiveAtmosphere],
    ['CustomCursor', initCustomCursor],
    ['KeyboardAcoustics', initKeyboardAcoustics],
    ['Card3DTilt', initCard3DTilt],
    ['ScrollProgressAndDock', initScrollProgressAndDock],
    ['NumberCounters', initNumberCounters],
    ['ScrollReveals', initScrollReveals],
    ['PhysicalKeyboard', initPhysicalKeyboard],
    ['CommandPalette', initCommandPalette],
    ['LiveClock', initLiveClock],
    ['SectionIndicator', initSectionIndicator],
    ['MagneticElements', initMagneticElements],
    ['AIAssistant', initAIAssistant],
    ['HeaderThemeObserver', initHeaderThemeObserver],
    ['CertLightbox', initCertLightbox],
    ['MobileNav', initMobileNav]
  ];

  initSteps.forEach(([name, fn]) => {
    try {
      if (typeof fn === 'function') fn();
    } catch (err) {
      console.warn(`[Portfolio Init] ${name} caught:`, err);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startPortfolio);
} else {
  startPortfolio();
}

/**
 * Sync email and profile links across the DOM.
 */
function syncBrandConfig() {
  const mailtoHref = `mailto:${CONFIG.email}`;
  
  const emailElements = [
    document.getElementById('contact-email'),
    document.getElementById('dialog-social-email'),
    document.getElementById('nav-contact-link'),
    document.getElementById('key-enter')
  ];

  emailElements.forEach(el => {
    if (el) {
      el.setAttribute('href', mailtoHref);
      if (el.id === 'contact-email' || el.id === 'dialog-social-email') {
        el.textContent = CONFIG.email;
      }
    }
  });

  // Sync social URLs
  const githubLinks = document.querySelectorAll('.js-github-link');
  githubLinks.forEach(el => {
    el.setAttribute('href', CONFIG.github);
  });

  const linkedinLinks = document.querySelectorAll('.js-linkedin-link');
  linkedinLinks.forEach(el => {
    el.setAttribute('href', CONFIG.linkedin);
  });
}

/**
 * Dynamic scale calculation for the 900px × 312px keyboard.
 */
function initKeyboardScaling() {
  const container = document.querySelector('.keyboard-container');
  if (!container) return;

  function calculateScale() {
    const availableWidth = container.clientWidth - 16;
    const rawScale = availableWidth / 900;
    const scale = Math.min(1, Math.max(0.24, rawScale));

    container.style.setProperty('--kb-scale', scale.toFixed(4));
    const scaledHeight = Math.ceil(312 * scale + 12);
    container.style.height = `${scaledHeight}px`;
  }

  calculateScale();

  if (window.ResizeObserver) {
    const observer = new ResizeObserver(() => {
      calculateScale();
    });
    observer.observe(container);
  }
  window.addEventListener('resize', calculateScale);
}

/**
 * Automatic Key Sequence Controller
 * Order: P -> Upper O -> R -> T -> F -> Lower O -> L -> I -> Final O -> Enter
 */
function initKeyboardSequence() {
  const keyboardBoard = document.querySelector('.keyboard-board');
  if (!keyboardBoard) return;

  const keySequence = [
    document.getElementById('key-p'),
    document.getElementById('key-upper-o'),
    document.getElementById('key-r'),
    document.getElementById('key-t'),
    document.getElementById('key-f'),
    document.getElementById('key-lower-o'),
    document.getElementById('key-l'),
    document.getElementById('key-i'),
    document.getElementById('key-final-o'),
    document.getElementById('key-enter')
  ].filter(Boolean);

  let currentIndex = 0;
  let autoTimer = null;
  let releaseTimer = null;
  let isPaused = false;
  let pointerOverKeyboard = false;
  let keyboardHasFocus = false;

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function prefersReducedMotion() {
    return reducedMotionQuery.matches;
  }

  function clearAllPressedStates() {
    keySequence.forEach(key => {
      key.classList.remove('is-auto-pressed');
    });
  }

  function releaseCurrentKey(key) {
    if (key) {
      key.classList.remove('is-auto-pressed');
    }
  }

  function stepSequence() {
    if (isPaused || prefersReducedMotion()) {
      clearAllPressedStates();
      return;
    }

    clearAllPressedStates();

    const activeKey = keySequence[currentIndex];
    if (activeKey) {
      activeKey.classList.add('is-auto-pressed');

      releaseTimer = setTimeout(() => {
        releaseCurrentKey(activeKey);
      }, 140);
    }

    currentIndex++;
    if (currentIndex >= keySequence.length) {
      currentIndex = 0;
      autoTimer = setTimeout(stepSequence, 1850);
    } else {
      autoTimer = setTimeout(stepSequence, 340);
    }
  }

  function pauseSequence() {
    isPaused = true;
    clearTimeout(autoTimer);
    clearTimeout(releaseTimer);
    clearAllPressedStates();
  }

  function resumeSequence() {
    const isAnyDialogOpen = !!document.querySelector('dialog[open]');
    if (
      pointerOverKeyboard ||
      keyboardHasFocus ||
      isAnyDialogOpen ||
      document.hidden ||
      prefersReducedMotion()
    ) {
      return;
    }

    isPaused = false;
    clearTimeout(autoTimer);
    clearTimeout(releaseTimer);
    autoTimer = setTimeout(stepSequence, 380);
  }

  const container = document.querySelector('.keyboard-container');
  if (container) {
    container.addEventListener('pointerenter', () => {
      pointerOverKeyboard = true;
      pauseSequence();
    });

    container.addEventListener('pointerleave', () => {
      pointerOverKeyboard = false;
      resumeSequence();
    });

    container.addEventListener('touchstart', () => {
      pointerOverKeyboard = true;
      pauseSequence();
    }, { passive: true });

    container.addEventListener('touchend', () => {
      pointerOverKeyboard = false;
      resumeSequence();
    }, { passive: true });
  }

  keyboardBoard.addEventListener('focusin', () => {
    keyboardHasFocus = true;
    pauseSequence();
  });

  keyboardBoard.addEventListener('focusout', (e) => {
    if (!keyboardBoard.contains(e.relatedTarget)) {
      keyboardHasFocus = false;
      resumeSequence();
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pauseSequence();
    } else {
      resumeSequence();
    }
  });

  if (reducedMotionQuery.addEventListener) {
    reducedMotionQuery.addEventListener('change', (e) => {
      if (e.matches) {
        pauseSequence();
      } else {
        resumeSequence();
      }
    });
  }

  window.__portfolioController = {
    pauseSequence,
    resumeSequence
  };

  if (!prefersReducedMotion()) {
    autoTimer = setTimeout(stepSequence, 800);
  }
}

/**
 * Accessible Native Dialog Management
 */
function initDialogs() {
  let lastFocusedElement = null;

  document.querySelectorAll('[data-open-dialog]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const dialogId = trigger.getAttribute('data-open-dialog');
      const dialog = document.getElementById(dialogId);
      if (dialog && typeof dialog.showModal === 'function') {
        lastFocusedElement = trigger;
        
        if (window.__portfolioController) {
          window.__portfolioController.pauseSequence();
        }

        dialog.showModal();

        const closeBtn = dialog.querySelector('.dialog-close');
        if (closeBtn) {
          closeBtn.focus();
        }
      }
    });
  });

  document.querySelectorAll('dialog.portfolio-dialog').forEach(dialog => {
    const closeBtn = dialog.querySelector('.dialog-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        dialog.close();
      });
    }

    // Anchor links inside dialog connecting to page sections
    dialog.querySelectorAll('a[href^="#"]').forEach(sectionLink => {
      sectionLink.addEventListener('click', (e) => {
        const targetId = sectionLink.getAttribute('href');
        // Prevent snapping focus back to keyboard hero
        lastFocusedElement = null;
        dialog.close();
        
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
          history.pushState(null, '', targetId);
        }
      });
    });

    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) {
        dialog.close();
      }
    });

    dialog.addEventListener('close', () => {
      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
      }

      if (window.__portfolioController) {
        window.__portfolioController.resumeSequence();
      }
    });
  });
}

/**
 * Dynamic Marquee Speed Sync (~50px / sec)
 */
function initMarqueeSpeed() {
  const track = document.querySelector('.marquee-track');
  const group = document.querySelector('.marquee-group');
  if (!track || !group) return;

  function updateDuration() {
    const groupWidth = group.offsetWidth;
    if (groupWidth > 0) {
      const speed = 50; 
      const durationSeconds = groupWidth / speed;
      track.style.animationDuration = `${durationSeconds.toFixed(1)}s`;
    }
  }

  updateDuration();
  window.addEventListener('resize', updateDuration);
}

/**
 * Filter featured projects by category taxonomy
 */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-tab-btn');
  const projectCards = document.querySelectorAll('.project-display-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      if (typeof playTone === 'function' && typeof soundEnabled !== 'undefined' && soundEnabled) {
        playTone(560, 'sine', 0.04, 0.02);
      }

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const catStr = card.getAttribute('data-category') || '';
        const categories = catStr.split(/\s+/);
        if (filterVal === 'all' || categories.includes(filterVal)) {
          card.style.display = '';
          card.classList.add('fade-in-card', 'is-in-view');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Canvas Atmosphere Engine
 * - Light Theme: Kyoto autumn botanical leaves with aerodynamic sway & cursor vortex
 * - Dark Theme: Midnight celestial pyrotechnics & prismatic stardust simulation
 */
function initThemeAdaptiveAtmosphere() {
  const fxCanvas = document.getElementById('theme-fx-canvas');
  if (!fxCanvas) return;

  const ctx = fxCanvas.getContext('2d', { alpha: true, desynchronized: true });
  if (!ctx) return;

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) return;

  // 1:1 CSS Pixel Buffer for zero GPU fill-rate overhead & butter-smooth 60fps
  let width = (fxCanvas.width = window.innerWidth);
  let height = (fxCanvas.height = window.innerHeight);

  function handleResize() {
    width = fxCanvas.width = window.innerWidth;
    height = fxCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', handleResize, { passive: true });

  // Mouse tracking with throttled velocity
  let mouseX = -1000;
  let mouseY = -1000;

  window.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  window.addEventListener('pointerleave', () => {
    mouseX = -1000;
    mouseY = -1000;
  }, { passive: true });

  // -------------------------------------------------------------------------
  // 1. Kyoto Autumn Botanical Leaves Simulation (Light Theme)
  // -------------------------------------------------------------------------
  class KyotoLeaf {
    constructor(w, h, startRandomY) {
      this.w = w;
      this.h = h;
      this.type = Math.floor(Math.random() * 3); // 0: Momiji, 1: Ginkgo, 2: Aspen
      this.z = 0.5 + Math.random() * 0.7;
      this.x = Math.random() * w;
      this.y = startRandomY ? Math.random() * h : -50 - Math.random() * 50;
      this.size = (15 + Math.random() * 15) * this.z;
      this.vy = (0.75 + Math.random() * 1.1) * this.z;
      this.angle = Math.random() * Math.PI * 2;
      this.angularVelocity = (Math.random() - 0.5) * 0.03;
      this.pitch = Math.random() * Math.PI * 2;
      this.pitchSpeed = 0.016 + Math.random() * 0.022;
      this.roll = Math.random() * Math.PI * 2;
      this.rollSpeed = 0.014 + Math.random() * 0.018;
      this.swayPhase = Math.random() * Math.PI * 2;
      this.swaySpeed = 0.016 + Math.random() * 0.016;
      this.swayAmp = (1.2 + Math.random() * 2.0) * this.z;

      const palettes = [
        { fill: '#e11d48', stroke: '#9f1239' }, // Crimson Momiji
        { fill: '#f59e0b', stroke: '#b45309' }, // Amber Gold
        { fill: '#ea580c', stroke: '#c2410c' }, // Terracotta Russet
        { fill: '#ca8a04', stroke: '#854d0e' }, // Ochre
        { fill: '#fbbf24', stroke: '#d97706' }, // Golden Ginkgo
        { fill: '#be123c', stroke: '#881337' }  // Deep Auburn
      ];
      this.theme = palettes[Math.floor(Math.random() * palettes.length)];
      this.alpha = 0.65 + this.z * 0.30;
    }

    update(ambientWindX, curMouseX, curMouseY) {
      this.y += this.vy;
      this.swayPhase += this.swaySpeed;
      this.x += Math.sin(this.swayPhase) * this.swayAmp + ambientWindX;
      this.angle += this.angularVelocity;
      this.pitch += this.pitchSpeed;
      this.roll += this.rollSpeed;

      // Mouse breeze
      if (curMouseX >= 0 && curMouseY >= 0) {
        const dx = this.x - curMouseX;
        const dy = this.y - curMouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < 130 && dist > 0) {
          const force = ((130 - dist) / 130) * 3.2;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
          this.angularVelocity += (Math.random() - 0.5) * 0.06 * force;
          this.pitchSpeed += 0.03 * force;
        }
      }

      if (this.y > height + 55) {
        this.y = -50;
        this.x = Math.random() * width;
      }
    }

    applyImpulse(ix, iy, strength) {
      const forceMult = strength || 6;
      const dx = this.x - ix;
      const dy = this.y - iy;
      const dist = Math.hypot(dx, dy);
      if (dist < 200 && dist > 0) {
        const force = ((200 - dist) / 200) * forceMult;
        this.x += (dx / dist) * force * 2.5;
        this.y += (dy / dist) * force * 2.5;
        this.angularVelocity += (Math.random() - 0.5) * 0.14;
        this.pitchSpeed += 0.06;
      }
    }

    draw(c) {
      c.save();
      c.translate(this.x, this.y);
      c.rotate(this.angle);

      const scaleX = Math.cos(this.roll);
      const scaleY = Math.cos(this.pitch);
      c.scale(this.size * scaleX, this.size * scaleY);
      c.globalAlpha = Math.max(0.05, Math.min(1, this.alpha));
      c.fillStyle = this.theme.fill;
      c.strokeStyle = this.theme.stroke;
      c.lineWidth = 0.08;

      if (this.type === 0) {
        // Momiji (Japanese Maple)
        c.beginPath();
        c.moveTo(0, 0.35);
        c.lineTo(0, 0.1);
        c.quadraticCurveTo(0.2, 0.15, 0.45, 0.22);
        c.lineTo(0.7, 0.05);
        c.quadraticCurveTo(0.45, -0.05, 0.35, -0.15);
        c.lineTo(0.58, -0.42);
        c.quadraticCurveTo(0.35, -0.4, 0.22, -0.48);
        c.lineTo(0, -0.85);
        c.lineTo(-0.22, -0.48);
        c.quadraticCurveTo(-0.35, -0.4, -0.58, -0.42);
        c.quadraticCurveTo(-0.45, -0.05, -0.7, 0.05);
        c.lineTo(-0.45, 0.22);
        c.quadraticCurveTo(-0.2, 0.15, 0, 0.1);
        c.closePath();
        c.fill();
        c.stroke();
      } else if (this.type === 1) {
        // Ginkgo Biloba
        c.beginPath();
        c.moveTo(0, 0.4);
        c.quadraticCurveTo(-0.05, 0.15, -0.15, 0);
        c.bezierCurveTo(-0.55, -0.1, -0.75, -0.45, -0.55, -0.72);
        c.quadraticCurveTo(-0.25, -0.65, 0, -0.45);
        c.quadraticCurveTo(0.25, -0.65, 0.55, -0.72);
        c.bezierCurveTo(0.75, -0.45, 0.55, -0.1, 0.15, 0);
        c.quadraticCurveTo(0.05, 0.15, 0, 0.4);
        c.closePath();
        c.fill();
        c.stroke();
      } else {
        // Aspen
        c.beginPath();
        c.moveTo(0, 0.35);
        c.bezierCurveTo(-0.45, 0.2, -0.48, -0.35, 0, -0.8);
        c.bezierCurveTo(0.48, -0.35, 0.45, 0.2, 0, 0.35);
        c.closePath();
        c.fill();
        c.stroke();
      }

      c.restore();
    }
  }

  // Pre-allocated collection of leaves
  const leafCount = window.innerWidth < 768 ? 10 : 18;
  const leaves = [];
  for (let i = 0; i < leafCount; i++) {
    leaves.push(new KyotoLeaf(width, height, true));
  }

  // -------------------------------------------------------------------------
  // 2. High-Density Creative Celestial Pyrotechnics (Dark Theme)
  //    Silent, Additive Photonic Bloom, 6 Distinct Burst Styles & Shooting Stars
  // -------------------------------------------------------------------------
  const confettiParticles = [];
  const fireworkSparks = [];
  const fireworkRockets = [];
  const shootingStars = [];
  const themeShockwaves = [];

  const MAX_SPARKS = window.innerWidth < 768 ? 80 : 140;
  const MAX_CONFETTI = window.innerWidth < 768 ? 24 : 40;

  const JEWEL_COLORS = [
    '#f43f5e', // Electric Rose
    '#a78bfa', // Celestial Violet
    '#38bdf8', // Electric Cyan
    '#fbbf24', // Astral Gold
    '#34d399', // Luminous Emerald
    '#f472b6', // Radiant Magenta
    '#fde047', // Solar Yellow
    '#ffffff'  // Diamond White
  ];

  class ConfettiFoil {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.4 + Math.random() * 4.6;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 2.8;
      this.gravity = 0.11;
      this.drag = 0.96;
      this.w = 6 + Math.random() * 6;
      this.h = 11 + Math.random() * 8;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.14;
      this.flip = Math.random() * Math.PI * 2;
      this.flipSpeed = 0.08 + Math.random() * 0.12;
      this.color = color;
      this.alpha = 1;
      this.decay = 0.009 + Math.random() * 0.007;
      this.swayPhase = Math.random() * Math.PI * 2;
      this.swaySpeed = 0.06 + Math.random() * 0.04;
      this.isDiamond = Math.random() > 0.45;
    }

    update() {
      this.vx *= this.drag;
      this.vy = this.vy * this.drag + this.gravity;
      this.swayPhase += this.swaySpeed;
      this.x += this.vx + Math.sin(this.swayPhase) * 0.7;
      this.y += this.vy;
      this.rotation += this.rotSpeed;
      this.flip += this.flipSpeed;
      this.alpha -= this.decay;
    }

    draw(c) {
      if (this.alpha <= 0) return;
      c.save();
      c.translate(this.x, this.y);
      c.rotate(this.rotation);
      c.scale(Math.cos(this.flip), 1);
      c.globalAlpha = Math.max(0, this.alpha);

      if (this.isDiamond) {
        c.fillStyle = this.color;
        c.beginPath();
        c.moveTo(0, -this.h / 2);
        c.lineTo(this.w / 2, 0);
        c.lineTo(0, this.h / 2);
        c.lineTo(-this.w / 2, 0);
        c.closePath();
        c.fill();
        c.fillStyle = 'rgba(255, 255, 255, 0.75)';
        c.fillRect(-1, -this.h / 4, 2, this.h / 2);
      } else {
        c.fillStyle = this.color;
        c.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
        c.fillStyle = 'rgba(255, 255, 255, 0.65)';
        c.fillRect(-this.w / 2, -this.h / 2, this.w * 0.42, this.h);
      }
      c.restore();
    }
  }

  class FireworkSpark {
    constructor(x, y, vx, vy, color, options) {
      const opt = options || {};
      this.x = x;
      this.y = y;
      this.prevX = x;
      this.prevY = y;
      this.vx = vx;
      this.vy = vy;
      this.color = color;
      this.gravity = opt.gravity !== undefined ? opt.gravity : 0.065;
      this.drag = opt.drag !== undefined ? opt.drag : 0.955;
      this.alpha = 1;
      this.decay = opt.decay !== undefined ? opt.decay : (0.016 + Math.random() * 0.012);
      this.lineWidth = opt.lineWidth || (2.4 + Math.random() * 1.6);
      this.isCrossette = !!opt.isCrossette;
      this.hasSplit = false;
      this.splitTime = 16 + Math.random() * 8;
      this.age = 0;
    }

    update() {
      this.prevX = this.x;
      this.prevY = this.y;
      this.vx *= this.drag;
      this.vy = this.vy * this.drag + this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
      this.age++;

      // Crossette Break: secondary micro-starbursts
      if (this.isCrossette && !this.hasSplit && this.age >= this.splitTime && this.alpha > 0.4) {
        this.hasSplit = true;
        for (let k = 0; k < 3; k++) {
          if (fireworkSparks.length >= MAX_SPARKS) break;
          const kAngle = (k / 3) * Math.PI * 2 + Math.random() * 0.5;
          const kSpeed = 1.4 + Math.random() * 1.8;
          fireworkSparks.push(new FireworkSpark(
            this.x, this.y,
            Math.cos(kAngle) * kSpeed, Math.sin(kAngle) * kSpeed,
            '#ffffff',
            { gravity: 0.05, drag: 0.94, decay: 0.028, lineWidth: 1.8 }
          ));
        }
      }
    }

    draw(c) {
      if (this.alpha <= 0) return;
      const curAlpha = Math.max(0, this.alpha);

      // Photonic luminous motion-blur streak
      c.strokeStyle = this.color;
      c.globalAlpha = curAlpha;
      c.lineWidth = this.lineWidth;
      c.lineCap = 'round';
      c.beginPath();
      c.moveTo(this.prevX, this.prevY);
      c.lineTo(this.x, this.y);
      c.stroke();

      // Diamond stardust glittering core
      c.fillStyle = '#ffffff';
      c.globalAlpha = curAlpha * 0.95;
      c.fillRect(this.x - 1.4, this.y - 1.4, 2.8, 2.8);

      // Saturated outer radiant aura
      c.fillStyle = this.color;
      c.globalAlpha = curAlpha * 0.45;
      c.fillRect(this.x - 3, this.y - 3, 6, 6);
    }
  }

  class FireworkRocket {
    constructor(startX, startY, targetX, targetY, color, burstType) {
      this.x = startX;
      this.y = startY;
      this.prevX = startX;
      this.prevY = startY;
      this.targetX = targetX;
      this.targetY = targetY;
      this.color = color;
      this.burstType = burstType;
      const flightTime = 30 + Math.random() * 10;
      this.vx = (targetX - startX) / flightTime;
      this.vy = (targetY - startY) / flightTime;
      this.gravity = 0.05;
      this.isDead = false;
      this.age = 0;
      this.maxAge = flightTime;
    }

    update() {
      this.prevX = this.x;
      this.prevY = this.y;
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.age++;

      if (this.age >= this.maxAge || this.y <= this.targetY) {
        this.isDead = true;
      }
    }

    draw(c) {
      if (this.isDead) return;
      c.strokeStyle = this.color;
      c.globalAlpha = 0.85;
      c.lineWidth = 3.2;
      c.lineCap = 'round';
      c.beginPath();
      c.moveTo(this.prevX, this.prevY);
      c.lineTo(this.x, this.y);
      c.stroke();

      // Brilliant diamond comet head
      c.fillStyle = '#ffffff';
      c.globalAlpha = 1;
      c.beginPath();
      c.arc(this.x, this.y, 3, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = this.color;
      c.globalAlpha = 0.55;
      c.beginPath();
      c.arc(this.x, this.y, 6.5, 0, Math.PI * 2);
      c.fill();
    }
  }

  class ShootingStar {
    constructor(w, h) {
      this.x = Math.random() * (w * 0.75);
      this.y = Math.random() * (h * 0.35);
      this.prevX = this.x;
      this.prevY = this.y;
      const angle = Math.PI * (0.12 + Math.random() * 0.16); // Gentle downward diagonal
      const speed = 14 + Math.random() * 8;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;
      this.decay = 0.024 + Math.random() * 0.012;
      this.color = Math.random() > 0.5 ? '#38bdf8' : '#fbbf24';
    }

    update() {
      this.prevX = this.x;
      this.prevY = this.y;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }

    draw(c) {
      if (this.alpha <= 0) return;
      c.strokeStyle = this.color;
      c.globalAlpha = Math.max(0, this.alpha);
      c.lineWidth = 2.4;
      c.lineCap = 'round';
      c.beginPath();
      c.moveTo(this.prevX, this.prevY);
      c.lineTo(this.x, this.y);
      c.stroke();

      // Comet head
      c.fillStyle = '#ffffff';
      c.globalAlpha = Math.max(0, this.alpha * 0.95);
      c.fillRect(this.x - 1.5, this.y - 1.5, 3, 3);
    }
  }

  function detonateFirework(x, y, burstType, explicitColor) {
    let type = burstType;
    if (type === undefined || type === null) {
      type = Math.floor(Math.random() * 6);
    }
    const baseColor = explicitColor || JEWEL_COLORS[Math.floor(Math.random() * JEWEL_COLORS.length)];

    if (type === 0) {
      // 0: Supernova Chrysanthemum (Dual-Ring Symmetrical Stardust Bloom)
      const sparkCount = window.innerWidth < 768 ? 24 : 36;
      for (let i = 0; i < sparkCount; i++) {
        if (fireworkSparks.length >= MAX_SPARKS) fireworkSparks.shift();
        const angle = (i / sparkCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.12;
        const speed = 2.8 + Math.random() * 4.2;
        const c = i % 2 === 0 ? baseColor : JEWEL_COLORS[(i + 2) % JEWEL_COLORS.length];
        fireworkSparks.push(new FireworkSpark(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, c));
      }
    } else if (type === 1) {
      // 1: Weeping Willow Kamuro (Glittering Cascading Streamers)
      const sparkCount = window.innerWidth < 768 ? 20 : 32;
      for (let i = 0; i < sparkCount; i++) {
        if (fireworkSparks.length >= MAX_SPARKS) fireworkSparks.shift();
        const angle = (i / sparkCount) * Math.PI * 2;
        const speed = 2.0 + Math.random() * 3.6;
        const c = Math.random() > 0.4 ? '#fbbf24' : '#f43f5e';
        fireworkSparks.push(new FireworkSpark(
          x, y, Math.cos(angle) * speed, Math.sin(angle) * speed - 1.2, c,
          { gravity: 0.085, drag: 0.965, decay: 0.012 }
        ));
      }
    } else if (type === 2) {
      // 2: Prismatic Stardust Confetti Celebration
      const count = window.innerWidth < 768 ? 16 : 26;
      for (let i = 0; i < count; i++) {
        if (confettiParticles.length >= MAX_CONFETTI) confettiParticles.shift();
        const c = JEWEL_COLORS[i % JEWEL_COLORS.length];
        confettiParticles.push(new ConfettiFoil(x, y, c));
      }
      for (let s = 0; s < 14; s++) {
        if (fireworkSparks.length >= MAX_SPARKS) fireworkSparks.shift();
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.2 + Math.random() * 3.4;
        fireworkSparks.push(new FireworkSpark(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, '#ffffff'));
      }
    } else if (type === 3) {
      // 3: The Spiral Galaxy Pinwheel (Swirling Archimedean Nebula)
      const armCount = 4;
      const sparksPerArm = window.innerWidth < 768 ? 6 : 9;
      for (let arm = 0; arm < armCount; arm++) {
        const armAngle = (arm / armCount) * Math.PI * 2;
        const armColor = JEWEL_COLORS[(arm * 2) % JEWEL_COLORS.length];
        for (let i = 0; i < sparksPerArm; i++) {
          if (fireworkSparks.length >= MAX_SPARKS) fireworkSparks.shift();
          const progress = (i + 1) / sparksPerArm;
          const theta = armAngle + progress * 1.6; // spiral curve
          const radialSpeed = progress * 4.4;
          const vx = Math.cos(theta) * radialSpeed;
          const vy = Math.sin(theta) * radialSpeed;
          fireworkSparks.push(new FireworkSpark(x, y, vx, vy, armColor, { drag: 0.96, decay: 0.016 }));
        }
      }
    } else if (type === 4) {
      // 4: The Crossette Star-Split (Primary comets that fragment into secondary clusters)
      const cometCount = window.innerWidth < 768 ? 10 : 16;
      for (let i = 0; i < cometCount; i++) {
        if (fireworkSparks.length >= MAX_SPARKS) fireworkSparks.shift();
        const angle = (i / cometCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.15;
        const speed = 3.6 + Math.random() * 2.2;
        fireworkSparks.push(new FireworkSpark(
          x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, baseColor,
          { isCrossette: true, decay: 0.014, lineWidth: 2.8 }
        ));
      }
    } else {
      // 5: Saturn Planetary Orbital Ring Nova
      const ringCount = window.innerWidth < 768 ? 20 : 30;
      const tiltAngle = Math.PI * 0.15; // tilted planetary ring
      for (let i = 0; i < ringCount; i++) {
        if (fireworkSparks.length >= MAX_SPARKS) fireworkSparks.shift();
        const angle = (i / ringCount) * Math.PI * 2;
        const rawX = Math.cos(angle) * 4.6;
        const rawY = Math.sin(angle) * 2.0; // Elliptical ring
        const vx = rawX * Math.cos(tiltAngle) - rawY * Math.sin(tiltAngle);
        const vy = rawX * Math.sin(tiltAngle) + rawY * Math.cos(tiltAngle);
        fireworkSparks.push(new FireworkSpark(x, y, vx, vy, baseColor, { drag: 0.95, decay: 0.016 }));
      }
      // Glowing planetary center core
      for (let i = 0; i < 8; i++) {
        if (fireworkSparks.length >= MAX_SPARKS) fireworkSparks.shift();
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.2 + Math.random() * 1.2;
        fireworkSparks.push(new FireworkSpark(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, '#ffffff', { decay: 0.02 }));
      }
    }
  }

  function launchRocket(explicitX, explicitTargetY) {
    if (document.documentElement.getAttribute('data-theme') !== 'dark') return;
    if (fireworkRockets.length >= 2) return; // Up to 2 concurrent rockets

    const startX = explicitX !== undefined ? explicitX : width * (0.15 + Math.random() * 0.70);
    const startY = height + 10;
    const targetX = startX + (Math.random() - 0.5) * (width * 0.28);
    const targetY = explicitTargetY !== undefined ? explicitTargetY : height * (0.16 + Math.random() * 0.38);
    const c = JEWEL_COLORS[Math.floor(Math.random() * JEWEL_COLORS.length)];
    const burstType = Math.floor(Math.random() * 6);

    fireworkRockets.push(new FireworkRocket(startX, startY, targetX, targetY, c, burstType));
  }

  // Active rocket cadence & Twin Salvos
  let lastRocketTime = 0;
  let nextRocketInterval = 1800 + Math.random() * 1400; // Continuous celebratory rhythm

  // Shooting star cadence
  let lastShootingStarTime = 0;
  let nextShootingStarInterval = 3800 + Math.random() * 3200;

  // Click interaction: detonates fireworks in Dark Theme or creates breeze gust in Light Theme
  window.addEventListener('pointerdown', (e) => {
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      detonateFirework(e.clientX, e.clientY);
    } else {
      leaves.forEach(leaf => leaf.applyImpulse(e.clientX, e.clientY, 8));
    }
  });

  window.triggerFireworkBurst = function(x, y, burstType, color) {
    detonateFirework(x, y, burstType, color);
  };

  window.triggerThemeShockwave = function(cx, cy, targetTheme) {
    const endRadius = Math.hypot(
      Math.max(cx, width - cx),
      Math.max(cy, height - cy)
    );

    // Primary Quantum Sonic Ring
    themeShockwaves.push({
      x: cx,
      y: cy,
      radius: 0,
      targetRadius: endRadius * 1.05,
      speed: 36,
      color: targetTheme === 'dark' ? '#a78bfa' : '#fbbf24',
      secondaryColor: targetTheme === 'dark' ? '#f43f5e' : '#ffd98e',
      alpha: 1.0,
      lineWidth: 4.5
    });

    // Secondary trailing chromatic ring
    themeShockwaves.push({
      x: cx,
      y: cy,
      radius: -20,
      targetRadius: endRadius * 1.02,
      speed: 32,
      color: targetTheme === 'dark' ? '#38bdf8' : '#e11d48',
      secondaryColor: targetTheme === 'dark' ? '#a78bfa' : '#f59e0b',
      alpha: 0.85,
      lineWidth: 2.5
    });

    // Concentric spark micro-burst along the expanding perimeter
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      const speed = 2.0 + Math.random() * 4.5;
      fireworkSparks.push(new FireworkSpark(
        cx,
        cy,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
        targetTheme === 'dark' ? (Math.random() > 0.5 ? '#a78bfa' : '#38bdf8') : (Math.random() > 0.5 ? '#fbbf24' : '#e11d48')
      ));
    }
  };

  window.triggerThemeFxSwitch = function(theme, clickEvent) {
    const cx = clickEvent && clickEvent.clientX != null ? clickEvent.clientX : width / 2;
    const cy = clickEvent && clickEvent.clientY != null ? clickEvent.clientY : height * 0.35;

    if (typeof window.triggerThemeShockwave === 'function') {
      window.triggerThemeShockwave(cx, cy, theme);
    }

    if (theme === 'dark') {
      detonateFirework(cx, cy, 2); // Confetti fanfare
      setTimeout(() => {
        detonateFirework(width * 0.28, height * 0.25, 0, '#f43f5e'); // Supernova
      }, 140);
      setTimeout(() => {
        detonateFirework(width * 0.72, height * 0.25, 3, '#a78bfa'); // Spiral Galaxy
      }, 280);
      setTimeout(() => {
        detonateFirework(width * 0.50, height * 0.18, 5, '#fbbf24'); // Saturn Ring
      }, 420);
    } else {
      leaves.forEach(leaf => leaf.applyImpulse(cx, cy, 14));
    }
  };

  // Hero circular stamp interaction
  const stamp = document.querySelector('.floating-stamp-badge');
  if (stamp) {
    stamp.addEventListener('click', (e) => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        detonateFirework(e.clientX, e.clientY, 3); // Spiral Galaxy burst!
      } else {
        leaves.forEach(leaf => leaf.applyImpulse(e.clientX, e.clientY, 10));
      }
      if (typeof triggerSparkleBurst === 'function') triggerSparkleBurst(e.clientX, e.clientY);
      if (typeof playTone === 'function') {
        playTone(880, 'sine', 0.16, 0.22);
        setTimeout(() => playTone(1320, 'sine', 0.14, 0.18), 70);
      }
      if (typeof showToast === 'function') showToast('✦ Data Engine & Creative ML Powered ✦');
    });
  }

  // -------------------------------------------------------------------------
  // High-Speed 60 FPS Render Loop
  // -------------------------------------------------------------------------
  let ambientTime = 0;

  function renderLoop() {
    if (document.hidden) {
      requestAnimationFrame(renderLoop);
      return;
    }
    ambientTime++;
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    if (!isDark) {
      // LIGHT THEME: Kyoto Autumn Leaves Simulation
      ctx.globalCompositeOperation = 'source-over';
      const ambientWindX = Math.sin(ambientTime * 0.0008) * 0.45 + 0.35;
      for (let i = 0; i < leaves.length; i++) {
        leaves[i].update(ambientWindX, mouseX, mouseY);
        leaves[i].draw(ctx);
      }
    } else {
      // DARK THEME: Celestial Fireworks & Prismatic Confetti
      const now = Date.now();

      // Launch rockets with active cadence and occasional twin salvos
      if (now - lastRocketTime > nextRocketInterval) {
        lastRocketTime = now;
        nextRocketInterval = 1800 + Math.random() * 1400;

        const isTwinSalvo = Math.random() > 0.72;
        if (isTwinSalvo) {
          launchRocket(width * 0.28, height * (0.16 + Math.random() * 0.28));
          setTimeout(() => {
            launchRocket(width * 0.72, height * (0.16 + Math.random() * 0.28));
          }, 180);
        } else {
          launchRocket();
        }
      }

      // Launch occasional shooting star
      if (now - lastShootingStarTime > nextShootingStarInterval) {
        lastShootingStarTime = now;
        nextShootingStarInterval = 3800 + Math.random() * 3200;
        if (shootingStars.length < 2) {
          shootingStars.push(new ShootingStar(width, height));
        }
      }

      // 1. Draw Sparks, Rockets & Shooting Stars with Photonic Luminous Additive Bloom
      ctx.globalCompositeOperation = 'lighter';

      // Shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        star.update();
        star.draw(ctx);
        if (star.alpha <= 0 || star.x > width + 50 || star.y > height + 50) {
          shootingStars.splice(i, 1);
        }
      }

      // Rockets
      for (let i = fireworkRockets.length - 1; i >= 0; i--) {
        const r = fireworkRockets[i];
        r.update();
        r.draw(ctx);
        if (r.isDead) {
          detonateFirework(r.x, r.y, r.burstType, r.color);
          fireworkRockets.splice(i, 1);
        }
      }

      // Sparks
      for (let i = fireworkSparks.length - 1; i >= 0; i--) {
        const s = fireworkSparks[i];
        s.update();
        s.draw(ctx);
        if (s.alpha <= 0) {
          fireworkSparks.splice(i, 1);
        }
      }

      // 2. Draw Metallic Foil Confetti with Crisp Normal Blending & Specular Sheen
      ctx.globalCompositeOperation = 'source-over';

      for (let i = confettiParticles.length - 1; i >= 0; i--) {
        const c = confettiParticles[i];
        c.update();
        c.draw(ctx);
        if (c.alpha <= 0 || c.y > height + 40) {
          confettiParticles.splice(i, 1);
        }
      }
    }

    // Render expanding Quantum Theme Shockwave Rings across both light & dark modes
    if (themeShockwaves.length > 0) {
      for (let i = themeShockwaves.length - 1; i >= 0; i--) {
        const sw = themeShockwaves[i];
        sw.radius += sw.speed;
        sw.speed *= 0.985;
        sw.lineWidth = Math.max(1.2, sw.lineWidth * 0.98);
        sw.alpha = Math.max(0, 1 - (sw.radius / sw.targetRadius));

        if (sw.alpha <= 0.02 || sw.radius >= sw.targetRadius) {
          themeShockwaves.splice(i, 1);
          continue;
        }

        if (sw.radius > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
          ctx.strokeStyle = sw.color;
          ctx.lineWidth = sw.lineWidth;
          ctx.globalAlpha = sw.alpha * 0.75;
          ctx.shadowColor = sw.color;
          ctx.shadowBlur = 18;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(sw.x, sw.y, Math.max(0, sw.radius - 8), 0, Math.PI * 2);
          ctx.strokeStyle = sw.secondaryColor;
          ctx.lineWidth = sw.lineWidth * 0.6;
          ctx.globalAlpha = sw.alpha * 0.45;
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    requestAnimationFrame(renderLoop);
  }

  requestAnimationFrame(renderLoop);
}

/**
 * Magnetic Fluid Cursor with Smooth Lerp Physics
 */
function initCustomCursor() {
  const dot = document.getElementById('custom-cursor-dot');
  const follower = document.getElementById('custom-cursor-follower');
  const label = document.getElementById('cursor-label');
  if (!dot || !follower) return;

  if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) {
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  }, { passive: true });

  window.addEventListener('mousedown', () => {
    follower.classList.add('is-down');
  });

  window.addEventListener('mouseup', () => {
    follower.classList.remove('is-down');
  });

  // Interactive element hover handlers
  document.querySelectorAll('.key').forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.classList.add('is-key-hover');
      if (label) label.textContent = 'PRESS';
    });
    el.addEventListener('mouseleave', () => {
      follower.classList.remove('is-key-hover');
      if (label) label.textContent = '';
    });
  });

  document.querySelectorAll('.project-display-card, .btn-action-primary, .btn-action-secondary').forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.classList.add('is-hovering');
      if (label) label.textContent = 'VIEW';
    });
    el.addEventListener('mouseleave', () => {
      follower.classList.remove('is-hovering');
      if (label) label.textContent = '';
    });
  });

  document.querySelectorAll('a, button, .filter-tab-btn, .dialog-close').forEach(el => {
    if (el.closest('.key') || el.closest('.project-display-card')) return;
    el.addEventListener('mouseenter', () => {
      follower.classList.add('is-hovering');
      if (label) label.textContent = '';
    });
    el.addEventListener('mouseleave', () => {
      follower.classList.remove('is-hovering');
    });
  });

  function loop() {
    followerX += (mouseX - followerX) * 0.18;
    followerY += (mouseY - followerY) * 0.18;
    follower.style.transform = `translate3d(${followerX.toFixed(2)}px, ${followerY.toFixed(2)}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

/**
 * Synthesized Web Audio Mechanical Keyboard Acoustics & Dock Sound System
 */
// Sound variables and getAudioContext hoisted at top level

function initKeyboardAcoustics() {
  const soundBtn = document.getElementById('dock-sound-btn');
  const soundText = document.getElementById('dock-sound-text');
  const soundBars = soundBtn ? soundBtn.querySelector('.dock-sound-bars') : null;

  if (soundBars) soundBars.classList.add('sound-playing');

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  window.addEventListener('click', () => {
    initAudioContext();
  }, { once: true });

  if (soundBtn) {
    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudioContext();
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        if (soundText) soundText.textContent = 'Sound ON';
        if (soundBars) {
          soundBars.classList.remove('sound-muted');
          soundBars.classList.add('sound-playing');
        }
        showToast('Mechanical Keyboard Audio: ON 🔊');
        playKeySound('press');
      } else {
        if (soundText) soundText.textContent = 'Sound OFF';
        if (soundBars) {
          soundBars.classList.remove('sound-playing');
          soundBars.classList.add('sound-muted');
        }
        showToast('Mechanical Keyboard Audio: OFF 🔇');
      }
    });
  }

  document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', (e) => {
      initAudioContext();
      const isEnter = key.classList.contains('key-enter');
      playKeySound(isEnter ? 'enter' : 'press');
      triggerSparkleBurst(e.clientX || key.getBoundingClientRect().left + 50, e.clientY || key.getBoundingClientRect().top + 50);

      // Smoothly navigate to #contact section with welcoming feedback when Enter (LET'S TALK) is tapped
      if (isEnter) {
        const contactSec = document.getElementById('contact');
        if (contactSec && !e.ctrlKey && !e.metaKey && e.button === 0) {
          e.preventDefault();
          contactSec.scrollIntoView({ behavior: 'smooth' });
          if (typeof showToast === 'function') {
            showToast("Let’s connect! Direct email: pradiptakhan005@gmail.com ✉️", 3600);
          }
        }
      }
    });

    key.addEventListener('mouseenter', () => {
      playKeySound('hover');
    });
  });
}

function playKeySound(type) {
  if (typeof type === 'number') {
    return playTone(type, arguments[1] || 'sine', arguments[2] || 0.08, arguments[3] || 0.15);
  }
  if (!soundEnabled || !audioCtx) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  if (type === 'enter') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  } else if (type === 'press') {
    osc.type = 'sine';
    const freq = 360 + Math.random() * 80;
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.05);

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1100, now);
    filter.Q.setValueAtTime(3, now);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  } else if (type === 'hover') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(620, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.02);

    gain.gain.setValueAtTime(0.025, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.025);
  }
}

function triggerSparkleBurst(originX, originY) {
  const colors = ['#ffb7d5', '#c8b6ff', '#b9f2df', '#ffd98e', '#d9f28f', '#d96c9c', '#ffffff'];
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'key-sparkle-particle';
    particle.style.left = `${originX}px`;
    particle.style.top = `${originY}px`;
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 65;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance - 20;
    const rot = Math.random() * 720 - 360;

    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);
    particle.style.setProperty('--rot', `${rot}deg`);

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 720);
  }
}

/**
 * Interactive 3D Perspective Card Tilt & Specular Cursor Spotlight
 */
function initCard3DTilt() {
  const tiltCards = document.querySelectorAll(
    '.project-display-card, .experience-detail-card, .education-full-card, .cert-showcase-card, .skill-domain-card, .social-command-card, .stat-box, .cert-item'
  );

  tiltCards.forEach(card => {
    if (!card.querySelector('.card-spotlight')) {
      const glare = document.createElement('div');
      glare.className = 'card-spotlight';
      glare.setAttribute('aria-hidden', 'true');
      card.appendChild(glare);
    }

    let isTicking = false;
    let latestE = null;

    card.addEventListener('mousemove', (e) => {
      latestE = e;
      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(() => {
          if (latestE) {
            const rect = card.getBoundingClientRect();
            const x = latestE.clientX - rect.left;
            const y = latestE.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4.2;
            const rotateY = ((x - centerX) / centerX) * 4.2;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(4px)`;
            card.style.setProperty('--spot-x', `${x}px`);
            card.style.setProperty('--spot-y', `${y}px`);
          }
          isTicking = false;
        });
      }
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      latestE = null;
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    });
  });
}


function initScrollProgressAndDock() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const dock = document.getElementById('floating-quick-dock');
  const topBtn = document.getElementById('dock-top-btn');
  const zenBtn = document.getElementById('dock-zen-btn');
  const zenOrb = document.getElementById('dock-zen-orb');

  let isDockHovered = false;
  let condenseTimeout = null;
  let scrollTimeout = null;
  let progressTicking = false;

  // 1. Zen Focus Mode (User Collapse / Restore)
  const ZEN_STORAGE_KEY = 'pk_dock_zen';
  function setZenState(isZen, animate = true) {
    if (!dock || !zenOrb) return;
    if (isZen) {
      dock.classList.add('is-zen-collapsed');
      zenOrb.classList.add('is-visible');
      try { sessionStorage.setItem(ZEN_STORAGE_KEY, '1'); } catch (e) {}
      if (animate && typeof playKeySound === 'function') {
        playKeySound(420, 'sine', 0.05);
      }
      if (animate && typeof showToast === 'function') {
        showToast('Zen Focus Mode: Dock minimized (Click ✦ to restore)');
      }
    } else {
      dock.classList.remove('is-zen-collapsed');
      zenOrb.classList.remove('is-visible');
      try { sessionStorage.removeItem(ZEN_STORAGE_KEY); } catch (e) {}
      if (animate && typeof playKeySound === 'function') {
        playKeySound(680, 'sine', 0.05);
      }
      if (animate && typeof showToast === 'function') {
        showToast('Navigation Dock restored');
      }
    }
  }

  // Restore saved Zen state
  try {
    if (sessionStorage.getItem(ZEN_STORAGE_KEY) === '1') {
      setZenState(true, false);
    }
  } catch (e) {}

  if (zenBtn) {
    zenBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setZenState(true, true);
    });
  }

  if (zenOrb) {
    zenOrb.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setZenState(false, true);
    });
  }

  // 2. Hover & Interaction Telemetry
  if (dock) {
    dock.addEventListener('mouseenter', () => {
      isDockHovered = true;
      dock.classList.remove('is-condensed');
      clearTimeout(condenseTimeout);
    });
    dock.addEventListener('mouseleave', () => {
      isDockHovered = false;
      if (window.scrollY > 120 && window.innerWidth > 768) {
        clearTimeout(condenseTimeout);
        condenseTimeout = setTimeout(() => {
          if (window.scrollY > 120 && !isDockHovered) {
            dock.classList.add('is-condensed');
          }
        }, 1200);
      }
    });
  }

  function updateScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent.toFixed(1)}%`;
    }

    if (dock) {
      if (scrollTop > 100) {
        dock.classList.add('is-scrolled');
      } else {
        dock.classList.remove('is-scrolled');
      }

      // Dynamic Island Auto-Condense: Tucks into aerodynamic pill while navigating
      if (scrollTop > 120) {
        dock.classList.add('is-condensed');
      } else if (!isDockHovered && window.innerWidth > 768) {
        dock.classList.remove('is-condensed');
      }
    }
  }

  window.addEventListener('scroll', () => {
    if (!progressTicking) {
      requestAnimationFrame(() => {
        updateScroll();
        progressTicking = false;
      });
      progressTicking = true;
    }
    if (dock) {
      dock.classList.add('is-scrolling');
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        dock.classList.remove('is-scrolling');
      }, 200);

      // Auto-expand after user stops scrolling for 2 seconds (desktop only)
      if (window.innerWidth > 768) {
        clearTimeout(condenseTimeout);
        condenseTimeout = setTimeout(() => {
          if (!isDockHovered && window.scrollY > 120) {
            dock.classList.remove('is-condensed');
          }
        }, 2200);
      }
    }
  }, { passive: true });
  updateScroll();

  // 3. Smart Footer Clearance Observer
  const footer = document.querySelector('.site-footer');
  if (footer && 'IntersectionObserver' in window && dock) {
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          dock.classList.add('is-docked-footer');
          if (zenOrb) zenOrb.classList.add('is-docked-footer');
        } else {
          dock.classList.remove('is-docked-footer');
          if (zenOrb) zenOrb.classList.remove('is-docked-footer');
        }
      });
    }, { threshold: 0.08 });
    footerObserver.observe(footer);
  }

  // 4. Smart Modal & Overlay Auto-Hide Watcher
  function checkOpenModals() {
    if (!dock) return;
    const hasOpenDialog = !!document.querySelector('dialog[open]');
    const hasOpenChat = !!document.querySelector('.ai-chat-window.is-open');
    const hasOpenDrawer = !!document.querySelector('#mobile-nav-drawer.is-open');
    if (hasOpenDialog || hasOpenChat || hasOpenDrawer) {
      dock.classList.add('is-hidden-by-modal');
      if (zenOrb) zenOrb.classList.add('is-hidden-by-modal');
    } else {
      dock.classList.remove('is-hidden-by-modal');
      if (zenOrb) zenOrb.classList.remove('is-hidden-by-modal');
    }
  }

  // Hook into dialog lifecycle events & clicks seamlessly with zero CPU load
  document.querySelectorAll('dialog').forEach(d => {
    d.addEventListener('close', checkOpenModals);
    d.addEventListener('cancel', checkOpenModals);
  });
  window.addEventListener('click', () => {
    requestAnimationFrame(checkOpenModals);
  }, { passive: true });
  window.addEventListener('modalStateChange', checkOpenModals);

  if (topBtn) {
    topBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const footerTopBtn = document.getElementById('footer-back-to-top');
  if (footerTopBtn) {
    footerTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Centered Smooth Scroll for Keys button in Floating Dock
  const dockKeysBtn = document.getElementById('dock-keys-btn') || document.querySelector('.floating-quick-dock a[href="#keyboard-interactive-section"]');
  if (dockKeysBtn) {
    dockKeysBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const kbd = document.getElementById('keyboard-interactive-section');
      if (kbd) {
        kbd.scrollIntoView({ behavior: 'smooth', block: 'center' });
        playKeySound(540, 'sine', 0.12);
        if (history.pushState) {
          history.pushState(null, null, '#keyboard-interactive-section');
        }
      }
    });
  }

  const emailCards = document.querySelectorAll('#contact-email, #dialog-social-email-card, #contact-copy-btn');
  emailCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (card.id === 'contact-copy-btn') {
        e.preventDefault();
      }
      const emailToCopy = (typeof CONFIG !== 'undefined' && CONFIG.email) ? CONFIG.email : 'pradiptakhan005@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailToCopy).then(() => {
          if (typeof playAssistantSound === 'function') playAssistantSound('open');
          showToast(`Copied ${emailToCopy} to clipboard! 📋✨`);
          const label = card.querySelector('.copy-label');
          if (label) {
            const orig = label.textContent;
            label.textContent = 'Copied! ✓';
            setTimeout(() => { label.textContent = orig; }, 2200);
          }
        }).catch(() => {
          showToast(`Direct email: ${emailToCopy} ✉️`);
        });
      } else {
        showToast(`Direct email: ${emailToCopy} ✉️`);
      }
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('toast-notification');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-shown');
  clearTimeout(toast.__timeout);
  toast.__timeout = setTimeout(() => {
    toast.classList.remove('is-shown');
  }, 2800);
}

/**
 * Metric Number Interpolation & Metric Easing
 */
function initNumberCounters() {
  const counterElements = [
    { selector: '.exp-highlight-pill', target: 91, suffix: '% Validation Score', decimals: 0 },
    { selector: '.edu-full-card.featured-edu .edu-grade-pill', target: 7.91, suffix: ' CGPA', decimals: 2 },
    { selector: '.edu-cards-grid .education-full-card:nth-child(2) .edu-grade-pill', target: 92.6, suffix: '% Distinction', decimals: 1 },
    { selector: '.edu-cards-grid .education-full-card:nth-child(3) .edu-grade-pill', target: 84.43, suffix: '% First Division', decimals: 2 }
  ];

  if (!('IntersectionObserver' in window)) return;

  counterElements.forEach(item => {
    const el = document.querySelector(item.selector);
    if (!el) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          obs.unobserve(entry.target);
          animateCount(el, 0, item.target, item.decimals, item.suffix);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(el);
  });

  function animateCount(el, start, end, decimals, suffix) {
    const duration = 1400;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * ease;
      el.textContent = `${current.toFixed(decimals)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }
}

/**
 * Bi-Directional Viewport Ingress Engine
 * Hardware-composited reveal choreography with zero layout thrashing
 */
function initScrollReveals() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll(
      '.editorial-section, .reveal-item, .reveal-card, .reveal-header'
    ).forEach(el => el.classList.add('is-revealed', 'is-active-section'));
    return;
  }

  // 1. Tag Section Containers with futuristic top laser line (structural only, never opacity: 0)
  const sections = document.querySelectorAll(
    '.projects-showcase-section, .experience-full-section, .education-full-section, .certifications-full-section, .skills-showcase-section, .about-profile-section, .contact-section'
  );
  sections.forEach(sec => {
    sec.classList.add('editorial-section');
    if (!sec.querySelector('.section-active-border')) {
      const border = document.createElement('div');
      border.className = 'section-active-border';
      border.setAttribute('aria-hidden', 'true');
      sec.prepend(border);
    }
  });

  // Track active section for laser border & dock synchronization
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-active-section');
      } else {
        entry.target.classList.remove('is-active-section');
      }
    });
  }, {
    threshold: 0.12
  });
  sections.forEach(sec => sectionObserver.observe(sec));

  // 2. Granular Content Elements to Animate
  const headers = document.querySelectorAll(
    '.section-header-row, .section-header-center, .contact-header'
  );
  headers.forEach(h => {
    h.classList.add('reveal-header');
  });

  // 3. Staggered Cascades for Card Grids
  const cardContainers = [
    '.projects-grid',
    '.experience-timeline-container',
    '.education-cards-grid',
    '.certifications-gallery-grid',
    '.skills-domain-grid',
    '.profile-card-grid'
  ];
  cardContainers.forEach(containerSel => {
    const container = document.querySelector(containerSel);
    if (!container) return;
    Array.from(container.children).forEach((card, idx) => {
      card.classList.add('reveal-card');
      card.style.setProperty('--reveal-stagger', `${(idx % 4) * 0.05}s`);
    });
  });

  // 4. Interactive Items
  document.querySelectorAll('.filter-tab-bar, .contact-card-box, .contact-social-pills').forEach(item => {
    item.classList.add('reveal-item');
  });

  const revealElements = document.querySelectorAll('.reveal-header, .reveal-card, .reveal-item');
  const vh = window.innerHeight || document.documentElement.clientHeight;

  // Initial prime based on current viewport coordinates
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < vh && rect.bottom > 0) {
      // Already in viewport on load: reveal immediately with zero delay
      el.classList.add('is-revealed');
    } else if (rect.top >= vh) {
      // Below viewport: prime for upward ingress (scrolling down)
      el.classList.add('ingress-up');
    } else {
      // Above viewport: prime for downward ingress (scrolling up)
      el.classList.add('ingress-down');
    }
  });

  // 5. High-Precision Bi-Directional Intersection Observer
  // With 140px rootMargin, priming and unrevealing occur completely offscreen
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const target = entry.target;
      const rect = entry.boundingClientRect;
      const currentVh = window.innerHeight || document.documentElement.clientHeight;

      if (entry.isIntersecting) {
        // Ensure ingress class matches entry side if transitioning from offscreen
        if (rect.top > (currentVh * 0.5)) {
          target.classList.remove('ingress-down');
          target.classList.add('ingress-up');
        } else {
          target.classList.remove('ingress-up');
          target.classList.add('ingress-down');
        }
        // Micro-turn animation on GPU compositor
        requestAnimationFrame(() => {
          target.classList.add('is-revealed');
        });
      } else {
        // Exited outside rootMargin (140px offscreen) - reset for next directional pass
        target.classList.remove('is-revealed');
        if (rect.top >= currentVh) {
          // Below the visible window: ready to glide UP when scrolling down
          target.classList.remove('ingress-down');
          target.classList.add('ingress-up');
        } else if (rect.bottom <= 0) {
          // Above the visible window: ready to glide DOWN when scrolling up
          target.classList.remove('ingress-up');
          target.classList.add('ingress-down');
        }
      }
    });
  }, {
    rootMargin: '140px 0px 140px 0px',
    threshold: 0
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * Editorial Preloader: Kinetic Multilingual Greeting & Keyboard Deck
 */
function initPreloader() {
  const preloader = document.getElementById('site-preloader');
  const counterEl = document.getElementById('preloader-counter');
  const lineBar = document.getElementById('preloader-line-bar');
  const statusEl = document.getElementById('preloader-status-text');
  const clockEl = document.getElementById('preloader-clock');
  const curvePath = document.getElementById('preloader-curve-path');
  const words = document.querySelectorAll('.preloader-word');
  const keycaps = document.querySelectorAll('.preloader-keycap');
  const canvas = document.getElementById('preloader-ambient-canvas');
  const langIndicator = document.getElementById('preloader-lang-indicator');
  const langCodeEl = document.getElementById('preloader-lang-code');
  const langNativeEl = document.getElementById('preloader-lang-native');
  const greetingViewport = document.querySelector('.preloader-greeting-viewport');
  const soundBtn = document.getElementById('preloader-sound-btn');
  const soundLabel = document.getElementById('preloader-sound-label');
  const skipBtn = document.getElementById('preloader-skip-btn');

  if (!preloader || !counterEl) {
    document.body.classList.add('is-page-ready');
    return;
  }

  let isDismissed = false;
  let activeWordIdx = 0;
  let pressedKeyCount = 0;
  let currentKeyIdx = -1;
  let bonusProgress = 0;
  let canvasAnimId = null;

  // Fail-safe watchdog: under no circumstance should the user ever be trapped on preloader screen
  const safetyWatchdog = setTimeout(() => {
    if (!isDismissed) {
      console.warn('[Preloader] Watchdog triggered dismiss fallback');
      dismiss();
    }
  }, 4800);

  // Sound is strictly ON by default
  soundEnabled = true;

  const updateSoundUI = () => {
    if (soundLabel) soundLabel.textContent = soundEnabled ? 'SOUND: ON' : 'SOUND: MUTED';
    if (soundBtn) soundBtn.classList.toggle('is-muted', !soundEnabled);
  };
  updateSoundUI();

  // Instant AudioContext activation on earliest gesture or micro-movement
  const primeAudioContext = () => {
    try {
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().then(updateSoundUI).catch(() => {});
      }
    } catch (e) {}
  };
  primeAudioContext();

  const wakeEvents = ['pointerdown', 'mousedown', 'keydown', 'touchstart', 'pointermove'];
  wakeEvents.forEach((evt) => {
    window.addEventListener(evt, primeAudioContext, { once: true, passive: true });
  });

  if (soundBtn) {
    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      primeAudioContext();
      soundEnabled = !soundEnabled;
      updateSoundUI();
      if (soundEnabled) {
        playMechanicalThock(Math.max(0, currentKeyIdx));
      }
    });
  }

  // Cultural Halo Aura Colors for Each Language
  const langHalos = [
    'rgba(255, 183, 213, 0.12)', // Hindi (Rose)
    'rgba(255, 217, 142, 0.14)', // Bengali (Amber Gold)
    'rgba(200, 182, 255, 0.12)', // Japanese (Lavender)
    'rgba(169, 221, 255, 0.12)', // French (Azure)
    'rgba(255, 195, 160, 0.14)', // Spanish (Coral)
    'rgba(255, 133, 184, 0.14)', // Mandarin (Crimson Rose)
    'rgba(127, 240, 200, 0.14)', // Italian (Emerald Mint)
    'rgba(198, 215, 255, 0.12)', // English (Ice Blue)
    'rgba(255, 228, 70, 0.18)',  // Welcome (Iridescent Gold)
    'rgba(255, 133, 184, 0.20)'  // Mr. P.K. (Electric Pink)
  ];

  // 1. Spatial ASMR Mechanical Keyboard "Thock" Synthesizer (Musical Lydian Scale + Stereo Panning)
  // Pure Web Audio internal hardware clock with analog biquad lowpass damping - ZERO setTimeout drift!
  const keyFrequencies = [
    261.63, // P  (C4)
    293.66, // O  (D4)
    329.63, // R  (E4)
    392.00, // T  (G4)
    440.00, // F  (A4)
    523.25, // O  (C5)
    587.33, // L  (D5)
    659.25, // I  (E5)
    783.99, // O  (G5)
    880.00  // ↵  (A5)
  ];

  function playMechanicalThock(index = 0) {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
        return;
      }
      const now = ctx.currentTime;

      // Spatial stereo audio positioning from left to right (-0.75 to +0.75)
      const panVal = Math.max(-0.75, Math.min(0.75, ((index / 9) * 2 - 1) * 0.75));
      let panner = null;
      if (ctx.createStereoPanner) {
        try {
          panner = ctx.createStereoPanner();
          panner.pan.setValueAtTime(panVal, now);
          panner.connect(ctx.destination);
        } catch (e) {
          panner = null;
        }
      }
      const outNode = panner || ctx.destination;

      // Master voice gain
      const voiceGain = ctx.createGain();
      voiceGain.gain.setValueAtTime(1.0, now);

      // Analog switch damping filter (swept lowpass for authentic lubed acoustic thock)
      if (ctx.createBiquadFilter) {
        try {
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(2600, now);
          filter.frequency.exponentialRampToValueAtTime(800, now + 0.08);
          filter.Q.setValueAtTime(2.2, now);
          voiceGain.connect(filter);
          filter.connect(outNode);
        } catch (e) {
          voiceGain.connect(outNode);
        }
      } else {
        voiceGain.connect(outNode);
      }
      const voiceDest = voiceGain;

      // 1. Downstroke high-frequency transient tactile click (lubricated switch stem)
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = 'triangle';
      const snapPitch = 2400 + (index * 60);
      clickOsc.frequency.setValueAtTime(snapPitch, now);
      clickOsc.frequency.exponentialRampToValueAtTime(800, now + 0.012);
      clickGain.gain.setValueAtTime(0.12, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.012);
      clickOsc.connect(clickGain);
      clickGain.connect(voiceDest);
      clickOsc.start(now);
      clickOsc.stop(now + 0.012);

      // 2. Resonant musical Lydian pitch body (clean bell harmonic)
      const freq = keyFrequencies[index % keyFrequencies.length];
      const bodyOsc = ctx.createOscillator();
      const bodyGain = ctx.createGain();
      bodyOsc.type = 'sine';
      bodyOsc.frequency.setValueAtTime(freq, now);
      bodyOsc.frequency.exponentialRampToValueAtTime(freq * 0.98, now + 0.08);
      bodyGain.gain.setValueAtTime(0.10, now);
      bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.10);
      bodyOsc.connect(bodyGain);
      bodyGain.connect(voiceDest);
      bodyOsc.start(now);
      bodyOsc.stop(now + 0.10);

      // 3. Ethereal crystal overtone (octave chime)
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(freq * 2, now);
      chimeGain.gain.setValueAtTime(0.035, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
      chimeOsc.connect(chimeGain);
      chimeGain.connect(voiceDest);
      chimeOsc.start(now);
      chimeOsc.stop(now + 0.14);

      // 4. Resonant bottom-out "thock" thud (solid keyboard housing)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(145, now);
      subOsc.frequency.exponentialRampToValueAtTime(55, now + 0.04);
      subGain.gain.setValueAtTime(0.15, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      subOsc.connect(subGain);
      subGain.connect(voiceDest);
      subOsc.start(now);
      subOsc.stop(now + 0.04);

      // 5. Upstroke mechanical spring return acoustic pop (PURE Web Audio clock - zero setTimeout!)
      const upTime = now + 0.036;
      const upOsc = ctx.createOscillator();
      const upGain = ctx.createGain();
      upOsc.type = 'triangle';
      upOsc.frequency.setValueAtTime(3200, upTime);
      upOsc.frequency.exponentialRampToValueAtTime(1600, upTime + 0.010);
      upGain.gain.setValueAtTime(0.0001, now);
      upGain.gain.setValueAtTime(0.04, upTime);
      upGain.gain.exponentialRampToValueAtTime(0.0001, upTime + 0.010);
      upOsc.connect(upGain);
      upGain.connect(voiceDest);
      upOsc.start(upTime);
      upOsc.stop(upTime + 0.010);
    } catch (e) {}
  }

  function playCurtainChime() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx || ctx.state !== 'running') return;
      const now = ctx.currentTime;
      // Ethereal Pentatonic Chord Bloom
      const notes = [261.63, 329.63, 392.00, 493.88, 523.25, 659.25, 783.99];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const noteTime = now + idx * 0.038;
        osc.frequency.setValueAtTime(freq, noteTime);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.setValueAtTime(0.08, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.7);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(noteTime);
        osc.stop(noteTime + 0.7);
      });
    } catch (e) {}
  }

  // 2. High-Performance Lightweight Ambient Canvas (Silky 120 FPS, Zero CPU/GPU Lag)
  let cleanupCanvas = () => {};
  const ripples = [];
  const sparkles = [];
  const deck = document.getElementById('preloader-keycaps');
  let currentTiltX = 0, currentTiltY = 0;
  let targetTiltX = 0, targetTiltY = 0;

  function createKeySparkles(x, y, color) {
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.2 + Math.random() * 3.5;
      sparkles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.0,
        size: 1.2 + Math.random() * 1.8,
        color: Math.random() > 0.4 ? color : '#ffd98e',
        alpha: 1.0,
        decay: 0.03 + Math.random() * 0.02
      });
    }
  }

  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Mouse tracking for interactive ambient aura & 3D keyboard deck perspective tilt
    let mouseX = width / 2;
    let mouseY = height / 2;
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetTiltX = -ny * 7.0;
      targetTiltY = nx * 8.5;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Lightweight Stardust Particles (28 embers - buttery smooth)
    const embers = [];
    const emberColors = ['#ffb7d5', '#c8b6ff', '#b9f2df', '#ffd98e', '#a9ddff'];
    for (let i = 0; i < 28; i++) {
      embers.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: 1.0 + Math.random() * 2.0,
        color: emberColors[i % emberColors.length],
        alpha: 0.3 + Math.random() * 0.4
      });
    }

    function renderAmbientCanvas() {
      if (isDismissed && ripples.length === 0 && sparkles.length === 0) return;
      ctx.clearRect(0, 0, width, height);

      // Interactive 3D Perspective Tilt on Mechanical Keyboard Deck
      if (deck && !isDismissed) {
        currentTiltX += (targetTiltX - currentTiltX) * 0.12;
        currentTiltY += (targetTiltY - currentTiltY) * 0.12;
        deck.style.transform = `perspective(1000px) rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg)`;
      }

      // Soft interactive mouse ambient glow (GPU fast radial gradient)
      const auraGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 280);
      auraGrad.addColorStop(0, 'rgba(255, 183, 213, 0.06)');
      auraGrad.addColorStop(0.5, 'rgba(200, 182, 255, 0.025)');
      auraGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = auraGrad;
      ctx.fillRect(0, 0, width, height);

      // Precision Blueprint HUD Corner Reticles
      ctx.save();
      const cornerSize = 14;
      ctx.strokeStyle = 'rgba(127, 240, 200, 0.28)';
      ctx.lineWidth = 1.2;

      // Top Left Corner
      ctx.beginPath();
      ctx.moveTo(28, 28 + cornerSize);
      ctx.lineTo(28, 28);
      ctx.lineTo(28 + cornerSize, 28);
      ctx.stroke();

      // Top Right Corner
      ctx.beginPath();
      ctx.moveTo(width - 28 - cornerSize, 28);
      ctx.lineTo(width - 28, 28);
      ctx.lineTo(width - 28, 28 + cornerSize);
      ctx.stroke();
      ctx.restore();

      // Render floating stardust embers
      for (let i = 0; i < embers.length; i++) {
        const em = embers[i];
        em.x += em.vx;
        em.y += em.vy;

        if (em.x < 0) em.x = width;
        if (em.x > width) em.x = 0;
        if (em.y < 0) em.y = height;
        if (em.y > height) em.y = 0;

        ctx.beginPath();
        ctx.arc(em.x, em.y, em.size, 0, Math.PI * 2);
        ctx.fillStyle = em.color;
        ctx.globalAlpha = em.alpha;
        ctx.fill();
      }

      // Render keycap spark micro-explosions
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const sp = sparkles[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.94;
        sp.vy += 0.06;
        sp.alpha -= sp.decay;
        if (sp.alpha <= 0.01) {
          sparkles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.alpha;
        ctx.fill();
      }

      // Render reactive keycap shockwave ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += 3.8;
        rip.alpha *= 0.94;
        if (rip.alpha <= 0.01) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = rip.color;
        ctx.lineWidth = 2.0;
        ctx.globalAlpha = rip.alpha;
        ctx.stroke();
      }

      ctx.globalAlpha = 1.0;
      canvasAnimId = requestAnimationFrame(renderAmbientCanvas);
    }
    canvasAnimId = requestAnimationFrame(renderAmbientCanvas);

    cleanupCanvas = () => {
      if (canvasAnimId) cancelAnimationFrame(canvasAnimId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }

  // 3. Live IST Clock Tracker
  function updateLiveClock() {
    if (isDismissed || !clockEl) return;
    try {
      const now = new Date();
      const parts = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
      clockEl.textContent = `${parts} IST`;
    } catch (e) {
      clockEl.textContent = 'ONLINE';
    }
  }
  updateLiveClock();
  const clockTimer = setInterval(updateLiveClock, 500);

  // 4. Kinetic Word Switcher (Dennis Snellenberg Vertical Slide, Crystal-Clear Zero-Blur Typography)
  function setWord(newIdx) {
    if (newIdx === activeWordIdx || newIdx >= words.length || isDismissed) return;
    const currentWord = words[activeWordIdx];
    const nextWord = words[newIdx];

    if (currentWord) {
      currentWord.classList.remove('is-active');
      currentWord.classList.add('is-exiting');
      setTimeout(() => {
        currentWord.classList.remove('is-exiting');
      }, 350);
    }

    if (nextWord) {
      nextWord.classList.add('is-active');
      const code = nextWord.getAttribute('data-lang-code');
      const native = nextWord.getAttribute('data-lang-native');
      if (langCodeEl && code) langCodeEl.textContent = code;
      if (langNativeEl && native) langNativeEl.textContent = native;
      if (greetingViewport && langHalos[newIdx]) {
        greetingViewport.style.setProperty('--preloader-halo', langHalos[newIdx]);
      }

      if (langIndicator) {
        langIndicator.style.transform = 'scale(1.08)';
        setTimeout(() => {
          if (langIndicator) langIndicator.style.transform = 'scale(1)';
        }, 160);
      }
    }

    activeWordIdx = newIdx;
  }

  // 5. Tactile Mechanical Keycap Depressor
  const keyCaptions = [
    'KEY [P] ENGAGED &bull; ABOUT ME',
    'KEY [O] ENGAGED &bull; EDUCATION',
    'KEY [R] ENGAGED &bull; SELECTED WORKS',
    'KEY [T] ENGAGED &bull; SKILLS',
    'KEY [F] ENGAGED &bull; PROCESS',
    'KEY [O] ENGAGED &bull; EXPERIENCE',
    'KEY [L] ENGAGED &bull; CERTIFICATIONS',
    'KEY [I] ENGAGED &bull; JOB PROFILES',
    'KEY [O] ENGAGED &bull; SOCIAL MEDIA',
    'KEY [ENTER] CONFIRMED &bull; SYSTEM READY'
  ];

  function pressKeycap(index) {
    if (index >= keycaps.length || keycaps[index].classList.contains('is-pressed')) return;
    const key = keycaps[index];
    key.classList.add('is-pressed');
    pressedKeyCount = Math.max(pressedKeyCount, index + 1);

    // Audio thock with spatial stereo positioning and harmonic musical Lydian pitch
    playMechanicalThock(index);

    // Spawn floating typographic boost feedback particle
    const char = key.getAttribute('data-key') || '';
    if (char) {
      const burst = document.createElement('span');
      burst.className = 'preloader-key-burst';
      burst.textContent = char === 'Enter' ? '↵ READY' : char;
      key.appendChild(burst);
      setTimeout(() => {
        if (burst.parentNode) burst.parentNode.removeChild(burst);
      }, 650);
    }

    // Update status line
    if (statusEl && keyCaptions[index]) {
      statusEl.innerHTML = keyCaptions[index];
    }

    // Trigger visual shockwave ripple & micro-sparkles on canvas
    if (canvas) {
      const rect = key.getBoundingClientRect();
      const kx = rect.left + rect.width / 2;
      const ky = rect.top + rect.height / 2;
      const color = window.getComputedStyle(key).getPropertyValue('--glow-color') || '#ffb7d5';
      ripples.push({ x: kx, y: ky, radius: 10, alpha: 0.85, color });
      createKeySparkles(kx, ky, color);
    }
  }

  // Allow Interactive Keycap Clicks
  keycaps.forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      primeAudioContext();
      pressKeycap(idx);
      bonusProgress += 0.08;
    });
  });

  // Clicking anywhere on preloader background unlocks audio & types the next keycap without dismissing early
  preloader.addEventListener('click', (e) => {
    primeAudioContext();
    if (pressedKeyCount < keycaps.length) {
      pressKeycap(pressedKeyCount);
      setWord(pressedKeyCount);
      bonusProgress += 0.08;
    }
  });

  // 6. Elastic SVG Curtain Curve Pull-Up (Dennis Snellenberg Signature Reveal)
  function animateElasticCurtain(duration = 800) {
    if (!curvePath) return;
    const startTime = performance.now();
    const initialDip = 240;

    function renderCurve(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Smooth cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentDip = initialDip * (1 - ease);

      curvePath.setAttribute('d', `M 0,0 L 1000,0 Q 500,${currentDip.toFixed(1)} 0,0 Z`);

      if (progress < 1) {
        requestAnimationFrame(renderCurve);
      }
    }
    requestAnimationFrame(renderCurve);
  }

  // 7. Dismissal & Liquid Curtain Pull-Up Sequence
  function dismiss() {
    if (isDismissed) return;
    isDismissed = true;
    clearTimeout(safetyWatchdog);

    // Fast-forward UI state to 100%
    if (counterEl) counterEl.textContent = '100';
    if (lineBar) lineBar.style.width = '100%';
    if (statusEl) statusEl.textContent = 'WELCOME TO THE PORTFOLIO OF Mr. P.K.';

    // Staggered domino wave cascade across all 10 keycaps
    keycaps.forEach((kc, i) => {
      setTimeout(() => {
        kc.classList.add('is-pressed', 'is-highlighted', 'domino-ripple');
        if (soundEnabled) {
          playTone(340 + i * 80, 'sine', 0.045, 0.035);
        }
      }, i * 36);
    });

    // Lock on final word "Mr. P.K."
    if (words.length > 0) {
      setWord(words.length - 1);
    }

    // Play harmonious chord bloom
    playCurtainChime();

    // Trigger elastic SVG curve deformation
    animateElasticCurtain(800);

    // Slide up whole preloader like liquid silk
    preloader.classList.add('is-exiting');
    document.body.classList.add('is-page-ready');
    try { sessionStorage.setItem('pk_preloader_seen', 'true'); } catch (e) {}

    setTimeout(() => {
      cleanupCanvas();
      clearInterval(clockTimer);
      if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
    }, 900);
  }

  // Explicit Skip Handlers: ESC key or clicking skip button
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dismiss();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (isDismissed) return;
    primeAudioContext();
    if (e.key === 'Escape') {
      dismiss();
    } else {
      // Any physical keystroke types the next keycap with ASMR mechanical click & shockwave!
      if (pressedKeyCount < keycaps.length) {
        pressKeycap(pressedKeyCount);
        setWord(pressedKeyCount);
        bonusProgress += 0.08;
      } else {
        dismiss();
      }
    }
  });

  // 8. Metronome Cadence Animation Driver (Comfortable Readability & Exact Timing)
  // Ample dwell time per word so all multilingual scripts are 100% clearly readable!
  let seenBefore = false;
  try { seenBefore = sessionStorage.getItem('pk_preloader_seen') === 'true'; } catch (e) {}
  const duration = seenBefore ? 1600 : 2500;
  const keyCount = keycaps.length; // 10
  const beatInterval = duration / 11; // ~227ms per greeting milestone

  let lastBeatTimestamp = 0;
  const startTime = performance.now();

  function step(now) {
    if (isDismissed) return;
    const elapsed = now - startTime + (bonusProgress * duration);
    const progressRatio = Math.min(1, Math.max(0, elapsed / duration));

    // Smooth numerical percentage counter
    const count = Math.min(100, Math.floor(progressRatio * 100));
    counterEl.textContent = count.toString().padStart(2, '0');
    if (lineBar) lineBar.style.width = `${count}%`;

    // Compute which key beat we should be on based on elapsed time:
    const targetKeyIdx = Math.min(keyCount - 1, Math.floor(elapsed / beatInterval));

    // Metronome beat trigger: Strictly one beat at a time with clean spacing (>=150ms)
    if (targetKeyIdx > currentKeyIdx) {
      if (currentKeyIdx === -1 || (now - lastBeatTimestamp >= 150)) {
        currentKeyIdx++;
        lastBeatTimestamp = now;
        pressKeycap(currentKeyIdx);
        setWord(currentKeyIdx);
      }
    }

    if (progressRatio < 1) {
      requestAnimationFrame(step);
    } else {
      counterEl.textContent = '100';
      if (lineBar) lineBar.style.width = '100%';
      setWord(words.length - 1);
      setTimeout(dismiss, 360);
    }
  }

  requestAnimationFrame(step);
}


/**
 * Dual Theme Engine: Deep Space Obsidian & Daylight Editorial
 * Coordinate-aware View Transitions API with shockwave radial expansion
 */
function initThemeSystem() {
  const THEME_KEY = 'pk_theme_choice';
  const headerToggle = document.getElementById('theme-toggle-header');
  const mobileHeaderToggle = document.getElementById('theme-toggle-mobile-header');
  const drawerToggle = document.getElementById('theme-toggle-drawer');
  const dockToggle = document.getElementById('theme-toggle-dock');
  const dockText = document.getElementById('dock-theme-text');

  // Purge legacy auto-detected dark key if present so default is clean Light mode
  try {
    if (localStorage.getItem('pk_theme') === 'dark' && !localStorage.getItem(THEME_KEY)) {
      localStorage.removeItem('pk_theme');
    }
  } catch (e) {}

  let savedTheme = null;
  try { savedTheme = localStorage.getItem(THEME_KEY); } catch (e) {}
  // Default is strictly 'light' as requested by the user
  let activeTheme = (savedTheme === 'dark') ? 'dark' : 'light';

  const allToggles = [headerToggle, mobileHeaderToggle, drawerToggle, dockToggle].filter(Boolean);

  function updateUI(theme) {
    const isDark = theme === 'dark';
    const icon = isDark ? '☀️' : '🌙';
    const titleText = isDark ? 'Switch to Light Theme (T)' : 'Switch to Deep Space Obsidian Theme (T)';
    const ariaText = isDark ? 'Switch to light theme' : 'Switch to dark theme';

    [headerToggle, mobileHeaderToggle, drawerToggle].forEach(btn => {
      if (!btn) return;
      const iconEl = btn.querySelector('.theme-icon') || btn;
      if (iconEl.classList && iconEl.classList.contains('theme-icon')) {
        iconEl.textContent = icon;
      } else {
        btn.innerHTML = `<span class="theme-icon" aria-hidden="true">${icon}</span>`;
      }
      btn.setAttribute('aria-label', ariaText);
      btn.setAttribute('title', titleText);
    });

    if (dockToggle) {
      const dockIcon = document.getElementById('dock-theme-icon') || dockToggle.querySelector('.theme-dock-icon');
      if (dockIcon) dockIcon.textContent = icon;
      if (dockText) dockText.textContent = isDark ? 'Light' : 'Dark';
      dockToggle.setAttribute('aria-label', ariaText);
      dockToggle.setAttribute('title', titleText);
    }
  }

  function applyTheme(theme, isUserAction = false) {
    activeTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    if (isUserAction) {
      try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    }
    updateUI(theme);
  }

  function triggerIconSpin() {
    allToggles.forEach(btn => {
      btn.classList.add('theme-toggle-spin');
      setTimeout(() => btn.classList.remove('theme-toggle-spin'), 420);
    });
  }

  function playThemeTransitionAudio(targetTheme) {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
        return;
      }
      const now = ctx.currentTime;

      if (targetTheme === 'dark') {
        // Deep Space Quantum Sub-Warp Dive
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(280, now);
        subOsc.frequency.exponentialRampToValueAtTime(52, now + 0.38);

        subGain.gain.setValueAtTime(0.18, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.40);
        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.start(now);
        subOsc.stop(now + 0.40);

        // Cybernetic aperture sweep
        const midOsc = ctx.createOscillator();
        const midGain = ctx.createGain();
        midOsc.type = 'triangle';
        midOsc.frequency.setValueAtTime(580, now);
        midOsc.frequency.exponentialRampToValueAtTime(140, now + 0.28);

        midGain.gain.setValueAtTime(0.09, now);
        midGain.gain.exponentialRampToValueAtTime(0.001, now + 0.30);
        midOsc.connect(midGain);
        midGain.connect(ctx.destination);
        midOsc.start(now);
        midOsc.stop(now + 0.30);

        // Tactile snap
        const snapOsc = ctx.createOscillator();
        const snapGain = ctx.createGain();
        snapOsc.type = 'sine';
        snapOsc.frequency.setValueAtTime(1600, now);
        snapOsc.frequency.exponentialRampToValueAtTime(400, now + 0.045);

        snapGain.gain.setValueAtTime(0.12, now);
        snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
        snapOsc.connect(snapGain);
        snapGain.connect(ctx.destination);
        snapOsc.start(now);
        snapOsc.stop(now + 0.045);
      } else {
        // Solar Photonic Dawn Surge
        const dawnOsc = ctx.createOscillator();
        const dawnGain = ctx.createGain();
        dawnOsc.type = 'sine';
        dawnOsc.frequency.setValueAtTime(440, now);
        dawnOsc.frequency.exponentialRampToValueAtTime(980, now + 0.32);

        dawnGain.gain.setValueAtTime(0.12, now);
        dawnGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        dawnOsc.connect(dawnGain);
        dawnGain.connect(ctx.destination);
        dawnOsc.start(now);
        dawnOsc.stop(now + 0.35);

        // Crystalline Harmonic Overtone
        const chimeOsc = ctx.createOscillator();
        const chimeGain = ctx.createGain();
        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(880, now + 0.04);
        chimeOsc.frequency.exponentialRampToValueAtTime(1760, now + 0.30);

        chimeGain.gain.setValueAtTime(0.001, now);
        chimeGain.gain.setValueAtTime(0.08, now + 0.04);
        chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
        chimeOsc.connect(chimeGain);
        chimeGain.connect(ctx.destination);
        chimeOsc.start(now + 0.04);
        chimeOsc.stop(now + 0.32);

        // Crisp Daylight Click
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.type = 'triangle';
        clickOsc.frequency.setValueAtTime(2400, now);
        clickOsc.frequency.exponentialRampToValueAtTime(1200, now + 0.035);

        clickGain.gain.setValueAtTime(0.10, now);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
        clickOsc.connect(clickGain);
        clickGain.connect(ctx.destination);
        clickOsc.start(now);
        clickOsc.stop(now + 0.035);
      }
    } catch (e) {}
  }

  function toggleTheme(clickEvent) {
    const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';

    // 1. Futuristic Acoustic Synthesis
    playThemeTransitionAudio(nextTheme);

    // 2. 3D Kinetic Icon Elastic Spin
    triggerIconSpin();

    // 3. Origin coordinates for the radial wave
    const x = clickEvent && clickEvent.clientX != null ? clickEvent.clientX : window.innerWidth / 2;
    const y = clickEvent && clickEvent.clientY != null ? clickEvent.clientY : window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // 4. Trigger Quantum Shockwave & Atmospheric Celebrations on Canvas
    if (typeof window.triggerThemeFxSwitch === 'function') {
      window.triggerThemeFxSwitch(nextTheme, clickEvent);
    }

    // 5. Futuristic HUD Toast Notification
    if (typeof showToast === 'function') {
      showToast(nextTheme === 'dark' ? '✦ DEEP SPACE OBSIDIAN // 60 FPS QUANTUM WARP 🌙 ✦' : '✦ DAYLIGHT EDITORIAL // KYOTO HARMONY ☀️ ✦');
    }

    // Native View Transitions API with coordinate-aware circular mask wave
    const isReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsViewTransition = !isReduced && typeof document.startViewTransition === 'function';

    if (supportsViewTransition) {
      const transition = document.startViewTransition(() => {
        applyTheme(nextTheme, true);
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ];
        document.documentElement.animate(
          { clipPath: clipPath },
          {
            duration: 520,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      }).catch(() => {
        applyTheme(nextTheme, true);
      });
    } else {
      // High-End Fallback Radial Curtain Animation
      const curtain = document.getElementById('theme-radial-curtain');
      if (curtain) {
        curtain.style.background = nextTheme === 'dark' ? '#08090e' : '#ffffff';
        curtain.style.clipPath = `circle(0px at ${x}px ${y}px)`;
        curtain.style.opacity = '1';
        requestAnimationFrame(() => {
          curtain.style.transition = 'clip-path 500ms cubic-bezier(0.22, 1, 0.36, 1)';
          curtain.style.clipPath = `circle(${endRadius}px at ${x}px ${y}px)`;
          setTimeout(() => {
            applyTheme(nextTheme, true);
            curtain.style.transition = 'opacity 220ms ease';
            curtain.style.opacity = '0';
          }, 460);
        });
      } else {
        document.documentElement.classList.add('is-theme-transitioning');
        applyTheme(nextTheme, true);
        setTimeout(() => {
          document.documentElement.classList.remove('is-theme-transitioning');
        }, 420);
      }
    }
  }

  // Initial apply (does not overwrite storage unless explicitly changed)
  applyTheme(activeTheme, false);

  // Attach click events
  allToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleTheme(e);
    });
  });

  // Global keyboard shortcut 'T'
  window.addEventListener('keydown', (e) => {
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || (e.target && e.target.isContentEditable)) {
      return;
    }
    if (e.key === 't' || e.key === 'T') {
      if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        toggleTheme();
      }
    }
  });

  window.togglePortfolioTheme = toggleTheme;
  window.getPortfolioTheme = () => activeTheme;
}

/**
 * Physical Hardware Keystroke Router & Matrix Dispatcher
 */
function initPhysicalKeyboard() {
  const keyMap = {
    'p': 'key-p',
    'o': 'key-upper-o',
    'r': 'key-r',
    't': 'key-t',
    'f': 'key-f',
    'l': 'key-l',
    'i': 'key-i',
    'Enter': 'key-enter'
  };

  let toggleO = false;

  window.addEventListener('keydown', (e) => {
    const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || (document.activeElement && document.activeElement.isContentEditable)) {
      return;
    }

    const keyChar = e.key;
    let targetKeyId = null;

    if (keyChar.toLowerCase() === 'o') {
      targetKeyId = toggleO ? 'key-lower-o' : 'key-upper-o';
      toggleO = !toggleO;
    } else {
      targetKeyId = keyMap[keyChar] || keyMap[keyChar.toLowerCase()];
    }

    if (targetKeyId) {
      const keyBtn = document.getElementById(targetKeyId);
      if (keyBtn) {
        keyBtn.classList.add('key-physical-active');
        playKeySound(targetKeyId === 'key-enter' ? 'enter' : 'press');

        const rect = keyBtn.getBoundingClientRect();
        triggerSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);

        keyBtn.click();
      }
    }
  });

  window.addEventListener('keyup', (e) => {
    const keyChar = e.key;
    if (keyChar.toLowerCase() === 'o') {
      document.querySelectorAll('#key-upper-o, #key-lower-o').forEach(k => k.classList.remove('key-physical-active'));
      return;
    }
    const targetKeyId = keyMap[keyChar] || keyMap[keyChar.toLowerCase()];
    if (targetKeyId) {
      const keyBtn = document.getElementById(targetKeyId);
      if (keyBtn) {
        keyBtn.classList.remove('key-physical-active');
      }
    }
  });
}

/**
 * Command Palette & Global Search Dispatcher (⌘K / Ctrl+K)
 */
function initCommandPalette() {
  const palette = document.getElementById('dialog-command-palette');
  const searchInput = document.getElementById('palette-search-input');
  const listEl = document.getElementById('palette-items-list');
  const openBtn = document.getElementById('open-palette-btn');
  const dockBtn = document.getElementById('dock-cmd-btn');
  const closeBtn = document.getElementById('palette-close-btn');

  if (!palette || !searchInput || !listEl) return;

  const commands = [
    { title: 'Toggle Theme (Dark / Light)', desc: 'Switch between Deep Space Obsidian and Daylight aesthetics (Shortcut: T)', icon: '🌓', action: () => (window.togglePortfolioTheme && window.togglePortfolioTheme()), badge: 'Theme' },
    { title: 'Ask PK Assistant (AI)', desc: 'Chat with Pradipta\'s interactive AI digital twin', icon: '✦', action: () => (window.openAIAssistant && window.openAIAssistant()), badge: 'AI Concierge' },
    { title: 'Jump to Interactive Keyboard', desc: 'Sculptural 3D mechanical keys spelling PORTFOLIO', icon: '⌨️', action: () => scrollToSection('#keyboard-interactive-section'), badge: 'Keys' },
    { title: 'Enterprise SQL Data Warehouse', desc: 'SQL Server Medallion Data Warehouse & Star Schema (250K+ records)', icon: '🏛️', action: () => window.open('https://github.com/pradipta2005/SQL-DataWarehouse-Project', '_blank'), badge: 'GitHub' },
    { title: 'Plotiva 2.0', desc: 'Interactive ML & Streamlit Platform', icon: '🚀', action: () => window.open('https://plotiva-v2.streamlit.app/', '_blank'), badge: 'Live App' },
    { title: 'Car Price Predictor', desc: 'Machine Learning Regression Web App', icon: '🚗', action: () => window.open('https://car-price-predictor-l3al.onrender.com/', '_blank'), badge: 'Live App' },
    { title: 'AWS ETL Pipeline', desc: 'Cloud Data Lake & Athena SQL Pipeline', icon: '☁️', action: () => window.open('https://github.com/pradipta2005/AWS-ETL-Pipeline', '_blank'), badge: 'GitHub' },
    { title: 'Customer Behaviour Analysis', desc: 'Power BI Executive Transaction Intelligence', icon: '📊', action: () => window.open('https://github.com/pradipta2005/Customer-Behavoiur-Analysis', '_blank'), badge: 'Power BI' },
    { title: 'LEGO Set Explorer', desc: 'Relational Database Modeling & Insights', icon: '🧱', action: () => window.open('https://github.com/pradipta2005/LEGO-Set-Explorer', '_blank'), badge: 'Power BI' },
    { title: 'Restaurant Order Analysis', desc: '12,000+ Orders SQL Optimization Case', icon: '🍕', action: () => window.open('https://github.com/pradipta2005/Restaurant-Order-Analysis', '_blank'), badge: 'MySQL' },
    { title: 'Rudrasish Portfolio', desc: 'Creative Showcase & Photographic Portfolio Website', icon: '🎨', action: () => window.open('https://github.com/pradipta2005/Rudrasish-Mahato-s-Portfolio', '_blank'), badge: 'GitHub' },
    { title: 'AI Career Builder', desc: 'AI-Powered Resume Optimization System', icon: '💼', action: () => window.open('https://ai-career-builder.onrender.com', '_blank'), badge: 'Live App' },
    { title: 'Jump to Selected Works', desc: 'Browse all 9 Data Science & Engineering projects', icon: '✦', action: () => scrollToSection('#projects-showcase'), badge: 'Section' },
    { title: 'Jump to Experience', desc: 'ZIDIO (91% R²), Next24Tech (CNN), CodesOnBytes', icon: '🏢', action: () => scrollToSection('#experience-section'), badge: 'Section' },
    { title: 'Jump to Education', desc: 'B.Tech MAKAUT (7.91 CGPA), Class XII (92.6%)', icon: '🎓', action: () => scrollToSection('#education-section'), badge: 'Section' },
    { title: 'Jump to Certifications', desc: 'NASA Space Apps, AWS Graduate, IBM, Deloitte', icon: '📜', action: () => scrollToSection('#certifications-section'), badge: 'Section' },
    { title: 'Jump to Technical Skills', desc: 'Python, SQL, AWS, BigQuery, Snowflake, ML', icon: '🛠️', action: () => scrollToSection('#technical-skills'), badge: 'Section' },
    { title: 'Jump to About Me', desc: 'Read Pradipta Khan full biographical profile', icon: '👤', action: () => scrollToSection('#about-profile'), badge: 'Section' },
    { title: 'Jump to Contact', desc: 'Send a message or connect directly', icon: '💬', action: () => scrollToSection('#contact'), badge: 'Section' },
    { title: 'Toggle Mechanical Audio', desc: 'Switch tactile keyboard switch acoustics ON / OFF', icon: '🔊', action: () => document.getElementById('dock-sound-btn')?.click(), badge: 'Toggle' },
    { title: 'Copy Email Address', desc: 'pradiptakhan005@gmail.com', icon: '📋', action: () => copyEmail(), badge: 'Clipboard' },
    { title: 'Open LinkedIn Profile', desc: 'linkedin.com/in/pradipta-khan/', icon: '🔗', action: () => window.open(CONFIG.linkedin, '_blank'), badge: 'Social' },
    { title: 'Open GitHub Profile', desc: 'github.com/pradipta2005/', icon: '💻', action: () => window.open(CONFIG.github, '_blank'), badge: 'GitHub' }
  ];

  let selectedIndex = 0;
  let filteredCommands = [...commands];

  function openPalette() {
    selectedIndex = 0;
    searchInput.value = '';
    renderList(commands);
    palette.showModal();
    setTimeout(() => searchInput.focus(), 50);
  }

  function closePalette() {
    palette.close();
  }

  function scrollToSection(selector) {
    const el = document.querySelector(selector);
    if (el) {
      if (selector === '#keyboard-interactive-section') {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        playKeySound(540, 'sine', 0.12);
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  function copyEmail() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(CONFIG.email).then(() => {
        showToast(`Copied ${CONFIG.email} to clipboard! ✨`);
      });
    }
  }

  function renderList(items) {
    filteredCommands = items;
    listEl.innerHTML = '';

    if (items.length === 0) {
      listEl.innerHTML = '<div style="padding: 20px; text-align: center; color: #8c8299; font-size: 0.9rem;">No matching commands found.</div>';
      return;
    }

    items.forEach((item, idx) => {
      const el = document.createElement('div');
      el.className = `palette-item ${idx === selectedIndex ? 'is-selected' : ''}`;
      el.innerHTML = `
        <div class="palette-item-left">
          <span class="palette-item-icon">${item.icon}</span>
          <div class="palette-item-text">
            <strong>${item.title}</strong>
            <span>${item.desc}</span>
          </div>
        </div>
        <span class="palette-item-badge">${item.badge}</span>
      `;
      el.addEventListener('click', () => {
        closePalette();
        item.action();
      });
      el.addEventListener('mouseenter', () => {
        selectedIndex = idx;
        updateSelectedHighlight();
      });
      listEl.appendChild(el);
    });
  }

  function updateSelectedHighlight() {
    const items = listEl.querySelectorAll('.palette-item');
    items.forEach((item, idx) => {
      item.classList.toggle('is-selected', idx === selectedIndex);
      if (idx === selectedIndex) {
        item.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
      renderList(commands);
    } else {
      const matched = commands.filter(c => 
        c.title.toLowerCase().includes(query) ||
        c.desc.toLowerCase().includes(query) ||
        c.badge.toLowerCase().includes(query)
      );
      selectedIndex = 0;
      renderList(matched);
    }
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        selectedIndex = (selectedIndex + 1) % filteredCommands.length;
        updateSelectedHighlight();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
        updateSelectedHighlight();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        closePalette();
        filteredCommands[selectedIndex].action();
      }
    }
  });

  if (openBtn) openBtn.addEventListener('click', openPalette);
  if (dockBtn) dockBtn.addEventListener('click', openPalette);
  if (closeBtn) closeBtn.addEventListener('click', closePalette);

  palette.addEventListener('click', (e) => {
    if (e.target === palette) closePalette();
  });

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      if (palette.open) {
        closePalette();
      } else {
        openPalette();
      }
    }
  });
}

/**
 * Telemetry Clock & Geolocation Indicator (Asia/Kolkata IST)
 */
function initLiveClock() {
  const clockEls = document.querySelectorAll('#hero-live-clock, #mobile-live-clock');
  if (!clockEls.length) return;

  function updateClock() {
    try {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat([], options);
      const timeStr = `Howrah, WB, IN • ${formatter.format(new Date())} IST`;
      clockEls.forEach(el => {
        el.textContent = timeStr;
      });
    } catch {
      clockEls.forEach(el => {
        el.textContent = 'Howrah, WB, IN • Live IST';
      });
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/**
 * Section Indicator & Kinetic Rail Navigator
 */
function initSectionIndicator() {
  const dots = document.querySelectorAll('.side-section-indicator .indicator-dot');
  if (dots.length === 0) return;

  const sectionIds = [
    'hero',
    'keyboard-interactive-section',
    'projects-showcase',
    'experience-section',
    'education-section',
    'certifications-section',
    'technical-skills',
    'about-profile',
    'contact'
  ];

  const cachedSections = sectionIds.map(id => {
    return {
      id,
      el: id === 'hero' ? document.querySelector('.hero-section') : document.getElementById(id)
    };
  }).filter(item => item.el !== null);

  let sectionScrollTicking = false;
  function onScroll() {
    const scrollPos = window.scrollY + window.innerHeight * 0.35;

    for (let i = cachedSections.length - 1; i >= 0; i--) {
      const item = cachedSections[i];
      if (item.el && item.el.offsetTop <= scrollPos) {
        dots.forEach(d => {
          d.classList.toggle('is-active', d.getAttribute('data-section') === item.id);
        });
        break;
      }
    }
    sectionScrollTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!sectionScrollTicking) {
      requestAnimationFrame(onScroll);
      sectionScrollTicking = true;
    }
  }, { passive: true });
  onScroll();

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const secId = dot.getAttribute('data-section');
      if (secId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const target = document.getElementById(secId);
        if (target) {
          if (secId === 'keyboard-interactive-section') {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            playKeySound(540, 'sine', 0.12);
          } else {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    });
  });
}

/**
 * Magnetic Interactive Element Physics
 */
function initMagneticElements() {
  if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) return;

  const magneticTargets = document.querySelectorAll(
    '.nav-link, .filter-tab-btn, .dock-btn, .dialog-close, .header-cmd-btn, .floating-stamp-badge'
  );

  magneticTargets.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.32;
      const deltaY = (e.clientY - centerY) * 0.32;

      el.style.transform = `translate(${deltaX.toFixed(1)}px, ${deltaY.toFixed(1)}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.transition = 'transform 320ms cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        el.style.transition = '';
      }, 320);
    });
  });
}

/**
 * Interactive Portfolio Assistant & Semantic Query Engine (PK Assistant)
 * Conversational dialogue router covering Pradipta's portfolio milestones & skills
 */
function initAIAssistant() {
  const container = document.getElementById('ai-assistant-container');
  const toggleBtn = document.getElementById('ai-assistant-toggle');
  const chatWindow = document.getElementById('ai-chat-window');
  const fullscreenBtn = document.getElementById('ai-fullscreen-btn');
  const fsIcon = document.getElementById('ai-fs-icon');
  const closeBtn = document.getElementById('ai-close-btn');
  const clearBtn = document.getElementById('ai-clear-btn');
  const chatForm = document.getElementById('ai-chat-form');
  const chatInput = document.getElementById('ai-chat-input');
  const chatStream = document.getElementById('ai-chat-stream');
  const tooltip = document.getElementById('ai-launcher-tooltip');
  const tooltipClose = document.getElementById('ai-tooltip-close');
  const dockAiBtn = document.getElementById('dock-ai-btn'); // No fallback to toggleBtn!

  if (!chatWindow || !chatStream || !chatInput) return;

  let isOpen = false;
  let isFullscreen = false;
  let isTyping = false;

  // Tooltip dismiss & click-to-open logic
  if (tooltip) {
    if (tooltipClose) {
      tooltipClose.addEventListener('click', (e) => {
        e.stopPropagation();
        tooltip.style.display = 'none';
      });
    }

    // Tapping the tooltip opens the assistant
    tooltip.addEventListener('click', (e) => {
      if (e.target !== tooltipClose) {
        openAssistant();
      }
    });

    // Auto-dismiss after 9 seconds of inactivity so it never clutters mobile view
    setTimeout(() => {
      if (tooltip && !isOpen) {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(6px)';
        setTimeout(() => { tooltip.style.display = 'none'; }, 220);
      }
    }, 9000);
  }

  function openAssistant() {
    isOpen = true;
    chatWindow.classList.add('is-open');
    chatWindow.setAttribute('aria-hidden', 'false');
    if (tooltip) tooltip.style.display = 'none';
    setTimeout(() => chatInput.focus(), 150);
    playAssistantSound('open');
  }

  function closeAssistant() {
    isOpen = false;
    if (isFullscreen) {
      exitFullscreen();
    }
    chatWindow.classList.remove('is-open');
    chatWindow.setAttribute('aria-hidden', 'true');
    playAssistantSound('close');
  }

  function enterFullscreen() {
    if (!isOpen) openAssistant();
    isFullscreen = true;
    if (container) container.classList.add('is-fullscreen');
    chatWindow.classList.add('is-fullscreen');
    if (fsIcon) fsIcon.textContent = '⤡';
    if (fullscreenBtn) {
      fullscreenBtn.setAttribute('title', 'Exit Fullscreen Studio (Esc or F)');
      fullscreenBtn.setAttribute('aria-label', 'Exit Fullscreen Studio');
    }
    playAssistantSound('fullscreen');
    if (typeof showToast === 'function') {
      showToast('PK Assistant Studio View ⛶ (Esc or F to exit)');
    }
    scrollStreamToBottom();
  }

  function exitFullscreen() {
    isFullscreen = false;
    if (container) container.classList.remove('is-fullscreen');
    chatWindow.classList.remove('is-fullscreen');
    if (fsIcon) fsIcon.textContent = '⤢';
    if (fullscreenBtn) {
      fullscreenBtn.setAttribute('title', 'Toggle Fullscreen Studio (F)');
      fullscreenBtn.setAttribute('aria-label', 'Toggle Fullscreen Mode');
    }
    playAssistantSound('close');
    if (typeof showToast === 'function') {
      showToast('Exited Fullscreen View 🗕');
    }
    scrollStreamToBottom();
  }

  function toggleFullscreen() {
    isFullscreen ? exitFullscreen() : enterFullscreen();
  }

  // Single cleanly scoped click listener on toggleBtn (fixes double toggle bug!)
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      isOpen ? closeAssistant() : openAssistant();
    });
  }

  // Only bind dockAiBtn if it is a distinct DOM element
  if (dockAiBtn && dockAiBtn !== toggleBtn) {
    dockAiBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      isOpen ? closeAssistant() : openAssistant();
    });
  }

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleFullscreen();
    });
  }

  // Double-click header to toggle fullscreen (OS desktop window behavior)
  const chatHeader = chatWindow.querySelector('.ai-chat-header');
  if (chatHeader) {
    chatHeader.addEventListener('dblclick', (e) => {
      const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
      if (tag === 'button' || (tag === 'span' && e.target.closest('button'))) return;
      toggleFullscreen();
    });
  }

  // Backdrop click in fullscreen exits fullscreen
  if (container) {
    container.addEventListener('click', (e) => {
      if (isFullscreen && e.target === container) {
        exitFullscreen();
      }
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeAssistant();
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      chatStream.innerHTML = '';
      sendBotMessage(getWelcomeMessage(), false);
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      if (isFullscreen) {
        e.preventDefault();
        exitFullscreen();
      } else {
        closeAssistant();
      }
    }

    if ((e.key === 'f' || e.key === 'F') && isOpen) {
      const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (tag !== 'input' && tag !== 'textarea' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        toggleFullscreen();
      }
    }
  });

  function getWelcomeMessage() {
    return `Hi there! 👋 I'm **PK Assistant**, Pradipta's personal AI concierge.\n\nI can answer any questions about his **9 featured data & engineering projects** (including his Enterprise SQL Data Warehouse), his **internships at ZIDIO & Next24Tech**, his **technical stack in Python, SQL & AWS**, or his **education at MAKAUT**!\n\nWhat would you like to explore? Feel free to ask or pick a suggestion below.`;
  }

  sendBotMessage(getWelcomeMessage(), false);

  document.querySelectorAll('.ai-chip-btn').forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      if (query && !isTyping) {
        handleUserQuery(query);
      }
    });
  });

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = chatInput.value.trim();
      if (!val || isTyping) return;
      handleUserQuery(val);
      chatInput.value = '';
    });
  }

  let activeStreamTimer = null;
  let activeStreamAbort = null;

  function handleUserQuery(queryText) {
    if (!queryText) return;

    // If currently streaming a previous answer, fast-forward it cleanly
    if (isTyping && activeStreamAbort) {
      activeStreamAbort();
    }

    appendBubble(queryText, 'user');
    chatInput.value = '';
    scrollStreamToBottom();

    showTypingIndicator();
    isTyping = true;

    // Realistic human formulation pause (380ms - 680ms)
    const replyDelay = 380 + Math.floor(Math.random() * 300);
    setTimeout(() => {
      removeTypingIndicator();
      const answer = generateHumanLikeResponse(queryText);
      sendBotMessage(answer, true);
    }, replyDelay);
  }

  function appendBubble(content, type) {
    const bubble = document.createElement('div');
    bubble.className = `ai-bubble ai-bubble-${type}`;
    if (type === 'user') {
      bubble.textContent = content;
    } else {
      bubble.innerHTML = formatMarkdown(content, false);
      wireBubbleAnchors(bubble);
    }
    chatStream.appendChild(bubble);
    scrollStreamToBottom();
  }

  function wireBubbleAnchors(container) {
    container.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          if (window.innerWidth < 640) closeAssistant();
        }
      });
    });
  }

  function sendBotMessage(markdownText, animate) {
    playAssistantSound('message');

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!animate || prefersReducedMotion) {
      appendBubble(markdownText, 'bot');
      isTyping = false;
      return;
    }

    // Cancel any ongoing stream cleanly before starting a new one
    if (activeStreamAbort) {
      activeStreamAbort();
    }

    const bubble = document.createElement('div');
    bubble.className = 'ai-bubble ai-bubble-bot is-streaming';
    chatStream.appendChild(bubble);

    // Split text into tokens (words and whitespace)
    const tokens = markdownText.match(/(\s+|\S+)/g) || [markdownText];
    let tokenIndex = 0;
    let accumulatedText = '';
    let isAborted = false;

    activeStreamAbort = () => {
      isAborted = true;
      if (activeStreamTimer) {
        clearTimeout(activeStreamTimer);
        activeStreamTimer = null;
      }
      bubble.classList.remove('is-streaming');
      bubble.innerHTML = formatMarkdown(markdownText, false);
      wireBubbleAnchors(bubble);
      activeStreamAbort = null;
    };

    function typeNextToken() {
      if (isAborted) return;

      if (tokenIndex >= tokens.length) {
        bubble.classList.remove('is-streaming');
        bubble.innerHTML = formatMarkdown(markdownText, false);
        wireBubbleAnchors(bubble);
        scrollStreamToBottom();
        isTyping = false;
        activeStreamAbort = null;
        activeStreamTimer = null;
        return;
      }

      const token = tokens[tokenIndex];
      accumulatedText += token;
      tokenIndex++;

      bubble.innerHTML = formatMarkdown(accumulatedText, true) + '<span class="ai-stream-cursor">▌</span>';
      scrollStreamToBottom();

      // Soft keystroke audio tick every 4 tokens when sound is enabled
      if (tokenIndex % 4 === 0 && soundEnabled && audioCtx) {
        playTypingTickSound();
      }

      // Variable human typing cadence
      let nextDelay = 18 + Math.floor(Math.random() * 14); // 18-32ms base
      if (/[.!?]$/.test(token.trim())) {
        nextDelay += 65; // sentence end pause
      } else if (/[,;:]$/.test(token.trim())) {
        nextDelay += 30; // clause pause
      } else if (token.includes('\n')) {
        nextDelay += 45; // newline pause
      }

      activeStreamTimer = setTimeout(typeNextToken, nextDelay);
    }

    typeNextToken();
  }

  function playTypingTickSound() {
    if (!soundEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1100 + Math.random() * 300, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.02);
      gain.gain.setValueAtTime(0.012, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.02);
    } catch (err) {
      // Audio fallback silent
    }
  }

  function showTypingIndicator() {
    removeTypingIndicator();
    const ind = document.createElement('div');
    ind.id = 'ai-typing-ind';
    ind.className = 'ai-typing-indicator';
    ind.innerHTML = `
      <span class="ai-typing-dot"></span>
      <span class="ai-typing-dot"></span>
      <span class="ai-typing-dot"></span>
    `;
    chatStream.appendChild(ind);
    scrollStreamToBottom();
  }

  function removeTypingIndicator() {
    const ind = document.getElementById('ai-typing-ind');
    if (ind) ind.remove();
  }

  function scrollStreamToBottom() {
    chatStream.scrollTop = chatStream.scrollHeight;
  }

  function generateHumanLikeResponse(query) {
    const q = (query || '').toLowerCase().trim();

    // Helper utilities for word boundary regex and phrase matching
    const hasWord = (...words) => {
      return words.some(w => new RegExp('\\b' + w + '\\b', 'i').test(q));
    };
    const hasPhrase = (...phrases) => {
      return phrases.some(p => q.includes(p.toLowerCase()));
    };

    // 1. Gibberish / Keyboard Smash / Punctuation spam
    if ((/^[a-z]{1,4}$/.test(q) && !hasWord('hi', 'hey', 'sql', 'aws', 'job', 'who', 'ml', 'bi', 'yo', 'cv')) || 
        /^[^a-zA-Z0-9]+$/.test(q) || 
        /(.)\1{4,}/.test(q) || 
        /^(asdf|qwerty|zxcv|hjkl|1234|test)/.test(q)) {
      return "Haha, looks like a friendly cat just took a stroll across your keyboard! 🐾\n\nOr maybe you're stress-testing my parser (respect!). Whenever you're ready, tap one of the quick chips or ask me about Pradipta's **projects, skills, or internships**!";
    }

    // 2. Weather / Climate / Outside conditions
    if (hasWord('weather', 'rain', 'temperature', 'forecast', 'sunny', 'climate', 'cloudy', 'snow')) {
      return "Haha, unless it involves running predictive weather time-series in Python or spatial GIS queries, I might not be your best meteorologist! ☀️🌧️\n\nI'm running inside your browser tab right now, so my internal forecast is 100% clean code with a high probability of great data pipelines. If you want to see how Pradipta forecasts real-world data, check out his **Car Price Predictor** or **Plotiva 2.0**!";
    }

    // 3. Food / Coffee / Cooking / Dining
    if (hasWord('coffee', 'tea', 'pizza', 'burger', 'food', 'cook', 'cooking', 'eat', 'eating', 'lunch', 'dinner', 'snack', 'drink', 'beer', 'cocktail', 'sandwich')) {
      return "Honestly? You can never go wrong with a hot cup of dark roast coffee and a fresh slice of pizza! ☕🍕\n\nFun fact: Pradipta fueled the development of Plotiva 2.0 with plenty of caffeine. And if you're curious about food data, he actually analyzed over **12,000+ actual restaurant orders** using MySQL to find high-margin dishes and rush hours!\n\nWant to check out the [Restaurant Order Analysis project](#projects-showcase)?";
    }

    // 4. Existential / Philosophy / Politics / Meaning of life
    if (hasPhrase('meaning of life', 'why are we here', 'are we in a simulation') || hasWord('god', 'religion', 'president', 'politics', 'universe', 'philosophy', 'existential')) {
      return "42, according to Douglas Adams! 🌌 But if you ask a data engineer, the real meaning of life is taking noisy, chaotic signals and turning them into meaningful, structured insights.\n\nI might leave the metaphysics to Socrates, but if you want to talk about **relational databases, neural networks, or cloud architectures**, I'm all in! What area of tech fascinates you most?";
    }

    // 5. ChatGPT comparisons / General LLM tasks / Code generation requests
    if (hasPhrase('are you chatgpt', 'chat gpt', 'gpt-4', 'who made you', 'what model') || hasWord('chatgpt', 'essay', 'homework', 'poem') || (hasWord('write') && hasWord('code', 'essay', 'homework', 'script', 'story', 'song', 'article'))) {
      return "Haha, while I *could* attempt general homework, I'm tuned specifically as Pradipta's personal portfolio copilot! 🚀\n\nRather than generating generic boilerplate, I'd much rather show you his actual production-tested code—like his **AWS Serverless ETL Pipeline**, **Plotiva 2.0**, or his **Computer Vision CNN for autonomous driving**.\n\nWant to inspect one of his GitHub repositories?";
    }

    // 6. Jokes & Humor
    if (hasWord('joke', 'jokes', 'funny', 'humor', 'laugh', 'meme')) {
      const jokes = [
        "Here's a classic one for you: 😄\n\n*Why do programmers prefer dark mode?*\nBecause light attracts bugs! 🐛💻",
        "Haha, here's one for data folks! 😄\n\n*A SQL query walks into a bar, walks up to two tables and asks...*\n'Can I join you?' 🍻📊",
        "How about this one: 😄\n\n*Why did the neural network go to therapy?*\nBecause it had too many unresolved bias issues and couldn't handle the loss! 🤖📉"
      ];
      return jokes[Math.floor(Math.random() * jokes.length)] + "\n\nOn a serious note, what would you like to explore about Pradipta's work, tech stack, or internships?";
    }

    // 7. Flirting / Romance / Playful compliments
    if (hasWord('marry', 'boyfriend', 'girlfriend', 'single', 'handsome', 'cute') || hasPhrase('love you', 'date me', 'marry me', 'crush on you')) {
      return "Aww, you're sweet! 😉 But my only true loves are normalized schemas, 60 FPS CSS animations, and zero-error build logs.\n\nIf you're looking for an engineering match for your data or analytics team though, Pradipta's definitely ready to collaborate! Check out [how to hire him](#contact) or send him an email!";
    }

    // 8. Salary / Rates / Compensation
    if (hasWord('salary', 'cost', 'rate', 'rates', 'compensation', 'pricing', 'pay') || hasPhrase('how much', 'charge per hour', 'hourly rate')) {
      return "Pradipta is open to discussing compensation directly depending on the scope, role impact, and whether it's an internship or full-time position. 💼\n\nHe's super collaborative and transparent. Drop him a message directly at [pradiptakhan005@gmail.com](mailto:pradiptakhan005@gmail.com) and you two can connect!";
    }

    // 9. Location / Relocation / Work mode
    if (hasPhrase('where do you live', 'where is pradipta', 'where are you located') || hasWord('location', 'based', 'city', 'relocate', 'relocation', 'remote', 'hybrid')) {
      return "Pradipta is based in West Bengal, India, and holds a B.Tech in CSE (Data Science) from MAKAUT (7.91 CGPA). He's actively open to **on-site relocation** (Bangalore, Hyderabad, Pune, Mumbai, Delhi-NCR, Kolkata, etc.), **hybrid setups**, or **remote roles globally**! 🌏\n\nWould you like his email or LinkedIn to schedule an intro call?";
    }

    // 10. Music / Movies / Pop culture / Gaming
    if (hasWord('movie', 'movies', 'song', 'songs', 'music', 'game', 'games', 'gaming', 'spotify', 'anime', 'film', 'films')) {
      return "When Pradipta isn't writing SQL queries or tuning Scikit-learn hyperparameters, you'll usually find him listening to lo-fi coding beats or exploring new visual design trends! 🎧🎮\n\nFun fact: that tactile mechanical keyboard sound on this site? Handcrafted with Web Audio API synthesis! Try clicking the keys in the header or ask me about his tech stack!";
    }

    // 11. Sports & Fitness
    if (hasWord('cricket', 'football', 'soccer', 'sports', 'gym', 'workout', 'fitness', 'exercise')) {
      return "Sports and clean data actually have a ton in common—it's all about consistency, tracking metrics, and iterating on performance! ⚽🏏\n\nWhile I can't spot you on the bench press, I *can* show you how Pradipta tracks predictive performance metrics in his machine learning models. Want to see his 91% R² validation regression build?";
    }

    // 12. Who made this website / Portfolio credits
    if (hasPhrase('who made this website', 'who built this website', 'who made this site', 'who designed this', 'attribution', 'colophon')) {
      return "This entire portfolio was architected and crafted from scratch by **Pradipta Khan** (creatively known as **Mr. P.K.**)! 🎨💻\n\nEvery line of styling, the dual neo-brutalist / luxury dark themes, the physics-based confetti fireworks, the Web Audio tactile keys, and this conversational copilot were built with zero bloated frameworks.\n\nColophon attribution: *curated by Mr. P.K* ✨";
    }

    // 13. How are you / Status
    if (hasPhrase('how are you', 'how is it going', 'how do you do', 'how r u')) {
      return "I'm doing fantastic, thanks for asking! ⚡ Systems are locked at 60 FPS, memory usage is super lean, and I'm ready to answer any questions about Pradipta's work, code, or background.\n\nHow can I help you today?";
    }

    // 14. Resume / CV requests
    if (hasWord('resume', 'cv') && !hasWord('builder', 'parser', 'app')) {
      return "You can check out Pradipta's verified credentials, project links, and experience directly on this portfolio! 📄\n\nIf you'd like a formal PDF copy of his updated professional resume, feel free to drop him a quick email at [pradiptakhan005@gmail.com](mailto:pradiptakhan005@gmail.com) and he'll be happy to send it right over!";
    }

    // 15. Relevant Projects: Specific Projects
    if (hasWord('warehouse', 'medallion') || hasPhrase('data warehouse', 'star schema', 'sql warehouse')) {
      return "Oh man, the **Enterprise SQL Data Warehouse** is probably one of Pradipta's proudest engineering builds! 🏛️\n\nHe architected a full **Bronze-Silver-Gold Medallion data warehouse in SQL Server**, transforming **250,000+ raw CRM & ERP records** into an analytics-ready Star Schema. He built a central `fact_sales` table linked to customer and product dimensions, and authored 13+ advanced T-SQL analytical scripts packed with recursive CTEs and window functions so teams can pull business metrics in milliseconds.\n\n• [Inspect GitHub Repository ↗](https://github.com/pradipta2005/SQL-DataWarehouse-Project)\n\nWant to know about his ETL pipelines or another project?";
    }

    if (hasWord('plotiva')) {
      return "You're going to love **Plotiva 2.0**! 🚀\n\nIt's a complete, no-code analytics and machine learning suite Pradipta built from scratch using **Streamlit, Scikit-learn, and Plotly**. Anyone can upload raw datasets, run automated data health audits, train predictive models with a single click, and export publication-ready reports in PDF, Word, and Excel.\n\n• [Launch Live Application ↗](https://plotiva-v2.streamlit.app/)\n• [Inspect GitHub Repository ↗](https://github.com/pradipta2005/PLOTIVA-2.O)\n\nHave you tried running a model on it yet?";
    }

    if (hasPhrase('car price', 'car_price') || (hasWord('car') && hasWord('price', 'predict', 'predictor'))) {
      return "The **Car Price Predictor** is a super slick end-to-end machine learning web app! 🚗\n\nPradipta ran statistical exploratory data analysis, engineered vehicle depreciation features, and trained a regression pipeline deployed via a **Flask REST API**. You can plug in vehicle specs and get an instant valuation!\n\n• [Test Live Application ↗](https://car-price-predictor-l3al.onrender.com/)\n• [View GitHub Code ↗](https://github.com/pradipta2005/Car_Price_Predictor)";
    }

    if (hasWord('aws') || hasPhrase('etl pipeline', 'serverless etl') || (hasWord('etl') && hasWord('pipeline'))) {
      return "The **AWS Serverless ETL Pipeline** is Pradipta's cloud engineering showcase! ☁️\n\nIt runs a completely serverless event-driven architecture using **AWS S3, AWS Lambda, AWS Glue crawlers, and Amazon Athena SQL analytics**. As soon as new data lands in S3, Lambda triggers automated schema discovery and cataloging with zero server maintenance overhead.\n\n• [Check GitHub Repository ↗](https://github.com/pradipta2005/AWS-ETL-Pipeline)";
    }

    if (hasPhrase('customer behaviour', 'customer behavior', 'cohort analysis', 'rfm analysis') || (hasWord('customer') && hasWord('behaviour', 'behavior', 'cohort'))) {
      return "The **Customer Behaviour Analysis** project is a comprehensive BI intelligence platform! 📊\n\nPradipta extracted and modeled transactional customer behavior, engineering RFM (Recency, Frequency, Monetary) segmentation cohorts and developing an interactive **Power BI dashboard** to identify VIP retention clusters and revenue churn risks.\n\n• [Inspect GitHub Repository ↗](https://github.com/pradipta2005/Customer-Behavoiur-Analysis)";
    }

    if (hasWord('lego')) {
      return "The **LEGO Set Explorer** is a brilliant deep dive into decades of brick history! 🧱\n\nPradipta structured relational database schemas across sets, themes, and parts, then designed an interactive **Power BI analytics dashboard** to reveal part growth trends and collector valuation patterns.\n\n• [View GitHub Repository ↗](https://github.com/pradipta2005/LEGO-Set-Explorer)";
    }

    if (hasWord('restaurant')) {
      return "The **Restaurant Order Analysis** project was an intensive SQL diagnostics mission! 🍕\n\nUsing **MySQL**, Pradipta dissected over **12,000+ actual customer orders**, writing complex CTEs, window functions, and multi-table joins to pinpoint high-margin menu items and peak operational rush hours.\n\n• [View GitHub Repository ↗](https://github.com/pradipta2005/Restaurant-Order-Analysis)";
    }

    if (hasWord('rudrasish')) {
      return "The **Rudrasish Portfolio** is an editorial visual arts website Pradipta created! 🎨\n\nHe engineered a responsive, high-aesthetic gallery featuring fluid imagery showcases, tactile layout transitions, and interactive skill presentation tailored for visual creators.\n\n• [Inspect GitHub Repository ↗](https://github.com/pradipta2005/Rudrasish-Mahato-s-Portfolio)";
    }

    if (hasPhrase('career builder', 'ai career') || (hasWord('resume') && hasWord('builder', 'parser', 'app'))) {
      return "The **AI Career Builder** is an intelligent web app designed to accelerate technical job searches! 💼\n\nIt features algorithmic resume parsing, keyword gap extraction against live job descriptions, and custom profile optimization recommendations to help candidates stand out.\n\n• [Launch Live Application ↗](https://ai-career-builder.onrender.com)\n• [View GitHub Repository ↗](https://github.com/pradipta2005/AI-Career-Builder-)";
    }

    // 16. All Projects Overview
    if (hasWord('projects', 'project', 'portfolio', 'built') || hasPhrase('all projects', 'what has he made', 'show projects', 'work sample')) {
      return "Pradipta has engineered **9 verified production projects** spanning data warehousing, machine learning, cloud pipelines, and web platforms:\n\n• **🏛️ Enterprise SQL Data Warehouse**: Medallion Star Schema & 250K+ records ([GitHub ↗](https://github.com/pradipta2005/SQL-DataWarehouse-Project))\n• **🚀 Plotiva 2.0**: Unified ML & reporting suite ([Live App ↗](https://plotiva-v2.streamlit.app/))\n• **🚗 Car Price Predictor**: Regression modeling with Flask REST API ([Live App ↗](https://car-price-predictor-l3al.onrender.com/))\n• **☁️ AWS ETL Pipeline**: Serverless S3/Lambda/Glue/Athena data lake ([GitHub ↗](https://github.com/pradipta2005/AWS-ETL-Pipeline))\n• **📊 Customer Behaviour Analysis**: Power BI cohort & transaction dashboard ([GitHub ↗](https://github.com/pradipta2005/Customer-Behavoiur-Analysis))\n• **🧱 LEGO Set Explorer**: Relational database modeling ([GitHub ↗](https://github.com/pradipta2005/LEGO-Set-Explorer))\n• **🍕 Restaurant Orders Analysis**: MySQL query optimization on 12,000+ orders ([GitHub ↗](https://github.com/pradipta2005/Restaurant-Order-Analysis))\n• **🎨 Rudrasish Portfolio**: Creative gallery & showcase website ([GitHub ↗](https://github.com/pradipta2005/Rudrasish-Mahato-s-Portfolio))\n• **💼 AI Career Builder**: Resume parsing and career matching app ([Live App ↗](https://ai-career-builder.onrender.com))\n\nJump directly down to the [Selected Projects Showcase](#projects-showcase) to test them live!";
    }

    // 17. Specific Internships
    if (hasWord('next24tech', 'opencv') || hasPhrase('lane detection', 'computer vision', 'deep learning intern', 'autonomous driving')) {
      return "During his **Computer Vision & Deep Learning Internship at Next24Tech** (Mar – May 2024), Pradipta worked on autonomous driving systems! 🏎️\n\nHe engineered a real-time road lane line detection pipeline using **OpenCV and fine-tuned Convolutional Neural Networks (CNNs)**, performing data preprocessing on highway footage and optimizing model inference for low-latency vehicle steering control.\n\nCheck out the full internship timeline in the [Experience Section](#experience-section)!";
    }

    if (hasWord('zidio')) {
      return "At **ZIDIO Development** (Aug – Nov 2024), Pradipta served as a **Data Science & Analytics Intern**! 🏢\n\nHe handled exploratory feature engineering on 5,000+ structured customer records, resolved missing values and statistical outliers to improve dataset quality by **~23%**, and built a Scikit-learn Linear Regression model achieving an impressive **91% R² validation score** to isolate key growth drivers.\n\nTake a look at the milestone card in the [Experience Section](#experience-section)!";
    }

    if (hasWord('codesonbytes')) {
      return "At **CodesOnBytes** (Sep – Oct 2023), Pradipta began his industry training as a **Data Science Trainee**! 💻\n\nHe developed statistical workflows, exploratory data analysis notebooks, and predictive modeling prototypes, successfully earning an official Letter of Recommendation (LOR) & Certificate for his work.\n\nSee all three internships in the [Experience Section](#experience-section)!";
    }

    // General Experience / Internships
    if (hasWord('experience', 'intern', 'internship', 'internships') || hasPhrase('work history', 'previous companies')) {
      return "Pradipta brings verified industry internship experience with measurable outcomes:\n\n1. **🏢 Data Science & Analytics Intern • ZIDIO Development** (Aug – Nov 2024):\n   • Cleaned & transformed 5,000+ structured records in Python (Pandas, NumPy), resolving outliers and boosting data quality by **~23%**.\n   • Trained a Scikit-learn Linear Regression model achieving a **91% R² validation score**.\n\n2. **🏎️ Deep Learning Intern • Next24Tech** (Mar – May 2024):\n   • Engineered a real-time road lane line detection algorithm utilizing OpenCV and fine-tuned CNNs for autonomous driving systems.\n\n3. **💻 Data Science Trainee • CodesOnBytes** (Sep – Oct 2023):\n   • Practiced predictive modeling pipelines and earned an official Letter of Recommendation (LOR) & Certificate.\n\nTake a look at the full story in the [Professional Experience Timeline](#experience-section)!";
    }

    // 18. Technical Skills
    if (hasWord('skill', 'skills', 'stack', 'technologies', 'scikit', 'pandas', 'numpy') || hasPhrase('tech stack', 'what technologies', 'what skills')) {
      return "Pradipta's tech stack covers the full data engineering and machine learning lifecycle:\n\n• **Languages & Analytics**: Python (Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn), SQL (PostgreSQL, MySQL, T-SQL)\n• **Business Intelligence**: Power BI (DAX, Data Modeling), Tableau, Advanced Excel\n• **Cloud & Big Data**: AWS (S3, Lambda, Glue, Athena), BigQuery, Snowflake, Databricks\n• **Web & Fullstack**: Streamlit, Plotly, Dash, React, Next.js, FastAPI, Flask, Supabase\n• **Core Disciplines**: Exploratory Data Analysis (EDA), Predictive ML Modeling, Serverless ETL, Star Schema Design.\n\nCheck out the interactive cards in the [Technical Skills Section](#technical-skills)!";
    }

    // 19. Education
    if (hasWord('education', 'college', 'university', 'makaut', 'cgpa', 'degree', 'academics') || hasPhrase('class 12', 'class 10', 'high school', 'b.tech', 'marks')) {
      return "Here is Pradipta's verified academic record:\n\n• **Undergraduate Degree (2022 – 2026)**:\n  B.Tech in **Computer Science Engineering – Data Science** at **Maulana Abul Kalam Azad University of Technology (MAKAUT)** with a **7.91 CGPA**.\n• **Higher Secondary (Class XII, 2022)**:\n  West Bengal Council of Higher Secondary Education (WBCHSE) with **92.6% Distinction** (Science stream).\n• **Secondary Education (Class X, 2020)**:\n  West Bengal Board of Secondary Education (WBBSE) with **84.43% First Division**.\n\nExplore coursework details in the [Detailed Education Section](#education-section)!";
    }

    // 20. Certifications
    if (hasWord('certification', 'certifications', 'certif', 'certificates', 'deloitte', 'nptel', 'hackathon') || hasPhrase('space apps', 'aws academy', 'ibm python')) {
      return "Pradipta holds **5 industry-recognized credentials & hackathon honors**:\n\n• **🌌 NASA International Space Apps Challenge (Oct 2024)**: Global hackathon participant.\n• **☁️ AWS Academy Graduate (Feb 2024)**: Data Engineering training from Amazon Web Services.\n• **🐍 Python for Data Science (Oct 2023)**: Professional credential by IBM.\n• **📊 Data Analytics Job Simulation (Jul 2025)**: Deloitte via Forage.\n• **✍️ Effective Writing (Feb 2023)**: NPTEL & IIT Roorkee.\n\nYou can view full credential scans in the [Certifications Gallery](#certifications-section)!";
    }

    // 21. Hiring
    if (hasWord('hire', 'hiring', 'job', 'jobs', 'role', 'roles', 'candidate', 'openings') || hasPhrase('available for hire', 'looking for a job', 'open to work', 'can i hire')) {
      return "**Yes!** Pradipta is actively available for **internship and full-time hiring opportunities**.\n\nHe is targeting roles including:\n• **Data Analyst** (BI modeling, SQL metrics, executive presentations)\n• **Data Scientist** (Predictive ML pipelines, EDA, Scikit-learn)\n• **Data Engineer** (ETL automation, AWS data lakes, cloud analytics)\n• **SQL Developer** (Database optimization, queries, schema design)\n\nReach him directly at [pradiptakhan005@gmail.com](mailto:pradiptakhan005@gmail.com) or connect on [LinkedIn](https://www.linkedin.com/in/pradipta-khan/)!";
    }

    // 22. Contact
    if (hasWord('contact', 'email', 'linkedin', 'phone') || hasPhrase('get in touch', 'reach out', 'send a message', 'how to reach')) {
      return "You can get in touch with Pradipta directly via:\n\n• **Email**: [pradiptakhan005@gmail.com](mailto:pradiptakhan005@gmail.com)\n• **LinkedIn**: [linkedin.com/in/pradipta-khan/ ↗](https://www.linkedin.com/in/pradipta-khan/)\n• **GitHub**: [github.com/pradipta2005/ ↗](https://github.com/pradipta2005/)\n\nOr scroll straight to the [Contact Section](#contact) to send a direct message!";
    }

    // 23. Assistant Identity
    if (hasPhrase('who are you', 'what are you', 'what is your name', 'who created you', 'who made you', 'what is pk assistant')) {
      return "I'm **PK Assistant**, the personal AI concierge for **Pradipta Khan** (creatively known as **Mr. P.K.**)! 🤖✨\n\nI was crafted to guide you through his work, showcase his **9 data engineering & machine learning projects**, share details on his internships at **ZIDIO & Next24Tech**, and connect you directly with him for opportunities.\n\nWould you like to learn more about Pradipta's background, explore his tech stack, or review his projects?";
    }

    // 24. Pradipta's Bio & Background (Consistent third-person)
    if (hasPhrase('tell me about pradipta', 'who is pradipta', 'about pradipta', 'about mr. pk', 'who is mr. pk', 'who is pk', 'tell me about yourself', 'tell me about pk', 'pradipta bio', 'pradipta background', 'who is he') || (hasWord('who', 'about') && hasWord('pradipta', 'pk', 'creator', 'author'))) {
      return "**Pradipta Khan** (creatively known as **Mr. P.K.**) is an aspiring data professional and creative technologist graduating with a **B.Tech in CSE (Data Science)** from **MAKAUT** (7.91 CGPA Honors). 🎓\n\nHis engineering philosophy bridges **analytical thinking, machine learning, cloud pipelines, and business intelligence** to transform complex, messy datasets into intelligent, human-centered products. Beyond enterprise data architectures, he is a dedicated *vibe coder* who cares deeply about design polish, tactile interfaces, and creating digital experiences that leave a lasting impression!\n\nWould you like to explore his [Featured Projects](#projects-showcase), his [Internships at ZIDIO & Next24Tech](#experience-section), or check his [Education Credentials](#education-section)?";
    }

    // 25. Greetings & Small talk
    if (hasWord('hi', 'hey', 'hello', 'howdy', 'yo', 'sup', 'greetings') || hasPhrase('good morning', 'good afternoon', 'good evening', "what's up")) {
      return "Hey there! 👋 Awesome to meet you! I'm **PK Assistant**, Pradipta's personal AI concierge.\n\nWhat would you like to explore today? You can ask me anything about his **projects, technical skills, internships at ZIDIO & Next24Tech, or how to get in touch**!";
    }

    if (hasWord('thanks', 'thank', 'awesome', 'cool', 'amazing', 'great') || hasPhrase('thank you', 'good job', 'love this site')) {
      return "You're very welcome! 😊 It's truly a pleasure. Feel free to explore the interactive project cards, test the keyboard shortcuts (<kbd>⌘K</kbd>), or drop Pradipta an email at [pradiptakhan005@gmail.com](mailto:pradiptakhan005@gmail.com)!";
    }

    // 25. Fallback
    return "That's an interesting question! I don't have the exact answer for that one off the top of my head, but I'm an expert on everything about **Pradipta's work, projects, tech stack, and experience**! 💡\n\nYou could ask me things like:\n• *\"Tell me about Plotiva 2.0\"*\n• *\"What did he do at ZIDIO Development?\"*\n• *\"What is his tech stack in Python & SQL?\"*\n• *\"How can I hire him?\"*\n\nOr feel free to send him a message directly at [pradiptakhan005@gmail.com](mailto:pradiptakhan005@gmail.com)!";
  }

  function formatMarkdown(text, isStreaming) {
    let processed = text;
    if (isStreaming) {
      // Auto-balance bold asterisks during streaming
      const boldMatches = processed.match(/\*\*/g);
      if (boldMatches && boldMatches.length % 2 !== 0) {
        processed += '**';
      }
      // If halfway through a markdown link [Label](url...
      const openBracket = processed.lastIndexOf('[');
      const closeParen = processed.lastIndexOf(')');
      if (openBracket > -1 && closeParen < openBracket) {
        const endBracket = processed.lastIndexOf(']');
        if (endBracket > openBracket) {
          const label = processed.slice(openBracket + 1, endBracket);
          processed = processed.slice(0, openBracket) + label;
        }
      }
    }

    let html = processed
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, (match, label, href) => {
        const isInternal = href.startsWith('#');
        return `<a href="${href}" ${isInternal ? '' : 'target="_blank" rel="noopener noreferrer"'}>${label}</a>`;
      })
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
    return html;
  }

  window.openAIAssistant = openAssistant;
  window.closeAIAssistant = closeAssistant;
  window.toggleAIAssistantFullscreen = toggleFullscreen;
}

/**
 * Contextual Header Visibility & Contrast Observer
 */
function initHeaderThemeObserver() {
  const header = document.querySelector('.site-header');
  const indicator = document.querySelector('.side-section-indicator');
  const heroSection = document.querySelector('.hero-section');

  // 1. Dark Section Observer (Contact Section)
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (header) header.classList.add('header-on-dark');
          if (indicator) indicator.classList.add('on-dark');
        } else {
          if (header) header.classList.remove('header-on-dark');
          if (indicator) indicator.classList.remove('on-dark');
        }
      });
    }, { threshold: 0.05 });
    observer.observe(contactSection);
  }

  // 2. Active Section Scrollspy (Defined BEFORE handleHeaderScroll to prevent TDZ error!)
  const navLinks = document.querySelectorAll('.site-nav .nav-link[data-section]');
  const sections = Array.from(navLinks).map(link => {
    const id = link.getAttribute('data-section');
    return { id, link, el: document.getElementById(id) };
  }).filter(item => item.el !== null);

  function updateNavScrollspy() {
    if (!sections.length) return;
    const scrollPosition = window.scrollY + 160;

    let activeId = null;
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section.el.offsetTop <= scrollPosition) {
        activeId = section.id;
        break;
      }
    }

    sections.forEach(item => {
      if (item.id === activeId) {
        item.link.classList.add('is-active');
      } else {
        item.link.classList.remove('is-active');
      }
    });
  }

  // 3. Sticky Glass Elevation & Hero-Only Web Navbar Visibility with Creative Motion
  let scrollTicking = false;
  function handleHeaderScroll() {
    const scrollY = window.scrollY || window.pageYOffset || 0;

    if (header) {
      if (scrollY > 15) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }

      // Dynamic Web Visibility: Navbar only visible in hero/top section on web (viewport > 960px)
      const isWeb = window.innerWidth > 960;
      if (isWeb && heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        // When user scrolls past hero section, hide navbar with creative atmospheric transition
        // Hysteresis (70px vs 130px) ensures silky performance without jitter
        if (scrollY > heroBottom - 70) {
          if (!header.classList.contains('nav-hidden')) {
            header.classList.add('nav-hidden');
          }
        } else if (scrollY < heroBottom - 130) {
          if (header.classList.contains('nav-hidden')) {
            header.classList.remove('nav-hidden');
          }
        }
      } else {
        // Mobile or within hero: ensure header is accessible
        header.classList.remove('nav-hidden');
      }
    }

    updateNavScrollspy();
    scrollTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(handleHeaderScroll);
      scrollTicking = true;
    }
  }, { passive: true });
  handleHeaderScroll();

  window.addEventListener('resize', () => {
    if (header) {
      if (window.innerWidth <= 960) {
        header.classList.remove('nav-hidden');
      } else {
        handleHeaderScroll();
      }
    }
  }, { passive: true });

  // 4. Tactile Audio Feedback on Nav Links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (typeof playKeySound === 'function') {
        playKeySound();
      }
    });
  });

  const wordmark = document.querySelector('.brand-wordmark');
  if (wordmark) {
    wordmark.addEventListener('click', (e) => {
      if (window.scrollY > 0) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      if (typeof playKeySound === 'function') {
        playKeySound();
      }
    });
  }
}

/**
 * Interactive Certificate Lightbox & High-Resolution Inspection
 */
function initCertLightbox() {
  const dialog = document.getElementById('dialog-cert-lightbox');
  if (!dialog) return;

  const closeBtn = document.getElementById('cert-lightbox-close');
  const doneBtn = document.getElementById('cert-lightbox-done-btn');
  const titleEl = document.getElementById('cert-lightbox-title');
  const badgeEl = document.getElementById('cert-lightbox-badge');
  const issuerEl = document.getElementById('cert-lightbox-issuer');
  const dateEl = document.getElementById('cert-lightbox-date');
  const descEl = document.getElementById('cert-lightbox-desc');
  const imgEl = document.getElementById('cert-lightbox-img');
  const origLink = document.getElementById('cert-lightbox-orig-link');
  const tagsEl = document.getElementById('cert-lightbox-tags');

  const certCards = document.querySelectorAll('.interactive-cert-card');

  function openLightbox(card) {
    if (!card || !dialog) return;
    if (dialog.open) return; // Prevent double trigger
    const title = card.getAttribute('data-cert-title') || 'Certificate';
    const issuer = card.getAttribute('data-cert-issuer') || 'Issuing Authority';
    const date = card.getAttribute('data-cert-date') || 'Verified Credential';
    const badge = card.getAttribute('data-cert-badge') || 'Verified Credential';
    const img = card.getAttribute('data-cert-img') || '';
    const desc = card.getAttribute('data-cert-desc') || '';
    const tags = card.getAttribute('data-cert-tags') || '';

    if (titleEl) titleEl.textContent = title;
    if (badgeEl) badgeEl.textContent = badge;
    if (issuerEl) issuerEl.textContent = issuer;
    if (dateEl) dateEl.textContent = date;
    if (descEl) descEl.textContent = desc;

    if (tagsEl) {
      tagsEl.innerHTML = '';
      if (tags) {
        tags.split(',').map(s => s.trim()).filter(Boolean).forEach(tag => {
          const pill = document.createElement('span');
          pill.className = 'cert-competency-pill';
          pill.textContent = tag;
          tagsEl.appendChild(pill);
        });
      }
    }

    if (imgEl) {
      imgEl.src = img;
      imgEl.alt = `${title} - ${issuer}`;
    }
    if (origLink) {
      origLink.href = img;
    }

    try {
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
      playAssistantSound('open');
    } catch (e) {
      console.warn('Dialog error:', e);
    }
  }

  function closeLightbox() {
    try {
      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
      playAssistantSound('close');
    } catch (e) {
      console.warn('Dialog close error:', e);
    }
  }

  // Click on image opens full high-resolution original
  if (imgEl) {
    imgEl.addEventListener('click', (e) => {
      e.stopPropagation();
      if (origLink && origLink.href && origLink.href !== '#' && !origLink.href.endsWith('#')) {
        window.open(origLink.href, '_blank', 'noopener,noreferrer');
      }
    });
  }

  // Bind to cards directly
  certCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openLightbox(card);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(card);
      }
    });
  });

  // Delegated click handler as backup
  document.addEventListener('click', (e) => {
    if (!e || !e.target) return;
    const trigger = e.target.closest ? e.target.closest('.cert-inspect-btn') : null;
    if (trigger) {
      e.preventDefault();
      const card = trigger.closest('.interactive-cert-card');
      if (card) openLightbox(card);
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (doneBtn) doneBtn.addEventListener('click', closeLightbox);

  // Close when clicking dialog backdrop
  dialog.addEventListener('click', (e) => {
    if (!e) return;
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    );
    if (!isInDialog || e.target === dialog) {
      closeLightbox();
    }
  });

  dialog.addEventListener('cancel', () => {
    playAssistantSound('close');
  });

  // Global exposure for programmatic/inspector calls
  window.openCertLightbox = openLightbox;
  window.closeCertLightbox = closeLightbox;
}

/**
 * Responsive Mobile Navigation Drawer & Touch Coordination
 */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  const closeBtn = document.getElementById('mobile-nav-close');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const mobileAiBtn = document.getElementById('mobile-ai-trigger');
  const mobileCmdBtn = document.getElementById('mobile-cmd-trigger');

  if (!drawer) return;

  function openMobileMenu(e) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
      e.stopPropagation();
    }
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    if (menuBtn) {
      menuBtn.classList.add('is-active');
      menuBtn.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
    playAssistantSound('open');
  }

  function closeMobileMenu(e) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    if (menuBtn) {
      menuBtn.classList.remove('is-active');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
    playAssistantSound('close');
  }

  function toggleMobileMenu(e) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
      e.stopPropagation();
    }
    if (drawer.classList.contains('is-open')) {
      closeMobileMenu(e);
    } else {
      openMobileMenu(e);
    }
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', toggleMobileMenu);
  }

  if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
  if (backdrop) backdrop.addEventListener('click', closeMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  if (mobileAiBtn) {
    mobileAiBtn.addEventListener('click', (e) => {
      closeMobileMenu(e);
      const aiToggle = document.getElementById('ai-assistant-toggle');
      if (aiToggle) aiToggle.click();
    });
  }

  if (mobileCmdBtn) {
    mobileCmdBtn.addEventListener('click', (e) => {
      closeMobileMenu(e);
      const palette = document.getElementById('dialog-command-palette');
      if (palette && typeof palette.showModal === 'function') {
        palette.showModal();
        const searchInput = document.getElementById('palette-search-input');
        if (searchInput) searchInput.focus();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 960 && drawer.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });

  // Global helpers
  window.openMobileNav = openMobileMenu;
  window.closeMobileNav = closeMobileMenu;
  window.toggleMobileNav = toggleMobileMenu;
}
