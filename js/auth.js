// js/auth.js
import { auth, database } from './firebase-config.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
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

// Popup message function
function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'auth-popup';
    popup.innerHTML = `<p>${message}</p>`;
    document.body.appendChild(popup);
    setTimeout(() => {
        popup.remove();
    }, 3000); // Remove after 3 seconds
}

// Login function
window.login = function(userType) {
    const email = document.getElementById(userType === 'professional' ? 'prof-email' : 'stud-email').value;
    const password = document.getElementById(userType === 'professional' ? 'prof-password' : 'stud-password').value;

    setPersistence(auth, browserLocalPersistence)
        .then(() => {
            return signInWithEmailAndPassword(auth, email, password);
        })
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(`${userType} logged in: ${user.email}`);
            localStorage.setItem('userEmail', user.email); // Store email locally
            window.location.href = userType === 'professional' ? 'professional/overview.html' : 'workplace/overview.html';
        })
        .catch((error) => {
            console.error("Login error:", error.code, error.message);
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                showPopup("No account found. Sign up first.");
            } else {
                alert(`Login failed: ${error.message}`);
            }
        });
};

// Signup function
window.signup = function(userType) {
    const email = document.getElementById(userType === 'professional' ? 'prof-email' : 'stud-email').value;
    const password = document.getElementById(userType === 'professional' ? 'prof-password' : 'stud-password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(`${userType} signed up: ${user.email}`);
            localStorage.setItem('userEmail', user.email); // Store email locally

            // Store in Realtime Database under professionalslist or studentslist
            const list = userType === 'professional' ? 'professionalslist' : 'studentslist';
            const userRef = ref(database, `${list}/${user.uid}`);
            set(userRef, {
                email: user.email
            })
            .then(() => {
                console.log("User email stored in database");
                window.location.href = userType === 'professional' ? 'professional/update-profile.html' : 'workplace/update-profile.html';
            })
            .catch((error) => {
                console.error("Error storing user data:", error);
                alert("Signup succeeded, but failed to store data: " + error.message);
            });
        })
        .catch((error) => {
            console.error("Signup error:", error.code, error.message);
            alert(`Signup failed: ${error.message}`);
        });
};

// Logout function
window.signOut = function() {
    auth.signOut()
        .then(() => {
            localStorage.removeItem('userEmail'); // Clear local storage on logout
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