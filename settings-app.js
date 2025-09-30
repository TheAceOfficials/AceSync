function SettingsPage() {
  const [theme, setTheme] = React.useState('light');
  const [hideActivity, setHideActivity] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = React.useState(false);

  React.useEffect(() => {
    initializeTheme();
    const currentTheme = getTheme();
    setTheme(currentTheme);
    
    // Load privacy settings
    const activitySetting = localStorage.getItem('hide_activity') === 'true';
    setHideActivity(activitySetting);
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleRefreshData = async () => {
    try {
      setLoading(true);
      // Mock API call to refresh data
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Failed to refresh data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnectTrakt = async () => {
    try {
      // Clear auth data
      sessionStorage.clear();
      localStorage.removeItem('trakt_access_token');
      
      // Redirect to login
      window.location.href = 'index.html';
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  const handlePrivacyToggle = (setting, value) => {
    if (setting === 'hideActivity') {
      setHideActivity(value);
      localStorage.setItem('hide_activity', value.toString());
    }
  };

  try {
    return (
      <div className="min-h-screen relative overflow-hidden" data-name="settings-page" data-file="settings-app.js">
        <div className="animated-bg absolute inset-0"></div>
        <div className="blur-blob"></div>
        <div className="blur-blob"></div>
        <div className="blur-blob"></div>
        
        <Header />
        
        <main className="relative z-10 min-h-screen pt-20 pb-16">
          <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Settings</h1>
              <p className="text-[var(--text-secondary)]">Manage your preferences and account</p>
            </div>

            <div className="space-y-6">
              {/* Theme Settings */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <div className="icon-palette text-[var(--primary-color)]"></div>
                  Theme
                </h3>
                
                <div className="grid grid-cols-3 gap-4">
                  {['light', 'dark', 'system'].map(themeOption => (
                    <button
                      key={themeOption}
                      onClick={() => handleThemeChange(themeOption)}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        theme === themeOption
                          ? 'border-[var(--primary-color)] bg-[var(--primary-color)]/10'
                          : 'border-[var(--border-color)] hover:border-[var(--primary-color)]'
                      }`}
                    >
                      <div className={`icon-${themeOption === 'light' ? 'sun' : themeOption === 'dark' ? 'moon' : 'monitor'} text-2xl mb-2`}></div>
                      <div className="font-medium capitalize">{themeOption}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Data Controls */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <div className="icon-database text-[var(--primary-color)]"></div>
                  Data Controls
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-[var(--border-color)]">
                    <div>
                      <h4 className="font-medium">Refresh Trakt Data</h4>
                      <p className="text-sm text-[var(--text-secondary)]">Sync your latest activity from Trakt</p>
                    </div>
                    <button
                      onClick={handleRefreshData}
                      disabled={loading}
                      className="btn-primary flex items-center gap-2"
                    >
                      {loading ? (
                        <div className="icon-loader-2 animate-spin"></div>
                      ) : (
                        <div className="icon-refresh-cw"></div>
                      )}
                      {loading ? 'Refreshing...' : 'Refresh Now'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Privacy Controls */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <div className="icon-shield text-[var(--primary-color)]"></div>
                  Privacy
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-[var(--border-color)]">
                    <div>
                      <h4 className="font-medium">Hide Activity on Homepage</h4>
                      <p className="text-sm text-[var(--text-secondary)]">Don't show recent activity in your profile</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hideActivity}
                        onChange={(e) => handlePrivacyToggle('hideActivity', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[var(--primary-color)]"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Account */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <div className="icon-user text-[var(--primary-color)]"></div>
                  Account
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                    <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Disconnect Trakt Account</h4>
                    <p className="text-sm text-red-600 dark:text-red-300 mb-4">
                      This will remove all your data and log you out. You'll need to reconnect your Trakt account to use AceSync again.
                    </p>
                    <button
                      onClick={() => setShowDisconnectModal(true)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Disconnect Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Disconnect Confirmation Modal */}
        {showDisconnectModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="glass-card p-6 rounded-xl max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">Confirm Disconnect</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                Are you sure you want to disconnect your Trakt account? This action cannot be undone and you'll lose access to your personalized data.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDisconnectModal(false)}
                  className="flex-1 px-4 py-2 border border-[var(--border-color)] rounded-lg hover:bg-[var(--card-bg)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDisconnectTrakt}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        )}
        
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('SettingsPage component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SettingsPage />);