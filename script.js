let cookieSize = 1; //the initial size of the cookie
const sizeChange = 0.04; // shows how much the cookie grows per each click

// dom manipulation
const cookieImage = document.getElementById("cookie");
const dialogueBox = document.getElementById("dialogue-box");
const clicksLeft = document.getElementById("clicks-left");

// creating a new container for confetti animation
const confettiContainer = document.createElement("div");
confettiContainer.id = "confetti-container";
document.querySelector(".game-container").appendChild(confettiContainer);

// an array of the astonaut's random lines
const astronautMessages = [
  "Keep clicking, trainee!",
  "Destroy the enemy!",
  "Almost at light-speed clicking!",
  "One small click for humanity!",
  "Watch out for asteroid crumbs!",
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// confetti animation
function startConfetti() {
  const colors = ["#a5191dff", "#f0d567ff", "#91dd16ff", "#1982c4", "#6a4c93"];
  const numberOfPieces = 30;

  for (let i = 0; i <= numberOfPieces; i++) {
    // dom
    const piece = document.createElement("div");
    piece.classList.add("confetti-piece");

    // styling
    piece.style.backgroundColor = colors[getRandomInt(0, colors.length - 1)];
    piece.style.left = `${getRandomInt(0, 220)}px`;
    piece.style.top = `${getRandomInt(0, 50)}px`;
    piece.style.animationDelay = `${Math.random() * 0.5}s`;

    // adding a class
    confettiContainer.appendChild(piece);

    // animation end
    piece.addEventListener("animationend", () => {
      piece.remove();
    });
  }
}

// remaining clicks
function updateClicksLeft() {
  // calculate how many clicks left
  let clicksRemaining = (2 - cookieSize) / sizeChange;
  clicksRemaining = Math.ceil(clicksRemaining);
  clicksLeft.textContent = `Clicks until explosion: ${clicksRemaining}`;
}

// changing the astronaut's lines
function changeDialogue() {
  const randomLine =
    astronautMessages[getRandomInt(0, astronautMessages.length - 1)];
  dialogueBox.textContent = randomLine;

  // change after 5 seconds
  const delay = setTimeout(changeDialogue, 5000);
}

cookieImage.addEventListener("click", () => {
  // make the cookie bigger
  cookieSize += sizeChange;

  // if the cookie has reached explosion size
  if (cookieSize >= 2) {
    cookieImage.classList.add("explode");
    startConfetti();

    cookieImage.addEventListener(
      "animationend",
      () => {
        cookieImage.classList.remove("explode");
        cookieSize = 1;
        cookieImage.style.transform = `scale(${cookieSize})`;
        updateClicksLeft();
      },
      { once: true }
    );
  } else {
    cookieImage.style.transform = `scale(${cookieSize})`;
    updateClicksLeft();
  }
});

updateClicksLeft(); // show clicks left
changeDialogue(); // start changing astronaut's lines
