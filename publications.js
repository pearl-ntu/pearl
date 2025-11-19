// Publications Display and Filtering
// Wait for both DOM and publicationsData to be ready

function initializePublications() {
    // Check if publicationsData is available
    if (typeof publicationsData === 'undefined') {
        console.error('publicationsData is not defined');
        document.getElementById('publicationsList').innerHTML = '<div class="no-results">Error: Publications data not loaded. Please refresh the page.</div>';
        return;
    }
    
    if (!publicationsData || publicationsData.length === 0) {
        console.error('publicationsData is empty');
        document.getElementById('publicationsList').innerHTML = '<div class="no-results">No publications data available.</div>';
        return;
    }
    
    const publicationsList = document.getElementById('publicationsList');
    const yearFilter = document.getElementById('yearFilter');
    const sortFilter = document.getElementById('sortFilter');
    const citationFilter = document.getElementById('citationFilter');
    const searchFilter = document.getElementById('searchFilter');
    
    if (!publicationsList || !yearFilter || !sortFilter || !citationFilter || !searchFilter) {
        console.error('Required DOM elements not found');
        return;
    }
    
    // Function to identify selected publications
    // Selected: X Liu is last author (or near last) in prestigious journals
    function getSelectedPublications() {
        const prestigiousJournals = [
            'Journal of the American Chemical Society',
            'Nature',
            'Nature Methods',
            'Nature Chemistry',
            'Nature Communications',
            'Nature Synthesis',
            'Angewandte Chemie International Edition',
            'Science',
            'Cell'
        ];
        
        return publicationsData.filter(pub => {
            // Check if journal is prestigious
            const isPrestigious = prestigiousJournals.some(journal => 
                pub.journal.includes(journal)
            );
            
            if (!isPrestigious) return false;
            
            // Check if X Liu is last author (appears last before "..." or at the end)
            const authors = pub.authors;
            const liuPattern = /X Liu/i;
            
            if (!liuPattern.test(authors)) return false;
            
            // Check if X Liu appears near the end (last or second-to-last before "...")
            const authorsList = authors.split(',').map(a => a.trim());
            const lastIndex = authorsList.length - 1;
            const secondLastIndex = authorsList.length - 2;
            
            // Check if X Liu is in the last 2 positions (before "..." if present)
            for (let i = Math.max(0, lastIndex - 2); i <= lastIndex; i++) {
                if (authorsList[i] && liuPattern.test(authorsList[i])) {
                    return true;
                }
            }
            
            return false;
        }).sort((a, b) => {
            // Sort by year (newest first), then by citations
            if (b.year !== a.year) return b.year - a.year;
            return b.citations - a.citations;
        });
    }
    
    // Display selected publications
    function displaySelectedPublications() {
        const selectedPubs = getSelectedPublications();
        const selectedList = document.getElementById('selectedPublicationsList');
        
        if (!selectedList) return;
        
        if (selectedPubs.length === 0) {
            selectedList.innerHTML = '<p class="section-description" data-en="No selected publications found." data-zh="未找到精选出版物。">No selected publications found.</p>';
            return;
        }
        
        selectedList.innerHTML = selectedPubs.map((pub, index) => {
            const citationText = pub.citations === 1 ? 'citation' : 'citations';
            const citationTextZh = '次引用';
            
            // Determine journal badge
            let journalBadge = '';
            if (pub.journal.includes('Journal of the American Chemical Society')) {
                journalBadge = 'JACS';
            } else if (pub.journal.includes('Nature')) {
                journalBadge = 'Nature';
            } else if (pub.journal.includes('Angewandte Chemie')) {
                journalBadge = 'Angew. Chem.';
            } else if (pub.journal.includes('Science')) {
                journalBadge = 'Science';
            } else if (pub.journal.includes('Cell')) {
                journalBadge = 'Cell';
            }
            
            return `
            <div class="selected-publication-item">
                <div class="selected-pub-content">
                    <h3 class="selected-pub-title">${pub.title}</h3>
                    <p class="selected-pub-authors">${pub.authors}</p>
                    <p class="selected-pub-journal">${pub.journal}</p>
                    <div class="selected-pub-meta">
                        ${journalBadge ? `<span class="selected-pub-badge">${journalBadge}</span>` : ''}
                        <span class="pub-year">${pub.year}</span>
                        <span class="pub-citations" data-en="${pub.citations} ${citationText}" data-zh="${pub.citations} ${citationTextZh}">${pub.citations} ${citationText}</span>
                    </div>
                </div>
            </div>
        `;
        }).join('');
        
        // Apply language to new elements
        if (typeof switchLanguage === 'function') {
            const currentLang = localStorage.getItem('language') || 'en';
            setTimeout(() => switchLanguage(currentLang), 10);
        }
    }
    
    // Display selected publications
    displaySelectedPublications();
    
    let filteredPublications = [...publicationsData];
    
    // Initialize with all publications
    displayPublications(filteredPublications);
    
    // Filter functions
    function applyFilters() {
        const yearValue = yearFilter.value;
        const citationValue = parseInt(citationFilter.value);
        const searchValue = searchFilter.value.toLowerCase();
        const sortValue = sortFilter.value;
        
        filteredPublications = publicationsData.filter(pub => {
            const yearMatch = yearValue === 'all' || pub.year === parseInt(yearValue);
            const citationMatch = pub.citations >= citationValue;
            const searchMatch = searchValue === '' || 
                pub.title.toLowerCase().includes(searchValue) ||
                pub.authors.toLowerCase().includes(searchValue) ||
                pub.journal.toLowerCase().includes(searchValue);
            
            return yearMatch && citationMatch && searchMatch;
        });
        
        // Sort publications
        if (sortValue === 'citations') {
            filteredPublications.sort((a, b) => b.citations - a.citations);
        } else if (sortValue === 'year') {
            filteredPublications.sort((a, b) => b.year - a.year);
        } else if (sortValue === 'title') {
            filteredPublications.sort((a, b) => a.title.localeCompare(b.title));
        }
        
        displayPublications(filteredPublications);
    }
    
    function displayPublications(pubs) {
        if (pubs.length === 0) {
            publicationsList.innerHTML = '<div class="no-results" data-en="No publications found matching your filters." data-zh="未找到符合筛选条件的出版物。">No publications found matching your filters.</div>';
            return;
        }
        
        publicationsList.innerHTML = pubs.map((pub, index) => {
            const citationText = pub.citations === 1 ? 'citation' : 'citations';
            const citationTextZh = '次引用';
            return `
            <div class="publication-item" data-year="${pub.year}" data-citations="${pub.citations}">
                <div class="pub-number">${index + 1}</div>
                <div class="pub-content">
                    <h3 class="pub-title">${pub.title}</h3>
                    <p class="pub-authors">${pub.authors}</p>
                    <p class="pub-journal">${pub.journal}</p>
                    <div class="pub-meta">
                        <span class="pub-year">${pub.year}</span>
                        <span class="pub-citations" data-en="${pub.citations} ${citationText}" data-zh="${pub.citations} ${citationTextZh}">${pub.citations} ${citationText}</span>
                    </div>
                </div>
            </div>
        `;
        }).join('');
        
        // Apply language to new elements
        if (typeof switchLanguage === 'function') {
            const currentLang = localStorage.getItem('language') || 'en';
            // Small delay to ensure DOM is ready
            setTimeout(() => switchLanguage(currentLang), 10);
        }
    }
    
    // Event listeners
    yearFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);
    citationFilter.addEventListener('change', applyFilters);
    searchFilter.addEventListener('input', applyFilters);
    
    // Update search placeholder on language change
    const updateSearchPlaceholder = () => {
        const lang = localStorage.getItem('language') || 'en';
        const placeholder = searchFilter.getAttribute(lang === 'zh' ? 'data-zh-placeholder' : 'data-en-placeholder');
        if (placeholder) {
            searchFilter.placeholder = placeholder;
        }
    };
    
    // Watch for language changes
    const observer = new MutationObserver(updateSearchPlaceholder);
    if (document.documentElement) {
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    }
    updateSearchPlaceholder();
}

// Wait for both DOM and publicationsData
function initPublications() {
    // Check if DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            // Wait a bit more for scripts to load
            setTimeout(checkAndInit, 50);
        });
    } else {
        // DOM is ready, but check if data is loaded
        setTimeout(checkAndInit, 50);
    }
}

function checkAndInit() {
    // Check if publicationsData is available
    if (typeof publicationsData !== 'undefined' && publicationsData && publicationsData.length > 0) {
        initializePublications();
    } else {
        // Retry after a short delay (max 10 times)
        if (typeof checkAndInit.retries === 'undefined') {
            checkAndInit.retries = 0;
        }
        checkAndInit.retries++;
        if (checkAndInit.retries < 10) {
            setTimeout(checkAndInit, 100);
        } else {
            console.error('Failed to load publicationsData after multiple attempts');
            const publicationsList = document.getElementById('publicationsList');
            if (publicationsList) {
                publicationsList.innerHTML = '<div class="no-results">Error: Unable to load publications data. Please refresh the page.</div>';
            }
        }
    }
}

// Start initialization
initPublications();
