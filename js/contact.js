// ===== CONTACT PAGE FUNCTIONALITY =====
// Ashley Fields Contact Page

document.addEventListener('DOMContentLoaded', function() {
    initContactPage();
});

function initContactPage() {
    initContactForm();
    initFormValidation();
    initContactAnimations();
}

// ===== CONTACT FORM HANDLING =====
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

function handleFormSubmission(form) {
    // Validate all fields
    const isValid = validateForm(form);
    
    if (!isValid) {
        showNotification('Please fix the errors in the form.', 'error');
        return;
    }
    
    // Get form data
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData);
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Success
        showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        form.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Track form submission
        trackContactFormSubmission(formObject);
        
    }, 2000);
}

// ===== FORM VALIDATION =====
function initFormValidation() {
    // Add custom validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            maxLength: 50
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        subject: {
            required: false
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000
        }
    };
    
    window.contactValidationRules = validationRules;
}

function validateForm(form) {
    const fields = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const rules = window.contactValidationRules[field.name];
    if (!rules) return true;
    
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required validation
    if (rules.required && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    }
    
    // Min length validation
    if (rules.minLength && value.length < rules.minLength) {
        isValid = false;
        errorMessage = `Minimum ${rules.minLength} characters required.`;
    }
    
    // Max length validation
    if (rules.maxLength && value.length > rules.maxLength) {
        isValid = false;
        errorMessage = `Maximum ${rules.maxLength} characters allowed.`;
    }
    
    // Pattern validation (for email)
    if (rules.pattern && value && !rules.pattern.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
    }
    
    // Show/hide error
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: var(--error-color);
        font-size: var(--font-size-sm);
        margin-top: var(--spacing-xs);
    `;
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.classList.remove('error');
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// ===== CONTACT ANIMATIONS =====
function initContactAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe contact elements
    const contactElements = document.querySelectorAll('.contact-item, .contact-form, .faq-item');
    contactElements.forEach(element => observer.observe(element));
}

// ===== CONTACT FORM ANALYTICS =====
function trackContactFormSubmission(formData) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            form_name: 'contact_form',
            form_id: 'contact-form'
        });
    }
    
    // Log form data (remove sensitive info in production)
    console.log('Contact form submitted:', {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        hasMessage: !!formData.message,
        newsletter: formData.newsletter === 'on'
    });
}

// ===== EMAIL VALIDATION =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== PHONE VALIDATION =====
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// ===== CONTACT METHODS =====
function initContactMethods() {
    // Add click tracking to contact methods
    const contactMethods = document.querySelectorAll('.contact-item');
    
    contactMethods.forEach(method => {
        method.addEventListener('click', function() {
            const methodType = this.querySelector('h3').textContent.toLowerCase();
            trackContactMethodClick(methodType);
        });
    });
}

function trackContactMethodClick(methodType) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'contact_method_click', {
            method_type: methodType
        });
    }
}

// ===== FAQ FUNCTIONALITY =====
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h4');
        const answer = item.querySelector('p');
        
        if (question && answer) {
            // Add click to expand functionality
            question.style.cursor = 'pointer';
            answer.style.display = 'none';
            
            question.addEventListener('click', function() {
                const isExpanded = answer.style.display === 'block';
                answer.style.display = isExpanded ? 'none' : 'block';
                question.classList.toggle('expanded');
            });
        }
    });
}

// ===== BUSINESS HOURS =====
function initBusinessHours() {
    // Add current day highlighting
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const hoursItems = document.querySelectorAll('.hours-item');
    
    hoursItems.forEach(item => {
        const day = item.querySelector('.day').textContent;
        if (day.toLowerCase() === today.toLowerCase()) {
            item.style.backgroundColor = 'var(--background-accent)';
            item.style.borderLeft = '4px solid var(--secondary-color)';
        }
    });
}

// ===== CONTACT FORM AUTO-SAVE =====
function initFormAutoSave() {
    const form = document.getElementById('contact-form');
    const storageKey = 'contact_form_draft';
    
    if (form) {
        // Load saved data on page load
        loadFormData(form, storageKey);
        
        // Save form data on input
        const formInputs = form.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                saveFormData(form, storageKey);
            });
        });
        
        // Clear saved data on successful submission
        form.addEventListener('submit', function() {
            localStorage.removeItem(storageKey);
        });
    }
}

function saveFormData(form, storageKey) {
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData);
    
    // Don't save empty forms
    if (Object.values(formObject).some(value => value)) {
        localStorage.setItem(storageKey, JSON.stringify(formObject));
    }
}

function loadFormData(form, storageKey) {
    const savedData = localStorage.getItem(storageKey);
    
    if (savedData) {
        const formData = JSON.parse(savedData);
        
        Object.keys(formData).forEach(key => {
            const field = form.querySelector(`[name="${key}"]`);
            if (field) {
                if (field.type === 'checkbox') {
                    field.checked = formData[key] === 'on';
                } else {
                    field.value = formData[key];
                }
            }
        });
    }
}

// ===== CONTACT FORM ACCESSIBILITY =====
function initFormAccessibility() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        // Add ARIA labels
        const fields = form.querySelectorAll('input, textarea, select');
        fields.forEach(field => {
            if (!field.getAttribute('aria-label') && !field.getAttribute('aria-labelledby')) {
                const label = form.querySelector(`label[for="${field.id}"]`);
                if (label) {
                    field.setAttribute('aria-labelledby', label.id);
                }
            }
        });
        
        // Add keyboard navigation
        form.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                const submitButton = form.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.click();
                }
            }
        });
    }
}

// ===== UTILITY FUNCTIONS =====

// Show notification (reuse from main.js)
function showNotification(message, type = 'info') {
    if (window.AshleyFields && window.AshleyFields.showNotification) {
        window.AshleyFields.showNotification(message, type);
    } else {
        console.log(`${type.toUpperCase()}: ${message}`);
    }
}

// Format phone number
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
}

// Export functions for global use
window.ContactPage = {
    validateForm,
    validateField,
    isValidEmail,
    isValidPhone,
    formatPhoneNumber,
    trackContactFormSubmission,
    trackContactMethodClick
}; 