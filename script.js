let gameseq = [];
let userseq = [];
const keys = ["red", "green", "blue", "yellow"];
let start = false;
let level = 0;
let maxScore = 0;
let acceptingInput = false;

const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const h1 = document.querySelector("h1");
const body = document.querySelector("body");
const allKeys = document.querySelectorAll(".key");
const sirenSound = document.getElementById("siren");

// ✅ Start game on key press or tap
document.addEventListener("keydown", startGame);
document.addEventListener("click", startGame);
document.addEventListener("touchstart", startGame, { passive: true });

function startGame() {
    if (!start) {
        start = true;
        levelup();
    }
}

// Function to flash a button
function flashElement(key, className) {
    key.classList.add(className);
    setTimeout(() => key.classList.remove(className), 200);
}

// Function to start the next level
function levelup() {
    acceptingInput = false;
    userseq = [];
    level++;

    if (level > maxScore) {
        maxScore = level;
    }

    h2.innerHTML = `Level ${level}`;
    h3.innerHTML = `Max Score: ${maxScore}`;

    let randomKey = keys[Math.floor(Math.random() * keys.length)];
    gameseq.push(randomKey);

    let i = 0;
    function showSequence() {
        if (i < gameseq.length) {
            let btn = document.getElementById(gameseq[i]);
            flashElement(btn, "flash");
            i++;
            setTimeout(showSequence, 400);
        } else {
            acceptingInput = true;
        }
    }
    setTimeout(showSequence, 300);
}

// Function to check user input
function checkAns(idx) {
    if (userseq[idx] !== gameseq[idx]) {
        playSiren();

        h2.innerHTML = `Game Over! Your score was <b>${level - 1}</b> <br>Tap anywhere to restart.`;
        body.style.backgroundColor = "red";

        setTimeout(() => {
            body.style.backgroundColor = "#1e1e1e";
        }, 800);

        reset();
        return;
    }

    if (userseq.length === gameseq.length) {
        acceptingInput = false;
        setTimeout(levelup, 600);
    }
}

// Function to handle user clicks
function keyPress() {
    if (!acceptingInput) return;

    let key = this;
    flashElement(key, "userflash");

    let userColor = key.getAttribute("id");
    userseq.push(userColor);

    checkAns(userseq.length - 1);
}

// ✅ Add both click and touch support for mobile
allKeys.forEach((key) => {
    key.addEventListener("click", keyPress);
    key.addEventListener("touchstart", keyPress, { passive: true });
});

// Function to play siren sound
function playSiren() {
    if (sirenSound.readyState >= 2) {
        sirenSound.currentTime = 0;
        sirenSound.play().catch(error => console.log("Sound blocked:", error));
    }
}

// Reset function
function reset() {
    start = false;
    gameseq = [];
    userseq = [];
    level = 0;
    acceptingInput = false;
}
