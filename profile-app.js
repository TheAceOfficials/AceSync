function ProfilePage() {
  const [user, setUser] = React.useState(null);
  const [stats, setStats] = React.useState(null);
  const [recentActivity, setRecentActivity] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    initializeTheme();
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      // Mock profile data
      setUser({
        username: 'MovieFan123',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
        bio: 'Film enthusiast and TV series binge-watcher',
        joinedDate: '2023-01-15',
        followers: 142,
        following: 89
      });

      setStats({
        totalWatched: 847,
        minutesWatched: 125340,
        favoriteGenres: ['Sci-Fi', 'Drama', 'Thriller'],
        topYear: 2024,
        averageRating: 7.8
      });

      setRecentActivity([
        { type: 'rating', title: 'The Matrix', rating: 9, date: '2024-03-20' },
        { type: 'watchlist', title: 'Inception', action: 'added', date: '2024-03-19' },
        { type: 'watched', title: 'Breaking Bad S5E16', date: '2024-03-18' }
      ]);
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    return `${days} days, ${hours % 24} hours`;
  };

  try {
    return (
      <div className="min-h-screen relative overflow-hidden" data-name="profile-page" data-file="profile-app.js">
        <div className="animated-bg absolute inset-0"></div>
        <div className="blur-blob"></div>
        <div className="blur-blob"></div>
        <div className="blur-blob"></div>
        
        <Header />
        
        <main className="relative z-10 min-h-screen pt-20 pb-16">
          <div className="max-w-4xl mx-auto p-6">
            {loading ? (
              <div className="animate-pulse space-y-6">
                <div className="glass-card p-8 rounded-xl">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-300 rounded mb-2 w-48"></div>
                      <div className="h-4 bg-gray-300 rounded w-32"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Profile Header */}
                <div className="glass-card p-8 rounded-xl mb-8">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-[var(--primary-color)]"
                    />
                    
                    <div className="flex-1 text-center md:text-left">
                      <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                      <p className="text-[var(--text-secondary)] mb-2">@{user.username}</p>
                      <p className="text-[var(--text-secondary)] mb-4">{user.bio}</p>
                      
                      <div className="flex justify-center md:justify-start gap-6 text-sm">
                        <span><strong>{user.followers}</strong> Followers</span>
                        <span><strong>{user.following}</strong> Following</span>
                        <span>Joined {new Date(user.joinedDate).getFullYear()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="glass-card p-6 rounded-xl text-center">
                    <div className="icon-play text-3xl text-[var(--primary-color)] mb-3"></div>
                    <div className="text-2xl font-bold">{stats.totalWatched}</div>
                    <p className="text-[var(--text-secondary)]">Total Watched</p>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl text-center">
                    <div className="icon-clock text-3xl text-[var(--accent-color)] mb-3"></div>
                    <div className="text-2xl font-bold">{formatMinutes(stats.minutesWatched)}</div>
                    <p className="text-[var(--text-secondary)]">Watch Time</p>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl text-center">
                    <div className="icon-star text-3xl text-yellow-500 mb-3"></div>
                    <div className="text-2xl font-bold">{stats.averageRating}/10</div>
                    <p className="text-[var(--text-secondary)]">Avg Rating</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <div className="glass-card p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                      <div className="icon-activity text-[var(--primary-color)]"></div>
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--card-bg)]">
                          <div className={`icon-${activity.type === 'rating' ? 'star' : activity.type === 'watchlist' ? 'bookmark' : 'eye'} text-[var(--primary-color)]`}></div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-[var(--text-secondary)]">
                              {activity.type === 'rating' && `Rated ${activity.rating}/10`}
                              {activity.type === 'watchlist' && `Added to watchlist`}
                              {activity.type === 'watched' && `Watched`}
                              {' · '}{new Date(activity.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Favorite Genres */}
                  <div className="glass-card p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                      <div className="icon-heart text-[var(--accent-color)]"></div>
                      Favorite Genres
                    </h3>
                    <div className="space-y-3">
                      {stats.favoriteGenres.map((genre, index) => (
                        <div key={genre} className="flex items-center justify-between">
                          <span>{genre}</span>
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-[var(--primary-color)] rounded-full"
                              style={{ width: `${100 - (index * 20)}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('ProfilePage component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ProfilePage />);