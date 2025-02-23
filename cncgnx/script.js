let curLoad = 0;
const fullLoad = 7,
  loadPercent = document.body.querySelector("#loading span");
const loadded1 = () => loadPercent.innerText = Math.floor((++curLoad / 6 * 100)),
  loadSuccess = () => document.body.removeChild(document.body.querySelector("#loading"));

const loadFunc = {
  main: (filename, cls, ext) => new Promise((res, rej) => {
    const r = new cls();
    r.src = `./assets/${filename}.${ext}`;
    r.id = filename;
    r.onloadeddata = () => {
      res(r);
      loadded1();
    };
  }),
  async audio(filename) {
    return await this.main(filename, Audio, "mp3");
  }
}

const audio = [
  await loadFunc.audio("nen"),
  await loadFunc.audio("ts_noi_gian"),
  await loadFunc.audio("mua"),
  await loadFunc.audio("thay_phap"),
  await loadFunc.audio("em_dung_di"),
  await loadFunc.audio("phu_hoa")
];

audio[0].loop = true;
audio[1].loop = true;
audio[2].loop = true;

audio[0].volume = 0.3;
audio[1].volume = 0.3;
audio[2].volume = 0.2;
audio[3].volume = 0.8;
audio[4].volume = 0.8;
audio[5].volume = 0.4;

let cur = 0;
const play = (key) => {
  audio[cur].pause();
  audio[cur].currentTime = 0;
  audio[key].play();
  cur = key;
}

let order = [0, 1, 2, 5, 0, 3, 0, 4, 0];

let idx = -1;
window.onclick = () => play(order[++idx]);

setTimeout(() => {
  loadded1();
  loadSuccess();
}, 1000);