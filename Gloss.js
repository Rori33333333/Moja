// Glossary bookmark save buttons
  document.querySelectorAll(".glossary-item").forEach(item => {
    const bookmarkBtn = document.createElement("button");
    bookmarkBtn.textContent = "🔖 Save";
    bookmarkBtn.style.marginLeft = "10px";
    bookmarkBtn.addEventListener("click", () => {
      let bookmarks = JSON.parse(localStorage.getItem("mojamindBookmarks")) || [];
      if (!bookmarks.includes(item.textContent)) {
        bookmarks.push(item.textContent);
        localStorage.setItem("mojamindBookmarks", JSON.stringify(bookmarks));
        alert("Saved to bookmarks!");
      } else {
        alert("Already bookmarked.");
      }
    });
    item.appendChild(bookmarkBtn);
  });

  // View bookmarks button
  const viewBookmarksBtn = document.getElementById("viewBookmarksBtn");
  if (viewBookmarksBtn) {
    viewBookmarksBtn.addEventListener("click", () => {
      const saved = JSON.parse(localStorage.getItem("mojamindBookmarks")) || [];
      alert("📚 Your Bookmarks:\n" + (saved.length ? saved.join("\n") : "No bookmarks saved."));
    });
  }

  // Search bar filtering
  const searchInput = document.getElementById("searchBar");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const term = searchInput.value.toLowerCase();
      document.querySelectorAll(".glossary-item").forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(term) ? "flex" : "none";
      });
    });
  }

