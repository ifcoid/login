import { API_CONFIG, TOKEN_CONFIG, REDIRECT_CONFIG } from './config.js';

/**
 * Login with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - Response data with token and user info
 */
export async function loginWithEmail(email, password) {
    try {
        const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.login}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        if (data.success && data.data) {
            saveToken(data.data.token);
            saveUser(data.data.user);
            return data.data;
        }

        throw new Error('Invalid response format');
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

/**
 * Handle Google Sign-In credential response
 * This sends the Google credential token to backend for verification
 * @param {string} credential - JWT credential token from Google
 * @returns {Promise<Object>} - Response data with token and user info
 */
export async function handleGoogleSignIn(credential) {
    try {
        const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.googleVerify}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: credential }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Google sign-in failed');
        }

        if (data.success && data.data) {
            saveToken(data.data.token);
            saveUser(data.data.user);
            return data.data;
        }

        throw new Error('Invalid response format');
    } catch (error) {
        console.error('Google sign-in error:', error);
        throw error;
    }
}

/**
 * Save authentication token to localStorage
 * @param {string} token - PASETO token
 */
export function saveToken(token) {
    localStorage.setItem(TOKEN_CONFIG.storageKey, token);
}

/**
 * Get authentication token from localStorage
 * @returns {string|null} - Stored token or null
 */
export function getToken() {
    return localStorage.getItem(TOKEN_CONFIG.storageKey);
}

/**
 * Save user data to localStorage
 * @param {Object} user - User data object
 */
export function saveUser(user) {
    localStorage.setItem(TOKEN_CONFIG.userStorageKey, JSON.stringify(user));
}

/**
 * Get user data from localStorage
 * @returns {Object|null} - User data or null
 */
export function getUser() {
    const userData = localStorage.getItem(TOKEN_CONFIG.userStorageKey);
    return userData ? JSON.parse(userData) : null;
}

/**
 * Check if user is authenticated
 * @returns {boolean} - True if token exists
 */
export function isAuthenticated() {
    return !!getToken();
}

/**
 * Logout user by clearing stored data
 */
export function logout() {
    localStorage.removeItem(TOKEN_CONFIG.storageKey);
    localStorage.removeItem(TOKEN_CONFIG.userStorageKey);
    window.location.href = REDIRECT_CONFIG.afterLogout;
}

/**
 * Redirect to dashboard or specified page
 * @param {string} url - Optional custom redirect URL
 */
export function redirectAfterLogin(url = REDIRECT_CONFIG.afterLogin) {
    window.location.href = url;
}
