// Toggle password visibility
const togglePassword = document.getElementById('togglePassword');
const passwordField = document.getElementById('password');

togglePassword.addEventListener('click', function() {
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    
    // Change eye icon based on visibility
    this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
});

// Form validation
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const successMessage = document.getElementById('successMessage');

// Email validation regex
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate email
emailInput.addEventListener('blur', function() {
    const value = this.value.trim();
    
    if (!value) {
        showError(emailError, 'Email or username is required');
        return;
    }
    
    if (value.includes('@') && !isValidEmail(value)) {
        showError(emailError, 'Please enter a valid email address');
        return;
    }
    
    clearError(emailError);
});

// Validate password
passwordInput.addEventListener('blur', function() {
    const value = this.value.trim();
    
    if (!value) {
        showError(passwordError, 'Password is required');
        return;
    }
    
    if (value.length < 6) {
        showError(passwordError, 'Password must be at least 6 characters');
        return;
    }
    
    clearError(passwordError);
});

// Clear errors on input
emailInput.addEventListener('input', function() {
    if (this.value.trim()) {
        clearError(emailError);
    }
});

passwordInput.addEventListener('input', function() {
    if (this.value.trim()) {
        clearError(passwordError);
    }
});

function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearError(errorElement) {
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

// Form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    
    const emailValue = emailInput.value.trim();
    if (!emailValue) {
        showError(emailError, 'Email or username is required');
        isValid = false;
    } else if (emailValue.includes('@') && !isValidEmail(emailValue)) {
        showError(emailError, 'Please enter a valid email address');
        isValid = false;
    }
    
    const passwordValue = passwordInput.value.trim();
    if (!passwordValue) {
        showError(passwordError, 'Password is required');
        isValid = false;
    } else if (passwordValue.length < 6) {
        showError(passwordError, 'Password must be at least 6 characters');
        isValid = false;
    }
    
    if (isValid) {
        // Simulate login process
        const loginButton = document.querySelector('.login-button');
        loginButton.disabled = true;
        loginButton.textContent = 'Signing in...';
        
        // Simulate API call with timeout
        setTimeout(() => {
            // Success
            successMessage.classList.add('show');
            loginForm.style.opacity = '0.5';
            loginForm.style.pointerEvents = 'none';
            
            // Log form data (in real app, send to server)
            console.log('Login attempt with:', {
                email: emailValue,
                password: passwordValue,
                rememberMe: document.getElementById('rememberMe').checked
            });
            
            // Reset after delay
            setTimeout(() => {
                loginForm.reset();
                loginForm.style.opacity = '1';
                loginForm.style.pointerEvents = 'auto';
                loginButton.disabled = false;
                loginButton.textContent = 'Sign In';
                successMessage.classList.remove('show');
                passwordField.setAttribute('type', 'password');
                togglePassword.textContent = '👁️';
            }, 2000);
        }, 1500);
    }
});
