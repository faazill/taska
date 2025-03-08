// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    window.toggleDarkMode = function() {
        document.body.classList.toggle('dark-mode');
        document.querySelector('.navbar').classList.toggle('dark-mode');
        document.querySelectorAll('.cta-button').forEach(btn => btn.classList.toggle('dark-mode'));
        document.querySelectorAll('.search-filter').forEach(section => section.classList.toggle('dark-mode'));
        document.querySelectorAll('.task-grid-section').forEach(section => section.classList.toggle('dark-mode'));
        document.querySelectorAll('.number-summary').forEach(section => section.classList.toggle('dark-mode'));
        document.querySelectorAll('.how-tasks-work').forEach(section => section.classList.toggle('dark-mode'));
        document.querySelectorAll('.user-feedback').forEach(section => section.classList.toggle('dark-mode'));
        document.querySelectorAll('.call-to-action').forEach(section => section.classList.toggle('dark-mode'));
        document.querySelectorAll('.nav-menu a').forEach(link => link.classList.toggle('dark-mode'));
        document.querySelectorAll('#search-input, .custom-dropdown').forEach(input => input.classList.toggle('dark-mode'));
        document.querySelectorAll('.student-card').forEach(card => card.classList.toggle('dark-mode'));
        document.querySelectorAll('.feedback-item').forEach(item => item.classList.toggle('dark-mode'));
        document.querySelectorAll('.feedback-nav button').forEach(btn => btn.classList.toggle('dark-mode'));
        document.querySelector('footer').classList.toggle('dark-mode');
        document.querySelector('.dark-mode-toggle').classList.toggle('dark-mode');
        document.querySelector('.privacy-policy').classList.toggle('dark-mode');
    };

    // Animated Headline
    const headlineWords = document.querySelectorAll('.hero h1 span');
    headlineWords.forEach((word, index) => {
        word.style.animation = `fadeInDown 1s ease forwards ${index * 0.2 + 0.1}s`;
    });

    // Counter Animations
    const counters = document.querySelectorAll('.summary-item span[data-target]');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/[^0-9]/g, '');
            const speed = 200;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });

    // Feedback Slider
    let currentFeedback = 0;
    const feedbackItems = document.querySelectorAll('.feedback-item');
    const totalFeedback = feedbackItems.length;

    function updateFeedback() {
        feedbackItems.forEach(item => item.classList.remove('active'));
        feedbackItems[currentFeedback].classList.add('active');
    }

    window.prevFeedback = () => {
        currentFeedback = (currentFeedback - 1 + totalFeedback) % totalFeedback;
        updateFeedback();
    };

    window.nextFeedback = () => {
        currentFeedback = (currentFeedback + 1) % totalFeedback;
        updateFeedback();
    };

    // Pagination
    let currentPage = 1;
    let totalPages = 2;
    const pageInfo = document.getElementById('page-info');

    function updatePagination() {
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }

    window.prevPage = () => {
        if (currentPage > 1) {
            currentPage--;
            updateStudents();
            updatePagination();
        }
    };

    window.nextPage = () => {
        if (currentPage < totalPages) {
            currentPage++;
            updateStudents();
            updatePagination();
        }
    };

    // Student Filtering with Animation
    window.filterStudents = () => {
        const searchInput = document.getElementById('search-input').value.toLowerCase();
        const categoryFilter = document.getElementById('category-filter').value.toLowerCase();
        const studentsGrid = document.getElementById('students-grid');
        studentsGrid.innerHTML = '';

        const students = [
            { name: 'Arjun Sharma', college: 'IIT Bombay', department: 'Computer Science', skills: ['Coding', 'Data Analysis'], experience: '2 years in tech projects', rating: 4.2 },
            { name: 'Neha Patel', college: 'NIT Trichy', department: 'Electrical Engineering', skills: ['Design', 'Research'], experience: '1.5 years in design', rating: 3.8 },
            { name: 'Ravi Kumar', college: 'IIT Delhi', department: 'Mechanical Engineering', skills: ['Research', 'Technology'], experience: '1 year in robotics', rating: 4.0 },
            { name: 'Priya Singh', college: 'IIT Madras', department: 'Civil Engineering', skills: ['Design', 'Data Analysis'], experience: '2 years in infrastructure projects', rating: 4.5 },
            { name: 'Amit Verma', college: 'IIT Kharagpur', department: 'Chemical Engineering', skills: ['Research', 'Content Creation'], experience: '1.5 years in lab research', rating: 3.9 },
            { name: 'Sneha Gupta', college: 'IIT Kanpur', department: 'Aerospace Engineering', skills: ['Coding', 'Technology'], experience: '2 years in drone projects', rating: 4.3 },
            { name: 'Karan Mehra', college: 'IIT Roorkee', department: 'Electrical Engineering', skills: ['Design', 'Coding'], experience: '1 year in circuit design', rating: 4.1 },
            { name: 'Ananya Das', college: 'IIT Guwahati', department: 'Biotechnology', skills: ['Research', 'Data Analysis'], experience: '1.5 years in bioinformatics', rating: 4.0 },
            { name: 'Vikram Joshi', college: 'IIT Hyderabad', department: 'Computer Science', skills: ['Coding', 'Technology'], experience: '2 years in software development', rating: 4.4 },
        ];

        const filteredStudents = students.filter(student => {
            const matchesSearch = student.name.toLowerCase().includes(searchInput) || student.skills.some(skill => skill.toLowerCase().includes(searchInput));
            const matchesCategory = categoryFilter === 'all' || student.skills.some(skill => skill.toLowerCase().includes(categoryFilter));
            return matchesSearch && matchesCategory;
        });

        filteredStudents.forEach((student, index) => {
            setTimeout(() => {
                const studentCard = document.createElement('div');
                studentCard.className = 'student-card';
                studentCard.innerHTML = `
                    <h3>${student.name}</h3>
                    <p><strong>College:</strong> ${student.college}</p>
                    <p><strong>Department:</strong> ${student.department}</p>
                    <p><strong>Skills:</strong> 
                        ${student.skills.map(skill => `<span class="skill-icon">${getSkillIcon(skill)}</span> ${skill}`).join(', ')}
                    </p>
                    <p><strong>Experience:</strong> ${student.experience}</p>
                    <p><strong>Rating:</strong> <span class="rating">${'★'.repeat(Math.floor(student.rating))}${'☆'.repeat(5 - Math.floor(student.rating))}</span> (${student.rating})</p>
                    <button class="cta-button" onclick="hireStudent('${student.name}')">Hire</button>
                `;
                studentCard.style.opacity = 0;
                studentCard.style.animation = 'fadeIn 0.5s ease forwards';
                studentsGrid.appendChild(studentCard);
            }, index * 200); // Staggered animation
        });

        totalPages = Math.ceil(filteredStudents.length / 6);
        currentPage = 1;
        updatePagination();
    };

    // Hire Student
    window.hireStudent = (name) => {
        alert(`Hiring ${name} - Please log in to proceed with the hiring process.`);
        window.location.href = 'login.html';
    };

    // Initial Load
    filterStudents();
    updatePagination();

    // Skill Icons
    function getSkillIcon(skill) {
        const icons = { Coding: '💻', 'Data Analysis': '📊', Design: '🎨', Research: '🔬', Technology: '🖥️', 'Content Creation': '✍️' };
        return icons[skill] || '⭐';
    }

    // Accessibility
    document.querySelectorAll('button, input, select').forEach(el => el.setAttribute('aria-label', el.textContent || el.placeholder));
});