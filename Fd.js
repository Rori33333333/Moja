const foodForm = document.getElementById('foodForm');
const foodList = document.getElementById('foodList');

let foodDiary = JSON.parse(localStorage.getItem('foodDiary')) || [];

// Render entries
function renderFoodDiary() {
  foodList.innerHTML = '';
  foodDiary.forEach((entry, i) => {
    const li = document.createElement('li');
    li.textContent = `${entry.date} - ${entry.meal} - Mood: ${entry.mood}`;
    foodList.appendChild(li);
  });
}

foodForm.addEventListener('submit', e => {
  e.preventDefault();

  const newEntry = {
    date: document.getElementById('foodDate').value,
    meal: document.getElementById('meal').value.trim(),
    mood: document.getElementById('mood').value.trim(),
    notes: document.getElementById('notes').value.trim()
  };

  if (!newEntry.date || !newEntry.meal || !newEntry.mood) {
    alert('Please fill in date, meal and mood.');
    return;
  }

  foodDiary.push(newEntry);
  localStorage.setItem('foodDiary', JSON.stringify(foodDiary));
  renderFoodDiary();

  foodForm.reset();
});

// Initial render
renderFoodDiary();

// Export function (same as before)
function exportFoodDiary() {
  if (!foodDiary.length) {
    alert("No food diary entries to export.");
    return;
  }

  const text = foodDiary.map((entry, i) => {
    return `🍽️ Entry ${i + 1}
Date: ${entry.date}
Meal: ${entry.meal}
Mood After Eating: ${entry.mood}
Notes: ${entry.notes}
`;
  }).join('\n------------------------\n');

  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'moja_food_diary.txt';
  a.click();
}
