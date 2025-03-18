document.addEventListener("DOMContentLoaded", function () {
  // Cache selectors
  const menuLinks = document.querySelector(".navbar .menu-items");
  const menuToggleCheckbox = document.querySelector(
    ".navbar-container input[type='checkbox']"
  );
  const tabButtons = document.querySelectorAll(".tab-btn");
  const menuItems = document.querySelectorAll(".menu-item");
  const form = document.getElementById("bookingForm");
  const dateInput = document.getElementById("date");
  const successPopup = document.getElementById("successPopup");
  const closePopup = document.querySelector(".close");
  const submitBtn = document.getElementById("submitBtn");
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

  // Handle form submission
  form?.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission
    submitBtn.textContent = "Please wait...";
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }, // Even if FormSubmit ignores this
      });

      //   console.log("Response Type:", response.type); // Debugging
      //   console.log("Status Code:", response.status); // Debugging

      if (response.ok) {
        // Form submission was successful
        successPopup.style.display = "flex";
        form.reset();
      } else {
        alert("Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      submitBtn.textContent = "Book Now";
      submitBtn.disabled = false;
    }
  });

  // Close the success popup when clicking close button or outside popup
  closePopup?.addEventListener(
    "click",
    () => (successPopup.style.display = "none")
  );
  window.addEventListener("click", (e) => {
    if (e.target === successPopup) successPopup.style.display = "none";
  });

  // Set the current year dynamically
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
