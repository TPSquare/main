const pagesElement = document.getElementById("pages");

const ICONS = await fetch("./icons.json").then((res) => res.json());
const MATERIALS = await fetch("./materials.json").then((res) => res.json());
const MATERIALS_NAMES = Object.keys(MATERIALS);
const ITEMS_PER_PAGE = 32;
const pages = Math.ceil(MATERIALS_NAMES.length / ITEMS_PER_PAGE);
for (let p = 0; p < pages; p++) {
  let itemsHTML = "";
  for (let i = 0; i < ITEMS_PER_PAGE; i++) {
    const name = MATERIALS_NAMES[p * ITEMS_PER_PAGE + i];
    if (!name) break;
    const quantity = MATERIALS[name];
    const icon = ICONS[name];
    const itemHTML = createItemHTML(name, quantity, icon);
    itemsHTML += itemHTML;
  }
  pagesElement.innerHTML += `<div class="page">${itemsHTML}</div>`;
}
function createItemHTML(name, quantity, icon) {
  const iconHTML = `<img src="${icon}" alt="" />`;
  const quantityHTML =
    `<svg class="quantity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 250">` +
    `<text x="98%" y="50%" dominant-baseline="central" text-anchor="end">${quantity}</text>` +
    `</svg>`;
  const iconWrapperHTML = `<div class="icon-wrapper">${iconHTML}${quantityHTML}</div>`;
  const nameHTML = `<div class="name">${name}</div>`;
  return `<div class="item">${iconWrapperHTML}${nameHTML}</div>`;
}

let pageIndex = 0;
window.onkeydown = ({ key }) => {
  if (key === "ArrowLeft") pageIndex = Math.max(pageIndex - 1, 0);
  if (key === "ArrowRight") pageIndex = Math.min(pageIndex + 1, pages - 1);
  pagesElement.style.setProperty("--page", pageIndex);
};
window.onkeydown({});
