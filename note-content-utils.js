document.addEventListener('DOMContentLoaded', function () {
    const noteContentElement = document.querySelector('.note-content');
    const noteTitleElement = document.querySelector('.note-title'); // Assuming there's an element for the title

    // Load the current note from localStorage
    const note = JSON.parse(localStorage.getItem('currentNote'));

    if (note) {
        // Load the title
        if (note.title) {
            noteTitleElement.textContent = note.title;
        } else {
            noteTitleElement.textContent = 'No title found'; // Fallback text
        }

        // Apply placeholder replacements
        let content = replaceDropdowns(note.content); // First replace dropdowns
        content = replacePlaceholders(content); // Then replace placeholders
        content = replaceDate(content); // Finally, replace date placeholders
        noteContentElement.innerHTML = content;
    } else {
        noteTitleElement.textContent = 'No note found';
        noteContentElement.textContent = 'No note content found';
    }

    // Event listener to clear the placeholder text when the span is focused
    noteContentElement.addEventListener('focusin', function (e) {
        if (e.target.classList.contains('dynamic-placeholder')) {
            const span = e.target;
            if (span.textContent === 'Type here...') {
                span.textContent = ''; // Clear the placeholder text
                span.classList.remove('empty'); // Remove the 'empty' class

                // Move the caret to the end of the cleared placeholder
                const range = document.createRange();
                const sel = window.getSelection();
                range.selectNodeContents(span);
                range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    });

    // Event listener to restore placeholder text if the span is empty on blur
    noteContentElement.addEventListener('focusout', function (e) {
        if (e.target.classList.contains('dynamic-placeholder')) {
            const span = e.target;
            if (span.textContent.trim() === '') {
                span.textContent = 'Type here...'; // Restore the placeholder text
                span.classList.add('empty'); // Add the 'empty' class
            }
        }
    });

    // Event listener to move to the next placeholder on Enter key press
    noteContentElement.addEventListener('keydown', function (e) {
        if (e.target.classList.contains('dynamic-placeholder') && e.key === 'Enter') {
            e.preventDefault(); // Prevent the default Enter behavior

            const currentPlaceholder = e.target;
            const allPlaceholders = noteContentElement.querySelectorAll('.dynamic-placeholder');
            const currentIndex = Array.from(allPlaceholders).indexOf(currentPlaceholder);

            if (currentIndex >= 0 && currentIndex < allPlaceholders.length - 1) {
                const nextPlaceholder = allPlaceholders[currentIndex + 1];
                
                // Move focus to the next placeholder
                nextPlaceholder.focus();
                
                // Move the caret to the end of the next placeholder
                const range = document.createRange();
                const sel = window.getSelection();
                range.selectNodeContents(nextPlaceholder);
                range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    });

    // Additional event listeners or functionality can be added here...

});