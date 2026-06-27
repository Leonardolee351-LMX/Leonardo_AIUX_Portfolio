(function() {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setBgVars(x, y) {
    const root = document.documentElement;
    root.style.setProperty('--mx', String(x));
    root.style.setProperty('--my', String(y));
  }

  if (!prefersReducedMotion) {
    let mx = 0.52;
    let my = 0.46;
    let tx = mx;
    let ty = my;
    let raf = 0;

    function tick() {
      mx += (tx - mx) * 0.12;
      my += (ty - my) * 0.12;
      setBgVars(mx, my);
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener('pointermove', (e) => {
      tx = e.clientX / Math.max(1, window.innerWidth);
      ty = e.clientY / Math.max(1, window.innerHeight);
    }, { passive: true });

    raf = requestAnimationFrame(tick);
  } else {
    setBgVars(0.52, 0.46);
  }

  if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  if (!prefersReducedMotion) {
    ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        document.documentElement.style.setProperty('--scroll', String(self.progress));
      }
    });
  } else {
    document.documentElement.style.setProperty('--scroll', '0');
  }

  gsap.from('.hero-label, .hero-title, .hero-desc, .hero-cta', {
    y: 26,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.08,
    scrollTrigger: {
      trigger: '#home',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });

  gsap.from('.work-item', {
    y: 46,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.10,
    scrollTrigger: {
      trigger: '#works',
      start: 'top 75%',
      toggleActions: 'play none none reverse'
    }
  });

  gsap.from('.about-text', {
    x: -36,
    opacity: 0,
    duration: 0.95,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#about',
      start: 'top 75%',
      toggleActions: 'play none none reverse'
    }
  });

  gsap.from('.about-image', {
    x: 36,
    opacity: 0,
    duration: 0.95,
    ease: 'power3.out',
    delay: 0.12,
    scrollTrigger: {
      trigger: '#about',
      start: 'top 75%',
      toggleActions: 'play none none reverse'
    }
  });

  gsap.from('.about-actions .cta-bar', {
    y: 22,
    opacity: 0,
    duration: 0.75,
    ease: 'power3.out',
    stagger: 0.10,
    scrollTrigger: {
      trigger: '#about',
      start: 'top 75%',
      toggleActions: 'play none none reverse'
    }
  });
})();
