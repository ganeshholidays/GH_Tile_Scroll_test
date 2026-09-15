/* ============================================
   GANESH TRAVELS - Main JavaScript
   Animations, Navigation, Counters
   ============================================ */

// === HERO: Auto-detect festival banner or video ===
// Priority: festival.jpg > hero-video.mp4 (fallback: hero.jpg) > hero-default.jpg
(function() {
    const hero = document.querySelector('.hero');
    const heroImg = document.querySelector('.hero-img');
    const heroVideo = document.querySelector('.hero-video');
    if (!hero || !heroImg) return;

    var festivalFile = 'assets/hero/festival.jpg';

    // Step 1: Check if festival image exists
    var testFestival = new Image();
    testFestival.onload = function() {
        heroImg.src = festivalFile;
        hero.classList.add('festival-mode');
    };
    testFestival.onerror = function() {
        // Step 2: Check if video FILE exists by trying to fetch it
        fetch('assets/hero/hero-video.mp4', { method: 'HEAD' })
            .then(function(response) {
                if (response.ok) {
                    // Video file exists — try to play it
                    loadVideo();
                } else {
                    // Video file not found (404) — go to hero-default.jpg
                    loadHeroDefault();
                }
            })
            .catch(function() {
                // Fetch failed — go to hero-default.jpg
                loadHeroDefault();
            });
    };
    testFestival.src = festivalFile;

    // Step 2b: Try playing the video, fallback to hero.jpg after 10 sec
    function loadVideo() {
        if (!heroVideo) {
            loadHeroDefault();
            return;
        }

        var videoLoaded = false;

        heroVideo.addEventListener('canplay', function() {
            if (videoLoaded) return;
            videoLoaded = true;
            hero.classList.add('video-mode');
            heroVideo.play().catch(function() {
                // Autoplay blocked — fall back to hero.jpg
                hero.classList.remove('video-mode');
                loadHeroJpg();
            });
        }, { once: true });

        var sourceEl = heroVideo.querySelector('source');
        if (sourceEl) {
            sourceEl.addEventListener('error', function() {
                if (videoLoaded) return;
                videoLoaded = true;
                loadHeroJpg();
            }, { once: true });
        }

        heroVideo.load();

        // Timeout — if video doesn't play in 10 seconds, show hero.jpg
        setTimeout(function() {
            if (!videoLoaded && !hero.classList.contains('video-mode')) {
                videoLoaded = true;
                loadHeroJpg();
            }
        }, 10000);
    }

    // Step 3: hero.jpg — video fallback (same height/fit as video, no text)
    function loadHeroJpg() {
        heroImg.src = 'assets/hero/hero.jpg';
        hero.classList.add('hero-fallback-mode');
    }

    // Step 4: hero-default.jpg — no video exists, full screen + blue shade + text
    function loadHeroDefault() {
        heroImg.src = 'assets/hero/hero-default.jpg';
        hero.classList.add('normal-mode');
    }
})();

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


// === SWIPER CAROUSELS ===
const swiperConfig = {
    slidesPerView: 1,
    spaceBetween: 12,
    loop: true,
    centeredSlides: true,
    observer: true,
    observeParents: true,
    autoplay: {
        delay: 2200,
        disableOnInteraction: true,
    },
    touchEventsTarget: 'wrapper',
    touchRatio: 1,
    threshold: 17,
};

// Pause autoplay for 5 seconds on touch, then resume
function addPauseOnTouch(swiper) {
    const el = swiper.el;
    el.addEventListener('touchend', () => {
        swiper.autoplay.stop();
        setTimeout(() => {
            swiper.autoplay.start();
        }, 5000);
    });
}

if (window.innerWidth <= 768) {
    // Mobile: All sections as carousels
    const servicesSwiper = new Swiper('.services-swiper', { ...swiperConfig });
    addPauseOnTouch(servicesSwiper);

    const packagesSwiper = new Swiper('.packages-swiper', { ...swiperConfig });
    addPauseOnTouch(packagesSwiper);

    const whyusSwiper = new Swiper('.whyus-swiper', { ...swiperConfig });
    addPauseOnTouch(whyusSwiper);
}

// Reviews carousel — fetch Google Sheet reviews first, then initialize swiper
const REVIEWS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby-KUQsQT21ieeWNWbKTj8OyLINmpC22OXIfVM3VmKEwPEM1FkbX4XTpqd12YRw6a6jEQ/exec';

function getInitials(name) {
    if (!name) return '??';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    let html = '';
    for (let i = 0; i < fullStars; i++) {
        html += '<i class="fas fa-star"></i>';
    }
    if (halfStar) {
        html += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        html += '<i class="far fa-star"></i>';
    }
    return html;
}

