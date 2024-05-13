const enemyAircraftCarrier = {
  shipname: "aircraft carrier",
  character: 1,
  length: 5,
  health: 5,
  isPlaced: false,
  active: true,
  coordinates: [],
}

const enemyBattleship = {
  shipname: "battleship",
  character: 2,
  length: 4,
  health: 4,
  isPlaced: false,
  active: true,
  coordinates: [],
}

const enemyCruiser = {
  shipname: "cruiser",
  character: 3,
  length: 3,
  health: 3,
  isPlaced: false,
  active: true,
  coordinates: [],
}

const enemySubmarine = {
  shipname: "submarine",
  character: 4,
  length: 3,
  health: 3,
  isPlaced: false,
  active: true,
  coordinates: [],
}

const enemyDestroyer = {
  shipname: "destroyer",
  character: 5,
  length: 2,
  health: 2,
  isPlaced: false,
  active: true,
  coordinates: [],
}

const playerAircraftCarrier = {
  shipname: "aircraft carrier",
  character: 1,
  length: 5,
  health: 5,
  isPlaced: false,
  active: true,
  coordinates: [],
}

const playerBattleship = {
  shipname: "battleship",
  character: 2,
  length: 4,
  health: 4,
  isPlaced: false,
  active: true,
  coordinates: [],
}

const playerCruiser = {
  shipname: "cruiser",
  character: 3,
  length: 3,
  health: 3,
  isPlaced: false,
  active: true,
  coordinates: [],
}

const playerSubmarine = {
  shipname: "submarine",
  character: 4,
  length: 3,
  health: 3,
  isPlaced: false,
  active: true,
  coordinates: [],
}

const playerDestroyer = {
  shipname: "destroyer",
  character: 5,
  length: 2,
  health: 2,
  isPlaced: false,
  active: true,
  coordinates: [],
}

const enemyShips = [enemyAircraftCarrier, enemyBattleship, enemyCruiser, enemySubmarine, enemyDestroyer];
const playerShips = [playerAircraftCarrier, playerBattleship, playerCruiser, playerSubmarine, playerDestroyer];

const obstacles = [1,2,3,4,5,];

let aShipSunkThisRound = false;
let attemptingToTrackShip = false;
let newHitOriginFound = false;
let hitOriginY = undefined;
let hitOriginX = undefined;
let previousGuessY = undefined;
let previousGuessX = undefined;
let previousGuessWasHit = false;
let possibleUp = [];
let possibleLeft = [];
let possibleRight = [];
let possibleDown = [];
let possibleDirections = [possibleUp, possibleDown, possibleLeft, possibleRight];
let directions = ['up', 'down', 'left', 'right'];
let attemptDirection = undefined;
let preferredDirection = undefined;
let isDirectionPreffrence = false;
let attemptDirectionList = undefined;
let vertOrientation = false;
let horOrientation = false;


let playerGuessedCoor = new Set([]);
let enemyGuessedCoor = new Set([]);

function getFreshMap(){
  cleanMap = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
]
  return cleanMap;
}

let playerMap = getFreshMap();
let enemyMap = getFreshMap();



function getCoordinate(){
  return Math.floor(Math.random() * 10);
}



function oneOrZero(){
  return Math.round(Math.random());
}


