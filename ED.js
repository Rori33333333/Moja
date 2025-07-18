const edQuestions = [
  "Do you frequently skip meals or eat far less than your body needs?",
  "Do you feel intense guilt or shame after eating?",
  "Do you track calories or food obsessively?",
  "Do you avoid eating in front of others?",
  "Do you feel out of control when eating certain foods?",
  "Have you engaged in purging behaviors (e.g., vomiting, laxatives)?",
  "Do you binge eat — eating large amounts even when not hungry?",
  "Do you try to ‘make up for’ eating with fasting or excessive exercise?",
  "Do you feel anxious or panicked at the idea of gaining weight?",
  "Do you weigh yourself frequently and feel upset by changes?",
  "Do you experience mood swings related to food or your body image?",
  "Have others expressed concern about your eating habits or appearance?",
  "Do you restrict entire food groups without medical reason?",
  "Do you feel your worth depends on your weight or body shape?",
  "Do you feel numb, ashamed, or disconnected during or after eating?"
];

const form = document.getElementById('edQuiz');

edQuestions.forEach((q, i) => {
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

function submitEDQuiz() {
  let yesCount = 0;
  const answers = [];

  for (let i = 0; i < edQuestions.length; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (!selected) {
      alert("Please answer all questions.");
      return;
    }
    const val = selected.value;
    if (val === "yes") yesCount++;
    answers.push({ question: edQuestions[i], answer: val });
  }

  let message = "";
  if (yesCount <= 3) {
    message = "You show few signs of disordered eating. Still, healthy relationships with food take time and intention.";
  } else if (yesCount <= 7) {
    message = "You may have a strained relationship with food or body image. Reflecting on your eating patterns and emotional triggers may help.";
  } else if (yesCount <= 12) {
    message = "Your responses suggest disordered eating behaviors. Support is available — you deserve nourishment and kindness.";
  } else {
    message = "You may be facing an eating disorder. Please consider speaking with a mental health or medical professional. You are not alone, and recovery is possible.";
  }

  document.getElementById("edResult").innerText = `Yes Answers: ${yesCount}/15\n\n${message}`;
  document.getElementById("edExportBtn").style.display = "inline-block";

  window.latestEDResult = {
    totalYes: yesCount,
    message,
    answers,
    date: new Date().toLocaleString()
  };
}

function exportEDResults() {
  const result = window.latestEDResult;
  if (!result) return;

  const text = `
Eating Disorders Self-Check (Yes/No)
------------------------------------
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
  a.download = `MojaMind_EatingDisorderQuiz_${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
