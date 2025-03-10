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

function displayHomepageProjects() {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    const display = document.getElementById("homepageProjectsDisplay");

    if (!display) return; // Prevents errors if the element doesn't exist

    if (projects.length === 0) {
        display.innerHTML = "<p>No projects uploaded yet.</p>";
        return;
    }

    // Show only the **latest** 3 projects
    display.innerHTML = projects.slice(-3).reverse().map(project => `
        <div class="project-card">
            <h3>${project.title}</h3>
            <img src="${project.image}" width="250" alt="${project.title}">
            <p>${project.description}</p>
            ${project.video ? `<iframe src="${project.video}" width="250" height="150"></iframe>` : ""}
        </div>
    `).join("");
}

// ✅ Call this function when homepage loads
window.onload = displayHomepageProjects;


