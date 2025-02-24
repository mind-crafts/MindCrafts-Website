document.addEventListener("DOMContentLoaded", function() {
    console.log("Footer script is running..."); // Debugging message

    fetch("footer.html")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.body.insertAdjacentHTML("beforeend", data);
            console.log("Footer loaded successfully!"); // Debugging message
        })
        .catch(error => console.error("Error loading footer:", error));
});
