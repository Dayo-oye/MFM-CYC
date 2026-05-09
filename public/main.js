// ==========================================================================
// MFM CAASO Youth Church - Main JavaScript
// ==========================================================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('MFM CAASO Youth Church Website Loaded');

    // Initialize all modules
    initializeLoadingScreen();
    initializeMobileNavigation();
    initializeBackToTop();
    initializeHeaderScroll();
    initializeCounters();
    initializeParallax();
    initializeSmoothScroll();
    initializeCurrentYear();
    initializeFormValidation();
    initializeTestimonyForm();
    initializeServiceCards(); // Dynamic content
    initializeGallery();      // Dynamic content
    initializeParticles();
    initializeAudioPlayer();

    // Initialize animations LAST to catch all dynamic content
    initializeScrollAnimations();

    // Initialize page-specific features
    initializePageFeatures();
});

// ==========================================================================
// Loading Screen
// ==========================================================================

function initializeLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');

    if (!loadingScreen) return;

    // Show loading screen for minimum 1 second
    setTimeout(() => {
        loadingScreen.classList.add('loaded');

        // Remove from DOM after animation completes
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1000);
}

// ==========================================================================
// Mobile Navigation
// ==========================================================================

function initializeMobileNavigation() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileClose = document.querySelector('.mobile-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!mobileToggle || !mobileNav) return;

    // Toggle mobile menu
    mobileToggle.addEventListener('click', () => {
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', !isExpanded);
        mobileNav.classList.toggle('active');
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Close mobile menu
    if (mobileClose) {
        mobileClose.addEventListener('click', () => {
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileNav.classList.contains('active') &&
            !mobileNav.contains(e.target) &&
            !mobileToggle.contains(e.target)) {
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ==========================================================================
// Back to Top Button
// ==========================================================================

function initializeBackToTop() {
    const backToTop = document.querySelector('.back-to-top');

    if (!backToTop) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================================================
// Header Scroll Effect
// ==========================================================================

function initializeHeaderScroll() {
    const header = document.querySelector('.main-header');

    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ==========================================================================
// Scroll Animations
// ==========================================================================

function initializeScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Handle counters
                if (entry.target.classList.contains('animate-counter')) {
                    animateCounter(entry.target);
                }

                // Handle data-delay attributes
                const delay = entry.target.dataset.delay;
                if (delay) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, parseInt(delay));
                }
            }
        });
    }, observerOptions);

    // Observe all scroll-triggered elements
    document.querySelectorAll('.scroll-trigger, .scroll-trigger-left, .scroll-trigger-right, .scroll-trigger-scale, .animate-card, .animate-counter, .animate-fade-up').forEach(el => {
        observer.observe(el);
    });

    // Observe elements with data-delay
    document.querySelectorAll('[data-delay]').forEach(el => {
        observer.observe(el);
    });
}

// ==========================================================================
// Counter Animation
// ==========================================================================

function animateCounter(element) {
    const target = parseInt(element.dataset.target) || 100;
    const speed = parseInt(element.dataset.speed) || 2000;
    const numberElement = element.querySelector('.stat-number') || element.querySelector('.counter-value');

    if (!numberElement) return;

    let start = 0;
    const increment = target / (speed / 16); // 60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            numberElement.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            numberElement.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

function initializeCounters() {
    // Already handled by scroll animations
}

// ==========================================================================
// Parallax Effect
// ==========================================================================

function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');

    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(element => {
            const rate = element.dataset.rate || 0.5;
            const offset = scrolled * rate;
            element.style.transform = `translateY(${offset}px)`;
        });
    });
}

// ==========================================================================
// Smooth Scroll for Anchor Links
// ==========================================================================

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#" or external link
            if (href === '#' || href.startsWith('#!')) return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                // Calculate header offset
                const header = document.querySelector('.main-header');
                const headerHeight = header ? header.offsetHeight : 0;

                // Scroll to target
                window.scrollTo({
                    top: target.offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });

                // Update URL without scrolling (for single page navigation)
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });
}

// ==========================================================================
// Current Year in Footer
// ==========================================================================

function initializeCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ==========================================================================
// Form Validation
// ==========================================================================

function initializeFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });

        // Add real-time validation
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const parent = field.parentElement;
    let error = '';

    // Clear previous error
    parent.classList.remove('error', 'success');
    const existingError = parent.querySelector('.error-message');
    if (existingError) existingError.remove();

    // Check required
    if (field.hasAttribute('required') && !value) {
        error = 'This field is required';
    }

    // Check email
    else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            error = 'Please enter a valid email address';
        }
    }

    // Check phone
    else if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)\.]+$/;
        if (!phoneRegex.test(value)) {
            error = 'Please enter a valid phone number';
        }
    }

    // Check min length
    else if (field.dataset.minLength && value.length < field.dataset.minLength) {
        error = `Minimum ${field.dataset.minLength} characters required`;
    }

    // Check max length
    else if (field.dataset.maxLength && value.length > field.dataset.maxLength) {
        error = `Maximum ${field.dataset.maxLength} characters allowed`;
    }

    // Show error or success
    if (error) {
        parent.classList.add('error');
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = error;
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        parent.appendChild(errorElement);
        return false;
    } else {
        parent.classList.add('success');
        return true;
    }
}

// ==========================================================================
// Testimony Form
// ==========================================================================

function initializeTestimonyForm() {
    const testimonyForm = document.getElementById('testimonyForm');
    if (!testimonyForm) return;

    testimonyForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm(testimonyForm)) return;

        // Get form data
        const formData = new FormData(testimonyForm);
        const data = Object.fromEntries(formData);

        try {
            // Show loading state
            const submitBtn = testimonyForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;

            // In production, this would be an API call
            // For now, simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            showNotification('Testimony submitted successfully! Thank you for sharing.', 'success');

            // Reset form
            testimonyForm.reset();
            testimonyForm.querySelectorAll('.success').forEach(el => el.classList.remove('success'));

        } catch (error) {
            showNotification('Something went wrong. Please try again.', 'error');
        } finally {
            // Reset button state
            const submitBtn = testimonyForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }
    });
}

// ==========================================================================
// Service Cards
// ==========================================================================

function initializeServiceCards() {
    const servicesGrid = document.querySelector('.services-grid');
    if (!servicesGrid) return;

    const services = [
        {
            icon: 'fa-church',
            title: 'Sunday Service',
            time: 'Sunday | 7:25AM (WAT)',
            description: 'Experience the power of God through worship, word, and prayer.',
            link: 'services.html',
            color: 'primary'
        },
        {
            icon: 'fa-bible',
            title: 'Bible Study',
            time: 'Tuesday | 8:00PM (WAT)',
            description: 'Deep dive into God\'s Word for spiritual growth and understanding.',
            link: 'https://chat.whatsapp.com/LIDaxZjSIspEdEcX0RgZwJ',
            color: 'secondary'
        },
        {
            icon: 'fa-pray',
            title: 'Prayer Meeting',
            time: 'Daily | 9:00PM (WAT)',
            description: 'Powerful prayer sessions to strengthen your spiritual life.',
            link: 'services.html',
            color: 'accent'
        }
    ];

    servicesGrid.innerHTML = services.map((service, index) => `
        <div class="service-card scroll-trigger" data-delay="${index * 100}">
            <div class="service-card-icon service-${service.color}">
                <i class="fas ${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p class="service-time">${service.time}</p>
            <p class="service-description">${service.description}</p>
            <a href="${service.link}" class="service-link" ${service.link.includes('http') ? 'target="_blank"' : ''}>
                Join Now <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `).join('');
}

// ==========================================================================
// Gallery
// ==========================================================================

function initializeGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;

    // Sample gallery images
    const galleryItems = [
        {
            image: 'assets/images/header-bg.jpg.jpg',
            title: 'Sunday Service',
            category: 'Worship'
        },
        {
            image: 'assets/images/header-bg.jpg.jpg',
            title: 'Prayer Meeting',
            category: 'Prayer'
        },
        {
            image: 'assets/images/header-bg.jpg.jpg',
            title: 'Youth Program',
            category: 'Fellowship'
        }
    ];

    galleryGrid.innerHTML = galleryItems.map((item, index) => `
        <div class="gallery-item scroll-trigger" data-delay="${index * 100}">
            <div class="gallery-image">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="gallery-overlay">
                    <h4>${item.title}</h4>
                    <span>${item.category}</span>
                </div>
            </div>
        </div>
    `).join('');

    // Initialize lightbox if needed
    initializeLightbox();
}

