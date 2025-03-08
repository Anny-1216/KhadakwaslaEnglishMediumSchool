// Content Manager Class
class ContentManager {
    constructor() {
        this.initializeStorage();
        this.setupEventListeners();
    }

    initializeStorage() {
        if (!localStorage.getItem('schoolData')) {
            const defaultData = {
                news: [],
                events: [],
                gallery: [],
                notices: [],
                staff: []
            };
            localStorage.setItem('schoolData', JSON.stringify(defaultData));
        }
    }

    setupEventListeners() {
        // News form submission
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'newsForm') {
                e.preventDefault();
                this.handleNewsSubmission(e.target);
            }
            else if (e.target.id === 'eventForm') {
                e.preventDefault();
                this.handleEventSubmission(e.target);
            }
            else if (e.target.id === 'noticeForm') {
                e.preventDefault();
                this.handleNoticeSubmission(e.target);
            }
            else if (e.target.id === 'staffForm') {
                e.preventDefault();
                this.handleStaffSubmission(e.target);
            }
        });

        // Load content when sections are displayed
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                const section = link.getAttribute('data-section');
                this.loadContent(section);
            });
        });
    }

    // News Management
    handleNewsSubmission(form) {
        const title = form.querySelector('#newsTitle').value;
        const content = form.querySelector('#newsContent').value;

        const news = {
            id: Date.now(),
            title,
            content,
            date: new Date().toISOString(),
            status: 'published'
        };

        this.addContent('news', news);
        this.closeModal();
        this.loadContent('news');
        this.logActivity('News', `Added new news item: ${title}`);
    }

    // Events Management
    handleEventSubmission(form) {
        const name = form.querySelector('#eventName').value;
        const date = form.querySelector('#eventDate').value;
        const venue = form.querySelector('#eventVenue').value;
        const description = form.querySelector('#eventDescription').value;

        const event = {
            id: Date.now(),
            name,
            date,
            venue,
            description
        };

        this.addContent('events', event);
        this.closeModal();
        this.loadContent('events');
        this.logActivity('Event', `Added new event: ${name}`);
    }

    // Notices Management
    handleNoticeSubmission(form) {
        const title = form.querySelector('#noticeTitle').value;
        const content = form.querySelector('#noticeContent').value;
        const priority = form.querySelector('#noticePriority').value;

        const notice = {
            id: Date.now(),
            title,
            content,
            priority,
            date: new Date().toISOString()
        };

        this.addContent('notices', notice);
        this.closeModal();
        this.loadContent('notices');
        this.logActivity('Notice', `Added new notice: ${title}`);
    }

    // Staff Management
    handleStaffSubmission(form) {
        const name = form.querySelector('#staffName').value;
        const position = form.querySelector('#staffPosition').value;
        const department = form.querySelector('#staffDepartment').value;

        const staff = {
            id: Date.now(),
            name,
            position,
            department
        };

        this.addContent('staff', staff);
        this.closeModal();
        this.loadContent('staff');
        this.logActivity('Staff', `Added new staff member: ${name}`);
    }

    // Gallery Management
    handleImageUpload(files) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const image = {
                    id: Date.now(),
                    src: e.target.result,
                    caption: file.name,
                    uploadDate: new Date().toISOString()
                };

                this.addContent('gallery', image);
                this.loadContent('gallery');
                this.logActivity('Gallery', `Added new image: ${file.name}`);
            };
            reader.readAsDataURL(file);
        });
    }

    // Generic content management methods
    addContent(type, content) {
        const data = JSON.parse(localStorage.getItem('schoolData'));
        data[type].unshift(content);
        localStorage.setItem('schoolData', JSON.stringify(data));
        this.updateDashboardStats();
    }

    deleteContent(type, id) {
        const data = JSON.parse(localStorage.getItem('schoolData'));
        data[type] = data[type].filter(item => item.id !== id);
        localStorage.setItem('schoolData', JSON.stringify(data));
        this.updateDashboardStats();
        this.loadContent(type);
    }

    loadContent(section) {
        const data = JSON.parse(localStorage.getItem('schoolData'));
        
        switch(section) {
            case 'news':
                this.displayNews(data.news);
                break;
            case 'events':
                this.displayEvents(data.events);
                break;
            case 'gallery':
                this.displayGallery(data.gallery);
                break;
            case 'notices':
                this.displayNotices(data.notices);
                break;
            case 'staff':
                this.displayStaff(data.staff);
                break;
        }
    }

    // Display methods for different content types
    displayNews(news) {
        const newsTable = document.getElementById('newsTable');
        if (!newsTable) return;

        newsTable.innerHTML = news.map(item => `
            <tr>
                <td>${item.title}</td>
                <td>${new Date(item.date).toLocaleDateString()}</td>
                <td>${item.status}</td>
                <td>
                    <button onclick="contentManager.deleteContent('news', ${item.id})" class="delete-btn">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    displayEvents(events) {
        const eventsTable = document.getElementById('eventsTable');
        if (!eventsTable) return;

        eventsTable.innerHTML = events.map(event => `
            <tr>
                <td>${event.name}</td>
                <td>${new Date(event.date).toLocaleDateString()}</td>
                <td>${event.venue}</td>
                <td>
                    <button onclick="contentManager.deleteContent('events', ${event.id})" class="delete-btn">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    displayGallery(gallery) {
        const galleryGrid = document.getElementById('adminGallery');
        if (!galleryGrid) return;

        galleryGrid.innerHTML = gallery.map(image => `
            <div class="gallery-item">
                <img src="${image.src}" alt="${image.caption}">
                <button onclick="contentManager.deleteContent('gallery', ${image.id})" class="delete-btn">Delete</button>
            </div>
        `).join('');
    }

    displayNotices(notices) {
        const noticesTable = document.getElementById('noticesTable');
        if (!noticesTable) return;

        noticesTable.innerHTML = notices.map(notice => `
            <tr>
                <td>${notice.title}</td>
                <td>${new Date(notice.date).toLocaleDateString()}</td>
                <td>${notice.priority}</td>
                <td>
                    <button onclick="contentManager.deleteContent('notices', ${notice.id})" class="delete-btn">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    displayStaff(staff) {
        const staffTable = document.getElementById('staffTable');
        if (!staffTable) return;

        staffTable.innerHTML = staff.map(member => `
            <tr>
                <td>${member.name}</td>
                <td>${member.position}</td>
                <td>${member.department}</td>
                <td>
                    <button onclick="contentManager.deleteContent('staff', ${member.id})" class="delete-btn">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    // Utility methods
    updateDashboardStats() {
        const data = JSON.parse(localStorage.getItem('schoolData'));
        document.getElementById('newsCount').textContent = data.news.length;
        document.getElementById('eventsCount').textContent = data.events.length;
        document.getElementById('galleryCount').textContent = data.gallery.length;
        document.getElementById('noticesCount').textContent = data.notices.length;
    }

    closeModal() {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    logActivity(type, description) {
        const activities = JSON.parse(localStorage.getItem('recentActivity')) || [];
        activities.unshift({
            type,
            description,
            timestamp: new Date().toISOString()
        });

        if (activities.length > 10) {
            activities.pop();
        }

        localStorage.setItem('recentActivity', JSON.stringify(activities));
        this.updateActivityList();
    }

    updateActivityList() {
        const activityList = document.getElementById('activityList');
        if (!activityList) return;

        const activities = JSON.parse(localStorage.getItem('recentActivity')) || [];
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <p><strong>${activity.type}</strong> - ${activity.description}</p>
                <small>${new Date(activity.timestamp).toLocaleString()}</small>
            </div>
        `).join('');
    }
}

// Initialize Content Manager
const contentManager = new ContentManager(); 