function checkClearance(y, x, axis, len, map){
  if (axis === 'horizontal'){
    if(x + len - 1 > 9) {
      console.log("no need to check because it is too long to fit inside the board");
      // no need to check because it is too long to fit inside the board
      return false;
    } else if(x === 9){
      console.log("no need to check because there is no space to the right of 9.");
      // no need to check because there is no space to the right of 9. 
      return false;
      
    } else if (x === 0 && y === 0){
      console.log("check the spaces to the right and below");
      // check the spaces to the right and below
      if (map[y][x + len] === 0){
        for (let i = 0; i < len; i++) {
          if (map[y][x + i] !== 0 || map[y + 1][x + i] !== 0){
            return false;
          }
        }
        return true;
      }else {
        return false;
      }

    } else if (x === 0 && y === 9){
      console.log("check the spaces to the right and above");
      // check the spaces to the right and above
      if (map[y][x + len] === 0){
        for (let i = 0; i < len; i++) {
          if (map[y][x + i] !== 0 || map[y - 1][x + i] !== 0){
            return false;
          }
        }
        return true;
      }else {
        return false;
      }

    } else if (x === 0 && y > 0 || x === 0 && y < 9){
      console.log("check above, right, and below");
      // check above, right, and below
      if (map[y][x + len] === 0){
        for (let i = 0; i < len; i++) {
          if (map[y][x + i] !== 0 || map[y - 1][x + i] !== 0 || map[y + 1][x + i] !== 0){
            return false;
          }
        }
        return true;
      }else {
        return false;
      }
      
    } else if (x + len - 1 === 9 && y === 0){
      console.log("check left and below");
      // check left and below
      if (map[y][x - 1] === 0){
        for (let i = 0; i < len; i++) {
          if (map[y][x + i] !== 0 || map[y + 1][x + i] !== 0){
            return false;
          }
        }
        return true;
      }else {
        return false;
      }
    } else if (x + len - 1 === 9 && y === 9){
      console.log("check left and above");
      // check left and above
      if (map[y][x - 1] === 0){
        for (let i = 0; i < len; i++) {
          if (map[y][x + i] !== 0 || map[y - 1][x + i] !== 0){
            return false;
          }
        }
        return true;
      }else {
        return false;
      }
    } else if(x > 0 && x + len - 1 === 9 && y > 0 && y < 9) {
      console.log("check left, above, and below");
      //check left, above, and below
      if (map[y][x - 1] === 0 && map[y][x + len] === 0){
        for (let i = 0; i < len; i++) {
          if (map[y][x + i] !== 0 || map[y - 1][x + i] !== 0 || map[y + 1][x + i] !== 0){
            return false;
          }
        }
        return true;
      }else {
        return false;
      }
    } else if (x > 0 && x + len - 1 < 9 && y === 0){
      console.log("check left, right, and below");
      // check left, right, and below
      if (map[y][x - 1] === 0 && map[y][x + len] === 0){
        for (let i = 0; i < len; i++) {
          if (map[y][x + i] !== 0 || map[y + 1][x + i] !== 0){
            return false;
          }
        }
        return true;
      }else {
        return false;
      }
    } else if (x > 0 && x + len - 1 < 9 && y === 9){
      console.log("check left, right, and above");
      // check left, right, and above
      if (map[y][x - 1] === 0 && map[y][x + len] === 0){
        for (let i = 0; i < len; i++) {
          if (map[y][x + i] !== 0 || map[y - 1][x + i] !== 0){
            return false;
          }
        }
        return true;
      }else {
        return false;
      }
    } else if (x > 0 && x + len - 1 < 9 && y > 0 && y < 9){
      console.log("check above, below, left, and right");
      // check above, below, left, and right
      if (map[y][x - 1] === 0 && map[y][x + len] === 0){
        for (let i = 0; i < len; i++) {
          if (map[y][x + i] !== 0 || map[y - 1][x + i] !== 0 || map[y + 1][x + i] !== 0){
            return false;
          }
        }
        return true;
      }else {
        return false;
      }
    }

  }else if(axis === 'vertical'){
    if(y + len - 1 > 9) {
      console.log("no need to check because it is too long to fit inside the board");
      // no need to check because it is too long to fit inside the board
      return false;
    } else if(y === 9){
      console.log("no need to check because there is no space below of 9.");
      // no need to check because there is no space below of 9. 
      return false;
      
    } else if (x === 0 && y === 0){
      console.log("check the spaces to the right and below");
      // check the spaces to the right and below
      if(map[y + len][x] === 0){
        for (let i = 0; i < len; i++){
          if(map[y + i][x] !== 0 || map[y + i][x + 1] !== 0){
            return false;
          }
        }
        return true;
      }else {
        return false;
      }

    } else if (y === 0 && x === 9){
      console.log("check the spaces to the left and below");
      // check the spaces to the left and below
      if(map[y + len][x] === 0){
        for (let i = 0; i < len; i++){
          if(map[y + i][x] !== 0 || map[y + i][x - 1] !== 0){
            return false;
          }
        }
        return true;
      }else {
        return false;
      }
    } else if (y === 0 && x > 0 || y === 0 && x < 9){
      console.log("check left, right, and below");
      // check left, right, and below
      if(map[y + len][x] === 0){
        for (let i = 0; i < len; i++){
          if(map[y + i][x] !== 0 || map[y + i][x + 1] !== 0 || map[y + i][x - 1] !== 0){
            return false;
          }
        }
        return true;
      }else {
        return false;
      }
    } else if (y + len - 1 === 9 && x === 0){
      console.log("check above and right");
      // check above and right
      if(map[y - 1][x] === 0){
        for (let i = 0; i < len; i++){
          if(map[y + i][x] !== 0 || map[y + i][x + 1] !== 0){
            return false;
          }
        }
        return true;
      }else {
        return false;
      }
    } else if (y + len - 1 === 9 && x === 9){
      console.log("check left and above");
      // check left and above
      if(map[y - 1][x] === 0){
        for (let i = 0; i < len; i++){
          if(map[y + i][x] !== 0 || map[y + i][x - 1] !== 0){
            return false;
          }
        }
        return true;
      }else {
        return false;
      }
    } else if(y > 0 && y + len - 1 === 9 && x > 0 && x < 9) {
      console.log("check left, above, and right");
      //check left, above, and right
      if(map[y - 1][x] === 0){
        for (let i = 0; i < len; i++){
          if(map[y + i][x] !== 0 || map[y + i][x - 1] !== 0 || map[y + i][x + 1] !== 0){
            return false;
          }
        }
        return true;
      }else {
        return false;
      }
    } else if (y > 0 && y + len - 1 < 9 && x === 0){
      console.log("check above, right, and below");
      // check above, right, and below
      if(map[y - 1][x] === 0 && map[y + len][x] === 0){
        for (let i = 0; i < len; i++){
          if(map[y + i][x] !== 0 || map[y + i][x + 1] !== 0){
            return false;
          }
        }
        return true;
      }else {
        return false;
      }
    } else if (y > 0 && y + len - 1 < 9 && x === 9){
      console.log("check left, below, and above");
      // check left, below, and above
      if(map[y - 1][x] === 0 && map[y + len][x] === 0){
        for (let i = 0; i < len; i++){
          if(map[y + i][x] !== 0 || map[y + i][x - 1] !== 0){
            return false;
          }
        }
        return true;
      }else {
        return false;
      }
    } else if (y > 0 && y + len - 1 < 9 && x > 0 && x < 9){
      console.log("check above, below, left, and right");
      // check above, below, left, and right
      if(map[y - 1][x] === 0 && map[y + len][x] === 0){
        for (let i = 0; i < len; i++){
          if(map[y + i][x] !== 0 || map[y + i][x + 1] !== 0 || map[y + i][x - 1] !== 0){
            return false;
          }
        }
        return true;
      }else {
        return false;
      }
    }  
  }
}


