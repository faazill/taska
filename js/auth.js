// auth.js

// Simulated user database (replace with real backend later)
const users = {
    professionals: [],
    students: []
};

// Handle login form submission
function handleLogin(event, userType) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    // Simulated login logic
    console.log(`Logging in ${userType}:`, { email, password });

    // Redirect based on user type (replace with real authentication)
    if (userType === 'professional') {
        window.location.href = 'professional.html';
    } else if (userType === 'student') {
        window.location.href = 'student.html';
    }
}

// Initialize login page
document.addEventListener('DOMContentLoaded', () => {
    const professionalForm = document.getElementById('professional-login');
    const studentForm = document.getElementById('student-login');

    if (professionalForm) {
        professionalForm.addEventListener('submit', (e) => handleLogin(e, 'professional'));
    }

    if (studentForm) {
        studentForm.addEventListener('submit', (e) => handleLogin(e, 'student'));
    }
});