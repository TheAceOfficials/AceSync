function HomePage() {
  const [user, setUser] = React.useState(null);
  const [stats, setStats] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    initializeTheme();
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // Mock user data - replace with actual Trakt API calls
      setUser({ username: 'MovieFan123', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' });
      setStats({
        totalPlays: 1247,
        thisWeek: 12,
        totalRatings: 342,
        favoriteGenre: 'Sci-Fi'
      });
    } catch (error) {
      console.error('Failed to load user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { label: 'Refresh Data', icon: 'refresh-cw', action: () => loadUserData() },
    { label: 'Watchlist', icon: 'bookmark', action: () => window.location.href = 'watchlist.html' },
    { label: 'Recommendations', icon: 'star', action: () => window.location.href = 'recommendations.html' }
  ];

  try {
    return (
      <div className="min-h-screen relative overflow-hidden" data-name="home-page" data-file="home-app.js">
        <div className="animated-bg absolute inset-0"></div>
        <div className="blur-blob"></div>
        <div className="blur-blob"></div>
        <div className="blur-blob"></div>
        
        <Header />
        
        <main className="relative z-10 min-h-screen pt-20 pb-16">
          <div className="max-w-6xl mx-auto p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Welcome back{user ? `, ${user.username}` : ''}!
              </h1>
              <p className="text-[var(--text-secondary)]">Here's what's happening in your entertainment world</p>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="glass-card p-6 rounded-xl animate-pulse">
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="h-8 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard 
                  title="Total Plays" 
                  value={stats?.totalPlays || 0} 
                  icon="play" 
                  color="var(--primary-color)"
                />
                <StatCard 
                  title="This Week" 
                  value={stats?.thisWeek || 0} 
                  icon="calendar" 
                  color="var(--accent-color)"
                />
                <StatCard 
                  title="Total Ratings" 
                  value={stats?.totalRatings || 0} 
                  icon="star" 
                  color="#8b5cf6"
                />
                <StatCard 
                  title="Favorite Genre" 
                  value={stats?.favoriteGenre || 'N/A'} 
                  icon="heart" 
                  color="#06b6d4"
                />
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <div className="icon-clock text-[var(--primary-color)]"></div>
                  Continue Watching
                </h3>
                <p className="text-[var(--text-secondary)]">No recent activity to continue</p>
              </div>

              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <div className="icon-calendar text-[var(--accent-color)]"></div>
                  This Week's Schedule
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Wed - The Matrix 4</span>
                    <span className="text-[var(--text-secondary)]">8:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Fri - Stranger Things S5</span>
                    <span className="text-[var(--text-secondary)]">Release</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Sun - Movie Night</span>
                    <span className="text-[var(--text-secondary)]">7:30 PM</span>
                  </div>
                  <button 
                    onClick={() => window.location.href = 'calendar.html'}
                    className="w-full mt-3 px-3 py-2 text-sm bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-color)]/80 transition-colors"
                  >
                    View Full Calendar
                  </button>
                </div>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <div className="icon-zap text-[var(--accent-color)]"></div>
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--card-bg)] transition-colors"
                    >
                      <div className={`icon-${action.icon} text-[var(--primary-color)]`}></div>
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('HomePage component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HomePage />);