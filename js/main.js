// main.js

// Sample task data (12 tasks)
const allTasks = [
    { title: "Logo Design", desc: "Create a sleek logo", price: 800, category: "design", posted: "2 days ago" },
    { title: "Blog Post", desc: "Write 500 words", price: 400, category: "writing", posted: "3 days ago" },
    { title: "Market Research", desc: "Analyze 5 competitors", price: 600, category: "research", posted: "1 day ago" },
    { title: "Data Entry", desc: "Enter 200 records", price: 300, category: "data", posted: "4 days ago" },
    { title: "Website Fix", desc: "Debug a webpage", price: 1000, category: "tech", posted: "5 days ago" },
    { title: "Poster Design", desc: "Design a poster", price: 700, category: "design", posted: "6 days ago" },
    { title: "SEO Audit", desc: "Optimize a site", price: 900, category: "marketing", posted: "2 days ago" },
    { title: "Code Review", desc: "Check 100 lines", price: 500, category: "tech", posted: "3 days ago" },
    { title: "Article Edit", desc: "Polish 1000 words", price: 350, category: "writing", posted: "1 day ago" },
    { title: "Survey Analysis", desc: "Process 50 responses", price: 450, category: "research", posted: "4 days ago" },
    { title: "UI Design", desc: "Design app interface", price: 850, category: "design", posted: "5 days ago" },
    { title: "Social Media Post", desc: "Create 3 posts", price: 400, category: "marketing", posted: "2 days ago" }
];

// Pagination variables
let currentPage = 1;
const tasksPerPage = 6;

// Toggle mobile menu
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Display tasks
function displayTasks(containerId, tasks, page = 1) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = '';
        const start = (page - 1) * tasksPerPage;
        const end = start + tasksPerPage;
        const paginatedTasks = tasks.slice(start, end);

        paginatedTasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = 'task-card';
            taskCard.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.desc}</p>
                <p>Price: ₹${task.price} • Posted: ${task.posted}</p>
                <button onclick="window.location.href='login.html'">Apply</button>
            `;
            container.appendChild(taskCard);
        });
    }
    updatePagination();
}

// Filter tasks
window.filterTasks = function() {
    const searchValue = document.getElementById('search-input').value.toLowerCase();
    const categoryValue = document.getElementById('category-filter').value;

    const filteredTasks = allTasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchValue) || task.desc.toLowerCase().includes(searchValue);
        const matchesCategory = categoryValue === 'all' || task.category === categoryValue;
        return matchesSearch && matchesCategory;
    });

    currentPage = 1;
    displayTasks('tasks-grid', filteredTasks, currentPage);
};

// Pagination
function updatePagination() {
    const totalPages = Math.ceil(allTasks.length / tasksPerPage);
    document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;
}

window.prevPage = function() {
    if (currentPage > 1) {
        currentPage--;
        displayTasks('tasks-grid', allTasks, currentPage);
    }
};

window.nextPage = function() {
    const totalPages = Math.ceil(allTasks.length / tasksPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayTasks('tasks-grid', allTasks, currentPage);
    }
};

// Number counting
function countUp(elementId, target) {
    let count = 0;
    const element = document.getElementById(elementId);
    const increment = target / 100;
    const interval = setInterval(() => {
        count += increment;
        if (count >= target) {
            count = target;
            clearInterval(interval);
        }
        element.textContent = Math.round(count);
    }, 20);
}

// Feedback swapping
let currentFeedback = 0;
function showFeedback(index) {
    const items = document.querySelectorAll('.feedback-item');
    items.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

window.nextFeedback = function() {
    const items = document.querySelectorAll('.feedback-item');
    currentFeedback = (currentFeedback + 1) % items.length;
    showFeedback(currentFeedback);
};

window.prevFeedback = function() {
    const items = document.querySelectorAll('.feedback-item');
    currentFeedback = (currentFeedback - 1 + items.length) % items.length;
    showFeedback(currentFeedback);
};

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) hamburger.addEventListener('click', toggleMenu);

    displayTasks('tasks-grid', allTasks, currentPage);

    // Start number counting
    countUp('tasks-count', 1200);
    countUp('users-count', 650);
    countUp('earnings-count', 75000);

    // Show initial feedback
    showFeedback(0);
});