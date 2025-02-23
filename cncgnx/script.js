window.onloadeddata = () => alert("Loaded! 2");

const loadAudio = (filename) => new Promise((res, rej) => {
  const audio = new Audio();
  audio.src = `./assets/${filename}.mp3`;
  audio.onloadeddata = () => res(audio);
});

const audio = [
  await loadAudio("nen"),
  await loadAudio("ts_noi_gian"),
  await loadAudio("mua"),
  await loadAudio("thay_phap"),
  await loadAudio("em_dung_di"),
  await loadAudio("phu_hoa")
]

audio[0].loop = true;
audio[1].loop = true;
audio[2].loop = true;

audio[0].volume = 0.3;
audio[1].volume = 0.3;
audio[2].volume = 0.4;
audio[3].volume = 0.8;
audio[4].volume = 0.8;
audio[5].volume = 0.8;

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