import ScriptManager from "./ScriptManager.js";
const manager = new ScriptManager(["audio"], ["sample"]);

const inClassScenes = [
  { sampleVideo: [manager.sampleVideos.sample, "0:00 - 0:12"], actors: ["Chí Vỹ", "Huỳnh Nhật", "Thành Vũ"], preparation: "2 quyển vở" },
  { sampleVideo: [manager.sampleVideos.sample, "0:13 - 0:22"], actors: ["Tất cả"] },
  { sampleVideo: [manager.sampleVideos.sample, "0:36 - 0:37.4"], actors: ["Công Đạt"], preparation: "Một cái cặp" },
  { sampleVideo: [manager.sampleVideos.sample, "0:37.8 - 0:38.25"], actors: ["Duy Khang"] },
  { sampleVideo: [manager.sampleVideos.sample, "0:38.5 - 0:39.5"], actors: ["Quang Hào"] },
  { sampleVideo: [manager.sampleVideos.sample, "0:50.5 - 0:53.1"], actors: ["Gia Bảo", "Đại Doãn", "Công Đạt"], preparation: "Trên bảng viết tên 26 bạn nữ" },
  { sampleVideo: [manager.sampleVideos.sample, "0:53.3 - 0:56.5"], actors: ["Nguyễn Nhật"], preparation: "TV chiếu hình các bạn nữ" },
  { sampleVideo: [manager.sampleVideos.sample, "0:58.6 - 1:00.4"], actors: ["Thành Vũ"] },
  { sampleVideo: [manager.sampleVideos.sample, "1:00.8 - 1:02.6"], actors: ["Duy Sơn", "Quang Hào"], preparation: "TV chiếu hình ngôi sao" },
  { sampleVideo: [manager.sampleVideos.sample, "1:04.7 - 1:07.7"], actors: ["Thành Vũ", "tất cả"], preparation: "Bảng phụ có nội dung, cây thước" },
  { sampleVideo: [manager.sampleVideos.sample, "1:10.4 - 1:12"], actors: ["Đại Doãn", "Duy Sơn"], preparation: "Một cành hoa (hoặc gì đấy cho giống con gái)" },
  { sampleVideo: [manager.sampleVideos.sample, "1:12.3 - 1:13.8"], actors: ["Duy Khang"], preparation: 'Bảng ghi đầy chữ "ngu văn"' },
  { sampleVideo: [manager.sampleVideos.sample, "1:18 - 1:19.8"], actors: ["Quang Hào"] },
  { sampleVideo: [manager.sampleVideos.sample, "1:23.7 - 1:27.3"], actors: ["Anh Quốc", "Gia Vỹ", "Gia Hưng", "Gia Bảo"], preparation: "1 quyển vở" },
  { sampleVideo: [manager.sampleVideos.sample, "1:27.55 - 1:29.8"], actors: ["Xuân Vũ", "Thanh Vũ", "Ngọc Thiện"], preparation: "Đồng hồ (hoặc mở điện thoại)" },
  { audio: [manager.audios.audio, "1:42.7 - 1:46.2"], description: "1 người đứng giữa, 4 người đứng xung quanh, lần lượt chạy tới ôm người giữa theo nhạc", actors: ["Đại Doãn", "Ngọc Thiện", "Thanh Vũ", "Trung Nguyên", "Công Đạt"] },
  { audio: [manager.audios.audio, "1:50.7 - 1:52.5"], description: "Ghi dang dở bài thơ lên bảng", actors: ["Quang Hào"], preparation: "Ghi dang dở bài thơ tình" },
  { audio: [manager.audios.audio, "1:52.7 - 1:53.8"], description: "1 người lấy tay quơ lên đầu người kia (edit gắn nametag trong Minecraft)", actors: ["Chí Vỹ", "Huỳnh Nhật"] },
  { sampleVideo: [manager.sampleVideos.sample, "2:12.8 - 2:14"], actors: ["Quang Hào", "Duy Sơn"] },
  { audio: [manager.audios.audio, "2:55.1 - 2:58.3"], description: "1 người ngồi trong lớp (gần cửa sổ), người kia thò tay vào để nắm tay, người trong lớp đập tay người bên ngoài, người bên ngoài quắn quéo", actors: ["Thanh Vũ", "Chí Vỹ"], preparation: "1 quyển vở" },
  { audio: [manager.audios.audio, "2:58.7 - 3:02.6"], description: "Đập bàn đập ghế", actors: ["Anh Quốc", "Thanh Phú"] },
  { audio: [manager.audios.audio, "3:02.8 - 3:06.4"], description: "Ngồi thở dài (2 góc quay)", actors: ["Anh Quốc", "Duy Sơn", "Trung Nguyên"] },
  { audio: [manager.audios.audio, "3:06.6 - 3:09"], description: "Ngồi cười khờ", actors: ["Công Đạt"] },
  { audio: [manager.audios.audio, "3:09.4 - 3:13.2"], description: "1 người đang đi thì bị người kia đẩy té xuống đè lên, 3 người khác chạy vào đè lên theo nhạc", actors: ["Đại Doãn", "Anh Quốc", "Xuân Vũ", "Thành Vũ", "Huỳnh Nhật"] },
  { audio: [manager.audios.audio, "3:13.4 - 3:17"], description: "Đang ở cảnh trên, người bị đè giơ tay lên cầu cứu, thêm 2 người khác nhảy vào đè tiếp", actors: ["Gia Hưng", "Gia Bảo"] },
  { audio: [manager.audios.audio, "3:17.2 - 3:19.4"], description: "Chạy nhảy tự do", actors: ["Thanh Vũ", "Ngọc Thiện", "Thanh Phú"] },
  { audio: [manager.audios.audio, "3:28.5 - 3:32.5"], description: "Cả đám ngủ (đủ loại tư thế)", actors: ["Tất cả"] },
];
manager.scenes({ title: "Trong lớp" }, inClassScenes);

