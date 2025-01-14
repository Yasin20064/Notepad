document.addEventListener('DOMContentLoaded', function () {
    const dolistContainer = document.querySelector('.dolist-container');
    const dolistData = JSON.parse(localStorage.getItem('dolistData')) || { ranges: {}, statuses: {} };

    // Get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const todayDate = getTodayDate();

    // Convert seconds to HH:MM:SS format
    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    // Save to localStorage
    const saveToLocalStorage = (key, data) => {
        dolistData[key] = data;
        localStorage.setItem('dolistData', JSON.stringify(dolistData));
    };

    // Render Do List items
    const renderDoList = () => {
        const allNotes = JSON.parse(localStorage.getItem('notes')) || [];
         //do list no found
        if (allNotes.length === 0) {
            dolistContainer.textContent = '';
            return;
        }

        const fragment = document.createDocumentFragment();

        allNotes.forEach(note => {
            note.content?.split('\n').forEach(line => {
                if (line.startsWith('**') && line.endsWith('**')) {
                    const task = line.slice(2, -2).trim();
                    const timeMatch = task.match(/(\d{2}):(\d{2}):(\d{2})/);

                    const listItem = document.createElement('div');
                    listItem.className = 'do-list-item';

                    const label = document.createElement('label');
                    label.textContent = timeMatch ? task.replace(timeMatch[0], '').trim() : task;

                    if (timeMatch) {
                        const totalSeconds = timeMatch[1] * 3600 + timeMatch[2] * 60 + parseInt(timeMatch[3], 10);
                        const rangeInput = document.createElement('input');
                        rangeInput.type = 'range';
                        rangeInput.min = 0;
                        rangeInput.max = totalSeconds;

                        // Initialize the saved range value for the current date
                        const todayRanges = dolistData.ranges[todayDate] || {};
                        rangeInput.value = todayRanges[label.textContent] || 0;

                        const valueDisplay = document.createElement('span');
                        valueDisplay.className = 'range-value';
                        valueDisplay.textContent = `Time: ${timeMatch[0]} | Progress: ${formatTime(rangeInput.value)}`;

                        rangeInput.addEventListener('input', () => {
                            valueDisplay.textContent = `Time: ${timeMatch[0]} | Progress: ${formatTime(rangeInput.value)}`;

                            // Save the task progress for today's date
                            if (!dolistData.ranges[todayDate]) dolistData.ranges[todayDate] = {};
                            dolistData.ranges[todayDate][label.textContent] = parseInt(rangeInput.value, 10);

                            saveToLocalStorage('ranges', dolistData.ranges);
                        });

                        listItem.append(label, rangeInput, valueDisplay);
                    } else {
                        const button = document.createElement('button');

                        // Retrieve saved status for today's date
                        const todayStatuses = dolistData.statuses[todayDate] || {};
                        button.className = `status-button ${todayStatuses[task] === 'completed' ? 'completed' : 'pending'}`;
                        button.textContent = todayStatuses[task] === 'completed' ? 'Completed' : 'Pending';

                        button.addEventListener('click', () => {
                            // Initialize the saved statuses for the current date
                            if (!dolistData.statuses[todayDate]) dolistData.statuses[todayDate] = {};

                            // Toggle status and update button text
                            const status = button.classList.toggle('completed') ? 'completed' : 'pending';
                            button.textContent = status.charAt(0).toUpperCase() + status.slice(1);

                            // Save the task status for today's date
                            dolistData.statuses[todayDate][task] = status;
                            saveToLocalStorage('statuses', dolistData.statuses);
                        });

                        listItem.append(label, button);
                    }

                    fragment.appendChild(listItem);
                }
            });
        });

        dolistContainer.appendChild(fragment);
    };

    renderDoList();
});