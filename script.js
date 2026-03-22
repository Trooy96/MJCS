// script.js - Cleaned & Consolidated Version

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        document.querySelector('header')?.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Fade-in animations on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section, .card, .gallery-item').forEach(el => {
        el.classList.add('fade-section');
        observer.observe(el);
    });

    // ── Gallery Filters ────────────────────────────────────────────────
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter items
            const filter = btn.dataset.filter;
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ── Gallery Lightbox (using existing HTML #lightbox) ───────────────
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');

    if (lightbox && lightboxImg && closeBtn) {
        // Open lightbox from gallery item click
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Prevent any nested clicks (e.g. from overlay) from bubbling weirdly
                // e.stopPropagation();  // usually not needed here

                const img = item.querySelector('img');
                if (!img) return;

                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;

                // Build nice caption
                const title = item.querySelector('h4')?.textContent || '';
                const desc = item.querySelector('p')?.textContent || '';
                lightboxCaption.innerHTML = title ? `<strong>${title}</strong><br>${desc}` : desc;

                lightbox.style.display = 'flex';
            });
        });

        // Close lightbox
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        // Close when clicking outside image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });

        // Close with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                lightbox.style.display = 'none';
            }
        });
    }

    // ── Contact Form Validation (if form exists on page) ───────────────
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = form.querySelector('input[name="name"]')?.value.trim();
            const email = form.querySelector('input[name="email"]')?.value.trim();
            const message = form.querySelector('textarea')?.value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            if (!/\S+@\S+\.\S+/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // In production → replace with real submit (Formspree, emailJS, etc.)
            alert('Thank you! Your message has been sent (simulation).');
            form.reset();
        });
    }
});
