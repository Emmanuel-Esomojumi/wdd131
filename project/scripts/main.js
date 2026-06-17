// ================================
// MAIN.JS — Shared across all pages
// ================================

// -----------------------------
// Footer: Current Year
// -----------------------------
const yearSpan = document.querySelector("#currentyear");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// -----------------------------
// Footer: Last Modified
// -----------------------------
const lastModifiedEl = document.querySelector("#lastModified");
if (lastModifiedEl) {
  lastModifiedEl.textContent = `Last Modified: ${document.lastModified}`;
}

// -----------------------------
// Hamburger Navigation Toggle
// -----------------------------
function initNavToggle() {
  const toggle = document.querySelector("#navToggle");
  const nav = document.querySelector("#mainNav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

initNavToggle();
