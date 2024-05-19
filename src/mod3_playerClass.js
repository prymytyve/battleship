import Ship from "./mod1_shipClass";
import Gameboard from "./mod2_gameBoard";
import { rngNum, rngArray } from "./mod4_miscFuncs";

export default class Player {
  constructor(playerName) {
    this._playerName = playerName;
    this._game = new Gameboard();
    this.ships = shipHandler2();
  }

  get playerBoard() {
    return this._game.gameBoard;
  }

  placeShip = (ship, coordinates, orientation = "horizontal") => {
    try {
      this._game.placeShip(ship, coordinates, orientation);
      let spliceThis = this.ships.findIndex(
        (i) => i.shipName === ship.shipName
      );
      this.ships.splice(spliceThis, 1);
    } catch (e) {
      // return [ship.shipName, e];
      throw e.message;
    }
  };

  shipRandomize = () => {
    while (this.ships.length > 0) {
      let coordinates = rngArray();
      let orientation = rngNum() === 0 ? "horizontal" : "vertical";
      if (this.ships.length === 0) return;
      try {
        this._game.placeShip(this.ships[0], coordinates, orientation);
        this.ships.shift();
      } catch (e) {
        continue;
      }
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

function shipHandler2(amount = 1) {
  if (amount === 1) {
    return shipHandler();
  } else if (amount === 2) {
    const board = shipHandler();
    return board.flatMap((itms) => [itms, itms]);
  } else if (amount === 3) {
    const board = shipHandler();
    return board.flatMap((itms) => [itms, itms, itms]);
  }
}
