const yearSpan = document.getElementById("currentyear");
const lastModifiedParagraph = document.getElementById("lastModified");

yearSpan.textContent = new Date().getFullYear();
lastModifiedParagraph.textContent = `Last Modified: ${document.lastModified}`;