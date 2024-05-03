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
    this._gameBoard = boardCreate();
  }
}
