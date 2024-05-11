import Ship from "./mod1_shipClass";
import Gameboard from "./mod2_gameBoard";

export default class Player {
  constructor(playerName) {
    this._playerName = playerName;
    this._game = new Gameboard();
  }
}
