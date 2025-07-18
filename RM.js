// Routine Maker Script with Export Support

const taskInput = document.getElementById('taskInput');
const timeOfDaySelect = document.getElementById('timeOfDay');
const durationInput = document.getElementById('duration');
const taskList = document.getElementById('taskList');
const routineForm = document.getElementById('routineForm');
const clearBtn = document.getElementById('clearBtn');
const exportBtn = document.getElementById('exportBtn');

let tasks = JSON.parse(localStorage.getItem('routineTasks')) || [];

// Render tasks to the UI
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

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('routineTasks', JSON.stringify(tasks));
  renderTasks();
}

// Handle form submission
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

  // Reset inputs
  taskInput.value = '';
  durationInput.value = '';
  timeOfDaySelect.value = 'Anytime';
});

// Clear all tasks
clearBtn.addEventListener('click', () => {
  if (confirm('Clear your entire routine?')) {
    tasks = [];
    saveTasks();
  }
});

// Drag and drop handlers
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

// Export routine to .txt file
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

// Initial render
renderTasks();
