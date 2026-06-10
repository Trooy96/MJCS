/* About page: team member dialog */
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('member-dialog');
    if (!overlay) return;
    const photo = document.getElementById('md-photo');
    const name = document.getElementById('md-name');
    const role = document.getElementById('md-role');
    const about = document.getElementById('md-about');
    const email = document.getElementById('md-email');
    const phone = document.getElementById('md-phone');
    const closeBtn = document.getElementById('md-close');

    document.querySelectorAll('[data-member]').forEach((card) => {
      card.addEventListener('click', function () {
        photo.src = card.getAttribute('data-img');
        photo.alt = card.getAttribute('data-name');
        name.textContent = card.getAttribute('data-name');
        role.textContent = card.getAttribute('data-role');
        about.textContent = card.getAttribute('data-about');
        const e = card.getAttribute('data-email');
        const p = card.getAttribute('data-phone');
        email.textContent = e;
        email.href = 'mailto:' + e;
        phone.textContent = p;
        phone.href = 'tel:' + p.replace(/\s/g, '');
        overlay.classList.add('open');
      });
    });

    function close() { overlay.classList.remove('open'); }
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  });
})();
