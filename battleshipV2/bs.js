function checkForArray(arr, farr) {
  if (JSON.stringify(arr).includes(JSON.stringify(farr))) return true;
  return false;
}

export function ship(spots) {
  return {
    spots,
    length: spots.length,
    hits: function (shots) {
      let hits = 0;
      for (let i = 0; i < this.length; i++) {
        if (checkForArray(shots, this.spots[i])) {
          hits++;
        }
      }
      return hits;
    },
    isSunk: function (shots) {
      if (this.hits(shots) === this.length) {
        return true;
      } else {
        return false;
      }
    },
  };
}

let shots = [];
let a = [];
let b = [];
let c = [];
let d = [];
let e = [];

export function gameboard() {
  return {
    shots,
    a,
    b,
    c,
    d,
    e,
    makeBoard: function () {
      const board = document.createElement("div");
      const squares = 20;
      const boardSize = 400;
      const squareSize = boardSize / squares;
      for (let row = 0; row < squares; row++) {
        for (let col = 0; col < squares; col++) {
          const square = document.createElement("button");
          square.className = "square";
          square.style.width = `${squareSize}px`;
          square.style.height = `${squareSize}px`;
          square.id = `${col}, ${squares - 1 - row}`;
          square.onclick = function () {
            this.coordinates(square.id);
          };
          square.addEventListener("mouseover", function () {
            return (this.style.border = "7px solid rgb(248, 206, 67)");
          });
          square.addEventListener("mouseout", function () {
            return (this.style.border = "1px solid black");
          });
          board.appendChild(square);
        }
      }
    },

    coordinates: function (id, type) {
      const shot = [];
      shot[0] = parseFloat(id.charAt(0));
      shot[1] = parseFloat(id.charAt(3));
      const shotTaken = document.getElementById(id);
      if (type === shots) {
        shotTaken.style.border = "7px solid red";
      } else {
        shotTaken.style.border = "7px solid blue";
      }
      // shotTaken.addEventListener("mouseout", function () {
      //   return (this.style.border = "7px solid red");
      // });
      eval("this. " + type + " .push(shot);");
    },

    checkSpots: function() {
      if (a.length !== 2) {
        alert("Ship A must be 2 consecutive squares.");
        this.a = [];
      }
      if (b.length !== 3) {
        alert("Ship B must be 3 consecutive squares.");
        this.b = [];
      }
    if (c.length !== 3) {
      alert("Ship C must be 3 consecutive squares.");
      this.c = [];
    }
    if (d.length !== 4) {
      alert("Ship D must be 4 consecutive squares.");
      this.d = [];
    }
    if (e.length !== 5) {
      alert("Ship E must be 5 consecutive squares.");
      this.e = [];
    }
  };

}

// have a side pannel with buttons for a-e and a reset.
// when a is pushed, receive two ids side by side then disable a.
// reset enables a-e buttons and resets board.
// when selected border goes blue and letter appears in square.
// setup eligible squares by incrementing id in 4 directions
// but not off board

//   makeShips: function () {
//     const type = ["a", "b", "c", "d", "e"];
//     for (let i = 0; i < type.length; i++) {
//       const spots = document.getElementsByClassName(type[i]).id;
//       eval("let " + type[i] + " = ship(spots);");
//     }
