// Scroll Reveal Animation Utility
// Observes elements and adds 'revealed' class when they enter viewport

export const initScrollReveal = () => {
  if (typeof window === 'undefined') return;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Immediately reveal all elements if user prefers reduced motion
    document.querySelectorAll('[data-scroll-reveal]').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px', // Trigger slightly before element enters viewport
    threshold: [0, 0.1, 0.2]
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Optional: Unobserve after revealing (one-time animation)
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with data-scroll-reveal attribute
  const elements = document.querySelectorAll('[data-scroll-reveal]');
  elements.forEach(el => observer.observe(el));

  // Cleanup function
  return () => {
    observer.disconnect();
  };
};

// Staggered reveal for lists/grids
export const initStaggerReveal = (containerSelector, delay = 80) => {
  if (typeof window === 'undefined') return;
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const containers = document.querySelectorAll(containerSelector);
  
  containers.forEach(container => {
    const children = Array.from(container.children);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          children.forEach((child, index) => {
            if (prefersReducedMotion) {
              child.classList.add('revealed');
            } else {
              setTimeout(() => {
                child.classList.add('revealed');
              }, index * delay);
            }
          });
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    observer.observe(container);
  });
};

// Parallax scroll effect (subtle)
export const initParallax = (selector, speed = 0.5) => {
  if (typeof window === 'undefined') return;
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const elements = document.querySelectorAll(selector);
  
  const handleScroll = () => {
    const scrolled = window.pageYOffset;
    
    elements.forEach(el => {
      const offset = el.offsetTop;
      const distance = scrolled - offset;
      const transform = distance * speed;
      
      el.style.transform = `translateY(${transform}px)`;
    });
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Mouse move hover effect for cards
export const initCardHoverEffect = (selector) => {
  if (typeof window === 'undefined') return;
  
  const cards = document.querySelectorAll(selector);
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * 5; // Max 5deg tilt
      const rotateY = ((x - centerX) / centerX) * -5;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
};

// Page transition utility
export const pageTransition = () => {
  // Add entrance animation to main content
  const main = document.querySelector('main');
  if (main) {
    main.classList.add('page-enter');
  }
};