const lobbyScenes = [
  { sampleVideo: [manager.sampleVideos.sample, "0:29 - 0:35.3"], actors: ["Duy Sơn", "Quang Hào", "Xuân Vũ"], preparation: "Một tấm vải" },
  { sampleVideo: [manager.sampleVideos.sample, "0:39.8 - 0:41.4"], actors: ["Trung Nguyên", "Anh Quốc", "Gia Vỹ"] },
  { sampleVideo: [manager.sampleVideos.sample, "0:42 - 0:45.3"], actors: ["Nguyễn Nhật", "Chí Vỹ", "Thanh Phú"] },
  { sampleVideo: [manager.sampleVideos.sample, "0:56.8 - 0:58.3"], actors: ["Gia Hưng", "Chí Vỹ", "Duy Khang", "Trung Nguyên", "Anh Quốc"] },
  { sampleVideo: [manager.sampleVideos.sample, "1:02.8 - 1:04.5"], actors: ["Chí Vỹ", "Huỳnh Nhật", "Công Đạt", "Ngọc Thiện", "Thanh Vũ", "Xuân Vũ"] },
  { sampleVideo: [manager.sampleVideos.sample, "1:08 - 1:10.2"], actors: ["Quang Hào"] },
  { sampleVideo: [manager.sampleVideos.sample, "1:16 - 1:17.7"], actors: ["Thanh Vũ", "Ngọc Thiện"] },
  { audio: [manager.audios.audio, "1:49 - 1:50.5"], description: "Ôm không khí, xoay vòng tròn", actors: ["Thành Vũ"] },
  { sampleVideo: [manager.sampleVideos.sample, "1:54.3 - 1:57.5"], actors: ["Thành Vũ", "Xuân Vũ"] },
  { sampleVideo: [manager.sampleVideos.sample, "1:57.8 - 2:01"], actors: ["Duy Khang", "Huỳnh Nhật", "Chí Vỹ"] },
  { audio: [manager.audios.audio, "2:51.3 - 2:53.1"], description: "Chỉ 2 ngón trỏ vào nhau (ngại ngùng)", actors: ["Gia Hưng"] },
  { audio: [manager.audios.audio, "3:19.6 - 3:21"], description: "Tự đi tự nói chuyện một mình", actors: ["Gia Vỹ"] },
  { audio: [manager.audios.audio, "3:24.9 - 3:28.3"], description: "1 người đang vào lớp thì lùi lại để né người kia, người ở sau chạy tới ôm, thế là cả đám tiếp tục nhào lại ôm", actors: ["Đại Doãn", "Nguyễn Nhật", "Trung Nguyên", "Công Đạt", "Xuân Vũ", "Thành Vũ"] },
  { audio: [manager.audios.audio, "4:02 - 4:09"], description: "Mọi người xếp hàng ngang, máy quay lần lượt quay từng người (biểu cảm tùy ý)", actors: ["Đại Doãn", "Quang Hào", "Nguyễn Nhật", "Gia Vỹ", "Anh Quốc"] },
  { audio: [manager.audios.audio, "4:17.5 - 4:20"], description: "Ôm đầu chạy nhảy", actors: ["Duy Khang", "Duy Sơn", "Huỳnh Nhật", "Gia Hưng"] },
  { audio: [manager.audios.audio, "4:21.7 - 4:25"], description: "2 người kéo, tranh giành 1 người", actors: ["Duy Sơn", "Anh Quốc", "Gia Vỹ"] },
  { audio: [manager.audios.audio, "4:25.2 - 4:28.8"], description: "Cả đám dí theo một người để ôm (4 cảnh khác nhau)", actors: ["Đại Doãn", "Trung Nguyên", "Duy Khang", "Công Đạt", "Xuân Vũ", "Duy Sơn", "Thành Vũ", "Chí Vỹ", "Huỳnh Nhật"] },
  { audio: [manager.audios.audio, "3:32.7 - 3:39.5"], description: "1 người trên lầu chống tay lên cằm nhìn đắm đuối người ở dưới lầu đang đi", actors: ["Quang Hào", "Duy Khang"] },
  { sampleVideo: [manager.sampleVideos.sample, "2:09.55 - 2:12.5"], actors: ["Tất cả"] },
  { sampleVideo: [manager.sampleVideos.sample, "2:16.2 - 2:30.5"], actors: ["Tất cả"] },
];
manager.scenes({ title: "Hành lang" }, lobbyScenes);

