/**
 * UI Helper Functions
 */

// DOM Elements
let loginForm;
let emailInput;
let passwordInput;
let loginButton;
let googleButton;
let errorContainer;
let loadingSpinner;

/**
 * Initialize UI elements
 */
export function initUI() {
    loginForm = document.getElementById('loginForm');
    emailInput = document.getElementById('email');
    passwordInput = document.getElementById('password');
    loginButton = document.getElementById('loginButton');
    googleButton = document.getElementById('googleButton');
    errorContainer = document.getElementById('errorMessage');
    loadingSpinner = document.getElementById('loadingSpinner');
}

/**
 * Show loading state
 */
export function showLoading() {
    if (loadingSpinner) {
        loadingSpinner.classList.remove('hidden');
    }
    if (loginButton) {
        loginButton.disabled = true;
        loginButton.classList.add('loading');
    }
    if (googleButton) {
        googleButton.disabled = true;
    }
}

/**
 * Hide loading state
 */
export function hideLoading() {
    if (loadingSpinner) {
        loadingSpinner.classList.add('hidden');
    }
    if (loginButton) {
        loginButton.disabled = false;
        loginButton.classList.remove('loading');
    }
    if (googleButton) {
        googleButton.disabled = false;
    }
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
export function showError(message) {
    if (errorContainer) {
        errorContainer.textContent = message;
        errorContainer.classList.remove('hidden');
        errorContainer.classList.add('show');

        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideError();
        }, 5000);
    }
}

/**
 * Show error message with action link
 * @param {string} message - Error message to display
 * @param {string} linkText - Text for the action link
 * @param {string} linkUrl - URL for the action link
 */
export function showErrorWithAction(message, linkText, linkUrl) {
    if (errorContainer) {
        // Clear previous content
        errorContainer.innerHTML = '';

        // Create message text
        const messageSpan = document.createElement('span');
        messageSpan.textContent = message + ' ';

        // Create action link
        const actionLink = document.createElement('a');
        actionLink.href = linkUrl;
        actionLink.textContent = linkText;
        actionLink.style.color = 'inherit';
        actionLink.style.textDecoration = 'underline';
        actionLink.style.fontWeight = '600';

        // Append to container
        errorContainer.appendChild(messageSpan);
        errorContainer.appendChild(actionLink);

        errorContainer.classList.remove('hidden');
        errorContainer.classList.add('show');

        // Auto-hide after 8 seconds (longer for actionable errors)
        setTimeout(() => {
            hideError();
        }, 8000);
    }
}

/**
 * Hide error message
 */
export function hideError() {
    if (errorContainer) {
        errorContainer.classList.remove('show');
        setTimeout(() => {
            errorContainer.classList.add('hidden');
        }, 300);
    }
}

/**
 * Show success message
 * @param {string} message - Success message to display
 */
export function showSuccess(message) {
    if (errorContainer) {
        errorContainer.textContent = message;
        errorContainer.classList.remove('hidden', 'error');
        errorContainer.classList.add('show', 'success');

        setTimeout(() => {
            errorContainer.classList.remove('show');
        }, 2000);
    }
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate password (minimum 6 characters)
 * @param {string} password - Password to validate
 * @returns {boolean} - True if valid
 */
export function validatePassword(password) {
    return password && password.length >= 6;
}

/**
 * Show input error
 * @param {HTMLElement} input - Input element
 * @param {string} message - Error message
 */
export function showInputError(input, message) {
    input.classList.add('error');
    const errorSpan = input.parentElement.querySelector('.input-error');
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.classList.remove('hidden');
    }
}

/**
 * Clear input error
 * @param {HTMLElement} input - Input element
 */
export function clearInputError(input) {
    input.classList.remove('error');
    const errorSpan = input.parentElement.querySelector('.input-error');
    if (errorSpan) {
        errorSpan.classList.add('hidden');
    }
}

/**
 * Validate form inputs
 * @returns {Object} - Validation result with isValid and errors
 */
export function validateForm() {
    let isValid = true;
    const errors = {};

    // Clear previous errors
    clearInputError(emailInput);
    clearInputError(passwordInput);

    // Validate email
    const email = emailInput.value.trim();
    if (!email) {
        showInputError(emailInput, 'Email is required');
        isValid = false;
        errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
        showInputError(emailInput, 'Please enter a valid email');
        isValid = false;
        errors.email = 'Invalid email format';
    }

    // Validate password
    const password = passwordInput.value;
    if (!password) {
        showInputError(passwordInput, 'Password is required');
        isValid = false;
        errors.password = 'Password is required';
    } else if (!validatePassword(password)) {
        showInputError(passwordInput, 'Password must be at least 6 characters');
        isValid = false;
        errors.password = 'Password too short';
    }

    return { isValid, errors };
}

/**
 * Add input event listeners for real-time validation
 */
export function setupInputValidation() {
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            if (emailInput.value.trim()) {
                clearInputError(emailInput);
            }
        });

        emailInput.addEventListener('blur', () => {
            const email = emailInput.value.trim();
            if (email && !validateEmail(email)) {
                showInputError(emailInput, 'Please enter a valid email');
            }
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('input', () => {
            if (passwordInput.value) {
                clearInputError(passwordInput);
            }
        });

        passwordInput.addEventListener('blur', () => {
            const password = passwordInput.value;
            if (password && !validatePassword(password)) {
                showInputError(passwordInput, 'Password must be at least 6 characters');
            }
        });
    }
}

/**
 * Get form data
 * @returns {Object} - Form data with email and password
 */
export function getFormData() {
    return {
        email: emailInput.value.trim(),
        password: passwordInput.value
    };
}
