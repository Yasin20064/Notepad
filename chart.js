// চার্ট রেন্ডার করার জন্য ক্যানভাস নির্বাচন
const ctx = document.getElementById('lineChart').getContext('2d');

// localStorage থেকে ডেটা পাওয়ার ফাংশন
function getLocalStorageData() {
  const rawData = localStorage.getItem('dolistData');
  return rawData ? JSON.parse(rawData) : null;
}

// তারিখ ফরম্যাট পরিবর্তন করার ফাংশন
function formatDate(dateString) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  return `${month}-${day}`;
}

// Task-specific ডেটা প্রসেস করার ফাংশন
function processChartData(data) {
  const rawDates = Object.keys(data.ranges); // মূল তারিখগুলো
  const formattedDates = rawDates.map(formatDate); // তারিখ ফরম্যাট পরিবর্তন করা
  const tasks = Object.keys(data.ranges[rawDates[0]]); // প্রথম তারিখের টাস্কের নামগুলো বের করা
  const datasets = tasks.map((taskName, index) => {
    const taskData = rawDates.map((date) => (data.ranges[date][taskName] || 0) / 3600); // সেকেন্ড থেকে ঘণ্টায় রূপান্তর
    return {
      label: taskName, // ডেটাসেটের লেবেল (টাস্কের নাম)
      data: taskData, // প্রতিদিনের জন্য ঘণ্টার ডেটা
      borderColor: getRandomColor(index), // লাইন রঙ
      borderWidth: 2,
      fill: false,
      tension: 0.1,
      pointBackgroundColor: getRandomColor(index),
    };
  });
  return { dates: formattedDates, datasets };
}

// র‍্যান্ডম রঙ তৈরি করার ফাংশন (প্রতিটি লাইন আলাদা রঙে দেখানোর জন্য)
function getRandomColor(index) {
  const colors = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8'];
  return colors[index % colors.length]; // নির্দিষ্ট কিছু রঙ থেকে সিলেক্ট করা
}

// localStorage থেকে ডেটা লোড করুন
const dataFromLocalStorage = getLocalStorageData();

// যদি ডেটা না থাকে, তাহলে ডিফল্ট মেসেজ শো করব
if (!dataFromLocalStorage) {
  console.error('No data found in localStorage for "dolistData".');
} else {
  // Task-specific ডেটা প্রসেস করুন
  const { dates, datasets } = processChartData(dataFromLocalStorage);

  // Chart.js দিয়ে লাইন চার্ট তৈরি করা
  const lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates, // X-axis: ফরম্যাট করা তারিখ
      datasets: datasets, // Y-axis: প্রতিটি টাস্কের জন্য ডেটাসেট
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'mounth summary',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Hours',
          },
          ticks: {
            beginAtZero: true,
            callback: function (value) {
              return value + ' hr'; // ঘণ্টার ইউনিট দেখানো
            },
          },
        },
      },
    },
  });
}