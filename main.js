// Get all tab buttons and menu items
const tabButtons = document.querySelectorAll('.tab-btn');
const menuItems = document.querySelectorAll('.menu-item');

// Function to show items for a specific category
function showItemsForCategory(category) {
  menuItems.forEach((item) => {
    const itemCategory = item.getAttribute('data-category');
    if (category === 'all' || itemCategory === category) {
      item.style.display = 'block'; // Show item
    } else {
      item.style.display = 'none'; // Hide item
    }
  });
}

// Set the default active tab (e.g., 'All')
const defaultCategory = 'appetizer'; // Change this to 'veg' or 'non-veg' if needed

// Show items for the default category on page load
showItemsForCategory(defaultCategory);

// Add active class to the default tab button
tabButtons.forEach((button) => {
  if (button.getAttribute('data-category') === defaultCategory) {
    button.classList.add('active');
  }
});

// Add event listeners to tab buttons
tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    tabButtons.forEach((btn) => btn.classList.remove('active'));
    // Add active class to the clicked button
    button.classList.add('active');

    // Get the category to filter
    const category = button.getAttribute('data-category');

    // Show items for the selected category
    showItemsForCategory(category);
  });
});

// Get form and elements
const form = document.getElementById('bookingForm');
const dateInput = document.getElementById('date');
const successPopup = document.getElementById('successPopup');
const closePopup = document.querySelector('.close');

// Open the calendar when clicking anywhere inside the input field
dateInput.addEventListener('click', () => {
  dateInput.showPicker(); // Opens the browser's native date picker
});

// Block bookings on Tuesdays
dateInput.addEventListener('input', () => {
  const selectedDate = new Date(dateInput.value);
  const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  if (dayOfWeek === 2) { // Tuesday
    alert('Bookings are not available on Tuesdays. Please choose another date.');
    dateInput.value = ''; // Clear the date input
  }
});

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form submission

  // Show "Please wait" message
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.textContent = 'Please wait...';
  submitBtn.disabled = true;

  try {
    // Send form data to FormSubmit
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });

    // Check if the response is successful
    if (response.ok) {
      // Show success popup
      successPopup.style.display = 'flex';
      form.reset(); // Reset the form
    } else {
      // Show failure alert
      alert('Failed to submit the form. Please try again.');
    }
  } catch (error) {
    // Show failure alert
    alert('Failed to submit the form. Please try again.');
  } finally {
    // Reset the button text and enable it
    submitBtn.textContent = 'Book Now';
    submitBtn.disabled = false;
  }
});

// Close the success popup
closePopup.addEventListener('click', () => {
  successPopup.style.display = 'none';
});

// Close the popup when clicking outside of it
window.addEventListener('click', (e) => {
  if (e.target === successPopup) {
    successPopup.style.display = 'none';
  }
});

document.getElementById("year").textContent = new Date().getFullYear();