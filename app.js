class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center glass-card p-8 rounded-2xl">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-[var(--text-secondary)] mb-6">We're sorry, but something unexpected happened.</p>
            <button onClick={() => window.location.reload()} className="btn-primary">
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function LoginPage() {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleTraktLogin = async () => {
    try {
      setIsLoading(true);
      // Initialize OAuth flow with PKCE
      await initiateTraktOAuth();
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
    }
  };

  try {
    return (
      <div className="min-h-screen relative overflow-hidden" data-name="login-page" data-file="app.js">
        <div className="animated-bg absolute inset-0"></div>
        <div className="blur-blob"></div>
        <div className="blur-blob"></div>
        <div className="blur-blob"></div>
        
        <Header />
        
        <main style={{"paddingTop":"16px","paddingRight":"16px","paddingBottom":"16px","paddingLeft":"16px","marginTop":"0px","marginRight":"0px","marginBottom":"0px","marginLeft":"0px","fontSize":"16px","color":"rgb(249, 250, 251)","backgroundColor":"#0d010e","textAlign":"start","fontWeight":"400","objectFit":"fill","display":"flex","position":"relative","top":"0px","left":"0px","right":"0px","bottom":"0px"}} className="relative z-10 flex items-center justify-center p-4">
          <div className="glass-card p-8 md:p-12 rounded-2xl max-w-md w-full text-center">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] bg-clip-text text-transparent">
                AceSync
              </h1>
              <h2 className="text-2xl font-semibold mb-2">Sign in with Trakt</h2>
              <p className="text-[var(--text-secondary)]">
                Connect your entertainment journey
              </p>
            </div>
            
            <button 
              onClick={handleTraktLogin}
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-3 mb-6"
            >
              {isLoading ? (
                <div className="icon-loader-2 text-lg animate-spin"></div>
              ) : (
                <div className="icon-play text-lg"></div>
              )}
              {isLoading ? 'Connecting...' : 'Continue with Trakt'}
            </button>
            
            <div className="text-sm text-[var(--text-secondary)] mb-6">
              <p>We only request read permissions for your recommendations, watchlist, and profile.</p>
            </div>
            
            <div className="flex justify-center gap-6 text-sm">
              <a href="privacy.html" className="nav-link hover:underline">Privacy Policy</a>
              <a href="terms.html" className="nav-link hover:underline">Terms of Service</a>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('LoginPage component error:', error);
    return null;
  }
}

function App() {
  React.useEffect(() => {
    initializeTheme();
  }, []);

  return <LoginPage />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);