function placeShip(y, x, axis, ship, map) {
  if(axis === 'horizontal'){
    for (let i = 0; i < ship.length; i++) {
      map[y][x + i] = ship.character;
      ship.coordinates.push(`${x + i}${y}`);
    }
  } else {
    if(axis === 'vertical'){
      for (let i = 0; i < ship.length; i++) {
        map[y + i][x] = ship.character;
        ship.coordinates.push(`${x}${y + i}`);
      }
    }
  }
}


function determineShip(ship, map){
  let xCor = getCoordinate();
  let yCor =getCoordinate();

  if (map[yCor][xCor] === 0){
    if (oneOrZero() === 0){
      if(checkClearance(yCor, xCor, 'vertical',ship.length, map)) {
        console.log('Attempting to place ' + ship.shipname + ' vertically at ' + xCor + "," + yCor);
        placeShip(yCor, xCor, 'vertical', ship, map);
        ship.isPlaced = true;
      } else {
        console.log('could not place ' + ship.shipname + ' verticaly');
        console.log('re-attempting ' + ship.shipname + ' placement...');
        determineShip(ship, map);
      }
    } else {
      console.log('Attempting to place ' + ship.shipname + ' horizontally at ' + xCor + "," + yCor);
      if(checkClearance(yCor, xCor, 'horizontal', ship.length, map)) {
        console.log('placing ' + ship.shipname + ' horizontaly');
        placeShip(yCor, xCor, 'horizontal', ship, map);
        ship.isPlaced = true;
      } else {
        console.log('could not place ' + ship.shipname + ' horizontaly');
        console.log('re-attempting ' + ship.shipname + ' placement...');
        determineShip(ship, map);
      }
    }
  } else {
    console.log('this spot is occupied');
    console.log('re-attempting ' + ship.shipname + ' placement...');
    determineShip(ship, map)
  } 
}



