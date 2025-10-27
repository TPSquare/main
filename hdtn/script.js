const data = await fetch(`./data.json?t=${Date.now()}`).then((res) => res.json());
const mainElement = document.body.querySelector("main");
const indexElement = document.body.querySelector(".index");
let index = 0;
document.body.querySelector("img").onclick = function () {
  document.body.removeChild(this);
  window.onclick = () => {
    if (data.length === 0) {
      mainElement.innerText = "HẾT!";
      indexElement.innerText = "";
      return;
    }
    const id = Math.floor(Math.random() * data.length);
    const value = data.splice(id, 1)[0];
    mainElement.innerText = value;
    indexElement.innerText = ++index;
  };
};
