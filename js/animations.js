/* MJCS — animations.js
   Animated dot grid (13×13 from center) + scroll-drawn SVG lines.
   Uses anime.js v4 loaded via CDN in each page.
*/
(function () {
  'use strict';

  function initDotGrid() {
    const container = document.querySelector('[data-dot-grid]');
    if (!container || !window.anime) return;
    container.innerHTML = '';
    const total = 13 * 13;
    for (let i = 0; i < total; i++) {
      const span = document.createElement('span');
      span.className = 'dot';
      container.appendChild(span);
    }

    const A = window.anime;
    if (typeof A.createTimeline === 'function' && typeof A.stagger === 'function') {
      const options = { grid: [13, 13], from: 'center' };
      const tl = A.createTimeline({ loop: true });
      tl.add('[data-dot-grid] .dot', {
        scale: A.stagger([1.4, 0.6], options),
        opacity: A.stagger([1, 0.35], options),
        ease: 'inOutQuad',
        duration: 1200,
      }, A.stagger(120, options))
        .add('[data-dot-grid] .dot', {
          scale: 1,
          opacity: 0.6,
          ease: 'inOutQuad',
          duration: 900,
        }, '+=200');
    } else {
      // fallback: simple pulse via CSS
      container.querySelectorAll('.dot').forEach((d, i) => {
        d.style.animation = `float ${2 + (i % 5) * 0.2}s ease-in-out infinite`;
      });
    }
  }

  function initDrawLines() {
    const svg = document.querySelector('[data-draw-lines]');
    if (!svg) return;
    // Build the path content
    const ns = 'http://www.w3.org/2000/svg';
    svg.innerHTML = '';
    for (let i = 0; i < 24; i++) {
      const y = 40 + i * 22;
      const p = document.createElementNS(ns, 'path');
      p.setAttribute('d', `M 40 ${y} Q ${200 + i * 12} ${y - 60 + (i % 5) * 18} 760 ${y + (i % 7) * 6}`);
      svg.appendChild(p);
    }
    const chev1 = document.createElementNS(ns, 'path');
    chev1.setAttribute('d', 'M 200 460 L 400 280 L 600 460');
    chev1.setAttribute('stroke-width', '3');
    svg.appendChild(chev1);
    const chev2 = document.createElementNS(ns, 'path');
    chev2.setAttribute('d', 'M 280 510 L 400 390 L 520 510');
    chev2.setAttribute('stroke-width', '3');
    svg.appendChild(chev2);

    // Prep stroke-dash for "drawing" effect
    const paths = svg.querySelectorAll('path');
    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
    });

    const A = window.anime;
    if (A && typeof A.animate === 'function' && typeof A.onScroll === 'function') {
      try {
        A.animate(paths, {
          strokeDashoffset: [
            { to: (el) => el.getTotalLength() },
            { to: 0 },
          ],
          delay: A.stagger(40),
          duration: 2200,
          ease: 'inOut(3)',
          autoplay: A.onScroll({ sync: true }),
        });
        return;
      } catch (e) { /* fall through */ }
    }
    // Fallback: draw on scroll using IntersectionObserver
    const draw = () => {
      const rect = svg.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      paths.forEach((p, i) => {
        const len = p.getTotalLength();
        const local = Math.max(0, Math.min(1, progress * 1.4 - i * 0.02));
        p.style.strokeDashoffset = len * (1 - local);
      });
    };
    draw();
    window.addEventListener('scroll', draw, { passive: true });
    window.addEventListener('resize', draw);
  }

  function init() {
    initDotGrid();
    initDrawLines();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
