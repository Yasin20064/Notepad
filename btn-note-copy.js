document.addEventListener("DOMContentLoaded", () => {
    const copyIcon = document.getElementById("copy-icon");
    const noteContent = document.querySelector(".note-content");
    const noteTitle = document.querySelector(".note-title").innerText.trim(); // Trim whitespace

    // Debugging: Log the current note title
    console.log("Current note title:", noteTitle);

    // Function to check if all placeholders are filled
    function areAllPlaceholdersFilled() {
        const placeholders = noteContent.querySelectorAll(".dynamic-placeholder");
        return Array.from(placeholders).every(placeholder => placeholder.textContent.trim() !== '' && placeholder.textContent.trim() !== 'Type here...');
    }

    // Copy note content to clipboard when the copy icon is clicked
    copyIcon.addEventListener('click', function() {
        if (areAllPlaceholdersFilled()) {
            const noteContentText = Array.from(noteContent.childNodes).map(node => {
                if (node.tagName === 'SELECT') {
                    return node.value;
                } else {
                    return node.innerText || node.textContent;
                }
            }).join('');
            navigator.clipboard.writeText(noteContentText).then(() => {
                showAlert("Note content copied to clipboard!");
            }).catch(err => {
                showAlert("Failed to copy note: " + err);
            });
        } else {
            showAlert("Please fill in all placeholders before copying the note.");
        }
    });
});