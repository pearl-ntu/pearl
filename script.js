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

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Get current language from localStorage (persists across all pages)
    currentLang = localStorage.getItem('language') || 'en';
    
    // Apply saved language immediately when page loads
    switchLanguage(currentLang);
    
    // Language switcher event listeners - use event delegation for reliability
    console.log('Setting up language switcher...'); // Debug
    
    // Function to handle language switch
    function handleLanguageSwitch(e, lang) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Language switch triggered:', lang, 'Current lang:', currentLang); // Debug
        if (lang && lang !== currentLang) {
            switchLanguage(lang);
        }
        return false;
    }
    
    // Use event delegation on document to catch all clicks and touches
    // Handle click events
    document.addEventListener('click', function(e) {
        const langLink = e.target.closest('.lang-link');
        if (langLink) {
            const lang = langLink.getAttribute('data-lang');
            handleLanguageSwitch(e, lang);
        }
    }, true); // Use capture phase
    
    // Handle touchstart for mobile (more reliable than touchend)
    document.addEventListener('touchstart', function(e) {
        const langLink = e.target.closest('.lang-link');
        if (langLink) {
            const lang = langLink.getAttribute('data-lang');
            handleLanguageSwitch(e, lang);
        }
    }, true);
    
    // Also handle touchend as backup
    document.addEventListener('touchend', function(e) {
        const langLink = e.target.closest('.lang-link');
        if (langLink) {
            const lang = langLink.getAttribute('data-lang');
            handleLanguageSwitch(e, lang);
        }
    }, true);
    
    // Also set inline styles on all language links
    const langLinks = document.querySelectorAll('.lang-link');
    console.log('Found', langLinks.length, 'language links'); // Debug
    langLinks.forEach(link => {
        link.style.pointerEvents = 'auto';
        link.style.cursor = 'pointer';
        link.style.zIndex = '1002';
        link.style.position = 'relative';
        link.style.userSelect = 'none';
        link.style.touchAction = 'manipulation'; // Better touch handling
        link.style.webkitTapHighlightColor = 'transparent'; // Remove tap highlight
    });
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
        if (!navMenu || !mobileNavOverlay || !mobileMenuToggle) return;
        
        navMenu.classList.add('active');
        mobileNavOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
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
        
        navMenu.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Reset hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (spans.length >= 3) {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    if (mobileMenuToggle && navMenu && mobileNavOverlay) {
        // Force clickability with inline styles
        mobileMenuToggle.style.pointerEvents = 'auto';
        mobileMenuToggle.style.cursor = 'pointer';
        mobileMenuToggle.style.zIndex = '1001';
        mobileMenuToggle.style.position = 'relative';
        
        console.log('Mobile menu elements found:', { 
            mobileMenuToggle: !!mobileMenuToggle, 
            navMenu: !!navMenu, 
            mobileNavOverlay: !!mobileNavOverlay 
        }); // Debug
        
        // Also add direct listeners as backup
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger clicked directly!'); // Debug
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
            return false;
        }, true);
        
        // Add touchstart for mobile (more reliable than touchend)
        mobileMenuToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger touched (touchstart)!'); // Debug
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
            return false;
        }, true);
        
        // Also try touchend as backup
        mobileMenuToggle.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger touched (touchend)!'); // Debug
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
            return false;
        }, true);

        // Close menu when clicking overlay
        mobileNavOverlay.addEventListener('click', function() {
            closeMobileMenu();
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    // Contact Form Handling
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

