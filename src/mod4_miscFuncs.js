import Ship from "./mod1_shipClass";

function rngArray() {
  let x = Math.round(Math.random() * 10);
  let y = Math.round(Math.random() * 10);
  return [x, y];
}

function rngNum() {
  return Math.round(Math.random());
}

export { rngArray, rngNum };
