function CalendarPage() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [viewMode, setViewMode] = React.useState('month');

  React.useEffect(() => {
    initializeTheme();
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      // Mock calendar events
      const mockEvents = [
        {
          id: 1,
          title: 'The Matrix 4 - Watch Party',
          date: '2025-10-02',
          time: '20:00',
          type: 'movie',
          description: 'Join friends for movie night'
        },
        {
          id: 2,
          title: 'Stranger Things S5 Release',
          date: '2025-10-04',
          time: '00:00',
          type: 'release',
          description: 'New season drops on Netflix'
        },
        {
          id: 3,
          title: 'Weekly Movie Review',
          date: '2025-10-06',
          time: '19:30',
          type: 'personal',
          description: 'Write reviews for this week'
        }
      ];
      
      setEvents(mockEvents);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getEventsForDay = (day) => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  try {
    return (
      <div className="min-h-screen relative overflow-hidden" data-name="calendar-page" data-file="calendar-app.js">
        <div className="animated-bg absolute inset-0"></div>
        <div className="blur-blob"></div>
        <div className="blur-blob"></div>
        <div className="blur-blob"></div>
        
        <Header />
        
        <main className="relative z-10 min-h-screen pt-20 pb-16">
          <div className="max-w-6xl mx-auto p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Entertainment Calendar</h1>
              <p className="text-[var(--text-secondary)]">Track releases, watch parties, and your viewing schedule</p>
            </div>

            {/* Calendar Header */}
            <div className="glass-card p-6 rounded-xl mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 hover:bg-[var(--card-bg)] rounded-lg transition-colors"
                  >
                    <div className="icon-chevron-left text-xl"></div>
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-color)]/80 transition-colors"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 hover:bg-[var(--card-bg)] rounded-lg transition-colors"
                  >
                    <div className="icon-chevron-right text-xl"></div>
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2 text-center font-medium text-[var(--text-secondary)]">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth(currentDate).map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-20 p-2 rounded-lg border border-[var(--border-color)] ${
                      day ? 'hover:bg-[var(--card-bg)] cursor-pointer' : ''
                    } ${
                      day === new Date().getDate() && 
                      currentDate.getMonth() === new Date().getMonth() && 
                      currentDate.getFullYear() === new Date().getFullYear()
                        ? 'bg-[var(--primary-color)]/20 border-[var(--primary-color)]'
                        : 'bg-[var(--card-bg)]/30'
                    }`}
                  >
                    {day && (
                      <>
                        <div className="font-medium mb-1">{day}</div>
                        <div className="space-y-1">
                          {getEventsForDay(day).map(event => (
                            <div
                              key={event.id}
                              className={`text-xs p-1 rounded truncate ${
                                event.type === 'movie' ? 'bg-blue-500/20 text-blue-300' :
                                event.type === 'release' ? 'bg-green-500/20 text-green-300' :
                                'bg-purple-500/20 text-purple-300'
                              }`}
                            >
                              {event.title}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                <div className="icon-clock text-[var(--accent-color)]"></div>
                Upcoming Events
              </h3>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-16 bg-gray-700 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {events.map(event => (
                    <CalendarEvent key={event.id} event={event} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('CalendarPage component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CalendarPage />);