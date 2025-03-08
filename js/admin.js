// Admin Authentication
let isAdmin = false;

// Admin Login
async function adminLogin(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        isAdmin = true;
        showAdminPanel();
    } catch (error) {
        console.error('Login Error:', error);
        alert('Login failed. Please check your credentials.');
    }
}

// Admin Panel Features
function showAdminPanel() {
    if (!isAdmin) return;

    // Add admin controls to various sections
    addNewsEditor();
    addGalleryManager();
    addEventManager();
    addNoticeManager();
}

// News Management
async function addNews(newsData) {
    try {
        await newsCollection.add({
            title: newsData.title,
            content: newsData.content,
            date: new Date(),
            language: newsData.language
        });
        updateNewsFeed();
    } catch (error) {
        console.error('Error adding news:', error);
    }
}

// Gallery Management
async function uploadImage(file, category) {
    try {
        const storageRef = storage.ref(`gallery/${category}/${file.name}`);
        await storageRef.put(file);
        const url = await storageRef.getDownloadURL();
        
        await galleryCollection.add({
            url: url,
            category: category,
            caption: file.name,
            uploadDate: new Date()
        });
        
        updateGallery();
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}

// Event Management
async function addEvent(eventData) {
    try {
        await eventsCollection.add({
            title: eventData.title,
            description: eventData.description,
            date: new Date(eventData.date),
            venue: eventData.venue,
            language: eventData.language
        });
        updateEvents();
    } catch (error) {
        console.error('Error adding event:', error);
    }
}

// Notice Management
async function addNotice(noticeData) {
    try {
        await noticesCollection.add({
            title: noticeData.title,
            content: noticeData.content,
            date: new Date(),
            important: noticeData.important,
            language: noticeData.language
        });
        updateNotices();
    } catch (error) {
        console.error('Error adding notice:', error);
    }
}

// Real-time Updates
function updateNewsFeed() {
    newsCollection
        .orderBy('date', 'desc')
        .limit(5)
        .onSnapshot(snapshot => {
            const newsContainer = document.querySelector('.news-feed');
            if (!newsContainer) return;
            
            newsContainer.innerHTML = '';
            snapshot.forEach(doc => {
                const news = doc.data();
                const newsElement = createNewsElement(news);
                newsContainer.appendChild(newsElement);
            });
        });
}

function updateGallery() {
    galleryCollection
        .orderBy('uploadDate', 'desc')
        .onSnapshot(snapshot => {
            const galleryGrid = document.querySelector('.gallery-grid');
            if (!galleryGrid) return;
            
            galleryGrid.innerHTML = '';
            snapshot.forEach(doc => {
                const image = doc.data();
                const imageElement = createGalleryItem(image);
                galleryGrid.appendChild(imageElement);
            });
        });
}

function updateEvents() {
    eventsCollection
        .orderBy('date')
        .onSnapshot(snapshot => {
            const eventsContainer = document.querySelector('.events-list');
            if (!eventsContainer) return;
            
            eventsContainer.innerHTML = '';
            snapshot.forEach(doc => {
                const event = doc.data();
                const eventElement = createEventElement(event);
                eventsContainer.appendChild(eventElement);
            });
        });
}

function updateNotices() {
    noticesCollection
        .orderBy('date', 'desc')
        .onSnapshot(snapshot => {
            const noticesContainer = document.querySelector('.notices-list');
            if (!noticesContainer) return;
            
            noticesContainer.innerHTML = '';
            snapshot.forEach(doc => {
                const notice = doc.data();
                const noticeElement = createNoticeElement(notice);
                noticesContainer.appendChild(noticeElement);
            });
        });
}

// Helper Functions for Creating Elements
function createNewsElement(news) {
    const div = document.createElement('div');
    div.className = 'news-item';
    div.innerHTML = `
        <h4>${news.title}</h4>
        <p>${news.content}</p>
        <small>${news.date.toDate().toLocaleDateString()}</small>
    `;
    return div;
}

function createGalleryItem(image) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.setAttribute('data-category', image.category);
    div.innerHTML = `
        <img src="${image.url}" alt="${image.caption}" loading="lazy">
        <div class="gallery-overlay">
            <h4>${image.caption}</h4>
        </div>
    `;
    return div;
}

function createEventElement(event) {
    const div = document.createElement('div');
    div.className = 'event-item';
    div.innerHTML = `
        <h4>${event.title}</h4>
        <p>${event.description}</p>
        <div class="event-details">
            <span>📅 ${event.date.toDate().toLocaleDateString()}</span>
            <span>📍 ${event.venue}</span>
        </div>
    `;
    return div;
}

function createNoticeElement(notice) {
    const div = document.createElement('div');
    div.className = `notice-item ${notice.important ? 'important' : ''}`;
    div.innerHTML = `
        <h4>${notice.title}</h4>
        <p>${notice.content}</p>
        <small>${notice.date.toDate().toLocaleDateString()}</small>
    `;
    return div;
} 