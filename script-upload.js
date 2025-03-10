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
