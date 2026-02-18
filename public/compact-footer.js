/* ========================================
   COMPACT FOOTER INTERACTIVE FEATURES
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    initCompactFooter();
});

function initCompactFooter() {
    const footer = document.querySelector('.compact-footer');
    if (!footer) return;

    // Add smooth scroll behavior for contact links
    initContactLinks();
    
    // Add click interactions for social links
    initSocialLinks();
    
    // Add auto-hide on scroll (optional)
    // initScrollBehavior();
    
    // Add click to expand/collapse (optional)
    initFooterToggle();
}

// Contact link interactions
function initContactLinks() {
    const emailLink = document.querySelector('.contact-item-mini a[href^="mailto"]');
    const phoneLink = document.querySelector('.contact-item-mini a[href^="tel"]');
    
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            // Add visual feedback
            this.parentElement.style.background = 'rgba(255, 255, 255, 0.3)';
            setTimeout(() => {
                this.parentElement.style.background = '';
            }, 200);
        });
    }
    
    if (phoneLink) {
        phoneLink.addEventListener('click', function(e) {
            // Add visual feedback
            this.parentElement.style.background = 'rgba(255, 255, 255, 0.3)';
            setTimeout(() => {
                this.parentElement.style.background = '';
            }, 200);
        });
    }
}

// Social link interactions
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-mini-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Auto-hide on scroll behavior (optional)
function initScrollBehavior() {
    let lastScrollTop = 0;
    const footer = document.querySelector('.compact-footer');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            footer.classList.add('footer-hidden');
        } else {
            // Scrolling up
            footer.classList.remove('footer-hidden');
        }
        
        lastScrollTop = scrollTop;
    }, false);
}

// Toggle expand/collapse functionality
function initFooterToggle() {
    const footer = document.querySelector('.compact-footer');
    const brandSection = document.querySelector('.footer-brand-compact');
    let isCollapsed = false;
    
    if (brandSection) {
        brandSection.addEventListener('click', function() {
            const contentSections = footer.querySelectorAll('.contact-mini, .social-mini, .status-mini, .copyright-mini');
            
            if (isCollapsed) {
                // Expand
                contentSections.forEach(section => {
                    section.style.display = 'flex';
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        section.style.transition = 'all 0.3s ease';
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }, 50);
                });
                
                footer.style.transform = 'scale(1)';
                isCollapsed = false;
            } else {
                // Collapse
                contentSections.forEach(section => {
                    section.style.transition = 'all 0.3s ease';
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        section.style.display = 'none';
                    }, 300);
                });
                
                footer.style.transform = 'scale(0.9)';
                isCollapsed = true;
            }
        });
    }
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .social-mini-link {
        position: relative;
        overflow: hidden;
    }
    
    .compact-footer {
        transition: all 0.3s ease;
    }
    
    .footer-hidden {
        transform: translateX(100%) !important;
        opacity: 0 !important;
    }
`;
document.head.appendChild(style);