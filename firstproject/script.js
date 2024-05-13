let playerChoice = null;
let cpuChoice = null;
let result = null;
let wins = 0;
let losses = 0;
let ties = 0;

function setPlayerChoice(choice) {
  playerChoice = choice;
  console.log(playerChoice)
  playRound();
  
}

function setCpuChoice() {
  randNumber = Math.floor(Math.random() * 3)
  if (randNumber === 0) {
    cpuChoice = "rock";
  } else if (randNumber === 1) {
    cpuChoice = "paper";
  } else {
    cpuChoice = "scissors"
  }
  
}

function displayCpuChoice() {
  let cpuRock = document.getElementById('cpu-rock');
  let cpuPaper = document.getElementById('cpu-paper');
  let cpuScissors= document.getElementById('cpu-scissors');
  cpuRock.classList.remove("chosen");
  cpuPaper.classList.remove("chosen");
  cpuScissors.classList.remove("chosen");

    if (cpuChoice === "rock") {
      cpuRock.classList.add("chosen");
    } else if (cpuChoice === "paper") {
      cpuPaper.classList.add("chosen");
    } else if (cpuChoice === "scissors") {
      cpuScissors.classList.add("chosen");
    } else {
      console.log(cpuChoice);
    }
  console.log(cpuChoice);
}


function determineOutcome() {
  let outcome = document.getElementById('outcome');
  if (playerChoice === cpuChoice){
    result = "Tie!";
    ties ++;
  } else if (playerChoice === "rock" && cpuChoice == "scissors") {
    result = "Win!";
    wins ++;
  } else if (playerChoice === "scissors" && cpuChoice == "paper") {
    result = "Win!";
    wins ++;
  } else if (playerChoice === "paper" && cpuChoice == "rock") {
    result = "Win!";
    wins ++;
  } else {
    result = "Lose!"
    losses ++;
  }
  outcome.innerHTML = result;
  console.log(result);
}

function updateStats() {
  document.getElementById('wins').innerHTML = wins;
  document.getElementById('losses').innerHTML = losses;
  document.getElementById('ties').innerHTML = ties;

}


function playRound() {
  setCpuChoice();
  displayCpuChoice();
  determineOutcome();
  updateStats();


}