function placeShips(shipList, map){
  for(let i = 0; i < shipList.length; i++ ) {
    determineShip(shipList[i], map);
  }
  console.log('map created successfully');
}



function displayPlayerShips(map) {
  for(let i = 0; i < map.length; i++){
    for(let j = 0; j < map[i].length; j++){
      if (map[i][j] !== 0 && map === playerMap){
        let coor = `${i}${j}`
        
        let square = document.getElementById(coor);
        square.classList.add("ship");
      }else if (map[i][j] !== 0 && map === enemyMap){
        let coor = `${i}${j}`
        
        let square = document.getElementById('e' + coor);
        square.classList.add("ship");
      }
    }
  }
  console.log(JSON.parse(JSON.stringify(map)));
}


function clearShipDisplay(){
  for (let i = 0; i < 100; i++){
    let coor = `${i}`
    if(i < 10){
      coor = '0' + `${i}`;
      let square = document.getElementById(coor);
      square.classList.remove("ship");
    } else {
      let square = document.getElementById(coor);
      square.classList.remove("ship");
    }
  }
}

function clearObjCoordinates(shipList){
  for (let i = 0; i < shipList.length; i++){
    shipList[i].coordinates.length = 0;
  }
}





placeShips(playerShips, playerMap);
displayPlayerShips(playerMap);

function makeNewMap(){
  clearShipDisplay();
  clearObjCoordinates(playerShips);
  playerMap = getFreshMap()
  placeShips(playerShips, playerMap);
  displayPlayerShips(playerMap);
}


let gameActive = false
let isPlayersTurn = false
let canGuess = false

function gamePhaseDisplay(string){
  document.getElementById("game-phase-text").innerHTML = string;
}

function gameMessageTextBox(){
  if (isPlayersTurn){
    document.getElementById("message-box-text-1").innerHTML = "Click on square on enemy board to launch attack!";
    document.getElementById("message-box-text-2").innerHTML = "";
    
  } else if(!isPlayersTurn && gameActive) {
    document.getElementById("message-box-text-1").innerHTML = "Incoming enemy attack!";
    document.getElementById("message-box-text-2").innerHTML = "";
  }
  
}

function getPressedCoor(co) {
  if (isPlayersTurn && canGuess){
    let arr = co.split("");
    let y = arr[Number(0)];
    let x = arr[Number(1)];
    console.log(y, x);
    checkForHit(y, x);
  }
}

