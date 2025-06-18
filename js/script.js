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
