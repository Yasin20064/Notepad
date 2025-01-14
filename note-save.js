// note-save.js

function saveNote() {
    const noteTitleElement = document.querySelector('.note-title'); // Select the note title element
    const noteContentElement = document.querySelector('.note-content');
    const allPlaceholders = noteContentElement.querySelectorAll('.dynamic-placeholder');
    
    // Collect content from placeholders
    let content = Array.from(allPlaceholders).map(span => span.textContent).join(' ');

    // Create the note object including title and content
    const note = {
        title: noteTitleElement.textContent.trim(), // Get the note title
        content: content,
        timestamp: new Date().toISOString()
    };

    // Save the note to localStorage
    localStorage.setItem('currentNote', JSON.stringify(note));
}

document.addEventListener('DOMContentLoaded', function () {
    const noteContentElement = document.querySelector('.note-content');
    const noteTitleElement = document.querySelector('.note-title'); // Select the note title element

    // Event listener for saving note when content or title loses focus
    noteContentElement.addEventListener('focusout', saveNote);
    noteTitleElement.addEventListener('focusout', saveNote);
});