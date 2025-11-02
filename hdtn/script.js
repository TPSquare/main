const music = document.getElementById("music");
const timeout = document.getElementById("timeout");
const delay = (duration) => new Promise((res) => setTimeout(res, duration));
music.volume = 0.5;
window.onclick = async () => {
  music.play();
  const duration = (15 + Math.floor(Math.random() * 45)) * 1000;
  await delay(duration);
  music.pause();
  music.currentTime = 0;
  timeout.play();
};
