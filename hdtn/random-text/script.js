const data = Array.from(await fetch(`./data.json?t=${Date.now()}`).then((res) => res.json()));
const mainElement = document.body.querySelector("main");

window.onclick = () => {
  if (data.length <= 0) return;
  mainElement.textContent = data.splice(Math.floor(Math.random() * data.length), 1)[0];
};
