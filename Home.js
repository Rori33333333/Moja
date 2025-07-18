document.addEventListener('DOMContentLoaded', () => {
  // Scroll indicator
  const scrollIndicator = document.getElementById('scrollIndicator');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollIndicator.style.width = scrollPercent + '%';
  });

  // Smooth scroll "Begin Here" button to Seed phase
  const beginBtn = document.getElementById('beginSeedBtn');
  const seedPhase = document.getElementById('seed');
  beginBtn.addEventListener('click', () => {
    seedPhase.scrollIntoView({ behavior: 'smooth' });
  });

  // Welcome popup control (show once per session)
  const popup = document.getElementById('welcomePopup');
  const closePopupBtn = document.getElementById('closePopup');
  if (!sessionStorage.getItem('welcomeShown')) {
    popup.classList.remove('hidden');
  }
  closePopupBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
    sessionStorage.setItem('welcomeShown', 'true');
  });

  // Daily Tip popup
  const tips = [
    "Take a deep breath and count to 4.",
    "Drink a glass of water. Hydration boosts focus!",
    "Stretch your neck and shoulders.",
    "Write one thing you're grateful for."
  ];
  const tipBox = document.createElement("div");
  tipBox.className = "tip-box";
  tipBox.textContent = `🧠 Tip of the Day: ${tips[Math.floor(Math.random() * tips.length)]}`;
  Object.assign(tipBox.style, {
    position: "fixed",
    top: "15px",
    right: "20px",
    background: "#EEE9BF",
    padding: "10px 20px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    zIndex: 999,
  });
  document.body.appendChild(tipBox);

  // Mood of the Day popup
  const moods = [
    "🌤️ Calm: Listen to soft music today.",
    "🌈 Hopeful: Write down a goal.",
    "🍃 Reflective: Journal for 5 minutes.",
    "🔥 Energized: Do a quick stretch."
  ];
  const moodBox = document.createElement("div");
  moodBox.className = "mood-box";
  moodBox.textContent = `🧘 Mood of the Day: ${moods[Math.floor(Math.random() * moods.length)]}`;
  Object.assign(moodBox.style, {
    position: "fixed",
    top: "60px",
    right: "20px",
    background: "#EEE9BF",
    padding: "10px 20px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    zIndex: 999,
  });
  document.body.appendChild(moodBox);

  // Phase completion stars and tooltips
  document.querySelectorAll(".phase").forEach(phase => {
    const star = document.createElement("span");
    star.textContent = "⭐";
    star.style.marginLeft = "10px";
    star.style.cursor = "pointer";
    star.style.position = "relative";

    const tooltip = document.createElement("div");
    tooltip.textContent = "Mark this phase as complete";
    tooltip.style.position = "absolute";
    tooltip.style.background = "#EEE9BF";
    tooltip.style.padding = "5px 10px";
    tooltip.style.borderRadius = "8px";
    tooltip.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
    tooltip.style.top = "-35px";
    tooltip.style.left = "0";
    tooltip.style.whiteSpace = "nowrap";
    tooltip.style.opacity = "0";
    tooltip.style.pointerEvents = "none";
    tooltip.style.transition = "opacity 0.5s ease-in-out";

    star.appendChild(tooltip);

    star.addEventListener("mouseenter", () => {
      tooltip.style.opacity = "1";
      tooltip.style.pointerEvents = "auto";
      setTimeout(() => {
        tooltip.style.opacity = "0";
        tooltip.style.pointerEvents = "none";
      }, 45000);
    });

    star.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
      tooltip.style.pointerEvents = "none";
    });

    star.addEventListener("click", () => {
      const label = phase.querySelector("a").textContent;
      localStorage.setItem(`completed-${label}`, "true");
      alert(`${label} marked as complete! 🌟`);
    }); 
    
    phase.appendChild(star);}