function initializeLightbox() {
    const images = document.querySelectorAll('.gallery-image img');
    if (images.length === 0) return;

    images.forEach(img => {
        img.addEventListener('click', () => {
            showLightbox(img.src, img.alt);
        });
    });

    // Create lightbox container
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="" alt="">
            <div class="lightbox-caption"></div>
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-prev">&lt;</button>
            <button class="lightbox-next">&gt;</button>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Lightbox functionality
    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentIndex = 0;
    const imagesArray = Array.from(images);

    function showLightbox(src, caption, index) {
        lightboxImg.src = src;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        currentIndex = index;
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });

    function navigate(direction) {
        currentIndex = (currentIndex + direction + imagesArray.length) % imagesArray.length;
        const img = imagesArray[currentIndex];
        showLightbox(img.src, img.alt, currentIndex);
    }

    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));

    // Add lightbox styles
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s, visibility 0.3s;
        }
        .lightbox.active {
            opacity: 1;
            visibility: visible;
        }
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        .lightbox-content img {
            max-width: 100%;
            max-height: 80vh;
            display: block;
            border-radius: 8px;
        }
        .lightbox-caption {
            color: white;
            text-align: center;
            margin-top: 1rem;
            font-size: 1.2rem;
        }
        .lightbox-close,
        .lightbox-prev,
        .lightbox-next {
            position: absolute;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            font-size: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            transition: background 0.3s;
        }
        .lightbox-close:hover,
        .lightbox-prev:hover,
        .lightbox-next:hover {
            background: rgba(0, 0, 0, 0.8);
        }
        .lightbox-close {
            top: -60px;
            right: 0;
        }
        .lightbox-prev {
            left: -60px;
            top: 50%;
            transform: translateY(-50%);
        }
        .lightbox-next {
            right: -60px;
            top: 50%;
            transform: translateY(-50%);
        }
    `;
    document.head.appendChild(style);
}

// ==========================================================================
// Particles Background
// ==========================================================================

function initializeParticles() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    // Only create particles on desktop
    if (window.innerWidth < 768) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    heroSection.appendChild(particlesContainer);

    // Create particles
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random properties
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        // Random color
        const colors = [
            'rgba(76, 29, 149, 0.3)',
            'rgba(49, 46, 129, 0.3)',
            'rgba(245, 158, 11, 0.3)'
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        particlesContainer.appendChild(particle);
    }

    // Add styles for particles
    const style = document.createElement('style');
    style.textContent = `
        .particles-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
        }
        .particle {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            animation: particleFloat linear infinite;
        }
        @keyframes particleFloat {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==========================================================================
// Audio Player (for sermons)
// ==========================================================================

function initializeAudioPlayer() {
    const audioPlayers = document.querySelectorAll('.audio-player');
    if (audioPlayers.length === 0) return;

    audioPlayers.forEach(player => {
        const audio = player.querySelector('audio');
        const playBtn = player.querySelector('.play-btn');
        const progress = player.querySelector('.progress');
        const currentTime = player.querySelector('.current-time');
        const duration = player.querySelector('.duration');
        const volume = player.querySelector('.volume');

        if (!audio || !playBtn) return;

        // Play/Pause functionality
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                audio.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        // Update progress bar
        audio.addEventListener('timeupdate', () => {
            const percent = (audio.currentTime / audio.duration) * 100;
            progress.style.width = `${percent}%`;

            // Update times
            currentTime.textContent = formatTime(audio.currentTime);
            if (!isNaN(audio.duration)) {
                duration.textContent = formatTime(audio.duration);
            }
        });

        // Click on progress bar to seek
        const progressBar = player.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.addEventListener('click', (e) => {
                const rect = progressBar.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                audio.currentTime = percent * audio.duration;
            });
        }

        // Volume control
        if (volume) {
            volume.addEventListener('input', (e) => {
                audio.volume = e.target.value;
            });
        }

        // Format time helper
        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }
    });
}

// ==========================================================================
// Page-specific Features
// ==========================================================================

function initializePageFeatures() {
    const page = document.body.dataset.page || getCurrentPage();

    switch (page) {
        case 'gallery':
            initializeGalleryFilters();
            break;
        case 'contact':
            initializeContactMap();
            break;
        case 'giving':
            initializePaymentOptions();
            break;
        case 'programs':
            initializeCalendar();
            break;
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '');
    return page === '' ? 'index' : page;
}

function initializeGalleryFilters() {
    const filterButtons = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length === 0 || galleryItems.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;

            // Filter items
            galleryItems.forEach(item => {
                const category = item.dataset.category;

                if (filter === 'all' || filter === category) {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('visible'), 10);
                } else {
                    item.classList.remove('visible');
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });
}

