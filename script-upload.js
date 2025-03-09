// 🌟 Upload Image to Cloudinary
async function uploadImage() {
    const fileInput = document.getElementById("imageInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select an image!");
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

        console.log("Image uploaded successfully:", imageUrl);
        alert("Image uploaded successfully!");

    } catch (error) {
        console.error("Upload failed:", error);
        alert("Upload failed. Please try again.");
    }
}

function saveProjectData(imageUrl) {
    const title = document.getElementById("projectTitle").value;
    const description = document.getElementById("projectDescription").value;
    const videoEmbed = document.getElementById("videoEmbed").value;

    if (!title || !description) {
        alert("Please fill in all required fields!");
        return;
    }

    const newProject = {
        title: title,
        description: description,
        image: imageUrl,
        video: videoEmbed
    };

    // Fetch existing projects and update the JSON file
    fetch('projects.json')
        .then(response => response.json())
        .then(projects => {
            projects.push(newProject);

            // Save updated data (Requires a server-side script)
            fetch('saveProjects.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projects)
            }).then(() => {
                alert("Project uploaded successfully!");
                location.reload();
            });
        })
        .catch(error => console.error("Error updating JSON file:", error));
}
