// Mikey Drains Website JavaScript

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');

// Navigation functionality
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class to navbar
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animate elements on scroll
class ScrollAnimator {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.init();
    }

    init() {
        this.elements.forEach(element => {
            const delay = element.getAttribute('data-delay') || 0;
            element.style.transitionDelay = delay + 'ms';
        });
        
        this.checkElementsInView();
        window.addEventListener('scroll', () => this.checkElementsInView());
    }

    checkElementsInView() {
        this.elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('aos-animate');
            }
        });
    }
}

// Service cards animation with staggered delay
function animateServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Intersection Observer for service cards
const observeServiceCards = () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, options);

    serviceCards.forEach(card => {
        observer.observe(card);
    });
};

// Contact form handling
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Reset form
        this.reset();
        
        // Show success message
        showNotification('Thank you! Your message has been sent. We\'ll get back to you soon!', 'success');
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease-in-out;
        max-width: 300px;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0;
    `;
    
    const closeNotification = () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeNotification);
    
    // Auto close after 5 seconds
    setTimeout(closeNotification, 5000);
}

// Form field animations
function setupFormAnimations() {
    const formInputs = document.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

// Typing animation for hero title
function typeWriter() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text1 = "Flush your worries away—";
    const text2 = "Mikey's on the way!";
    
    heroTitle.innerHTML = `
        <span class="line typing-line-1"></span>
        <span class="line accent typing-line-2"></span>
    `;
    
    const line1 = document.querySelector('.typing-line-1');
    const line2 = document.querySelector('.typing-line-2');
    
    let i = 0;
    let j = 0;
    
    function typeLine1() {
        if (i < text1.length) {
            line1.textContent += text1.charAt(i);
            i++;
            setTimeout(typeLine1, 50);
        } else {
            setTimeout(typeLine2, 500);
        }
    }
    
    function typeLine2() {
        if (j < text2.length) {
            line2.textContent += text2.charAt(j);
            j++;
            setTimeout(typeLine2, 50);
        }
    }
    
    // Start typing animation after a delay
    setTimeout(typeLine1, 1000);
}

// Parallax effect for hero section
function setupParallax() {
    const hero = document.querySelector('.hero');
    const waterDrops = document.querySelectorAll('.water-drop');
    
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const rate = scrollTop * -0.5;
        
        waterDrops.forEach((drop, index) => {
            const speed = (index + 1) * 0.3;
            drop.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Counter animation for stats (if needed)
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Page load animations
function initPageAnimations() {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Initialize scroll animator
    new ScrollAnimator();
    
    // Setup other animations
    observeServiceCards();
    setupFormAnimations();
    setupParallax();
    animateCounters();
    
    // Optional: Use typing animation for hero title
    // typeWriter();
}

// Emergency contact button with pulse animation
function createEmergencyButton() {
    const emergencyBtn = document.createElement('div');
    emergencyBtn.className = 'emergency-contact';
    emergencyBtn.innerHTML = `
        <a href="tel:555-123-DRAIN" class="emergency-link">
            <i class="fas fa-phone"></i>
            <span>Emergency</span>
        </a>
    `;
    
    // Add styles
    emergencyBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        animation: pulse 2s infinite;
    `;
    
    const emergencyLink = emergencyBtn.querySelector('.emergency-link');
    emergencyLink.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: #ef4444;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 50px;
        text-decoration: none;
        font-weight: 600;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    `;
    
    emergencyLink.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.background = '#dc2626';
    });
    
    emergencyLink.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = '#ef4444';
    });
    
    document.body.appendChild(emergencyBtn);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initPageAnimations();
    createEmergencyButton();
    
    // Initialize gallery stats animation
    initGalleryStats();
    
    // Show page content after animations are set up
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 100);
});

// Gallery stats counter animation
function initGalleryStats() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 60; // 60 frames for smooth animation
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16); // ~60fps
    };
    
    // Use Intersection Observer to trigger when stats come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Page is visible again, restart any paused animations
        const waterDrops = document.querySelectorAll('.water-drop');
        waterDrops.forEach(drop => {
            drop.style.animationPlayState = 'running';
        });
    }
});

// Resize handler for responsive adjustments
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate animations on resize
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach(element => {
            if (element.classList.contains('aos-animate')) {
                // Re-trigger animation if needed
            }
        });
    }, 250);
});