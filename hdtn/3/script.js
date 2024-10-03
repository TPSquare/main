const audio = {
    bg: new Audio('./mp3/bg.mp3'),
    correct: new Audio('./mp3/correct.mp3'),
    wrong: new Audio('./mp3/wrong.mp3'),
    countdown: new Audio('./mp3/countdown.mp3')
};
audio.bg.loop = true;
window.onclick = () => audio.bg.play();

const mainElement = document.body.querySelector('main');

TPSM.setAspectRatio(
    16,
    9,
    (w, h) =>
        TPSM.doc.setStyle(mainElement, {
            width: w + 'px',
            height: h + 'px',
            fontSize: h / 100 + 'px'
        }),
    'main'
);

const start = () => {
    document.body.querySelector('img[alt="start"]').style.opacity = 0;
    setTimeout(showQuestion, 1000);
};
window.onkeydown = start;

const data = [
    '[T] Khi thực hiện tư thế vừa trồng cây chuối vừa ăn, thức ăn có đi xuống dạ dày được không?',
    '[T] Ô tô đang di chuyển mà đột ngột rẽ trái thì hành khách bị nghiêng sang bên phải, đúng hay sai?',
    '[F] Con cá vàng thực sự có trí nhớ chỉ trong vài giây, đúng hay sai?', // Nhiều tuần nhiều tháng
    '[T] Khi một diễn viên nhí đóng phim kinh dị, diễn viên nhí đó sẽ không được xem bộ phim đó, đúng hay sai?',
    '[F] Bạch tuộc sẽ chết ngay sau khi đẻ trứng, đúng hay sai?', // Ấp xong mới chết
    '[F] Hai bài hát "Mẹ yêu không nào" và "Con cò bé bé" là 2 bài khác nhau, đúng hay sai?',
    '[F] Con gì có 8 cẳng 2 càng đều gọi là cua, đúng hay sai?',
    '[T] Con người có thể vừa thở vừa nuốt cùng lúc không?', // Em bé vừa thở vừa nuốt khi bú
    '[F] Trong không khí chúng ta hít thở hàng ngày, O₂ và CO₂ là các chất có nhiều nhất, đúng hay sai?',
    '[F] Loài dơi có bị mù không?', // Mắt mờ
    '[T] Lạt đà có thể ăn xương rồng đầy gai không?', // Cấu tạo đặc biệt làm chúng miễn nhiễm
    '[F] Trái đất có hình tròn, đúng hay sai?',
    '[F] Vượn là tổ tiên của con người, đúng hay sai?', // Theo nghiên cứu mới nhất, con người và vượn có chung tổ tiên
    '[T] Cá voi xanh là con vật lớn nhất hành tinh, đúng hay sai?', // Nặng hàng trăm tấn, có thể to ngang một sân bóng đá,
    '[F] Bắc cực là nơi lạnh lẽo nhất trên Trái đất, đúng hay sai?', // Nam cực

].map((e) => [e[1], e.substring(4)]);
let dataCurrentIndex = 0;

const questionElement = document.body.querySelector('#question');
const answersElement = document.body.querySelector('#answers');
const tickElement = document.body.querySelector('#tick');
const crossElement = document.body.querySelector('#cross');
const delayElement = TPSM.doc.querySelector('#delay', {
    async run() {
        for (let i = 5; i >= 0; i--) {
            this.innerText = i;
            await TPSM.delay(1000);
        }
    },
    reset() {
        this.innerText = '5';
    }
});
const statisticsElement = TPSM.doc.querySelector('#statistics', {
    groups: {},
    update() {
        for (let i = 0; i < 4; i++) this.groups[i + 1].update();
    }
});
for (const key of [1, 2, 3, 4]) {
    statisticsElement.groups[key] = TPSM.doc.fromElement(statisticsElement).createElement({
        className: 'groups',
        heartNum: 11,
        warningNum: 0,
        async update() {
            TPSM.doc.setStyle(this.right, {'--current': this.heartNum});
        }
    });
    TPSM.doc
        .fromElement(statisticsElement.groups[key])
        .createElement({className: 'left', innerText: 'Tổ ' + key + ': '});
    statisticsElement.groups[key].right = TPSM.doc
        .fromElement(statisticsElement.groups[key])
        .createElement({
            className: 'right',
            style: {'--max': statisticsElement.groups[key].heartNum}
        });
}
statisticsElement.update();

const requestElement = TPSM.doc.querySelector('#request', {
    data: ['Chân', 'Tay'],
    reset() {
        this.innerText = this.data[Math.floor(Math.random() * this.data.length)];
    }
});

const showQuestion = () => {
    const [answer, question] = data[dataCurrentIndex] || ['T', 'null'];
    questionElement.innerText = question;
    tickElement.className = '';
    crossElement.className = '';
    delayElement.reset();
    requestElement.reset();

    window.onkeydown = countdown;
};

const countdown = async () => {
    audio.bg.volume = 0.8;
    setTimeout(() => audio.bg.volume = 0.6, 200);
    setTimeout(() => audio.bg.volume = 0.4, 400);
    setTimeout(() => audio.bg.volume = 0.2, 600);
    setTimeout(() => audio.bg.volume = 0, 800);
    setTimeout(() => audio.bg.volume = 0.2, 6200);
    setTimeout(() => audio.bg.volume = 0.4, 6400);
    setTimeout(() => audio.bg.volume = 0.6, 6600);
    setTimeout(() => audio.bg.volume = 0.8, 6800);
    setTimeout(() => audio.bg.volume = 1, 7000);
    const [answer, question] = data[dataCurrentIndex++] || ['T', 'null'];
    if (answer == 'T') {
        tickElement.className = 'true';
        crossElement.className = 'false';
        setTimeout(() => audio.correct.play(), 5500);
    } else {
        tickElement.className = 'false';
        crossElement.className = 'true';
        setTimeout(() => audio.wrong.play(), 5500);
    }
    delayElement.run();
    setTimeout(() => audio.countdown.play(), 400);

    window.onkeydown = statistics;
};

const statistics = async () => {
    questionElement.classList.add('hidden');
    answersElement.classList.add('hidden');
    requestElement.classList.add('hidden');
    await TPSM.delay(500);
    statisticsElement.classList.remove('hidden');
    window.onkeydown = actions;
};

const actions = ({key}) => {
    if (key == 'Enter') {
        statisticsElement.classList.add('hidden');
        questionElement.classList.remove('hidden');
        answersElement.classList.remove('hidden');
        requestElement.classList.remove('hidden');
        showQuestion();
    }
    if (!'1234'.includes(key)) return;
    --statisticsElement.groups[key].heartNum;
    statisticsElement.update(key);
};

//
start();
