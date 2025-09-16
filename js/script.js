// Main JavaScript for EV Rental System

// Global variables
let currentUser = null;
let isLoggedIn = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check if user is logged in
    checkAuthStatus();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize modals
    initializeModals();
    
    // Initialize forms
    initializeForms();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
}

// Authentication Functions
function checkAuthStatus() {
    const userData = localStorage.getItem('evRentalUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        isLoggedIn = true;
        updateNavigationForLoggedInUser();
    }
}

function updateNavigationForLoggedInUser() {
    if (!currentUser) return;
    
    const navButtons = document.querySelector('.nav-buttons');
    if (navButtons) {
        navButtons.innerHTML = `
            <div class="nav-user">
                <div class="user-dropdown">
                    <button class="user-btn">
                        <i class="fas fa-user"></i>
                        <span>${currentUser.name}</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="dropdown-menu">
                        <a href="${getDashboardUrl(currentUser.type)}">
                            <i class="fas fa-tachometer-alt"></i> Dashboard
                        </a>
                        <a href="${getProfileUrl(currentUser.type)}">
                            <i class="fas fa-user"></i> Hồ sơ
                        </a>
                        <a href="#" onclick="logout()">
                            <i class="fas fa-sign-out-alt"></i> Đăng xuất
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}

function getDashboardUrl(userType) {
    switch(userType) {
        case 'renter': return 'renter-dashboard.html';
        case 'staff': return 'staff-dashboard.html';
        case 'admin': return 'admin-dashboard.html';
        default: return 'index.html';
    }
}

function getProfileUrl(userType) {
    switch(userType) {
        case 'renter': return 'renter-profile.html';
        case 'staff': return 'staff-profile.html';
        case 'admin': return 'admin-profile.html';
        default: return '#';
    }
}

// Modal Functions
function showLoginModal() {
    closeAllModals();
    document.getElementById('loginModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function showRegisterModal() {
    closeAllModals();
    document.getElementById('registerModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

function initializeModals() {
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAllModals();
        }
    });
}

// Form Functions
function initializeForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const userType = document.getElementById('userType').value;
    
    // Simple validation
    if (!email || !password || !userType) {
        showNotification('Vui lòng điền đầy đủ thông tin', 'error');
        return;
    }
    
    // Simulate login process
    const userData = {
        id: Date.now(),
        name: getDisplayName(email),
        email: email,
        type: userType,
        loginTime: new Date().toISOString()
    };
    
    // Store user data
    localStorage.setItem('evRentalUser', JSON.stringify(userData));
    currentUser = userData;
    isLoggedIn = true;
    
    // Close modal and redirect
    closeModal('loginModal');
    showNotification('Đăng nhập thành công!', 'success');
    
    // Redirect to appropriate dashboard
    setTimeout(() => {
        window.location.href = getDashboardUrl(userType);
    }, 1000);
}

function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const userType = document.getElementById('registerUserType').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // Simple validation
    if (!name || !email || !phone || !password || !userType) {
        showNotification('Vui lòng điền đầy đủ thông tin', 'error');
        return;
    }
    
    if (!agreeTerms) {
        showNotification('Vui lòng đồng ý với điều khoản sử dụng', 'error');
        return;
    }
    
    // Simulate registration process
    const userData = {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone,
        type: userType,
        registrationTime: new Date().toISOString()
    };
    
    // Store user data
    localStorage.setItem('evRentalUser', JSON.stringify(userData));
    currentUser = userData;
    isLoggedIn = true;
    
    // Close modal and redirect
    closeModal('registerModal');
    showNotification('Đăng ký thành công!', 'success');
    
    // Redirect to appropriate dashboard
    setTimeout(() => {
        window.location.href = getDashboardUrl(userType);
    }, 1000);
}

function getDisplayName(email) {
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// Logout Function
function logout() {
    localStorage.removeItem('evRentalUser');
    currentUser = null;
    isLoggedIn = false;
    
    showNotification('Đã đăng xuất thành công!', 'success');
    
    // Redirect to home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Mobile Menu Functions
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// Smooth Scrolling Functions
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function scrollToSection(sectionId) {
    const targetSection = document.querySelector(`#${sectionId}`);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Add styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
                padding: 1rem;
                border-radius: 10px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                animation: slideInRight 0.3s ease;
            }
            
            .notification-success {
                background: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }
            
            .notification-error {
                background: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
            }
            
            .notification-info {
                background: #d1ecf1;
                color: #0c5460;
                border: 1px solid #bee5eb;
            }
            
            .notification-warning {
                background: #fff3cd;
                color: #856404;
                border: 1px solid #ffeaa7;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            
            .notification-close {
                background: none;
                border: none;
                cursor: pointer;
                margin-left: auto;
                opacity: 0.7;
                transition: opacity 0.3s ease;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date));
}

function formatTime(date) {
    return new Intl.DateTimeFormat('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date));
}

// API Simulation Functions (for demo purposes)
function simulateApiCall(delay = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, data: {} });
        }, delay);
    });
}

function getMockData(type) {
    const mockData = {
        vehicles: [
            { id: 1, name: 'VinFast VF e34', battery: 85, status: 'available', station: 'Trung tâm TP' },
            { id: 2, name: 'VinFast VF e35', battery: 78, status: 'rented', station: 'Trung tâm TP' },
            { id: 3, name: 'VinFast VF e36', battery: 45, status: 'charging', station: 'Khu đại học' },
            { id: 4, name: 'VinFast VF e37', battery: 100, status: 'maintenance', station: 'Sân bay TSN' }
        ],
        stations: [
            { id: 1, name: 'Trung tâm thành phố', address: '123 Nguyễn Huệ, Q1, TP.HCM', available: 15, total: 23 },
            { id: 2, name: 'Khu đại học', address: '456 Lê Văn Việt, Thủ Đức', available: 8, total: 13 },
            { id: 3, name: 'Sân bay Tân Sơn Nhất', address: 'Khu vực sân bay, TP.HCM', available: 25, total: 30 }
        ],
        rentals: [
            { id: 1, vehicle: 'VinFast VF e34', customer: 'Nguyễn Văn A', startTime: '2024-12-15T09:00:00', status: 'active' },
            { id: 2, vehicle: 'VinFast VF e35', customer: 'Trần Thị C', startTime: '2024-12-15T08:45:00', status: 'completed' }
        ]
    };
    
    return mockData[type] || [];
}

// Export functions for use in other scripts
window.EVRental = {
    showNotification,
    formatCurrency,
    formatDate,
    formatTime,
    getMockData,
    simulateApiCall,
    currentUser: () => currentUser,
    isLoggedIn: () => isLoggedIn
};
