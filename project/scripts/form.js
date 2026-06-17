// ================================
// FORM.JS
// Handles: product select population,
// localStorage review counter
// ================================

// -----------------------------
// Product Array (matches products.js)
// -----------------------------
const formProducts = [
  { id: "bk-001", name: "Arduino Starter Kit" },
  { id: "bk-002", name: "Basic Sensor Pack" },
  { id: "bk-003", name: "LED Robotics Car Kit" },
  { id: "ik-001", name: "Raspberry Pi 4 Bundle" },
  { id: "ik-002", name: "Robot Arm Kit" },
  { id: "ik-003", name: "Smart Home Automation Kit" },
  { id: "ak-001", name: "AI Vision Module" },
  { id: "ak-002", name: "Drone Build Kit" },
  { id: "tg-001", name: "Wireless Earbuds Pro" },
  { id: "tg-002", name: "Smart Power Bank 20000mAh" },
  { id: "ac-001", name: "7-in-1 USB-C Hub" },
  { id: "ac-002", name: "Compact Wireless Keyboard" }
];

// -----------------------------
// Populate Product Select
// -----------------------------
function populateProductSelect() {
  const productSelect = document.querySelector("#product-name");
  if (!productSelect) return;

  formProducts.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    productSelect.appendChild(option);
  });
}

// -----------------------------
// localStorage Review Counter
// Increments each time review.html loads
// -----------------------------
function updateReviewCount() {
  const reviewCountDisplay = document.querySelector("#review-count");
  if (!reviewCountDisplay) return;

  let count = parseInt(localStorage.getItem("zoneReviewCount")) || 0;
  count++;
  localStorage.setItem("zoneReviewCount", count);
  reviewCountDisplay.textContent = count;
}

// -----------------------------
// Conditional: Pre-fill product
// from URL param if available
// -----------------------------
function prefillFromURL() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("product-name");

  if (!productId) return;

  const select = document.querySelector("#product-name");
  if (!select) return;

  // Wait for options to be populated
  const option = select.querySelector(`option[value="${productId}"]`);
  if (option) {
    select.value = productId;
  }
}

// -----------------------------
// Init
// -----------------------------
populateProductSelect();
prefillFromURL();
updateReviewCount();
