const rs = require("./rs");

test("reverse string", () => {
  expect(rs("zany")).toMatch("ynaz");
});
