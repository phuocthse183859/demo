// Booking specific JavaScript functions

document.addEventListener('DOMContentLoaded', function() {
    initializeBooking();
});

function initializeBooking() {
    // Set default dates
    setDefaultDates();
    
    // Initialize form validation
    initializeFormValidation();
    
    // Initialize form submission
    initializeFormSubmission();
    
    // Initialize quick booking
    initializeQuickBooking();
}

function setDefaultDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Set minimum date to today
    const pickupDate = document.getElementById('pickupDate');
    const returnDate = document.getElementById('returnDate');
    
    if (pickupDate) {
        pickupDate.min = today.toISOString().split('T')[0];
        pickupDate.value = today.toISOString().split('T')[0];
    }
    
    if (returnDate) {
        returnDate.min = today.toISOString().split('T')[0];
        returnDate.value = tomorrow.toISOString().split('T')[0];
    }
    
    // Set default times
    const pickupTime = document.getElementById('pickupTime');
    const returnTime = document.getElementById('returnTime');
    
    if (pickupTime) {
        pickupTime.value = '09:00';
    }
    
    if (returnTime) {
        returnTime.value = '17:00';
    }
}

function initializeFormValidation() {
    const form = document.getElementById('bookingForm');
    if (!form) return;
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('change', function() {
            validateField(this);
        });
    });
    
    // Date validation
    const pickupDate = document.getElementById('pickupDate');
    const returnDate = document.getElementById('returnDate');
    
    if (pickupDate && returnDate) {
        pickupDate.addEventListener('change', function() {
            validateDateRange();
        });
        
        returnDate.addEventListener('change', function() {
            validateDateRange();
        });
    }
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    // Remove existing error styling
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Validate based on field type
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = 'Trường này là bắt buộc';
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        message = 'Email không hợp lệ';
    } else if (field.type === 'tel' && value && !isValidPhone(value)) {
        isValid = false;
        message = 'Số điện thoại không hợp lệ';
    }
    
    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
    
    return isValid;
}

function validateDateRange() {
    const pickupDate = document.getElementById('pickupDate');
    const returnDate = document.getElementById('returnDate');
    
    if (!pickupDate || !returnDate) return;
    
    const pickup = new Date(pickupDate.value);
    const returnDateValue = new Date(returnDate.value);
    
    if (returnDateValue < pickup) {
        returnDate.classList.add('error');
        window.EVRental.showNotification('Ngày trả xe phải sau ngày nhận xe', 'error');
    } else {
        returnDate.classList.remove('error');
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function initializeFormSubmission() {
    const form = document.getElementById('bookingForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleBookingSearch();
    });
}

function handleBookingSearch() {
    // Validate all fields
    const form = document.getElementById('bookingForm');
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        window.EVRental.showNotification('Vui lòng kiểm tra lại thông tin', 'error');
        return;
    }
    
    // Get form data
    const formData = {
        pickupStation: document.getElementById('pickupStation').value,
        returnStation: document.getElementById('returnStation').value,
        pickupDate: document.getElementById('pickupDate').value,
        pickupTime: document.getElementById('pickupTime').value,
        returnDate: document.getElementById('returnDate').value,
        returnTime: document.getElementById('returnTime').value,
        vehicleType: document.getElementById('vehicleType').value
    };
    
    // Show loading
    window.EVRental.showNotification('Đang tìm xe phù hợp...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        searchAvailableVehicles(formData);
    }, 1500);
}

