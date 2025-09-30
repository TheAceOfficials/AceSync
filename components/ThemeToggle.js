function ThemeToggle() {
  const [theme, setTheme] = React.useState('light');

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  try {
    return (
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg hover:bg-[var(--card-bg)] transition-colors"
        aria-label="Toggle theme"
        data-name="theme-toggle" 
        data-file="components/ThemeToggle.js"
      >
        <div className={`icon-${theme === 'light' ? 'moon' : 'sun'} text-xl text-[var(--text-primary)]`}></div>
      </button>
    );
  } catch (error) {
    console.error('ThemeToggle component error:', error);
    return null;
  }
}
