const dietQuestions = [
  "Do you skip meals regularly?",
  "Do you eat when you're bored or emotional rather than hungry?",
  "Do you often eat very late at night?",
  "Do you feel guilty after eating?",
  "Do you frequently crave junk food or sugar?",
  "Do you often eat on the go or while distracted?",
  "Do you drink less than 5 glasses of water a day?",
  "Do you rarely eat fruits or vegetables?",
  "Do you eat until you feel uncomfortably full?",
  "Do you avoid eating in front of others?",
  "Do you often rely on processed/instant food?",
  "Do you lack appetite most days?",
  "Do you forget to eat during the day?",
  "Do you binge eat when stressed?",
  "Do you feel you have no control over your eating habits?"
];

const form = document.getElementById('dietQuiz');

dietQuestions.forEach((q, i) => {
  const qBlock = document.createElement('div');
  qBlock.className = "question";
  qBlock.innerHTML = `<p>${i + 1}. ${q}</p>`;
  const options = document.createElement('div');
  options.className = "options";
  options.innerHTML = `
    <label><input type="radio" name="q${i}" value="yes" required> Yes</label>
    <label><input type="radio" name="q${i}" value="no" required> No</label>
  `;
  qBlock.appendChild(options);
  form.appendChild(qBlock);
});

function submitDietQuiz() {
  let yesCount = 0;
  const answers = [];

  for (let i = 0; i < dietQuestions.length; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (!selected) {
      alert("Please answer all questions.");
      return;
    }
    const val = selected.value;
    if (val === "yes") yesCount++;
    answers.push({ question: dietQuestions[i], answer: val });
  }

  let message = "";
  if (yesCount <= 4) message = "Your eating habits seem balanced. Keep nourishing your body!";
  else if (yesCount <= 8) message = "Some eating patterns might be affecting your energy or mood. Consider mindful eating.";
  else if (yesCount <= 12) message = "Many signs of disordered eating. Reflect and seek guidance if needed.";
  else message = "Strong signs of unhealthy eating habits. Please consider speaking to a healthcare provider or nutritionist.";

  document.getElementById("dietResult").innerText = `Yes Answers: ${yesCount}/15\n\n${message}`;
  document.getElementById("dietExportBtn").style.display = "inline-block";

  window.latestDietResult = {
    totalYes: yesCount,
    message,
    answers,
    date: new Date().toLocaleString()
  };
}

function exportDietResults() {
  const result = window.latestDietResult;
  if (!result) return;

  const text = `
Diet Habits Self-Check (Yes/No)
-------------------------------
Date: ${result.date}
Yes Answers: ${result.totalYes}/15
Feedback: ${result.message}

Answers:
${result.answers.map((q, i) => `${i + 1}. ${q.question} → ${q.answer.toUpperCase()}`).join("\n")}
`;

  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `MojaMind_DietQuiz_${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
