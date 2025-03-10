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
function uploadImage() {
    const title = document.getElementById("projectTitle").value;
    const description = document.getElementById("projectDescription").value;
    const video = document.getElementById("videoEmbed").value;
    const imageInput = document.getElementById("imageInput");

    if (!title || !description || !imageInput.files.length) {
        alert("Please fill in all required fields.");
        return;
    }

    const formData = new FormData();
    formData.append("file", imageInput.files[0]);
    formData.append("upload_preset", "mindcrafts_upload"); // Replace with your Cloudinary preset

    fetch("https://api.cloudinary.com/v1_1/dqxpsa3ds/image/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const imageUrl = data.secure_url; // Get the uploaded image URL

        // ✅ Save project details in localStorage
        let projects = JSON.parse(localStorage.getItem("projects")) || [];
        projects.push({ title, description, video, image: imageUrl });
        localStorage.setItem("projects", JSON.stringify(projects));

        alert("Project uploaded successfully!");
        displayProjects(); // ✅ Refresh the project display after upload
    })
    .catch(error => console.error("Error uploading image:", error));
}

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

// ✅ Function to display projects from localStorage
function displayProjects() {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    const display = document.getElementById("projectsDisplay");

    if (!display) return; // Prevents errors if the element doesn't exist

    if (projects.length === 0) {
        display.innerHTML = "<p>No projects uploaded yet.</p>";
        return;
    }

    // ✅ Display projects dynamically
    display.innerHTML = projects.map(project => `
        <div class="project-card">
            <h3>${project.title}</h3>
            <img src="${project.image}" width="300">
            <p>${project.description}</p>
            ${project.video ? `<iframe src="${project.video}" width="300" height="200"></iframe>` : ""}
        </div>
    `).join("");
}

// ✅ Call displayProjects() when page loads
window.onload = displayProjects;
