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
    
    console.log('Language switched to:', lang); // Debug
}

// Function to setup language switcher - called immediately and on DOM ready
function setupLanguageSwitcher() {
    const langLinks = document.querySelectorAll('.lang-link');
    console.log('Setting up', langLinks.length, 'language links'); // Debug
    
    langLinks.forEach(link => {
        // Remove all existing event listeners by cloning
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        // Make absolutely sure it's clickable
        newLink.style.pointerEvents = 'auto';
        newLink.style.cursor = 'pointer';
        newLink.style.zIndex = '9999';
        newLink.style.position = 'relative';
        newLink.style.userSelect = 'none';
        newLink.style.touchAction = 'manipulation';
        newLink.style.webkitTapHighlightColor = 'transparent';
        newLink.style.display = 'inline-block';
        newLink.style.minWidth = '30px';
        newLink.style.minHeight = '30px';
        newLink.style.padding = '5px';
        
        // Remove href to prevent navigation - do this FIRST
        newLink.removeAttribute('href');
        newLink.setAttribute('role', 'button');
        newLink.setAttribute('tabindex', '0');
        
        // Add multiple event handlers
        const lang = newLink.getAttribute('data-lang');
        
        // Click handler - MUST prevent default FIRST
        newLink.onclick = function(e) {
            console.log('LANGUAGE CLICKED:', lang);
            if (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
            switchLanguage(lang);
            return false;
        };
        
        // Also prevent default on mousedown (happens before click)
        newLink.onmousedown = function(e) {
            if (e) {
                e.preventDefault();
            }
            return false;
        };
        
        // Touch handlers
        newLink.ontouchstart = function(e) {
            console.log('LANGUAGE TOUCHSTART:', lang);
            if (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
            switchLanguage(lang);
            return false;
        };
        
        newLink.ontouchend = function(e) {
            console.log('LANGUAGE TOUCHEND:', lang);
            if (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
            switchLanguage(lang);
            return false;
        };
        
        // Also handle touchmove to prevent scrolling
        newLink.ontouchmove = function(e) {
            if (e) {
                e.preventDefault();
            }
            return false;
        };
        
        // Also add event listeners as backup
        newLink.addEventListener('click', function(e) {
            console.log('LANGUAGE CLICK LISTENER:', lang);
            e.preventDefault();
            e.stopPropagation();
            switchLanguage(lang);
            return false;
        }, false);
        
        newLink.addEventListener('touchstart', function(e) {
            console.log('LANGUAGE TOUCHSTART LISTENER:', lang);
            e.preventDefault();
            e.stopPropagation();
            switchLanguage(lang);
            return false;
        }, false);
    });
}

// Function to setup mobile menu - called immediately and on DOM ready
function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Create overlay element if it doesn't exist
    let mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    if (!mobileNavOverlay) {
        mobileNavOverlay = document.createElement('div');
        mobileNavOverlay.className = 'mobile-nav-overlay';
        document.body.appendChild(mobileNavOverlay);
    }

    function openMobileMenu() {
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

    if (mobileMenuToggle && navMenu && mobileNavOverlay) {
        console.log('Setting up mobile menu');
        
        // Make absolutely sure it's clickable
        mobileMenuToggle.style.pointerEvents = 'auto';
        mobileMenuToggle.style.cursor = 'pointer';
        mobileMenuToggle.style.zIndex = '9999';
        mobileMenuToggle.style.position = 'relative';
        mobileMenuToggle.style.userSelect = 'none';
        mobileMenuToggle.style.touchAction = 'manipulation';
        mobileMenuToggle.style.webkitTapHighlightColor = 'transparent';
        mobileMenuToggle.style.display = 'flex';
        mobileMenuToggle.style.minWidth = '44px';
        mobileMenuToggle.style.minHeight = '44px';
        
        // Remove all existing listeners by cloning
        const newToggle = mobileMenuToggle.cloneNode(true);
        mobileMenuToggle.parentNode.replaceChild(newToggle, mobileMenuToggle);
        
        // Add multiple event handlers
        newToggle.onclick = function(e) {
            console.log('MENU BUTTON CLICKED');
            if (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
            return false;
        };
        
        // Also prevent default on mousedown
        newToggle.onmousedown = function(e) {
            if (e) {
                e.preventDefault();
            }
            return false;
        };
        
        newToggle.ontouchstart = function(e) {
            console.log('MENU BUTTON TOUCHSTART');
            if (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
            return false;
        };
        
        newToggle.ontouchend = function(e) {
            console.log('MENU BUTTON TOUCHEND');
            if (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
            return false;
        };
        
        // Also handle touchmove to prevent scrolling
        newToggle.ontouchmove = function(e) {
            if (e) {
                e.preventDefault();
            }
            return false;
        };
        
        // Also add event listeners as backup
        newToggle.addEventListener('click', function(e) {
            console.log('MENU BUTTON CLICK LISTENER');
            e.preventDefault();
            e.stopPropagation();
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
            return false;
        }, false);
        
        newToggle.addEventListener('touchstart', function(e) {
            console.log('MENU BUTTON TOUCHSTART LISTENER');
            e.preventDefault();
            e.stopPropagation();
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
            return false;
        }, false);

        // Close menu when clicking overlay
        mobileNavOverlay.onclick = function() {
            closeMobileMenu();
        };

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.onclick = function() {
                closeMobileMenu();
            };
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    } else {
        console.error('Mobile menu elements not found:', {
            toggle: !!mobileMenuToggle,
            menu: !!navMenu,
            overlay: !!mobileNavOverlay
        });
    }
}

// Run setup functions immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        currentLang = localStorage.getItem('language') || 'en';
        switchLanguage(currentLang);
        setupLanguageSwitcher();
        setupMobileMenu();
    });
} else {
    // DOM is already ready
    currentLang = localStorage.getItem('language') || 'en';
    switchLanguage(currentLang);
    setupLanguageSwitcher();
    setupMobileMenu();
}

// Also run after a short delay to catch any late-loading elements
setTimeout(function() {
    setupLanguageSwitcher();
    setupMobileMenu();
}, 100);

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
    const animateElements = document.querySelectorAll('.research-card, .person-card, .opportunity-card, .event-item, .professor-card, .research-content, .section-header');
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
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPage !== 'publications.html' && currentPage !== 'news.html') {
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
