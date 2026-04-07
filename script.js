// ===== NAVBAR STICKY EFFECT =====
const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU TOGGLE =====
if (hamburger) {
    hamburger.addEventListener('click', () => {
        if (navMenu.style.display === 'flex') {
            navMenu.style.display = 'none';
        } else {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.backgroundColor = 'var(--off-white)';
            navMenu.style.padding = 'var(--spacing-lg)';
            navMenu.style.gap = '0';
        }
    });

    // Close menu on link click
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.style.display = 'none';
        });
    });
}

// ===== SERVICE TABS FILTERING =====
const tabButtons = document.querySelectorAll('.tab-btn');
const serviceCards = document.querySelectorAll('.service-card');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');

        // Update active button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Show/hide service cards
        serviceCards.forEach(card => {
            if (card.getAttribute('data-category') === category) {
                card.classList.add('active');
                card.style.display = 'flex';
            } else {
                card.classList.remove('active');
                card.style.display = 'none';
            }
        });
    });
});

// Set default visible (Soins Visage)
tabButtons[0].classList.add('active');

// ===== TESTIMONIALS CAROUSEL =====
const carousel = document.querySelector('.testimonials-carousel');
const prevBtn = document.getElementById('prev-carousel');
const nextBtn = document.getElementById('next-carousel');

if (carousel && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: -carousel.offsetWidth / 3,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: carousel.offsetWidth / 3,
            behavior: 'smooth'
        });
    });
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all service cards and team members
[...serviceCards, ...document.querySelectorAll('.team-member')].forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== RESERVE BUTTON FUNCTIONALITY =====
const reserveButtons = document.querySelectorAll('.btn-reserve');

reserveButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        // In production, this would integrate with Planity API
        // For now, we redirect to Planity booking
        window.open('https://planity.com', '_blank');
    });
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - navbar.offsetHeight;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== PHONE NUMBER CLICK =====
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Allow default behavior (will open phone app on mobile)
    });
});

// ===== PLANITY CTA BUTTONS =====
// All Planity links already configured in HTML with external target="_blank"
// JavaScript ready for future integration with Planity API if needed

// ===== DYNAMIC YEAR IN FOOTER =====
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = `© ${currentYear} STUDIO BY MEL. Tous droits réservés.`;
}

// ===== UTILITY FUNCTION FOR PLANITY REDIRECT =====
function openPlanity() {
    window.open('https://planity.com', '_blank');
}

// ===== ANALYTICS & PAGE READY =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('STUDIO BY MEL website loaded successfully!');
    console.log('Ready to accept Planity booking integration');
});
