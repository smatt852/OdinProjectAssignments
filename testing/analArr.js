const analyzeArray = function (c) {
  const sum = c.reduce((a, b) => a + b, 0);
  const average = sum / c.length;
  const min = Math.min(...c);
  const max = Math.max(...c);
  const length = c.length;
  return { average, min, max, length };
};

module.exports = analyzeArray;
