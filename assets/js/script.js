const timerConst = document.getElementById('timer');
const markList = document.getElementById('mark-list');
let intervalId = 0;
let timerLet = 0;
let marks = [];

const formatTime = (time) => {
    const hour = Math.floor(time / 360000);
    const minute = Math.floor((time % 360000) / 6000);
    const second = Math.floor((time % 6000) / 100);
    const hundredth = time % 100;

    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}:${hundredth.toString().padStart(2, '0')}`;
}

const setTimer = (time) => {
    timerConst.innerText = formatTime(time);
}

const addMarkToList = (markIndex, markTime) => {
    markList.innerHTML += `<p>Mark ${markIndex}: ${formatTime(markTime)}</p>`;
}

const toggleTimer = () => {
    const button = document.getElementById('power');
    const action = button.getAttribute('action');

    clearInterval(intervalId);

    if (action == 'start' || action == 'continue') {
        intervalId = setInterval(() => {
            timerLet += 1;
            setTimer(timerLet);
    }, 10);
        button.setAttribute('action', 'pause');
        button.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else if (action == 'pause') {
        button.setAttribute('action', 'continue');
        button.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

const markTime = () => {
    marks.push(timerLet);
    addMarkToList(marks.length, timerLet);
}

const resetTimer = () => {
    clearInterval(intervalId);
    timerLet = 0;
    marks = [];
    setTimer(timerLet);
    markList.innerHTML = '';
    const button = document.getElementById('power');
    button.setAttribute('action', 'start');
    button.innerHTML = '<i class="fa-solid fa-play"></i>';
}

document.getElementById('power').addEventListener('click', toggleTimer);
document.getElementById('mark').addEventListener('click', markTime);
document.getElementById('reset').addEventListener('click', resetTimer);