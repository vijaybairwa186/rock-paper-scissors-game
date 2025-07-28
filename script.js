let userScore = 0;
let compScore = 0;
const MAX_SCORE = 5;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const roundResultMsg = document.querySelector("#round-result-msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const resetBtn = document.querySelector("#reset");
const confettiContainer = document.querySelector("#confetti-container");

const winSound = new Audio("mixkit-arcade-game-jump-coin-216.wav");
const loseSound = new Audio("mixkit-losing-bleeps-2026.wav");
const drawSound = new Audio("mixkit-player-jumping-in-a-video-game-2043.wav");
const resetSound = new Audio("mixkit-arcade-game-over-3068.wav");
const gameWinSound = new Audio("mixkit-game-level-completed-2059.wav");
const gameLoseSound = new Audio("mixkit-winning-a-coin-video-game-2069.wav");

let gameOver = false;

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const resetChoiceHighlights = () => {
  choices.forEach((choice) => {
    choice.classList.remove("win-glow", "lose-glow");
  });
};

const displayRoundResult = (userWin, userChoice, compChoice) => {
  resetChoiceHighlights();

  const userChoiceElement = document.getElementById(userChoice);
  const compChoiceElement = document.getElementById(compChoice);

  if (userWin) {
    roundResultMsg.innerText = `Your ${userChoice} beats ${compChoice}.`;
    userChoiceElement.classList.add("win-glow");
    compChoiceElement.classList.add("lose-glow");
    winSound.play();
  } else {
    roundResultMsg.innerText = `${compChoice} beats your ${userChoice}.`;
    userChoiceElement.classList.add("lose-glow");
    compChoiceElement.classList.add("win-glow");
    loseSound.play();
  }
};

const drawGame = (userChoice) => {
  msg.innerText = "It's a Draw!";
  msg.style.backgroundColor = "#ff9800";
  roundResultMsg.innerText = `Both chose ${userChoice}.`;
  resetChoiceHighlights();
  drawSound.play();
};

const createConfetti = () => {
  for (let i = 0; i < 100; i++) {
    const confettiPiece = document.createElement("div");
    confettiPiece.classList.add("confetti-piece");
    confettiPiece.style.left = `${Math.random() * 100}vw`;
    confettiPiece.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
    confettiPiece.style.animationDelay = `${Math.random() * 2}s`;
    confettiPiece.style.width = `${Math.random() * 8 + 5}px`;
    confettiPiece.style.height = `${Math.random() * 8 + 5}px`;
    confettiContainer.appendChild(confettiPiece);

    confettiPiece.addEventListener("animationend", () => {
      confettiPiece.remove();
    });
  }
};

const endGame = (winner) => {
  gameOver = true;
  resetChoiceHighlights();

  if (winner === "You") {
    msg.innerText = `🥳 You won the game! 🥳`;
    msg.style.backgroundColor = "#4caf50";
    gameWinSound.play();
    createConfetti();
  } else {
    msg.innerText = `Computer won the game! Better luck next time.`;
    msg.style.backgroundColor = "#f44336";
    gameLoseSound.play();
  }
  roundResultMsg.innerText = "Click Reset to play again!";
  disableChoices();
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = "You win this round!";
    msg.style.backgroundColor = "#8bc34a";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = "You lose this round.";
    msg.style.backgroundColor = "#ff7043";
  }

  displayRoundResult(userWin, userChoice, compChoice);

  if (userScore === MAX_SCORE) {
    endGame("You");
  } else if (compScore === MAX_SCORE) {
    endGame("Computer");
  }
};

const playGame = (userChoice) => {
  if (gameOver) {
    msg.innerText = "Game over! Click Reset to play again.";
    return;
  }

  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame(userChoice);
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
    if (!gameOver) {
      const userChoice = choice.getAttribute("id");
      playGame(userChoice);
    }
  });
});

const disableChoices = () => {
  choices.forEach((choice) => {
    choice.style.pointerEvents = "none";
    choice.style.opacity = "0.7";
  });
};

const enableChoices = () => {
  choices.forEach((choice) => {
    choice.style.pointerEvents = "auto";
    choice.style.opacity = "1";
  });
};

resetBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  gameOver = false;
  userScorePara.innerText = 0;
  compScorePara.innerText = 0;
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#ff6f61";
  roundResultMsg.innerText = "";
  resetChoiceHighlights();
  enableChoices();
  resetSound.play();
});

resetChoiceHighlights();
