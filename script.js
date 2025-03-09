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

// Cloudinary Upload Function
async function uploadImage() {
    const fileInput = document.getElementById("imageInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select an image!");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mindcrafts_upload"); // Replace with your Cloudinary preset
    formData.append("cloud_name", "dqxpsa3ds"); // Replace with your Cloudinary cloud name

    try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dqxpsa3ds/image/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        const imageUrl = data.secure_url;

        // Display uploaded image
        const uploadedImage = document.getElementById("uploadedImage");
        uploadedImage.src = imageUrl;
        uploadedImage.style.display = "block";

        console.log("Uploaded Image URL:", imageUrl);
    } catch (error) {
        console.error("Upload failed:", error);
    }
}
