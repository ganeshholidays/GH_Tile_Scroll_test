/* ============================================
   GANESH TRAVELS - Main JavaScript
   Animations, Navigation, Counters
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // === NAVBAR SCROLL EFFECT ===
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar shadow on scroll
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Back to top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // === MOBILE MENU ===
    const hamburger = document.getElementById('navHamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // === ANIMATED COUNTERS ===
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });

        countersAnimated = true;
    }

    // === SCROLL ANIMATIONS (Fade-in) ===
    function addFadeInClass() {
        const elements = document.querySelectorAll(
            '.service-card, .package-card, .whyus-item, .gallery-item, .review-card, .stat-card, .about-text'
        );
        elements.forEach(el => {
            el.classList.add('fade-in');
        });
    }

    addFadeInClass();

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Observer for counters section
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterObserver.observe(statsSection);
    }

    // === SMOOTH SCROLL FOR NAVIGATION LINKS ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // === ACTIVE NAV LINK HIGHLIGHT ON SCROLL ===
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // === CONTACT FORM HANDLING ===
    const contactForm = document.getElementById('enquiryForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const destination = formData.get('destination');
            const message = formData.get('message');

            // Build WhatsApp message
            const whatsappMsg = encodeURIComponent(
                `Hello Ganesh Holidays!\n\nName: ${name}\nPhone: ${phone}\nDestination: ${destination}\nMessage: ${message}`
            );

            // Open WhatsApp (change number to actual number)
            window.open(`https://wa.me/917708109824?text=${whatsappMsg}`, '_blank');

            // Reset form
            contactForm.reset();

            // Show success message
            alert('Thank you! Your enquiry has been sent via WhatsApp.');
        });
    }

});


// === MOBILE AUTO-SCROLL CAROUSEL (Infinite Loop) ===
(function() {
    if (window.innerWidth > 768) return; // Only on mobile

    const carousels = document.querySelectorAll('.services-grid, .packages-grid, .whyus-grid, .gallery-grid, .reviews-grid');

    carousels.forEach(carousel => {
        let isPaused = false;
        let resumeTimeout;
        const items = carousel.querySelectorAll('.service-card, .package-card, .whyus-item, .gallery-item, .review-card');
        if (items.length === 0) return;

        // Clone all items and append to create infinite illusion
        items.forEach(item => {
            const clone = item.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            carousel.appendChild(clone);
        });

        const itemWidth = items[0].offsetWidth + 12; // width + gap
        const totalOriginalWidth = itemWidth * items.length;

        function doScroll() {
            if (isPaused) return;
            carousel.scrollBy({ left: itemWidth, behavior: 'smooth' });

            // When we've scrolled past all original items, jump back silently
            setTimeout(() => {
                if (carousel.scrollLeft >= totalOriginalWidth) {
                    carousel.style.scrollBehavior = 'auto';
                    carousel.scrollLeft = carousel.scrollLeft - totalOriginalWidth;
                    carousel.style.scrollBehavior = '';
                }
            }, 500);
        }

        // Auto-scroll every 2 seconds
        let scrollInterval = setInterval(doScroll, 2000);

        // Pause on tap (click)
        carousel.addEventListener('click', () => {
            isPaused = true;
            clearTimeout(resumeTimeout);
            resumeTimeout = setTimeout(() => { isPaused = false; }, 6000);
        });

        // Pause on manual horizontal scroll (touch drag)
        let touchStartX = 0;
        let touchStartY = 0;
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });

        carousel.addEventListener('touchmove', (e) => {
            const touchDiffX = Math.abs(e.touches[0].clientX - touchStartX);
            const touchDiffY = Math.abs(e.touches[0].clientY - touchStartY);
            // Only pause if swiping MORE horizontally than vertically (intentional swipe)
            if (touchDiffX > 30 && touchDiffX > touchDiffY * 1.5) {
                isPaused = true;
                clearTimeout(resumeTimeout);
                resumeTimeout = setTimeout(() => { isPaused = false; }, 6000);
            }
        });

        // Resume when section scrolls into view, pause when out
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    isPaused = false;
                } else {
                    isPaused = true;
                }
            });
        }, { threshold: 0.3 });

        observer.observe(carousel);
    });
})();
