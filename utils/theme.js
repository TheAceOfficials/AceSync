function initializeTheme() {
  try {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    });
  } catch (error) {
    console.error('Theme initialization error:', error);
  }
}

function setTheme(theme) {
  try {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  } catch (error) {
    console.error('Theme setting error:', error);
  }
}

function getTheme() {
  try {
    return localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  } catch (error) {
    console.error('Theme getting error:', error);
    return 'light';
  }
}