document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    const messageElement = document.getElementById('message');
    
    // Clear previous messages
    messageElement.textContent = '';
    
    if (password !== confirmPassword) {
        messageElement.textContent = 'Passwords do not match!';
        return;
    }
    
    // Simple validation passed, form can be processed here
    messageElement.textContent = 'Registration successful!';
    messageElement.style.color = 'green';

    // Optionally, you can handle form data here, like sending it to a server
});
