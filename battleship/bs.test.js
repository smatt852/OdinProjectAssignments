import { create, ship, gameboard } from "./bs.js";

test("ship", () => {
  expect(
    ship([
      [1, 1],
      [1, 2],
      [1, 3],
    ]).length
  ).toBe(3);
});

test("ship", () => {
  expect(
    ship([
      [1, 1],
      [1, 2],
      [1, 3],
    ]).isSunk([
      [3, 4],
      [1, 2],
    ])
  ).toBe(false);
});

test("ship", () => {
  expect(
    ship([
      [1, 1],
      [1, 2],
      [1, 3],
    ]).isSunk([
      [1, 1],
      [1, 2],
      [1, 3],
    ])
  ).toBe(true);
});
