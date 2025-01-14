function replaceDropdowns(content) {
    const dropdownPattern = /\/\/([^\/]+(?:\/[^\/]+)*)\/\//g;

    return content.replace(dropdownPattern, function (match, p1) {
        const options = p1.split('/');
        let dropdownHTML = '<select class="dynamic-dropdown">';
        options.forEach(option => {
            dropdownHTML += `<option value="${option}">${option}</option>`;
        });
        dropdownHTML += '</select>';
        return dropdownHTML;
    });
}