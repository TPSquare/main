const delay = (dur) => new Promise((res, rej) => setTimeout(res, dur));

const fullLoad = 10,
  oneLoad = Math.floor(100 / fullLoad),
  loadPercent = document.body.querySelector("#loading span");
const loadded1 = async () => {
  for (let i = 1; i <= oneLoad; i++) {
    loadPercent.innerText = Number(loadPercent.innerText) + 1;
    await delay(100);
  }
};
const loadSuccess = () => (document.body.querySelector("#loading").style.opacity = 0);

const loadFunc = {
  main: (filename, cls, ext) =>
    new Promise((res, rej) => {
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
  },
};

const audio = [
  await loadFunc.audio("nen"),
  await loadFunc.audio("ts_noi_gian"),
  await loadFunc.audio("mua"),
  await loadFunc.audio("thay_phap"),
  await loadFunc.audio("em_dung_di"),
  await loadFunc.audio("phu_hoa"),
  await loadFunc.audio("phu_hoa_2"),
  await loadFunc.audio("phu_hoa_3"),
  await loadFunc.audio("phu_hoa_full"),
];

audio[0].loop = true;
audio[1].loop = true;
audio[2].loop = true;
audio[0].volume = 0.3;
audio[1].volume = 0.3;
audio[2].volume = 0.3;
audio[3].volume = 0.8;
audio[4].volume = 0.8;
audio[5].volume = 0.3;
audio[6].volume = 0.3;
audio[7].volume = 0.8;
audio[8].volume = 0.3;

let cur = 0;
const playAudio = (key) => {
  audio[cur].pause();
  audio[cur].currentTime = 0;
  if (key == -1) return;
  audio[key].play();
  cur = key;
};

const textElm = document.body.querySelector("#text");
const changeText = (id) => (textElm.innerHTML = text[id]);
const text = [
  "",
  "Bài hát: Bóng phù hoa\nTác giả: Phương Mỹ Chi",
  "Thanh Thúy ... Vũ Nương",
  "Thành Vũ ... Trương Sinh",
  "Bảo Trân ... mẹ của Trương Sinh",
  "Bảo Trâm ... đại phu",
  "Công Đạt ... bé Đản",
  "Trung Nguyên ... Phan Lang",
  "Quang Hào ...\n    + Cái bóng\n    + Thầy pháp",
  "Quế Trân, Thúy Quỳnh ... dẫn chuyện",
  "Thanh Phú ...\n    + Biên kịch\n    + Kỹ thuật",
  "Tố Như ... Đạo diễn",
  "Lưu ý!",
  "Xin mời mọi người thưởng thức!",
  "Cảnh 1: Cuộc sống êm đềm của Vũ Nương và Trương Sinh",
  "Nhạc nền: Mirajane no theme Ost",
  "Cảnh 2: Trong buổi chia tay",
  "Cảnh 3: Cảnh ly biệt và nỗi đau chờ đợi",
  "Cảnh 4: Trương Sinh trở về và mối nghi ngờ bùng nổ",
  "Nhạc nền:\n    Một nén nhang - Huỳnh Lập",
  "Cảnh 5: Vũ Nương bên bến Hoàng Giang - Bi kịch đỉnh điểm",
  "Tổ 1 - lớp 11A4!",
  "Cảnh 6: Đêm tỉnh ngộ đầy đau đớn của Trương Sinh",
  "Cảnh 7: Trong động rùa",
  "Cảnh 8: Nhà Trương Sinh",
  "Cảnh 9: Bến Hoàng Giang",
  "Âm thanh:\n    Cô đôi thượng ngàn Remix - Billy Hoàng Phong",
  "Cảm ơn mọi người đã theo dõi!",
  "Kết thúc!",
  "Giới thiệu..."
].join("$$$").replaceAll("\n", "<br>").replaceAll("    ", "&nbsp;&nbsp;&nbsp;&nbsp;").split("$$$");

const order = [
  "t29",
  "a8",
  "t1",
  "t29",
  "t2",
  "t3",
  "t4",
  "t5",
  "t6",
  "t7",
  "t8",
  "t9",
  "t10",
  "t11",
  "t12",
  "t13",
  "a0",
  "t14",
  "t15",
  "t14",
  "t16",
  "t17",
  "t18",
  "a1",
  "t19",
  "t18",
  "a-1",
  "t20",
  "a2",
  "a5",
  "t22",
  "a0",
  "t23",
  "t24",
  "a-1",
  "t25",
  "a3",
  "t26",
  "t25",
  "a0",
  "a4",
  "a0",
  "t28",
  "a6",
  "t27",
  "a7",
  "t21",
];
let idx = -1;
window.onclick = () => {
  const cmd = order[++idx],
    id = Number(cmd.substring(1));
  cmdElm.innerText = `${cmd}${order[idx + 1] ? `.${order[idx + 1]}` : ""}`;
  if (cmd.charAt(0) == "a") playAudio(id);
  else changeText(id);
};
const cmdElm = document.body.querySelector("#cmd");

setTimeout(() => {
  loadded1();
  loadSuccess();
}, 1000);
