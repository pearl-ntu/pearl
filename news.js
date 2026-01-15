// News page functionality
function initializeNews() {
    try {
        if (typeof newsData === 'undefined') {
            console.error('newsData is not defined');
            return;
        }

        const newsList = document.querySelector('.news-list');
        if (!newsList) {
            console.error('News list container not found');
            return;
        }

        // Clear placeholder content
        newsList.innerHTML = '';

        // Sort news by date (newest first)
        const sortedNews = [...newsData].sort((a, b) => {
        // Parse dates like "Jun 11, 2017" or "May 19, 2017"
        const parseDate = (dateStr) => {
            try {
                return new Date(dateStr);
            } catch (e) {
                // Fallback: try to extract year from string
                const yearMatch = dateStr.match(/\d{4}/);
                if (yearMatch) {
                    return new Date(yearMatch[0]);
                }
                return new Date(0); // Default to epoch if can't parse
            }
        };
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        return dateB - dateA;
    });

        // Display each news item
        sortedNews.forEach(news => {
            try {
                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';
                
                // Format content - convert HTML entities and clean up
                let content = news.content || news.excerpt || '';
                // Remove images and image-related HTML
                content = content.replace(/<img[^>]*>/gi, '');
                content = content.replace(/<a[^>]*>[\s]*<img[^>]*>[\s]*<\/a>/gi, '');
                content = content.replace(/\[caption[^\]]*\][\s\S]*?\[\/caption\]/gi, '');
                // Remove excessive line breaks
                content = content.replace(/\n{3,}/g, '\n\n');
                
        // Create elements safely to avoid template literal issues
        const header = document.createElement('div');
        header.className = 'news-item-header';
        
        const titleEl = document.createElement('h3');
        titleEl.textContent = news.title || 'Untitled';
        
        const dateEl = document.createElement('span');
        dateEl.className = 'news-date';
        dateEl.textContent = news.date || '';
        
        header.appendChild(titleEl);
        header.appendChild(dateEl);
        
        // Create content wrapper for side-by-side layout
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'news-item-content-wrapper';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'news-item-content';
        // Use innerHTML for content since it may contain HTML
        contentDiv.innerHTML = content || '';
        
        contentWrapper.appendChild(contentDiv);
        
        // Add image if available
        if (news.image) {
            const imageDiv = document.createElement('div');
            imageDiv.className = 'news-item-image';
            const img = document.createElement('img');
            img.src = news.image;
            img.alt = news.title || 'News image';
            img.onerror = function() {
                this.style.display = 'none';
            };
            imageDiv.appendChild(img);
            contentWrapper.appendChild(imageDiv);
        }
        
        newsItem.appendChild(header);
        newsItem.appendChild(contentWrapper);
                
                newsList.appendChild(newsItem);
            } catch (err) {
                console.error('Error creating news item:', err, news);
            }
        });

        // If no news items, show message
        if (sortedNews.length === 0) {
            newsList.innerHTML = `
                <div class="news-item">
                    <h3 data-en="Latest Updates" data-zh="最新更新">Latest Updates</h3>
                    <p class="news-note" data-en="News and updates will be posted here. Please check back soon." data-zh="新闻和更新将在此发布。请稍后查看。">News and updates will be posted here. Please check back soon.</p>
                </div>
            `;
        }
        
        console.log(`Successfully displayed ${sortedNews.length} news items`);
    } catch (error) {
        console.error('Error initializing news:', error);
        const newsList = document.querySelector('.news-list');
        if (newsList) {
            newsList.innerHTML = `
                <div class="news-item">
                    <h3>Error Loading News</h3>
                    <p>There was an error loading the news. Please refresh the page.</p>
                    <p style="color: red; font-size: 12px;">Error: ${error.message}</p>
                </div>
            `;
        }
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize when DOM is ready
// Make sure news loads AFTER language switcher to avoid conflicts
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Small delay to ensure language switcher runs first
        setTimeout(initializeNews, 100);
    });
} else {
    // Small delay to ensure language switcher runs first
    setTimeout(initializeNews, 100);
}
