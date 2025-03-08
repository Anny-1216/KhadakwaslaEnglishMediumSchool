document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const formFields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };

    // Add loading state to button
    function setLoading(isLoading) {
        if (isLoading) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message';
        }
    }

    // Show notification
    function showNotification(message, isError = false) {
        const notification = document.createElement('div');
        notification.className = `notification ${isError ? 'error' : 'success'}`;
        notification.textContent = message;
        
        // Remove any existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Insert notification before the form
        contactForm.parentNode.insertBefore(notification, contactForm);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // Validate form fields
    function validateForm() {
        // Name validation
        if (formFields.name.value.trim().length < 2) {
            showNotification('Please enter a valid name (at least 2 characters)', true);
            formFields.name.focus();
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formFields.email.value)) {
            showNotification('Please enter a valid email address', true);
            formFields.email.focus();
            return false;
        }

        // Phone validation
        const phoneRegex = /^\d{10}$/;
        const phoneNumber = formFields.phone.value.replace(/[^0-9]/g, '');
        if (!phoneRegex.test(phoneNumber)) {
            showNotification('Please enter a valid 10-digit phone number', true);
            formFields.phone.focus();
            return false;
        }

        // Subject validation
        if (!formFields.subject.value) {
            showNotification('Please select a subject', true);
            formFields.subject.focus();
            return false;
        }

        // Message validation
        if (formFields.message.value.trim().length < 10) {
            showNotification('Please enter a message (at least 10 characters)', true);
            formFields.message.focus();
            return false;
        }

        return true;
    }
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        
        // Get form data
        const formData = {
            name: formFields.name.value.trim(),
            email: formFields.email.value.trim(),
            phone: formFields.phone.value.replace(/[^0-9]/g, ''),
            subject: formFields.subject.value,
            message: formFields.message.value.trim()
        };

        try {
            // First check if server is running
            const healthCheck = await fetch('/health');
            if (!healthCheck.ok) {
                throw new Error('Server is not responding');
            }

            // Send data to server
            const response = await fetch('/save-contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                showNotification('Thank you for your message. We will get back to you soon!');
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Failed to submit form');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification(
                'Sorry, there was an error submitting your message. Please try again later.',
                true
            );
        } finally {
            setLoading(false);
        }
    });

    // Add some CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
            font-weight: 500;
        }
        .notification.success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .notification.error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
    `;
    document.head.appendChild(style);
}); 