const inYard = [
  { sampleVideo: [manager.sampleVideos.sample, "0:45.5 - 0:47"], actors: ["Tất cả"] },
  { sampleVideo: [manager.sampleVideos.sample, "0:47.3 - 0:50"], actors: ["Trung Nguyên", "Ngọc Thiện"] },
  { sampleVideo: [manager.sampleVideos.sample, "1:19.8 - 1:23.4"], actors: ["Duy Sơn", "Trung Nguyên", "Gia Bảo", "Công Đạt", "Nguyễn Nhật", "Huỳnh Nhật", "Duy Khang", "Thành Vũ"] },
  { sampleVideo: [manager.sampleVideos.sample, "1:30.1 - 1:34.3"], actors: ["Đại Doãn", "Gia Hưng", "Nguyễn Nhật", "Gia Vỹ", "Huỳnh Nhật", "Gia Bảo"] },
  { audio: [manager.audios.audio, "1:46.5 - 1:48.8"], description: "Nhảy loạn xạ", actors: ["Gia Hưng", "Nguyễn Nhật", "Gia Vỹ", "Duy Khang", "Xuân Vũ"] },
  { sampleVideo: [manager.sampleVideos.sample, "1:45.9 - 1:50.1"], actors: ["Đại Doãn", "Trung Nguyên"] },
  { sampleVideo: [manager.sampleVideos.sample, "1:50.35 - 1:54"], actors: ["Quang Hào", "Đại Doãn", "Duy Sơn", "Thanh Vũ", "Nguyễn Nhật", "Công Đạt"] },
  { sampleVideo: [manager.sampleVideos.sample, "2:03.3 - 2:05.5"], actors: ["Công Đạt", "Trung Nguyên"] },
  { sampleVideo: [manager.sampleVideos.sample, "2:05.8 - 2:06.5"], actors: ["Thành Vũ"] },
  { sampleVideo: [manager.sampleVideos.sample, "2:06.8 - 2:09.4"], actors: ["Duy Khang", "Xuân Vũ", "Huỳnh Nhật", "Chí Vỹ"] },
  { sampleVideo: [manager.sampleVideos.sample, "2:14.4 - 2:16"], actors: ["Gia Hưng", "Đại Doãn", "Gia Bảo", "Thanh Phú", "Thanh Vũ", "Nguyễn Nhật"] },
  { audio: [manager.audios.audio, "2:40 - 2:47"], description: "5 người xếp tay thành hình ngôi sao, 1 người ngồi nói chuyện với ngôi sao", actors: ["Gia Vỹ", "Anh Quốc", "Trung Nguyên", "Công Đạt", "Xuân Vũ", "Thành Vũ"], preparation: "Xem các xếp ngôi sao" },
  { audio: [manager.audios.audio, "2:47.2 - 2:51"], description: "1 người đi ngang, 4 đứng uốn éo", actors: ["Duy Khang", "Huỳnh Nhật", "Đại Doãn", "Chí Vỹ", "Gia Bảo"] },
  { sampleVideo: [manager.sampleVideos.sample, "2:45.5 - 2:49.5"], actors: ["Trung Nguyên", "Công Đạt", "Xuân Vũ", "Ngọc Thiện", "Thành Vũ", "Thanh Vũ", "Chí Vỹ", "Nguyễn Nhật"] },
  { audio: [manager.audios.audio, "4:13.7 - 4:17.5"], description: "Đang ở cảnh trên (đổi góc quay), 4 cặp xoay vòng tròn", actors: [""] },
  { audio: [manager.audios.audio, "4:29 - 4:43"], sampleVideo: [manager.sampleVideos.sample, "2:49.9 - 3:03.3"], actors: ["Tất cả"] },
];
manager.scenes({ title: "Dưới sân" }, inYard);

