class ContentDisplay {
    constructor() {
        this.initialize();
    }

    initialize() {
        document.addEventListener('DOMContentLoaded', () => {
            this.loadContent();
            
            // Listen for content updates
            window.addEventListener('contentUpdated', () => {
                this.loadContent();
            });
        });
    }

    loadContent() {
        const schoolData = JSON.parse(localStorage.getItem('schoolData')) || {
            news: [],
            events: [],
            notices: []
        };

        this.displayNews(schoolData.news);
        this.displayEvents(schoolData.events);
        this.displayNotices(schoolData.notices);
    }

    displayNews(news) {
        const newsList = document.getElementById('newsList');
        if (!newsList) return;

        newsList.innerHTML = news.length ? news.map(item => `
            <div class="news-card">
                <h3>${this.escapeHtml(item.title)}</h3>
                <p>${this.escapeHtml(item.content)}</p>
                <small>${new Date(item.date).toLocaleDateString()}</small>
            </div>
        `).join('') : '<p class="no-content">No news available</p>';
    }

    displayEvents(events) {
        const eventsList = document.getElementById('eventsList');
        if (!eventsList) return;

        // Sort events by date
        const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
        
        eventsList.innerHTML = events.length ? sortedEvents.map(event => `
            <div class="event-card">
                <h3>${this.escapeHtml(event.name)}</h3>
                <p>${this.escapeHtml(event.description)}</p>
                <div class="event-details">
                    <span>📅 ${new Date(event.date).toLocaleDateString()}</span>
                    <span>📍 ${this.escapeHtml(event.venue)}</span>
                </div>
            </div>
        `).join('') : '<p class="no-content">No upcoming events</p>';
    }

    displayNotices(notices) {
        const noticesList = document.getElementById('noticesList');
        if (!noticesList) return;

        // Sort notices by priority and date
        const sortedNotices = [...notices].sort((a, b) => {
            if (a.priority === 'high' && b.priority !== 'high') return -1;
            if (a.priority !== 'high' && b.priority === 'high') return 1;
            return new Date(b.date) - new Date(a.date);
        });

        noticesList.innerHTML = notices.length ? sortedNotices.map(notice => `
            <div class="notice-card ${notice.priority === 'high' ? 'priority-high' : ''}">
                <h3>${this.escapeHtml(notice.title)}</h3>
                <p>${this.escapeHtml(notice.content)}</p>
                <small>${new Date(notice.date).toLocaleDateString()}</small>
            </div>
        `).join('') : '<p class="no-content">No notices available</p>';
    }

    // Utility method to prevent XSS
    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// Initialize content display
const contentDisplay = new ContentDisplay(); 