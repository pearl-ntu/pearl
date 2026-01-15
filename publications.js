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
    // Selected: Specific publications + JACS/Nature/Angewandte with X Liu as last author + Review papers by Weijie/Wangchao
    function getSelectedPublications() {
        const targetJournals = [
            'Journal of the American Chemical Society',
            'Nature',
            'Nature Methods',
            'Nature Chemistry',
            'Nature Communications',
            'Angewandte Chemie International Edition'
        ];
        
        // Manual list of specific publications to include
        const specificTitles = [
            'Precision Molecular Engineering of Compact Near-Infrared Fluorophores',
            'Conformational Folding Activates Photoinduced Electron Transfer',
            'Twisted intramolecular charge transfer (TICT) and twists beyond TICT'
        ];
        
        // Titles to exclude (exact or partial matches)
        const excludeTitles = [
            'Hydrogen-bonding Selectivity',
            'Hydrogen-bonding.*Selective',
            'Janus',
            'Enabling Wide',
            'enabling.*wide',
            'conformation.*selective',
            'Crystal multi.*conformational'
        ];
        
        const selected = publicationsData.filter(pub => {
            // Exclude specific publications (check both exact and pattern matches)
            const titleLower = pub.title.toLowerCase();
            const titleExact = pub.title;
            
            for (const excludePattern of excludeTitles) {
                // Check exact match first (case-insensitive)
                if (titleExact.toLowerCase().includes(excludePattern.toLowerCase())) {
                    return false;
                }
                // Then check pattern match (for regex patterns)
                if (excludePattern.includes('.*') || excludePattern.includes('*')) {
                    const regex = new RegExp(excludePattern, 'i');
                    if (regex.test(titleLower)) {
                        return false;
                    }
                }
            }
            
            // Include specific titles
            for (const specificTitle of specificTitles) {
                if (pub.title.includes(specificTitle)) {
                    return true;
                }
            }
            
            // Include review papers by Weijie or Wangchao
            const authors = pub.authors;
            const isReview = pub.journal.toLowerCase().includes('review') || 
                           pub.journal.toLowerCase().includes('chemical society reviews') ||
                           pub.title.toLowerCase().includes('review');
            
            // Check for Weijie (W Chi, W Chi, etc.) or Wangchao (W Qiao, Q Qiao, etc.)
            // Common patterns: W Chi, W Qiao, Q Qiao
            if (isReview && (authors.includes('W Chi') || authors.includes('W Qiao') || 
                            authors.includes('Q Qiao') || authors.includes('Weijie') || 
                            authors.includes('Wangchao'))) {
                return true;
            }
            
            // Check if journal is one of the target journals
            const isTargetJournal = targetJournals.some(journal => 
                pub.journal.includes(journal)
            );
            
            if (!isTargetJournal) return false;
            
            // Check for Xiaogang Liu or X Liu patterns
            const xiaogangPattern = /Xiaogang Liu/i;
            const xLiuPattern = /X Liu/i;
            
            // Must have either pattern
            if (!xiaogangPattern.test(authors) && !xLiuPattern.test(authors)) {
                return false;
            }
            
            // Split authors by comma, handling "..." at the end
            let authorsList = authors.split(',').map(a => a.trim());
            
            // Remove "..." if present
            if (authorsList[authorsList.length - 1] === '...') {
                authorsList = authorsList.slice(0, -1);
            }
            
            // Check if X Liu or Xiaogang Liu is the LAST author (corresponding author)
            const lastAuthor = authorsList[authorsList.length - 1];
            
            // X Liu or Xiaogang Liu must be the last author
            if (lastAuthor && (xLiuPattern.test(lastAuthor) || xiaogangPattern.test(lastAuthor))) {
                return true;
            }
            
            return false;
        }).sort((a, b) => {
            // Sort by year (newest first), then by citations
            if (b.year !== a.year) return b.year - a.year;
            return b.citations - a.citations;
        });
        
        // Return only top 5-8 publications
        return selected.slice(0, 8);
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
            
            // Show full title - no truncation
            const displayTitle = pub.title;
            
            // Determine journal badge
            let journalBadge = '';
            if (pub.journal.includes('Journal of the American Chemical Society')) {
                journalBadge = 'JACS';
            } else if (pub.journal.includes('Nature Methods')) {
                journalBadge = 'Nat. Methods';
            } else if (pub.journal.includes('Nature Chemistry')) {
                journalBadge = 'Nat. Chem.';
            } else if (pub.journal.includes('Nature Communications')) {
                journalBadge = 'Nat. Commun.';
            } else if (pub.journal.includes('Nature')) {
                journalBadge = 'Nature';
            } else if (pub.journal.includes('Angewandte Chemie')) {
                journalBadge = 'Angew. Chem.';
            }
            
            return `
            <div class="selected-pub-card">
                <div class="selected-pub-card-header">
                    <span class="selected-pub-year">${pub.year}</span>
                    ${journalBadge ? `<span class="selected-pub-badge">${journalBadge}</span>` : ''}
                    <span class="selected-pub-citations" data-en="${pub.citations} ${citationText}" data-zh="${pub.citations} ${citationTextZh}">${pub.citations}</span>
                </div>
                <h3 class="selected-pub-card-title">
                    <a href="${pub.url || '#'}" target="_blank" rel="noopener">${displayTitle}</a>
                </h3>
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
    
    // Generate Year Navigation from publications
    function generateYearNav(pubs) {
        const yearNav = document.getElementById('yearNav');
        if (!yearNav) return;
        
        // Get unique years, sorted descending
        const years = [...new Set(pubs.map(pub => pub.year))].sort((a, b) => b - a);
        
        if (years.length === 0) {
            yearNav.innerHTML = '<p class="year-nav-empty" data-en="No publications" data-zh="无出版物">No publications</p>';
            return;
        }
        
        yearNav.innerHTML = years.map(year => {
            const count = pubs.filter(pub => pub.year === year).length;
            return `
                <a href="#year-${year}" class="year-nav-link" data-year="${year}">
                    <span class="year-nav-year">${year}</span>
                    <span class="year-nav-count">(${count})</span>
                </a>
            `;
        }).join('');
        
        // Add click handlers for smooth scroll
        yearNav.querySelectorAll('.year-nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const year = link.getAttribute('data-year');
                const target = document.getElementById(`year-${year}`);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Update active state
                    yearNav.querySelectorAll('.year-nav-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });
    }
    
    function displayPublications(pubs) {
        if (pubs.length === 0) {
            publicationsList.innerHTML = '<div class="no-results" data-en="No publications found matching your filters." data-zh="未找到符合筛选条件的出版物。">No publications found matching your filters.</div>';
            generateYearNav([]);
            return;
        }
        
        // Group publications by year
        const pubsByYear = {};
        pubs.forEach(pub => {
            if (!pubsByYear[pub.year]) {
                pubsByYear[pub.year] = [];
            }
            pubsByYear[pub.year].push(pub);
        });
        
        // Sort years descending
        const sortedYears = Object.keys(pubsByYear).map(Number).sort((a, b) => b - a);
        
        // Generate HTML with year sections
        let html = '';
        let globalIndex = 1;
        
        sortedYears.forEach(year => {
            html += `<div class="year-section" id="year-${year}">
                <h3 class="year-heading">${year}</h3>
            `;
            
            pubsByYear[year].forEach(pub => {
                const citationText = pub.citations === 1 ? 'citation' : 'citations';
                const citationTextZh = '次引用';
                // Check for TOC image - handle both string and undefined cases
                const tocImage = pub.tocImage || '';
                const hasTOC = tocImage && tocImage.trim() !== '' && tocImage !== '""';
                
                html += `
                <div class="publication-item ${hasTOC ? 'has-toc' : ''}" data-year="${pub.year}" data-citations="${pub.citations}">
                    <div class="pub-main-content">
                        <div class="pub-number">${globalIndex}</div>
                        <div class="pub-content">
                            <h3 class="pub-title">
                                <a href="${pub.url || '#'}" target="_blank" rel="noopener" class="pub-title-link">${pub.title}</a>
                            </h3>
                            <p class="pub-authors">${pub.authors}</p>
                            <p class="pub-journal">${pub.journal}</p>
                            <div class="pub-meta">
                                <span class="pub-year">${pub.year}</span>
                                <span class="pub-citations" data-en="${pub.citations} ${citationText}" data-zh="${pub.citations} ${citationTextZh}">${pub.citations} ${citationText}</span>
                            </div>
                        </div>
                    </div>
                    ${hasTOC ? `
                    <div class="pub-toc-figure">
                        <img src="${encodeURI(tocImage)}" alt="TOC Figure: ${pub.title}" class="toc-image" loading="lazy" onerror="console.error('Failed to load TOC image:', '${tocImage}'); this.parentElement.style.display='none';">
                    </div>
                    ` : ''}
                </div>
                `;
                globalIndex++;
            });
            
            html += '</div>';
        });
        
        publicationsList.innerHTML = html;
        
        // Generate Year Navigation
        generateYearNav(pubs);
        
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
