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
            console.log(`${userType} logged in: ${user.email}, UID: ${user.uid}`);
            localStorage.setItem('userId', user.uid); // Store UID in localStorage
            localStorage.setItem('userRole', userType); // Store role
            console.log("Stored userId in localStorage:", user.uid); // Debug
            console.log("Stored userRole in localStorage:", userType); // Debug
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
            console.log(`${userType} signed up: ${user.email}, UID: ${user.uid}`);
            localStorage.setItem('userId', user.uid); // Store UID in localStorage
            localStorage.setItem('userRole', userType); // Store role
            console.log("Stored userId in localStorage:", user.uid); // Debug
            console.log("Stored userRole in localStorage:", userType); // Debug

            // Store initial data in Realtime Database under professionalslist or studentslist with UID
            const list = userType === 'professional' ? 'professionalslist' : 'studentslist';
            const userRef = ref(database, `${list}/${user.uid}`);
            const initialData = {
                email: user.email,
                name: '',
                location: '',
                profession: '',
                company: '',
                experience: '',
                skills: '',
                education: '',
                bio: '',
                hobbies: '',
                coins: 500, // Default for professionals; adjust for students if needed
                isHiring: true // Default for professionals
            };

            set(userRef, initialData)
                .then(() => {
                    console.log("Initial data stored in database for UID:", user.uid, initialData);
                    window.location.href = userType === 'professional' ? 'professional/update-profile.html' : 'workplace/update-profile.html';
                })
                .catch((error) => {
                    console.error("Error storing initial data:", error);
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
            console.log("User signed out, clearing localStorage");
            localStorage.removeItem('userId'); // Clear UID
            localStorage.removeItem('userRole'); // Clear role
            window.location.href = 'login.html';
        })
        .catch((error) => {
            alert(`Logout failed: ${error.message}`);
        });
};

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
window.getUserId = function() {
    return localStorage.getItem('userId');
};

// Function to get the user role
window.getUserRole = function() {
    return localStorage.getItem('userRole');
};