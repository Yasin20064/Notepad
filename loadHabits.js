document.addEventListener("DOMContentLoaded", loadHabits);

function loadHabits() {
  const habitContainer = document.querySelector(".habit-container");
  const habits = getHabitsFromLocalStorage();

  // যদি হ্যাবিট না থাকে, কনটেইনার লুকিয়ে রাখুন
  if (habits.length === 0) {
    habitContainer.style.display = "none";
  } else {
    habitContainer.style.display = "flex";
  }

  // Clear the container first
  habitContainer.innerHTML = "";

  // লোড করা হ্যাবিট গুলি দেখান
  habits.forEach((habitText) => {
    const habitDiv = createHabitItem(habitText);
    habitContainer.appendChild(habitDiv);
  });
}

function getHabitsFromLocalStorage() {
  const habits = localStorage.getItem("habits");
  return habits ? JSON.parse(habits) : [];
}

function createHabitItem(habitText) {
  // Create a div for habit
  const habitDiv = document.createElement("div");
  habitDiv.classList.add("habit-item");
  habitDiv.textContent = habitText;

  // Create "Done" button
  const doneButton = document.createElement("button");
  doneButton.textContent = "Done";
  doneButton.addEventListener("click", () => {
    habitDiv.classList.toggle("completed");
  });

  // Create "Delete" button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    habitDiv.remove();
    removeHabitFromLocalStorage(habitText);

    // যদি সমস্ত হ্যাবিট মুছে ফেলা হয়, কনটেইনার লুকান
    if (getHabitsFromLocalStorage().length === 0) {
      document.querySelector(".habit-container").style.display = "none";
    }
  });

  habitDiv.appendChild(doneButton);
  habitDiv.appendChild(deleteButton);

  return habitDiv;
}

function removeHabitFromLocalStorage(habitText) {
  const habits = getHabitsFromLocalStorage();
  const updatedHabits = habits.filter((habit) => habit !== habitText);
  localStorage.setItem("habits", JSON.stringify(updatedHabits));
}