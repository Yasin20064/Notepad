document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.querySelector('.notes-container');
    const searchInput = document.getElementById('searchInput');

    // Local Storage থেকে নোটগুলো লোড করা
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    // নোটগুলো উল্টা ক্রমে সাজানো
    notes = notes.reverse();

    function displayNotes(filteredNotes) {
        // পূর্বের নোটগুলো পরিষ্কার করা
        notesContainer.innerHTML = '';

        // ফিল্টার করা নোট আছে কি না চেক করা
        if (filteredNotes.length > 0) {
            const uniqueNotes = new Set(); // ডুপ্লিকেট নোট প্রতিরোধের জন্য Set ব্যবহার করা
            filteredNotes.forEach(note => {
                if (!uniqueNotes.has(note.title)) { // একই নোট থাকলে স্কিপ করা
                    uniqueNotes.add(note.title);

                    // Check if the note content contains only Do List items
                    const isDoList = note.content.split('\n').every(line => {
                        return line.startsWith('**') && line.endsWith('**');
                    });

                    // Do List ফরম্যাটের নোটগুলো বাদ দেওয়া
                    if (!isDoList) {
                        const noteElement = document.createElement('div');
                        noteElement.classList.add('note-container');

                        noteElement.innerHTML = `
                            <div class="note-title">${note.title}</div>
                            <div class="note-content">${note.content}</div>
                        `;

                        // নোটে ক্লিক করলে note-show.html পেজে যাওয়ার জন্য event listener যোগ করা
                        noteElement.addEventListener('click', () => {
                            // নোটের data কে currentNote হিসেবে localStorage এ সেভ করা
                            localStorage.setItem('currentNote', JSON.stringify(note));

                            // note-show.html পেজে রিডাইরেক্ট করা
                            window.location.href = 'note-show.html';
                        });

                        notesContainer.appendChild(noteElement);
                    }
                }
            });
        } else {
              // No created notes.
            notesContainer.innerHTML = '<div class="empty-note"><p> </p></div>';
        }
    }

    // প্রাথমিকভাবে সব নোটগুলো প্রদর্শন করা
    displayNotes(notes);

    // সার্চ ফাংশনালিটি
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();

        // নোটের টাইটেল দ্বারা ফিল্টার করা
        const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(searchTerm));

        // ফিল্টার করা নোটগুলো প্রদর্শন করা
        displayNotes(filteredNotes);
    });
});