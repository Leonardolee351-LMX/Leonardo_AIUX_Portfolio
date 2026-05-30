(function () {
  const STORAGE_KEY = 'theme';
  const ROOT = document.documentElement;

  function setTheme(theme) {
    ROOT.setAttribute('data-theme', theme);
    if (document.body) document.body.setAttribute('data-theme', theme);
  }

  function getTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function toggleTheme() {
    const current = ROOT.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  setTheme(getTheme());

  const themeButtons = Array.from(
    document.querySelectorAll('[data-theme-toggle], #themeToggle, #navThemeToggle')
  ).filter(Boolean);

  themeButtons.forEach((btn) => {
    btn.addEventListener('click', toggleTheme);
  });

  function initMobileMenu() {
    const menuButton = document.querySelector('.nav-toggle');
    const menu = document.getElementById('mobileMenu');
    if (!menuButton || !menu) return;

    let isOpen = false;

    function ensureToc() {
      const tocHost = menu.querySelector('[data-mobile-toc]');
      if (!tocHost) return;
      if (tocHost.dataset.ready === 'true') return;
      const toc = document.querySelector('.toc-list');
      if (!toc) return;

      const title = document.createElement('div');
      title.className = 'mobile-menu-title';
      title.textContent = '目录';

      const list = toc.cloneNode(true);
      list.querySelectorAll('a').forEach((a) => a.classList.remove('active'));

      tocHost.appendChild(title);
      tocHost.appendChild(list);
      tocHost.dataset.ready = 'true';
    }

    function openMenu() {
      ensureToc();
      menu.hidden = false;
      menuButton.setAttribute('aria-expanded', 'true');
      isOpen = true;
    }

    function closeMenu() {
      menu.hidden = true;
      menuButton.setAttribute('aria-expanded', 'false');
      isOpen = false;
    }

    function onDocClick(e) {
      if (!isOpen) return;
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (menu.contains(target) || menuButton.contains(target)) return;
      closeMenu();
    }

    function onKeyDown(e) {
      if (e.key !== 'Escape') return;
      if (!isOpen) return;
      closeMenu();
    }

    menuButton.addEventListener('click', () => {
      if (isOpen) closeMenu();
      else openMenu();
    });

    menu.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (target.closest('a')) closeMenu();
    });

    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeyDown);

    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 769px)').matches) closeMenu();
    });
  }

  function initImagePreview() {
    const pathname = String(location.pathname || '').replace(/\\/g, '/');
    if (!pathname.includes('/cases/')) return;
    const main = document.querySelector('.main');
    if (!main) return;

    main.querySelectorAll('img').forEach((img) => {
      img.classList.add('img-previewable');
      if (!img.hasAttribute('tabindex')) img.setAttribute('tabindex', '0');
    });

    let overlay = null;
    let overlayImg = null;
    let lastActive = null;

    function close() {
      if (!overlay) return;
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('img-preview-open');
      if (lastActive && 'focus' in lastActive) lastActive.focus();
      lastActive = null;
    }

    function ensureOverlay() {
      if (overlay && overlayImg) return;
      overlay = document.createElement('div');
      overlay.className = 'img-preview-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-hidden', 'true');

      const closeBtn = document.createElement('button');
      closeBtn.className = 'img-preview-overlay__close';
      closeBtn.type = 'button';
      closeBtn.setAttribute('aria-label', '关闭图片预览');
      closeBtn.textContent = '×';

      overlayImg = document.createElement('img');
      overlayImg.className = 'img-preview-overlay__img';
      overlayImg.alt = '';

      overlay.appendChild(closeBtn);
      overlay.appendChild(overlayImg);
      document.body.appendChild(overlay);

      overlay.addEventListener('click', (e) => {
        const target = e.target;
        if (!(target instanceof Element)) return;
        if (target === overlay) close();
      });

      closeBtn.addEventListener('click', close);

      document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        if (!overlay || !overlay.classList.contains('is-open')) return;
        close();
      });
    }

    function openFromImage(img) {
      const src = img.currentSrc || img.src;
      if (!src) return;
      ensureOverlay();
      if (!overlay || !overlayImg) return;
      lastActive = document.activeElement;
      overlayImg.src = src;
      overlayImg.alt = img.alt || '';
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('img-preview-open');
    }

    main.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const img = target.closest('img');
      if (!img) return;
      if (!main.contains(img)) return;
      if (img.closest('a')) return;
      openFromImage(img);
    });

    main.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const target = e.target;
      if (!(target instanceof Element)) return;
      const img = target.closest('img');
      if (!img) return;
      if (!main.contains(img)) return;
      e.preventDefault();
      openFromImage(img);
    });
  }

  initMobileMenu();
  initImagePreview();
})();
