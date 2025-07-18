const questions = [
  "I feel down or sad most of the day.",
  "I have little interest or pleasure in doing things.",
  "I struggle to find motivation to start or finish tasks.",
  "I feel tired, even after a full night’s sleep.",
  "I have difficulty focusing or making decisions.",
  "I feel worthless or like a burden to others.",
  "I feel hopeless about the future.",
  "I move or speak more slowly than usual.",
  "I avoid social situations or connecting with people.",
  "I experience guilt or shame even when I didn’t do anything wrong.",
  "I find it hard to enjoy things I used to love.",
  "My appetite has decreased or increased significantly.",
  "I feel like I’m not myself lately.",
  "I cry more easily or feel numb.",
  "I have trouble sleeping (falling asleep, staying asleep, or waking too early)."
];

const form = document.getElementById('moodQuiz');

// Render questions
questions.forEach((q, index) => {
  const qBlock = document.createElement('div');
  qBlock.className = "question";
  qBlock.innerHTML = `<p>${index + 1}. ${q}</p>`;
  const options = document.createElement('div');
  options.className = "options";
  for (let i = 0; i <= 4; i++) {
    options.innerHTML += `
      <label>
        <input type="radio" name="q${index}" value="${i}" required /> ${i}
      </label>
    `;
  }
  qBlock.appendChild(options);
  form.appendChild(qBlock);
});

function submitQuiz() {
  const results = [];
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (!selected) {
      alert("Please answer all questions.");
      return;
    }
    const val = parseInt(selected.value);
    results.push({ question: questions[i], answer: val });
    score += val;
  }

  let message = "";
  if (score <= 10) {
    message = "Low signs of low mood – keep up healthy habits & monitor your feelings.";
  } else if (score <= 25) {
    message = "Mild signs – try self-care & grounding techniques.";
  } else if (score <= 40) {
    message = "Moderate signs – you may benefit from talking to someone or using support tools.";
  } else {
    message = "Strong signs – consider speaking to a mental health professional. You're not alone.";
  }

  document.getElementById("result").innerText = `Total Score: ${score}/60\n\n${message}`;
  document.getElementById("exportBtn").style.display = "inline-block";

  // Save result to memory
  window.latestQuizResult = {
    totalScore: score,
    message: message,
    detailedAnswers: results,
    date: new Date().toLocaleString()
  };
}

function exportResults() {
  const result = window.latestQuizResult;
  if (!result) return;

  const text = `
Low Mood Self-Check Result
--------------------------
Date: ${result.date}
Total Score: ${result.totalScore}/60
Feedback: ${result.message}

Answers:
${result.detailedAnswers.map((q, i) => `${i + 1}. ${q.question} → ${q.answer}`).join("\n")}
`;

  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `MojaMind_LowMoodQuiz_${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
