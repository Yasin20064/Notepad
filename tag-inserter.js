document.addEventListener("DOMContentLoaded", function() {
    const noteContent = document.getElementById('note-content');
    const buttons = document.querySelectorAll('.bottom-bar button');

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const tag = this.getAttribute('data-tag');
            insertText(tag);
        });
    });

    function insertText(tag) {
        const currentText = noteContent.value;
        const start = noteContent.selectionStart;
        const end = noteContent.selectionEnd;

        // Split the tag to get opening and closing parts
        const [openingTag, closingTag] = tag.split('</');
        const closingTagPart = closingTag ? `</${closingTag}` : '';

        noteContent.value = currentText.substring(0, start) + openingTag + currentText.substring(start, end) + closingTagPart + currentText.substring(end);
        noteContent.selectionStart = noteContent.selectionEnd = start + openingTag.length + currentText.substring(start, end).length + closingTagPart.length;
    }
});