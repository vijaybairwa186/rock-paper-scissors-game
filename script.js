let userScore = 0;
let compScore = 0;
let gameOver = false;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const resetBtn = document.querySelector("#reset");

const winSound = new Audio("mixkit-arcade-game-jump-coin-216.wav");
const loseSound = new Audio("mixkit-losing-bleeps-2026.wav");
const drawSound = new Audio("mixkit-player-jumping-in-a-video-game-2043.wav");
const resetSound = new Audio("mixkit-arcade-game-over-3068.wav");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Draw! Play again.";
  msg.style.backgroundColor = "#ff9800";
  drawSound.play();
};

const endGame = (winner) => {
  gameOver = true;
  msg.innerText = `${winner} won the game! Click Reset to play again.`;
  msg.style.backgroundColor = winner === "You" ? "#4caf50" : "#f44336";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "#4caf50";
    winSound.play();
    if (userScore === 5) {
      endGame("You");
    }
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "#f44336";
    loseSound.play();
    if (compScore === 5) {
      endGame("Computer");
    }
  }
};

const playGame = (userChoice) => {
  if (gameOver) return;

  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

resetBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  gameOver = false;
  userScorePara.innerText = 0;
  compScorePara.innerText = 0;
  msg.innerText = "Game Reset. Play again!";
  msg.style.backgroundColor = "#00bcd4";
  resetSound.play();
});
