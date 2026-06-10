/* MJCS — main.js
   Handles: nav scroll state, mobile menu, dark/light theme,
   reveal-on-scroll, current-page link highlighting, toast helper.
*/
(function () {
  'use strict';

  /* ---------- Theme ---------- */
  const THEME_KEY = 'mjcs-theme';
  function getInitialTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function applyTheme(t) {
    document.documentElement.classList.toggle('dark', t === 'dark');
    localStorage.setItem(THEME_KEY, t);
    const sun = document.querySelector('[data-icon="sun"]');
    const moon = document.querySelector('[data-icon="moon"]');
    if (sun && moon) {
      sun.style.display = t === 'dark' ? 'inline' : 'none';
      moon.style.display = t === 'dark' ? 'none' : 'inline';
    }
  }
  applyTheme(getInitialTheme());

  /* ---------- DOM ready ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    /* Theme toggle */
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    }

    /* Navbar scroll state */
    const nav = document.querySelector('.navbar');
    function onScroll() {
      if (!nav) return;
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* Mobile menu */
    const menuBtn = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenIcon = document.getElementById('menu-icon-open');
    const menuCloseIcon = document.getElementById('menu-icon-close');
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', function () {
        const isOpen = mobileMenu.classList.toggle('open');
        if (menuOpenIcon && menuCloseIcon) {
          menuOpenIcon.style.display = isOpen ? 'none' : 'inline';
          menuCloseIcon.style.display = isOpen ? 'inline' : 'none';
        }
      });
    }

    /* Active link highlighting */
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('[data-nav-link]').forEach(function (a) {
      const href = a.getAttribute('href');
      const normalized = href === '/index.html' || href === 'index.html' ? '/' : href.replace(/\.html$/, '').replace(/^\.\//, '/');
      const current = path === '/' ? '/' : path.replace(/\.html$/, '');
      const matches =
        (normalized === '/' && (current === '/' || current.endsWith('/index'))) ||
        (normalized !== '/' && current.endsWith(normalized.replace(/^\//, '')));
      if (matches) a.classList.add('active');
    });

    /* Footer year */
    const yr = document.getElementById('year');
    if (yr) yr.textContent = new Date().getFullYear();

    /* Reveal on scroll */
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  });

  /* ---------- Toast helper (used by contact form) ---------- */
  window.MJCS_toast = function (title, desc) {
    let el = document.getElementById('mjcs-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'mjcs-toast';
      el.className = 'toast';
      el.innerHTML = '<div class="t-title"></div><div class="t-desc"></div>';
      document.body.appendChild(el);
    }
    el.querySelector('.t-title').textContent = title || '';
    el.querySelector('.t-desc').textContent = desc || '';
    el.classList.add('show');
    clearTimeout(window.__mjcsToastT);
    window.__mjcsToastT = setTimeout(function () { el.classList.remove('show'); }, 3500);
  };
})();
