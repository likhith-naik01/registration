document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Clear previous errors
        document.querySelectorAll('.error').forEach(el => el.textContent = '');

        let isValid = true;

        // Validate Username
        const username = document.getElementById('username').value;
        if (username.length < 3) {
            document.getElementById('usernameError').textContent = 'Username must be at least 3 characters long.';
            isValid = false;
        }

        // Validate Email
        const email = document.getElementById('email').value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        // Validate Password
        const password = document.getElementById('password').value;
        if (password.length < 6) {
            document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long.';
            isValid = false;
        }

        // Validate Confirm Password
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
            isValid = false;
        }

        if (isValid) {
            // Send form data to the server
            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
            })
            .then(response => response.text())
            .then(message => {
                alert(message);
                form.reset();
            })
            .catch(error => {
                alert('There was an error with your registration.');
                console.error('Error:', error);
            });
        }
    });
});
