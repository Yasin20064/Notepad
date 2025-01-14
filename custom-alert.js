// custom-alert.js

// Function to show the custom alert
function showAlert(message) {
    const alertBox = document.getElementById('customAlert');
    document.getElementById('alertMessage').textContent = message;
    alertBox.style.display = 'flex';
}

// Function to close the custom alert
function closeAlert() {
    const alertBox = document.getElementById('customAlert');
    alertBox.style.display = 'none';
}

// Attach event listener to the close button
document.addEventListener("DOMContentLoaded", () => {
    const closeButton = document.getElementById('closeAlert');
    if (closeButton) {
        closeButton.addEventListener('click', closeAlert);
    }
});