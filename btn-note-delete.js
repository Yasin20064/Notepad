document.addEventListener("DOMContentLoaded", () => {
    const deleteIcon = document.getElementById("delete-icon");
    const passwordModal = document.getElementById("password-modal");
    const closeModal = document.getElementById("close-modal");
    const submitPasswordBtn = document.getElementById("submit-password");
    const userPasswordInput = document.getElementById("user-password");

    // Load the current note
    let currentNote = JSON.parse(localStorage.getItem('currentNote'));

    deleteIcon.addEventListener('click', function() {
        // Check if a password is set in localStorage
        let savedPassword = localStorage.getItem('password');

        if (savedPassword) {
            // Open the modal when the delete icon is clicked if password is set
            passwordModal.style.display = "block";
        } else {
            // If no password is set, directly delete the note
            deleteNote();
        }
    });

    // Close the modal when the user clicks the 'x'
    closeModal.addEventListener('click', function() {
        passwordModal.style.display = "none";
    });

    // Close the modal if the user clicks anywhere outside of it
    window.addEventListener('click', function(event) {
        if (event.target == passwordModal) {
            passwordModal.style.display = "none";
        }
    });

    // Handle password submission
    submitPasswordBtn.addEventListener('click', function() {
        let userPassword = userPasswordInput.value;
        let savedPassword = localStorage.getItem('password');

        if (userPassword === savedPassword) {
            deleteNote();
        } else {
            showAlert('Incorrect password. Note not deleted.');
        }

        // Close the modal after submission
        passwordModal.style.display = "none";
    });

    function deleteNote() {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        const noteIndex = notes.findIndex(note => note.title === currentNote.title && note.content === currentNote.content);

        if (noteIndex !== -1) {
            notes.splice(noteIndex, 1);
            localStorage.setItem('notes', JSON.stringify(notes));
            localStorage.removeItem('currentNote');
            showAlert('Note deleted successfully!');
            window.location.href = 'index.html';
        } else {
            showAlert('Note not found.');
        }
    }
});

function showAlert(message) {
    alert(message);  // Replace this with your custom alert system if you have one
}