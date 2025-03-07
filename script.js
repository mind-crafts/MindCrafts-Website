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

    if (menuButton && sidebar) { // Ensure elements exist to avoid errors
        menuButton.addEventListener("click", function () {
            sidebar.classList.toggle("active");
            menuButton.classList.toggle("active"); // Fix: Toggle active state on the button
        });
    }
});
