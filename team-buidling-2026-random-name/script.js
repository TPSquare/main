const DATA = await fetch(`./data.json?t=${Date.now()}`).then((res) => res.json());
let currentTeamList = [];
let PLAYER_COUNT = 2;

function getNameList() {
  const list = [];
  Object.values(DATA).forEach((l) => list.push(...l));
  return list;
}
function getRandomName() {
  if (currentTeamList.length < PLAYER_COUNT) currentTeamList.push(...Object.keys(DATA));
  const res = [];
  for (let i = 0; i < PLAYER_COUNT; i++) {
    const team = currentTeamList.splice(Math.floor(Math.random() * currentTeamList.length), 1)[0];
    res.push([team, DATA[team].splice(Math.floor(Math.random() * DATA[team].length), 1)[0]]);
  }
  return res;
}
const getNameNumber = () => getNameList().length;

const listElement = document.body.querySelector("#list .list");
function updateList() {
  listElement.innerHTML = getNameList()
    .map((e) => `<div>${e}</div>`)
    .join("");
}

const randomButton = document.body.querySelector("#random-btn");
const cardsWrapper = document.body.querySelector("#cards-wrapper");
function setRandomButtonLabel() {
  randomButton.textContent = `Chọn ngẫu nhiên ${PLAYER_COUNT} người!`;
}
randomButton.onclick = function () {
  const cards = cardsWrapper.querySelectorAll(".card");
  cards.forEach((card) => {
    const team = card.querySelector(".team").textContent;
    const name = card.querySelector(".name").textContent;
    DATA[team].push(name);
  });

  if (getNameNumber() < allPlayer / 3) PLAYER_COUNT = 1;
  for (const team in DATA)
    if (Object.keys(DATA[team]).length === 0) delete DATA[team];
  updateUI();

  const randomName = getRandomName();
  cardsWrapper.innerHTML = randomName.map(([team, name]) => createPlayerCard(team, name)).join("");

  setTimeout(() => {
    const cards = cardsWrapper.querySelectorAll(".card");
    cards.forEach((card) => {
      const removeButton = card.querySelector(".remove");
      removeButton.onclick = () => cardsWrapper.removeChild(card);
    });
  }, 500);
};

function createPlayerCard(team, name) {
  return (
    `<div class="card">` +
    `<div class="team">${team}</div>` +
    `<div class="name">${name}</div>` +
    `<div class="card-btns">` +
    `<button class="remove" type="button">Loại</button>` +
    `</div>` +
    "</div>"
  );
}

const allPlayer = getNameNumber();
function updateUI() {
  updateList();
  setRandomButtonLabel();
}
updateUI();
