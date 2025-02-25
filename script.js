let compseq = [];
let userseq = [];
console.log("Testing if script is loaded!");

let keys = ["red", "green", "blue", "yellow"];

let start = false;
let level = 0;

let h2 = document.querySelector("h2");

// Use "keydown" instead of "keypress"
document.addEventListener("keydown", function () {
    if (!start) {
        console.log("Game Started");
        start = true;
        levelup();
    }
});

function keyFlash(key) {
    key.classList.add("flash");
    setTimeout(function () {
        key.classList.remove("flash");
    }, 500);
}

function levelup() {
    level++;
    console.log("Level Up Function Called!"); // Debugging log
    h2.innerText = `Level ${level}`;

    let randomKey = keys[Math.floor(Math.random() * keys.length)];
    let randombtn = document.querySelector(`.${randomKey}`);

    if (randombtn) {
        keyFlash(randombtn);
    } else {
        console.error("Button not found for:", randomKey);
    }
}
