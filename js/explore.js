// js/explore.js
document.addEventListener('DOMContentLoaded', () => {
    const professionalsGrid = document.getElementById('professionals-grid');
    const professionFilter = document.getElementById('profession');
    const industryFilter = document.getElementById('industry');
    const experienceFilter = document.getElementById('experience');
    const companyFilter = document.getElementById('company');

    // Sample professionals data
    const professionals = [
        { name: 'Vikram Sharma', profession: 'Project Management', industry: 'Technology', experience: 'Senior', company: 'TechCorp', rating: 4.5 },
        { name: 'Sneha Patel', profession: 'Data Analysis', industry: 'Technology', experience: 'Junior', company: 'DataSolutions', rating: 4.2 },
        { name: 'Rahul Mehta', profession: 'Software Development', industry: 'Technology', experience: 'Senior', company: 'InnovateTech', rating: 4.7 },
        { name: 'Priya Singh', profession: 'Design', industry: 'Education', experience: 'Junior', company: 'EduCorp', rating: 4.0 },
    ];

    // Function to render professionals grid
    function renderProfessionals(data) {
        professionalsGrid.innerHTML = '';
        data.forEach(pro => {
            const card = document.createElement('div');
            card.className = 'professional-card';
            card.innerHTML = `
                <h3>${pro.name}</h3>
                <p><strong>Profession:</strong> ${pro.profession}</p>
                <p><strong>Industry:</strong> ${pro.industry}</p>
                <p><strong>Experience:</strong> ${pro.experience}</p>
                <p><strong>Company:</strong> ${pro.company}</p>
                <p><strong>Rating:</strong> <span class="rating">${'★'.repeat(Math.floor(pro.rating))}${'☆'.repeat(5 - Math.floor(pro.rating))}</span> (${pro.rating})</p>
                <button class="connect-btn" onclick="connectToProfessional('${pro.name}')">Connect</button>
            `;
            professionalsGrid.appendChild(card);
        });
    }

    // Function to apply filters
    window.applyFilters = function() {
        const profession = professionFilter.value;
        const industry = industryFilter.value;
        const experience = experienceFilter.value;
        const company = companyFilter.value;

        const filteredProfessionals = professionals.filter(pro => {
            const matchesProfession = profession === 'all' || pro.profession === profession;
            const matchesIndustry = industry === 'all' || pro.industry === industry;
            const matchesExperience = experience === 'all' || pro.experience === experience;
            const matchesCompany = company === 'all' || pro.company === company;
            return matchesProfession && matchesIndustry && matchesExperience && matchesCompany;
        });

        renderProfessionals(filteredProfessionals);
    };

    // Function to connect to a professional (placeholder)
    window.connectProfessional = function() {
        alert('Redirecting to connect with a new professional...');
        // In a real implementation, redirect to a connection form or process
    };

    window.connectToProfessional = function(name) {
        alert(`Connecting to ${name}...`);
        // In a real implementation, initiate a connection request (e.g., via Firebase)
    };

    // Initial render
    renderProfessionals(professionals);
});