function searchAvailableVehicles(formData) {
    // Mock vehicle data
    const mockVehicles = [
        {
            id: 1,
            name: 'VinFast VF e34',
            type: 'sedan',
            battery: 95,
            range: 300,
            price: 50000,
            station: 'Trung tâm thành phố',
            image: 'https://via.placeholder.com/300x200?text=VF+e34',
            features: ['Tự động', 'Bluetooth', 'Camera lùi', 'GPS'],
            rating: 4.8
        },
        {
            id: 2,
            name: 'VinFast VF e35',
            type: 'suv',
            battery: 88,
            range: 280,
            price: 60000,
            station: 'Trung tâm thành phố',
            image: 'https://via.placeholder.com/300x200?text=VF+e35',
            features: ['Tự động', 'Bluetooth', 'Camera 360', 'GPS', 'Hệ thống giải trí'],
            rating: 4.9
        },
        {
            id: 3,
            name: 'VinFast VF e36',
            type: 'hatchback',
            battery: 92,
            range: 250,
            price: 45000,
            station: 'Khu đại học',
            image: 'https://via.placeholder.com/300x200?text=VF+e36',
            features: ['Tự động', 'Bluetooth', 'Camera lùi'],
            rating: 4.7
        }
    ];
    
    // Filter vehicles based on search criteria
    let filteredVehicles = mockVehicles;
    
    if (formData.vehicleType) {
        filteredVehicles = filteredVehicles.filter(v => v.type === formData.vehicleType);
    }
    
    // Show results
    displayAvailableVehicles(filteredVehicles, formData);
}

