// API Configuration
export const API_CONFIG = {
  baseURL: import.meta.env?.VITE_API_URL || 'http://localhost:8080',
  endpoints: {
    login: '/auth/login',
    register: '/auth/register',
    googleLogin: '/auth/google/login',
    googleCallback: '/auth/google/callback'
  }
};

// Google OAuth Configuration
export const GOOGLE_CONFIG = {
  clientId: '1234567890-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com' // Replace with actual Client ID
};

// Token Configuration
export const TOKEN_CONFIG = {
  storageKey: 'auth_token',
  userStorageKey: 'user_data'
};

// Redirect Configuration
export const REDIRECT_CONFIG = {
  afterLogin: '/dashboard', // Change to your dashboard URL
  afterLogout: '/login'
};
