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

document.addEventListener("DOMContentLoaded", function () {
    let lastScrollTop = 0;
    const navbar = document.querySelector("nav");
    const secondaryNavbar = document.querySelector(".secondary-navbar");

    window.addEventListener("scroll", function () {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down - Minimize Navbars
            navbar.classList.add("shrink");
            secondaryNavbar.classList.add("shrink-secondary");
        } else {
            // Scrolling up - Restore Navbars
            navbar.classList.remove("shrink");
            secondaryNavbar.classList.remove("shrink-secondary");
        }

        scrollTop > lastScrollTop <= 0 ? 0 : scrollTop;
    });
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
    const projects = [
        {
            title: "Pencil Holder",
            image: "images/pencilholder.png",  // Add actual preview image
            link: "https://www.facebook.com/share/p/18YxYm7ak6/"
        },
    ];

    const display = document.getElementById("homepageProjectsDisplay");

    if (!display) return; // Prevents errors if the element doesn't exist

    if (projects.length === 0) {
        display.innerHTML = "<p>No projects uploaded yet.</p>";
        return;
    }

    display.innerHTML = projects.map(project => `
        <div class="project-card">
            <a href="${project.link}" target="_blank">
                <h3>${project.title}</h3>
                <img src="${project.image}" width="250" alt="${project.title}">
            </a>
        </div>
    `).join("");
}

// ✅ Call this function when homepage loads
window.onload = displayHomepageProjects;

document.querySelectorAll('.video-container').forEach(container => {
    container.addEventListener('click', () => {
        const video = container.querySelector('video');
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });
});

function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'flex'; // Adjusted to 'flex' for centering
    }
}

function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'none';
    }
}
