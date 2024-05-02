import Ship from "./mod1_shipClass";

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
