let gameseq = [];
let userseq = [];
const keys = ["red", "green", "blue", "yellow"];
let start = false;
let level = 0;
let maxScore = 0;
let acceptingInput = false; // Prevent user clicks during sequence playback

const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const h1 = document.querySelector("h1");
const body = document.querySelector("body");
const allKeys = document.querySelectorAll(".key");
const sirenSound = document.getElementById("siren"); // Siren sound

// Start game on key press (only once)
document.addEventListener("keydown", () => {
    if (!start) {
        start = true;
        levelup();
    }
});

// Function to flash a button
function flashElement(key, className) {
    key.classList.add(className);
    setTimeout(() => key.classList.remove(className), 300);
}

// Function to start the next level
function levelup() {
    acceptingInput = false; // Disable user input during sequence playback
    userseq = []; // Reset user sequence
    level++;

    if (level > maxScore) {
        maxScore = level;
    }

    h2.innerHTML = `Level ${level}`;
    h3.innerHTML = `Max Score: ${maxScore}`;

    let randomKey = keys[Math.floor(Math.random() * keys.length)];
    gameseq.push(randomKey);

    console.log("Game Sequence:", gameseq);

    // Play the sequence step by step
    let i = 0;
    function showSequence() {
        if (i < gameseq.length) {
            let btn = document.getElementById(gameseq[i]);
            flashElement(btn, "flash");
            i++;
            setTimeout(showSequence, 600);
        } else {
            acceptingInput = true; // Enable user input after sequence is complete
        }
    }
    setTimeout(showSequence, 500);
}

// Function to check the user input step by step
function checkAns(idx) {
    if (userseq[idx] !== gameseq[idx]) {
        // Play siren sound on wrong answer
        sirenSound.play();

        // Game over
        h2.innerHTML = `Game Over! Your score was <b>${level - 1}</b> <br>Press any key to restart.`;
        h2.style.color = "black";
        h3.style.color = "black";
        h1.style.color = "black";

        body.style.backgroundColor = "red";

        setTimeout(() => {
            h2.style.color = "white";
            h3.style.color = "white";
            h1.style.color = "white";
            body.style.backgroundColor = "#1e1e1e";
        }, 1000);

        reset();
        return;
    }

    // If user completed the sequence, move to the next level
    if (userseq.length === gameseq.length) {
        acceptingInput = false;
        setTimeout(levelup, 1000);
    }
}

// Function to handle user button clicks
function keyPress() {
    if (!acceptingInput) return;

    let key = this;
    flashElement(key, "userflash");

    let userColor = key.getAttribute("id");
    userseq.push(userColor);

    checkAns(userseq.length - 1);
}

// Add event listeners to buttons
allKeys.forEach((key) => key.addEventListener("click", keyPress));

// Reset function
function reset() {
    start = false;
    gameseq = [];
    userseq = [];
    level = 0;
    acceptingInput = false;
}
