# AceSync - Entertainment Hub

A responsive multi-page web application that connects to Trakt for user entertainment data management.

## Features

- **Trakt OAuth Integration**: Secure login with Authorization Code + PKCE flow
- **Animated UI**: Blur gradient backgrounds with smooth morphing blobs
- **Glassmorphism Design**: Backdrop-filtered cards with subtle transparency
- **Dark/Light Theme**: Toggle between themes with system preference support
- **Responsive Design**: Mobile-first layout that works on all devices

## Pages

1. **Login** (`index.html`) - Trakt OAuth authentication
2. **Home** (`home.html`) - Dashboard with user stats and quick actions
3. **Recommendations** (`recommendations.html`) - Personalized movie/show grid with filters
4. **Watchlist** (`watchlist.html`) - Movies and shows tabs with bulk actions
5. **Profile** (`profile.html`) - User profile and activity stats
6. **Settings** (`settings.html`) - Theme, data controls, and account management

## Components

- `Header.js` - Sticky navigation with theme toggle
- `Footer.js` - Footer with legal links
- `ThemeToggle.js` - Dark/light mode switcher
- `StatCard.js` - Dashboard metric cards
- `MovieCard.js` - Movie/show recommendation cards
- `WatchlistItem.js` - Individual watchlist items

## Utilities

- `theme.js` - Theme management functions
- `auth.js` - Trakt OAuth authentication with PKCE

## Styling

- CSS variables for consistent theming
- Animated gradient backgrounds
- Glassmorphism effects with backdrop-filter
- Responsive grid layouts
- Smooth transitions and hover effects

## Technology Stack

- React 18 (production CDN)
- TailwindCSS for styling
- Lucide icons
- Vanilla JavaScript (no build process required)

## OAuth Implementation

The app uses Authorization Code with PKCE flow for secure Trakt authentication:
- Client ID configured in `utils/auth.js`
- Code verifier and challenge generated client-side
- State parameter for CSRF protection
- No client secrets exposed in browser

## Development Notes

- Mobile-first responsive design
- WCAG AA accessibility compliance
- Reduced motion support for animations
- LocalStorage for theme persistence
- SessionStorage for OAuth state management

## File Structure

```
/
├── index.html              # Login page
├── home.html              # Dashboard
├── recommendations.html   # Movie/show recommendations
├── watchlist.html        # Personal watchlist
├── profile.html          # User profile (to be added)
├── settings.html         # App settings (to be added)
├── style.css            # Shared styles
├── app.js               # Login page logic
├── home-app.js          # Home page logic
├── recommendations-app.js # Recommendations logic
├── watchlist-app.js     # Watchlist logic
├── components/          # Reusable React components
├── utils/              # Utility functions
└── trickle/           # Project assets and notes
```

## Next Steps

1. Implement Profile page with user stats and activity
2. Create Settings page with theme and account controls
3. Add Privacy Policy and Terms of Service pages
4. Integrate real Trakt API endpoints
5. Implement server-side OAuth token exchange
