import "./style.css";
import Player from "./mod3_playerClass";
import { generateGameBoard, updateBoard } from "./mod5_domStuff";
import { battle } from "./mod4_miscFuncs";

const gameBoardDisplay = document.querySelector(".gameBoard");
const mainBoardDisplay = document.querySelector(".mainBoard");
const subBoardDisplay = document.querySelector(".subBoard");
const turnInfo = document.querySelector(".turnInfo");

function eventFn(cell) {
  const x = Number(cell.getAttribute("x"));
  const y = Number(cell.getAttribute("y"));
  gameHandler([x, y]);
}

const cells = mainBoardDisplay.querySelectorAll(".cell");
cells.forEach((cell) =>
  cell.addEventListener("click", () => {
    eventFn(cell);
  })
);

////////////////////////////////////////
const joe = new Player("joe");
const bob = new Player("Bob");
joe.placeShip(joe.ships[3], [0, 0]);
bob.placeShip(bob.ships[4], [0, 0]);
let turnPlayer = joe;
let defender = bob;
//////////////////////////////////////

////fist page load
updateBoard(joe, bob, eventFn);
turnInfo.textContent = turnPlayer._playerName + "'s Turn";

////main function
function gameHandler(coordinates) {
  const thisBattle = battle(turnPlayer, defender, coordinates);
  if (thisBattle !== "void" && !thisBattle.includes("GAME OVER!")) {
    let temp = turnPlayer;
    turnPlayer = defender;
    defender = temp;
    turnInfo.textContent = turnPlayer._playerName + "'s Turn";
    updateBoard(turnPlayer, defender, eventFn);
  } else if (thisBattle !== "void" && thisBattle.includes("GAME OVER!")) {
    turnInfo.textContent = turnPlayer._playerName + " wins";
    updateBoard(turnPlayer, defender);
  } else {
    console.log(thisBattle);
  }
}

//transitionScreen(prevMessage){
// text.content = prevMessage, players turn
// create btn
// btn.txt = start Turn
//}

//if message returns anything other than void, button to submit :coordinates is enabled
//ai checks playerBoard. objects are replaced with 0.
//change player.placeShips. keep portion of it for randomize, but need another that accepts place ship args
//come back and async funcs?

//
