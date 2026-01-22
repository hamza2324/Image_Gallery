document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".gallery-item");
  const title = document.querySelector(".gallery-header h2");

  if (!buttons.length || !items.length) return;

  function applyFilter(category) {
    buttons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.filter === category);
    });

    items.forEach(item => {
      item.style.display =
        category === "all" || item.classList.contains(category)
          ? "block"
          : "none";
    });

    if (title) {
      title.innerText =
        category === "all"
          ? "All Photos"
          : category.charAt(0).toUpperCase() + category.slice(1);
    }
  }

  // Button clicks
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      applyFilter(filter);
      history.replaceState(null, "", `?category=${filter}`);
    });
  });

  // URL-based filter
  const params = new URLSearchParams(window.location.search);
  const categoryFromURL = params.get("category");

  applyFilter(categoryFromURL || "all");
});
