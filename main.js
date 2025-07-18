const toggleBtn = document.getElementById("darkModeToggle");
const root = document.documentElement;

toggleBtn?.addEventListener("click", () => {
  const isDark = root.classList.toggle("dark-mode");
  localStorage.setItem("mojamindTheme", isDark ? "dark" : "light");
});

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("mojamindTheme");
  if (saved === "dark") {
    root.classList.add("dark-mode");
  }

  showWordOfTheDay();
});

document.getElementById("bookmarkBtn")?.addEventListener("click", function () {
  const title = document.title;
  const url = window.location.href;

  let bookmarks = JSON.parse(localStorage.getItem("mojamindBookmarks")) || [];

  if (!bookmarks.some(b => b.url === url)) {
    bookmarks.push({ title, url });
    localStorage.setItem("mojamindBookmarks", JSON.stringify(bookmarks));
    alert("Page bookmarked!");
  } else {
    alert("Already bookmarked.");
  }
});

const glossaryPool = [
  { term: "Anxiety", definition: "A feeling of worry, nervousness, or unease." },
  { term: "Burnout", definition: "Emotional, physical, and mental exhaustion due to prolonged stress." },
  { term: "Coping", definition: "Ways to manage stress or difficult emotions." },
  { term: "Depression", definition: "A persistent feeling of sadness or loss of interest." },
  { term: "Mindfulness", definition: "Being aware and present in the current moment." },
  { term: "Trigger", definition: "Something that evokes a strong emotional response." }
];

function showWordOfTheDay() {
  const today = new Date().getDate();
  const index = today % glossaryPool.length;
  const word = glossaryPool[index];

  document.getElementById("word").textContent = word.term;
  document.getElementById("definition").textContent = word.definition;
}