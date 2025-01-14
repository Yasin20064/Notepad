// Function to replace date placeholders
function replaceDate(content) {
    const datePattern = /--/g;

    // Get the current date in 'day-month-year' format
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

    return content.replace(datePattern, formattedDate);
}