function createReviewCard(review) {
    const div = document.createElement('div');
    div.className = 'swiper-slide review-card';

    var tripInfo = review.destination + ' Trip';
    if (review.timestamp) {
        try {
            var d = new Date(review.timestamp);
            if (!isNaN(d.getTime())) {
                var months = ['January','February','March','April','May','June',
                              'July','August','September','October','November','December'];
                tripInfo += ', ' + months[d.getMonth()] + ' ' + d.getFullYear();
            }
        } catch(e) {}
    }

    div.innerHTML = `
        <div class="review-stars">
            ${generateStars(Number(review.rating) || 5)}
        </div>
        <p class="review-text">"${review.feedback}"</p>
        <div class="review-author">
            <div class="review-avatar">${getInitials(review.name)}</div>
            <div>
                <strong>${review.name}</strong>
                <span>${tripInfo}</span>
            </div>
        </div>
    `;
    return div;
}

function initReviewsSwiper() {
    var inst = new Swiper('.reviews-swiper', {
        ...swiperConfig,
        slidesPerView: 1,
        navigation: {
            nextEl: '.reviews-next',
            prevEl: '.reviews-prev',
        },
        breakpoints: {
            769: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: false,
            }
        }
    });
    addPauseOnTouch(inst);
}

// Fetch Google Sheet reviews, add to DOM, then init swiper
(function() {
    if (REVIEWS_SCRIPT_URL && REVIEWS_SCRIPT_URL !== 'YOUR_APPS_SCRIPT_URL') {
        fetch(REVIEWS_SCRIPT_URL)
            .then(function(res) { return res.json(); })
            .then(function(reviews) {
                if (reviews && reviews.length) {
                    var wrapper = document.querySelector('.reviews-swiper .swiper-wrapper');
                    if (wrapper) {
                        reviews.forEach(function(review) {
                            wrapper.appendChild(createReviewCard(review));
                        });
                    }
                }
                initReviewsSwiper();
            })
            .catch(function() {
                // Fetch failed — init swiper with hardcoded reviews only
                initReviewsSwiper();
            });
    } else {
        initReviewsSwiper();
    }
})();

// Gallery carousel (works on both mobile and desktop)
fetch('assets/photos.json')
    .then(res => res.json())
    .then(photos => {
        const wrapper = document.getElementById('galleryWrapper');
        photos.forEach(photo => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide gallery-item';
            slide.innerHTML = `<img src="assets/gallery/${photo}" alt="Travel moment" loading="lazy">`;
            wrapper.appendChild(slide);
        });
        const gallerySwiper = new Swiper('.gallery-swiper', {
            ...swiperConfig,
            slidesPerView: 1,
            breakpoints: {
                769: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                    centeredSlides: false,
                }
            }
        });
        addPauseOnTouch(gallerySwiper);
    })
    .catch(() => {
        document.getElementById('galleryWrapper').innerHTML = '<p style="text-align:center;color:#888;padding:20px;">Gallery loading...</p>';
    });


// === GALLERY LIGHTBOX ===
var galleryPhotos = [];
var currentViewerIndex = 0;

function openLightbox() {
    var lightbox = document.getElementById('galleryLightbox');
    var grid = document.getElementById('lightboxGrid');
    if (!lightbox || !grid || galleryPhotos.length === 0) return;

    grid.innerHTML = '';
    galleryPhotos.forEach(function(photo, index) {
        var img = document.createElement('img');
        img.src = 'assets/gallery/' + photo;
        img.alt = 'Travel photo';
        img.loading = 'lazy';
        img.onclick = function() { openViewer(index); };
        grid.appendChild(img);
    });

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    var lightbox = document.getElementById('galleryLightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openViewer(index) {
    currentViewerIndex = index;
    var viewer = document.getElementById('imageViewer');
    var img = document.getElementById('viewerImg');
    if (!viewer || !img) return;

    img.src = 'assets/gallery/' + galleryPhotos[index];
    viewer.classList.add('active');
}

function closeViewer() {
    var viewer = document.getElementById('imageViewer');
    if (viewer) {
        viewer.classList.remove('active');
    }
}

function viewerNav(direction) {
    currentViewerIndex += direction;
    if (currentViewerIndex < 0) currentViewerIndex = galleryPhotos.length - 1;
    if (currentViewerIndex >= galleryPhotos.length) currentViewerIndex = 0;

    var img = document.getElementById('viewerImg');
    if (img) {
        img.src = 'assets/gallery/' + galleryPhotos[currentViewerIndex];
    }
}

// Keyboard navigation for viewer
document.addEventListener('keydown', function(e) {
    var viewer = document.getElementById('imageViewer');
    var lightbox = document.getElementById('galleryLightbox');

    if (viewer && viewer.classList.contains('active')) {
        if (e.key === 'ArrowLeft') viewerNav(-1);
        if (e.key === 'ArrowRight') viewerNav(1);
        if (e.key === 'Escape') closeViewer();
    } else if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
    }
});

// Load gallery photos for lightbox
fetch('assets/photos.json')
    .then(function(res) { return res.json(); })
    .then(function(photos) { galleryPhotos = photos; })
    .catch(function() {});

// View All button
var viewAllBtn = document.getElementById('viewAllGallery');
if (viewAllBtn) {
    viewAllBtn.addEventListener('click', openLightbox);
}
