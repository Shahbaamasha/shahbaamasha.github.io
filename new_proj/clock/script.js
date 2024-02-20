// Clock
function updateTime(id, offset) {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const localTime = new Date(utc + offset * 3600000);
    const hours = localTime.getHours().toString().padStart(2, '0');
    const minutes = localTime.getMinutes().toString().padStart(2, '0');
    document.getElementById(id).textContent = `${hours}:${minutes}`;
}

function updateClocks() {
    updateTime("israel-time", 2);
    updateTime("usa-time", -5);
    updateTime("china-time", 8);
    updateTime("france-time", 1);
}

setInterval(updateClocks, 1000);

// Stopwatch
let stopwatchInterval;
let stopwatchStartTime;
let stopwatchElapsedTime = 0;
let stopwatchRunning = false;

function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startStopwatch() {
    if (!stopwatchRunning) {
        stopwatchRunning = true;
        stopwatchStartTime = Date.now() - stopwatchElapsedTime;
        stopwatchInterval = setInterval(() => {
            stopwatchElapsedTime = Date.now() - stopwatchStartTime;
            document.getElementById("stopwatch").textContent = formatTime(Math.floor(stopwatchElapsedTime / 1000));
        }, 1000);
    }
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchElapsedTime = 0;
    stopwatchRunning = false;
    document.getElementById("stopwatch").textContent = formatTime(0);
}

// Event listeners for stopwatch buttons
document.getElementById("start-stopwatch").addEventListener("click", startStopwatch);
document.getElementById("stop-stopwatch").addEventListener("click", stopStopwatch);
document.getElementById("reset-stopwatch").addEventListener("click", resetStopwatch);

// Tasks
function addTask() {
    const taskName = document.getElementById("task-name").value;
    const taskTime = new Date(document.getElementById("task-time").value).getTime();
    const currentTime = new Date().getTime();

    if (taskName.trim() === "" || isNaN(taskTime) || taskTime <= currentTime) {
        alert("אנא הכנס משימה.");
        return;
    }

    const timeDiff = taskTime - currentTime;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    const taskElement = document.createElement("li");
    taskElement.classList.add("task");
    taskElement.innerHTML = `
        <strong>${taskName}</strong> - ${days} days, ${hours} hours, ${minutes} minutes
    `;
    document.getElementById("tasks-list").appendChild(taskElement);
}

