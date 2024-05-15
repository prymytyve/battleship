import Ship from "./mod1_shipClass";
import Gameboard from "./mod2_gameBoard";
import { rngNum, rngArray } from "./mod4_miscFuncs";

export default class Player {
  constructor(playerName) {
    this._playerName = playerName;
    this._game = new Gameboard();
    this.ships = shipHandler();
  }

  get playerBoard() {
    return this._game.gameBoard;
  }

  placeShip = (coordinates, orientation = "horizontal", errorMsgOn = true) => {
    if (this.ships.length === 0) return;
    try {
      this._game.placeShip(this.ships[0], coordinates, orientation);
      this.ships.shift();
    } catch (e) {
      if (errorMsgOn) console.log(e, this.ships);
      return;
    }
  };

  shipRandomize = () => {
    while (this.ships.length > 0) {
      let coordinates = rngArray();
      let orientation = rngNum() === 0 ? "horizontal" : "vertical";
      this.placeShip(coordinates, orientation, false);
    }
  };
}

function shipHandler() {
  const carrier = new Ship("carrier", 5);
  const battleship = new Ship("battleship", 4);
  const cruiser = new Ship("cruiser", 3);
  const submarine = new Ship("submarine", 2);
  const destroyer = new Ship("destroyer", 2);
  return [carrier, battleship, cruiser, submarine, destroyer];
}

//amount & flatmap?
