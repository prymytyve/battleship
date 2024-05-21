import "./style.css";
import Player from "./mod3_playerClass";
import {
  generateGameBoard,
  updateDisplays4Battle,
  shipsDisplay,
  popUp,
  addEventFnToCell,
  buttonCreator,
} from "./mod5_domStuff";
import { battle } from "./mod4_miscFuncs";

const mainBoardDisplay = document.querySelector(".mainBoard");
const turnInfo = document.querySelector(".turnInfo");
const dialog = document.querySelector("dialog");
const start = document.querySelector("#start");
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");

let currentPlayer = null;
let defendingPlayer = null;

function createPlayers() {
  currentPlayer = new Player(player1.value);
  defendingPlayer = new Player(player2.value);
  dialog.close();
  popUp(
    shipPlacingHandler,
    currentPlayer._playerName + "'s turn to place ships"
  );
}

start.appendChild(buttonCreator("start game", createPlayers));

function shipPlacingHandler() {
  mainBoardDisplay.replaceChildren(generateGameBoard());
  turnInfo.textContent = currentPlayer._playerName;
  const finishBtn = buttonCreator("finish", handlerSwitch);
  finishBtn.classList.add("finish");
  finishBtn.disabled = true;
  mainBoardDisplay.appendChild(finishBtn);
  shipsDisplay(currentPlayer.playerBoard, mainBoardDisplay);
  addEventFnToCell(placingShipsEvent);
}

function placingShipsEvent(thisCell, coordinates) {
  const placement = currentPlayer.placeShip(
    currentPlayer.ships[0],
    coordinates
  );
  shipsDisplay(currentPlayer.playerBoard, mainBoardDisplay);
  if (currentPlayer.ships.length === 0) {
    const finishBtn = document.querySelector(".finish");
    finishBtn.disabled = false;
  }
}

function anyShipsLeft() {
  return currentPlayer.ships.length !== 0 || defendingPlayer.ships.length !== 0
    ? true
    : false;
}

function handlerSwitch() {
  if (anyShipsLeft() === true) {
    playerSwitch();
    popUp(
      shipPlacingHandler,
      currentPlayer._playerName + "'s turn to place ships"
    );
  } else if (anyShipsLeft() === false) {
    playerSwitch();
    popUp(
      battleHandler,
      "Battle begins",
      currentPlayer._playerName + "'s turn to attack"
    );
  }
}

function playerSwitch() {
  const temp = currentPlayer;
  currentPlayer = defendingPlayer;
  defendingPlayer = temp;
}

function battleHandler() {
  updateDisplays4Battle(currentPlayer, defendingPlayer);
  turnInfo.textContent = currentPlayer._playerName;
  addEventFnToCell(battleEvent);
}

function battleEvent(thisCell, coordinates) {
  const thisBattle = battle(currentPlayer, defendingPlayer, coordinates);
  if (thisBattle !== "void" && !thisBattle.includes("GAME OVER!")) {
    switchBoards(thisBattle);
  } else if (thisBattle !== "void" && thisBattle.includes("GAME OVER!")) {
    popUp(
      placeHolder,
      defendingPlayer._playerName + "'s " + thisBattle,
      currentPlayer._playerName + " wins"
    );
  }
}

function switchBoards(battle) {
  playerSwitch();
  popUp(battleHandler, battle, currentPlayer._playerName + "'s turn to attack");
}

function placeHolder() {
  location.reload();
}
