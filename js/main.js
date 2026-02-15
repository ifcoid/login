import {
    loginWithEmail,
    loginWithGoogle,
    handleGoogleCallback,
    isAuthenticated,
    redirectAfterLogin
} from './auth.js';

import {
    initUI,
    showLoading,
    hideLoading,
    showError,
    showSuccess,
    validateForm,
    setupInputValidation,
    getFormData
} from './ui.js';

/**
 * Initialize the application
 */
function init() {
    // Initialize UI elements
    initUI();

    // Check if user is already authenticated
    if (isAuthenticated()) {
        redirectAfterLogin();
        return;
    }

    // Check for Google OAuth callback
    try {
        if (handleGoogleCallback()) {
            showSuccess('Login successful! Redirecting...');
            setTimeout(() => {
                redirectAfterLogin();
            }, 1000);
            return;
        }
    } catch (error) {
        showError(error.message || 'Google login failed');
    }

    // Setup event listeners
    setupEventListeners();
    setupInputValidation();

    // Add fade-in animation
    document.body.classList.add('loaded');
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    const loginForm = document.getElementById('loginForm');
    const googleButton = document.getElementById('googleButton');

    // Email/Password login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    // Google OAuth button
    if (googleButton) {
        googleButton.addEventListener('click', handleGoogleLogin);
    }

    // Enter key on password field
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleLoginSubmit(e);
            }
        });
    }
}

/**
 * Handle login form submission
 * @param {Event} e - Form submit event
 */
async function handleLoginSubmit(e) {
    e.preventDefault();

    // Validate form
    const validation = validateForm();
    if (!validation.isValid) {
        return;
    }

    // Get form data
    const { email, password } = getFormData();

    // Show loading state
    showLoading();

    try {
        // Attempt login
        const data = await loginWithEmail(email, password);

        // Show success message
        showSuccess('Login successful! Redirecting...');

        // Redirect after short delay
        setTimeout(() => {
            redirectAfterLogin();
        }, 1000);

    } catch (error) {
        // Show error message
        hideLoading();
        showError(error.message || 'Login failed. Please check your credentials.');
    }
}

/**
 * Handle Google login button click
 */
function handleGoogleLogin() {
    showLoading();
    loginWithGoogle();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
