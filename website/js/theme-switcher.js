document.addEventListener('DOMContentLoaded', function() {
  const themeSwitcher = document.getElementById('themeSwitcher');
  const colorOptions = document.querySelectorAll('.color-option');
  
  if (!themeSwitcher) return;
  
  // Set initial theme from localStorage or default
  const currentTheme = localStorage.getItem('theme') || 'default';
  setTheme(currentTheme);
  
  // Add click event to each color option
  colorOptions.forEach(option => {
    option.addEventListener('click', function(e) {
      e.stopPropagation();
      const theme = this.getAttribute('data-theme');
      setTheme(theme);
      localStorage.setItem('theme', theme);
      document.querySelector('.color-options').style.display = 'none';
    });
  });
  
  // Close options when clicking outside
  document.addEventListener('click', function() {
    document.querySelector('.color-options').style.display = 'none';
  });
  
  // Prevent closing when clicking inside
  themeSwitcher.addEventListener('click', function(e) {
    e.stopPropagation();
    const options = document.querySelector('.color-options');
    options.style.display = options.style.display === 'flex' ? 'none' : 'flex';
  });
  
  // Theme setting function
  function setTheme(theme) {
    document.documentElement.className = theme;
    const moonIcon = document.querySelector('.moon-icon');
    
    if (theme === 'dark') {
      moonIcon.textContent = '🌜';
      moonIcon.style.transform = 'rotate(-30deg)';
    } else {
      moonIcon.textContent = '🌙';
      moonIcon.style.transform = 'rotate(0)';
    }
    
    moonIcon.style.animation = 'none';
    setTimeout(() => {
      moonIcon.style.animation = 'pulse 0.5s ease';
    }, 10);
  }
});