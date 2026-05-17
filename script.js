// ============================================
// ELITE GYM - PREMIUM JAVASCRIPT
// ============================================

// ============================================
// SMOOTH SCROLL SETUP
// ============================================

const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// ============================================
// CUSTOM CURSOR
// ============================================

const cursor = document.querySelector('.cursor');
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Cursor expand on hover
const hoverElements = document.querySelectorAll('.btn, .price-card, .trainer-card, .facility-card, .class-card, a');

hoverElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// ============================================
// NAVIGATION MENU TOGGLE
// ============================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking links
const navLinks = navMenu.querySelectorAll('a');
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// THREE.JS HERO CANVAS
// ============================================

const canvas = document.getElementById('heroCanvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
camera.position.z = 5;

// Create floating dumbbell
const dumbbellGroup = new THREE.Group();
scene.add(dumbbellGroup);

// Dumbbell bar
const barGeometry = new THREE.CylinderGeometry(0.15, 0.15, 2, 32);
const barMaterial = new THREE.MeshStandardMaterial({
    color: 0x00d9ff,
    metalness: 0.8,
    roughness: 0.2,
    emissive: 0x00d9ff,
    emissiveIntensity: 0.3,
});
const bar = new THREE.Mesh(barGeometry, barMaterial);
dumbbellGroup.add(bar);

// Dumbbell weights
const weightGeometry = new THREE.SphereGeometry(0.35, 32, 32);
const weightMaterial = new THREE.MeshStandardMaterial({
    color: 0xb244ff,
    metalness: 0.9,
    roughness: 0.1,
    emissive: 0xb244ff,
    emissiveIntensity: 0.2,
});

const leftWeight = new THREE.Mesh(weightGeometry, weightMaterial);
leftWeight.position.x = -1.2;
dumbbellGroup.add(leftWeight);

const rightWeight = new THREE.Mesh(weightGeometry, weightMaterial);
rightWeight.position.x = 1.2;
dumbbellGroup.add(rightWeight);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x00d9ff, 1, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const spotLight = new THREE.SpotLight(0xb244ff, 1);
spotLight.position.set(-5, 5, 5);
scene.add(spotLight);

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 500;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 20;
    positions[i + 2] = (Math.random() - 0.5) * 20;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
    color: 0x00d9ff,
    size: 0.05,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.6,
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Mouse tracking
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Animation loop
function animateHero() {
    requestAnimationFrame(animateHero);

    // Rotate dumbbell
    dumbbellGroup.rotation.x += 0.005;
    dumbbellGroup.rotation.y += 0.008;
    dumbbellGroup.position.y = Math.sin(Date.now() * 0.001) * 0.3;

    // Mouse tracking
    dumbbellGroup.rotation.x += mouseY * 0.05;
    dumbbellGroup.rotation.y += mouseX * 0.05;

    // Animate particles
    particles.rotation.x += 0.0001;
    particles.rotation.y += 0.0002;

    // Update light
    pointLight.position.x = Math.sin(Date.now() * 0.001) * 5;
    pointLight.position.y = Math.cos(Date.now() * 0.001) * 5;

    renderer.render(scene, camera);
}

animateHero();

// Handle resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ============================================
// ANIMATED STATS COUNTERS
// ============================================

gsap.registerPlugin(ScrollTrigger);

const statNumbers = document.querySelectorAll('.stat-number');

statNumbers.forEach((stat) => {
    const target = parseInt(stat.dataset.target);
    const duration = 2;

    gsap.to(stat, {
        scrollTrigger: {
            trigger: stat,
            start: 'top 80%',
            once: true,
        },
        innerText: target,
        duration: duration,
        snap: { innerText: 1 },
        ease: 'power2.out',
        onUpdate: () => {
            stat.innerText = Math.floor(parseInt(stat.innerText)).toLocaleString();
        },
    });
});

// ============================================
// GSAP SCROLL ANIMATIONS
// ============================================

// Fade in animations
gsap.utils.toArray('.stat-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: index * 0.1,
    });
});

gsap.utils.toArray('.price-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: index * 0.1,
    });
});

gsap.utils.toArray('.trainer-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: index * 0.1,
    });
});

gsap.utils.toArray('.facility-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: index * 0.1,
    });
});

gsap.utils.toArray('.class-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: index * 0.1,
    });
});

gsap.utils.toArray('.testimonial-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: index * 0.1,
    });
});

// Parallax effect on scroll
gsap.utils.toArray('section').forEach((section) => {
    gsap.to(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            markers: false,
        },
        y: (i, target) => -target.offsetHeight * 0.2,
    });
});

// ============================================
// BMI CALCULATOR
// ============================================

const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const calculateBtn = document.getElementById('calculateBmi');
const bmiResult = document.getElementById('bmiResult');
const bmiScore = document.getElementById('bmiScore');
const bmiCategory = document.getElementById('bmiCategory');

calculateBtn.addEventListener('click', () => {
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (height && weight && height > 0 && weight > 0) {
        const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
        let category = '';
        let color = '';

        if (bmi < 18.5) {
            category = 'Underweight';
            color = '#00d9ff';
        } else if (bmi < 25) {
            category = 'Normal Weight';
            color = '#00ff88';
        } else if (bmi < 30) {
            category = 'Overweight';
            color = '#ffaa00';
        } else {
            category = 'Obese';
            color = '#ff4444';
        }

        bmiScore.textContent = bmi;
        bmiCategory.textContent = category;
        bmiCategory.style.color = color;

        bmiResult.style.display = 'block';

        gsap.to(bmiScore, {
            innerText: bmi,
            duration: 1,
            snap: { innerText: 0.1 },
            ease: 'power2.out',
        });
    } else {
        alert('Please enter valid height and weight');
    }
});

