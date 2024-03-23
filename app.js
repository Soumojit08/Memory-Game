let time = document.querySelector("#time");
let startBtn = document.querySelector("#start-btn");
let stopBtn = document.querySelector("#stop-btn");
let resetBtn = document.querySelector("#reset-btn");
let timeid;
let startTime;
let isRunning = false;

// Event listeners for buttons
startBtn.addEventListener("click", function () {
  if (!isRunning) {
    // Start timer only if not already running
    isRunning = true;
    startTimer();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }
});

stopBtn.addEventListener("click", function () {
  isRunning = false;
  clearInterval(timeid);
  startBtn.disabled = false;
});

resetBtn.addEventListener("click", function () {
  window.location.reload();
});

function startTimer() {
  startTime = new Date().getTime();
  timeid = setInterval(updateTime, 1000);
}

function updateTime() {
  let currentTime = new Date().getTime();
  let elapsedTime = Math.floor((currentTime - startTime) / 1000);
  time.innerText = elapsedTime; // Using innerText for content update
}

//Game code

const gameHolder = document.querySelector(".game-holder");
const boxes = gameHolder.querySelectorAll(".box"); // Select all buttons

let colors = []; // Array to store generated colors
let clickedBoxIndex = null; // Keeps track of the first clicked box index
let revealedBoxes = []; // Array to store currently revealed box indexes

function generateColors() {
  const boxCount = boxes.length; // Get number of boxes from the DOM
  for (let i = 0; i < boxCount / 2; i++) {
    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`; // Generate random hex color
    colors.push(color, color); // Add two instances of the same color
  }
  // Shuffle the colors to randomize their order
  colors.sort(() => Math.random() - 0.5);
}

function handleClick(box, index) {
  if (revealedBoxes.includes(index)) {
    // Ignore clicks on already revealed boxes
    return;
  }

  box.style.backgroundColor = colors[index];
  revealedBoxes.push(index); // Add clicked box to revealed list

  if (clickedBoxIndex === null) {
    // First click, store index
    clickedBoxIndex = index;
  } else {
    // Second click
    if (colors[clickedBoxIndex] === colors[index]) {
      // Match! Keep colors revealed
      clickedBoxIndex = null;
      revealedBoxes = []; // Reset revealed list for next pair
    } else {
      // Not a match, reset colors after 0.5 seconds
      setTimeout(function () {
        boxes[clickedBoxIndex].style.backgroundColor = "gray";
        box.style.backgroundColor = "gray";
        clickedBoxIndex = null;
        revealedBoxes = []; // Reset revealed list
      }, 500);
    }
  }
}

function startGame() {
  generateColors();
  boxes.forEach((box) => {
    box.style.backgroundColor = "gray"; // Set initial color
    box.addEventListener("click", function () {
      handleClick(box, Array.from(boxes).indexOf(box)); // Fix: Convert NodeList to array
    });
  });
}

startGame(); // Start the game
