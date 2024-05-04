import Ship from "./mod1_shipClass";
import Gameboard from "./mod2_gameBoard";

test("Create ship object, and test hit and sunk methods", () => {
  let carrier = new Ship("Carrier", 5);
  expect(carrier).toEqual({
    _shipName: "Carrier",
    _length: 5,
    _numOfHits: 0,
    _isSunk: false,
  });
  carrier.hit();
  expect(carrier._numOfHits).toBe(1);
  expect(carrier.isSunk()).toBeFalsy();
  carrier.hit();
  carrier.hit();
  carrier.hit();
  carrier.hit();
  expect(carrier.isSunk()).toBeTruthy();
});

describe("Creating gameboard, and testing interactions with Ship class", () => {
  const testBoard = new Gameboard();
  const carrier = new Ship("Carrier", 5);
  const coordinates = [0, 0];

  // test("placing ship on board", () => {
  //   testBoard.placeShip(carrier, coordinates);
  // });

  test("placing ship on board with respects to its length, horizontally", () => {
    expect(testBoard.gameBoard[0][0]).toContain("Carrier");
    expect(testBoard.gameBoard[0][1]).toContain("Carrier");
    expect(testBoard.gameBoard[0][2]).toContain("Carrier");
    expect(testBoard.gameBoard[0][3]).toContain("Carrier");
    expect(testBoard.gameBoard[0][4]).toContain("Carrier");
  });

  test("multiple ships", () => {});
  test("hit or miss", () => {});
  test("whether or not all ships have been sunk", () => {});
});
