import "./style.css";
import Player from "./mod3_playerClass";
import {
  generateGameBoard,
  gameBoardToDom,
  displayHitsOrMiss,
  displayShipsInDom,
} from "./mod5_domStuff";

const gameBoardDisplay = document.querySelector(".gameBoard");
const mainBoardDisplay = document.querySelector(".mainBoard");
const subBoardDisplay = document.querySelector(".subBoard");

mainBoardDisplay.appendChild(generateGameBoard());
subBoardDisplay.appendChild(generateGameBoard());

const cells = mainBoardDisplay.querySelectorAll(".cell");
cells.forEach((cell) =>
  cell.addEventListener("click", (e) => {
    const x = Number(cell.getAttribute("x"));
    const y = Number(cell.getAttribute("y"));
    gameStateFunc([x, y]);
  })
);

const joe = new Player("joe");
const bob = new Player("Bob");
joe.shipRandomize();
bob.shipRandomize();
displayShipsInDom(joe.playerBoard, mainBoardDisplay);
displayHitsOrMiss(joe.playerBoard, subBoardDisplay);

function gameStateFunc(coordinates) {
  const attack = joe._game.receiveAttack(coordinates);
  console.log(attack, coordinates);
  displayShipsInDom(joe.playerBoard, mainBoardDisplay);
  displayHitsOrMiss(joe.playerBoard, subBoardDisplay);
}
