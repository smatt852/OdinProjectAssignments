function compChoice() {
  let choices = ["rock", "paper", "scissors"];
  random_num = Math.floor(Math.random() * choices.length);
  return choices[random_num];
}

function getInput() {
  let playerSelection = "none";
  let promptPlayer = "none";
  do {
    promptPlayer = prompt("Enter rock, paper, or scissors.", "rock");
    playerSelection = promptPlayer.toLowerCase();
  } while (!["rock", "paper", "scissors"].includes(playerSelection));
  return playerSelection;
}
function playRound() {
  playerSelection = getInput();
  compSelection = compChoice();
  let player = 0;
  let comp = 0;
  if (playerSelection === compSelection) {
    player = 0;
    comp = 0;
  } else if (
    (playerSelection === "rock" && compSelection === "scissors") ||
    (playerSelection === "paper" && compSelection === "rock") ||
    (playerSelection === "scissors" && compSelection === "paper")
  ) {
    player = 1;
    comp = 0;
  } else {
    player = 0;
    comp = 1;
  }
  console.log(
    `player: ${playerSelection} ${player} computer: ${compSelection} ${comp}`
  );
  return {
    player: player,
    comp: comp,
  };
}

function game() {
  let compScore = 0;
  let playerScore = 0;
  let result = [];
  while (compScore < 5 && playerScore < 5) {
    result = playRound();
    compScore = compScore + result["comp"];
    playerScore = playerScore + result["player"];
  }
  if (compScore > playerScore) {
    console.log(`Lose, Player:${playerScore} vs Computer:${compScore}`);
  } else if (compScore < playerScore) {
    console.log(`Win!, Player:${playerScore} vs Computer:${compScore}`);
  } else {
    console.log(`Tie, Player:${playerScore} vs Computer:${compScore}`);
  }
}
game();
