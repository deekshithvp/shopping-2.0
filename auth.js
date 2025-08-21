document.addEventListener('DOMContentLoaded', () => {

    // === ENHANCED FORM TOGGLE LOGIC WITH ANIMATIONS ===
    const showLoginBtn = document.getElementById('show-login');
    const showRegisterBtn = document.getElementById('show-register');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Add smooth transition classes
    const addTransitionClasses = () => {
        if (loginForm) loginForm.style.transition = 'all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)';
        if (registerForm) registerForm.style.transition = 'all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)';
    };

    addTransitionClasses();

    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', () => {
            // Add ripple effect
            createRipple(showLoginBtn, event);
            
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
            showLoginBtn.classList.add('active');
            showRegisterBtn.classList.remove('active');
            
            // Add fade animation
            animateFormTransition(loginForm, registerForm);
        });
    }

    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', () => {
            // Add ripple effect
            createRipple(showRegisterBtn, event);
            
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
            showRegisterBtn.classList.add('active');
            showLoginBtn.classList.remove('active');
            
            // Add fade animation
            animateFormTransition(registerForm, loginForm);
        });
    }

    // === RIPPLE EFFECT FUNCTION ===
    const createRipple = (element, event) => {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    };

    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes shake {
            0%, 20%, 40%, 60%, 80%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
        }
        
        @keyframes success-pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .animate-shake {
            animation: shake 0.5s ease-in-out;
        }
        
        .animate-success {
            animation: success-pulse 0.6s ease-in-out;
        }
        
        .input-success {
            border-color: #4ade80 !important;
            background: rgba(74, 222, 128, 0.05) !important;
            box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1) !important;
        }
        
        .loading-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(10, 10, 11, 0.8);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .loading-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(103, 232, 249, 0.3);
            border-top: 3px solid #67e8f9;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            color: white;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(400px);
            transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.6);
        }
        
        .toast.show {
            transform: translateX(0);
        }
        
        .toast.success {
            background: linear-gradient(135deg, #4ade80, #22c55e);
        }
        
        .toast.error {
            background: linear-gradient(135deg, #f87171, #ef4444);
        }
        
        .toast.warning {
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
        }
    `;
    document.head.appendChild(style);

    // === FORM TRANSITION ANIMATION ===
    const animateFormTransition = (showForm, hideForm) => {
        if (hideForm) {
            hideForm.style.transform = 'translateX(-20px)';
            hideForm.style.opacity = '0';
        }
        
        if (showForm) {
            setTimeout(() => {
                showForm.style.transform = 'translateX(0)';
                showForm.style.opacity = '1';
            }, 150);
        }
    };

    // === TOAST NOTIFICATION SYSTEM ===
    const showToast = (message, type = 'success', duration = 4000) => {
        // Remove existing toasts
        document.querySelectorAll('.toast').forEach(toast => toast.remove());
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span>${getToastIcon(type)}</span>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Trigger show animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
        
        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 400);
        }, duration);
        
        return toast;
    };

    const getToastIcon = (type) => {
        switch (type) {
            case 'success': return '✓';
            case 'error': return '⚠';
            case 'warning': return '!';
            default: return 'ℹ';
        }
    };

    // === DYNAMICALLY POPULATE DOB DROPDOWNS WITH ENHANCED STYLING ===
    const dobDay = document.getElementById('dob-day');
    const dobYear = document.getElementById('dob-year');
    if (dobDay && dobYear) {
        for (let i = 1; i <= 31; i++) {
            dobDay.innerHTML += `<option value="${i}">${i}</option>`;
        }
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i >= 1930; i--) {
            dobYear.innerHTML += `<option value="${i}">${i}</option>`;
        }
    }

    // === ENHANCED VALIDATION HELPER FUNCTIONS ===
    const showError = (input, message) => {
        const formGroup = input.closest('.form-group') || input.closest('.dob-group');
        let error = formGroup.querySelector('.error-message');
        
        // Create error element if it doesn't exist
        if (!error) {
            error = document.createElement('div');
            error.className = 'error-message';
            formGroup.appendChild(error);
        }
        
        error.innerHTML = `<span style="margin-right: 0.5rem;">⚠</span>${message}`;
        input.classList.add('input-error');
        input.classList.remove('input-success');
        
        // Add shake animation to the input
        input.classList.add('animate-shake');
        setTimeout(() => {
            input.classList.remove('animate-shake');
        }, 500);
        
        // Focus the input with a slight delay for better UX
        setTimeout(() => {
            if (input.type !== 'checkbox' && input.tagName !== 'SELECT') {
                input.focus();
            }
        }, 100);
    };

    const showSuccess = (input, message = '') => {
        const formGroup = input.closest('.form-group') || input.closest('.dob-group');
        let success = formGroup.querySelector('.success-message');
        
        if (!success && message) {
            success = document.createElement('div');
            success.className = 'success-message';
            formGroup.appendChild(success);
        }
        
        if (success && message) {
            success.innerHTML = `<span style="margin-right: 0.5rem;">✓</span>${message}`;
        }
        
        input.classList.add('input-success');
        input.classList.remove('input-error');
        
        // Add success pulse animation
        input.classList.add('animate-success');
        setTimeout(() => {
            input.classList.remove('animate-success');
        }, 600);
    };

    const clearError = (input) => {
        const formGroup = input.closest('.form-group') || input.closest('.dob-group');
        const error = formGroup.querySelector('.error-message');
        const success = formGroup.querySelector('.success-message');
        
        if (error) error.remove();
        if (success) success.remove();
        
        input.classList.remove('input-error', 'input-success');
    };

    // === GET FORM ELEMENTS ===
    const loginUsername = document.getElementById('login-username');
    const loginPassword = document.getElementById('login-password');
    const regName = document.getElementById('reg-name');
    const regEmail = document.getElementById('reg-email');
    const regPhone = document.getElementById('reg-phone');
    const regPassword = document.getElementById('reg-password');
    const regConfirmPassword = document.getElementById('reg-confirm-password');
    const dobDaySelect = document.getElementById('dob-day');
    const dobMonthSelect = document.getElementById('dob-month');
    const dobYearSelect = document.getElementById('dob-year');
    const regTerms = document.getElementById('reg-terms');

    // === PASSWORD STRENGTH INDICATOR ===
    const createPasswordStrengthIndicator = (passwordInput) => {
        if (!passwordInput) return;
        
        const formGroup = passwordInput.closest('.form-group');
        let strengthIndicator = formGroup.querySelector('.password-strength');
        
        if (!strengthIndicator) {
            strengthIndicator = document.createElement('div');
            strengthIndicator.className = 'password-strength';
            strengthIndicator.style.cssText = `
                margin-top: 0.5rem;
                height: 4px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 2px;
                overflow: hidden;
                transition: all 0.3s ease;
            `;
            
            const strengthBar = document.createElement('div');
            strengthBar.className = 'strength-bar';
            strengthBar.style.cssText = `
                height: 100%;
                width: 0%;
                transition: all 0.3s ease;
                border-radius: 2px;
            `;
            
            strengthIndicator.appendChild(strengthBar);
            formGroup.appendChild(strengthIndicator);
        }
        
        return strengthIndicator;
    };

    const updatePasswordStrength = (password, indicator) => {
        if (!indicator) return;
        
        const strengthBar = indicator.querySelector('.strength-bar');
        let strength = 0;
        let color = '#ef4444'; // red
        
        if (password.length >= 8) strength += 20;
        if (/[A-Z]/.test(password)) strength += 20;
        if (/[a-z]/.test(password)) strength += 20;
        if (/\d/.test(password)) strength += 20;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 20;
        
        if (strength >= 80) color = '#22c55e'; // green
        else if (strength >= 60) color = '#fbbf24'; // yellow
        else if (strength >= 40) color = '#f97316'; // orange
        
        strengthBar.style.width = `${strength}%`;
        strengthBar.style.background = `linear-gradient(90deg, ${color}, ${color}cc)`;
    };

    // === ENHANCED VALIDATION FUNCTIONS ===
    
    // Login validation
    const validateLoginUsername = () => {
        const value = loginUsername.value.trim();
        if (value === '') {
            showError(loginUsername, 'Please enter your username or email.');
            return false;
        }
        if (value.length < 3) {
            showError(loginUsername, 'Username must be at least 3 characters.');
            return false;
        }
        clearError(loginUsername);
        showSuccess(loginUsername);
        return true;
    };

    const validateLoginPassword = () => {
        if (loginPassword.value.trim() === '') {
            showError(loginPassword, 'Please enter your password.');
            return false;
        }
        clearError(loginPassword);
        showSuccess(loginPassword);
        return true;
    };

    // Registration validation
    const validateRegName = () => {
        const nameValue = regName.value.trim();
        if (nameValue === '') {
            showError(regName, 'Name cannot be empty.');
            return false;
        }
        if (nameValue.length < 2) {
            showError(regName, 'Name must be at least 2 characters.');
            return false;
        }
        if (/\d/.test(nameValue)) {
            showError(regName, 'Name should not contain numbers.');
            return false;
        }
        if (!/^[a-zA-Z\s]+$/.test(nameValue)) {
            showError(regName, 'Name should only contain letters and spaces.');
            return false;
        }
        clearError(regName);
        showSuccess(regName, 'Perfect!');
        return true;
    };

    const validateRegEmail = () => {
        const email = regEmail.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            showError(regEmail, 'Email address is required.');
            return false;
        }
        if (!emailPattern.test(email)) {
            showError(regEmail, 'Please enter a valid email address.');
            return false;
        }
        if (email.length > 254) {
            showError(regEmail, 'Email address is too long.');
            return false;
        }
        
        clearError(regEmail);
        showSuccess(regEmail, 'Valid email!');
        return true;
    };

    const validateRegPhone = () => {
        const phone = regPhone.value.replace(/\D/g, ''); // Remove non-digits
        const phonePattern = /^\d{10}$/;
        
        if (phone === '') {
            showError(regPhone, 'Phone number is required.');
            return false;
        }
        if (!phonePattern.test(phone)) {
            showError(regPhone, 'Please enter a valid 10-digit phone number.');
            return false;
        }
        
        // Format phone number as user types
        const formatted = phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        regPhone.value = formatted;
        
        clearError(regPhone);
        showSuccess(regPhone, 'Valid phone number!');
        return true;
    };

    const validateRegPassword = () => {
        const password = regPassword.value;
        const indicator = createPasswordStrengthIndicator(regPassword);
        
        updatePasswordStrength(password, indicator);
        
        if (password.length < 8) {
            showError(regPassword, 'Password must be at least 8 characters long.');
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            showError(regPassword, 'Password must contain at least one uppercase letter.');
            return false;
        }
        if (!/[a-z]/.test(password)) {
            showError(regPassword, 'Password must contain at least one lowercase letter.');
            return false;
        }
        if (!/\d/.test(password)) {
            showError(regPassword, 'Password must contain at least one number.');
            return false;
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            showError(regPassword, 'Password must contain at least one special character.');
            return false;
        }

        clearError(regPassword);
        showSuccess(regPassword, 'Strong password!');
        
        // Re-validate confirmation if it has a value
        if (regConfirmPassword.value) {
            validateRegConfirmPassword();
        }
        
        return true;
    };

    const validateRegConfirmPassword = () => {
        const password = regPassword.value;
        const confirmPassword = regConfirmPassword.value;
        
        if (confirmPassword === '') {
            showError(regConfirmPassword, 'Please confirm your password.');
            return false;
        }
        if (password !== confirmPassword) {
            showError(regConfirmPassword, 'Passwords do not match.');
            return false;
        }
        
        clearError(regConfirmPassword);
        showSuccess(regConfirmPassword, 'Passwords match!');
        return true;
    };

    const validateRegDOB = () => {
        clearError(dobDaySelect);
        [dobDaySelect, dobMonthSelect, dobYearSelect].forEach(el => el.classList.remove('input-error', 'input-success'));

        const day = parseInt(dobDaySelect.value, 10);
        const month = parseInt(dobMonthSelect.value, 10);
        const year = parseInt(dobYearSelect.value, 10);

        if (!day || !month || !year) {
            showError(dobDaySelect, 'Please select a complete date of birth.');
            [dobDaySelect, dobMonthSelect, dobYearSelect].forEach(el => el.classList.add('input-error'));
            return false;
        }

        // Validate real calendar date
        const date = new Date(year, month - 1, day);
        if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
            showError(dobDaySelect, 'Please select a valid date.');
            [dobDaySelect, dobMonthSelect, dobYearSelect].forEach(el => el.classList.add('input-error'));
            return false;
        }

        // Check minimum age (18 years)
        const eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
        if (date > eighteenYearsAgo) {
            showError(dobDaySelect, 'You must be at least 18 years old.');
            [dobDaySelect, dobMonthSelect, dobYearSelect].forEach(el => el.classList.add('input-error'));
            return false;
        }

        // Check maximum age (120 years)
        const oneHundredTwentyYearsAgo = new Date();
        oneHundredTwentyYearsAgo.setFullYear(oneHundredTwentyYearsAgo.getFullYear() - 120);
        if (date < oneHundredTwentyYearsAgo) {
            showError(dobDaySelect, 'Please enter a valid birth year.');
            [dobDaySelect, dobMonthSelect, dobYearSelect].forEach(el => el.classList.add('input-error'));
            return false;
        }

        clearError(dobDaySelect);
        [dobDaySelect, dobMonthSelect, dobYearSelect].forEach(el => el.classList.add('input-success'));
        
        // Calculate and show age
        const today = new Date();
        const age = today.getFullYear() - date.getFullYear() - 
                   (today.getMonth() < date.getMonth() || 
                    (today.getMonth() === date.getMonth() && today.getDate() < date.getDate()) ? 1 : 0);
        
        showSuccess(dobDaySelect, `Age: ${age} years`);
        return true;
    };

    const validateRegTerms = () => {
        if (!regTerms.checked) {
            showError(regTerms, 'You must agree to the terms of service.');
            return false;
        }
        clearError(regTerms);
        showSuccess(regTerms, 'Thank you for accepting our terms!');
        return true;
    };

    // === ENHANCED LIVE VALIDATION ===
    const addLiveValidation = (element, validationFunc) => {
        if (element) {
            const eventType = (element.type === 'checkbox' || element.tagName === 'SELECT') ? 'change' : 'input';
            
            element.addEventListener(eventType, () => {
                // Add small delay for better UX
                setTimeout(validationFunc, 100);
            });
            
            // Also validate on focus out
            if (eventType === 'input') {
                element.addEventListener('blur', validationFunc);
            }
        }
    };

    // Apply live validation
    addLiveValidation(loginUsername, validateLoginUsername);
    addLiveValidation(loginPassword, validateLoginPassword);
    addLiveValidation(regName, validateRegName);
    addLiveValidation(regEmail, validateRegEmail);
    addLiveValidation(regPhone, validateRegPhone);
    addLiveValidation(regPassword, validateRegPassword);
    addLiveValidation(regConfirmPassword, validateRegConfirmPassword);
    addLiveValidation(regTerms, validateRegTerms);
    [dobDaySelect, dobMonthSelect, dobYearSelect].forEach(el => addLiveValidation(el, validateRegDOB));

    // === LOADING OVERLAY SYSTEM ===
    const createLoadingOverlay = (form) => {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = '<div class="loading-spinner"></div>';
        form.style.position = 'relative';
        form.appendChild(overlay);
        return overlay;
    };

    const showLoading = (form) => {
        let overlay = form.querySelector('.loading-overlay');
        if (!overlay) {
            overlay = createLoadingOverlay(form);
        }
        overlay.classList.add('active');
        return overlay;
    };

    const hideLoading = (form) => {
        const overlay = form.querySelector('.loading-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    };

    // === ENHANCED FORM SUBMISSION ===
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const submitBtn = loginForm.querySelector('.submit-button');
            const originalText = submitBtn.textContent;
            
            const isUsernameValid = validateLoginUsername();
            const isPasswordValid = validateLoginPassword();

            if (isUsernameValid && isPasswordValid) {
                // Show loading state
                submitBtn.textContent = 'Signing In...';
                submitBtn.disabled = true;
                const overlay = showLoading(loginForm);
                
                // Simulate API call
                try {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    hideLoading(loginForm);
                    showToast('Welcome back! Login successful.', 'success');
                    
                    // Reset form with animation
                    setTimeout(() => {
                        loginForm.reset();
                        clearAllErrors(loginForm);
                    }, 1000);
                    
                } catch (error) {
                    hideLoading(loginForm);
                    showToast('Login failed. Please try again.', 'error');
                } finally {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            } else {
                showToast('Please fix the errors above.', 'error');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const submitBtn = registerForm.querySelector('.submit-button');
            const originalText = submitBtn.textContent;
            
            const isNameValid = validateRegName();
            const isEmailValid = validateRegEmail();
            const isPhoneValid = validateRegPhone();
            const isPasswordValid = validateRegPassword();
            const isConfirmPasswordValid = validateRegConfirmPassword();
            const isDOBValid = validateRegDOB();
            const isTermsValid = validateRegTerms();

            if (isNameValid && isEmailValid && isPhoneValid && isPasswordValid && 
                isConfirmPasswordValid && isDOBValid && isTermsValid) {
                
                submitBtn.textContent = 'Creating Account...';
                submitBtn.disabled = true;
                const overlay = showLoading(registerForm);
                
                try {
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    
                    hideLoading(registerForm);
                    showToast('🎉 Account created successfully! Welcome aboard!', 'success', 5000);
                    
                    setTimeout(() => {
                        registerForm.reset();
                        clearAllErrors(registerForm);
                        // Switch to login form
                        if (showLoginBtn) {
                            showLoginBtn.click();
                        }
                    }, 1500);
                    
                } catch (error) {
                    hideLoading(registerForm);
                    showToast('Registration failed. Please try again.', 'error');
                } finally {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            } else {
                showToast('Please fix all validation errors before submitting.', 'error');
            }
        });
    }

    // === UTILITY FUNCTIONS ===
    const clearAllErrors = (form) => {
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            clearError(input);
        });
    };

    // === ACCESSIBILITY ENHANCEMENTS ===
    const enhanceAccessibility = () => {
        // Add keyboard navigation for custom elements
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Clear focused input errors on escape
                const focusedInput = document.activeElement;
                if (focusedInput && (focusedInput.tagName === 'INPUT' || focusedInput.tagName === 'SELECT')) {
                    clearError(focusedInput);
                }
            }
        });
        
        // Add focus indicators for better accessibility
        const inputs = document.querySelectorAll('input, select, button');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.outline = '2px solid rgba(103, 232, 249, 0.5)';
                input.style.outlineOffset = '2px';
            });
            
            input.addEventListener('blur', () => {
                input.style.outline = 'none';
            });
        });
    };

    // Initialize accessibility enhancements
    enhanceAccessibility();

    // === SCROLL ANIMATIONS FOR FORM ELEMENTS ===
    const observeFormElements = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-on-scroll', 'visible');
                }
            });
        }, { threshold: 0.1 });

        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.add('animate-on-scroll');
            observer.observe(group);
        });
    };

    // Initialize scroll animations
    observeFormElements();

    console.log('🚀 Enhanced form validation system loaded successfully!');
});