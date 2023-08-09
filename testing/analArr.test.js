const aa = require("./analArr");

test("object assignment", () => {
  expect(aa([1, 2, 3, 4, 5])).toEqual({
    average: 3,
    min: 1,
    max: 5,
    length: 5,
  });
});
