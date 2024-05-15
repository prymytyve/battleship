import "./style.css";
import Player from "./mod3_playerClass";
import { shipHandler, attack, rngArray, rngNum } from "./mod4_handlers";
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
const game = joe._game;
joe.shipsArr = shipHandler();

function gameStateFunc(coordinates) {
  // step1PlaceShips(joe, coordinates);
  // playerBoardToDom(joe._game.gameBoard);
  // autoStep1(joe);
}

function autoTest() {
  const robo = new Player("robo");
  robo.shipsArr = shipHandler();
  autoStep1(robo);
}

function step1PlaceShips(
  player,
  coordinates,
  orientation = "horizontal",
  errorMsgOn = true
) {
  const ships = player.shipsArr;
  if (ships.length === 0) return;
  try {
    player._game.placeShip(ships[0], coordinates, orientation);
    ships.shift();
  } catch (e) {
    if (errorMsgOn) console.log(e, ships);
    return;
  }
}

function autoStep1(player) {
  const shipsArr = player.shipsArr;
  while (shipsArr.length > 0) {
    let coordinates = rngArray();
    let orientation = rngNum() === 0 ? "horizontal" : "vertical";
    step1PlaceShips(player, coordinates, orientation, false);
  }
  playerBoardToDom(player._game.gameBoard);
}
