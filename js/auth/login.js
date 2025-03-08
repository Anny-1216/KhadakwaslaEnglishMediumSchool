class AuthManager {
    constructor() {
        this.currentRole = null;
        this.setupEventListeners();
        this.initializeUsers();
    }

    initializeUsers() {
        // Initialize default users if not exists
        if (!localStorage.getItem('users')) {
            const defaultUsers = {
                students: [
                    {
                        id: 'STU001',
                        password: 'student123',
                        name: 'John Doe',
                        class: '8th',
                        section: 'A',
                        rollNo: '01'
                    },
                    {
                        id: 'STU002',
                        password: 'student123',
                        name: 'Jane Smith',
                        class: '7th',
                        section: 'B',
                        rollNo: '02'
                    },
                    {
                        id: 'STU003',
                        password: 'student123',
                        name: 'Mike Johnson',
                        class: '8th',
                        section: 'A',
                        rollNo: '03'
                    },
                    {
                        id: 'STU004',
                        password: 'student123',
                        name: 'Sarah Williams',
                        class: '6th',
                        section: 'C',
                        rollNo: '04'
                    },
                    {
                        id: 'STU005',
                        password: 'student123',
                        name: 'David Brown',
                        class: '7th',
                        section: 'A',
                        rollNo: '05'
                    },
                    {
                        id: 'STU006',
                        password: 'student123',
                        name: 'Emily Davis',
                        class: '8th',
                        section: 'B',
                        rollNo: '06'
                    },
                    {
                        id: 'STU007',
                        password: 'student123',
                        name: 'Alex Turner',
                        class: '6th',
                        section: 'A',
                        rollNo: '07'
                    },
                    {
                        id: 'STU008',
                        password: 'student123',
                        name: 'Lisa Anderson',
                        class: '7th',
                        section: 'C',
                        rollNo: '08'
                    },
                    {
                        id: 'STU009',
                        password: 'student123',
                        name: 'Ryan Miller',
                        class: '8th',
                        section: 'A',
                        rollNo: '09'
                    },
                    {
                        id: 'STU010',
                        password: 'student123',
                        name: 'Emma Wilson',
                        class: '6th',
                        section: 'B',
                        rollNo: '10'
                    }
                ],
                faculty: [
                    {
                        id: 'FAC001',
                        password: 'faculty123',
                        name: 'Prof. Jane Smith',
                        department: 'Science',
                        role: 'Senior Teacher',
                        subjects: ['Physics', 'Chemistry']
                    },
                    {
                        id: 'FAC002',
                        password: 'faculty123',
                        name: 'Prof. Robert Johnson',
                        department: 'Mathematics',
                        role: 'Head of Department',
                        subjects: ['Mathematics']
                    },
                    {
                        id: 'FAC003',
                        password: 'faculty123',
                        name: 'Prof. Mary Williams',
                        department: 'English',
                        role: 'Senior Teacher',
                        subjects: ['English Literature', 'Grammar']
                    },
                    {
                        id: 'FAC004',
                        password: 'faculty123',
                        name: 'Prof. David Brown',
                        department: 'Social Studies',
                        role: 'Teacher',
                        subjects: ['History', 'Geography']
                    },
                    {
                        id: 'FAC005',
                        password: 'faculty123',
                        name: 'Prof. Sarah Davis',
                        department: 'Science',
                        role: 'Teacher',
                        subjects: ['Biology']
                    },
                    {
                        id: 'FAC006',
                        password: 'faculty123',
                        name: 'Prof. Michael Wilson',
                        department: 'Computer Science',
                        role: 'Head of Department',
                        subjects: ['Computer Science', 'Programming']
                    },
                    {
                        id: 'FAC007',
                        password: 'faculty123',
                        name: 'Prof. Elizabeth Taylor',
                        department: 'Arts',
                        role: 'Teacher',
                        subjects: ['Art', 'Craft']
                    },
                    {
                        id: 'FAC008',
                        password: 'faculty123',
                        name: 'Prof. Thomas Anderson',
                        department: 'Physical Education',
                        role: 'Sports Coach',
                        subjects: ['Physical Education']
                    },
                    {
                        id: 'FAC009',
                        password: 'faculty123',
                        name: 'Prof. Patricia Martin',
                        department: 'Music',
                        role: 'Teacher',
                        subjects: ['Music']
                    },
                    {
                        id: 'FAC010',
                        password: 'faculty123',
                        name: 'Prof. James Wilson',
                        department: 'Mathematics',
                        role: 'Teacher',
                        subjects: ['Mathematics']
                    }
                ]
            };
            localStorage.setItem('users', JSON.stringify(defaultUsers));
        }
    }

    setupEventListeners() {
        // Role selection buttons
        const roleBtns = document.querySelectorAll('.role-btn');
        roleBtns.forEach(btn => {
            btn.addEventListener('click', () => this.handleRoleSelection(btn));
        });

        // Back button
        const backBtn = document.getElementById('backToRole');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.showRoleSelection());
        }

        // Form submissions
        const studentForm = document.getElementById('studentLoginForm');
        const facultyForm = document.getElementById('facultyLoginForm');

        if (studentForm) {
            studentForm.addEventListener('submit', (e) => this.handleStudentLogin(e));
        }
        if (facultyForm) {
            facultyForm.addEventListener('submit', (e) => this.handleFacultyLogin(e));
        }
    }

    handleRoleSelection(btn) {
        // Remove selected class from all buttons
        document.querySelectorAll('.role-btn').forEach(button => {
            button.classList.remove('selected');
        });

        // Add selected class to clicked button
        btn.classList.add('selected');

        // Store selected role
        this.currentRole = btn.getAttribute('data-role');

        // Show login form after a short delay
        setTimeout(() => {
            this.showLoginForm();
        }, 300);
    }

    showLoginForm() {
        // Hide role selection, show login form
        document.getElementById('roleSelection').classList.remove('active');
        document.getElementById('loginForm').classList.add('active');

        // Show appropriate form based on role
        const studentForm = document.getElementById('studentLoginForm');
        const facultyForm = document.getElementById('facultyLoginForm');

        if (this.currentRole === 'student') {
            studentForm.style.display = 'block';
            facultyForm.style.display = 'none';
        } else {
            facultyForm.style.display = 'block';
            studentForm.style.display = 'none';
        }
    }

    showRoleSelection() {
        // Hide login form, show role selection
        document.getElementById('loginForm').classList.remove('active');
        document.getElementById('roleSelection').classList.add('active');

        // Reset forms
        document.getElementById('studentLoginForm').reset();
        document.getElementById('facultyLoginForm').reset();

        // Clear any error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());

        // Reset role buttons
        document.querySelectorAll('.role-btn').forEach(btn => {
            btn.classList.remove('selected');
        });

        this.currentRole = null;
    }

    handleStudentLogin(e) {
        e.preventDefault();
        const studentId = document.getElementById('studentId').value;
        const password = document.getElementById('studentPassword').value;

        const users = JSON.parse(localStorage.getItem('users'));
        const student = users.students.find(s => s.id === studentId);

        if (student && student.password === password) {
            // Show loading state
            const submitBtn = e.target.querySelector('.login-btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            submitBtn.disabled = true;

            // Store login session
            localStorage.setItem('currentUser', JSON.stringify({
                type: 'student',
                ...student
            }));
            
            // Redirect to student dashboard after a short delay
            setTimeout(() => {
                window.location.href = 'crms/student-dashboard.html';
            }, 1000);
        } else {
            this.showError('Invalid student ID or password');
        }
    }

    handleFacultyLogin(e) {
        e.preventDefault();
        const facultyId = document.getElementById('facultyId').value;
        const password = document.getElementById('facultyPassword').value;

        const users = JSON.parse(localStorage.getItem('users'));
        const faculty = users.faculty.find(f => f.id === facultyId);

        if (faculty && faculty.password === password) {
            // Show loading state
            const submitBtn = e.target.querySelector('.login-btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            submitBtn.disabled = true;

            // Store login session
            localStorage.setItem('currentUser', JSON.stringify({
                type: 'faculty',
                ...faculty
            }));
            
            // Redirect to faculty dashboard after a short delay
            setTimeout(() => {
                window.location.href = 'crms/faculty-dashboard.html';
            }, 1000);
        } else {
            this.showError('Invalid faculty ID or password');
        }
    }

    showError(message) {
        // Create error element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;

        // Show error message
        const activeForm = this.currentRole === 'student' 
            ? document.getElementById('studentLoginForm')
            : document.getElementById('facultyLoginForm');
            
        const existingError = activeForm.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        activeForm.insertBefore(errorDiv, activeForm.firstChild);

        // Remove error after 3 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    static logout() {
        localStorage.removeItem('currentUser');
        window.location.href = '../login.html';
    }

    static checkAuth() {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            window.location.href = '../login.html';
        }
        return JSON.parse(currentUser);
    }
}

// Initialize authentication
const auth = new AuthManager(); 