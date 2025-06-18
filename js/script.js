// Splash Screen Animation and Redirect
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the index page (splash screen)
    const splashScreen = document.getElementById('splashScreen');
    
    if (splashScreen) {
        // Prevent scrolling during splash screen
        document.body.style.overflow = 'hidden';
        
        // Logo animation
        const logoImage = document.getElementById('logoImage');
        if (logoImage) {
            logoImage.style.transform = 'scale(0.8)';
            logoImage.style.opacity = '0';
            
            setTimeout(() => {
                logoImage.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                logoImage.style.transform = 'scale(1)';
                logoImage.style.opacity = '1';
            }, 200);
        }
        
        // Auto redirect to dashboard after 3 seconds
        setTimeout(() => {
            splashScreen.style.transition = 'opacity 0.5s ease-in-out';
            splashScreen.style.opacity = '0';
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 500);
        }, 3000);
        
        // Optional: Allow tap to skip splash screen
        splashScreen.addEventListener('click', function() {
            splashScreen.style.transition = 'opacity 0.3s ease-in-out';
            splashScreen.style.opacity = '0';
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 300);
        });
    }
});

// click calendar
document.querySelectorAll(".calendar-grid .date-number").forEach(function(el) {
  el.addEventListener("click", function() {
    document.querySelectorAll(".calendar-grid .date-number").forEach(function(item) {
      item.classList.remove("selected");
    });
    el.classList.add("selected");
  });
});

// click filter
document.querySelectorAll(".filter-pills .filter-btn").forEach(function(el) {
  el.addEventListener("click", function() {
    document.querySelectorAll(".filter-pills .filter-btn").forEach(function(item) {
      item.classList.remove("active");
    });
    el.classList.add("active");
  });
});

//login ke dashboard
document.getElementById('login-btn').addEventListener("click", function(e) {
  e.preventDefault();
  window.location.replace("dashboard.html");
});

// Notification Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create notification popup structure
    const notificationPopup = document.createElement('div');
    notificationPopup.id = 'notificationPopup';
    notificationPopup.className = 'notification-popup';
    notificationPopup.innerHTML = `
        <div class="notification-header">
            <h3>Notifikasi</h3>
            <button class="close-btn" id="closeNotification">&times;</button>
        </div>
        <div class="notification-content">
            <div class="notification-item">
                <div class="notification-icon">
                    <i class="fa-solid fa-calendar-check"></i>
                </div>
                <div class="notification-text">
                    <p class="notification-title">Jadwal Pemeriksaan</p>
                    <p class="notification-desc">Anda memiliki jadwal pemeriksaan besok pukul 08:00 WIB</p>
                    <span class="notification-time">5 menit yang lalu</span>
                </div>
            </div>
            <div class="notification-item">
                <div class="notification-icon">
                    <i class="fa-solid fa-flask"></i>
                </div>
                <div class="notification-text">
                    <p class="notification-title">Hasil Lab Tersedia</p>
                    <p class="notification-desc">Hasil pemeriksaan darah lengkap sudah tersedia</p>
                    <span class="notification-time">2 jam yang lalu</span>
                </div>
            </div>
            <div class="notification-item">
                <div class="notification-icon">
                    <i class="fa-solid fa-user-doctor"></i>
                </div>
                <div class="notification-text">
                    <p class="notification-title">Konsultasi Dokter</p>
                    <p class="notification-desc">Dr. Sarah ingin menjadwalkan konsultasi lanjutan</p>
                    <span class="notification-time">1 hari yang lalu</span>
                </div>
            </div>
        </div>
        <div class="notification-footer">
            <button class="mark-all-read">Tandai Semua Sudah Dibaca</button>
        </div>
    `;
    
    // Add popup to body
    document.body.appendChild(notificationPopup);
    
    // Add CSS styles for notification popup
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification-popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.9);
            width: 90%;
            max-width: 400px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            max-height: 80vh;
            overflow: hidden;
        }
        
        .notification-popup.show {
            opacity: 1;
            visibility: visible;
            transform: translate(-50%, -50%) scale(1);
        }
        
        .notification-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .notification-overlay.show {
            opacity: 1;
            visibility: visible;
        }
        
        .notification-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #eee;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 15px 15px 0 0;
        }
        
        .notification-header h3 {
            margin: 0;
            font-size: 1.2em;
            font-weight: 600;
        }
        
        .close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 1.5em;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.2s ease;
        }
        
        .close-btn:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }
        
        .notification-content {
            max-height: 350px;
            overflow-y: auto;
            padding: 10px 0;
        }
        
        .notification-item {
            display: flex;
            align-items: flex-start;
            padding: 15px 20px;
            border-bottom: 1px solid #f0f0f0;
            transition: background-color 0.2s ease;
        }
        
        .notification-item:hover {
            background-color: #f8f9fa;
        }
        
        .notification-item:last-child {
            border-bottom: none;
        }
        
        .notification-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            margin-right: 15px;
            flex-shrink: 0;
        }
        
        .notification-icon i {
            font-size: 1em;
        }
        
        .notification-text {
            flex: 1;
        }
        
        .notification-title {
            font-weight: 600;
            color: #333;
            margin: 0 0 5px 0;
            font-size: 0.95em;
        }
        
        .notification-desc {
            color: #666;
            margin: 0 0 5px 0;
            font-size: 0.85em;
            line-height: 1.4;
        }
        
        .notification-time {
            color: #999;
            font-size: 0.75em;
        }
        
        .notification-footer {
            padding: 15px 20px;
            border-top: 1px solid #eee;
        }
        
        .mark-all-read {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 0.9em;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .mark-all-read:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        
        .bell-notification {
            position: relative;
        }
        
        .bell-notification::after {
            content: '';
            position: absolute;
            top: -2px;
            right: -2px;
            width: 8px;
            height: 8px;
            background: #ff4757;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.2);
                opacity: 0.7;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    
    document.head.appendChild(notificationStyles);
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'notificationOverlay';
    overlay.className = 'notification-overlay';
    document.body.appendChild(overlay);
    
    // Bell icon click handler
    const bellIcon = document.querySelector('.fa-bell');
    if (bellIcon) {
        // Add notification indicator to bell
        bellIcon.parentElement.classList.add('bell-notification');
        
        bellIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showNotification();
        });
    }
    
    // Close notification handlers
    document.getElementById('closeNotification').addEventListener('click', hideNotification);
    overlay.addEventListener('click', hideNotification);
    
    // Mark all as read handler
    document.querySelector('.mark-all-read').addEventListener('click', function() {
        // Remove notification indicator
        if (bellIcon) {
            bellIcon.parentElement.classList.remove('bell-notification');
        }
        
        // Show success message
        this.textContent = 'Semua notifikasi sudah dibaca';
        this.style.background = '#2ed573';
        
        setTimeout(() => {
            hideNotification();
            setTimeout(() => {
                this.textContent = 'Tandai Semua Sudah Dibaca';
                this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }, 300);
        }, 1000);
    });
    
    // Functions to show/hide notification
    function showNotification() {
        overlay.classList.add('show');
        notificationPopup.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    function hideNotification() {
        overlay.classList.remove('show');
        notificationPopup.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && notificationPopup.classList.contains('show')) {
            hideNotification();
        }
    });
});
