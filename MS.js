// Routine Maker, Food Diary, Mood & Symptom Tracker Script with Export Support

const taskInput = document.getElementById('taskInput');
const timeOfDaySelect = document.getElementById('timeOfDay');
const durationInput = document.getElementById('duration');
const taskList = document.getElementById('taskList');
const routineForm = document.getElementById('routineForm');
const clearBtn = document.getElementById('clearBtn');
const exportBtn = document.getElementById('exportBtn');

let tasks = JSON.parse(localStorage.getItem('routineTasks')) || [];
let foodLog = JSON.parse(localStorage.getItem('foodDiary') || '[]');
let moodLog = JSON.parse(localStorage.getItem('moodTracker') || '[]');
let symptomLog = JSON.parse(localStorage.getItem('symptomTracker') || '[]');

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    li.className = 'draggable';
    li.draggable = true;
    li.dataset.index = idx;

    li.innerHTML = `
      <div class="task-info">
        <strong>${task.name}</strong>
        <span class="tag">${task.timeOfDay}</span>
        ${task.duration ? `<span class="duration">${task.duration} min</span>` : ''}
      </div>
      <button class="remove-btn" aria-label="Remove task">✖</button>
    `;

    li.querySelector('.remove-btn').onclick = () => {
      tasks.splice(idx, 1);
      saveTasks();
    };

    taskList.appendChild(li);
  });

  addDragAndDropHandlers();
}

function saveTasks() {
  localStorage.setItem('routineTasks', JSON.stringify(tasks));
  renderTasks();
}

routineForm.addEventListener('submit', e => {
  e.preventDefault();

  const newTaskName = taskInput.value.trim();
  if (!newTaskName) return;

  const newTask = {
    name: newTaskName,
    timeOfDay: timeOfDaySelect.value,
    duration: durationInput.value ? parseInt(durationInput.value) : null
  };

  tasks.push(newTask);
  saveTasks();

  taskInput.value = '';
  durationInput.value = '';
  timeOfDaySelect.value = 'Anytime';
});

clearBtn.addEventListener('click', () => {
  if (confirm('Clear your entire routine?')) {
    tasks = [];
    saveTasks();
  }
});

function addDragAndDropHandlers() {
  let draggedIndex = null;
  const draggables = document.querySelectorAll('.draggable');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', e => {
      draggedIndex = Number(e.target.dataset.index);
      e.dataTransfer.effectAllowed = 'move';
      e.target.classList.add('dragging');
    });

    draggable.addEventListener('dragend', e => {
      e.target.classList.remove('dragging');
    });

    draggable.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';

      const target = e.target.closest('.draggable');
      if (!target || target === draggable) return;

      target.classList.add('drag-over');
    });

    draggable.addEventListener('dragleave', e => {
      e.target.classList.remove('drag-over');
    });

    draggable.addEventListener('drop', e => {
      e.preventDefault();

      const target = e.target.closest('.draggable');
      if (!target || target === draggable) return;

      target.classList.remove('drag-over');
      const targetIndex = Number(target.dataset.index);

      if (draggedIndex === null || draggedIndex === targetIndex) return;

      const draggedTask = tasks[draggedIndex];
      tasks.splice(draggedIndex, 1);
      tasks.splice(targetIndex, 0, draggedTask);

      saveTasks();
      draggedIndex = null;
    });
  });
}

function exportRoutine() {
  const routine = JSON.parse(localStorage.getItem('routineTasks') || '[]');
  if (!routine.length) {
    alert("No tasks to export.");
    return;
  }

  const text = routine.map((task, i) => {
    const time = task.timeOfDay || 'Anytime';
    const duration = task.duration ? ` - ${task.duration} min` : '';
    return `🔹 ${i + 1}. ${task.name} (${time}${duration})`;
  }).join('\n');

  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'moja_routine.txt';
  a.click();
}

function exportFoodDiary() {
  const diary = JSON.parse(localStorage.getItem('foodDiary') || '[]');
  if (!diary.length) {
    alert("No food diary entries to export.");
    return;
  }

  const text = diary.map((entry, i) => {
    return `🍽️ Entry ${i + 1}\nDate: ${entry.date}\nMeal: ${entry.meal}\nMood After Eating: ${entry.mood}\nNotes: ${entry.notes}\n`;
  }).join('\n------------------------\n');

  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'moja_food_diary.txt';
  a.click();
}

function exportMoodTracker() {
  const logs = JSON.parse(localStorage.getItem('moodTracker') || '[]');
  if (!logs.length) {
    alert("No mood entries to export.");
    return;
  }

  const text = logs.map((entry, i) => {
    return `😊 Entry ${i + 1}\nDate: ${entry.date}\nMood: ${entry.mood}\nNotes: ${entry.notes}\n`;
  }).join('\n------------------------\n');

  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'moja_mood_tracker.txt';
  a.click();
}

function exportSymptomTracker() {
  const logs = JSON.parse(localStorage.getItem('symptomTracker') || '[]');
  if (!logs.length) {
    alert("No symptom logs to export.");
    return;
  }

  const text = logs.map((entry, i) => {
    return `🩺 Entry ${i + 1}\nDate: ${entry.date}\nSymptoms: ${entry.symptoms.join(', ')}\nNotes: ${entry.notes}\n`;
  }).join('\n------------------------\n');

  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'moja_symptom_tracker.txt';
  a.click();
}

renderTasks();
