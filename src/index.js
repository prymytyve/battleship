import "./style.css";
import Player from "./mod3_playerClass";
import { shipHandler } from "./mod4_handlers";

const gameBoardDisplay = document.querySelector(".gameBoard");

gameBoardDisplay.appendChild(generateGameBoard());

function generateGameBoard() {
  const board = document.createElement("table");
  board.classList.add("gameBoard");
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("tr");
    row.classList.add("row");
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("td");
      cell.classList.add("cell");
      cell.setAttribute("x", i);
      cell.setAttribute("y", j);
      cell.addEventListener("click", (e) => {
        const x = Number(cell.getAttribute("x"));
        const y = Number(cell.getAttribute("y"));
        eventListenerStuff([x, y]);
      });
      row.appendChild(cell);
    }
    board.appendChild(row);
  }
  return board;
}

const joe = new Player("joe");
joe.shipsArr = shipHandler();

function eventListenerStuff(coordinates) {
  gameFlow(joe, coordinates);
}

function gameFlow(player, coordinates) {
  const board = player._game;
  const ships = player.shipsArr;
  if (ships.length > 0) {
    let currShip = ships.shift();
    board.placeShip(currShip, coordinates, "horizontal");
    console.log(board.gameBoard);
  } else {
    console.log("complete");
  }
}
