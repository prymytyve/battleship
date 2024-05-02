export default class Ship {
  constructor(shipName, length) {
    this._shipName = shipName;
    this._length = length;
    this._numOfHits = 0;
    this._isSunk = false;
  }
  hit() {
    this._numOfHits += 1;
  }

  get shipName() {
    return this._shipName;
  }

  get length() {
    return this._length;
  }

  get numOfHits() {
    return this._numOfHits;
  }

  isSunk() {
    if (this._numOfHits >= this._length) this._isSunk = true;
    return this._isSunk;
  }
}
