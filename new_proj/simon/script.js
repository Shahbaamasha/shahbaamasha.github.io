const colors = ["green", "red", "yellow", "blue"];
let sequence = [];
let playerSequence = [];
let round = 1;
let roundsSequence = [];

function generateSequence() {
    sequence = [];
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(newColor);
    roundsSequence = roundsSequence.concat(sequence);
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        flashColor(roundsSequence[i]);
        i++;
        if (i >= roundsSequence.length) {
            clearInterval(interval);
            playerSequence = [];
        }
    }, 1000);
}

function flashColor(color) {
    const element = document.getElementById(color);
    element.style.opacity = "1";
    setTimeout(() => {
        element.style.opacity = "0.7";
    }, 500);
}

function handleClick(event) {
    const clickedColor = event.target.id;
    flashColor(clickedColor);
    playerSequence.push(clickedColor);
    if (playerSequence.length === roundsSequence.length) {
        if (JSON.stringify(playerSequence) === JSON.stringify(roundsSequence)) {
            if (round < 5) {
                round++;
                generateSequence();
                setTimeout(() => {
                    playSequence();
                }, 1000);
                document.getElementById('round-number').innerText = round;
            } else {
                alert("כל הכבוד, הצלחת בגדול!");
            }
        } else {
            alert("נפסלת! נסה שוב!");
            round = 1;
            roundsSequence = [];
            generateSequence();
            setTimeout(() => {
                playSequence();
            }, 1000);
            document.getElementById('round-number').innerText = round;
        }
    }
}

function startGame() {
    round = 1;
    roundsSequence = [];
    generateSequence();
    playSequence();
    document.getElementById('round-number').innerText = round;
}

document.getElementById("start").addEventListener("click", startGame);
document.querySelectorAll(".color").forEach(color => {
    color.addEventListener("click", handleClick);
});
