/* ========================================
   ENHANCED FOOTER INTERACTIVE FEATURES
   ======================================== */

// ========== FOOTER ANIMATIONS ==========
function initFooterAnimations() {
  const footer = document.querySelector('.enhanced-footer');
  const footerSections = document.querySelectorAll('.footer-section');
  const socialIcons = document.querySelectorAll('.social-icon');
  const ctaButton = document.querySelector('.cta-button');

  // Intersection Observer for footer entrance animation
  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Animate footer sections with stagger
        footerSections.forEach((section, index) => {
          setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
          }, index * 150);
        });
      }
    });
  }, { threshold: 0.1 });

  if (footer) {
    footer.style.opacity = '0';
    footer.style.transform = 'translateY(30px)';
    footer.style.transition = 'all 0.8s ease';
    footerObserver.observe(footer);
  }

  // Initial setup for footer sections
  footerSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease';
  });
}

// ========== SOCIAL ICON INTERACTIONS ==========
function initSocialIconInteractions() {
  const socialIcons = document.querySelectorAll('.social-icon');
  
  socialIcons.forEach(icon => {
    // Ripple effect on click
    icon.addEventListener('click', function(e) {
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
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: socialRipple 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
      `;
      
      this.style.position = 'relative';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });

    // Hover tilt effect
    icon.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) rotateY(15deg)';
    });

    icon.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) rotateY(0deg)';
    });
  });

  // Add ripple CSS animation
  if (!document.querySelector('#social-ripple-style')) {
    const style = document.createElement('style');
    style.id = 'social-ripple-style';
    style.textContent = `
      @keyframes socialRipple {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// ========== CTA BUTTON ENHANCEMENTS ==========
function initCTAButtonEnhancements() {
  const ctaButton = document.querySelector('.cta-button');
  
  if (ctaButton) {
    // Magnetic effect
    ctaButton.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const moveX = x * 0.15;
      const moveY = y * 0.15;
      
      this.style.transform = `translateY(-3px) translate(${moveX}px, ${moveY}px)`;
    });

    ctaButton.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(-3px) translate(0px, 0px)';
    });

    // Click analytics
    ctaButton.addEventListener('click', function(e) {
      console.log('CTA Button Clicked: Start a Project');
      
      // Add visual feedback
      this.style.transform = 'translateY(-3px) scale(0.98)';
      setTimeout(() => {
        this.style.transform = 'translateY(-3px) scale(1)';
      }, 150);
    });
  }
}

// ========== FOOTER LINKS SMOOTH SCROLL ==========
function initFooterSmoothScroll() {
  const footerNavLinks = document.querySelectorAll('.footer-nav .footer-link[href^="#"]');
  
  footerNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerHeight = 80; // Adjust based on your header height
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Visual feedback
        this.style.color = 'var(--primary-color)';
        setTimeout(() => {
          this.style.color = '';
        }, 1000);
      }
    });
  });
}

// ========== TECH TAG INTERACTIONS ==========
function initTechTagInteractions() {
  const techTags = document.querySelectorAll('.tech-tag');
  
  techTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      // Slightly grow other tags for a subtle network effect
      techTags.forEach(otherTag => {
        if (otherTag !== this) {
          otherTag.style.transform = 'translateY(-1px) scale(1.02)';
        }
      });
    });

    tag.addEventListener('mouseleave', function() {
      techTags.forEach(otherTag => {
        otherTag.style.transform = '';
      });
    });

    // Click to scroll to relevant section
    tag.addEventListener('click', function() {
      const techName = this.textContent.toLowerCase();
      const servicesSection = document.getElementById('services');
      
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
        
        // Visual feedback
        this.style.background = 'rgba(242, 166, 90, 0.3)';
        setTimeout(() => {
          this.style.background = '';
        }, 1000);
      }
    });
  });
}