// ============================================
// FAQ ACCORDION
// ============================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Close other open items
        faqItems.forEach((otherItem) => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

// ============================================
// CONTACT FORM
// ============================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: contactForm.querySelector('input[type="text"]').value,
        email: contactForm.querySelector('input[type="email"]').value,
        message: contactForm.querySelector('textarea').value,
    };

    // Show success message
    const btn = contactForm.querySelector('.btn');
    const originalText = btn.textContent;

    gsap.to(btn, {
        duration: 0.3,
        ease: 'back.out',
    });

    btn.textContent = 'MESSAGE SENT! ✓';
    btn.style.background = 'linear-gradient(135deg, #00ff88, #00d9ff)';

    setTimeout(() => {
        contactForm.reset();
        btn.textContent = originalText;
        btn.style.background = '';
    }, 3000);
});

// ============================================
// CTA BUTTON ACTIONS
// ============================================

const ctaButtons = document.querySelectorAll('#cta-btn, #navCta, #explore-btn');

ctaButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // Ripple effect
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.position = 'absolute';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.background = 'rgba(255,255,255,0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.transform = 'scale(0)';

        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);

        gsap.to(ripple, {
            transform: 'scale(4)',
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => ripple.remove(),
        });

        // Scroll to pricing or contact
        if (btn.id === 'cta-btn' || btn.id === 'navCta') {
            document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
        } else if (btn.id === 'explore-btn') {
            document.getElementById('stats').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// MAGNETIC BUTTONS
// ============================================

const magneticButtons = document.querySelectorAll('.btn, .price-btn, .price-card');

magneticButtons.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out',
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'back.out',
        });
    });
});

// ============================================
// HOVER TILT EFFECT FOR TRAINER CARDS
// ============================================

const trainerCards = document.querySelectorAll('.trainer-card');

trainerCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

        gsap.to(card, {
            rotationX: y * 10,
            rotationY: -x * 10,
            transformPerspective: 1200,
            duration: 0.3,
            ease: 'power2.out',
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.3,
            ease: 'back.out',
        });
    });
});

// ============================================
// BEFORE AFTER SLIDER
// ============================================

const beforeAfterCards = document.querySelectorAll('.before-after');

beforeAfterCards.forEach((card) => {
    const slider = document.createElement('div');
    slider.className = 'before-after-slider';
    slider.style.position = 'absolute';
    slider.style.top = '0';
    slider.style.left = '50%';
    slider.style.width = '2px';
    slider.style.height = '100%';
    slider.style.background = '#00d9ff';
    slider.style.cursor = 'ew-resize';
    slider.style.zIndex = '10';

    card.style.position = 'relative';
    card.appendChild(slider);

    let isSliding = false;

    slider.addEventListener('mousedown', () => {
        isSliding = true;
    });

    document.addEventListener('mouseup', () => {
        isSliding = false;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isSliding) return;

        const rect = card.getBoundingClientRect();
        let x = e.clientX - rect.left;
        x = Math.max(0, Math.min(x, rect.width));

        const after = card.querySelector('.after');
        gsap.to(after, {
            clipPath: `inset(0 ${100 - (x / rect.width) * 100}% 0 0)`,
            duration: 0,
        });

        gsap.to(slider, {
            left: x,
            duration: 0,
        });
    });
});

// ============================================
// TESTIMONIALS AUTO-SCROLL
// ============================================

const testimonialCards = document.querySelectorAll('.testimonial-card');
let currentTestimonial = 0;

function rotateTestimonials() {
    // This is already a grid, but we can add scroll effect if needed
    // Currently showing all testimonials at once due to grid layout
}

// ============================================
// FLOATING ANIMATION
// ============================================

gsap.utils.toArray('.facility-card, .class-card').forEach((card) => {
    gsap.to(card, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 0.5,
    });
});

// ============================================
// SCROLL PROGRESS BAR
// ============================================

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // Add progress indicator if needed
});

// ============================================
// MOBILE OPTIMIZATION
// ============================================

if (window.innerWidth < 768) {
    // Reduce particle count on mobile
    const newParticlesGeometry = new THREE.BufferGeometry();
    const mobileParticlesCount = 200;
    const mobilePositions = new Float32Array(mobileParticlesCount * 3);

    for (let i = 0; i < mobileParticlesCount * 3; i += 3) {
        mobilePositions[i] = (Math.random() - 0.5) * 20;
        mobilePositions[i + 1] = (Math.random() - 0.5) * 20;
        mobilePositions[i + 2] = (Math.random() - 0.5) * 20;
    }

    // Reduce animation complexity on mobile
    ScrollTrigger.config({ autoRefreshEvents: 'visibilitychange,orientationchange' });
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images
const images = document.querySelectorAll('img');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Already loaded via HTML src
                observer.unobserve(img);
            }
        });
    });

    images.forEach((img) => imageObserver.observe(img));
}

// ============================================
// PAGE READY INDICATORS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Elite Gym Website Loaded Successfully! 🎯');

    // Remove loading state if any
    document.body.style.opacity = '1';
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    // Quick scroll shortcuts
    if (e.ctrlKey || e.metaKey) {
        if (e.key === '/') {
            e.preventDefault();
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ============================================
// UTILITY: Show scroll hint periodically
// ============================================

let scrollHintShown = false;

window.addEventListener('scroll', () => {
    if (window.scrollY > 100 && !scrollHintShown) {
        scrollHintShown = true;
        // Fade out scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            gsap.to(scrollIndicator, {
                opacity: 0,
                pointerEvents: 'none',
                duration: 0.5,
            });
        }
    }
});
