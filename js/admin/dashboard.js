document.addEventListener('DOMContentLoaded', () => {
    // Initialize dashboard
    initializeDashboard();
    
    // Setup navigation
    setupNavigation();
    
    // Setup sidebar toggle for mobile
    setupSidebarToggle();
    
    // Setup logout functionality
    setupLogout();
});

function initializeDashboard() {
    // Update statistics
    updateStatistics();
    
    // Load recent activity
    loadRecentActivity();
    
    // Initialize content sections
    initializeNews();
    initializeEvents();
    initializeGallery();
    initializeNotices();
    initializeStaffDirectory();
    initializeSettings();
}

function updateStatistics() {
    // Get counts from localStorage
    const data = JSON.parse(localStorage.getItem('schoolData')) || {
        news: [],
        events: [],
        gallery: [],
        notices: []
    };
    
    // Update dashboard numbers
    document.getElementById('newsCount').textContent = data.news.length;
    document.getElementById('eventsCount').textContent = data.events.length;
    document.getElementById('galleryCount').textContent = data.gallery.length;
    document.getElementById('noticesCount').textContent = data.notices.length;
}

function loadRecentActivity() {
    const activityList = document.getElementById('activityList');
    const activities = JSON.parse(localStorage.getItem('recentActivity')) || [];
    
    activityList.innerHTML = activities.length ? 
        activities.map(activity => `
            <div class="activity-item">
                <p><strong>${activity.type}</strong> - ${activity.description}</p>
                <small>${new Date(activity.timestamp).toLocaleString()}</small>
            </div>
        `).join('') :
        '<p>No recent activity</p>';
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show corresponding section
            const targetSection = link.getAttribute('data-section');
            sections.forEach(section => {
                section.style.display = section.id === targetSection ? 'block' : 'none';
            });
            
            // Update page title
            document.getElementById('pageTitle').textContent = link.textContent;
        });
    });
}

function setupSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    
    logoutBtn.addEventListener('click', () => {
        // Clear admin session
        localStorage.removeItem('adminLoggedIn');
        // Redirect to login page
        window.location.href = 'login.html';
    });
}

// Modal functionality
function showModal(title, content) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <h2>${title}</h2>
        ${content}
    `;
    
    modal.style.display = 'block';
    
    // Close button functionality
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.style.display = 'none';
    
    // Click outside to close
    window.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Activity logging
function logActivity(type, description) {
    const activities = JSON.parse(localStorage.getItem('recentActivity')) || [];
    activities.unshift({
        type,
        description,
        timestamp: new Date().toISOString()
    });
    
    // Keep only last 10 activities
    if (activities.length > 10) {
        activities.pop();
    }
    
    localStorage.setItem('recentActivity', JSON.stringify(activities));
    loadRecentActivity();
}

// Initialize content sections
function initializeNews() {
    const addNewsBtn = document.getElementById('addNewsBtn');
    addNewsBtn.addEventListener('click', () => {
        showModal('Add News', `
            <form id="newsForm" class="admin-form">
                <div class="form-group">
                    <label for="newsTitle">Title</label>
                    <input type="text" id="newsTitle" required>
                </div>
                <div class="form-group">
                    <label for="newsContent">Content</label>
                    <textarea id="newsContent" rows="4" required></textarea>
                </div>
                <button type="submit" class="add-btn">Add News</button>
            </form>
        `);
    });
}

function initializeEvents() {
    // Similar to initializeNews
}

function initializeGallery() {
    // Similar to initializeNews
}

function initializeNotices() {
    // Similar to initializeNews
}

function initializeStaffDirectory() {
    // Similar to initializeNews
}

function initializeSettings() {
    const profileForm = document.getElementById('profileForm');
    const passwordForm = document.getElementById('passwordForm');
    
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Handle profile update
    });
    
    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Handle password change
    });
} 