// Function to save project data in localStorage (temporary storage)
function saveProjectData(imageUrl) {
    const title = document.getElementById("Title").value;
    const description = document.getElementById("Description").value;
    const videoEmbed = document.getElementById("videoEmbed").value;

    // Check if required fields are filled
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

    // Fetch existing projects from localStorage
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.push(newProject);

    // Save updated data to localStorage
    localStorage.setItem("projects", JSON.stringify(projects));

    // Optionally display the uploaded project on the page
    displayUploadedProject(newProject);
    alert("Project uploaded successfully!");
}

// Function to display the uploaded project on the page
function displayUploadedProject(project) {
    let responseContainer = document.getElementById("responseContainer");
    responseContainer.innerHTML = `
        <h3>Upload Successful!</h3>
        <img src="${project.image}" width="300">
        <h4>${project.title}</h4>
        <p>${project.description}</p>
        ${project.video ? `<p><b>Video:</b> <a href="${project.video}" target="_blank">Watch Video</a></p>` : ''}
        <p><b>Image URL:</b> <a href="${project.image}" target="_blank">${project.image}</a></p>
    `;
}

function loadProjects() {
    // Retrieve the stored projects from localStorage
    let projects = JSON.parse(localStorage.getItem("projects")) || [];

    // Display all stored projects
    projects.forEach(project => {
        displayUploadedProject(project);
    });
}

// Call this function when the page loads to display saved projects
window.onload = loadProjects;
