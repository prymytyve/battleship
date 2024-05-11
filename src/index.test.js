import Ship from "./mod1_shipClass";
import Gameboard from "./mod2_gameBoard";
import Player from "./mod3_playerClass";

test("Create ship object, and test hit and sunk methods", () => {
  let carrier = new Ship("carrier", 5);
  expect(carrier).toEqual({
    _shipName: "carrier",
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
  const carrier = new Ship("carrier", 5);
  testBoard.placeShip(carrier, [0, 0], "horizontal");
  testBoard.placeShip(carrier, [1, 0], "vertical");
  const battleship = new Ship("battleship", 4);
  //////////////////////////////////////////////
  test("placing ship on board with respects to its length, horizontally", () => {
    expect(testBoard.gameBoard[0][0]).toMatchObject(carrier);
    expect(testBoard.gameBoard[0][1]).toMatchObject(carrier);
    expect(testBoard.gameBoard[0][2]).toMatchObject(carrier);
    expect(testBoard.gameBoard[0][3]).toMatchObject(carrier);
    expect(testBoard.gameBoard[0][4]).toMatchObject(carrier);
    expect(testBoard.gameBoard[0][5]).toBe(0);
  });
  ///////////////////////////////////////////////
  test("placing ship on board with respects to its length, vertically", () => {
    expect(testBoard.gameBoard[1][1]).toBe(0);
    expect(testBoard.gameBoard[2][0]).toMatchObject(carrier);
    expect(testBoard.gameBoard[3][0]).toMatchObject(carrier);
    expect(testBoard.gameBoard[4][0]).toMatchObject(carrier);
    expect(testBoard.gameBoard[5][0]).toMatchObject(carrier);
    expect(testBoard.gameBoard[6][0]).toBe(0);
  });
  ////////////////////////////////////////////////
  test("will the ship fit", () => {
    expect(() => {
      testBoard.placeShip(carrier, [0, 6], "horizontal");
    }).toThrow("ship does not fit");
    expect(() => {
      testBoard.placeShip(carrier, [6, 0], "vertical");
    }).toThrow("ship does not fit");
  });
  //////////////////////////////////////////////////
  test("preventing overlaps. horizontally", () => {
    expect(testBoard.returnArray(0)).toEqual(
      expect.arrayContaining([
        carrier,
        carrier,
        carrier,
        carrier,
        carrier,
        0,
        0,
        0,
        0,
        0,
      ])
    );

    expect(() => {
      testBoard.placeShip(carrier, [0, 0], "horizontal");
    }).toThrow("overlapping");

    expect(() => {
      testBoard.placeShip(battleship, [0, 6], "horizontal");
    }).not.toThrow("ship does not fit");

    expect(testBoard.returnArray(0)).toEqual(
      expect.arrayContaining([
        carrier,
        carrier,
        carrier,
        carrier,
        carrier,
        0,
        battleship,
        battleship,
        battleship,
        battleship,
      ])
    );
  });
  ////////////////////////////////////////////////////////////////
  test("preventing overlaps, vertically", () => {
    expect(testBoard.returnArrayVert(0)).toEqual(
      expect.arrayContaining([
        carrier,
        carrier,
        carrier,
        carrier,
        carrier,
        carrier,
        0,
        0,
        0,
        0,
      ])
    );

    expect(() => {
      testBoard.placeShip(battleship, [0, 0], "vertical");
    }).toThrow("overlapping");

    expect(() => {
      testBoard.placeShip(battleship, [1, 1], "vertical");
    }).not.toThrow("overlapping");

    expect(testBoard.returnArrayVert(1)).toEqual(
      expect.arrayContaining([
        carrier,
        battleship,
        battleship,
        battleship,
        battleship,
        0,
        0,
        0,
        0,
        0,
      ])
    );
  });
  /////////////////////////////////////////////////////////////////
  test("hit or miss", () => {
    expect(testBoard.returnArray(0)).toEqual(
      expect.arrayContaining([
        carrier,
        carrier,
        carrier,
        carrier,
        carrier,
        0,
        battleship,
        battleship,
        battleship,
        battleship,
      ])
    );

    expect(testBoard.receiveAttack([0, 0])).toMatch("carrier has been hit");
    expect(testBoard.receiveAttack([0, 5])).toBe("miss");
    expect(testBoard.receiveAttack([0, 0])).toMatch("void");

    expect(testBoard.returnArray(0)).toEqual(
      expect.arrayContaining([
        "X",
        carrier,
        carrier,
        carrier,
        carrier,
        "M",
        battleship,
        battleship,
        battleship,
        battleship,
      ])
    );

    expect(carrier.numOfHits).toEqual(1);
    testBoard.receiveAttack([0, 1]);
    testBoard.receiveAttack([0, 2]);
    testBoard.receiveAttack([0, 3]);
    expect(testBoard.receiveAttack([0, 4])).toMatch(
      "carrier has been hit. carrier has sunk"
    );

    expect(testBoard.returnArray(0)).toEqual(
      expect.arrayContaining([
        "X",
        "X",
        "X",
        "X",
        "X",
        "M", // test passes with 'X'(why?), but should only past with 'M'
        battleship,
        battleship,
        battleship,
        battleship,
      ])
    );
  });
  /////////////////////////////////////////////////////////////////
  test("whether or not all ships have been sunk", () => {
    //remaining ships: carrier [1,0] - [5,0] ; battleship [0,6] - [0,9] & [1,1] - [4,1]
    testBoard.receiveAttack([1, 0]);
    testBoard.receiveAttack([2, 0]);
    testBoard.receiveAttack([3, 0]);
    testBoard.receiveAttack([4, 0]);
    testBoard.receiveAttack([5, 0]);
    testBoard.receiveAttack([0, 6]);
    testBoard.receiveAttack([0, 7]);
    testBoard.receiveAttack([0, 8]);
    testBoard.receiveAttack([0, 9]);
    testBoard.receiveAttack([1, 1]);
    testBoard.receiveAttack([2, 1]);
    testBoard.receiveAttack([3, 1]);
    expect(testBoard.receiveAttack([4, 1])).toMatch(
      "battleship has been hit. battleship has sunk. GAME OVER!"
    );
  });
});

////////////////////////////////////////////////////////////////////
///////////////////// Testing a round //////////////////////////////
///////////////////////////////////////////////////////////////////

describe("testing one round", () => {
  const mockboard = new Gameboard();
  const carrier = new Ship("carrier", 5);
  const battleship = new Ship("battleship", 4);
  const cruiser = new Ship("cruiser", 3);
  const submarine = new Ship("submarine", 2);
  const destroyer = new Ship("destroyer", 2);

  //ship placement
  test("all ships placed", () => {
    mockboard.placeShip(carrier, [0, 5], "vertical");

    expect(() => {
      mockboard.placeShip(battleship, [3, 5], "vertical");
    }).toThrow("overlapping");

    mockboard.placeShip(battleship, [2, 0], "horizontal");

    expect(() => {
      mockboard.placeShip(cruiser, [0, 9], "horizontal");
    }).toThrow("ship does not fit");

    mockboard.placeShip(cruiser, [7, 0], "horizontal");
    mockboard.placeShip(submarine, [8, 8], "vertical");
    mockboard.placeShip(destroyer, [8, 9], "vertical");
  });

  test("destroy everything", () => {
    //annihilation
    ////carrier////
    expect(mockboard.receiveAttack([4, 5])).toMatch("carrier has been hit");
    mockboard.receiveAttack([3, 5]);
    mockboard.receiveAttack([2, 5]);
    mockboard.receiveAttack([0, 5]);
    expect(mockboard.receiveAttack([1, 5])).toMatch(
      "carrier has been hit. carrier has sunk"
    );

    ////miss/////
    expect(mockboard.receiveAttack([0, 0])).toBe("miss");

    ////void = these coordinates are no longer available////
    expect(mockboard.receiveAttack([0, 0])).toMatch("void");

    ////battleship////
    expect(mockboard.receiveAttack([2, 3])).toMatch("battleship has been hit");
    mockboard.receiveAttack([2, 0]);
    mockboard.receiveAttack([2, 1]);
    expect(mockboard.receiveAttack([2, 2])).toMatch(
      "battleship has been hit. battleship has sunk"
    );

    ////cruiser////
    expect(mockboard.receiveAttack([7, 1])).toMatch("cruiser has been hit");
    mockboard.receiveAttack([7, 2]);
    expect(mockboard.receiveAttack([7, 0])).toMatch(
      "cruiser has been hit. cruiser has sunk"
    );

    ////submarine////
    expect(mockboard.receiveAttack([8, 8])).toMatch("submarine has been hit");
    expect(mockboard.receiveAttack([9, 8])).toMatch(
      "submarine has been hit. submarine has sunk"
    );

    //destroyer & game over////
    expect(mockboard.receiveAttack([8, 9])).toMatch("destroyer has been hit");
    expect(mockboard.receiveAttack([9, 9])).toMatch(
      "destroyer has been hit. destroyer has sunk. GAME OVER!"
    );
  });
});

////////////////////////////////////////////////////////////////////
///////////////////// Testing Player class /////////////////////////
///////////////////////////////////////////////////////////////////

describe("testing Player class and interactions with Gameboard and Ship", () => {
  test("creating player object", () => {
    let player1 = new Player("John");
    expect(player1).toEqual(
      expect.objectContaining({
        _playerName: "John",
        _game: expect.anything(),
      })
    );

    const carrier2 = new Ship("carrier", 5);
    player1._game.placeShip(carrier2, [0, 0], "horizontal");
    expect(player1._game.returnArray(0)).toEqual(
      expect.arrayContaining([
        carrier2,
        carrier2,
        carrier2,
        carrier2,
        carrier2,
        0,
        0,
        0,
        0,
        0,
      ])
    );
    expect(player1._game.receiveAttack([0, 0])).toMatch("carrier has been hit");
    player1._game.receiveAttack([0, 1]);
    player1._game.receiveAttack([0, 2]);
    player1._game.receiveAttack([0, 3]);
    expect(player1._game.receiveAttack([0, 4])).toEqual(
      "carrier has been hit. carrier has sunk. GAME OVER!"
    );

    let player2 = new Player("Bob");
    expect(player2).toEqual(
      expect.objectContaining({
        _playerName: "Bob",
        _game: expect.anything(),
      })
    );
  });
});
