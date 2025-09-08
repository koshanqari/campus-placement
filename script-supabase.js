// Form validation and submission logic with Supabase integration
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('attendanceForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Supabase configuration
    const SUPABASE_URL = 'https://wooliqsywfzqsqlsklbg.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indvb2xpcXN5d2Z6cXNxbHNrbGJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMTY3OTgsImV4cCI6MjA3Mjg5Mjc5OH0.GtK_lb2pEs8GzLl83J3L-K5_6q4tKN-8gESsnb3I6Fg';
    const TABLE_NAME = 'attendance_ppt';

    // Initialize Supabase client
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Form validation rules
    const validationRules = {
        fullName: {
            required: true,
            minLength: 2,
            message: 'Full name must be at least 2 characters long'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        mobile: {
            required: true,
            pattern: /^[6-9]\d{9}$/,
            message: 'Please enter a valid 10-digit mobile number'
        }
    };

    // Validate individual field
    function validateField(fieldName, value) {
        const rules = validationRules[fieldName];
        if (!rules) return true;

        if (rules.required && (!value || value.trim() === '')) {
            return 'This field is required';
        }

        if (value && rules.minLength && value.length < rules.minLength) {
            return rules.message;
        }

        if (value && rules.pattern && !rules.pattern.test(value)) {
            return rules.message;
        }

        return null;
    }

    // Show field error
    function showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + 'Error');
        
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    // Clear field error
    function clearFieldError(fieldName) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + 'Error');
        
        field.classList.remove('error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    // Validate entire form
    function validateForm() {
        let isValid = true;
        const formData = new FormData(form);

        // Clear all previous errors
        Object.keys(validationRules).forEach(fieldName => {
            clearFieldError(fieldName);
        });

        // Validate each field
        Object.keys(validationRules).forEach(fieldName => {
            const value = formData.get(fieldName);
            const error = validateField(fieldName, value);
            
            if (error) {
                showFieldError(fieldName, error);
                isValid = false;
            }
        });

        return isValid;
    }

    // Show success message
    function showSuccess() {
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        form.style.display = 'none';
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth' });
    }

    // Show error message
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        
        // Scroll to error message
        errorMessage.scrollIntoView({ behavior: 'smooth' });
    }

    // Real-time validation on input
    Object.keys(validationRules).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', function() {
                const value = this.value;
                const error = validateField(fieldName, value);
                
                if (error) {
                    showFieldError(fieldName, error);
                } else {
                    clearFieldError(fieldName);
                }
            });

            field.addEventListener('input', function() {
                // Clear error on input
                clearFieldError(fieldName);
            });
        }
    });

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            showError('Please correct the errors above and try again.');
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtn.textContent = '';

        // Prepare form data with hardcoded college
        const formData = new FormData(form);
        const submissionData = {
            name: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('mobile'),
            college: 'NIT Srinagar', // Hardcoded as requested
            questions: formData.get('questions') || ''
        };

        // Submit to Supabase
        try {
            console.log('Submitting data:', submissionData);
            console.log('Table name:', TABLE_NAME);
            
            const { data, error } = await supabase
                .from(TABLE_NAME)
                .insert([submissionData])
                .select();

            console.log('Supabase response:', { data, error });

            if (error) {
                throw error;
            }

            // Reset button state
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Submit Attendance';

            // Show success message
            showSuccess();
            console.log('Data inserted successfully:', data);

        } catch (error) {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Submit Attendance';

            // Handle specific errors
            if (error.code === '23505') { // Unique constraint violation
                showError('This phone number has already been registered for the event.');
            } else if (error.message.includes('duplicate key')) {
                showError('This phone number has already been registered for the event.');
            } else {
                showError('An error occurred. Please try again later.');
            }
            console.error('Error inserting data:', error);
        }
    });

    // Reset form function (for testing)
    window.resetForm = function() {
        form.reset();
        form.style.display = 'block';
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        
        // Clear all field errors
        Object.keys(validationRules).forEach(fieldName => {
            clearFieldError(fieldName);
        });
    };
});
