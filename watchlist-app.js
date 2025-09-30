function WatchlistPage() {
  const [activeTab, setActiveTab] = React.useState('movies');
  const [watchlist, setWatchlist] = React.useState({ movies: [], shows: [] });
  const [loading, setLoading] = React.useState(true);
  const [selectedItems, setSelectedItems] = React.useState([]);

  React.useEffect(() => {
    initializeTheme();
    loadWatchlist();
  }, []);

  const loadWatchlist = async () => {
    try {
      // Mock watchlist data
      const mockWatchlist = {
        movies: [
          { 
            id: 1, 
            title: 'Inception', 
            year: 2010, 
            addedAt: '2024-03-15',
            poster: 'https://images.unsplash.com/photo-1489599735734-79b4fe286040?w=300&h=450&fit=crop'
          }
        ],
        shows: [
          { 
            id: 2, 
            title: 'Stranger Things', 
            year: 2016, 
            addedAt: '2024-03-10',
            poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop'
          }
        ]
      };
      
      setWatchlist(mockWatchlist);
    } catch (error) {
      console.error('Failed to load watchlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkRemove = async () => {
    try {
      const updatedWatchlist = { ...watchlist };
      updatedWatchlist[activeTab] = updatedWatchlist[activeTab].filter(
        item => !selectedItems.includes(item.id)
      );
      setWatchlist(updatedWatchlist);
      setSelectedItems([]);
    } catch (error) {
      console.error('Failed to remove items:', error);
    }
  };

  const currentItems = watchlist[activeTab] || [];

  try {
    return (
      <div className="min-h-screen relative overflow-hidden" data-name="watchlist-page" data-file="watchlist-app.js">
        <div className="animated-bg absolute inset-0"></div>
        <div className="blur-blob"></div>
        <div className="blur-blob"></div>
        <div className="blur-blob"></div>
        
        <Header />
        
        <main className="relative z-10 min-h-screen pt-20 pb-16">
          <div className="max-w-6xl mx-auto p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">My Watchlist</h1>
              <p className="text-[var(--text-secondary)]">Movies and shows you want to watch</p>
            </div>

            {/* Tabs */}
            <div className="glass-card p-6 rounded-xl mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveTab('movies')}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'movies'
                        ? 'bg-[var(--primary-color)] text-white'
                        : 'text-[var(--text-secondary)] hover:text-[var(--primary-color)]'
                    }`}
                  >
                    Movies ({watchlist.movies?.length || 0})
                  </button>
                  <button
                    onClick={() => setActiveTab('shows')}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'shows'
                        ? 'bg-[var(--primary-color)] text-white'
                        : 'text-[var(--text-secondary)] hover:text-[var(--primary-color)]'
                    }`}
                  >
                    TV Shows ({watchlist.shows?.length || 0})
                  </button>
                </div>

                {selectedItems.length > 0 && (
                  <button
                    onClick={handleBulkRemove}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Remove Selected ({selectedItems.length})
                  </button>
                )}
              </div>

              {/* Watchlist Items */}
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-lg animate-pulse">
                      <div className="w-16 h-24 bg-gray-300 rounded"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : currentItems.length > 0 ? (
                <div className="space-y-4">
                  {currentItems.map(item => (
                    <WatchlistItem
                      key={item.id}
                      item={item}
                      isSelected={selectedItems.includes(item.id)}
                      onSelect={(id, selected) => {
                        setSelectedItems(prev =>
                          selected
                            ? [...prev, id]
                            : prev.filter(itemId => itemId !== id)
                        );
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="icon-bookmark text-4xl text-[var(--text-secondary)] mb-4"></div>
                  <h3 className="text-xl font-semibold mb-2">
                    No {activeTab} in your watchlist
                  </h3>
                  <p className="text-[var(--text-secondary)]">
                    Start adding some great {activeTab} to watch later!
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('WatchlistPage component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<WatchlistPage />);