function checkForHit(y, x, map=enemyMap){
  let square = document.getElementById('e' + y + x);
  let playerSquare = document.getElementById(`${y}${x}`);
  let result = document.getElementById("message-box-text-2");
  let currCor = `${y}${x}`
  if (isPlayersTurn && playerGuessedCoor.has(currCor) === false){
    playerGuessedCoor.add(currCor);
    if (map[y][x] !== 0 && canGuess === true){
      square.innerHTML = "&#x1f534";
      result.innerHTML = 'HIT!';
      canGuess = false;
      shipDamage(y, x, map);
      setTimeout(enemyTurn, 2000);

    }else if(map[y][x] === 0 && canGuess === true){
      square.innerHTML = "&#x26aa";
      result.innerHTML = 'MISS!';
      canGuess = false;
      setTimeout(enemyTurn, 2000);

    }
  }else if(isPlayersTurn && playerGuessedCoor.has(currCor)){
    result.innerHTML = 'You have already tried that space.';
  }else if(!isPlayersTurn && enemyGuessedCoor.has(currCor) === false){
    enemyGuessedCoor.add(currCor);
    console.log(y + ',' + x);
    if(map[y][x] !== 0 && !attemptingToTrackShip){
      playerSquare.innerHTML = "&#x1f534";
      result.innerHTML = 'HIT!';
      shipDamage(y, x, map);
      newHitOriginFound = true;
      hitOriginY = y;
      hitOriginX = x;
      previousGuessWasHit = true;
      attemptingToTrackShip = true;
      createPossibleDirections();
      setTimeout(playerTurn, 2000);
    }else if(map[y][x] !== 0 && attemptingToTrackShip){
      playerSquare.innerHTML = "&#x1f534";
      result.innerHTML = 'HIT!';
      shipDamage(y, x, map);
      if(attemptDirection === 'up' || attemptDirection === 'down'){
        vertOrientation = true;
      } else {
        horOrientation = true;
      }
      attemptingToTrackShip = true;
      previousGuessWasHit = true;
      isDirectionPreffrence = true
      if(aShipSunkThisRound){
        attemptingToTrackShip = false;
        newHitOriginFound = false
        previousGuessY = undefined
        previousGuessX = undefined;
        previousGuessWasHit = false;
        possibleUp.length = 0;
        possibleLeft.length = 0;
        possibleRight.length = 0;
        possibleDown.length = 0;
        possibleDirections = [possibleUp, possibleDown, possibleLeft, possibleRight];
        directions = ['up', 'down', 'left', 'right'];
        attemptDirection = undefined;
        preferredDirection = undefined;
        isDirectionPreffrence = false;
        attemptDirectionList = undefined;
        vertOrientation = false;
        horOrientation = false;

      }
      setTimeout(playerTurn, 2000);
   
    }else if(map[y][x] === 0 && attemptingToTrackShip){
      playerSquare.innerHTML = "&#x1f534";
      result.innerHTML = 'MISS!';
      attemptingToTrackShip = true;
      previousGuessWasHit = false;
      isDirectionPreffrence = false
      setTimeout(playerTurn, 2000);
   
    }else if(map[y][x] === 0){
      playerSquare.innerHTML = "&#x26aa";
      result.innerHTML = 'MISS!';
      previousGuessWasHit = false;
      setTimeout(playerTurn, 2000);

    } 
  }
}

function shipDamage(y, x, map){
  if(map === enemyMap){
    result = document.getElementById("message-box-text-2");
    if(map[y][x] === 1){
      enemyAircraftCarrier.health -= 1;
      console.log(enemyAircraftCarrier.health)
      if (enemyAircraftCarrier.health === 0){
        enemyAircraftCarrier.active = false;
        document.getElementById("enemy-aircraft-carrier").classList.add("isSunk");
        result.innerHTML = "You sunk the enemies " + enemyShips[0].shipname + "!";
        
      }
    }else if(map[y][x] === 2){
      enemyBattleship.health -= 1;
      if (enemyBattleship.health === 0){
        enemyBattleship.active = false;
        document.getElementById("enemy-battleship").classList.add("isSunk");
        result.innerHTML = "You sunk the enemies " + enemyShips[1].shipname + "!";
      } 
    }else if(map[y][x] === 3){
      enemyCruiser.health -= 1;
      if (enemyCruiser.health === 0){
        enemyCruiser.active = false;
        document.getElementById("enemy-cruiser").classList.add("isSunk");
        result.innerHTML = "You sunk the enemies " + enemyShips[2].shipname + "!";
      } 
    }else if(map[y][x] === 4){
      enemySubmarine.health -= 1;
      if (enemySubmarine.health === 0){
        enemySubmarine.active = false;
        document.getElementById("enemy-submarine").classList.add("isSunk");
        result.innerHTML = "You sunk the enemies " + enemyShips[3].shipname + "!";
      } 
    }else if(map[y][x] === 5){
      enemyDestroyer.health -= 1;
      if (enemyDestroyer.health === 0){
        enemyDestroyer.active = false;
        document.getElementById("enemy-destroyer").classList.add("isSunk");
        result.innerHTML = "You sunk the enemies " + enemyShips[4].shipname + "!";
      } 
    }
  } else if(map === playerMap){
    result = document.getElementById("message-box-text-2");
    if(map[y][x] === 1){
      playerAircraftCarrier.health -= 1;
      console.log(playerAircraftCarrier.health)
      if (playerAircraftCarrier.health === 0){
        playerAircraftCarrier.active = false;
        document.getElementById("player-aircraft-carrier").classList.add("isSunk");
        result.innerHTML = "The Enemy has sunk your " + playerShips[0].shipname + "!";
        aShipSunkThisRound = true;
        
      }
    }else if(map[y][x] === 2){
      playerBattleship.health -= 1;
      if (playerBattleship.health === 0){
        playerBattleship.active = false;
        document.getElementById("player-battleship").classList.add("isSunk");
        result.innerHTML = "The Enemy has sunk your " + playerShips[1].shipname + "!";
        aShipSunkThisRound = true;
      } 
    }else if(map[y][x] === 3){
      playerCruiser.health -= 1;
      if (playerCruiser.health === 0){
        playerCruiser.active = false;
        document.getElementById("player-cruiser").classList.add("isSunk");
        result.innerHTML = "The Enemy has sunk your " + playerShips[2].shipname + "!";
        aShipSunkThisRound = true;
      } 
    }else if(map[y][x] === 4){
      playerSubmarine.health -= 1;
      if (playerSubmarine.health === 0){
        playerSubmarine.active = false;
        document.getElementById("player-submarine").classList.add("isSunk");
        result.innerHTML = "The Enemy has sunk your " + playerShips[3].shipname + "!";
        aShipSunkThisRound = true;
      } 
    }else if(map[y][x] === 5){
      playerDestroyer.health -= 1;
      if (playerDestroyer.health === 0){
        playerDestroyer.active = false;
        document.getElementById("player-destroyer").classList.add("isSunk");
        result.innerHTML = "The Enemy has sunk your " + playerShips[4].shipname + "!";
        aShipSunkThisRound = true;
      } 
    }
  }
}



