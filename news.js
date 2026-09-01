// News page functionality

function parseNewsDate(dateStr) {
    const parsed = new Date(dateStr);
    if (!Number.isNaN(parsed.getTime())) {
        return parsed;
    }

    const yearMatch = String(dateStr || '').match(/\d{4}/);
    return yearMatch ? new Date(yearMatch[0]) : new Date(0);
}

function getCurrentLanguage() {
    return typeof currentLang !== 'undefined' && currentLang === 'zh' ? 'zh' : 'en';
}

function getLocalizedValue(item, field) {
    const localizedField = getCurrentLanguage() === 'zh' ? `${field}Zh` : field;
    return item[localizedField] || item[field] || '';
}

function cleanNewsContent(content) {
    return String(content || '')
        .replace(/\[siteorigin_widget[\s\S]*?\[\/siteorigin_widget\]/gi, '')
        .replace(/<input\b[^>]*>/gi, '')
        .replace(/<a\b[^>]*>\s*<img\b[^>]*>\s*<\/a>/gi, '')
        .replace(/<img\b[^>]*>/gi, '')
        .replace(/\[caption[^\]]*\][\s\S]*?\[\/caption\]/gi, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

function getNewsImages(item) {
    const values = [item.image, item.images];
    const images = [];

    values.forEach(value => {
        (Array.isArray(value) ? value : [value]).forEach(image => {
            if (image && !images.includes(image)) {
                images.push(image);
            }
        });
    });

    return images;
}

function createNewsItem(item) {
    const newsItem = document.createElement('div');
    newsItem.className = 'news-item';

    const header = document.createElement('div');
    header.className = 'news-item-header';

    const titleEl = document.createElement('h3');
    titleEl.textContent = getLocalizedValue(item, 'title') || 'Untitled';

    const dateEl = document.createElement('span');
    dateEl.className = 'news-date';
    dateEl.textContent = getLocalizedValue(item, 'date');

    header.appendChild(titleEl);
    header.appendChild(dateEl);

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'news-item-content-wrapper';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'news-item-content';
    contentDiv.innerHTML = cleanNewsContent(
        getLocalizedValue(item, 'content') || getLocalizedValue(item, 'excerpt')
    );
    contentWrapper.appendChild(contentDiv);

    const images = getNewsImages(item);
    if (images.length > 0) {
        const imageDiv = document.createElement('div');
        imageDiv.className = 'news-item-image';

        images.forEach((imageSrc, index) => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = images.length === 1
                ? (getLocalizedValue(item, 'title') || 'News image')
                : `${getLocalizedValue(item, 'title') || 'News image'} ${index + 1}`;
            img.onerror = function() {
                this.style.display = 'none';
            };
            imageDiv.appendChild(img);
        });

        contentWrapper.appendChild(imageDiv);
    }

    newsItem.appendChild(header);
    newsItem.appendChild(contentWrapper);
    return newsItem;
}

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

        newsList.innerHTML = '';

        const sortedItems = [...newsData].sort((a, b) => (
            parseNewsDate(b.date) - parseNewsDate(a.date)
        ));

        sortedItems.forEach(item => {
            try {
                newsList.appendChild(createNewsItem(item));
            } catch (err) {
                console.error('Error creating news item:', err, item);
            }
        });

        if (sortedItems.length === 0) {
            newsList.innerHTML = `
                <div class="news-item">
                    <h3 data-en="Latest Updates" data-zh="最新更新">Latest Updates</h3>
                    <p class="news-note" data-en="News and updates will be posted here. Please check back soon." data-zh="新闻和更新将在此发布。请稍后查看。">News and updates will be posted here. Please check back soon.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error initializing news:', error);
        const newsList = document.querySelector('.news-list');
        if (newsList) {
            newsList.innerHTML = `
                <div class="news-item">
                    <h3>Error Loading News</h3>
                    <p>There was an error loading the news. Please refresh the page.</p>
                </div>
            `;
        }
    }
}

document.addEventListener('languageChanged', initializeNews);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initializeNews, 100);
    });
} else {
    setTimeout(initializeNews, 100);
}
