// People Page - Dynamic Rendering
document.addEventListener('DOMContentLoaded', function() {
    const postdocsGrid = document.getElementById('postdocs-grid');
    const phdStudentsGrid = document.getElementById('phd-students-grid');
    const mastersStudentsGrid = document.getElementById('masters-students-grid');

    function createPersonCard(person) {
        const imageSrc = person.image || '';
        const hasImage = imageSrc !== '';
        
        return `
            <div class="person-card">
                <div class="person-image">
                    ${hasImage ? `
                        <img src="${imageSrc}" alt="${person.name}" class="person-photo" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        <div class="image-placeholder" style="display: none;">
                            <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="75" cy="75" r="60" fill="#d0d0d0"/>
                                <circle cx="75" cy="60" r="18" fill="#999"/>
                                <path d="M45 135 Q75 105 105 135" stroke="#999" stroke-width="15" fill="none" stroke-linecap="round"/>
                            </svg>
                        </div>
                    ` : `
                        <div class="image-placeholder">
                            <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="75" cy="75" r="60" fill="#d0d0d0"/>
                                <circle cx="75" cy="60" r="18" fill="#999"/>
                                <path d="M45 135 Q75 105 105 135" stroke="#999" stroke-width="15" fill="none" stroke-linecap="round"/>
                            </svg>
                        </div>
                    `}
                </div>
                <h3>${person.name}</h3>
                ${person.title ? `<p class="person-title">${person.title}</p>` : ''}
                ${person.email ? `<p class="person-email">${person.email}</p>` : ''}
                ${person.research ? `<p class="person-research">${person.research}</p>` : ''}
            </div>
        `;
    }

    function renderPeople(category, gridElement) {
        if (!gridElement) return;
        
        const people = peopleData[category] || [];
        
        if (people.length === 0) {
            // Show a message if no people in this category
            gridElement.innerHTML = `
                <div class="section-note" style="grid-column: 1 / -1;">
                    <span data-en="No ${category === 'postdocs' ? 'postdocs' : category === 'phdStudents' ? 'PhD students' : 'Masters students'} listed yet." data-zh="${category === 'postdocs' ? '暂无博士后' : category === 'phdStudents' ? '暂无博士研究生' : '暂无硕士研究生'}。">No ${category === 'postdocs' ? 'postdocs' : category === 'phdStudents' ? 'PhD students' : 'Masters students'} listed yet.</span>
                </div>
            `;
            return;
        }

        gridElement.innerHTML = people.map(person => createPersonCard(person)).join('');
        
        // Apply language switching to new elements
        if (typeof switchLanguage === 'function') {
            const currentLang = localStorage.getItem('language') || 'en';
            setTimeout(() => switchLanguage(currentLang), 10);
        }
    }

    // Render all categories
    renderPeople('postdocs', postdocsGrid);
    renderPeople('phdStudents', phdStudentsGrid);
    renderPeople('mastersStudents', mastersStudentsGrid);
});

