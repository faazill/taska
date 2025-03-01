// student.js

// Simulated task and application data (replace with backend later)
let availableTasks = [
    { id: 1, title: "Presentation Making", desc: "Create 10 slides", price: 500, deadline: "2025-03-10" }
];
let applications = [
    { taskId: 1, status: "Pending" }
];
let user = {
    earnings: 0
};

// Display available tasks
function displayTaskBrowser() {
    const taskBrowser = document.getElementById('task-browser');
    if (taskBrowser) {
        taskBrowser.innerHTML = '';
        availableTasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task-item';
            taskDiv.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.desc}</p>
                <p>Price: ₹${task.price} | Deadline: ${task.deadline}</p>
                <button onclick="applyForTask(${task.id})">Apply</button>
            `;
            taskBrowser.appendChild(taskDiv);
        });
    }
}

// Display application status
function displayApplicationStatus() {
    const applicationStatus = document.getElementById('application-status');
    if (applicationStatus) {
        applicationStatus.innerHTML = '';
        applications.forEach(app => {
            const appDiv = document.createElement('div');
            appDiv.className = 'app-item';
            appDiv.innerHTML = `
                <p>Task ID: ${app.taskId}</p>
                <p>Status: ${app.status}</p>
            `;
            applicationStatus.appendChild(appDiv);
        });
    }
}

// Update earnings
function updateEarnings() {
    const earningsSpan = document.getElementById('earnings');
    if (earningsSpan) {
        earningsSpan.textContent = user.earnings;
    }
}

// Handle task application
function applyForTask(taskId) {
    const newApplication = { taskId, status: "Pending" };
    applications.push(newApplication);
    displayApplicationStatus();
    alert(`Applied for task ${taskId}!`);
}

// Initialize student dashboard
document.addEventListener('DOMContentLoaded', () => {
    displayTaskBrowser();
    displayApplicationStatus();
    updateEarnings();
});