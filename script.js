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

document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".hamburger-menu");
    const closeButton = document.querySelector(".close-btn");
    const overlay = document.getElementById("overlay");

    function toggleMenu() {
        document.getElementById("sidebar").classList.toggle("active");
        overlay.classList.toggle("active");
    }

    menuButton.addEventListener("click", toggleMenu);
    closeButton.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);
});

function openPopup() {
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// 🌟 Upload Image to Cloudinary
async function uploadImage() {
    const fileInput = document.getElementById("imageInput");
    const file = fileInput.files[0];
    const title = document.getElementById("projectTitle").value.trim();
    const description = document.getElementById("projectDescription").value.trim();
    const video = document.getElementById("videoEmbed").value.trim();

    if (!file) {
        alert("Please select an image!");
        return;
    }

    if (!title || !description) {
        alert("Title and Description are required!");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mindcrafts_upload"); // Replace with your actual preset

    try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dqxpsa3ds/image/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        if (!data.secure_url) {
            throw new Error("Failed to get image URL from Cloudinary");
        }

        const imageUrl = data.secure_url;

        // 🎯 Display uploaded image
        const uploadedImage = document.getElementById("uploadedImage");
        uploadedImage.src = imageUrl;
        uploadedImage.style.display = "block";

        // 🌟 Store project data in localStorage
        let projects = JSON.parse(localStorage.getItem("projects")) || [];
        projects.push({
            title: title,
            description: description,
            image: imageUrl,
            video: video
        });

        localStorage.setItem("projects", JSON.stringify(projects));

        alert("Project uploaded successfully!");

    } catch (error) {
        console.error("Upload failed:", error);
        alert("Upload failed. Please try again.");
    }
}
