window.addEventListener("scroll", function() {
    let navbar = document.querySelector("nav");
    if (window.scrollY > 50) { // Adjust threshold
        navbar.classList.add("shrink");
    } else {
        navbar.classList.remove("shrink");
    }
});

// Hamburger Menu Functionality
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".hamburger-menu");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector("#overlay");
    const closeButton = document.querySelector(".close-btn");

    function toggleMenu() {
        const sidebar = document.getElementById("sidebar");
        const overlay = document.getElementById("overlay");
        
        sidebar.classList.toggle("active");  // Show/hide sidebar
        overlay.classList.toggle("active");  // Show/hide overlay
    }

    menuButton.addEventListener("click", toggleMenu);  // Open sidebar
    closeButton.addEventListener("click", toggleMenu); // Close sidebar
    overlay.addEventListener("click", toggleMenu);     // Click outside to close
});

function openPopup() {
    let popup = document.getElementById("popup");
    popup.style.display = "flex"; // Ensures proper flex centering
}

function closePopup() {
    let popup = document.getElementById("popup");
    popup.style.display = "none"; // Hides popup when closing
}

window.onload = function() {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    const display = document.getElementById("projectsDisplay");

if (display) { // ✅ Only execute if the element exists
    display.innerHTML = projects.length > 0
        ? projects.map(project => `
            <div class="project">
                <h3>${project.title}</h3>
                <img src="${project.image}" width="300">
                <p>${project.description}</p>
                ${project.video ? `<iframe src="${project.video}" width="300" height="200"></iframe>` : ""}
            </div>
          `).join("")
        : "<p>No projects uploaded yet.</p>";
}
    
