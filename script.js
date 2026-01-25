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
    
    // Update mobile bottom nav text
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        const textElement = item.querySelector('.mobile-nav-text');
        if (textElement && item.hasAttribute('data-en') && item.hasAttribute('data-zh')) {
            textElement.textContent = lang === 'zh' ? item.getAttribute('data-zh') : item.getAttribute('data-en');
        }
    });
    
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
    
    // Mobile bottom nav items are just regular links, no special handling needed
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
    
    // Mobile bottom nav items are just regular links, no special handling needed
}, true);

// Mobile bottom nav - no special functions needed, just regular links

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Get current language from localStorage
    currentLang = localStorage.getItem('language') || 'en';
    
    // Apply saved language immediately when page loads
    switchLanguage(currentLang);
    
    // Make sure language links are clickable
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
    
    // Set active state for mobile bottom nav items
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            item.classList.add('active');
        }
        
        // Update text for language
        const textElement = item.querySelector('.mobile-nav-text');
        if (textElement && item.hasAttribute('data-en') && item.hasAttribute('data-zh')) {
            const lang = localStorage.getItem('language') || 'en';
            textElement.textContent = lang === 'zh' ? item.getAttribute('data-zh') : item.getAttribute('data-en');
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
