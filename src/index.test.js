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

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////// Gameboard testing ///////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

describe("Creating gameboard, and testing interactions with Ship class", () => {
  const testBoard = new Gameboard();
  const carrier = new Ship("Carrier", 5);
  testBoard.placeShip(carrier, [0, 0], "horizontal");
  testBoard.placeShip(carrier, [1, 0], "vertical");
  const battleship = new Ship("Battleship", 4);

  //////////////////////////////////////////////

  test.only("placing ship on board with respects to its length, horizontally", () => {
    expect(testBoard.gameBoard[0][0]).toContain("Carrier");
    expect(testBoard.gameBoard[0][1]).toContain("Carrier");
    expect(testBoard.gameBoard[0][2]).toContain("Carrier");
    expect(testBoard.gameBoard[0][3]).toContain("Carrier");
    expect(testBoard.gameBoard[0][4]).toContain("Carrier");
    expect(testBoard.gameBoard[0][5]).not.toContain("Carrier");
  });

  ///////////////////////////////////////////////

  test.only("placing ship on board with respects to its length, vertically", () => {
    expect(testBoard.gameBoard[1][1]).not.toContain("Carrier");
    expect(testBoard.gameBoard[2][0]).toContain("Carrier");
    expect(testBoard.gameBoard[3][0]).toContain("Carrier");
    expect(testBoard.gameBoard[4][0]).toContain("Carrier");
    expect(testBoard.gameBoard[5][0]).toContain("Carrier");
    expect(testBoard.gameBoard[6][0]).not.toContain("Carrier");
  });

  ////////////////////////////////////////////////

  test.only("will the ship fit", () => {
    expect(() => {
      testBoard.placeShip(carrier, [0, 6], "horizontal");
    }).toThrow("Ship doesn't fit");
    expect(() => {
      testBoard.placeShip(carrier, [6, 0], "vertical");
    }).toThrow("Ship doesn't fit");
  });

  //////////////////////////////////////////////////

  test.only("preventing overlaps. horizontally", () => {
    expect(testBoard.returnArray(testBoard.gameBoard[0])).toEqual(
      expect.arrayContaining([
        "Carrier",
        "Carrier",
        "Carrier",
        "Carrier",
        "Carrier",
        0,
        0,
        0,
        0,
        0,
      ])
    );

    expect(
      testBoard.checkForOverlap(testBoard.gameBoard[0], 5, carrier.length)
    ).toBeFalsy();

    expect(
      testBoard.checkForOverlap(testBoard.gameBoard[0], 3, battleship.length)
    ).toBeTruthy();

    expect(() => {
      testBoard.placeShip(carrier, [0, 0], "horizontal");
    }).toThrow("Ships can't overlap");

    expect(() => {
      testBoard.placeShip(battleship, [0, 6], "horizontal");
    }).not.toThrow("Ship doesn't fit");

    expect(testBoard.returnArray(testBoard.gameBoard[0])).toEqual(
      expect.arrayContaining([
        "Carrier",
        "Carrier",
        "Carrier",
        "Carrier",
        "Carrier",
        0,
        "Battleship",
        "Battleship",
        "Battleship",
        "Battleship",
      ])
    );
  });

  ////////////////////////////////////////////////////////////////

  test.only("preventing overlaps, vertically", () => {
    expect(testBoard.returnArrayVert(testBoard.gameBoard, 0)).toEqual(
      expect.arrayContaining([
        "Carrier",
        "Carrier",
        "Carrier",
        "Carrier",
        "Carrier",
        "Carrier",
        0,
        0,
        0,
        0,
      ])
    );

    expect(
      testBoard.checkForOverlapVertically(
        testBoard.gameBoard,
        [3, 0],
        carrier.length
      )
    ).toBeTruthy();

    expect(
      testBoard.checkForOverlapVertically(
        testBoard.gameBoard,
        [6, 0],
        battleship.length
      )
    ).toBeFalsy();

    expect(() => {
      testBoard.placeShip(battleship, [0, 0], "vertical");
    }).toThrow("Ships can't overlap");

    expect(() => {
      testBoard.placeShip(battleship, [1, 1], "vertical");
    }).not.toThrow("Ships can't overlap");

    expect(testBoard.returnArrayVert(testBoard.gameBoard, 1)).toEqual(
      expect.arrayContaining([
        "Carrier",
        "Battleship",
        "Battleship",
        "Battleship",
        "Battleship",
        0,
        0,
        0,
        0,
        0,
      ])
    );
  });

  /////////////////////////////////////////////////////////////////

  test.only("hit or miss", () => {
    expect(testBoard.receiveAttack([0, 0])).toBe("hit");
    expect(testBoard.receiveAttack([9, 9])).toBe("miss");

    expect(testBoard.returnArray(testBoard.gameBoard[0])).toEqual(
      expect.arrayContaining([
        "Carrier",
        "Carrier",
        "Carrier",
        "Carrier",
        "Carrier",
        0,
        "Battleship",
        "Battleship",
        "Battleship",
        "Battleship",
      ])
    );
  });
  test("whether or not all ships have been sunk", () => {});
  test("gameflow: board generates ships at an appropriate time", () => {});
});
////////////////////////////////////////////////////////////////////
/////////////////////  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
