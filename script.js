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

        // Get project details
        const title = document.getElementById("projectTitle").value.trim();
        const description = document.getElementById("projectDescription").value.trim();
        let videoEmbed = document.getElementById("videoEmbed").value.trim();

        // Ensure the user provides at least a title and image
        if (!title) {
            alert("Please enter a title for your project.");
            return;
        }

        // Convert YouTube link to embed format if necessary
        if (videoEmbed.includes("youtube.com/watch?v=")) {
            videoEmbed = videoEmbed.replace("watch?v=", "embed/");
        }

        // Store project details in Firebase Firestore
        await db.collection("projects").add({
            title,
            description,
            imageUrl,
            videoEmbed,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert("Project uploaded successfully!");
    } catch (error) {
        console.error("Upload failed:", error);
        alert("Upload failed. Please try again.");
    }
}

// Import Firebase modules (for Firebase v10+)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

 // Firebase Setup
        const firebaseConfig = {
            apiKey: "AIzaSyCVOOg1G5_vliX79ykPGFECv2bImWTwbHg",
            authDomain: "mindcrafts-35762.firebaseapp.com",
            projectId: "mindcrafts-35762",
            storageBucket: "mindcrafts-35762.appspot.com",
            messagingSenderId: "159042521260",
            appId: "1:159042521260:web:51f929192559652b873709",
            measurementId: "G-ZSRYBHPJ27"
        };
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();

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

            try {
                const response = await fetch("https://api.cloudinary.com/v1_1/dqxpsa3ds/image/upload", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();
                const imageUrl = data.secure_url;

                // Display uploaded image
                document.getElementById("uploadedImage").src = imageUrl;
                document.getElementById("uploadedImage").style.display = "block";

                // Store project details in Firebase Firestore
                const title = document.getElementById("projectTitle").value;
                const description = document.getElementById("projectDescription").value;
                const videoEmbed = document.getElementById("videoEmbed").value;

                await db.collection("projects").add({
                    title: title,
                    description: description,
                    imageUrl: imageUrl,
                    videoEmbed: videoEmbed,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });

                alert("Project uploaded successfully!");
            } catch (error) {
                console.error("Upload failed:", error);
            }
        }

        // Load Projects from Firebase
async function loadProjects() {
    try {
        const snapshot = await db.collection("projects").orderBy("timestamp", "desc").get();
        const projectsDiv = document.getElementById("projectsList");

        if (snapshot.empty) {
            projectsDiv.innerHTML = "<p>No projects uploaded yet.</p>";
            return;
        }

        snapshot.forEach(doc => {
            const data = doc.data();
            projectsDiv.innerHTML += `
                <div>
                    <h3>${data.title}</h3>
                    <img src="${data.imageUrl}" width="300px">
                    <p>${data.description}</p>
                    ${data.videoEmbed ? `<iframe width="300" src="${data.videoEmbed}" frameborder="0"></iframe>` : ""}
                </div>
                <hr>
            `;
        });
    } catch (error) {
        console.error("Error loading projects:", error);
        projectsDiv.innerHTML = "<p>Failed to load projects. Please try again later.</p>";
    }
}

loadProjects();
