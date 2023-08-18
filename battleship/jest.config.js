const { defaults } = require("jest-config");

const config = {
  verbose: true,
  setupFiles: [...defaults.setupFiles, "./dom.js"],
};

module.exports = {
  config,
  setupFiles: ["./dom.js"],
};
