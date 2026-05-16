// -----------------------------
// Footer Dates
// -----------------------------
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;

// -----------------------------
// Hamburger Menu Toggle
// -----------------------------
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");

  // Toggle icon
  if (navigation.classList.contains("open")) {
    menuButton.textContent = "✖";
  } else {
    menuButton.textContent = "☰";
  }
});