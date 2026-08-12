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


// === MOBILE AUTO-SCROLL CAROUSEL ===
(function() {
    if (window.innerWidth > 768) return; // Only on mobile

    const carousels = document.querySelectorAll('.services-grid, .packages-grid, .whyus-grid, .gallery-grid');

    carousels.forEach(carousel => {
        let isPaused = false;
        let resumeTimeout;
        const items = carousel.querySelectorAll('.service-card, .package-card, .whyus-item, .gallery-item');
        let currentIndex = 0;
        const totalItems = items.length;

        function doScroll() {
            if (isPaused || totalItems === 0) return;

            currentIndex++;

            if (currentIndex >= totalItems) {
                // Jump instantly to first (no reverse animation)
                carousel.scrollTo({ left: 0, behavior: 'instant' });
                currentIndex = 0;
            } else {
                // Smooth scroll to next item
                const itemWidth = items[0].offsetWidth + 12;
                carousel.scrollTo({ left: itemWidth * currentIndex, behavior: 'smooth' });
            }
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
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchmove', (e) => {
            const touchDiffX = Math.abs(e.touches[0].clientX - touchStartX);
            if (touchDiffX > 10) {
                isPaused = true;
                clearTimeout(resumeTimeout);
                resumeTimeout = setTimeout(() => { isPaused = false; }, 6000);
            }
        });

        // Sync currentIndex when user manually scrolls
        carousel.addEventListener('scrollend', () => {
            if (items.length > 0) {
                const itemWidth = items[0].offsetWidth + 12;
                currentIndex = Math.round(carousel.scrollLeft / itemWidth);
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
