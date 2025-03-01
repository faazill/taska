// main.js

// Sample featured tasks for landing page
const featuredTasks = [
    { title: "Presentation Making", desc: "Create 10-slide PowerPoint", price: 500 },
    { title: "Content Writing", desc: "Write 500-word article", price: 400 },
    { title: "Market Research", desc: "Analyze 5 competitors", price: 600 },
    { title: "Data Entry", desc: "Enter 200 records", price: 300 }
];

// Toggle mobile menu
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Display featured tasks on landing page
function displayFeaturedTasks() {
    const tasksGrid = document.getElementById('featured-tasks');
    if (tasksGrid) {
        tasksGrid.innerHTML = '';
        featuredTasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = 'task-card';
            taskCard.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.desc}</p>
                <p>Price: ₹${task.price}</p>
                <button onclick="window.location.href='login.html'">Apply Now</button>
            `;
            tasksGrid.appendChild(taskCard);
        });
    }
}

// Add scroll effect to navbar
function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Display featured tasks
    displayFeaturedTasks();

    // Scroll listener
    window.addEventListener('scroll', handleScroll);
});