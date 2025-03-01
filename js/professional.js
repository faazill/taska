// professional.js

// Simulated task and student data (replace with backend later)
let tasks = [
    { id: 1, title: "Presentation Making", desc: "Create 10 slides", price: 500, deadline: "2025-03-10", status: "open" }
];
let students = [
    { id: 1, name: "Aarav Sharma", skills: ["Presentation", "Writing"], rating: 4.5 }
];

// Display active tasks
function displayActiveTasks() {
    const activeTasks = document.getElementById('active-tasks');
    if (activeTasks) {
        activeTasks.innerHTML = '';
        tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task-item';
            taskDiv.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.desc}</p>
                <p>Price: ₹${task.price} | Deadline: ${task.deadline}</p>
                <p>Status: ${task.status}</p>
                <button onclick="viewApplications(${task.id})">View Applications</button>
            `;
            activeTasks.appendChild(taskDiv);
        });
    }
}

// Display student browser
function displayStudentBrowser() {
    const studentBrowser = document.getElementById('student-browser');
    if (studentBrowser) {
        studentBrowser.innerHTML = '';
        students.forEach(student => {
            const studentDiv = document.createElement('div');
            studentDiv.className = 'student-item';
            studentDiv.innerHTML = `
                <h3>${student.name}</h3>
                <p>Skills: ${student.skills.join(', ')}</p>
                <p>Rating: ${student.rating}/5</p>
                <button onclick="inviteStudent(${student.id})">Invite</button>
            `;
            studentBrowser.appendChild(studentDiv);
        });
    }
}

// Handle task posting
function handleTaskPost(event) {
    event.preventDefault();
    const form = event.target;
    const newTask = {
        id: tasks.length + 1,
        title: form.querySelector('input[type="text"]').value,
        desc: form.querySelector('textarea').value,
        price: parseInt(form.querySelector('input[type="number"]').value),
        deadline: form.querySelector('input[type="date"]').value,
        status: "open"
    };
    tasks.push(newTask);
    displayActiveTasks();
    form.reset();
    alert('Task posted successfully!');
}

// Placeholder functions
function viewApplications(taskId) {
    alert(`Viewing applications for task ${taskId} (TBD)`);
}

function inviteStudent(studentId) {
    alert(`Inviting student ${studentId} (TBD)`);
}

// Initialize professional dashboard
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    if (taskForm) {
        taskForm.addEventListener('submit', handleTaskPost);
    }
    displayActiveTasks();
    displayStudentBrowser();
});