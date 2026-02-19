/* ========================================
   MODERN CONTACT & FOOTER INTERACTIONS
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    initModernContact();
    initModernFooter();
});

// ========== MODERN CONTACT INTERACTIONS ==========
function initModernContact() {
    // Contact form floating labels
    initFloatingLabels();
    
    // Contact cards hover effects
    initContactCards();
    
    // Form submission
    initModernFormSubmission();
    
    // Contact actions
    initContactActions();
}

function initFloatingLabels() {
    const formGroups = document.querySelectorAll('.form-group-modern');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            // Check initial state
            if (input.value.trim() !== '') {
                group.classList.add('has-value');
            }
            
            // Focus events
            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                group.classList.remove('focused');
                if (input.value.trim() !== '') {
                    group.classList.add('has-value');
                } else {
                    group.classList.remove('has-value');
                }
            });
            
            // Input events for real-time validation
            input.addEventListener('input', () => {
                if (input.value.trim() !== '') {
                    group.classList.add('has-value');
                } else {
                    group.classList.remove('has-value');
                }
            });
        }
    });
}

function initContactCards() {
    const contactCards = document.querySelectorAll('.contact-info-card');
    
    contactCards.forEach(card => {
        // Parallax effect on mouse move
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
        
        // Card click animation
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

function initContactActions() {
    // Email action
    const emailActions = document.querySelectorAll('.contact-action[href^=\"mailto\"]');
    emailActions.forEach(action => {
        action.addEventListener('click', function(e) {
            // Add ripple effect
            createRippleEffect(this, e);
            
            // Track action (you can add analytics here)
            console.log('Email contact initiated');
        });
    });
    
    // Phone actions
    const phoneActions = document.querySelectorAll('.contact-action[href^=\"tel\"]');
    phoneActions.forEach(action => {
        action.addEventListener('click', function(e) {
            // Add ripple effect
            createRippleEffect(this, e);
            
            // Track action
            console.log('Phone contact initiated');
        });
    });
}

function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        animation: ripple 0.6s linear;
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function initModernFormSubmission() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.querySelector('.submit-btn-modern');
    const statusDiv = document.querySelector('.form-status-modern');
    
    if (form && submitBtn) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (!validateForm(data)) {
                return;
            }
            
            // Show loading state
            showLoadingState(submitBtn, statusDiv);
            
            try {
                // Simulate API call (replace with your actual endpoint)
                await simulateFormSubmission(data);
                
                // Show success state
                showSuccessState(submitBtn, statusDiv);
                
                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    removeFormStates();
                    statusDiv.innerHTML = '';
                }, 3000);
                
            } catch (error) {
                // Show error state
                showErrorState(submitBtn, statusDiv, error.message);
            }
        });
    }
}

function validateForm(data) {
    let isValid = true;
    const errors = {};
    
    // Validate name
    if (!data.name || data.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters long';
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.email = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Validate subject
    if (!data.subject || data.subject.trim().length < 3) {
        errors.subject = 'Subject must be at least 3 characters long';
        isValid = false;
    }
    
    // Validate message
    if (!data.message || data.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters long';
        isValid = false;
    }
    
    // Display errors
    Object.keys(errors).forEach(field => {
        const input = document.getElementById(field);
        if (input) {
            input.style.borderColor = '#ef4444';
            input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            
            // Remove error styling on input
            input.addEventListener('input', function() {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            }, { once: true });
        }
    });
    
    return isValid;
}

function showLoadingState(btn, statusDiv) {
    btn.innerHTML = `
        <span>Sending...</span>
        <svg class="btn-icon animate-spin" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm8 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-19 0c0-6.065 4.935-11 11-11v2c-4.962 0-9 4.038-9 9 0 2.481 1.009 4.731 2.639 6.361l-1.414 1.414.015.014c-2-2-3.24-4.761-3.24-7.789z"/>
        </svg>
    `;
    btn.disabled = true;
    btn.style.opacity = '0.7';
    
    statusDiv.innerHTML = '<p style="color: #6b7280;">Sending your message...</p>';
}

function showSuccessState(btn, statusDiv) {
    btn.innerHTML = `
        <span>Message Sent!</span>
        <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
    `;
    btn.style.background = '#22c55e';
    btn.style.opacity = '1';
    
    statusDiv.innerHTML = '<p style="color: #22c55e; font-weight: 600;">✅ Thank you! Your message has been sent successfully. I\'ll get back to you soon!</p>';
}

function showErrorState(btn, statusDiv, message) {
    btn.innerHTML = `
        <span>Try Again</span>
        <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm8 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-13 0l1.414 1.414 2.586-2.586 2.586 2.586 1.414-1.414-4-4z"/>
        </svg>
    `;
    btn.disabled = false;
    btn.style.background = '#ef4444';
    btn.style.opacity = '1';
    
    statusDiv.innerHTML = `<p style="color: #ef4444; font-weight: 600;">❌ ${message || 'Something went wrong. Please try again.'}</p>`;
}

function removeFormStates() {
    const btn = document.querySelector('.submit-btn-modern');
    if (btn) {
        btn.innerHTML = `
            <span>Send Message</span>
            <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
        `;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.opacity = '1';
    }
    
    // Remove floating label states
    document.querySelectorAll('.form-group-modern').forEach(group => {
        group.classList.remove('has-value', 'focused');
    });
}

async function simulateFormSubmission(data) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate random success/error for demo (remove in production)
    if (Math.random() > 0.1) { // 90% success rate
        return { success: true, message: 'Message sent successfully!' };
    } else {
        throw new Error('Network error. Please try again.');
    }
}

// ========== MODERN FOOTER INTERACTIONS ==========
function initModernFooter() {
    // Social links hover effects
    initSocialLinksFooter();
    
    // Scroll to top functionality
    initScrollToTop();
    
    // Footer links smooth scrolling
    initFooterLinks();
    
    // Logo glow interaction
    initLogoGlow();
}

function initSocialLinksFooter() {
    const socialLinks = document.querySelectorAll('.social-link-footer');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        link.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Add rotation animation on click
        scrollBtn.addEventListener('click', function() {
            this.style.transform = 'translateY(-3px) rotate(360deg)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px)';
            }, 500);
        });
    }
}

function initFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer-links a[href^=\"#\"]');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initLogoGlow() {
    const logoBrand = document.querySelector('.brand-logo-footer');
    
    if (logoBrand) {
        logoBrand.addEventListener('mouseenter', function() {
            const glow = this.querySelector('.logo-glow');
            if (glow) {
                glow.style.animationDuration = '0.5s';
                glow.style.transform = 'scale(1.5)';
                glow.style.opacity = '1';
            }
        });
        
        logoBrand.addEventListener('mouseleave', function() {
            const glow = this.querySelector('.logo-glow');
            if (glow) {
                glow.style.animationDuration = '3s';
                glow.style.transform = '';
                glow.style.opacity = '';
            }
        });
    }
}

// ========== UTILITY FUNCTIONS ==========

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    
    .animate-spin {
        animation: spin 1s linear infinite;
    }
    
    .form-group-modern.focused label,
    .form-group-modern.has-value label {
        top: 0.5rem !important;
        font-size: 1.2rem !important;
        color: var(--primary-color) !important;
        font-weight: 600 !important;
    }
    
    .form-status-modern {
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        text-align: center;
    }
`;

document.head.appendChild(style);