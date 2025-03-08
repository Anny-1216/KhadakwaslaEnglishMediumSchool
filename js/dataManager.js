// Data Manager for handling local storage
const DataManager = {
    // Initialize default data
    init() {
        if (!localStorage.getItem('schoolData')) {
            const defaultData = {
                news: [],
                events: [],
                gallery: [],
                notices: [],
                lastUpdate: new Date().toISOString()
            };
            localStorage.setItem('schoolData', JSON.stringify(defaultData));
        }
    },

    // Get all data
    getData() {
        return JSON.parse(localStorage.getItem('schoolData'));
    },

    // Save data
    saveData(data) {
        data.lastUpdate = new Date().toISOString();
        localStorage.setItem('schoolData', JSON.stringify(data));
    },

    // News Management
    addNews(news) {
        const data = this.getData();
        data.news.unshift({
            id: Date.now(),
            ...news,
            date: new Date().toISOString()
        });
        this.saveData(data);
    },

    getNews() {
        return this.getData().news;
    },

    // Events Management
    addEvent(event) {
        const data = this.getData();
        data.events.push({
            id: Date.now(),
            ...event
        });
        data.events.sort((a, b) => new Date(a.date) - new Date(b.date));
        this.saveData(data);
    },

    getEvents() {
        return this.getData().events;
    },

    // Gallery Management
    addGalleryItem(item) {
        const data = this.getData();
        data.gallery.unshift({
            id: Date.now(),
            ...item,
            uploadDate: new Date().toISOString()
        });
        this.saveData(data);
    },

    getGallery() {
        return this.getData().gallery;
    },

    // Notice Management
    addNotice(notice) {
        const data = this.getData();
        data.notices.unshift({
            id: Date.now(),
            ...notice,
            date: new Date().toISOString()
        });
        this.saveData(data);
    },

    getNotices() {
        return this.getData().notices;
    },

    // Admin Authentication (simple version)
    adminCredentials: {
        username: 'admin',
        password: 'admin123' // In real application, use proper authentication
    },

    verifyAdmin(username, password) {
        return username === this.adminCredentials.username && 
               password === this.adminCredentials.password;
    }
}; 