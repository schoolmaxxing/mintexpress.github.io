// Global site enhancements: navbar behavior, reveal-on-scroll, and small helpers

(function () {
  // Navbar shrink on scroll
  const navbar = document.querySelector('.navbar');
  const onScroll = () => {
    if (!navbar) return;
    const scrolled = window.scrollY > 12;
    navbar.classList.toggle('navbar-scrolled', scrolled);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll using IntersectionObserver
  const observed = new WeakSet();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  function scanReveals() {
    const els = document.querySelectorAll('.reveal');
    let idx = 0;
    els.forEach((el) => {
      if (!observed.has(el)) {
        el.style.transitionDelay = `${Math.min(idx * 40, 240)}ms`;
        io.observe(el);
        observed.add(el);
        idx++;
      }
    });
  }

  // initial scan and allow pages to request rescans
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scanReveals, { once: true });
  } else {
    scanReveals();
  }
  document.addEventListener('reveal:scan', scanReveals);
})();