function enemyTurn(){
  aShipSunkThisRound = false;
  console.log('enemy turn')
  isPlayersTurn = false
  document.getElementById("next-button").classList.add("hide");
  gamePhaseDisplay("Enemy Turn");
  gameMessageTextBox()
  setTimeout(enemyGuess, 2000);

}

function enemyGuess(){
  if(!attemptingToTrackShip){
    let xCor = getCoordinate();
    let yCor = getCoordinate();
    let currCor = `${yCor}${xCor}`
    if(!enemyGuessedCoor.has(currCor)){
      checkForHit(yCor, xCor, playerMap);
    }else{
      enemyGuess();
    } 
  }else{
    attemptFollowUpAttack();
  }
}

function createPossibleDirections(){
  for(let i = 1; i < 5; i++){
    if(hitOriginY === 0 && hitOriginX === 0){
      //only make down and right
      if(hitOriginY + i < 10){
        possibleDown.push(hitOriginY + i)
      }
      if(hitOriginX + i < 10){
        possibleRight.push(hitOriginX + i)
      }
    }else if(hitOriginY === 9 && hitOriginX === 0){
      //only make up and right
      if(hitOriginY - i > -1){
        possibleUp.push(hitOriginY - i)
      }
      if(hitOriginX + i < 10){
        possibleRight.push(hitOriginX + i)
      }
    }else if(hitOriginY === 0 && hitOriginX === 9){
      //only make down and left
      if(hitOriginY + i < 10){
        possibleDown.push(hitOriginY + i)
      }
      if(hitOriginX - i > -1){
        possibleLeft.push(hitOriginX - i)
      }
    }else if(hitOriginY === 9 && hitOriginX === 9){
      //only make up and left
      if(hitOriginY - i > -1){
        possibleUp.push(hitOriginY - i)
      }
      if(hitOriginX - i > -1){
        possibleLeft.push(hitOriginX - i)
      }
    }else if(hitOriginY === 0 && hitOriginX !== 0 && hitOriginX !== 9){
      // make down, left, and right
      if(hitOriginY + i < 10){
        possibleDown.push(hitOriginY + i)
      }
      if(hitOriginX - i > -1){
        possibleLeft.push(hitOriginX - i)
      }
      if(hitOriginX + i < 10){
        possibleRight.push(hitOriginX + i)
      }
    }else if(hitOriginY === 9 && hitOriginX !== 0 && hitOriginX !== 9){
      // make up, left, and right
      if(hitOriginY - i > -1){
        possibleUp.push(hitOriginY - i)
      }
      if(hitOriginX - i > -1){
        possibleLeft.push(hitOriginX - i)
      }
      if(hitOriginX + i < 10){
        possibleRight.push(hitOriginX + i)
      }
    }else if(hitOriginX === 0 && hitOriginY !== 0 && hitOriginY !== 9){
      // make up, down, and right
      if(hitOriginY - i > -1){
        possibleUp.push(hitOriginY - i)
      }
      if(hitOriginY + i < 10){
        possibleDown.push(hitOriginY + i)
      }
      if(hitOriginX + i < 10){
        possibleRight.push(hitOriginX + i)
      }

    }else if(hitOriginX === 9 && hitOriginY !== 0 && hitOriginY !== 9){
      // make up, down, and left
      if(hitOriginY - i > -1){
        possibleUp.push(hitOriginY - i)
      }
      if(hitOriginY + i < 10){
        possibleDown.push(hitOriginY + i)
      }
      if(hitOriginX - i > -1){
        possibleLeft.push(hitOriginX - i)
      }
    }else{
      // make up, down, left, and right
      if(hitOriginY - i > -1){
        possibleUp.push(hitOriginY - i)
      }
      if(hitOriginY + i < 10){
        possibleDown.push(hitOriginY + i)
      }
      if(hitOriginX + i < 10){
        possibleRight.push(hitOriginX + i)
      }
      if(hitOriginX - i > -1){
        possibleLeft.push(hitOriginX - i)
      }
    }
  }
  console.log('possible Up' + possibleUp);
  console.log('possible Down' + possibleDown);
  console.log('possible Right' + possibleRight);
  console.log('possible Left' + possibleLeft);
}


