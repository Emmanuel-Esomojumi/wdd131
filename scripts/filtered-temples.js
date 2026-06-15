// -----------------------------
// Temple Data Array
// -----------------------------
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // Three additional temples added
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-13760-main.jpg"
  },
  {
    templeName: "Lagos Nigeria",
    location: "Lagos, Nigeria",
    dedicated: "2024, March, 3",
    area: 19500,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/lagos-nigeria-temple/lagos-nigeria-temple-58577-main.jpg"
  },
  {
    templeName: "Nairobi Kenya",
    location: "Nairobi, Kenya",
    dedicated: "1985, February, 17",
    area: 17500,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/nairobi-kenya-temple/nairobi-kenya-temple-60488-main.jpg"
  }
];

// -----------------------------
// Render Temple Cards
// -----------------------------
function createTempleCard(temple) {
  const figure = document.createElement("figure");

  // dedicated year for filtering
  const dedicatedYear = parseInt(temple.dedicated.split(",")[0]);

  figure.innerHTML = `
    <img
      src="${temple.imageUrl}"
      alt="${temple.templeName} Temple"
      loading="lazy"
      width="400"
      height="250"
    >
    <figcaption>
      <h3>${temple.templeName}</h3>
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
      <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
    </figcaption>
  `;

  return figure;
}

function displayTemples(list) {
  const gallery = document.querySelector("#gallery");
  gallery.innerHTML = ""; // clear before rendering
  list.forEach(temple => gallery.appendChild(createTempleCard(temple)));
}

// -----------------------------
// Filter Logic
// -----------------------------
function filterTemples(filter) {
  switch (filter) {
    case "old":
      return temples.filter(t => parseInt(t.dedicated.split(",")[0]) < 1900);
    case "new":
      return temples.filter(t => parseInt(t.dedicated.split(",")[0]) > 2000);
    case "large":
      return temples.filter(t => t.area > 90000);
    case "small":
      return temples.filter(t => t.area < 10000);
    default:
      return temples;
  }
}

// -----------------------------
// Nav Filter Events
// -----------------------------
const navLinks = document.querySelectorAll("nav a");
const galleryTitle = document.querySelector("#gallery-title");

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const filter = link.getAttribute("data-filter");
    galleryTitle.textContent = link.textContent;
    displayTemples(filterTemples(filter));

    // close mobile nav after click
    navigation.classList.remove("open");
    menuButton.textContent = "☰";
  });
});

// -----------------------------
// Hamburger Menu
// -----------------------------
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  menuButton.textContent = navigation.classList.contains("open") ? "✖" : "☰";
});

// -----------------------------
// Footer Dates
// -----------------------------
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

// -----------------------------
// Initial Load — show all temples
// -----------------------------
displayTemples(temples);