const cap = require("./cap");

test("first cap", () => {
  expect(cap("zany")).toMatch(/^[A-Z][a-z]*$/);
});
