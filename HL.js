document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const helplineCategories = document.querySelectorAll('.helpline-category');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    helplineCategories.forEach(category => {
      // Check if category title matches
      const categoryTitle = category.querySelector('h2').textContent.toLowerCase();

      // Filter helpline items inside this category
      const items = Array.from(category.querySelectorAll('li'));
      let anyItemVisible = false;

      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        const isVisible = text.includes(query) || categoryTitle.includes(query);
        item.style.display = isVisible ? '' : 'none';
        if (isVisible) anyItemVisible = true;
      });

      // Show category only if it has visible items
      category.style.display = anyItemVisible ? '' : 'none';
    });
  });
});
