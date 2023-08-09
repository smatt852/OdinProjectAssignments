const caesarCipher = function (xString, shift) {
  const a = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  let shift2 = 0;
  shift2 = shift % 26;

  // take the end of the alphabet from the shift point and add the beginning onto the end of it so it wraps
  const b = a.slice(shift2);
  let i = 0;
  while (i < (26 + shift2) % 26) {
    b[(26 - shift2 + i) % 26] = a[i];
    i++;
  }

  // find the index of each letter of the string in the alphabet array and store it in an array
  xArrayLower = Array.from(xString.toLowerCase());
  j = 0;
  indices = [];
  while (j < xArrayLower.length) {
    indices[j] = a.indexOf(xArrayLower[j]);
    j++;
  }

  // if the letter was punctuation, take whatever was in the string at that point
  // otherwise return the new letter from the shifted alphabet
  xArray = Array.from(xString);
  k = 0;
  const result = [];
  while (k < indices.length) {
    if (indices[k] < 0) {
      result[k] = xArray[k];
    } else {
      result[k] = b[indices[k]];
    }
    k++;
  }

  // if the letter was uppercase in the string, make it uppercase
  m = 0;
  result2 = [];
  while (m < result.length) {
    if (xArray[m] == xArray[m].toLowerCase()) {
      result2[m] = result[m].toLowerCase();
    } else {
      result2[m] = result[m].toUpperCase();
    }
    m++;
  }
  return result2.join("");
};
module.exports = caesarCipher;
