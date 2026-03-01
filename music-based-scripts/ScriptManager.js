/**
 * @typedef {Object} Scene
 * @property {string} [description]
 * @property {[HTMLVideoElement, string]} [sampleVideo]
 * @property {[HTMLAudioElement, string]} [audio]
 * @property {[string]} [actors]
 */

let onEsc = () => {};
window.onkeydown = ({ key }) => {
  if (key === "Escape") onEsc();
};

export default class ScriptManager {
  #container = document.body.querySelector("main");
  #sampleVideosBlock = document.getElementById("sample-videos-block");
  #loadingLog = document.getElementById("loading-log");
  #actorsStatistics = document.getElementById("actors-statistics");

  #actorsStatisticsData = {};
  #actorsStatisticsAll = 0;

  sampleVideos = {};
  audios = {};

  /**
   *
   * @param {HTMLElement} container
   * @param {string[]} audioNames
   * @param {string[]} sampleVideoNames
   */
  constructor(audioNames = [], sampleVideoNames = []) {
    sampleVideoNames.forEach((name) => (this.sampleVideos[name] = this.#createSampleVideo(name)));
    audioNames.forEach((name) => (this.audios[name] = this.#createAudio(name)));
  }

  /**
   *
   * @param {string} text
   */
  center(text) {
    const centerElement = document.createElement("div");
    centerElement.className = "center";
    centerElement.textContent = text;
    this.#container.appendChild(centerElement);
  }

  /**
   *
   * @param {Scene[]} scenes
   */
  scenes(scenes) {
    const scenesTable = document.createElement("table");
    scenesTable.className = "scenes-table";
    scenesTable.appendChild(this.#getScenesTableHeader());
    scenes.forEach((scene, index) => {
      const order = index + 1;
      const musicButton = (() => {
        if (scene.audio) return this.#createAudioButton(scene.audio);
        return null;
      })();
      const description = (() => {
        if (scene.sampleVideo) return this.#createOpenSampleVideoButton(scene.sampleVideo);
        return scene.description;
      })();
      const actors = scene.actors
        .map((actor) => {
          if (actor.includes("người")) return `<span class="red">${actor}</span>`;
          if (actor.toLowerCase() === "tất cả") ++this.#actorsStatisticsAll;
          else if (actor !== "")
            this.#actorsStatisticsData[actor] = this.#actorsStatisticsData[actor] + 1 || 1;
          return actor;
        })
        .join(", ");
      const cells = [order, musicButton, description, actors];
      scenesTable.appendChild(this.#createTableRow(cells));
    });
    this.#container.appendChild(scenesTable);
  }

  done() {
    this.#addActorsStatistics();
  }

  #addActorsStatistics() {
    const rows = Object.keys(this.#actorsStatisticsData).map(
      (name) => `<tr><td>${name}</td><td>${this.#actorsStatisticsData[name]}</td></tr>`,
    );
    const table = `<table><tr><th>Tên</th><th>Số vai đã có</th></tr>${rows.join("")}</table>`;
    this.#actorsStatistics.innerHTML += table;
  }

  #createSampleVideo(name) {
    const video = document.createElement("video");
    video.src = `./assets/${name}.mp4`;
    video.className = name;
    video.playsInline = true;
    video.controls = true;

    const loadElement = document.createElement("div");
    loadElement.textContent = `Đang tải ${name}.mp4`;
    this.#loadingLog.appendChild(loadElement);
    video.onloadeddata = () => this.#loadingLog.removeChild(loadElement);

    video.load();

    this.#sampleVideosBlock.appendChild(video);
    return video;
  }

  #createAudio(name) {
    const audio = new Audio(`./assets/${name}.mp3`);

    const loadElement = document.createElement("div");
    loadElement.textContent = `Đang tải ${name}.mp3`;
    this.#loadingLog.appendChild(loadElement);
    audio.onloadeddata = () => this.#loadingLog.removeChild(loadElement);
    audio.load();

    return audio;
  }

  #getScenesTableHeader() {
    const cells = ["Cảnh", "Đoạn nhạc", "Mô tả", "Người diễn"];
    const tr = document.createElement("tr");
    tr.innerHTML = cells.map((c) => `<th>${c}</th>`).join("");
    return tr;
  }

  #createTableRow(cellNodes = []) {
    const tr = document.createElement("tr");
    cellNodes.forEach((cell) => {
      const td = document.createElement("td");
      if (cell instanceof Node) td.appendChild(cell);
      else td.innerHTML = cell;
      tr.appendChild(td);
    });
    return tr;
  }

  #sampleVideosWrapper = {
    element: document.getElementById("sample-videos-wrapper"),
    show: () => this.#sampleVideosWrapper.element.classList.add("show"),
    hide: () => this.#sampleVideosWrapper.element.classList.remove("show"),
  };

  #createOpenSampleVideoButton([video, time]) {
    const [startTime, endTime] = this.#splitTime(time);
    const button = document.createElement("button");
    button.className = "open-sample-video-button";
    button.textContent = "Bấm để xem video";
    button.onclick = () => {
      this.#sampleVideosWrapper.show();
      video.currentTime = startTime;
      video.ontimeupdate = () => {
        if (video.currentTime > endTime) {
          video.pause();
          setTimeout(this.#sampleVideosWrapper.hide, 200);
        }
      };
      video.play();
      onEsc = () => {
        video.pause();
        this.#sampleVideosWrapper.hide();
      };
    };
    return button;
  }

  #createAudioButton([audio, time]) {
    const [startTime, endTime] = this.#splitTime(time);
    const button = document.createElement("button");
    button.className = "audio-button";
    button.textContent = "Phát";
    button.onclick = () => {
      audio.currentTime = startTime;
      audio.ontimeupdate = () => {
        if (audio.currentTime > endTime) audio.pause();
      };
      audio.play();
    };
    return button;
  }

  #splitTime(time) {
    const timePart = time.replaceAll(" ", "").split("-");
    const startTime = this.#readableTimeToSeconds(timePart[0]);
    const endTime = this.#readableTimeToSeconds(timePart[1]);
    return [startTime, endTime];
  }

  #readableTimeToSeconds(time) {
    const parts = time.split(":");
    const minutes = parseInt(parts[0], 10);
    const seconds = parseFloat(parts[1], 10);
    return minutes * 60 + seconds;
  }
}
