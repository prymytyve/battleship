import "./style.css";
import Player from "./mod3_playerClass";

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
      const coordinates = [i, j];
      cell.setAttribute("data", coordinates);
      cell.addEventListener("click", () => {
        console.log(cell.getAttribute("data"));
        //add eventfunction here
      });
      row.appendChild(cell);
    }
    board.appendChild(row);
  }
  return board;
}
