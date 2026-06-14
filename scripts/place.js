// -----------------------------
// Footer Dates
// -----------------------------
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;

// -----------------------------
// Wind Chill Calculation
// -----------------------------
const temperature = 5;  // °C
const windSpeed = 20;   // km/h

function calculateWindChill(temp, speed) {
  return (13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16)).toFixed(1);
}

const windChillDisplay = document.querySelector("#wind-chill");

// only calculate if temp <= 10°C and wind speed > 4.8 km/h
if (temperature <= 10 && windSpeed > 4.8) {
  windChillDisplay.textContent = `${calculateWindChill(temperature, windSpeed)}°C`;
} else {
  windChillDisplay.textContent = "N/A";
}