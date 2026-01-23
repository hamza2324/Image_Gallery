document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".gallery-item");
  const title = document.querySelector(".gallery-header h2");
  const viewButtons = document.querySelectorAll(".view-btn");
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const modalVideo = document.getElementById("modalVideo");
  const closeModal = document.querySelector(".close-modal");

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

  // Image modal functionality
  viewButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const galleryItem = btn.closest(".gallery-item");
      const img = galleryItem.querySelector("img");
      const video = galleryItem.querySelector("video");
      
      if (img) {
        modalImage.style.display = "block";
        modalVideo.style.display = "none";
        modalImage.src = img.src;
        modal.style.display = "block";
      } else if (video) {
        modalImage.style.display = "none";
        modalVideo.style.display = "block";
        const source = video.querySelector("source");
        if (source) {
          document.getElementById("modalVideoSource").src = source.src;
          modalVideo.load();
        }
        modal.style.display = "block";
      }
    });
  });

  // Close modal when X is clicked
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    modalVideo.pause();
  });

  // Close modal when clicking outside the image
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      modalVideo.pause();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
      modalVideo.pause();
    }
  });
});

