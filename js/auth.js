// js/auth.js
import { auth, database } from './firebase-config.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { ref, set } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

// Show form based on role selection
export function showForm(userType) {
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
}

// Popup message function using existing auth-popup
function showPopup(message) {
    const popup = document.getElementById('auth-error-popup') || document.createElement('div');
    if (!popup.id) {
        popup.id = 'auth-error-popup';
        popup.className = 'auth-popup';
        document.body.appendChild(popup);
    }
    popup.textContent = message;
    popup.classList.add('active');
    setTimeout(() => {
        popup.classList.remove('active');
    }, 3000); // Remove after 3 seconds
}

// Login function
export function login(userType) {
    const email = document.getElementById(userType === 'professional' ? 'prof-email' : 'stud-email').value;
    const password = document.getElementById(userType === 'professional' ? 'prof-password' : 'stud-password').value;

    setPersistence(auth, browserLocalPersistence)
        .then(() => {
            return signInWithEmailAndPassword(auth, email, password);
        })
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(`${userType} logged in: ${user.email}, UID: ${user.uid}`);
            localStorage.setItem('userId', user.uid); // Store UID in localStorage
            localStorage.setItem('userRole', userType); // Store role
            console.log("Stored userId in localStorage:", user.uid); // Debug
            console.log("Stored userRole in localStorage:", userType); // Debug
            window.location.href = userType === 'professional' ? 'professional/overview.html' : 'workplace/overview.html';
        })
        .catch((error) => {
            console.debug("Login error:", error.code, error.message); // Silent logging for debugging
            // Handle all relevant auth errors with custom popup
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                showPopup("No account found! Sign up first to join Taska Elite.");
            } else {
                showPopup("Something went wrong. Try again!");
            }
        });
}

// Signup function
export function signup(userType) {
    const email = document.getElementById(userType === 'professional' ? 'prof-email' : 'stud-email').value;
    const password = document.getElementById(userType === 'professional' ? 'prof-password' : 'stud-password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(`${userType} signed up: ${user.email}, UID: ${user.uid}`);
            localStorage.setItem('userId', user.uid); // Store UID in localStorage
            localStorage.setItem('userRole', userType); // Store role
            console.log("Stored userId in localStorage:", user.uid); // Debug
            console.log("Stored userRole in localStorage:", userType); // Debug

            // Determine list name
                const list = userType === 'professional' ? 'professionalslist' : 'studentslist';

                // Determine path based on userType
                const path = userType === 'professional' 
                    ? `${list}/${user.uid}` 
                    : `${list}/${user.uid}/personal`;

                const userRef = ref(database, path);

                // Set initial data accordingly
                const initialData = userType === 'professional'
                    ? {
                        email: user.email,
                        coins: 500,         // Default for professionals
                        isHiring: true      // Default for professionals
                    }
                    : {
                        email: user.email   // Default field for students in 'personal'
                    };

            set(userRef, initialData)
                .then(() => {
                    console.log("Initial data stored in database for UID:", user.uid, initialData);
                    window.location.href = userType === 'professional' ? 'professional/update-profile.html' : 'workplace/update-profile.html';
                })
                .catch((error) => {
                    console.debug("Error storing initial data:", error);
                    showPopup("Signup succeeded, but failed to store data. Try again!");
                });
        })
        .catch((error) => {
            console.debug("Signup error:", error.code, error.message);
            showPopup("Signup failed. Try again!");
        });
}

// Logout function
export function signOut() {
    auth.signOut()
        .then(() => {
            console.log("User signed out, clearing localStorage");
            localStorage.removeItem('userId'); // Clear UID
            localStorage.removeItem('userRole'); // Clear role
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.debug("Logout error:", error);
            showPopup("Logout failed. Try again!");
        });
}

// Check auth state and sync persistent value
auth.onAuthStateChanged((user) => {
    if (user) {
        const storedUserId = localStorage.getItem('userId');
        if (!storedUserId || storedUserId !== user.uid) {
            localStorage.setItem('userId', user.uid);
            localStorage.setItem('userRole', window.location.href.includes('professional') ? 'professional' : 'student');
            console.log("Auth state changed, updated userId:", user.uid);
            console.log("Auth state changed, updated userRole:", localStorage.getItem('userRole'));
        }
        console.log(`User logged in: ${user.email}, UID: ${user.uid}`);
    } else {
        console.log('No user logged in');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
    }
});

// Function to get the user ID
export function getUserId() {
    return localStorage.getItem('userId');
}

// Function to get the user role
export function getUserRole() {
    return localStorage.getItem('userRole');
}