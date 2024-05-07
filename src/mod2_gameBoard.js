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

  returnArray = (board) => {
    return board;
  };

  returnArrayVert = (board, j) => {
    let checkThese = [];
    for (let n = 0; n < 10; n++) {
      checkThese.push(board[n][j]);
    }
    return checkThese;
  };

  checkForOverlap = (board, start, shipLength) => {
    const isNotEmpty = (val) => val !== 0;
    const end = start + shipLength;
    let checkThese = board.slice(start, end);
    return checkThese.some(isNotEmpty);
  };

  checkForOverlapVertically = (board, [i, j], shipLength) => {
    const isNotEmpty = (val) => val !== 0;
    let checkThese = [];
    for (let n = 0; n < shipLength; n++) {
      checkThese.push(board[i + n][j]);
    }
    return checkThese.some(isNotEmpty);
  };

  placeShip = (shipObj, [i, j], orientation) => {
    if (orientation === "horizontal") {
      if (shipObj.length - 1 + j > 9) throw new Error("Ship doesn't fit");
      if (this.checkForOverlap(this.gameBoard[i], j, shipObj.length) === true)
        throw new Error("Ships can't overlap");
      for (let n = 0; n < shipObj.length; n++) {
        this.gameBoard[i][j + n] = shipObj;
      }
    } else if ((orientation = "vertical")) {
      if (shipObj.length - 1 + i > 9) throw new Error("Ship doesn't fit");
      if (
        this.checkForOverlapVertically(
          this.gameBoard,
          [i, j],
          shipObj.length
        ) === true
      )
        throw new Error("Ships can't overlap");
      for (let n = 0; n < shipObj.length; n++) {
        this.gameBoard[i + n][j] = shipObj;
      }
    }
  };

  receiveAttack = ([x, y]) => {
    if (typeof this.gameBoard[x][y] === "object") {
      let text = this.gameBoard[x][y].shipName + " has been hit";
      this.gameBoard[x][y].hit();
      this.gameBoard[x][y] = "X";
      return text;
    } else if (this.gameBoard[x][y] === 0) {
      this.gameBoard[x][y] = "M";
      return "miss";
    } else if (this.gameBoard[x][y] === "X" || this.gameBoard[x][y] === "M") {
      return "void";
    }
  };
}
