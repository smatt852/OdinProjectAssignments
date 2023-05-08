// call playRound with the player's choice from the button clicked
let rockButton = document.getElementById("rock");
rockButton.addEventListener("click", () => {
  playRound("rock");
});
let paperButton = document.getElementById("paper");
paperButton.addEventListener("click", () => {
  playRound("paper");
});
let scissorsButton = document.getElementById("scissors");
scissorsButton.addEventListener("click", () => {
  playRound("scissors");
});

// increase the scores
function pScore() {
  let playerScore = document.getElementById("playerScore");
  playerScore.innerText = parseInt(playerScore.innerText) + 1;
}

function cScore() {
  let compScore = document.getElementById("compScore");
  compScore.innerText = parseInt(compScore.innerText) + 1;
}

// generate a random choice for the computer
function compChoice() {
  let choices = ["rock", "paper", "scissors"];
  random_num = Math.floor(Math.random() * choices.length);
  return choices[random_num];
}

function playRound(fromButton) {
  playerSelection = fromButton;
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
    pScore();
    gameEnd();
  } else {
    player = 0;
    comp = 1;
    cScore();
    gameEnd();
  }
  //make a p element, fill it with the choice and
  //set the style then put it in the results box
  let q1 = document.getElementById("playerBox");
  let pRound = document.createElement("p");
  pRound.innerText = playerSelection;
  pRound.setAttribute("class", "p2");
  q1.appendChild(pRound);
  //as above, for the computer choice and results
  let q2 = document.getElementById("compBox");
  let cRound = document.createElement("p");
  cRound.innerText = compSelection;
  cRound.setAttribute("class", "p2");
  q2.appendChild(cRound);
}

function gameEnd() {
  let x = document.getElementById("compScore");
  let y = document.getElementById("playerScore");
  //when someone reaches 5 games, disable the buttons
  if (x.innerText === "5" || y.innerText === "5") {
    document.getElementById("rock").disabled = true;
    document.getElementById("paper").disabled = true;
    document.getElementById("scissors").disabled = true;
  }
  //color the background red for the winner
  if (y.innerText === "5") {
    let f1 = document.getElementById("playerBox");
    f1.setAttribute("class", "playerBox result");
  }
  if (x.innerText === "5") {
    let f2 = document.getElementById("compBox");
    f2.setAttribute("class", "compBox result");
  }
}
