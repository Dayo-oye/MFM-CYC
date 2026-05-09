// ==========================================================================
// Form Handler for MFM CAASO Website
// ==========================================================================

class FormHandler {
    constructor() {
        this.forms = new Map();
        this.init();
    }
    
    init() {
        this.setupForms();
        this.setupEventListeners();
    }
    
    setupForms() {
        // Contact Form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            this.forms.set('contact', {
                element: contactForm,
                type: 'contact',
                fields: ['name', 'email', 'phone', 'subject', 'message']
            });
        }
        
        // Testimony Form
        const testimonyForm = document.getElementById('testimonyForm');
        if (testimonyForm) {
            this.forms.set('testimony', {
                element: testimonyForm,
                type: 'testimony',
                fields: ['name', 'email', 'testimony']
            });
        }
        
        // Newsletter Form
        const newsletterForms = document.querySelectorAll('.newsletter-form');
        newsletterForms.forEach((form, index) => {
            this.forms.set(`newsletter-${index}`, {
                element: form,
                type: 'newsletter',
                fields: ['email']
            });
        });
        
        // Prayer Request Form
        const prayerForm = document.getElementById('prayerForm');
        if (prayerForm) {
            this.forms.set('prayer', {
                element: prayerForm,
                type: 'prayer',
                fields: ['name', 'phone', 'request']
            });
        }
    }
    
    setupEventListeners() {
        this.forms.forEach((formData, formId) => {
            const form = formData.element;
            
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleSubmit(formData);
            });
            
            // Add input validation on blur
            form.querySelectorAll('input, textarea, select').forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
            });
        });
    }
    
    async handleSubmit(formData) {
        const { element: form, type } = formData;
        
        // Validate form
        if (!this.validateForm(form)) {
            return;
        }
        
        // Get form data
        const formDataObj = new FormData(form);
        const data = Object.fromEntries(formDataObj);
        
        // Add metadata
        data._timestamp = new Date().toISOString();
        data._page = window.location.pathname;
        data._type = type;
        
        try {
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            this.setLoadingState(submitBtn, true);
            
            // Submit to backend
            const response = await this.submitToBackend(type, data);
            
            if (response.success) {
                // Show success message
                this.showSuccessMessage(form, type);
                
                // Reset form
                form.reset();
                
                // Reset validation states
                form.querySelectorAll('.success, .error').forEach(el => {
                    el.classList.remove('success', 'error');
                });
                
                // Remove error messages
                form.querySelectorAll('.error-message').forEach(el => el.remove());
            } else {
                throw new Error(response.message || 'Submission failed');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showErrorMessage(form, error.message);
            
        } finally {
            // Reset button state
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                this.setLoadingState(submitBtn, false);
            }
        }
    }
    
    validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        const parent = field.parentElement;
        let error = '';
        
        // Clear previous states
        parent.classList.remove('error', 'success');
        const existingError = parent.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        // Check required fields
        if (field.hasAttribute('required') && !value) {
            error = 'This field is required';
        }
        
        // Email validation
        else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                error = 'Please enter a valid email address';
            }
        }
        
        // Phone validation (Nigerian format)
        else if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)\.]{7,}$/;
            if (!phoneRegex.test(value)) {
                error = 'Please enter a valid phone number';
            }
        }
        
        // URL validation
        else if (field.type === 'url' && value) {
            try {
                new URL(value);
            } catch {
                error = 'Please enter a valid URL';
            }
        }
        
        // Min length validation
        else if (field.dataset.minLength && value.length < field.dataset.minLength) {
            error = `Minimum ${field.dataset.minLength} characters required`;
        }
        
        // Max length validation
        else if (field.dataset.maxLength && value.length > field.dataset.maxLength) {
            error = `Maximum ${field.dataset.maxLength} characters allowed`;
        }
        
        // Pattern validation
        else if (field.pattern && value) {
            const regex = new RegExp(field.pattern);
            if (!regex.test(value)) {
                error = field.dataset.error || 'Please match the requested format';
            }
        }
        
        // Show error or success
        if (error) {
            parent.classList.add('error');
            this.showFieldError(parent, error);
            return false;
        } else {
            parent.classList.add('success');
            return true;
        }
    }
    
    showFieldError(parent, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        parent.appendChild(errorElement);
    }
    
    setLoadingState(button, isLoading) {
        if (isLoading) {
            button.disabled = true;
            button.dataset.originalText = button.innerHTML;
            button.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                <span>Submitting...</span>
            `;
        } else {
            button.disabled = false;
            if (button.dataset.originalText) {
                button.innerHTML = button.dataset.originalText;
                delete button.dataset.originalText;
            }
        }
    }
    
    async submitToBackend(type, data) {
        // In production, this would be a real API call
        // For demo purposes, we'll simulate API call
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure
                const isSuccess = Math.random() > 0.1; // 90% success rate
                
                if (isSuccess) {
                    resolve({
                        success: true,
                        message: this.getSuccessMessage(type),
                        data: data
                    });
                } else {
                    reject(new Error('Network error. Please try again.'));
                }
            }, 1500);
        });
    }
    
    getSuccessMessage(type) {
        const messages = {
            contact: 'Thank you for contacting us! We will get back to you soon.',
            testimony: 'Thank you for sharing your testimony! It has been submitted for review.',
            newsletter: 'Thank you for subscribing to our newsletter!',
            prayer: 'Your prayer request has been received. We will pray for you.',
            default: 'Form submitted successfully!'
        };
        
        return messages[type] || messages.default;
    }
    
    showSuccessMessage(form, type) {
        const message = this.getSuccessMessage(type);
        
        // Create success message element
        const successMsg = document.createElement('div');
        successMsg.className = 'form-success';
        successMsg.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        successMsg.style.cssText = `
            background: #10b981;
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-top: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: slideInUp 0.3s ease;
        `;
        
        // Insert after form
        form.parentNode.insertBefore(successMsg, form.nextSibling);
        
        // Remove after 5 seconds
        setTimeout(() => {
            successMsg.style.animation = 'slideInUp 0.3s ease reverse';
            setTimeout(() => successMsg.remove(), 300);
        }, 5000);
    }
    
    showErrorMessage(form, message) {
        // Create error message element
        const errorMsg = document.createElement('div');
        errorMsg.className = 'form-error';
        errorMsg.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        errorMsg.style.cssText = `
            background: #ef4444;
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-top: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: slideInUp 0.3s ease;
        `;
        
        // Insert after form
        form.parentNode.insertBefore(errorMsg, form.nextSibling);
        
        // Remove after 5 seconds
        setTimeout(() => {
            errorMsg.style.animation = 'slideInUp 0.3s ease reverse';
            setTimeout(() => errorMsg.remove(), 300);
        }, 5000);
    }
}

// ==========================================================================
// Initialize Form Handler
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    window.formHandler = new FormHandler();
});

// ==========================================================================
// Export for modules (if using ES6 modules)
// ==========================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormHandler;
}
