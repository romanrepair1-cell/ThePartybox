// ========================================
// THE PARTYBOX - MAIN JAVASCRIPT
// ========================================

// Gallery Data
const galleryData = [
    // Birthdays
    { id: 1, category: 'birthdays', title: 'Rainbow Birthday Arch', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Cdefs%3E%3ClinearGradient id="grad1" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23FF1493;stop-opacity:1" /%3E%3Cstop offset="50%25" style="stop-color:%2300BFFF;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23FFD700;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23grad1)" width="400" height="300"/%3E%3Ccircle cx="100" cy="80" r="30" fill="white" opacity="0.3"/%3E%3Ccircle cx="200" cy="60" r="35" fill="white" opacity="0.2"/%3E%3Ccircle cx="300" cy="90" r="28" fill="white" opacity="0.3"/%3E%3C/svg%3E' },
    { id: 2, category: 'birthdays', title: 'Number Balloons (18)', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23FFD700" width="400" height="300"/%3E%3Ccircle cx="80" cy="120" r="25" fill="%23FF1493"/%3E%3Ccircle cx="120" cy="100" r="30" fill="%2300BFFF"/%3E%3Ccircle cx="160" cy="130" r="28" fill="%23FF1493"/%3E%3Ctext x="90" y="140" font-size="50" fill="white" font-weight="bold"%3E18%3C/text%3E%3C/svg%3E' },
    { id: 3, category: 'birthdays', title: 'Cake Balloon Decoration', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23FFF8DC" width="400" height="300"/%3E%3Crect x="50" y="150" width="300" height="100" fill="%23FF69B4" rx="10"/%3E%3Ccircle cx="100" cy="120" r="20" fill="%23FF1493"/%3E%3Ccircle cx="150" cy="100" r="22" fill="%2300BFFF"/%3E%3Ccircle cx="200" cy="110" r="20" fill="%23FFD700"/%3E%3Ccircle cx="250" cy="115" r="21" fill="%23FF1493"/%3E%3Ccircle cx="300" cy="105" r="19" fill="%2300BFFF"/%3E%3C/svg%3E' },
    { id: 4, category: 'birthdays', title: 'Sparkly Birthday Bouquet', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23F0FFFF" width="400" height="300"/%3E%3Cpolygon points="200,50 220,120 290,120 235,170 255,240 200,190 145,240 165,170 110,120 180,120" fill="%23FFD700"/%3E%3Ccircle cx="100" cy="120" r="25" fill="%23FF1493"/%3E%3Ccircle cx="150" cy="90" r="28" fill="%2300BFFF"/%3E%3Ccircle cx="250" cy="100" r="26" fill="%23FF1493"/%3E%3Ccircle cx="300" cy="130" r="24" fill="%2300BFFF"/%3E%3C/svg%3E' },

    // Weddings
    { id: 5, category: 'weddings', title: 'Elegant White & Gold Arch', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23FFFAF0" width="400" height="300"/%3E%3Cpath d="M 100 250 Q 200 50 300 250" stroke="%23FFD700" stroke-width="8" fill="none"/%3E%3Ccircle cx="120" cy="200" r="15" fill="%23FFFFFF" stroke="%23FFD700" stroke-width="2"/%3E%3Ccircle cx="200" cy="80" r="18" fill="%23FFFFFF" stroke="%23FFD700" stroke-width="2"/%3E%3Ccircle cx="280" cy="200" r="15" fill="%23FFFFFF" stroke="%23FFD700" stroke-width="2"/%3E%3C/svg%3E' },
    { id: 6, category: 'weddings', title: 'Rose Gold Celebration', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23FFE4E1" width="400" height="300"/%3E%3Ccircle cx="100" cy="100" r="30" fill="%23DB7093"/%3E%3Ccircle cx="150" cy="80" r="35" fill="%23FFB6C1"/%3E%3Ccircle cx="200" cy="90" r="32" fill="%23DB7093"/%3E%3Ccircle cx="250" cy="85" r="33" fill="%23FFB6C1"/%3E%3Ccircle cx="300" cy="95" r="31" fill="%23DB7093"/%3E%3C/svg%3E' },
    { id: 7, category: 'weddings', title: 'Bride & Groom Display', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23FFF0F5" width="400" height="300"/%3E%3Ccircle cx="120" cy="80" r="25" fill="%23FFD700"/%3E%3Crect x="95" y="110" width="50" height="60" fill="%23FFFFFF" stroke="%23000" stroke-width="2"/%3E%3Ccircle cx="280" cy="80" r="25" fill="%23FFD700"/%3E%3Crect x="255" y="110" width="50" height="60" fill="%23000080" stroke="%23000" stroke-width="2"/%3E%3C/svg%3E' },
    { id: 8, category: 'weddings', title: 'Romantic Heart Installation', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23FFF5EE" width="400" height="300"/%3E%3Cpath d="M 200 270 C 100 200 50 150 50 100 C 50 70 75 50 100 50 C 130 50 160 70 200 110 C 240 70 270 50 300 50 C 325 50 350 70 350 100 C 350 150 300 200 200 270 Z" fill="%23FF1493"/%3E%3Ccircle cx="150" cy="100" r="15" fill="%23FFD700"/%3E%3Ccircle cx="250" cy="100" r="15" fill="%23FFD700"/%3E%3C/svg%3E' },

    // Corporate
    { id: 9, category: 'corporate', title: 'Professional Blue Display', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23E6F3FF" width="400" height="300"/%3E%3Crect x="50" y="100" width="300" height="150" fill="%2300BFFF" opacity="0.3" rx="10"/%3E%3Ccircle cx="100" cy="80" r="20" fill="%2300BFFF"/%3E%3Ccircle cx="160" cy="70" r="22" fill="%23001F3F"/%3E%3Ccircle cx="220" cy="75" r="20" fill="%2300BFFF"/%3E%3Ccircle cx="280" cy="85" r="21" fill="%23001F3F"/%3E%3Ccircle cx="320" cy="80" r="19" fill="%2300BFFF"/%3E%3C/svg%3E' },
    { id: 10, category: 'corporate', title: 'Company Branding Balloons', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23F5F5F5" width="400" height="300"/%3E%3Crect x="50" y="80" width="80" height="120" fill="%23333" rx="5"/%3E%3Ctext x="90" y="150" font-size="30" fill="white" text-anchor="middle" font-weight="bold"%3EA%3C/text%3E%3Crect x="170" y="60" width="80" height="120" fill="%23333" rx="5"/%3E%3Ctext x="210" y="130" font-size="30" fill="white" text-anchor="middle" font-weight="bold"%3EB%3C/text%3E%3Crect x="290" y="70" width="80" height="120" fill="%23333" rx="5"/%3E%3Ctext x="330" y="140" font-size="30" fill="white" text-anchor="middle" font-weight="bold"%3EC%3C/text%3E%3C/svg%3E' },
    { id: 11, category: 'corporate', title: 'Launch Event Celebration', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23FAFAFA" width="400" height="300"/%3E%3Cpolygon points="200,30 230,100 310,100 255,150 285,220 200,170 115,220 145,150 90,100 170,100" fill="%23FFD700"/%3E%3Ccircle cx="80" cy="120" r="25" fill="%23FF1493"/%3E%3Ccircle cx="150" cy="90" r="28" fill="%2300BFFF"/%3E%3Ccircle cx="250" cy="100" r="26" fill="%23FF1493"/%3E%3Ccircle cx="320" cy="140" r="24" fill="%2300BFFF"/%3E%3C/svg%3E' },
    { id: 12, category: 'corporate', title: 'Professional Centerpieces', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23F0F0F0" width="400" height="300"/%3E%3Crect x="140" y="200" width="120" height="80" fill="%23808080" rx="5"/%3E%3Ccircle cx="140" cy="100" r="28" fill="%2300BFFF"/%3E%3Ccircle cx="200" cy="70" r="32" fill="%23FFD700"/%3E%3Ccircle cx="260" cy="100" r="28" fill="%2300BFFF"/%3E%3Cline x1="140" y1="128" x2="140" y2="200" stroke="%23666" stroke-width="2"/%3E%3Cline x1="200" y1="102" x2="200" y2="200" stroke="%23666" stroke-width="2"/%3E%3Cline x1="260" y1="128" x2="260" y2="200" stroke="%23666" stroke-width="2"/%3E%3C/svg%3E' },
];

// Gallery Management Class
class GalleryManager {
    constructor() {
        this.galleryGrid = document.getElementById('gallery-grid');
        this.filterButtons = document.querySelectorAll('.category-btn');
        this.currentCategory = 'all';
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightbox-image');
        this.lightboxCaption = document.getElementById('lightbox-caption');
        this.lightboxClose = document.querySelector('.lightbox-close');
        this.init();
    }

    init() {
        this.renderGallery();
        this.attachFilterListeners();
        this.attachLightboxListeners();
    }

    renderGallery() {
        const filtered = this.currentCategory === 'all' 
            ? galleryData 
            : galleryData.filter(item => item.category === this.currentCategory);

        this.galleryGrid.innerHTML = filtered.map(item => `
            <div class="gallery-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.title}" class="gallery-image" loading="lazy">
                <div class="gallery-overlay">
                    <h4>${item.title}</h4>
                    <p>${this.capitalizeFirstLetter(item.category)}</p>
                </div>
            </div>
        `).join('');

        // Attach click listeners to gallery items
        this.galleryGrid.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', (e) => this.openLightbox(e));
        });

        // Trigger scroll animation
        this.observeScrollAnimations();
    }

    attachFilterListeners() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                this.currentCategory = e.target.dataset.category;
                this.renderGallery();
            });
        });
    }

    openLightbox(e) {
        const item = e.currentTarget;
        const image = item.querySelector('.gallery-image');
        const overlay = item.querySelector('.gallery-overlay');
        
        this.lightboxImage.src = image.src;
        this.lightboxCaption.textContent = overlay.querySelector('h4').textContent;
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    attachLightboxListeners() {
        this.lightboxClose.addEventListener('click', () => this.closeLightbox());
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeLightbox();
        });
    }

    capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    observeScrollAnimations() {
        const items = this.galleryGrid.querySelectorAll('.gallery-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeIn 0.6s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        items.forEach(item => observer.observe(item));
    }
}

// Navigation Management Class
class NavigationManager {
    constructor() {
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.header = document.getElementById('header');
        this.init();
    }

    init() {
        this.attachToggleListener();
        this.attachNavLinkListeners();
        this.attachScrollListener();
    }

    attachToggleListener() {
        this.navToggle.addEventListener('click', () => {
            this.navToggle.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });
    }

    attachNavLinkListeners() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navToggle.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });
    }

    attachScrollListener() {
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                this.header.style.boxShadow = 'var(--shadow-md)';
            } else {
                this.header.style.boxShadow = 'var(--shadow-sm)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
}

// Form Management Class
class FormManager {
    constructor() {
        this.form = document.getElementById('quote-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name')?.value,
            email: document.getElementById('email')?.value,
            phone: document.getElementById('phone')?.value,
            eventDate: document.getElementById('event-date')?.value,
            eventType: document.getElementById('event-type')?.value,
            details: document.getElementById('details')?.value,
        };

        // Validation
        if (!this.validateForm(formData)) {
            this.showMessage('Please fill in all required fields correctly.', 'error');
            return;
        }

        // Simulate submission
        this.submitForm(formData);
    }

    validateForm(data) {
        if (!data.name || !data.email || !data.eventDate || !data.eventType || !data.details) {
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return false;
        }

        return true;
    }

    async submitForm(data) {
        const button = this.form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        button.textContent = 'Sending...';
        button.disabled = true;

        try {
            // Send to backend API
            const response = await fetch('/api/quotes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit form');
            }
            
            this.showMessage('Thank you! We\'ll contact you soon with a custom quote.', 'success');
            this.form.reset();
            
            console.log('Form submitted successfully:', result);
        } catch (error) {
            console.error('Form submission error:', error);
            this.showMessage('Error submitting form. Please try again.', 'error');
        } finally {
            button.textContent = originalText;
            button.disabled = false;
        }
    }

    showMessage(message, type) {
        // Create a message element
        const messageEl = document.createElement('div');
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#4CAF50' : '#F44336'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            z-index: 3000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        messageEl.textContent = message;

        document.body.appendChild(messageEl);

        setTimeout(() => {
            messageEl.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => messageEl.remove(), 300);
        }, 3000);
    }
}

// Testimonial Carousel Class
class TestimonialCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.prevBtn = document.getElementById('prev-testimonial');
        this.nextBtn = document.getElementById('next-testimonial');
        this.currentIndex = 0;
        this.autoplayInterval = null;
        this.init();
    }

    init() {
        if (this.slides.length > 0) {
            this.prevBtn.addEventListener('click', () => this.prev());
            this.nextBtn.addEventListener('click', () => this.next());
            this.startAutoplay();
        }
    }

    showSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.showSlide(this.currentIndex);
        this.resetAutoplay();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.showSlide(this.currentIndex);
        this.resetAutoplay();
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.next();
        }, 5000);
    }

    resetAutoplay() {
        clearInterval(this.autoplayInterval);
        this.startAutoplay();
    }
}

// Scroll Animation Observer
class ScrollAnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
        });

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'all 0.6s ease';
            observer.observe(section);
        });
    }
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
    new GalleryManager();
    new FormManager();
    new TestimonialCarousel();
    new ScrollAnimationObserver();
    console.log('ThePartybox website initialized!');
});
