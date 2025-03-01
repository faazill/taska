// js/auth.js
import { auth, database } from './firebase-config.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { ref, set } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

// Show form based on role selection
window.showForm = function(userType) {
    const roleSelection = document.getElementById('role-selection');
    const profForm = document.getElementById('professional-form');
    const studForm = document.getElementById('student-form');

    roleSelection.style.display = 'none';
    if (userType === 'professional') {
        profForm.style.display = 'block';
        studForm.style.display = 'none';
    } else {
        studForm.style.display = 'block';
        profForm.style.display = 'none';
    }
};

// Login function
window.login = function(userType) {
    const email = document.getElementById(userType === 'professional' ? 'prof-email' : 'stud-email').value;
    const password = document.getElementById(userType === 'professional' ? 'prof-password' : 'stud-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(`${userType} logged in: ${userCredential.user.email}`);
            window.location.href = userType === 'professional' ? 'professional.html' : 'student.html';
        })
        .catch((error) => {
            alert(`Login failed: ${error.message}`);
        });
};

// Signup function
window.signup = function(userType) {
    const email = document.getElementById(userType === 'professional' ? 'prof-email' : 'stud-email').value;
    const password = document.getElementById(userType === 'professional' ? 'prof-password' : 'stud-password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            set(ref(database, 'users/' + user.uid), {
                email: user.email,
                userType: userType,
                createdAt: Date.now()
            });
            console.log(`${userType} signed up: ${user.email}`);
            window.location.href = userType === 'professional' ? 'professional.html' : 'student.html';
        })
        .catch((error) => {
            alert(`Signup failed: ${error.message}`);
        });
};

// Logout function
window.signOut = function() {
    auth.signOut()
        .then(() => {
            window.location.href = 'login.html';
        })
        .catch((error) => {
            alert(`Logout failed: ${error.message}`);
        });
};

// Check auth state
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log(`User logged in: ${user.email}`);
    } else {
        console.log('No user logged in');
    }
});