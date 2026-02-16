// API Configuration
export const API_CONFIG = {
  // Backend API URL (Fly.io deployment)
  baseURL: import.meta.env?.VITE_API_URL || 'https://lea.fly.dev',
  endpoints: {
    login: '/auth/login',
    register: '/auth/register',
    googleVerify: '/auth/google/verify' // Google Sign-In SDK verification
  }
};

// Google OAuth Configuration
export const GOOGLE_CONFIG = {
  clientId: '239713755402-4hr2cva377m43rsqs2dk0c7f7cktfeph.apps.googleusercontent.com'
};

// Token Configuration
export const TOKEN_CONFIG = {
  storageKey: 'auth_token',
  userStorageKey: 'user_data',
  tokenType: 'Bearer',
};

// Redirect Configuration
export const REDIRECT_CONFIG = {
  afterLogin: '/dashboard',
  afterLogout: '/login'
};
