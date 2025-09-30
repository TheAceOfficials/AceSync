function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  const navItems = [
    { name: 'Home', href: 'home.html', icon: 'home' },
    { name: 'Recommendations', href: 'recommendations.html', icon: 'star' },
    { name: 'Watchlist', href: 'watchlist.html', icon: 'bookmark' },
    { name: 'Calendar', href: 'calendar.html', icon: 'calendar' },
    { name: 'Profile', href: 'profile.html', icon: 'user' },
    { name: 'Settings', href: 'settings.html', icon: 'settings' }
  ];

  const navigateToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = `index.html${href}`;
      }
    } else {
      window.location.href = href;
    }
  };

  try {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-[var(--border-color)]" data-name="header" data-file="components/Header.js">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 style={{"paddingTop":"0px","paddingRight":"0px","paddingBottom":"0px","paddingLeft":"0px","marginTop":"0px","marginRight":"0px","marginBottom":"0px","marginLeft":"0px","fontSize":"24px","color":"#f8f7f7","backgroundColor":"rgba(0, 0, 0, 0)","textAlign":"start","fontWeight":"700","objectFit":"fill","display":"block","position":"static","top":"auto","left":"auto","right":"auto","bottom":"auto"}} className="text-2xl font-bold bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] bg-clip-text text-transparent">AceSync</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigateToSection(item.href)}
                  className={`nav-link flex items-center gap-2 ${currentPage === item.href ? 'active' : ''}`}
                >
                  <div className={`icon-${item.icon} text-sm`}></div>
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-[var(--card-bg)] transition-colors"
              >
                <div className={`icon-${isMenuOpen ? 'x' : 'menu'} text-xl`}></div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pt-4 border-t border-[var(--border-color)]">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigateToSection(item.href);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--card-bg)] transition-colors ${currentPage === item.href ? 'bg-[var(--card-bg)] text-[var(--primary-color)]' : 'nav-link'}`}
                  >
                    <div className={`icon-${item.icon} text-lg`}></div>
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}