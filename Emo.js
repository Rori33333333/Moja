const emoregQuestions = [
  "Do you often react impulsively when you're upset?",
  "Do your emotions feel overwhelming or out of control?",
  "Do you bottle up emotions until they explode?",
  "Do you have trouble calming down after strong emotions?",
  "Do you feel ashamed or guilty for having feelings?",
  "Do you find yourself apologizing often for emotional reactions?",
  "Do you struggle to put your feelings into words?",
  "Do you avoid emotions by distracting yourself constantly?",
  "Do you rely on unhealthy habits (e.g. overeating, isolation) to cope?",
  "Do your emotions affect your ability to concentrate or make decisions?",
  "Do you feel like your emotions are too intense or 'too much'?",
  "Do you regret how you express emotions often?",
  "Do people say you're too sensitive or too emotional?",
  "Do you fear losing control of your emotions in front of others?",
  "Do you avoid situations that might trigger emotional discomfort?"
];

const form = document.getElementById('emoregQuiz');

emoregQuestions.forEach((q, i) => {
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

function submitEmoregQuiz() {
  let yesCount = 0;
  const answers = [];

  for (let i = 0; i < emoregQuestions.length; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (!selected) {
      alert("Please answer all questions.");
      return;
    }
    const val = selected.value;
    if (val === "yes") yesCount++;
    answers.push({ question: emoregQuestions[i], answer: val });
  }

  let message = "";
  if (yesCount <= 4) message = "You appear to have strong emotional regulation skills. Keep nurturing them.";
  else if (yesCount <= 8) message = "You might experience occasional emotional overwhelm. Mindfulness and naming emotions can help.";
  else if (yesCount <= 12) message = "Emotions might be difficult to manage right now. Building emotional literacy could support you.";
  else message = "You may be struggling with deep emotional dysregulation. Therapy, journaling, and DBT tools can help you reclaim control.";

  document.getElementById("emoregResult").innerText = `Yes Answers: ${yesCount}/15\n\n${message}`;
  document.getElementById("emoregExportBtn").style.display = "inline-block";

  window.latestEmoregResult = {
    totalYes: yesCount,
    message,
    answers,
    date: new Date().toLocaleString()
  };
}

function exportEmoregResults() {
  const result = window.latestEmoregResult;
  if (!result) return;

  const text = `
Emotional Regulation Self-Check (Yes/No)
----------------------------------------
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
  a.download = `MojaMind_EmoRegQuiz_${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
