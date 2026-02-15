import {
    loginWithEmail,
    handleGoogleSignIn,
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
 * Handle Google Sign-In event
 * This listens to the custom event dispatched by the global callback
 */
async function handleGoogleSignInEvent(event) {
    showLoading();

    try {
        // Get credential from event detail
        const credential = event.detail.credential;

        // Send credential to backend for verification
        await handleGoogleSignIn(credential);

        // Show success message
        showSuccess('Login dengan Google berhasil! Redirecting...');

        // Redirect after short delay
        setTimeout(() => {
            redirectAfterLogin();
        }, 1000);

    } catch (error) {
        hideLoading();
        showError(error.message || 'Google sign-in failed');
    }
}

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

    // Listen for Google Sign-In event
    window.addEventListener('googleSignIn', handleGoogleSignInEvent);

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

    // Email/Password login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
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
        await loginWithEmail(email, password);

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

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
