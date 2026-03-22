// script.js - Cleaned, consolidated & improved version (March 2026)

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 3. Header scrolled effect
    window.addEventListener('scroll', () => {
        document.querySelector('header')?.classList.toggle('scrolled', window.scrollY > 50);
    });

    // 4. Fade-in sections/cards/items on scroll
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

    // ────────────────────────────────────────────────────────────────
    // GALLERY FILTERS + LIGHTBOX
    // ────────────────────────────────────────────────────────────────

    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

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

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');

    if (lightbox && lightboxImg && closeBtn) {
        let currentIndex = 0;

        // Get only visible (filtered) gallery items
        const getVisibleItems = () => 
            Array.from(galleryItems).filter(item => item.style.display !== 'none');

        // Show image at given index (with wrap-around)
        function showImage(index) {
            const visible = getVisibleItems();
            if (visible.length === 0) return;

            if (index < 0) index = visible.length - 1;
            if (index >= visible.length) index = 0;

            currentIndex = index;

            const item = visible[index];
            const img = item.querySelector('img');

            if (!img) return;

            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || 'Project image';

            const h4 = item.querySelector('h4');
            const p = item.querySelector('p');
            lightboxCaption.innerHTML = h4 ? 
                `<strong>${h4.textContent}</strong><br>${p?.textContent || ''}` : 
                (p?.textContent || '');
            
            lightbox.style.display = 'flex';
        }

        // Open lightbox from any gallery item
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentIndex = index;
                showImage(currentIndex);
            });
        });

        // Close lightbox
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });

        // Keyboard navigation (arrows + ESC)
        document.addEventListener('keydown', e => {
            if (lightbox.style.display !== 'flex') return;

            if (e.key === 'Escape') {
                lightbox.style.display = 'none';
            } else if (e.key === 'ArrowLeft') {
                showImage(currentIndex - 1);
            } else if (e.key === 'ArrowRight') {
                showImage(currentIndex + 1);
            }
        });

        // Arrow buttons (add these to your HTML inside .lightbox if not already there)
        document.querySelector('.lightbox-prev')?.addEventListener('click', e => {
            e.stopPropagation();
            showImage(currentIndex - 1);
        });

        document.querySelector('.lightbox-next')?.addEventListener('click', e => {
            e.stopPropagation();
            showImage(currentIndex + 1);
        });
    }

    // ────────────────────────────────────────────────────────────────
    // CONTACT FORM VALIDATION (only runs if form exists on the page)
    // ────────────────────────────────────────────────────────────────

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

            // In real use → replace this with actual submit (Formspree, EmailJS, etc.)
            alert('Thank you! Your message has been sent (this is a simulation).');
            form.reset();
        });
    }

});
