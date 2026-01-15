// People Page - Dynamic Rendering
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure peopleData is loaded
    setTimeout(function() {
        // Check if peopleData exists
        if (typeof peopleData === 'undefined') {
            console.error('peopleData is not defined. Make sure people-data.js is loaded before people.js');
            return;
        }

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
                                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="60" cy="60" r="50" fill="#d0d0d0"/>
                                    <circle cx="60" cy="48" r="14" fill="#999"/>
                                    <path d="M36 108 Q60 84 84 108" stroke="#999" stroke-width="12" fill="none" stroke-linecap="round"/>
                                </svg>
                            </div>
                        ` : `
                            <div class="image-placeholder">
                                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="60" cy="60" r="50" fill="#d0d0d0"/>
                                    <circle cx="60" cy="48" r="14" fill="#999"/>
                                    <path d="M36 108 Q60 84 84 108" stroke="#999" stroke-width="12" fill="none" stroke-linecap="round"/>
                                </svg>
                            </div>
                        `}
                    </div>
                    <h3>${person.name}</h3>
                    ${person.title ? `<p class="person-title">${person.title}</p>` : ''}
                    ${person.email ? `<a href="mailto:${person.email}" class="person-email">${person.email}</a>` : ''}
                    ${person.website ? `<a href="${person.website}" target="_blank" rel="noopener" class="person-website" data-en="Personal Website" data-zh="个人网站">Personal Website</a>` : ''}
                    ${person.research ? `<p class="person-research">${person.research}</p>` : ''}
                </div>
            `;
        }

        function renderPeople(category, gridElement) {
            if (!gridElement) {
                console.error(`Grid element not found for category: ${category}`);
                return;
            }
            
            const people = peopleData[category] || [];
            
            console.log(`Rendering ${category}:`, people.length, 'people');
            
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

        // Render Alumni
        const alumniList = document.getElementById('alumni-list');
        if (alumniList && peopleData.alumni) {
            const alumni = peopleData.alumni || [];
            if (alumni.length > 0) {
                alumniList.innerHTML = '<ul class="alumni-items">' + 
                    alumni.map(alum => {
                        let text = `${alum.name} (${alum.role}`;
                        if (alum.years) {
                            text += `, ${alum.years}`;
                        }
                        text += ')';
                        if (alum.currentPosition) {
                            text += `; ${alum.currentPosition}`;
                        }
                        return `<li>${text}</li>`;
                    }).join('') + 
                    '</ul>';
            } else {
                alumniList.innerHTML = '<p class="section-note" data-en="No alumni listed yet." data-zh="暂无校友。">No alumni listed yet.</p>';
            }
        }

        // Render UROP Students
        const uropList = document.getElementById('urop-list');
        if (uropList && peopleData.uropStudents) {
            const uropStudents = peopleData.uropStudents || [];
            if (uropStudents.length > 0) {
                uropList.innerHTML = '<ul class="urop-items">' + 
                    uropStudents.map(student => {
                        let text = student.name;
                        if (student.institution) {
                            text += ` (${student.institution}`;
                            if (student.year) {
                                text += `; ${student.year}`;
                            }
                            text += ')';
                        } else if (student.year) {
                            text += ` (${student.year})`;
                        }
                        return `<li>${text}</li>`;
                    }).join('') + 
                    '</ul>';
            } else {
                uropList.innerHTML = '<p class="section-note" data-en="No UROP/internship students listed yet." data-zh="暂无UROP/实习学生。">No UROP/internship students listed yet.</p>';
            }
        }
    }, 100); // Small delay to ensure peopleData is loaded
});
