// ============================================================
// Nav: transparent over hero, solid after scrolling past it
// ============================================================
const nav = document.getElementById('nav');
const heroEl = document.querySelector('.hero, .page-hero');
const navThreshold = () => (heroEl ? heroEl.offsetHeight : 400) - 80;
const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > navThreshold());
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ============================================================
// Mobile menu
// ============================================================
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    document.body.classList.toggle('menu-open', open);
  });
  mobileMenu.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
    })
  );
}

// ============================================================
// Scroll reveals: plain position checks, engine-proof
// ============================================================
const revealEls = [...document.querySelectorAll('.reveal')];
function runCounter(el) {
  if (el.dataset.counted) return;
  el.dataset.counted = '1';
  const target = +el.dataset.count;
  const suffix = el.dataset.suffix || '';
  const dur = 1400;
  const start = performance.now();
  const tick = (t) => {
    const p = Math.min(1, (t - start) / dur);
    const v = Math.round(target * (1 - Math.pow(1 - p, 3)));
    el.textContent = v.toLocaleString('en-US') + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
function revealCheck() {
  const limit = window.innerHeight * 0.92;
  revealEls.forEach((el) => {
    if (el.classList.contains('in')) return;
    if (el.getBoundingClientRect().top < limit) {
      const siblings = [...el.parentElement.children].filter((c) => c.classList.contains('reveal') && !c.classList.contains('in'));
      const idx = Math.max(0, siblings.indexOf(el));
      el.style.transitionDelay = `${Math.min(idx, 5) * 100}ms`;
      el.classList.add('in');
      el.querySelectorAll('[data-count]').forEach(runCounter);
      if (el.matches('[data-count]')) runCounter(el);
    }
  });
}
window.addEventListener('scroll', revealCheck, { passive: true });
window.addEventListener('resize', revealCheck, { passive: true });
window.addEventListener('load', revealCheck);
revealCheck();
// Heartbeat: guarantees reveals even if scroll events are missed
const revealTimer = setInterval(() => {
  revealCheck();
  if (revealEls.every((el) => el.classList.contains('in'))) clearInterval(revealTimer);
}, 350);

// ============================================================
// Testimonial carousel (dots auto-generated from slides)
// ============================================================
const slides = document.querySelectorAll('.quote-slide');
const dotsWrap = document.getElementById('quoteDots');
if (slides.length && dotsWrap) {
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Testimonial ${i + 1}`);
    d.addEventListener('click', () => show(i));
    dotsWrap.appendChild(d);
  });
  const dots = dotsWrap.querySelectorAll('.dot');
  let current = 0;
  function show(i) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = i;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }
  // Auto-advance every 6s
  setInterval(() => show((current + 1) % slides.length), 6000);
}

// ============================================================
// FAQ accordion
// ============================================================
document.querySelectorAll('.faq-item').forEach((item) => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const open = item.classList.toggle('open');
    a.style.maxHeight = open ? a.scrollHeight + 'px' : '0';
  });
});


// ============================================================
// Safety net: never leave content hidden if the observer misses
// ============================================================
window.addEventListener('load', () => {
  setTimeout(revealCheck, 1000);
});

// ============================================================
// Video orb fallback: some browser setups block direct media
// requests; after 1.2s of no data, load via fetch -> blob.
// ============================================================
document.querySelectorAll('video.orb-video').forEach((v) => {
  setTimeout(() => {
    if (v.readyState === 0) {
      fetch(v.getAttribute('src')).then((r) => r.blob()).then((b) => {
        v.src = URL.createObjectURL(b);
        v.play().catch(() => {});
      }).catch(() => {});
    }
  }, 1200);
});
