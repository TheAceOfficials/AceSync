// Trakt OAuth configuration
const TRAKT_CLIENT_ID = 'your_trakt_client_id_here'; // Replace with actual client ID
const REDIRECT_URI = window.location.origin + '/auth/callback';
const TRAKT_AUTH_URL = 'https://trakt.tv/oauth/authorize';

// Generate code verifier and challenge for PKCE
function generateCodeVerifier() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode.apply(null, array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

async function generateCodeChallenge(verifier) {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Initialize OAuth flow
async function initiateTraktOAuth() {
  try {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const state = generateCodeVerifier(); // Use same function for state
    
    // Store PKCE parameters
    sessionStorage.setItem('code_verifier', codeVerifier);
    sessionStorage.setItem('oauth_state', state);
    
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: TRAKT_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope: 'public',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      state: state
    });
    
    window.location.href = `${TRAKT_AUTH_URL}?${params.toString()}`;
  } catch (error) {
    console.error('OAuth initiation failed:', error);
    throw error;
  }
}

// Handle OAuth callback
async function handleOAuthCallback() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const storedState = sessionStorage.getItem('oauth_state');
    
    if (!code || !state || state !== storedState) {
      throw new Error('Invalid OAuth callback parameters');
    }
    
    // In a real implementation, this would be handled server-side
    console.log('OAuth callback received, code:', code);
    
    // Redirect to home page after successful auth
    window.location.href = 'home.html';
  } catch (error) {
    console.error('OAuth callback failed:', error);
    throw error;
  }
}

// Check if user is authenticated
function isAuthenticated() {
  // Mock authentication check - replace with actual token validation
  return sessionStorage.getItem('trakt_access_token') !== null;
}