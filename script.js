// Language Management - Global function accessible from anywhere
let currentLang = localStorage.getItem('language') || 'en';

// Language switching function - works across all pages
function switchLanguage(lang) {
    console.log('switchLanguage called with:', lang); // Debug
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Get all elements with translation attributes
    const allElements = document.querySelectorAll('[data-en][data-zh]');
    console.log('Found', allElements.length, 'elements with translations'); // Debug
    
    // Update each element
    allElements.forEach(element => {
        // Check if element has translatable children - if so, skip parent
        const hasTranslatableChildren = Array.from(element.children).some(child => 
            child.hasAttribute('data-en') && child.hasAttribute('data-zh')
        );
        
        if (!hasTranslatableChildren) {
            // This is a leaf node, safe to update
            const newText = lang === 'zh' ? element.getAttribute('data-zh') : element.getAttribute('data-en');
            
            // Check if element has complex HTML structure (like news items with divs)
            const hasComplexHtml = element.querySelector('div, section, article, header, footer') !== null;
            
            if (hasComplexHtml) {
                // For complex HTML, don't update (preserve structure)
                return;
            }
            
            // Update the text content
            if (newText) {
                element.textContent = newText;
            }
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update language switcher active state
    document.querySelectorAll('.lang-link').forEach(link => {
        if (link.getAttribute('data-lang') === lang) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    console.log('Language switched to:', lang); // Debug
}

// Use document-level event delegation - MOST RELIABLE APPROACH
// This catches ALL clicks/touches on language links and menu buttons
document.addEventListener('click', function(e) {
    // Handle language switcher
    const langLink = e.target.closest('.lang-link');
    if (langLink) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const lang = langLink.getAttribute('data-lang');
        console.log('LANGUAGE CLICKED via delegation:', lang);
        if (lang) {
            switchLanguage(lang);
        }
        return false;
    }
    
    // Handle mobile menu toggle
    const menuToggle = e.target.closest('.mobile-menu-toggle');
    if (menuToggle) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        console.log('MENU TOGGLE CLICKED via delegation');
        
        const navMenu = document.querySelector('.nav-menu');
        const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
        
        if (!mobileNavOverlay) {
            const overlay = document.createElement('div');
            overlay.className = 'mobile-nav-overlay';
            document.body.appendChild(overlay);
            overlay.onclick = function() {
                closeMobileMenu();
            };
        }
        
        if (navMenu && navMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
        return false;
    }
}, true); // Use capture phase for maximum reliability

// Also handle touch events
document.addEventListener('touchstart', function(e) {
    // Handle language switcher
    const langLink = e.target.closest('.lang-link');
    if (langLink) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const lang = langLink.getAttribute('data-lang');
        console.log('LANGUAGE TOUCHED via delegation:', lang);
        if (lang) {
            switchLanguage(lang);
        }
        return false;
    }
    
    // Handle mobile menu toggle
    const menuToggle = e.target.closest('.mobile-menu-toggle');
    if (menuToggle) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        console.log('MENU TOGGLE TOUCHED via delegation');
        
        const navMenu = document.querySelector('.nav-menu');
        const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
        
        if (!mobileNavOverlay) {
            const overlay = document.createElement('div');
            overlay.className = 'mobile-nav-overlay';
            document.body.appendChild(overlay);
            overlay.onclick = function() {
                closeMobileMenu();
            };
        }
        
        if (navMenu && navMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
        return false;
    }
}, true);

// Mobile menu functions
function openMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (!navMenu || !mobileNavOverlay || !mobileMenuToggle) {
        console.log('Cannot open menu - missing elements');
        return;
    }
    
    console.log('OPENING MENU');
    navMenu.classList.add('active');
    mobileNavOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Animate hamburger icon
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (spans.length >= 3) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    }
}

function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (!navMenu || !mobileNavOverlay || !mobileMenuToggle) return;
    
    console.log('CLOSING MENU');
    navMenu.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset hamburger icon
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (spans.length >= 3) {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

function initializeHomeNewsPreview() {
    if (typeof newsData === 'undefined') return;

    const previewLink = document.querySelector('.news-preview-item-link');
    if (!previewLink) return;

    const latestItem = [...newsData]
        .filter(item => item && item.date)
        .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    if (!latestItem) return;

    const title = previewLink.querySelector('.news-preview-content h3');
    const date = previewLink.querySelector('.news-preview-date');
    const excerpt = previewLink.querySelector('.news-preview-excerpt');

    if (title) title.textContent = latestItem.title || 'Latest News';
    if (date) date.textContent = latestItem.date || '';
    if (excerpt) excerpt.textContent = latestItem.excerpt || '';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Get current language from localStorage
    currentLang = localStorage.getItem('language') || 'en';
    
    // Apply saved language immediately when page loads
    switchLanguage(currentLang);
    initializeHomeNewsPreview();
    
    // Create mobile nav overlay if it doesn't exist
    let mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    if (!mobileNavOverlay) {
        mobileNavOverlay = document.createElement('div');
        mobileNavOverlay.className = 'mobile-nav-overlay';
        document.body.appendChild(mobileNavOverlay);
        mobileNavOverlay.onclick = function() {
            closeMobileMenu();
        };
    }
    
    // Make sure language links and menu button are clickable
    const langLinks = document.querySelectorAll('.lang-link');
    langLinks.forEach(link => {
        link.style.pointerEvents = 'auto';
        link.style.cursor = 'pointer';
        link.style.zIndex = '9999';
        link.style.position = 'relative';
        link.style.userSelect = 'none';
        link.style.touchAction = 'manipulation';
        link.style.webkitTapHighlightColor = 'transparent';
        // Remove href to prevent navigation
        link.removeAttribute('href');
        link.setAttribute('role', 'button');
    });
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.style.pointerEvents = 'auto';
        mobileMenuToggle.style.cursor = 'pointer';
        mobileMenuToggle.style.zIndex = '9999';
        mobileMenuToggle.style.position = 'relative';
        mobileMenuToggle.style.userSelect = 'none';
        mobileMenuToggle.style.touchAction = 'manipulation';
        mobileMenuToggle.style.webkitTapHighlightColor = 'transparent';
    }
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Here you would typically send the data to a server
            // For now, we'll just show an alert
            alert('Thank you for your message! We will get back to you soon.\n\nNote: This is a demo. In production, this would send an email to the lab.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add active state to current page navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const allNavLinks = document.querySelectorAll('.nav-link');
    
    allNavLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Enhanced scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const animateElements = document.querySelectorAll('.research-card, .person-card, .opportunity-card, .news-preview-item, .professor-card, .research-content, .section-header');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Parallax effect for group photo
    const groupPhoto = document.querySelector('.group-photo-banner-img');
    if (groupPhoto) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            if (scrolled < groupPhoto.offsetTop + groupPhoto.offsetHeight) {
                groupPhoto.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Add smooth reveal to sections (but exclude publications and news pages to avoid conflicts)
    const revealCurrentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (revealCurrentPage !== 'publications.html' && revealCurrentPage !== 'news.html') {
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            
            const sectionObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            sectionObserver.observe(section);
        });
    }

    // Add hover effect to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
