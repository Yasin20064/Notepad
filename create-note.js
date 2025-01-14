document.getElementById('save-note').addEventListener('click', function() {
    console.log("Save button clicked!");  // Debugging line

    const noteTitle = document.getElementById('note-title').value.trim();
    const noteContent = document.getElementById('note-content').value.trim();

    console.log("Title:", noteTitle);  // Debugging line
    console.log("Content:", noteContent);  // Debugging line

    if (noteTitle && noteContent) {
        const note = {
            title: noteTitle,
            content: noteContent
        };

        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);

        localStorage.setItem('notes', JSON.stringify(notes));

        window.location.href = 'index.html';
    } else {
        showAlert('Please fill out both the title and content fields.');
    }
});