const atTree = [
  { audio: [manager.audios.audio, "1:54 - 1:57.6"], description: "1 người nhìn thấy người kia và chạy tới ôm, chuyển cảnh thành ôm cái cây", actors: ["Gia Bảo", "Anh Quốc"] },
  { audio: [manager.audios.audio, "2:53.1 - 2:54.9"], description: "1 người đang chuẩn bị ăn lá cây, thấy người kia đi ngang qua thì rơi hết lá", actors: ["Gia Vỹ", "Ngọc Thiện"] },
  { sampleVideo: [manager.sampleVideos.sample, "2:30.9 - 2:32.5"], actors: ["Huỳnh Nhật", "Gia Hưng"] },
  { sampleVideo: [manager.sampleVideos.sample, "2:32.7 - 2:35"], actors: ["Gia Bảo", "Ngọc Thiện", "Thanh Vũ"] },
  { sampleVideo: [manager.sampleVideos.sample, "2:35.2 - 2:36.5"], actors: ["Duy Sơn", "Chí Vỹ"], preparation: "Xe điện" },
];
manager.scenes({ title: "Chỗ cái cây" }, atTree);

const restroom = [
  { sampleVideo: [manager.sampleVideos.sample, "2:01.9 - 2:03"], actors: ["Gia Hưng", "Gia Bảo", "Ngọc Thiện", "Thanh Vũ", "Nguyễn Nhật", "Gia Vỹ"] },
];
manager.scenes({ title: "Trước NVS" }, restroom);

const sand = [
  { audio: [manager.audios.audio, "3:21.2 - 3:24.7"], description: "1 người đang vẽ vời trên đất thì bị người kia chạy tới xóa hết => đuổi đánh người kia", actors: ["Quang Hào", "Thanh Phú"] },
];
manager.scenes({ title: "Chỗ có đất, cát" }, sand);

const gara = [
  { audio: [manager.audios.audio, "4:20.2 - 4:21.5"], description: "Đi xe một mình nhưng nói chuyện với người phía sau", actors: ["Gia Bảo"], preparation: "Xe điện" },
];
manager.scenes({ title: "Nhà xe" }, gara);

const home = [
  { sampleVideo: [manager.sampleVideos.sample, "1:14 - 1:15.8"], actors: ["Anh Quốc", "Gia Vỹ", "Gia Bảo", "Gia Hưng", "Xuân Vũ"], preparation: "Một tô / nồi gì cũng được" },
  { sampleVideo: [manager.sampleVideos.sample, "1:34.38 - 1:38.5"], actors: ["Quang Hào", "Duy Sơn", "Anh Quốc"], preparation: "Chỗ ngủ" },
  { sampleVideo: [manager.sampleVideos.sample, "1:38.67 - 1:45.5"], actors: ["Gia Vỹ", "Ngọc Thiện"], preparation: "Máy tính, mess hồng" },
];
manager.scenes({ title: "Nhà" }, home);

manager.done();
