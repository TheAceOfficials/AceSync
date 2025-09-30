function WatchlistItem({ item, isSelected, onSelect }) {
  const handleRemove = async () => {
    try {
      // Mock API call to remove from watchlist
      console.log('Removing from watchlist:', item.title);
    } catch (error) {
      console.error('Failed to remove from watchlist:', error);
    }
  };

  try {
    return (
      <div className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
        isSelected ? 'bg-[var(--primary-color)]/10 border-[var(--primary-color)]' : 'border-[var(--border-color)] hover:bg-[var(--card-bg)]'
      }`} data-name="watchlist-item" data-file="components/WatchlistItem.js">
        
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(item.id, e.target.checked)}
          className="w-4 h-4 text-[var(--primary-color)] rounded focus:ring-[var(--primary-color)]"
        />
        
        <img
          src={item.poster}
          alt={item.title}
          className="w-16 h-24 object-cover rounded-lg"
        />
        
        <div className="flex-1">
          <h3 className="font-semibold text-[var(--text-primary)] mb-1">{item.title}</h3>
          <p className="text-sm text-[var(--text-secondary)] mb-2">Released: {item.year}</p>
          <p className="text-xs text-[var(--text-secondary)]">
            Added: {new Date(item.addedAt).toLocaleDateString()}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleRemove}
            className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Remove from watchlist"
          >
            <div className="icon-trash-2 text-lg"></div>
          </button>
          
          <button className="p-2 text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
            <div className="icon-external-link text-lg"></div>
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('WatchlistItem component error:', error);
    return null;
  }
}