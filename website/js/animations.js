// Animate skill bars on scroll
document.addEventListener('DOMContentLoaded', function() {
  // Skill bar animation
  const skillBars = document.querySelectorAll('.animate-progress');
  
  const animateSkillBars = () => {
    skillBars.forEach(bar => {
      const percent = bar.getAttribute('data-percent');
      const level = bar.querySelector('.skill-level');
      const percentText = bar.querySelector('.skill-percent');
      
      if (isElementInViewport(bar)) {
        level.style.width = percent + '%';
        let counter = 0;
        const interval = setInterval(() => {
          if (counter >= percent) {
            clearInterval(interval);
          } else {
            counter++;
            percentText.textContent = counter + '%';
          }
        }, 2000 / percent);
      }
    });
  };
  
  // FAQ accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const isOpen = answer.style.maxHeight;
      
      // Close all other answers
      document.querySelectorAll('.faq-answer').forEach(item => {
        if (item !== answer) {
          item.style.maxHeight = null;
          item.previousElementSibling.classList.remove('active');
        }
      });
      
      // Toggle current answer
      if (isOpen) {
        answer.style.maxHeight = null;
        question.classList.remove('active');
      } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.classList.add('active');
      }
    });
  });
  
  // Check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }
  
  // Run on load and scroll
  animateSkillBars();
  window.addEventListener('scroll', animateSkillBars);
  
  // Stats counter animation
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(stat => {
    const target = +stat.getAttribute('data-count');
    const increment = target / 50;
    let current = 0;
    
    const updateNumber = () => {
      if (current < target) {
        current += increment;
        stat.textContent = Math.round(current);
        setTimeout(updateNumber, 50);
      } else {
        stat.textContent = target + (stat.getAttribute('data-count') === '100' ? '%' : '+';
      }
    };
    
    if (isElementInViewport(stat.parentElement)) {
      updateNumber();
    } else {
      window.addEventListener('scroll', function scrollHandler() {
        if (isElementInViewport(stat.parentElement)) {
          updateNumber();
          window.removeEventListener('scroll', scrollHandler);
        }
      });
    }
  });
});