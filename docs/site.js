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
})();
