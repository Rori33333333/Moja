const selfQuestions = [
  "Do you often doubt your abilities even when others praise you?",
  "Do you feel uncomfortable accepting compliments?",
  "Do you compare yourself negatively to others?",
  "Do you struggle to speak up or express your opinion?",
  "Do you feel like you're not good enough?",
  "Do you feel ashamed of your appearance or personality?",
  "Do you apologize often even when you did nothing wrong?",
  "Do you avoid opportunities because you're afraid to fail?",
  "Do you find it hard to believe in your value or worth?",
  "Do you criticize yourself more than you encourage yourself?",
  "Do you feel unworthy of love or respect?",
  "Do you hide your real self out of fear of rejection?",
  "Do you find it hard to feel proud of your achievements?",
  "Do you feel like you're always being judged?",
  "Do you find it easier to support others than yourself?"
];

const form = document.getElementById('selfQuiz');

selfQuestions.forEach((q, i) => {
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

function submitSelfQuiz() {
  let yesCount = 0;
  const answers = [];

  for (let i = 0; i < selfQuestions.length; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (!selected) {
      alert("Please answer all questions.");
      return;
    }
    const val = selected.value;
    if (val === "yes") yesCount++;
    answers.push({ question: selfQuestions[i], answer: val });
  }

  let message = "";
  if (yesCount <= 4) {
    message = "You seem to have a positive self-view. Keep nurturing it with self-compassion.";
  } else if (yesCount <= 8) {
    message = "You may struggle with confidence in some areas. Explore affirmations and supportive habits.";
  } else if (yesCount <= 12) {
    message = "You may be facing deep-rooted self-esteem challenges. You're worthy — reflection and support can help.";
  } else {
    message = "You may experience low self-worth frequently. Please know you're not alone — self-kindness and seeking support is a sign of strength.";
  }

  document.getElementById("selfResult").innerText = `Yes Answers: ${yesCount}/15\n\n${message}`;
  document.getElementById("selfExportBtn").style.display = "inline-block";

  window.latestSelfResult = {
    totalYes: yesCount,
    message,
    answers,
    date: new Date().toLocaleString()
  };
}

function exportSelfResults() {
  const result = window.latestSelfResult;
  if (!result) return;

  const text = `
Self-Esteem & Confidence Self-Check (Yes/No)
--------------------------------------------
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
  a.download = `MojaMind_SelfEsteemQuiz_${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
