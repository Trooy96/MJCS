/* Contact form: opens user's mail client with prefilled body */
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const subject = 'MJCS Quote Request — ' + (data.get('subject') || '');
      const body =
        'Name: ' + (data.get('name') || '') + '\n' +
        'Email: ' + (data.get('email') || '') + '\n' +
        'Phone: ' + (data.get('phone') || '') + '\n\n' +
        (data.get('message') || '');
      window.location.href =
        'mailto:Massjuniorsuppliers@gmail.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      if (window.MJCS_toast) {
        window.MJCS_toast('Opening your email app…', "We'll respond within one business day.");
      }
    });
  });
})();
