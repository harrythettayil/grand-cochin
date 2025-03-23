document.addEventListener("DOMContentLoaded", function () {
  // Cache selectors
  const menuLinks = document.querySelector(".navbar .menu-items");
  const menuToggleCheckbox = document.querySelector(
    ".navbar-container input[type='checkbox']"
  );
  const tabButtons = document.querySelectorAll(".tab-btn");
  const menuItems = document.querySelectorAll(".menu-item");
  const dateInput = document.getElementById("date");
  const timeSelect = document.getElementById("time");
  const yearElement = document.getElementById("year");

  // Close mobile navbar when a menu link is clicked (Event Delegation)
  if (menuLinks) {
    menuLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        menuToggleCheckbox.checked = false;
      }
    });
  }

  // Show menu items based on category
  const showItemsForCategory = (category) => {
    menuItems.forEach((item) => {
      item.style.display =
        item.getAttribute("data-category") === category || category === "all"
          ? "block"
          : "none";
    });
  };

  // Set default category
  const defaultCategory = "appetizer";
  showItemsForCategory(defaultCategory);

  // Add active class to the clicked tab & show respective menu items
  document.querySelector(".tabs").addEventListener("click", (e) => {
    if (e.target.classList.contains("tab-btn")) {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");
      showItemsForCategory(e.target.getAttribute("data-category"));
    }
  });

  // Open the calendar when clicking the date input field
  dateInput?.addEventListener("click", () => dateInput.showPicker());

  // Show alert when selecting closing time
  timeSelect?.addEventListener("change", function () {
    if (this.value === "22:15") {
      alert("⚠️ Kitchen closes at 10:30 PM.");
    }
  });

  // Set the current year dynamically
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