function generatePredictionLists(){
  if(hitOriginY === 0){
    
  }
}

function getRandDirection(){
  let randNum = Math.floor(Math.random() * possibleDirections.length);
  attemptDirectionList = possibleDirections.splice(randNum, 1);
  let attempt = directions.splice(randNum,1);
  attemptDirection =  attempt[0];
  console.log(attemptDirection + ' : ' + attemptDirectionList);
}



function attemptFollowUpAttack(){
  if(!isDirectionPreffrence){
    getRandDirection();
  
  
    if(attemptDirection === 'up' || attemptDirection === 'down'){
      
      let newY = attemptDirectionList.splice(0,1)[0];
      let checkCoor = `${newY[0]}${hitOriginX}`
      console.log('newy: ' + newY);
      console.log('newy[0]: ' + newY[0]);
      console.log('check coor: ' + checkCoor);
      if(enemyGuessedCoor.has(checkCoor) || horOrientation){
        attemptFollowUpAttack();
      } else if(!enemyGuessedCoor.has(checkCoor)){
        checkForHit(newY[0], hitOriginY, playerMap);
      }

    }else if(attemptDirection === 'left' || attemptDirection === 'right'){
      console.log(attemptDirection + ' is left or right');
      let newX = attemptDirectionList.splice(0,1);
      let checkCoor = `${hitOriginY}${newX[0]}`;
      console.log('newX: ' + newX);
      console.log('newX[0]: ' + newX[0]);
      console.log('check coor: ' + checkCoor);
      if(enemyGuessedCoor.has(checkCoor) || vertOrientation){
        attemptFollowUpAttack();
      } else if(!enemyGuessedCoor.has(checkCoor)){
        checkForHit(hitOriginY, newX[0], playerMap);
      }
    }
  
  }
  
}

function playerTurn(){
  isPlayersTurn = true
  console.log('player turn');
  gamePhaseDisplay("Your Turn");
  gameMessageTextBox();
  canGuess = true;

}



function startGame(){
  gameActive = true;
  placeShips(enemyShips, enemyMap);
  displayPlayerShips(enemyMap);
  document.getElementById("reroll-button").classList.add("hide");
  document.getElementById("start-button").classList.add("hide");
  playerTurn();
}

