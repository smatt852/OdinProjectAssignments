const cc = require("./cipher");

test("cipher", () => {
  expect(cc("I'm beautiful!", 27)).toBe("J'n cfbvujgvm!");
});
