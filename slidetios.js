const slides = document.querySelectorAll(".slide");
const container = document.getElementById("swipe-container");
const indicator = document.getElementById("slide-indicator");

let currentSlide = 0;

function updateSlidePosition() {
  container.style.transform = `translateY(-${currentSlide * 100}vh)`;
  indicator.textContent = `${currentSlide + 1} / ${slides.length}`;
}

function swipeUp() {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    updateSlidePosition();
  }
}

function swipeDown() {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlidePosition();
  }
}

// Touch support
let startY = 0;

container.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

container.addEventListener("touchend", (e) => {
  const endY = e.changedTouches[0].clientY;
  if (startY - endY > 50) swipeUp();
  if (endY - startY > 50) swipeDown();
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") swipeDown();
  if (e.key === "ArrowDown") swipeUp();
});

updateSlidePosition();
