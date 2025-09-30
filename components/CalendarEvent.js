function CalendarEvent({ event }) {
  const getEventIcon = (type) => {
    switch (type) {
      case 'movie': return 'film';
      case 'release': return 'calendar-plus';
      case 'personal': return 'user';
      default: return 'calendar';
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'movie': return 'text-blue-400';
      case 'release': return 'text-green-400';
      case 'personal': return 'text-purple-400';
      default: return 'text-[var(--primary-color)]';
    }
  };

  try {
    return (
      <div className="flex items-center gap-4 p-4 rounded-lg border border-[var(--border-color)] hover:bg-[var(--card-bg)] transition-colors" data-name="calendar-event" data-file="components/CalendarEvent.js">
        <div className={`w-12 h-12 rounded-lg bg-[var(--card-bg)] flex items-center justify-center`}>
          <div className={`icon-${getEventIcon(event.type)} text-xl ${getEventColor(event.type)}`}></div>
        </div>
        
        <div className="flex-1">
          <h4 className="font-semibold text-[var(--text-primary)] mb-1">{event.title}</h4>
          <p className="text-sm text-[var(--text-secondary)] mb-1">{event.description}</p>
          <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
            <span className="flex items-center gap-1">
              <div className="icon-calendar text-xs"></div>
              {new Date(event.date).toLocaleDateString()}
            </span>
            {event.time && event.time !== '00:00' && (
              <span className="flex items-center gap-1">
                <div className="icon-clock text-xs"></div>
                {event.time}
              </span>
            )}
          </div>
        </div>
        
        <button className="p-2 text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
          <div className="icon-more-horizontal text-lg"></div>
        </button>
      </div>
    );
  } catch (error) {
    console.error('CalendarEvent component error:', error);
    return null;
  }
}