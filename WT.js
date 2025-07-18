const goal = 8;
const waterCountSpan = document.getElementById('waterCount');
const waterProgress = document.getElementById('waterProgress');
const goalDisplay = document.getElementById('goalDisplay');

goalDisplay.textContent = goal;

function loadWaterCount() {
  const today = new Date().toLocaleDateString();
  const waterLog = JSON.parse(localStorage.getItem('waterLog')) || {};
  return waterLog[today] || 0;
}

function saveWaterCount(count) {
  const today = new Date().toLocaleDateString();
  let waterLog = JSON.parse(localStorage.getItem('waterLog')) || {};
  waterLog[today] = count;
  localStorage.setItem('waterLog', JSON.stringify(waterLog));
}

function updateUI(count) {
  waterCountSpan.textContent = count;
  let percent = (count / goal) * 100;
  if (percent > 100) percent = 100;
  waterProgress.style.width = percent + '%';
}

document.getElementById('addGlass').addEventListener('click', () => {
  let count = loadWaterCount();
  count++;
  saveWaterCount(count);
  updateUI(count);
});

document.getElementById('resetWater').addEventListener('click', () => {
  saveWaterCount(0);
  updateUI(0);
});

window.onload = () => {
  updateUI(loadWaterCount());
};
