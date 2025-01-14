const calendar = document.querySelector('.calendar');
const monthName = calendar.querySelector('.month-name');
const yearEl = calendar.querySelector('.year');
const daysEl = calendar.querySelector('.days');
const prevBtn = calendar.querySelector('.prev-btn');
const nextBtn = calendar.querySelector('.next-btn');

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

let currentDate = new Date(); // Current date
let selectedDate = new Date(); // Selected date for navigation

// Retrieve tasks from local storage
const loadTasksFromLocalStorage = () => {
  const storedData = localStorage.getItem('dolistData');
  if (storedData) {
    return JSON.parse(storedData);
  }
  return { statuses: {} }; // Default if no data is in localStorage
};

const taskData = loadTasksFromLocalStorage();

// Color palette for unique dots
const colors = [
  '#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#f44336',
  '#00bcd4', '#8bc34a', '#ffc107', '#ff5722', '#795548'
];

// Render Calendar
function renderCalendar() {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const today = currentDate.getDate();
  const isCurrentMonth = currentDate.getFullYear() === year && currentDate.getMonth() === month;

  monthName.textContent = months[month];
  yearEl.textContent = year;

  // First day of the month
  const firstDay = new Date(year, month, 1).getDay();
  const prevMonthDays = new Date(year, month, 0).getDate(); // Days in previous month
  const totalDays = new Date(year, month + 1, 0).getDate(); // Days in current month

  daysEl.innerHTML = '';

  // Add days from previous month
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = document.createElement('div');
    day.classList.add('prev-month');
    day.textContent = prevMonthDays - i;
    daysEl.appendChild(day);
  }

  // Add days for current month
  for (let i = 1; i <= totalDays; i++) {
    const day = document.createElement('div');
    day.classList.add('current-month'); // Add class for current month days
    day.textContent = i;

    // Highlight today
    if (isCurrentMonth && i === today) {
      day.classList.add('active');
    }

    // Check if there are completed tasks for the specific day
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    if (taskData.statuses[dateString]) {
      const tasks = taskData.statuses[dateString];
      const completedTasks = Object.entries(tasks).filter(([task, status]) => status === 'completed');

      if (completedTasks.length > 0) {
        // For each completed task, add a uniquely colored dot
        completedTasks.forEach(([task, status], index) => {
          const dot = document.createElement('span');
          dot.classList.add('task-dot');
          dot.style.backgroundColor = colors[index % colors.length]; // Assign a unique color
          dot.style.bottom = `${5 + index * 2}px`; // Stack dots vertically
          dot.style.zIndex = `${10 - index}`; // Ensure dots stack in the correct order
          day.appendChild(dot);
        });

        // Optionally, display task status on hover
        day.title = completedTasks
          .map(([task, status]) => `${task}: ${status}`)
          .join('\n');
      }
    }

    // Add click event to highlight selected day
    day.addEventListener('click', () => {
      document.querySelectorAll('.days div').forEach(d => d.classList.remove('active'));
      day.classList.add('active');
    });

    daysEl.appendChild(day);
  }

  // Add days from next month
  const remainingDays = 42 - daysEl.children.length; // Ensure 6 rows
  for (let i = 1; i <= remainingDays; i++) {
    const day = document.createElement('div');
    day.classList.add('next-month');
    day.textContent = i;
    daysEl.appendChild(day);
  }
}

// Navigation buttons
prevBtn.addEventListener('click', () => {
  selectedDate.setMonth(selectedDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener('click', () => {
  selectedDate.setMonth(selectedDate.getMonth() + 1);
  renderCalendar();
});

// Initial render
renderCalendar();