// js/auth.js
import { auth, database } from './firebase-config.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { ref, set } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

// Login function
window.login = function(userType) {
    const email = document.getElementById(userType === 'professional' ? 'prof-email' : 'stud-email').value;
    const password = document.getElementById(userType === 'professional' ? 'prof-password' : 'stud-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(`${userType} logged in: ${user.email}`);
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
            // Store user type in Realtime Database
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

// Check auth state on page load
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log(`User logged in: ${user.email}`);
    } else {
        console.log('No user logged in');
    }
});

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