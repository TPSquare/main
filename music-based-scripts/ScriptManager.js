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
  #sceneContainer = document.body.querySelector("main");
  #sampleVideosBlock = document.getElementById("sample-videos-block");
  #loadingLog = document.getElementById("loading-log");
  #actorsStatistics = document.getElementById("actors-statistics");
  #actorSearchSelect = document.body.querySelector("#actor-search select");

  #actorsStatisticsData = {};
  #actorsStatisticsAll = 0;
  #scenesData = [];

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
    this.#sceneContainer.appendChild(centerElement);
  }

  /**
   *
   * @param {Scene[]} scenes
   */
  scenes(metadata, scenes) {
    const scene = document.createElement("div");
    scene.className = `scene scene-${this.#scenesData.length}`;

    this.#scenesData.push(scenes);

    const title = document.createElement("div");
    title.className = "title";
    title.textContent = metadata.title;
    scene.appendChild(title);

    const scenesTable = document.createElement("table");
    scenesTable.className = "scene-table";
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
          else if (actor !== "") this.#actorsStatisticsData[actor] = this.#actorsStatisticsData[actor] + 1 || 1;
          return actor;
        })
        .join(", ");

      const preparation = scene.preparation || "";

      const cells = [order, musicButton, description, actors, preparation];
      scenesTable.appendChild(this.#createTableRow(cells));
    });
    scene.appendChild(scenesTable);

    this.#sceneContainer.appendChild(scene);
  }

  done() {
    this.#sortActorsStatisticsData();
    this.#addActorsStatistics();
    this.#createActorSearchSelect();
  }

  #sortActorsStatisticsData() {
    const data = structuredClone(this.#actorsStatisticsData);
    const list = Object.keys(data).sort((actor1, actor2) => data[actor2] - data[actor1]);
    this.#actorsStatisticsData = {};
    for (const name of list) this.#actorsStatisticsData[name] = data[name];
  }

  #addActorsStatistics() {
    const maper = (name, i) => `<tr><td>${i + 1}</td><td>${name}</td><td>${this.#actorsStatisticsData[name]}</td></tr>`;
    const rows = Object.keys(this.#actorsStatisticsData).map(maper);
    const table = `<table><tr><th>STT</th><th>Tên</th><th>Số vai đã có</th></tr>${rows.join("")}</table>`;
    this.#actorsStatistics.innerHTML += table;
  }

  #createActorSearchSelect() {
    const actors = ["Tất cả"].concat(Object.keys(this.#actorsStatisticsData));
    const options = actors.map((actor) => `<option value="${actor}">${actor}</option>`).join("");
    this.#actorSearchSelect.innerHTML = options;

    this.#actorSearchSelect.onchange = () => {
      this.#sceneContainer.querySelectorAll(".hidden").forEach((e) => e.classList.remove("hidden"));
      const value = this.#actorSearchSelect.value;
      if (value === "Tất cả") return;

      this.#scenesData.forEach((scenes, index) => {
        const scenesActors = scenes.map(({ actors }) => actors);
        scenesActors.forEach((actors, i) => {
          const query = `.scene-${index} .scene-table tr:nth-child(${i + 2})`;
          if (!actors.includes(value)) this.#sceneContainer.querySelector(query).classList.add("hidden");
        });
      });

      this.#sceneContainer.querySelectorAll(".scene").forEach((scene) => {
        if (scene.querySelectorAll(".scene-table tr:not(.hidden)").length <= 1) scene.classList.add("hidden");
      });
    };
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
    const cells = ["Cảnh", "Đoạn nhạc", "Mô tả", "Người diễn", "Chuẩn bị / Đạo cụ"];
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
