document.addEventListener('DOMContentLoaded', () => {
  // Apple-Style Scroll Observer
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% visible
    rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits bottom
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: Stop observing once visible to save performance (Apple style is usually one-way)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select all elements with the data-animation attribute
  const animatedElements = document.querySelectorAll('[data-animation]');

  if (animatedElements.length === 0) {
    console.warn('No animated elements found. Make sure to add [data-animation] attributes to HTML.');
  }

  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Handle Staggered Parents
  // If a container has .stagger-container, we observe it, and when it triggers, 
  // we make its children visible (relying on CSS delays)
  const staggerContainers = document.querySelectorAll('.stagger-container');

  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Find all stagger-items inside this container and animate them
        const items = entry.target.querySelectorAll('.stagger-item');
        items.forEach(item => {
          item.classList.add('visible');
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  staggerContainers.forEach(container => {
    staggerObserver.observe(container);
  });

  // Mobile Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');

  if (mobileBtn && nav) {
    mobileBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      mobileBtn.classList.toggle('active');
      // Optional: keep text change if desired, or rely on CSS icon transformation
      mobileBtn.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });
  }
});