function initializeContactMap() {
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;

    // Initialize Google Map
    // Note: You'll need to add your Google Maps API key
    mapContainer.innerHTML = `
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.977232264567!2d3.268673323565578!3d6.649740521684701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b96434446059b%3A0xe1043376722216ea!2sMountain%20Of%20Fire%20and%20Miracle%20Ministries%2C%20Caaso%20Regional%20Hqtrs!5e0!3m2!1sen!2sng!4v1709664426543!5m2!1sen!2sng"
            width="100%"
            height="450"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
    `;
}

function initializePaymentOptions() {
    const paymentOptions = document.querySelector('.payment-options');
    if (!paymentOptions) return;

    const options = [
        {
            icon: 'fa-university',
            title: 'Bank Transfer',
            details: [
                'Bank: Zenith Bank',
                'Account: MFM CAASO Youth Church',
                'Number: 1310020939'
            ]
        },
        {
            icon: 'fa-mobile-alt',
            title: 'Mobile Banking',
            details: [
                'USSD: *966*1310020939#',
                'Mobile App: Available',
                'Quickteller: Supported'
            ]
        },
        {
            icon: 'fa-hand-holding-usd',
            title: 'Cash & Check',
            details: [
                'Sunday Offering',
                'Special Programs',
                'Designated Offering Box'
            ]
        }
    ];

    paymentOptions.innerHTML = options.map(option => `
        <div class="payment-option scroll-trigger">
            <div class="payment-icon">
                <i class="fas ${option.icon}"></i>
            </div>
            <h3>${option.title}</h3>
            <ul class="payment-details">
                ${option.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

function initializeCalendar() {
    const calendar = document.querySelector('.events-calendar');
    if (!calendar) return;

    const events = [
        {
            date: '2026-03-16',
            title: 'Youth Revival Service',
            time: '8:00 AM',
            location: 'Main Auditorium'
        },
        {
            date: '2026-04-06',
            title: 'Power Must Change Hands',
            time: '7:00 AM',
            location: 'Prayer Ground'
        },
        {
            date: '2026-05-18',
            title: 'Youth Connect Fellowship',
            time: '7:30 AM',
            location: 'Main Auditorium'
        }
    ];

    calendar.innerHTML = events.map(event => `
        <div class="event-item scroll-trigger">
            <div class="event-date">
                <span class="event-day">${new Date(event.date).getDate()}</span>
                <span class="event-month">${new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
            </div>
            <div class="event-details">
                <h3>${event.title}</h3>
                <p><i class="far fa-clock"></i> ${event.time}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
            </div>
            <a href="programs.html" class="event-link">
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `).join('');
}

// ==========================================================================
// Notification System
// ==========================================================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 10);

    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);

    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });

    // Add styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                min-width: 300px;
                max-width: 400px;
                padding: 1rem 1.5rem;
                background: white;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                justify-content: space-between;
                transform: translateX(400px);
                transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                z-index: 9999;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 1rem;
                flex: 1;
            }
            .notification i {
                font-size: 1.25rem;
            }
            .notification-success {
                border-left: 4px solid #10b981;
            }
            .notification-success i {
                color: #10b981;
            }
            .notification-error {
                border-left: 4px solid #ef4444;
            }
            .notification-error i {
                color: #ef4444;
            }
            .notification-info {
                border-left: 4px solid #3b82f6;
            }
            .notification-info i {
                color: #3b82f6;
            }
            .notification-warning {
                border-left: 4px solid #f59e0b;
            }
            .notification-warning i {
                color: #f59e0b;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #94a3b8;
                cursor: pointer;
                padding: 0;
                margin-left: 1rem;
                transition: color 0.3s;
            }
            .notification-close:hover {
                color: #64748b;
            }
        `;
        document.head.appendChild(style);
    }
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// ==========================================================================
// Utility Functions
// ==========================================================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==========================================================================
// Event Listeners
// ==========================================================================

// Handle window resize with debounce
window.addEventListener('resize', debounce(() => {
    // Reinitialize particles on resize
    const particles = document.querySelector('.particles-container');
    if (particles && window.innerWidth < 768) {
        particles.remove();
    } else if (!particles && window.innerWidth >= 768) {
        initializeParticles();
    }
}, 250));

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations if needed
        console.log('Page hidden');
    } else {
        console.log('Page visible');
    }
});

