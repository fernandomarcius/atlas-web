// Simple Scroll Reveal Animation
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add fade-in class to elements we want to animate
  const elementsToAnimate = document.querySelectorAll('.card, .feature-row, .section-header, .hero-content');
  elementsToAnimate.forEach(el => {
    el.classList.add('fade-in-section');
    observer.observe(el);
  });
});

// Add animation styles dynamically
const style = document.createElement('style');
style.innerHTML = `
  .fade-in-section {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  .fade-in-section.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
