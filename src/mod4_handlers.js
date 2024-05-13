import Ship from "./mod1_shipClass";

const shipHandler = () => {
  const carrier = new Ship("carrier", 5);
  const battleship = new Ship("battleship", 4);
  const cruiser = new Ship("cruiser", 3);
  const submarine = new Ship("submarine", 2);
  const destroyer = new Ship("destroyer", 2);
  return [carrier, battleship, cruiser, submarine, destroyer];
};

export { shipHandler };
