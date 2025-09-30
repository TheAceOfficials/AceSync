function Footer() {
  try {
    return (
      <footer className="relative z-10 mt-auto border-t border-[var(--border-color)] glass-card" data-name="footer" data-file="components/Footer.js">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-[var(--text-secondary)] text-sm">
                © 2025 AceSync. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="privacy.html" className="nav-link text-sm hover:underline">
                Privacy Policy
              </a>
              <a href="terms.html" className="nav-link text-sm hover:underline">
                Terms of Service
              </a>
              <a href="https://trakt.tv" target="_blank" rel="noopener noreferrer" className="nav-link text-sm hover:underline">
                Powered by Trakt
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}