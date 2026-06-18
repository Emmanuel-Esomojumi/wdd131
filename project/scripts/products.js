// ================================
// PRODUCTS.JS
// Handles: product data, card rendering,
// category filtering, localStorage favourites
// ================================

// -----------------------------
// Product Data — Array of Objects
// -----------------------------
const products = [
  {
    id: "bk-001",
    name: "Arduino Starter Kit",
    category: "Beginner",
    price: 45000,
    rating: 4.6,
    description: "The perfect entry point into electronics and coding. Includes an Arduino Uno, breadboard, sensors, and a step-by-step project guide.",
    image: "images/arduino-starter-kit.webp"
  },
  {
    id: "bk-002",
    name: "Basic Sensor Pack",
    category: "Beginner",
    price: 18500,
    rating: 4.3,
    description: "A bundle of 20 essential sensors including temperature, motion, light, and sound — ideal for first-time builders.",
    image: "images/basic-sensor-pack.webp"
  },
  {
    id: "bk-003",
    name: "LED Robotics Car Kit",
    category: "Beginner",
    price: 28000,
    rating: 4.5,
    description: "Build and program your own robot car from scratch. Features obstacle avoidance and remote control modes.",
    image: "images/led-robotics-car.webp"
  },
  {
    id: "ik-001",
    name: "Raspberry Pi 4 Bundle",
    category: "Intermediate",
    price: 89000,
    rating: 4.8,
    description: "A complete Raspberry Pi 4 package including power supply, SD card, case, and beginner project guide for Linux and Python.",
    image: "images/raspberry-pi-4.webp"
  },
  {
    id: "ik-002",
    name: "Robot Arm Kit",
    category: "Intermediate",
    price: 67500,
    rating: 4.4,
    description: "A programmable 4-axis robot arm with servo motors and a control board. Compatible with Arduino and Raspberry Pi.",
    image: "images/robot-arm-kit.webp"
  },
  {
    id: "ik-003",
    name: "Smart Home Automation Kit",
    category: "Intermediate",
    price: 54000,
    rating: 4.2,
    description: "Control lights, fans, and appliances wirelessly. Includes ESP8266 Wi-Fi modules, relays, and MQTT integration guide.",
    image: "images/smart-home-kit.webp"
  },
  {
    id: "ak-001",
    name: "AI Vision Module",
    category: "Advanced",
    price: 138000,
    rating: 4.9,
    description: "A dedicated machine learning camera module capable of real-time object detection, facial recognition, and edge AI inference.",
    image: "images/ai-vision-module.webp"
  },
  {
    id: "ak-002",
    name: "Drone Build Kit",
    category: "Advanced",
    price: 195000,
    rating: 4.7,
    description: "Build a fully functional quadcopter from components. Includes flight controller, motors, ESCs, frame, and programming guide.",
    image: "images/drone-build-kit.webp"
  },
  {
    id: "tg-001",
    name: "Wireless Earbuds Pro",
    category: "Gadget",
    price: 32000,
    rating: 4.5,
    description: "True wireless earbuds with active noise cancellation, 24-hour battery life, and IPX5 water resistance.",
    image: "images/wireless-earbuds.webp"
  },
  {
    id: "tg-002",
    name: "Smart Power Bank 20000mAh",
    category: "Gadget",
    price: 24500,
    rating: 4.6,
    description: "A 20,000mAh power bank with 65W USB-C PD fast charging, dual USB-A ports, and LED power display.",
    image: "images/power-bank.webp"
  },
  {
    id: "ac-001",
    name: "7-in-1 USB-C Hub",
    category: "Accessory",
    price: 19000,
    rating: 4.4,
    description: "Expand your laptop with HDMI 4K, 3x USB-A, SD card reader, Ethernet, and USB-C PD pass-through — all in one slim hub.",
    image: "images/usb-hub.webp"
  },
  {
    id: "ac-002",
    name: "Compact Wireless Keyboard",
    category: "Accessory",
    price: 16500,
    rating: 4.3,
    description: "A slim, rechargeable wireless keyboard with multi-device Bluetooth pairing and scissor-switch keys for quiet typing.",
    image: "images/wireless-keyboard.webp"
  }
];

// -----------------------------
// localStorage Helpers
// -----------------------------
function getFavourites() {
  const stored = localStorage.getItem("zoneFavourites");
  return stored ? JSON.parse(stored) : [];
}

function saveFavourites(favs) {
  localStorage.setItem("zoneFavourites", JSON.stringify(favs));
}

function isFavourite(productId) {
  return getFavourites().includes(productId);
}

function toggleFavourite(productId) {
  let favs = getFavourites();
  if (favs.includes(productId)) {
    favs = favs.filter(id => id !== productId);
  } else {
    favs.push(productId);
  }
  saveFavourites(favs);
  return favs.includes(productId);
}

// -----------------------------
// Format Price in Naira
// -----------------------------
function formatPrice(amount) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

// -----------------------------
// Render Star Rating
// -----------------------------
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return `${"★".repeat(full)}${"½".repeat(half)}${"☆".repeat(empty)} (${rating})`;
}

