window.addEventListener("scroll", function() {
    let navbar = document.querySelector("nav");
    if (window.scrollY > 50) { 
        navbar.classList.add("shrink");
    } else {
        navbar.classList.remove("shrink");
    }
});

// ✅ Ensure Hamburger Menu Works
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".hamburger-menu");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const closeButton = document.querySelector(".close-btn");

    function toggleMenu() {
        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");
    }

    if (menuButton && closeButton && overlay) {
        menuButton.addEventListener("click", toggleMenu);
        closeButton.addEventListener("click", toggleMenu);
        overlay.addEventListener("click", toggleMenu);
    }

    // ✅ Call `displayProjects()` only after the DOM is loaded
    displayProjects();
});

function openPopup() {
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// 🎯 Display Projects from localStorage
function displayProjects() {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    const display = document.getElementById("projectsDisplay");

    if (!display) return; // ✅ Prevent errors if element doesn't exist

    display.innerHTML = projects.length > 0
        ? projects.map(project => `
            <div class="project-card">
                <h3>${project.title}</h3>
                <img src="${project.image}" width="300">
                <p>${project.description}</p>
                ${project.video ? `<iframe src="${project.video}" width="300" height="200"></iframe>` : ""}
            </div>
          `).join("")
        : "<p>No projects uploaded yet.</p>";
}
