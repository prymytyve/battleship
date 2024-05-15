import "./style.css";
import Player from "./mod3_playerClass";
import { generateGameBoard, playerBoardToDom } from "./mod5_domStuff";

const gameBoardDisplay = document.querySelector(".gameBoard");
gameBoardDisplay.appendChild(generateGameBoard());

const cells = document.querySelectorAll(".cell");
cells.forEach((cell) =>
  cell.addEventListener("click", (e) => {
    const x = Number(cell.getAttribute("x"));
    const y = Number(cell.getAttribute("y"));
    gameStateFunc([x, y]);
  })
);

const joe = new Player("joe");

function gameStateFunc(coordinates) {
  joe.placeShip(coordinates);
  playerBoardToDom(joe.playerBoard);
  console.log(joe.playerBoard);
}

function autoTest() {
  const robo = new Player("robo");
  robo.shipRandomize();
  playerBoardToDom(robo.playerBoard);
}

autoTest();
