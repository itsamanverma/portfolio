/* ========================================
   ENHANCED CONTACT SECTION FEATURES
   ======================================== */

// ========== CHARACTER COUNTER ==========
function initCharacterCounter() {
  const messageTextarea = document.querySelector('#message');
  const charCount = document.querySelector('#char-count');
  
  if (messageTextarea && charCount) {
    messageTextarea.addEventListener('input', () => {
      const currentLength = messageTextarea.value.length;
      const maxLength = 500;
      
      charCount.textContent = currentLength;
      
      const counter = charCount.parentElement;
      counter.classList.remove('warning', 'error');
      
      if (currentLength > maxLength * 0.8) {
        counter.classList.add('warning');
      }
      if (currentLength > maxLength) {
        counter.classList.add('error');
        messageTextarea.value = messageTextarea.value.substring(0, maxLength);
        charCount.textContent = maxLength;
      }
    });
  }
}

// ========== CONTACT ITEM CLICKS ==========
function initContactItemClicks() {
  const contactItems = document.querySelectorAll('.contact-item.clickable');
  
  contactItems.forEach(item => {
    item.addEventListener('click', () => {
      const action = item.dataset.action;
      
      switch (action) {
        case 'call':
          const phone = item.dataset.phone;
          if (phone) {
            window.open(`tel:${phone}`, '_self');
          }
          break;
          
        case 'email':
          const email = item.dataset.email;
          if (email) {
            window.open(`mailto:${email}?subject=Hello!&body=Hi Aman,%0D%0A%0D%0AI would like to discuss...`, '_blank');
          }
          break;
          
        case 'map':
          const address = 'Bangalore, Karnataka, India';
          window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
          break;
      }
    });
    
    // Add click animation
    item.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: 100px;
        height: 100px;
        left: ${x - 50}px;
        top: ${y - 50}px;
        background: rgba(242, 166, 90, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: contactRipple 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
      `;
      
      this.style.position = 'relative';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
  
  // Add ripple CSS animation
  if (!document.querySelector('#contact-ripple-style')) {
    const style = document.createElement('style');
    style.id = 'contact-ripple-style';
    style.textContent = `
      @keyframes contactRipple {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// ========== SOCIAL MEDIA TRACKING ==========
function initSocialMediaTracking() {
  const socialLinks = document.querySelectorAll('.social-contact-item');
  
  socialLinks.forEach(link => {
    link.addEventListener('click', () => {
      const platform = link.classList.contains('whatsapp') ? 'WhatsApp' :
                      link.classList.contains('linkedin') ? 'LinkedIn' :
                      link.classList.contains('github') ? 'GitHub' :
                      link.classList.contains('instagram') ? 'Instagram' : 'Unknown';
      
      console.log(`Social Media Click: ${platform}`);
      
      // You can add analytics tracking here
      // Example: gtag('event', 'social_click', { platform: platform });
    });
  });
}

// ========== ENHANCED FORM VALIDATION ==========
function initEnhancedFormValidation() {
  const contactForm = document.querySelector('#contact-form');
  const submitBtn = document.querySelector('#submit-btn');
  const formStatus = document.querySelector('#form-status');
  
  if (!contactForm) return;
  
  const fields = {
    name: contactForm.querySelector('#name'),
    email: contactForm.querySelector('#email'),
    subject: contactForm.querySelector('#subject'),
    message: contactForm.querySelector('#message')
  };
  
  // Real-time validation
  Object.keys(fields).forEach(key => {
    const field = fields[key];
    const errorElement = document.getElementById(`${key}-error`);
    
    if (field && errorElement) {
      field.addEventListener('blur', () => {
        validateField(field, errorElement, key);
      });
      
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
          validateField(field, errorElement, key);
        }
      });
    }
  });
  
  function validateField(field, errorElement, type) {
    const value = field.value.trim();
    let isValid = false;
    let errorMessage = '';
    
    switch (type) {
      case 'name':
        isValid = value.length >= 2 && /^[a-zA-Z\s]+$/.test(value);
        errorMessage = 'Name must be at least 2 characters and contain only letters';
        break;
      case 'email':
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        errorMessage = 'Please enter a valid email address';
        break;
      case 'subject':
        isValid = value.length >= 3;
        errorMessage = 'Subject must be at least 3 characters';
        break;
      case 'message':
        isValid = value.length >= 10 && value.length <= 500;
        errorMessage = 'Message must be between 10-500 characters';
        break;
    }
    
    field.classList.remove('error', 'success');
    errorElement.classList.remove('show');
    
    if (value === '') {
      return false;
    }
    
    if (isValid) {
      field.classList.add('success');
      return true;
    } else {
      field.classList.add('error');
      errorElement.textContent = errorMessage;
      errorElement.classList.add('show');
      return false;
    }
  }
  
  // Form submission
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const validations = Object.keys(fields).map(key => {
      const field = fields[key];
      const errorElement = document.getElementById(`${key}-error`);
      return field && errorElement ? validateField(field, errorElement, key) : false;
    });
    
    const isFormValid = validations.every(valid => valid);
    
    if (!isFormValid) {
      showFormStatus('Please correct the errors above', 'error');
      return;
    }
    
    // Loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
    }
    
    try {
      // Simulate API call (replace with actual implementation)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showFormStatus('Thanks! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
      contactForm.reset();
      
      // Reset character counter
      const charCount = document.querySelector('#char-count');
      if (charCount) charCount.textContent = '0';
      
      // Reset field states
      Object.values(fields).forEach(field => {
        if (field) {
          field.classList.remove('error', 'success');
        }
      });
      
      // Clear error messages
      document.querySelectorAll('.error-message.show').forEach(error => {
        error.classList.remove('show');
      });
      
    } catch (error) {
      showFormStatus('Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
      }
    }
  });
  
  function showFormStatus(message, type) {
    if (formStatus) {
      formStatus.textContent = message;
      formStatus.className = 'form-status show ' + type;
      
      setTimeout(() => {
        formStatus.classList.remove('show');
      }, 5000);
    }
  }
}

// ========== CONTACT ANIMATIONS ==========
function initContactAnimations() {
  const contactItems = document.querySelectorAll('.contact-item');
  const socialItems = document.querySelectorAll('.social-contact-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 150);
      }
    });
  }, {
    threshold: 0.3
  });
  
  [...contactItems, ...socialItems].forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.6s ease';
    observer.observe(item);
  });
}

// ========== INITIALIZE ALL FEATURES ==========
function initEnhancedContactFeatures() {
  console.log('🚀 Enhanced Contact Features - Initializing...');
  
  initCharacterCounter();
  initContactItemClicks();
  initSocialMediaTracking();
  initEnhancedFormValidation();
  initContactAnimations();
  
  console.log('✅ Enhanced Contact Features - Ready!');
}

// ========== AUTO-INITIALIZE ==========
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEnhancedContactFeatures);
} else {
  initEnhancedContactFeatures();
}

// ========== EXPORT FOR TESTING ==========
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initEnhancedContactFeatures,
    initCharacterCounter,
    initContactItemClicks,
    initSocialMediaTracking,
    initEnhancedFormValidation,
    initContactAnimations
  };
}