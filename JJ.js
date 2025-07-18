const prompts = [
  "What are you grateful for today?",
  "Describe a moment that made you smile recently.",
  "What challenges did you face today and how did you handle them?",
  "Write about a goal you want to achieve this week.",
  "How are you feeling right now? Why?",
  "Recall a happy memory and describe it in detail.",
  "What’s one thing you learned about yourself recently?",
  "Write a letter to your future self.",
  "Describe something that inspired you today.",
  "What self-care activity did you do or want to do today?"
];

const promptText = document.getElementById('promptText');
const newPromptBtn = document.getElementById('newPromptBtn');
const journalForm = document.getElementById('journalForm');
const moodSelect = document.getElementById('moodSelect');
const journalEntry = document.getElementById('journalEntry');
const entryList = document.getElementById('entryList');
const clearAllBtn = document.getElementById('clearAllBtn');

let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];

function getRandomPrompt() {
  const idx = Math.floor(Math.random() * prompts.length);
  return prompts[idx];
}

function renderPrompt() {
  promptText.textContent = getRandomPrompt();
}

function renderEntries() {
  entryList.innerHTML = '';

  if (entries.length === 0) {
    entryList.innerHTML = '<p>No entries yet. Start journaling!</p>';
    return;
  }

  entries.forEach((entry, idx) => {
    const li = document.createElement('li');
    li.className = 'entry-item';

    const dateStr = new Date(entry.timestamp).toLocaleString();

    li.innerHTML = `
      <div class="entry-meta">
        <strong>Prompt:</strong> ${entry.prompt} | 
        <strong>Mood:</strong> ${entry.mood || 'N/A'} | 
        <em>${dateStr}</em>
      </div>
      <p>${entry.text.replace(/\n/g, '<br>')}</p>
      <div class="entry-actions">
        <button aria-label="Delete entry" data-index="${idx}" class="delete-btn">🗑️</button>
      </div>
    `;

    entryList.appendChild(li);
  });

  // Add delete functionality
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.onclick = e => {
      const idx = Number(e.target.dataset.index);
      if (confirm('Delete this journal entry?')) {
        entries.splice(idx, 1);
        saveEntries();
      }
    };
  });
}

function saveEntries() {
  localStorage.setItem('journalEntries', JSON.stringify(entries));
  renderEntries();
}

newPromptBtn.addEventListener('click', () => {
  renderPrompt();
});

journalForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = journalEntry.value.trim();
  if (!text) {
    alert('Please write something before saving.');
    return;
  }

  const newEntry = {
    prompt: promptText.textContent,
    mood: moodSelect.value,
    text,
    timestamp: Date.now()
  };

  entries.unshift(newEntry); // newest first
  saveEntries();

  // Reset form
  journalEntry.value = '';
  moodSelect.value = '';
  renderPrompt();
});

clearAllBtn.addEventListener('click', () => {
  if (confirm('Clear all journal entries?')) {
    entries = [];
    saveEntries();
  }
});

// Initialize
renderPrompt();
renderEntries();
