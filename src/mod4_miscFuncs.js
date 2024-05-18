import Player from "./mod3_playerClass";

function rngArray() {
  let x = Math.round(Math.random() * 10);
  let y = Math.round(Math.random() * 10);
  return [x, y];
}

function rngNum() {
  return Math.round(Math.random());
}

function battle(attacker, defender, coordinates) {
  const attack = defender._game.receiveAttack(coordinates);
  if (attack !== "void") {
    return attack;
  } else if (attack === "void") {
    return "void";
  }
}

export { rngArray, rngNum, battle };
