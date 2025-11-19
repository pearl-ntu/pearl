// Publications Display and Filtering
document.addEventListener('DOMContentLoaded', function() {
    // Wait for publicationsData to be available
    if (typeof publicationsData === 'undefined') {
        console.error('publicationsData is not defined. Make sure publications-data.js is loaded before publications.js');
        return;
    }
    
    const publicationsList = document.getElementById('publicationsList');
    const yearFilter = document.getElementById('yearFilter');
    const sortFilter = document.getElementById('sortFilter');
    const citationFilter = document.getElementById('citationFilter');
    const searchFilter = document.getElementById('searchFilter');
    
    // Function to calculate and update statistics
    function updateStatistics() {
        if (!publicationsData || publicationsData.length === 0) return;
        
        // Calculate total citations
        const totalCitations = publicationsData.reduce((sum, pub) => sum + (pub.citations || 0), 0);
        
        // Calculate h-index
        const citations = publicationsData.map(p => p.citations || 0).sort((a, b) => b - a);
        let hIndex = 0;
        for (let i = 0; i < citations.length; i++) {
            if (citations[i] >= i + 1) {
                hIndex = i + 1;
            } else {
                break;
            }
        }
        
        // Calculate i10-index (number of publications with at least 10 citations)
        const i10Index = publicationsData.filter(p => (p.citations || 0) >= 10).length;
        
        // Update statistics display
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length >= 4) {
            statNumbers[0].textContent = totalCitations.toLocaleString();
            statNumbers[1].textContent = hIndex;
            statNumbers[2].textContent = i10Index;
            statNumbers[3].textContent = publicationsData.length + '+';
        }
    }
    
    // Calculate and update statistics
    updateStatistics();
    
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
});

