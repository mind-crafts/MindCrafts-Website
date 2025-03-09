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
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get("id");

    function toggleMenu() {
        const sidebar = document.getElementById("sidebar");
        const overlay = document.getElementById("overlay");
        
        sidebar.classList.toggle("active");  // Show/hide sidebar
        overlay.classList.toggle("active");  // Show/hide overlay
    }

    if (projectId) {
        fetch("projects.json")
            .then(response => response.json())
            .then(data => {
                const project = data.find(p => p.id === projectId);
                if (project) {
                    document.title = project.name;
                    document.getElementById("project-name").textContent = project.name;
                    document.getElementById("project-image").src = project.image;
                    document.getElementById("project-description").innerHTML = project.description;
                    document.getElementById("project-tutorial").innerHTML = project.tutorial;
                    document.getElementById("project-video").src = project.video;
                } else {
                    document.querySelector("main").innerHTML = "<h1>Project Not Found</h1>";
                }
    }

    menuButton.addEventListener("click", toggleMenu);  // Open sidebar
    closeButton.addEventListener("click", toggleMenu); // Close sidebar
    overlay.addEventListener("click", toggleMenu);     // Click outside to close
});

function openPopup() {
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}
