// Dashboard specific JavaScript functions

document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    // Initialize dashboard-specific features
    initializeDashboardCharts();
    initializeDashboardFilters();
    initializeDashboardActions();
    initializeRealTimeUpdates();
    
    // Load initial data
    loadDashboardData();
}

// Dashboard Data Loading
function loadDashboardData() {
    // Simulate loading data from API
    setTimeout(() => {
        updateDashboardStats();
        updateRecentActivity();
        updateVehicleStatus();
        updatePendingActions();
    }, 500);
}

function updateDashboardStats() {
    // Update stats cards with real-time data
    const statsCards = document.querySelectorAll('.stat-card');
    statsCards.forEach(card => {
        // Add loading animation
        card.classList.add('loading');
        
        setTimeout(() => {
            card.classList.remove('loading');
            // Stats would be updated with real data here
        }, 1000);
    });
}

function updateRecentActivity() {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;
    
    // Get mock activity data
    const activities = [
        {
            icon: 'fas fa-car',
            title: 'Bắt đầu thuê xe',
            description: 'VinFast VF e34 tại Trạm Trung tâm thành phố',
            time: '2 giờ trước'
        },
        {
            icon: 'fas fa-credit-card',
            title: 'Thanh toán thành công',
            description: 'Phí thuê xe: 150,000đ',
            time: '1 ngày trước'
        },
        {
            icon: 'fas fa-undo',
            title: 'Trả xe',
            description: 'VinFast VF e35 tại Trạm Khu đại học',
            time: '3 ngày trước'
        }
    ];
    
    // Update activity list
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        </div>
    `).join('');
}

function updateVehicleStatus() {
    const vehicleGrid = document.querySelector('.vehicle-grid');
    if (!vehicleGrid) return;
    
    // Get mock vehicle data
    const vehicles = window.EVRental.getMockData('vehicles');
    
    // Update vehicle cards
    vehicleGrid.innerHTML = vehicles.map(vehicle => `
        <div class="vehicle-card ${vehicle.status}">
            <div class="vehicle-icon">
                <i class="fas fa-car-battery"></i>
            </div>
            <div class="vehicle-info">
                <h4>${vehicle.name}</h4>
                <p><i class="fas fa-battery-${getBatteryIcon(vehicle.battery)}"></i> Pin: ${vehicle.battery}%</p>
                <p><i class="fas fa-map-marker-alt"></i> ${vehicle.station}</p>
                <span class="status-badge ${vehicle.status}">${getStatusText(vehicle.status)}</span>
            </div>
        </div>
    `).join('');
}

function updatePendingActions() {
    const pendingActions = document.querySelector('.pending-actions');
    if (!pendingActions) return;
    
    // Get mock pending actions
    const actions = [
        {
            urgent: true,
            icon: 'fas fa-car',
            title: 'Giao xe cho Nguyễn Văn A',
            description: 'VinFast VF e34 - Đặt trước lúc 10:00',
            time: '5 phút nữa',
            action: 'Xử lý ngay'
        },
        {
            urgent: false,
            icon: 'fas fa-undo',
            title: 'Nhận xe từ Trần Thị C',
            description: 'VinFast VF e35 - Dự kiến 11:30',
            time: '1 giờ 20 phút nữa',
            action: 'Chuẩn bị'
        },
        {
            urgent: false,
            icon: 'fas fa-battery-quarter',
            title: 'Sạc xe VF e32',
            description: 'Pin hiện tại: 15% - Cần sạc gấp',
            time: 'Đang chờ',
            action: 'Sạc ngay'
        }
    ];
    
    // Update pending actions
    pendingActions.innerHTML = actions.map(action => `
        <div class="pending-item ${action.urgent ? 'urgent' : ''}">
            <div class="pending-icon">
                <i class="${action.icon}"></i>
            </div>
            <div class="pending-content">
                <h4>${action.title}</h4>
                <p>${action.description}</p>
                <span class="pending-time">${action.time}</span>
            </div>
            <div class="pending-actions">
                <button class="btn ${action.urgent ? 'btn-primary' : 'btn-outline'} btn-sm" onclick="handlePendingAction('${action.title}')">
                    ${action.action}
                </button>
            </div>
        </div>
    `).join('');
}

// Dashboard Actions
function handlePendingAction(actionTitle) {
    window.EVRental.showNotification(`Đang xử lý: ${actionTitle}`, 'info');
    
    // Simulate action processing
    setTimeout(() => {
        window.EVRental.showNotification(`Hoàn thành: ${actionTitle}`, 'success');
        // Refresh pending actions
        updatePendingActions();
    }, 2000);
}

function initializeDashboardActions() {
    // Handle quick action clicks
    const quickActions = document.querySelectorAll('.quick-action-card');
    quickActions.forEach(action => {
        action.addEventListener('click', function(e) {
            const title = this.querySelector('h3').textContent;
            window.EVRental.showNotification(`Chuyển đến: ${title}`, 'info');
        });
    });
    
    // Handle vehicle card interactions
    document.addEventListener('click', function(e) {
        if (e.target.closest('.vehicle-card')) {
            const vehicleCard = e.target.closest('.vehicle-card');
            const vehicleName = vehicleCard.querySelector('h4').textContent;
            showVehicleDetails(vehicleName);
        }
    });
}

function showVehicleDetails(vehicleName) {
    // Create modal for vehicle details
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'vehicleModal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Chi tiết xe: ${vehicleName}</h2>
                <span class="close" onclick="closeModal('vehicleModal')">&times;</span>
            </div>
            <div class="modal-body">
                <div class="vehicle-details">
                    <div class="detail-row">
                        <strong>Tên xe:</strong>
                        <span>${vehicleName}</span>
                    </div>
                    <div class="detail-row">
                        <strong>Tình trạng pin:</strong>
                        <span>85%</span>
                    </div>
                    <div class="detail-row">
                        <strong>Trạng thái:</strong>
                        <span class="status-badge available">Có sẵn</span>
                    </div>
                    <div class="detail-row">
                        <strong>Trạm:</strong>
                        <span>Trung tâm thành phố</span>
                    </div>
                    <div class="detail-row">
                        <strong>Lần bảo dưỡng cuối:</strong>
                        <span>15/11/2024</span>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="handleVehicleAction('${vehicleName}', 'book')">
                        <i class="fas fa-calendar-plus"></i>
                        Đặt xe
                    </button>
                    <button class="btn btn-outline" onclick="closeModal('vehicleModal')">
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function handleVehicleAction(vehicleName, action) {
    closeModal('vehicleModal');
    
    switch(action) {
        case 'book':
            window.EVRental.showNotification(`Đang đặt xe: ${vehicleName}`, 'info');
            setTimeout(() => {
                window.EVRental.showNotification(`Đặt xe thành công: ${vehicleName}`, 'success');
            }, 1500);
            break;
        case 'charge':
            window.EVRental.showNotification(`Đang sạc xe: ${vehicleName}`, 'info');
            setTimeout(() => {
                window.EVRental.showNotification(`Sạc xe hoàn tất: ${vehicleName}`, 'success');
            }, 2000);
            break;
        case 'maintenance':
            window.EVRental.showNotification(`Đang bảo dưỡng xe: ${vehicleName}`, 'info');
            setTimeout(() => {
                window.EVRental.showNotification(`Bảo dưỡng hoàn tất: ${vehicleName}`, 'success');
            }, 3000);
            break;
    }
}

// Charts and Analytics
function initializeDashboardCharts() {
    // Initialize any charts if needed
    const chartContainer = document.querySelector('.chart-placeholder');
    if (chartContainer) {
        chartContainer.addEventListener('click', function() {
            showChartModal();
        });
    }
}

function showChartModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'chartModal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h2>Biểu đồ doanh thu</h2>
                <span class="close" onclick="closeModal('chartModal')">&times;</span>
            </div>
            <div class="modal-body">
                <div class="chart-container" style="height: 400px;">
                    <canvas id="revenueChart" width="400" height="200"></canvas>
                </div>
                <div class="chart-filters">
                    <select id="chartPeriod">
                        <option value="week">Tuần</option>
                        <option value="month" selected>Tháng</option>
                        <option value="quarter">Quý</option>
                        <option value="year">Năm</option>
                    </select>
                    <select id="chartType">
                        <option value="revenue">Doanh thu</option>
                        <option value="rentals">Số lượt thuê</option>
                        <option value="utilization">Tỷ lệ sử dụng</option>
                    </select>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Initialize chart (placeholder)
    setTimeout(() => {
        const canvas = document.getElementById('revenueChart');
        if (canvas) {
            drawPlaceholderChart(canvas);
        }
    }, 100);
}

function drawPlaceholderChart(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw placeholder text
    ctx.fillStyle = '#6c757d';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Biểu đồ doanh thu sẽ được hiển thị tại đây', width/2, height/2);
    
    // Draw sample chart
    ctx.strokeStyle = '#007bff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    const points = [
        {x: 50, y: height - 50},
        {x: 100, y: height - 100},
        {x: 150, y: height - 80},
        {x: 200, y: height - 120},
        {x: 250, y: height - 90},
        {x: 300, y: height - 110},
        {x: 350, y: height - 70}
    ];
    
    points.forEach((point, index) => {
        if (index === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }
    });
    
    ctx.stroke();
}

// Filters and Search
function initializeDashboardFilters() {
    // Initialize any filter functionality
    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            applyFilter(filter);
        });
    });
}

function applyFilter(filter) {
    window.EVRental.showNotification(`Áp dụng bộ lọc: ${filter}`, 'info');
    
    // Simulate filter application
    setTimeout(() => {
        updateDashboardData();
    }, 500);
}

function updateDashboardData() {
    // Refresh dashboard data based on current filters
    loadDashboardData();
}

// Real-time Updates
function initializeRealTimeUpdates() {
    // Simulate real-time updates every 30 seconds
    setInterval(() => {
        updateRealTimeData();
    }, 30000);
}

function updateRealTimeData() {
    // Update specific elements that need real-time data
    const timeElements = document.querySelectorAll('.current-time');
    timeElements.forEach(element => {
        element.textContent = new Date().toLocaleTimeString('vi-VN');
    });
    
    // Update battery levels (simulate)
    const batteryElements = document.querySelectorAll('.battery-level');
    batteryElements.forEach(element => {
        const currentLevel = parseInt(element.textContent);
        const change = Math.random() > 0.5 ? 1 : -1;
        const newLevel = Math.max(0, Math.min(100, currentLevel + change));
        element.textContent = newLevel + '%';
    });
}

// Utility Functions
function getBatteryIcon(level) {
    if (level >= 75) return 'full';
    if (level >= 50) return 'three-quarters';
    if (level >= 25) return 'half';
    if (level >= 10) return 'quarter';
    return 'empty';
}

function getStatusText(status) {
    const statusMap = {
        'available': 'Có sẵn',
        'rented': 'Đang thuê',
        'charging': 'Đang sạc',
        'maintenance': 'Bảo dưỡng',
        'unavailable': 'Không khả dụng'
    };
    return statusMap[status] || status;
}

// Export dashboard functions
window.Dashboard = {
    loadDashboardData,
    updateDashboardStats,
    updateRecentActivity,
    updateVehicleStatus,
    updatePendingActions,
    showVehicleDetails,
    handleVehicleAction,
    showChartModal,
    applyFilter,
    updateRealTimeData
};
