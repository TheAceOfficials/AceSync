function MovieCard({ item }) {
  const [isInWatchlist, setIsInWatchlist] = React.useState(false);

  const handleAddToWatchlist = async () => {
    try {
      // Mock API call
      setIsInWatchlist(!isInWatchlist);
    } catch (error) {
      console.error('Failed to update watchlist:', error);
    }
  };

  const handleDismiss = async () => {
    try {
      // Mock API call to dismiss recommendation
      console.log('Dismissed:', item.title);
    } catch (error) {
      console.error('Failed to dismiss:', error);
    }
  };

  try {
    return (
      <div className="glass-card rounded-xl overflow-hidden group hover:scale-105 transition-transform" data-name="movie-card" data-file="components/MovieCard.js">
        <div className="aspect-[2/3] relative overflow-hidden">
          <img 
            src={item.poster} 
            alt={item.title}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="flex gap-2">
              <button
                onClick={handleAddToWatchlist}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
              >
                <div className={`icon-${isInWatchlist ? 'bookmark-check' : 'bookmark'} text-white`}></div>
              </button>
              
              <button
                onClick={handleDismiss}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                title="Dismiss"
              >
                <div className="icon-x text-white"></div>
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-sm mb-1 truncate">{item.title}</h3>
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <span>{item.year}</span>
            <span className="flex items-center gap-1">
              <div className="icon-star text-yellow-500"></div>
              {item.rating}
            </span>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('MovieCard component error:', error);
    return null;
  }
}