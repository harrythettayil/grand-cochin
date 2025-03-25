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
  const form = document.getElementById("bookingForm");
  const popup = document.getElementById("popup");
  const submitButton = document.getElementById("submitBtn");
  const closePopupButton = document.getElementById("closePopup");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Disable button and change text
    submitButton.disabled = true;
    submitButton.textContent = "Please wait...";

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          showPopup();
        } else {
          alert(json.message);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong!");
      })
      .finally(() => {
        form.reset();
        submitButton.disabled = false;
        submitButton.textContent = "Send";
      });
  });

  function showPopup() {
    popup.style.display = "block";
  }

  function closePopup() {
    popup.style.display = "none";
  }

  // Fix: Ensure the popup closes when clicking "OK"
  closePopupButton.addEventListener("click", closePopup);

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