function displayAvailableVehicles(vehicles, searchCriteria) {
    const availableSection = document.getElementById('availableVehicles');
    const vehiclesGrid = document.getElementById('vehiclesGrid');
    
    if (!availableSection || !vehiclesGrid) return;
    
    if (vehicles.length === 0) {
        vehiclesGrid.innerHTML = `
            <div class="no-vehicles">
                <i class="fas fa-car-battery"></i>
                <h3>Không tìm thấy xe phù hợp</h3>
                <p>Vui lòng thử lại với thông tin khác</p>
            </div>
        `;
    } else {
        vehiclesGrid.innerHTML = vehicles.map(vehicle => `
            <div class="vehicle-card" onclick="showVehicleDetails(${vehicle.id})">
                <div class="vehicle-image">
                    <img src="${vehicle.image}" alt="${vehicle.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                    <div class="vehicle-badge">
                        <span class="battery-level">${vehicle.battery}%</span>
                    </div>
                </div>
                <div class="vehicle-info">
                    <h3>${vehicle.name}</h3>
                    <p class="vehicle-type">${getVehicleTypeText(vehicle.type)}</p>
                    <div class="vehicle-features">
                        <span><i class="fas fa-battery-three-quarters"></i> ${vehicle.range}km</span>
                        <span><i class="fas fa-star"></i> ${vehicle.rating}</span>
                    </div>
                    <div class="vehicle-price">
                        <span class="price">${window.EVRental.formatCurrency(vehicle.price)}/giờ</span>
                    </div>
                    <button class="btn btn-primary btn-full">
                        <i class="fas fa-calendar-plus"></i>
                        Đặt xe
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    availableSection.style.display = 'block';
    availableSection.scrollIntoView({ behavior: 'smooth' });
    
    window.EVRental.showNotification(`Tìm thấy ${vehicles.length} xe phù hợp`, 'success');
}

function getVehicleTypeText(type) {
    const typeMap = {
        'sedan': 'Sedan',
        'suv': 'SUV',
        'hatchback': 'Hatchback'
    };
    return typeMap[type] || type;
}

function showVehicleDetails(vehicleId) {
    // Mock vehicle details
    const vehicleDetails = {
        1: {
            id: 1,
            name: 'VinFast VF e34',
            type: 'sedan',
            battery: 95,
            range: 300,
            price: 50000,
            station: 'Trung tâm thành phố',
            features: ['Tự động', 'Bluetooth', 'Camera lùi', 'GPS'],
            rating: 4.8,
            description: 'Xe sedan điện VinFast VF e34 với thiết kế hiện đại và công nghệ tiên tiến.',
            specifications: {
                'Tốc độ tối đa': '150 km/h',
                'Tăng tốc 0-100km/h': '8.5s',
                'Sạc nhanh': '30 phút (80%)',
                'Sạc thường': '6 giờ (100%)'
            }
        }
    };
    
    const vehicle = vehicleDetails[vehicleId];
    if (!vehicle) return;
    
    const modal = document.getElementById('vehicleModal');
    const vehicleDetailsDiv = document.getElementById('vehicleDetails');
    
    if (!modal || !vehicleDetailsDiv) return;
    
    vehicleDetailsDiv.innerHTML = `
        <div class="vehicle-detail-content">
            <div class="vehicle-detail-header">
                <div class="vehicle-detail-image">
                    <img src="https://via.placeholder.com/400x250?text=${encodeURIComponent(vehicle.name)}" alt="${vehicle.name}">
                </div>
                <div class="vehicle-detail-info">
                    <h2>${vehicle.name}</h2>
                    <p class="vehicle-type">${getVehicleTypeText(vehicle.type)}</p>
                    <div class="vehicle-rating">
                        <i class="fas fa-star"></i>
                        <span>${vehicle.rating}/5.0</span>
                    </div>
                    <div class="vehicle-price-large">
                        ${window.EVRental.formatCurrency(vehicle.price)}/giờ
                    </div>
                </div>
            </div>
            
            <div class="vehicle-detail-sections">
                <div class="detail-section">
                    <h3>Thông tin chung</h3>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <i class="fas fa-battery-full"></i>
                            <span>Pin: ${vehicle.battery}%</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-route"></i>
                            <span>Tầm hoạt động: ${vehicle.range}km</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Trạm: ${vehicle.station}</span>
                        </div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3>Tính năng</h3>
                    <div class="features-list">
                        ${vehicle.features.map(feature => `
                            <span class="feature-tag">
                                <i class="fas fa-check"></i>
                                ${feature}
                            </span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3>Thông số kỹ thuật</h3>
                    <div class="specifications">
                        ${Object.entries(vehicle.specifications).map(([key, value]) => `
                            <div class="spec-item">
                                <strong>${key}:</strong>
                                <span>${value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3>Mô tả</h3>
                    <p>${vehicle.description}</p>
                </div>
            </div>
            
            <div class="vehicle-detail-actions">
                <button class="btn btn-outline" onclick="closeModal('vehicleModal')">
                    <i class="fas fa-times"></i>
                    Đóng
                </button>
                <button class="btn btn-primary" onclick="bookVehicle(${vehicle.id})">
                    <i class="fas fa-calendar-plus"></i>
                    Đặt xe ngay
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function bookVehicle(vehicleId) {
    closeModal('vehicleModal');
    
    // Get current booking form data
    const formData = {
        pickupStation: document.getElementById('pickupStation').value,
        returnStation: document.getElementById('returnStation').value,
        pickupDate: document.getElementById('pickupDate').value,
        pickupTime: document.getElementById('pickupTime').value,
        returnDate: document.getElementById('returnDate').value,
        returnTime: document.getElementById('returnTime').value
    };
    
    // Calculate estimated cost
    const estimatedCost = calculateEstimatedCost(formData);
    
    // Show booking confirmation modal
    showBookingConfirmation(vehicleId, formData, estimatedCost);
}

function calculateEstimatedCost(formData) {
    const pickupDateTime = new Date(`${formData.pickupDate}T${formData.pickupTime}`);
    const returnDateTime = new Date(`${formData.returnDate}T${formData.returnTime}`);
    
    const diffMs = returnDateTime - pickupDateTime;
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
    
    // Base price per hour
    const basePrice = 50000;
    const totalCost = diffHours * basePrice;
    
    return {
        hours: diffHours,
        basePrice: basePrice,
        totalCost: totalCost
    };
}

function showBookingConfirmation(vehicleId, formData, costInfo) {
    const modal = document.getElementById('bookingModal');
    const summaryDiv = document.getElementById('bookingSummary');
    
    if (!modal || !summaryDiv) return;
    
    summaryDiv.innerHTML = `
        <div class="booking-summary">
            <h3>Tóm tắt đặt xe</h3>
            
            <div class="summary-section">
                <h4>Thông tin xe</h4>
                <p><strong>Xe:</strong> VinFast VF e34</p>
                <p><strong>Trạm nhận:</strong> ${getStationName(formData.pickupStation)}</p>
                <p><strong>Trạm trả:</strong> ${getStationName(formData.returnStation)}</p>
            </div>
            
            <div class="summary-section">
                <h4>Thời gian thuê</h4>
                <p><strong>Nhận xe:</strong> ${formatDateTime(formData.pickupDate, formData.pickupTime)}</p>
                <p><strong>Trả xe:</strong> ${formatDateTime(formData.returnDate, formData.returnTime)}</p>
                <p><strong>Thời gian:</strong> ${costInfo.hours} giờ</p>
            </div>
            
            <div class="summary-section">
                <h4>Chi phí</h4>
                <div class="cost-breakdown">
                    <div class="cost-item">
                        <span>Phí thuê xe (${costInfo.hours} giờ × ${window.EVRental.formatCurrency(costInfo.basePrice)})</span>
                        <span>${window.EVRental.formatCurrency(costInfo.totalCost)}</span>
                    </div>
                    <div class="cost-item">
                        <span>Phí bảo hiểm</span>
                        <span>${window.EVRental.formatCurrency(50000)}</span>
                    </div>
                    <div class="cost-item total">
                        <span><strong>Tổng cộng</strong></span>
                        <span><strong>${window.EVRental.formatCurrency(costInfo.totalCost + 50000)}</strong></span>
                    </div>
                </div>
            </div>
            
            <div class="terms-notice">
                <p><i class="fas fa-info-circle"></i> Bạn sẽ nhận được email xác nhận đặt xe trong vòng 5 phút.</p>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function getStationName(stationId) {
    const stationNames = {
        'station1': 'Trung tâm thành phố',
        'station2': 'Khu đại học',
        'station3': 'Sân bay TSN',
        'same': 'Cùng điểm nhận'
    };
    return stationNames[stationId] || stationId;
}

function formatDateTime(date, time) {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function confirmBooking() {
    closeModal('bookingModal');
    
    window.EVRental.showNotification('Đang xử lý đặt xe...', 'info');
    
    // Simulate booking process
    setTimeout(() => {
        window.EVRental.showNotification('Đặt xe thành công! Bạn sẽ nhận email xác nhận sớm.', 'success');
        
        // Reset form
        resetBookingForm();
        
        // Hide available vehicles section
        const availableSection = document.getElementById('availableVehicles');
        if (availableSection) {
            availableSection.style.display = 'none';
        }
    }, 2000);
}

function resetBookingForm() {
    const form = document.getElementById('bookingForm');
    if (form) {
        form.reset();
        setDefaultDates();
    }
    
    // Remove error styling
    const errorElements = form.querySelectorAll('.error');
    errorElements.forEach(el => el.classList.remove('error'));
    
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(el => el.remove());
}

function initializeQuickBooking() {
    // Quick booking functionality is handled by onclick attributes in HTML
}

function quickBook(stationId) {
    // Pre-fill form with quick booking data
    const pickupStation = document.getElementById('pickupStation');
    const returnStation = document.getElementById('returnStation');
    
    if (pickupStation) {
        pickupStation.value = stationId;
    }
    
    if (returnStation) {
        returnStation.value = 'same';
    }
    
    // Set pickup time to current time + 30 minutes
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    
    const pickupTime = document.getElementById('pickupTime');
    if (pickupTime) {
        pickupTime.value = now.toTimeString().slice(0, 5);
    }
    
    // Set return time to current time + 2 hours
    const returnTime = new Date(now);
    returnTime.setHours(returnTime.getHours() + 2);
    
    const returnTimeInput = document.getElementById('returnTime');
    if (returnTimeInput) {
        returnTimeInput.value = returnTime.toTimeString().slice(0, 5);
    }
    
    // Submit form automatically
    setTimeout(() => {
        handleBookingSearch();
    }, 500);
    
    window.EVRental.showNotification('Đang tìm xe có sẵn tại trạm...', 'info');
}

// Export booking functions
window.Booking = {
    searchAvailableVehicles,
    showVehicleDetails,
    bookVehicle,
    confirmBooking,
    quickBook,
    resetBookingForm
};
