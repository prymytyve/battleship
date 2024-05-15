import Ship from "./mod1_shipClass";

const shipHandler = () => {
  const carrier = new Ship("carrier", 5);
  const battleship = new Ship("battleship", 4);
  const cruiser = new Ship("cruiser", 3);
  const submarine = new Ship("submarine", 2);
  const destroyer = new Ship("destroyer", 2);
  return [carrier, battleship, cruiser, submarine, destroyer];
};

const attack = (player, coordinates) => {
  const game = player._game;
  console.log(game.receiveAttack(coordinates));
};

function rngArray() {
  let x = Math.round(Math.random() * 10);
  let y = Math.round(Math.random() * 10);
  return [x, y];
}

function rngNum() {
  return Math.round(Math.random());
}

export { shipHandler, attack, rngArray, rngNum };
