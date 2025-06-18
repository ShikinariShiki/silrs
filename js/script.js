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