// -----------------------------
// Build a Product Card
// index is the card's position in the current filtered list —
// used so the first few images above the fold load eagerly
// instead of fighting the browser's lazy-load timing
// -----------------------------
function buildProductCard(product, index) {
  const saved = isFavourite(product.id);
  const card = document.createElement("article");
  card.classList.add("product-card");
  card.dataset.category = product.category;

  const isAboveFold = index < 3;
  const imgLoadAttrs = isAboveFold
    ? 'loading="eager" fetchpriority="high"'
    : 'loading="lazy"';

  card.innerHTML = `
    <div class="card-img-wrap">
      <img
        src="${product.image}"
        alt="${product.name}"
        ${imgLoadAttrs}
        width="400"
        height="300"
      >
      <span class="card-category-badge">${product.category}</span>
      <button
        class="fav-btn ${saved ? "saved" : ""}"
        data-id="${product.id}"
        aria-label="${saved ? "Remove from favourites" : "Add to favourites"}"
        aria-pressed="${saved}"
      >${saved ? "❤️" : "🤍"}</button>
    </div>
    <div class="card-body">
      <h3 class="card-title">${product.name}</h3>
      <p class="card-description">${product.description}</p>
      <div class="card-meta">
        <span class="card-price">${formatPrice(product.price)}</span>
        <span class="card-rating" aria-label="Rating: ${product.rating} out of 5">${renderStars(product.rating)}</span>
      </div>
    </div>
  `;

  // Favourite button event
  const favBtn = card.querySelector(".fav-btn");
  favBtn.addEventListener("click", () => {
    const nowSaved = toggleFavourite(product.id);
    favBtn.textContent = nowSaved ? "❤️" : "🤍";
    favBtn.classList.toggle("saved", nowSaved);
    favBtn.setAttribute("aria-pressed", nowSaved);
    favBtn.setAttribute("aria-label", nowSaved ? "Remove from favourites" : "Add to favourites");
    renderFavourites();
  });

  return card;
}

// -----------------------------
// Render Product Grid
// Builds all cards into a DocumentFragment first so the browser
// only does one layout pass instead of one per card
// -----------------------------
function renderProducts(category = "all") {
  const grid = document.querySelector("#productGrid");
  const noResults = document.querySelector("#noResults");
  const resultsCount = document.querySelector("#resultsCount");

  if (!grid) return;

  const filtered = category === "all"
    ? products
    : products.filter(p => p.category === category);

  if (filtered.length === 0) {
    grid.innerHTML = "";
    noResults?.classList.remove("hidden");
  } else {
    noResults?.classList.add("hidden");

    const fragment = document.createDocumentFragment();
    filtered.forEach((product, index) => {
      fragment.appendChild(buildProductCard(product, index));
    });

    grid.innerHTML = "";
    grid.appendChild(fragment);
  }

  if (resultsCount) {
    const label = category === "all" ? "all products" : `${category} products`;
    resultsCount.textContent = `Showing ${filtered.length} ${label}`;
  }
}

// -----------------------------
// Render Favourites Panel
// -----------------------------
function renderFavourites() {
  const listEl = document.querySelector("#favouritesList");
  if (!listEl) return;

  const favIds = getFavourites();

  if (favIds.length === 0) {
    listEl.innerHTML = `<p class="fav-empty">No favourites saved yet. Click ❤️ on any product card to save it here.</p>`;
    return;
  }

  const favProducts = products.filter(p => favIds.includes(p.id));
  const fragment = document.createDocumentFragment();

  favProducts.forEach(p => {
    const item = document.createElement("div");
    item.classList.add("fav-item");
    item.innerHTML = `
      <span class="fav-item-name">${p.name}</span>
      <span class="fav-item-price">${formatPrice(p.price)}</span>
    `;
    fragment.appendChild(item);
  });

  listEl.innerHTML = "";
  listEl.appendChild(fragment);
}

// -----------------------------
// Filter Button Logic
// -----------------------------
function initFilterButtons() {
  const filterContainer = document.querySelector("#homeFilterButtons");
  if (!filterContainer) return;

  filterContainer.addEventListener("click", (e) => {
    if (!e.target.classList.contains("filter-btn")) return;

    const category = e.target.dataset.category;

    filterContainer.querySelectorAll(".filter-btn").forEach(btn => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");

    renderProducts(category);
  });
}

// -----------------------------
// Clear Favourites Button
// -----------------------------
function initClearFavourites() {
  const clearBtn = document.querySelector("#clearFavourites");
  if (!clearBtn) return;

  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("zoneFavourites");
    renderFavourites();
    const activeBtn = document.querySelector(".filter-btn.active");
    const activeCategory = activeBtn ? activeBtn.dataset.category : "all";
    renderProducts(activeCategory);
  });
}

// -----------------------------
// Init on Page Load
// renderProducts runs first and paints the main grid;
// renderFavourites is deferred a frame so it doesn't
// compete with the grid's initial paint
// -----------------------------
renderProducts();
initFilterButtons();
initClearFavourites();
requestAnimationFrame(() => renderFavourites());