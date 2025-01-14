// Function to replace sequences of ',,' with editable placeholders
function replacePlaceholders(content) {
    const placeholderPattern = /,,/g;

    // Replace ',,' with an editable placeholder
    const updatedContent = content.replace(placeholderPattern, 
        '<span class="dynamic-placeholder empty" contenteditable="true">Type here...</span>');

    return updatedContent;
}