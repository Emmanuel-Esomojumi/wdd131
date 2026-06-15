// -----------------------------
// Product Array
// -----------------------------
const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

// -----------------------------
// Populate Product Select
// -----------------------------
const productSelect = document.querySelector("#product-name");

if (productSelect) {
  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    productSelect.appendChild(option);
  });
}

// -----------------------------
// localStorage Review Counter
// — runs on review.html only
// -----------------------------
const reviewCountDisplay = document.querySelector("#review-count");

if (reviewCountDisplay) {
  // increment counter each time review.html loads
  let count = parseInt(localStorage.getItem("reviewCount")) || 0;
  count++;
  localStorage.setItem("reviewCount", count);
  reviewCountDisplay.textContent = count;
}

// -----------------------------
// Footer Dates
// -----------------------------
const yearSpan = document.querySelector("#currentyear");
const lastModifiedPara = document.querySelector("#lastModified");

if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModifiedPara) lastModifiedPara.textContent = `Last Modified: ${document.lastModified}`;