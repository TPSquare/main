const main = document.body.querySelector('main');
const hms = main.querySelector('.hms');
const days = main.querySelector('.days');

const time = {days: 99, hours: 23, minutes: 59, seconds: 30};

const updateTime = () => {
    if (++time.seconds < 60) return;
    time.seconds = 0;
    if (++time.minutes < 60) return;
    time.minutes = 0;
    if (++time.hours < 24) return;
    time.hours = 0;
    ++time.days;
    if (time.days == 100 && time.hours == 0 && time.minutes == 0 && time.seconds == 0)
        main.classList.add('ok');
};

const renderTime = () => {
    const t = [time.hours, time.minutes, time.seconds].map((e) => (e < 10 ? '0' : '') + e);
    hms.innerText = t.join(':');
    days.innerText = time.days;
};

setInterval(() => {
    updateTime();
    renderTime();
}, 1000);

window.onclick = () => {
    if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
    else if (document.documentElement.mozRequestFullScreen)
        document.documentElement.mozRequestFullScreen();
    else if (document.documentElement.webkitRequestFullscreen)
        document.documentElement.webkitRequestFullscreen();
    else if (document.documentElement.msRequestFullscreen)
        document.documentElement.msRequestFullscreen();
};
