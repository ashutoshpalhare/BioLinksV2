/* =====================================================================
   Ashutosh Palhare — Premium Digital Business Card
   script.js
   ===================================================================== */
(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  /* ---------- Loader ---------- */
  function hideLoader() {
    const loader = $('#loader');
    if (!loader) return;
    loader.classList.add('is-done');
    setTimeout(() => loader.remove(), 700);
  }
  window.addEventListener('load', () => setTimeout(hideLoader, 400));
  setTimeout(hideLoader, 3500);

  /* ---------- Year ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Reveal on scroll ---------- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !prefersReduced) {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const delay = parseInt(e.target.dataset.delay || '0', 10);
          setTimeout(() => e.target.classList.add('is-visible'), delay);
          ro.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach((r) => ro.observe(r));
  } else {
    reveals.forEach((r) => r.classList.add('is-visible'));
  }

  /* ---------- GSAP card entrance ---------- */
  if (window.gsap && !prefersReduced) {
    const tl = gsap.timeline({ delay: 0.45, defaults: { ease: 'power3.out' } });
    tl.from('.card', { y: 28, opacity: 0, duration: 0.8 })
      .from('.avatar', { scale: 0.85, opacity: 0, duration: 0.7 }, '-=0.5')
      .from('.profile__name', { y: 14, opacity: 0, duration: 0.5 }, '-=0.4')
      .from('.profile__username', { y: 10, opacity: 0, duration: 0.5 }, '-=0.4')
      .from('.profile__bio', { y: 10, opacity: 0, duration: 0.5 }, '-=0.4')
      .from('.profile__meta', { y: 8, opacity: 0, duration: 0.45 }, '-=0.4')
      .from('.soc', { y: 12, opacity: 0, duration: 0.4, stagger: 0.05 }, '-=0.3')
      .from('.link-card', { y: 12, opacity: 0, duration: 0.4, stagger: 0.06 }, '-=0.2')
      .from('.action', { y: 10, opacity: 0, duration: 0.4, stagger: 0.08 }, '-=0.2');
  }

  /* ---------- Theme toggle ---------- */
  const themeToggle = $('#theme-toggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('ap-theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);
  updateThemeIcon();
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('ap-theme', next);
      updateThemeIcon();
      toast(next === 'light' ? 'Light mode' : 'Dark mode', 'fa-' + (next === 'light' ? 'sun' : 'moon'));
    });
  }
  function updateThemeIcon() {
    if (!themeToggle) return;
    const i = themeToggle.querySelector('i');
    if (!i) return;
    i.className = root.getAttribute('data-theme') === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }

  /* ---------- Toast ---------- */
  const toastWrap = $('#toasts');
  function toast(msg, icon = 'fa-circle-check') {
    if (!toastWrap) return;
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = '<i class="fa-solid ' + icon + '" aria-hidden="true"></i><span>' + msg + '</span>';
    toastWrap.appendChild(t);
    setTimeout(() => {
      t.classList.add('is-out');
      setTimeout(() => t.remove(), 400);
    }, 2200);
  }

  /* ---------- Copy & share ---------- */
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; }
    catch { return false; }
  }

  $$('[data-copy]').forEach((b) => {
    b.addEventListener('click', async () => {
      const ok = await copyText(b.dataset.copy);
      toast(ok ? 'Link copied to clipboard' : 'Copy failed', ok ? 'fa-link' : 'fa-triangle-exclamation');
    });
  });

  $$('[data-copy-text]').forEach((b) => {
    b.addEventListener('click', async () => {
      const ok = await copyText(b.dataset.copyText);
      toast(ok ? 'Email copied to clipboard' : 'Copy failed', ok ? 'fa-envelope' : 'fa-triangle-exclamation');
    });
  });

  $$('[data-share]').forEach((b) => {
    b.addEventListener('click', async () => {
      const url = location.href;
      if (navigator.share) {
        try { await navigator.share({ title: document.title, url }); } catch {}
      } else {
        const ok = await copyText(url);
        toast(ok ? 'Profile link copied' : 'Share failed', ok ? 'fa-share-nodes' : 'fa-triangle-exclamation');
      }
    });
  });

  /* ---------- Ripple effect ---------- */
  $$('.ripple').forEach((el) => {
    el.addEventListener('click', (e) => {
      const rect = el.getBoundingClientRect();
      const r = document.createElement('span');
      r.className = 'rip';
      const size = Math.max(rect.width, rect.height);
      r.style.width = r.style.height = size + 'px';
      r.style.left = (e.clientX - rect.left) + 'px';
      r.style.top = (e.clientY - rect.top) + 'px';
      el.appendChild(r);
      setTimeout(() => r.remove(), 650);
    });
  });

  /* ---------- Custom cursor ---------- */
  if (!isTouch) {
    const cursor = $('#cursor');
    const glow = $('#cursor-glow');
    let cx = 0, cy = 0, gx = 0, gy = 0;
    document.addEventListener('mousemove', (e) => { cx = e.clientX; cy = e.clientY; if (cursor) { cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px'; } });
    function followGlow() {
      gx += (cx - gx) * 0.12; gy += (cy - gy) * 0.12;
      if (glow) { glow.style.left = gx + 'px'; glow.style.top = gy + 'px'; }
      requestAnimationFrame(followGlow);
    }
    followGlow();
    const hoverables = 'a, button, .link-card, .soc, .action, .theme-fab';
    document.addEventListener('mouseover', (e) => { if (e.target.closest(hoverables) && cursor) cursor.classList.add('is-hover'); });
    document.addEventListener('mouseout', (e) => { if (e.target.closest(hoverables) && cursor) cursor.classList.remove('is-hover'); });
  }

  /* ---------- Mouse spotlight + parallax ---------- */
  const spotlight = $('#spotlight');
  const blobs = $$('.bg__blob');
  if (!isTouch && !prefersReduced) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      if (spotlight) { spotlight.style.left = x + '%'; spotlight.style.top = y + '%'; }
      blobs.forEach((b, i) => {
        const depth = (i + 1) * 7;
        const dx = (e.clientX - window.innerWidth / 2) / window.innerWidth * depth;
        const dy = (e.clientY - window.innerHeight / 2) / window.innerHeight * depth;
        b.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      });
    });
  }

  /* ---------- Tilt on card (subtle) ---------- */
  const card = $('.card');
  if (card && !isTouch && !prefersReduced) {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -6;
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
      card.style.transform = 'perspective(1000px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  }

  /* ---------- Magnetic buttons ---------- */
  if (!isTouch && !prefersReduced) {
    $$('.magnetic').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        el.style.transform = 'translate(' + mx * 0.25 + 'px,' + my * 0.35 + 'px)';
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- Particles (lightweight canvas) ---------- */
  const canvas = $('#particles');
  if (canvas && !prefersReduced) {
    const ctx = canvas.getContext('2d');
    let w, h, particles, raf;
    const COUNT = window.innerWidth < 760 ? 26 : 52;

    function resize() {
      w = canvas.width = window.innerWidth * devicePixelRatio;
      h = canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    }
    function init() {
      resize();
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
        r: (Math.random() * 1.6 + 0.4) * devicePixelRatio,
        a: Math.random() * 0.5 + 0.2
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      const light = root.getAttribute('data-theme') === 'light';
      ctx.fillStyle = light ? 'rgba(20,24,60,0.7)' : 'rgba(255,255,255,0.8)';
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }
    init(); draw();
    window.addEventListener('resize', () => { cancelAnimationFrame(raf); init(); draw(); });
  }
})();
