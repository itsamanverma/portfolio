/* ========================================
   MODERN PORTFOLIO - ENHANCED JAVASCRIPT
   ======================================== */

// ========== DOM ELEMENTS ==========
const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_items = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');
const sections = document.querySelectorAll('section');

// ========== MOBILE MENU TOGGLE ==========
if (hamburger && mobile_menu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
  });

  // Close menu when clicking menu items
  menu_items.forEach((item) => {
    item.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobile_menu.classList.toggle('active');
    });
  });
}

// ========== HEADER SCROLL EFFECT ==========
let lastScroll = 0;

document.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  
  // Change header background on scroll
  if (scrollPosition > 250) {
    header.style.backgroundColor = 'rgba(26, 26, 46, 0.95)';
    header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.backgroundColor = 'transparent';
    header.style.boxShadow = 'none';
  }
  
  lastScroll = scrollPosition;
});

// ========== SCROLL PROGRESS BAR ==========
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// ========== SCROLL TO TOP BUTTON ==========
function createScrollToTop() {
  const scrollBtn = document.createElement('div');
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  scrollBtn.setAttribute('role', 'button');
  scrollBtn.setAttribute('tabindex', '0');
  document.body.appendChild(scrollBtn);
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });
  
  // Scroll to top on click
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Keyboard accessibility
  scrollBtn.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });
}

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all sections
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Observe knowledge items
  const knowledgeItems = document.querySelectorAll('.knowledge-item');
  knowledgeItems.forEach(item => {
    observer.observe(item);
  });
  
  // Observe project items
  const projectItems = document.querySelectorAll('.project-item');
  projectItems.forEach(item => {
    observer.observe(item);
  });
  
  // Observe contact items
  const contactItems = document.querySelectorAll('.contact-item');
  contactItems.forEach(item => {
    observer.observe(item);
  });
}

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========== LAZY LOADING IMAGES ==========
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// ========== TYPING EFFECT FOR HERO SECTION ==========
function initTypingEffect() {
  const heroTexts = document.querySelectorAll('#hero h1');
  
  heroTexts.forEach((text, index) => {
    const originalText = text.textContent;
    text.textContent = '';
    
    setTimeout(() => {
      let charIndex = 0;
      const typingInterval = setInterval(() => {
        if (charIndex < originalText.length) {
          text.textContent += originalText.charAt(charIndex);
          charIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50);
    }, index * 1000);
  });
}

// ========== PARALLAX EFFECT ==========
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// ========== CURSOR TRAIL EFFECT (OPTIONAL) ==========
function initCursorTrail() {
  const coords = { x: 0, y: 0 };
  const circles = document.querySelectorAll('.cursor-circle');
  
  if (circles.length === 0) return; // Only run if cursor circles exist
  
  circles.forEach((circle) => {
    circle.x = 0;
    circle.y = 0;
  });
  
  window.addEventListener('mousemove', (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
  });
  
  function animateCircles() {
    let x = coords.x;
    let y = coords.y;
    
    circles.forEach((circle, index) => {
      circle.style.left = x - 12 + 'px';
      circle.style.top = y - 12 + 'px';
      circle.style.transform = `scale(${(circles.length - index) / circles.length})`;
      
      circle.x = x;
      circle.y = y;
      
      const nextCircle = circles[index + 1] || circles[0];
      x += (nextCircle.x - x) * 0.3;
      y += (nextCircle.y - y) * 0.3;
    });
    
    requestAnimationFrame(animateCircles);
  }
  
  animateCircles();
}

// ========== ACTIVE NAVIGATION HIGHLIGHT ==========
function initActiveNavigation() {
  const navLinks = document.querySelectorAll('.nav-list ul li a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// ========== ACCESSIBILITY ENHANCEMENTS ==========
function initAccessibility() {
  // Add skip to main content link
  const skipLink = document.createElement('a');
  skipLink.href = '#hero';
  skipLink.className = 'sr-only';
  skipLink.textContent = 'Skip to main content';
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add ARIA labels where missing
  const navToggle = document.querySelector('.hamburger');
  if (navToggle) {
    navToggle.setAttribute('aria-label', 'Toggle navigation menu');
    navToggle.setAttribute('role', 'button');
    navToggle.setAttribute('aria-expanded', 'false');
    
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
    });
  }
}

// ========== DARK MODE TOGGLE (OPTIONAL) ==========
function initDarkMode() {
  // Check for saved user preference
  const currentTheme = localStorage.getItem('theme');
  
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }
  
  // Create toggle button (if you want to add this feature)
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
}

// ========== FORM VALIDATION (IF YOU ADD A CONTACT FORM) ==========
function initFormValidation() {
  const contactForm = document.querySelector('#contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = contactForm.querySelector('#name').value.trim();
      const email = contactForm.querySelector('#email').value.trim();
      const message = contactForm.querySelector('#message').value.trim();
      
      // Basic validation
      if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // If validation passes, submit form
      console.log('Form submitted:', { name, email, message });
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }
}

// ========== INITIALIZE ALL FEATURES ==========
function init() {
  console.log('🚀 Portfolio Enhanced - Initializing...');
  
  // Core features
  createScrollProgress();
  createScrollToTop();
  initSmoothScroll();
  initScrollAnimations();
  initActiveNavigation();
  initAccessibility();
  
  // Optional features
  initLazyLoading();
  initParallax();
  initDarkMode();
  initFormValidation();
  
  console.log('✅ Portfolio Enhanced - Ready!');
}

// ========== RUN ON DOM LOADED ==========
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ========== PERFORMANCE MONITORING ==========
window.addEventListener('load', () => {
  // Log performance metrics
  if (window.performance) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
  }
});

// ========== ERROR HANDLING ==========
window.addEventListener('error', (e) => {
  console.error('An error occurred:', e.error);
});

// ========== EXPORT FOR TESTING ==========
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    init,
    debounce,
    initScrollAnimations,
    initSmoothScroll
  };
}
