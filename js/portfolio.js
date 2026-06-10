/* Portfolio: filter chips + lightbox */
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    const chips = document.querySelectorAll('[data-filter]');
    const cards = document.querySelectorAll('[data-cat]');
    chips.forEach((chip) => {
      chip.addEventListener('click', function () {
        chips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        const f = chip.getAttribute('data-filter');
        cards.forEach((card) => {
          const show = f === 'All' || card.getAttribute('data-cat') === f;
          card.style.display = show ? '' : 'none';
        });
      });
    });

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    document.querySelectorAll('[data-lightbox]').forEach((btn) => {
      btn.addEventListener('click', function () {
        const src = btn.getAttribute('data-lightbox');
        lightboxImg.src = src;
        lightbox.classList.add('open');
      });
    });
    if (lightbox) {
      lightbox.addEventListener('click', function () {
        lightbox.classList.remove('open');
        lightboxImg.src = '';
      });
    }
  });
})();
