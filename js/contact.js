// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Form validation and submission
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Real-time validation
        const formFields = contactForm.querySelectorAll('input, textarea, select');
        formFields.forEach(field => {
            field.addEventListener('blur', validateField);
            field.addEventListener('input', clearFieldError);
        });
    }
    
    function validateField(event) {
        const field = event.target;
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error styling
        field.classList.remove('error');
        removeFieldError(field);
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required.';
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }
        
        // Name validation (minimum 2 characters)
        if (field.id === 'name' && value && value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long.';
        }
        
        // Message validation (minimum 10 characters)
        if (field.id === 'message' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long.';
        }
        
        // Show error if validation failed
        if (!isValid) {
            field.classList.add('error');
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        // Remove existing error message
        removeFieldError(field);
        
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
        
        // Insert error message after the field
        field.parentNode.appendChild(errorElement);
    }
    
    function removeFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function clearFieldError(event) {
        const field = event.target;
        field.classList.remove('error');
        removeFieldError(field);
    }
    
    function handleFormSubmission(event) {
        event.preventDefault();
        
        const form = event.target;
        const submitButton = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);
        
        // Validate all fields
        const fields = form.querySelectorAll('input, textarea, select');
        let isFormValid = true;
        
        fields.forEach(field => {
            if (!validateField({ target: field })) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            showNotification('Please correct the errors in the form.', 'error');
            return;
        }
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        submitButton.classList.add('loading');
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            // Success response
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            form.reset();
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
            submitButton.classList.remove('loading');
            
            // Track form submission (if analytics is set up)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'Contact',
                    'event_label': 'Contact Form'
                });
            }
        }, 2000);
    }
    
    // Contact information interactions
    function initializeContactInfo() {
        const contactLinks = document.querySelectorAll('.contact-info a[href^="mailto:"], .contact-info a[href^="tel:"]');
        
        contactLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Track contact link clicks
                const linkType = this.href.startsWith('mailto:') ? 'email' : 'phone';
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        'event_category': 'Contact',
                        'event_label': `${linkType}_click`
                    });
                }
            });
        });
    }
    
    // FAQ accordion functionality
    function initializeFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('h3');
            const answer = item.querySelector('p');
            
            if (question && answer) {
                // Add click functionality
                question.addEventListener('click', function() {
                    const isOpen = item.classList.contains('open');
                    
                    // Close all other FAQ items
                    faqItems.forEach(otherItem => {
                        otherItem.classList.remove('open');
                    });
                    
                    // Toggle current item
                    if (!isOpen) {
                        item.classList.add('open');
                    }
                });
                
                // Add keyboard support
                question.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
                
                // Make question focusable
                question.setAttribute('tabindex', '0');
                question.setAttribute('role', 'button');
                question.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Map functionality (if needed)
    function initializeMap() {
        const mapContainer = document.querySelector('.map-container');
        
        if (mapContainer) {
            // This would integrate with Google Maps or another mapping service
            console.log('Map container found - ready for integration');
        }
    }
    
    // Initialize all functionality
    initializeContactInfo();
    initializeFAQ();
    initializeMap();
    
    // Add CSS for contact page functionality
    const contactStyles = `
        .field-error {
            color: #e74c3c;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            animation: fadeIn 0.3s ease;
        }
        
        .form-group input.error,
        .form-group textarea.error,
        .form-group select.error {
            border-color: #e74c3c;
            box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
        }
        
        .btn.loading {
            position: relative;
            color: transparent;
        }
        
        .btn.loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 16px;
            height: 16px;
            margin: -8px 0 0 -8px;
            border: 2px solid transparent;
            border-top-color: currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        .faq-item h3 {
            cursor: pointer;
            position: relative;
            padding-right: 2rem;
            transition: color 0.3s ease;
        }
        
        .faq-item h3:hover {
            color: var(--primary-color);
        }
        
        .faq-item h3::after {
            content: '+';
            position: absolute;
            right: 0;
            top: 0;
            font-size: 1.5rem;
            font-weight: 400;
            transition: transform 0.3s ease;
        }
        
        .faq-item.open h3::after {
            transform: rotate(45deg);
        }
        
        .faq-item p {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease, padding 0.3s ease;
            padding-top: 0;
            padding-bottom: 0;
        }
        
        .faq-item.open p {
            max-height: 200px;
            padding-top: 1rem;
            padding-bottom: 1rem;
        }
        
        .info-item {
            transition: transform 0.3s ease;
        }
        
        .info-item:hover {
            transform: translateY(-2px);
        }
        
        .info-icon {
            transition: transform 0.3s ease;
        }
        
        .info-item:hover .info-icon {
            transform: scale(1.1);
        }
        
        .hours-grid {
            display: grid;
            gap: 1rem;
            margin: 1.5rem 0;
        }
        
        .day-hours {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem;
            background-color: var(--background-light);
            border-radius: var(--radius-md);
        }
        
        .day {
            font-weight: 600;
            color: var(--text-dark);
        }
        
        .hours {
            color: var(--text-light);
        }
        
        .hours-note {
            font-size: 0.875rem;
            color: var(--text-light);
            font-style: italic;
            margin-top: 1rem;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
            .day-hours {
                flex-direction: column;
                align-items: flex-start;
                gap: 0.5rem;
            }
            
            .faq-item h3 {
                font-size: 1.1rem;
            }
        }
    `;
    
    // Inject contact-specific styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = contactStyles;
    document.head.appendChild(styleSheet);
});

// Notification system (if not already defined in main.js)
if (typeof showNotification === 'undefined') {
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.className = 'notification-close';
        closeBtn.setAttribute('aria-label', 'Close notification');
        notification.appendChild(closeBtn);
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);
        
        // Close button functionality
        closeBtn.addEventListener('click', () => {
            hideNotification(notification);
        });
    }
    
    function hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
} 