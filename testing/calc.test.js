const calc = require("./calc");

test("calcs", () => {
  expect(calc.add(3, 6)).toBe(9);

  expect(calc.subtract(3, 6)).toBe(-3);

  expect(calc.multiply(3, 6)).toBe(18);

  expect(calc.divide(3, 6)).toBe(0.5);
});
