function RecommendationsPage() {
  const [recommendations, setRecommendations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedGenre, setSelectedGenre] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('relevance');

  React.useEffect(() => {
    initializeTheme();
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      // Mock recommendations data
      const mockRecommendations = [
        { 
          id: 1, 
          title: 'The Matrix', 
          year: 1999, 
          rating: 8.7, 
          genre: 'Sci-Fi',
          poster: 'https://images.unsplash.com/photo-1489599735734-79b4fe286040?w=300&h=450&fit=crop',
          type: 'movie'
        },
        { 
          id: 2, 
          title: 'Breaking Bad', 
          year: 2008, 
          rating: 9.5, 
          genre: 'Drama',
          poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop',
          type: 'show'
        }
      ];
      
      setRecommendations(mockRecommendations);
    } catch (error) {
      console.error('Failed to load recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const genres = ['all', 'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance'];

  try {
    return (
      <div className="min-h-screen relative overflow-hidden" data-name="recommendations-page" data-file="recommendations-app.js">
        <div className="animated-bg absolute inset-0"></div>
        <div className="blur-blob"></div>
        <div className="blur-blob"></div>
        <div className="blur-blob"></div>
        
        <Header />
        
        <main className="relative z-10 min-h-screen pt-20 pb-16">
          <div className="max-w-6xl mx-auto p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Recommendations</h1>
              <p className="text-[var(--text-secondary)]">Personalized picks just for you</p>
            </div>

            {/* Filters */}
            <div className="glass-card p-6 rounded-xl mb-8">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex flex-wrap gap-2">
                  {genres.map(genre => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedGenre === genre 
                          ? 'bg-[var(--primary-color)] text-white' 
                          : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-[var(--primary-color)] hover:text-white'
                      }`}
                    >
                      {genre === 'all' ? 'All Genres' : genre}
                    </button>
                  ))}
                </div>
                
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--border-color)]"
                >
                  <option value="relevance">Sort by Relevance</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="year">Sort by Year</option>
                </select>
              </div>
            </div>

            {/* Recommendations Grid */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="glass-card p-4 rounded-xl animate-pulse">
                    <div className="aspect-[2/3] bg-gray-300 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
            ) : recommendations.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {recommendations.map(item => (
                  <MovieCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center glass-card p-12 rounded-xl">
                <div className="icon-star text-4xl text-[var(--text-secondary)] mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">No recommendations yet</h3>
                <p className="text-[var(--text-secondary)]">
                  Start rating some shows and movies to get personalized recommendations!
                </p>
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('RecommendationsPage component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RecommendationsPage />);