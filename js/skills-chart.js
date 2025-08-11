document.addEventListener('DOMContentLoaded', function() {
  const skillsSection = document.querySelector('.skills-section');
  const skillBars = document.querySelectorAll('.skill-bar');
  
  if (!skillsSection) return;
  
  const animateSkills = () => {
    skillBars.forEach(bar => {
      const percent = bar.getAttribute('data-percent');
      const level = bar.querySelector('.skill-level');
      const percentText = bar.querySelector('.skill-percent');
      
      level.style.width = '0';
      percentText.textContent = '0%';
      
      let current = 0;
      const increment = percent / 50;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= percent) {
          current = percent;
          clearInterval(timer);
        }
        level.style.width = current + '%';
        percentText.textContent = Math.round(current) + '%';
      }, 20);
    });
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(skillsSection);
});
