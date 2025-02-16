        // Wait for DOM to be fully loaded before running scripts
        document.addEventListener('DOMContentLoaded', function() {
            // Mobile menu functionality
            const menuBtn = document.getElementById('menuBtn');
            const navLinks = document.getElementById('navLinks');

            // Toggle mobile menu on button click
            menuBtn.addEventListener('click', function() {
                navLinks.classList.toggle('active');
            });

            // Form validation and submission handling
            const contactForm = document.getElementById('contactForm');
            const successMessage = document.getElementById('successMessage');

            /**
             * Validates email format using regex
             * @param {string} email - Email address to validate
             * @returns {boolean} - True if email is valid
             */
            function validateEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            }

            /**
             * Shows error message for a form field
             * @param {HTMLElement} field - Form field element
             * @param {string} message - Error message to display
             */
            function showError(field, message) {
                field.classList.add('error');
                const errorDiv = document.getElementById(field.id + 'Error');
                if (errorDiv) {
                    errorDiv.style.display = 'block';
                    errorDiv.textContent = message;
                }
            }

            /**
             * Clears error message for a form field
             * @param {HTMLElement} field - Form field element
             */
            function clearError(field) {
                field.classList.remove('error');
                const errorDiv = document.getElementById(field.id + 'Error');
                if (errorDiv) {
                    errorDiv.style.display = 'none';
                }
            }

            // Form submission handler
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                let isValid = true;

                // Clear all previous errors
                document.querySelectorAll('.error-message').forEach(error => {
                    error.style.display = 'none';
                });
                document.querySelectorAll('.form-control').forEach(field => {
                    field.classList.remove('error');
                });

                // Validate each required field
                // Name validation
                const name = document.getElementById('name');
                if (!name.value.trim()) {
                    showError(name, 'Please enter your name');
                    isValid = false;
                }

                // Email validation
                const email = document.getElementById('email');
                if (!email.value.trim() || !validateEmail(email.value)) {
                    showError(email, 'Please enter a valid email address');
                    isValid = false;
                }

                // Message validation
                const message = document.getElementById('message');
                if (!message.value.trim()) {
                    showError(message, 'Please enter your message');
                    isValid = false;
                }

                // If form is valid, show success message and reset form
                if (isValid) {
                    successMessage.style.display = 'block';
                    contactForm.reset();

                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                }
            });

            // Clear errors when user starts typing
            document.querySelectorAll('.form-control').forEach(field => {
                field.addEventListener('input', function() {
                    clearError(this);
                });
            });
        });