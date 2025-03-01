// Sample task data
let tasks = [
    { id: 1, title: "Presentation Making", desc: "Create 10-slide PowerPoint", price: 500 },
    { id: 2, title: "Content Writing", desc: "Write 500-word article", price: 400 }
];

// Featured jobs for home page
const featuredJobs = [
    { title: "Presentation Making", desc: "Create 10-slide PowerPoint", price: 500 },
    { title: "Content Writing", desc: "Write 500-word article", price: 400 },
    { title: "Market Research", desc: "Analyze 5 competitors", price: 600 },
    { title: "Data Entry", desc: "Enter 200 records", price: 300 },
    { title: "Graphic Design", desc: "Design social media post", price: 450 },
    { title: "Proofreading", desc: "Check 1000-word document", price: 350 },
    { title: "Video Editing", desc: "Edit 5-min video", price: 800 },
    { title: "Web Research", desc: "Find 50 leads", price: 550 },
    { title: "Translation", desc: "Translate 500 words", price: 400 },
    { title: "Social Media Management", desc: "Create 5 posts", price: 450 },
    { title: "Excel Work", desc: "Create spreadsheet formulas", price: 500 },
    { title: "Voice Over", desc: "Record 2-min script", price: 600 }
];

let user = {
    name: "Student/Professional",
    completedTasks: 0,
    earnings: 0
};

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function displayFeaturedJobs() {
    const jobsGrid = document.getElementById('featured-jobs');
    featuredJobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.desc}</p>
            <p>Price: ₹${job.price}</p>
            <button onclick="showSection('tasks')">Apply Now</button>
        `;
        jobsGrid.appendChild(jobCard);
    });
}

function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = 'job-card';
        taskCard.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.desc}</p>
            <p>Price: ₹${task.price}</p>
            <button onclick="completeTask(${task.id})">Accept Task</button>
        `;
        taskList.appendChild(taskCard);
    });
}

document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const newTask = {
        id: tasks.length + 1,
        title: document.getElementById('task-title').value,
        desc: document.getElementById('task-desc').value,
        price: parseInt(document.getElementById('task-price').value)
    };
    tasks.push(newTask);
    displayTasks();
    this.reset();
});

function completeTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        user.completedTasks++;
        user.earnings += task.price;
        tasks = tasks.filter(t => t.id !== taskId);
        updateProfile();
        displayTasks();
    }
}

function updateProfile() {
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('completed-tasks').textContent = user.completedTasks;
    document.getElementById('earnings').textContent = user.earnings;
}

document.addEventListener('DOMContentLoaded', () => {
    displayTasks();
    displayFeaturedJobs();
    updateProfile();
    showSection('home');
});