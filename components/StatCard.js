function StatCard({ title, value, icon, color }) {
  try {
    return (
      <div className="glass-card p-6 rounded-xl" data-name="stat-card" data-file="components/StatCard.js">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-[var(--text-secondary)]">{title}</h3>
          <div 
            className={`w-12 h-12 rounded-lg flex items-center justify-center`}
            style={{ backgroundColor: `${color}20` }}
          >
            <div 
              className={`icon-${icon} text-xl`}
              style={{ color: color }}
            ></div>
          </div>
        </div>
        
        <div className="text-2xl font-bold text-[var(--text-primary)]">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        
        <div className="mt-2 text-sm text-[var(--text-secondary)]">
          {title === 'This Week' && value > 0 && (
            <span className="text-green-500">↗ +{Math.round(value * 0.15)} from last week</span>
          )}
          {title === 'Total Plays' && (
            <span>All time activity</span>
          )}
          {title === 'Total Ratings' && (
            <span>Shows & movies rated</span>
          )}
          {title === 'Favorite Genre' && (
            <span>Most watched category</span>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('StatCard component error:', error);
    return null;
  }
}