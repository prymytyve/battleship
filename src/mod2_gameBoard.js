import Ship from "./mod1_shipClass";

const boardCreate = () => {
  const matrix = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push(0);
    }
    matrix.push(row);
  }
  return matrix;
};

export default class Gameboard {
  constructor() {
    this.gameBoard = boardCreate();
  }

  placeShip = (shipObj, [i, j], orientation) => {
    if (orientation === "horizontal") {
      if (shipObj.length - 1 + j > 9) throw new Error("Invalid");
      for (let n = 0; n < shipObj.length; n++) {
        this.gameBoard[i][j + n] = shipObj.shipName;
      }
    } else if ((orientation = "vertical")) {
      if (shipObj.length - 1 + i > 9) throw new Error("Invalid");
      for (let n = 0; n < shipObj.length; n++) {
        this.gameBoard[i + n][j] = shipObj.shipName;
      }
    }
  };
}
// if(shipObj.length)
//gotta check spots before placement