// ========== FOOTER BACKGROUND INTERACTION ==========
function initFooterBackgroundInteraction() {
  const footer = document.querySelector('.enhanced-footer');
  
  if (footer) {
    let mouseX = 0;
    let mouseY = 0;
    
    footer.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      
      const xPercent = mouseX / rect.width;
      const yPercent = mouseY / rect.height;
      
      // Update CSS custom properties for interactive background
      this.style.setProperty('--mouse-x', `${xPercent * 100}%`);
      this.style.setProperty('--mouse-y', `${yPercent * 100}%`);
    });
  }
}

// ========== STATUS INDICATOR ENHANCEMENT ==========
function initStatusIndicator() {
  const statusIndicator = document.querySelector('.status-indicator');
  const statusText = document.querySelector('.status-text');
  
  if (statusIndicator && statusText) {
    // Simulate availability status updates
    const statuses = [
      { text: 'Available for new projects', color: '#4ade80', active: true },
      { text: 'Usually responds within 24 hours', color: '#fbbf24', active: true },
      { text: 'Currently taking on select projects', color: '#60a5fa', active: true }
    ];
    
    let currentStatusIndex = 0;
    
    // Cycle through statuses every 10 seconds
    setInterval(() => {
      currentStatusIndex = (currentStatusIndex + 1) % statuses.length;
      const status = statuses[currentStatusIndex];
      
      statusText.style.opacity = '0';
      statusIndicator.style.opacity = '0';
      
      setTimeout(() => {
        statusText.textContent = status.text;
        statusIndicator.style.backgroundColor = status.color;
        statusText.style.opacity = '1';
        statusIndicator.style.opacity = '1';
      }, 300);
    }, 10000);

    // Click to show contact section
    const statusBadge = statusIndicator.closest('.footer-badge');
    if (statusBadge) {
      statusBadge.addEventListener('click', function() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      });

      statusBadge.style.cursor = 'pointer';
      statusBadge.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
      });
      statusBadge.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
      });
    }
  }
}

// ========== CONTACT LINKS ENHANCEMENT ==========
function initContactLinksEnhancement() {
  const contactLinks = document.querySelectorAll('.contact-link');
  
  contactLinks.forEach(link => {
    if (link.href.startsWith('mailto:')) {
      link.addEventListener('click', function(e) {
        // Add loading state
        const originalText = this.textContent;
        this.textContent = 'Opening email client...';
        this.style.opacity = '0.7';
        
        setTimeout(() => {
          this.textContent = originalText;
          this.style.opacity = '1';
        }, 2000);
        
        console.log('Email link clicked:', this.href);
      });
    }
  });
}

// ========== PERFORMANCE OPTIMIZATIONS ==========
function initPerformanceOptimizations() {
  // Lazy load footer animations when footer becomes visible
  const footer = document.querySelector('.enhanced-footer');
  
  if (footer) {
    const performanceObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Enable advanced animations only when footer is visible
          document.body.classList.add('footer-visible');
          performanceObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    performanceObserver.observe(footer);
  }
}

// ========== INITIALIZE ALL FOOTER ENHANCEMENTS ==========
function initEnhancedFooterFeatures() {
  console.log('🚀 Enhanced Footer Features - Initializing...');
  
  // Initialize all footer enhancements
  initFooterAnimations();
  initSocialIconInteractions();
  initCTAButtonEnhancements();
  initFooterSmoothScroll();
  initTechTagInteractions();
  initFooterBackgroundInteraction();
  initStatusIndicator();
  initContactLinksEnhancement();
  initPerformanceOptimizations();
  
  console.log('✅ Enhanced Footer Features - Ready!');
}

// ========== AUTO-INITIALIZE ==========
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEnhancedFooterFeatures);
} else {
  initEnhancedFooterFeatures();
}

// ========== EXPORT FOR TESTING ==========
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initEnhancedFooterFeatures,
    initFooterAnimations,
    initSocialIconInteractions,
    initCTAButtonEnhancements,
    initFooterSmoothScroll,
    initTechTagInteractions
  };
}