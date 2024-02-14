let startTime;
let running = false;
let intervalId;
let lapCount = 1;

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime();
        intervalId = setInterval(updateDisplay, 1000);
        document.getElementById('startBtn').textContent = 'Resume';
        document.getElementById('pauseBtn').removeAttribute('disabled');
        document.getElementById('resetBtn').removeAttribute('disabled');
        document.getElementById('lapBtn').removeAttribute('disabled');
        running = true;
    } else {
        clearInterval(intervalId);
        document.getElementById('startBtn').textContent = 'Start';
        document.getElementById('pauseBtn').setAttribute('disabled', true);
        running = false;
    }
}

function pauseStopwatch() {
    clearInterval(intervalId);
    document.getElementById('startBtn').textContent = 'Resume';
    document.getElementById('pauseBtn').setAttribute('disabled', true);
    running = false;
}

function resetStopwatch() {
    clearInterval(intervalId);
    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('startBtn').textContent = 'Start';
    document.getElementById('pauseBtn').setAttribute('disabled', true);
    document.getElementById('resetBtn').setAttribute('disabled', true);
    document.getElementById('lapBtn').setAttribute('disabled', true);
    running = false;
    lapCount = 1;
    document.getElementById('laps').innerHTML = '';
}

function updateDisplay() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById('display').textContent = formattedTime;
}

function formatTime(milliseconds) {
    let totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// ... (previous code remains unchanged)

const maxLaps = 20; // Set the maximum number of laps to display

function recordLap() {
    const lapTime = document.getElementById('display').textContent;
    const lapItem = document.createElement('li');
    lapItem.className = 'lap-item';
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;

    // Insert the new lap at the beginning of the laps list
    const lapsList = document.getElementById('laps');
    if (lapsList.firstChild) {
        lapsList.insertBefore(lapItem, lapsList.firstChild);
    } else {
        lapsList.appendChild(lapItem);
    }

    lapCount++;

    // Check if the number of laps exceeds the maximum limit
    if (lapCount > maxLaps) {
        // Remove the oldest lap
        const lastLap = lapsList.lastChild;
        if (lastLap) {
            lapsList.removeChild(lastLap);
        }
    }
}

