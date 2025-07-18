const anxietyQuestions = [
  "Do you often feel nervous or on edge for no clear reason?",
  "Do you worry excessively about everyday things?",
  "Do you have difficulty controlling your worries once they start?",
  "Do you feel restless or find it hard to sit still?",
  "Do you get easily irritated or on edge?",
  "Do you experience muscle tension or aches with no cause?",
  "Do you have trouble concentrating due to worry or panic?",
  "Do you avoid certain places or people out of fear or nervousness?",
  "Do you often expect the worst even when there's no reason?",
  "Do you feel overwhelmed by small problems or decisions?",
  "Do you feel panic rising in your chest or stomach?",
  "Do you have trouble sleeping because of racing thoughts?",
  "Do you avoid tasks out of fear of failure or embarrassment?",
  "Do you experience rapid heartbeat or shortness of breath during stress?",
  "Have you ever felt like you might lose control or go crazy from anxiety?"
];

const form = document.getElementById('anxietyQuiz');

anxietyQuestions.forEach((q, index) => {
  const qBlock = document.createElement('div');
  qBlock.className = "question";
  qBlock.innerHTML = `<p>${index + 1}. ${q}</p>`;
  const options = document.createElement('div');
  options.className = "options";
  options.innerHTML = `
    <label>
      <input type="radio" name="q${index}" value="yes" required /> Yes
    </label>
    <label>
      <input type="radio" name="q${index}" value="no" required /> No
    </label>
  `;
  qBlock.appendChild(options);
  form.appendChild(qBlock);
});

function submitAnxietyQuiz() {
  let yesCount = 0;
  let redFlag = false;
  const answers = [];

  for (let i = 0; i < anxietyQuestions.length; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (!selected) {
      alert("Please answer all questions.");
      return;
    }

    const answer = selected.value;
    if (answer === "yes") yesCount++;
    if (i === 14 && answer === "yes") redFlag = true;

    answers.push({ question: anxietyQuestions[i], answer });
  }

  let message = "";
  if (redFlag) {
    message += "⚠️ You're experiencing intense anxiety symptoms. Please consider reaching out to a professional.\n\n";
  }

  if (yesCount <= 4) {
    message += "You show minimal signs of anxiety. Regular self-care and reflection are recommended.";
  } else if (yesCount <= 8) {
    message += "Mild anxiety – coping tools and grounding exercises may help.";
  } else if (yesCount <= 12) {
    message += "Moderate signs – it may help to speak to a therapist or counselor.";
  } else {
    message += "Strong signs of anxiety – seeking professional support is recommended.";
  }

  document.getElementById("anxietyResult").innerText = `Yes Answers: ${yesCount}/15\n\n${message}`;
  document.getElementById("anxietyExportBtn").style.display = "inline-block";

  window.latestAnxietyResult = {
    totalYes: yesCount,
    message,
    answers,
    date: new Date().toLocaleString()
  };
}

function exportAnxietyResults() {
  const result = window.latestAnxietyResult;
  if (!result) return;

  const text = `
Anxiety Self-Check (Yes/No)
----------------------------
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
  a.download = `MojaMind_AnxietyQuiz_${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
