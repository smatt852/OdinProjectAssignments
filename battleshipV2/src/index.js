/* eslint-disable prefer-const */
/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
/* eslint-disable quotes */

import "./style.css";

let shots = [];
let fleet = [];
let ships = [];
let type = "";
let size = 0;

class Gameboard {
  constructor(width, sqAcross, sqSize, titl) {
    this.width = width;
    this.sqAcross = sqAcross;
    this.sqSize = sqSize;
    const board = document.createElement("div");
    board.id = "board";
    const squares = this.sqAcross;
    board.style.width = this.width;
    const squareSize = this.sqSize;
    for (let row = 0; row < squares; row++) {
      for (let col = 0; col < squares; col++) {
        const square = document.createElement("button");
        square.className = "square";
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        square.id = `${col}, ${squares - 1 - row}`;
        // dynamic variable names for the squareClicks
        square.onclick = function () {
          window["sq" + square.id] = new SquareClick(square.id, type);
        };
        board.appendChild(square);
      }
    }
    this.makeTitle(titl);
    document.body.appendChild(board);
  }

  makeTitle(titl) {
    const title = document.createElement("div");
    title.id = "title";
    title.textContent = titl;
    title.style.width = this.width;
    document.body.appendChild(title);
  }

  makeInstructions(instruct) {
    const instr = document.createElement("div");
    instr.id = "instructions";
    instr.innerHTML = instruct;
    document.body.appendChild(instr);
  }

  makeBtns() {
    const btna = document.createElement("button");
    btna.textContent = "A = 2";
    btna.classList.add("controls");
    btna.onclick = () => {
      type = "A";
      size = 2;
      removeType("A");
      this.refreshShips();
    };
    const btnb = document.createElement("button");
    btnb.textContent = "B = 3";
    btnb.classList.add("controls");
    btnb.onclick = () => {
      type = "B";
      size = 3;
      removeType("B");
      this.refreshShips();
    };
    const btnc = document.createElement("button");
    btnc.textContent = "C = 3";
    btnc.classList.add("controls");
    btnc.onclick = () => {
      type = "C";
      size = 3;
      removeType("C");
      this.refreshShips();
    };
    const btnd = document.createElement("button");
    btnd.textContent = "D = 4";
    btnd.classList.add("controls");
    btnd.onclick = () => {
      type = "D";
      size = 4;
      removeType("D");
      this.refreshShips();
    };
    const btne = document.createElement("button");
    btne.textContent = "E = 5";
    btne.classList.add("controls");
    btne.onclick = () => {
      type = "E";
      size = 5;
      removeType("E");
      this.refreshShips();
    };
    const btnBuild = document.createElement("button");
    btnBuild.textContent = "Build Ship";
    btnBuild.classList.add("controls");
    btnBuild.onclick = () => {
      let newShip = new Ship(type, size);
      fleet.push(newShip);
    };
    const btnAttack = document.createElement("button");
    btnAttack.textContent = "Attack";
    btnAttack.classList.add("controls");
    btnAttack.onclick = () => {
      type = "shot";
    };
    const btnReset = document.createElement("button");
    btnReset.textContent = "Reset";
    btnReset.classList.add("controls");
    btnReset.onclick = () => {
      window.location.reload();
    };
    const btnPassDevice = document.createElement("button");
    btnPassDevice.textContent = "Switch Players";
    btnPassDevice.classList.add("controls");
    btnPassDevice.onclick = () => {
      const sq = document.getElementsByClassName("square");
      Array.from(sq).forEach((el) => {
        el.textContent = "";
        el.classList.remove("A");
        el.classList.remove("B");
        el.classList.remove("C");
        el.classList.remove("D");
        el.classList.remove("E");
      });
    };
    const btnBlank = document.createElement("button");
    btnBlank.classList.add("controls");
    const btns = document.createElement("div");
    btns.id = "btns";
    btns.style.width = "400px";
    btns.appendChild(btna);
    btns.appendChild(btnb);
    btns.appendChild(btnc);
    btns.appendChild(btnd);
    btns.appendChild(btne);
    btns.appendChild(btnBuild);
    btns.appendChild(btnAttack);
    btns.appendChild(btnPassDevice);
    btns.appendChild(btnReset);
    btns.appendChild(btnBlank);
    document.body.appendChild(btns);
  }

  refreshShips() {
    // reset the board
    const sq = document.getElementsByClassName("square");
    Array.from(sq).forEach((el) => {
      el.textContent = "";
      el.classList.remove("A");
      el.classList.remove("B");
      el.classList.remove("C");
      el.classList.remove("D");
      el.classList.remove("E");
    });
    // put the ships on the board
    for (let i = 0; i < fleet.length; i++) {
      for (let j = 0; j < fleet[i].spots.length; j++) {
        const sq = document.getElementById(
          `${fleet[i].spots[j].x}, ${fleet[i].spots[j].y}`
        );
        sq.classList.add(fleet[i].type);
        sq.textContent = fleet[i].type;
      }
    }
  }
}

// when a square is clicked
class SquareClick {
  constructor(id, type) {
    this.coord = id;
    this.type = type;
    const shotTaken = document.getElementById(this.coord);

    // if the click is a shot change the class
    // and save it to an array
    if (this.type === "shot") {
      shotTaken.classList.remove("A");
      shotTaken.classList.remove("B");
      shotTaken.classList.remove("C");
      shotTaken.classList.remove("D");
      shotTaken.classList.remove("E");
      shotTaken.classList.add(this.type);
      shots.push(this.coord);

      // check if the shot is a hit
      const shotx = parseFloat(this.coord.charAt(0));
      const shoty = parseFloat(this.coord.charAt(3));
      for (let i = 0; i < fleet.length; i++) {
        for (let j = 0; j < fleet[i].spots.length; j++) {
          if (fleet[i].spots[j].x === shotx) {
            if (fleet[i].spots[j].y === shoty) {
              fleet[i].spots[j].hit = true;
              shotTaken.classList.remove("shot");
              shotTaken.classList.add("hit");
              shotTaken.textContent = fleet[i].type;
            }
          }
        }
      }

      // check if the fleet is sunk

      let sunk = 0;
      for (let i = 0; i < fleet.length; i++) {
        let hits = 0;
        for (let j = 0; j < fleet[i].spots.length; j++) {
          if (fleet[i].spots[j].hit === true) {
            hits++;
          }
        }
        if (hits === fleet[i].size) {
          sunk++;
        }
      }
      if (sunk === fleet.length) {
        alert("Fleet is sunk");
        const temp3 = document.getElementsByClassName("square");
        for (let z = 0; z < temp3.length; z++) {
          temp3[z].disabled = true;
        }
      }

      // if the click is not a shot just change the class
      // and add the type as textContent
    } else {
      shotTaken.classList.add(this.type);
      shotTaken.textContent = this.type;
    }
  }
}

class Ship {
  constructor(type, size) {
    this.type = type;
    this.size = size;
    this.spots = [];

    // put the ids of all the squares of the type into the ships coordinates
    const temp = document.getElementsByClassName(this.type);
    Array.from(temp).forEach((el) => {
      const newx = parseFloat(el.id.charAt(0));
      const newy = parseFloat(el.id.charAt(3));
      this.spots.push({ x: newx, y: newy, hit: false });
    });
    // make sure there is the right number of spots per ship
    this.spots = this.spots.slice(-size);
    if (this.spots.length !== size) {
      alert("Check that you have selected the correct number of squares");
    }
    this.validateSpots();
  }

  validateSpots() {
    // check that the spots selected for the ships are
    // next to each other in a row or column
    let valid = false;
    const allEqual = (arr) => arr.every((v) => v === arr[0]);
    if (this.type === "A") {
      // if the x coordinates are equal check that the y coordinates
      // are within in 1 of each other
      if (this.spots[0].x === this.spots[1].x) {
        if (
          this.spots[0].y === this.spots[1].y + 1 ||
          this.spots[0].y === this.spots[1].y - 1
        ) {
          valid = true;
        } else {
          valid = false;
        }
        // if the y coordinates are equal check that the x coordinates
        // are within in 1 of each other
      } else if (this.spots[0].y === this.spots[1].y) {
        if (
          this.spots[0].x === this.spots[1].x + 1 ||
          this.spots[0].x === this.spots[1].x - 1
        ) {
          valid = true;
        } else {
          valid = false;
        }
      }
    }
    // and so on for each ship this.type...
    if (this.type === "B" || this.type === "C") {
      const s = sortSpots(this.spots, type);
      if (allEqual(s.sortedx)) {
        if (
          s.sortedy[0] === s.sortedy[2] + 2 ||
          s.sortedy[0] === s.sortedy[2] - 2
        ) {
          valid = true;
        }
      } else if (allEqual(s.sortedy)) {
        if (
          s.sortedx[0] === s.sortedx[2] + 2 ||
          s.sortedx[0] === s.sortedx[2] - 2
        ) {
          valid = true;
        }
      } else {
        valid = false;
      }
    }

    if (this.type === "D") {
      const s = sortSpots(this.spots, type);
      if (allEqual(s.sortedx)) {
        if (
          s.sortedy[0] === s.sortedy[3] + 3 ||
          s.sortedy[0] === s.sortedy[3] - 3
        ) {
          valid = true;
        }
      } else if (allEqual(s.sortedy)) {
        if (
          s.sortedx[0] === s.sortedx[3] + 3 ||
          s.sortedx[0] === s.sortedx[3] - 3
        ) {
          valid = true;
        }
      } else {
        valid = false;
      }
    }

    if (this.type === "E") {
      const s = sortSpots(this.spots, type);
      if (allEqual(s.sortedx)) {
        if (
          s.sortedy[0] === s.sortedy[4] + 4 ||
          s.sortedy[0] === s.sortedy[4] - 4
        ) {
          valid = true;
        }
      } else if (allEqual(s.sortedy)) {
        if (
          s.sortedx[0] === s.sortedx[4] + 4 ||
          s.sortedx[0] === s.sortedx[4] - 4
        ) {
          valid = true;
        }
      } else {
        valid = false;
      }
    }
    // send error message if selected squares are not valid
    if (valid === false) {
      alert(
        "Select squares next to each other, in either rows or columns. Try again"
      );
    }
  }
}

// removes ships of a certain type from the fleet
function removeType(kind) {
  const itemToRemoveIndex = fleet.findIndex(function (item) {
    return item.type === kind;
  });
  if (itemToRemoveIndex !== -1) {
    fleet.splice(itemToRemoveIndex, 1);
  }
}

// sorts the x and y coordinates in an array,
// called by ship.validateSpots()
function sortSpots(arr, type) {
  let tempx = [];
  let tempy = [];
  for (let i = 0; i < arr.length; i++) {
    tempx[i] = arr[i].x;
    tempy[i] = arr[i].y;
  }
  tempx = tempx.sort(function (a, b) {
    return b - a;
  });
  tempy = tempy.sort(function (a, b) {
    return b - a;
  });
  return { sortedx: tempx, sortedy: tempy };
}

const bsBoard = new Gameboard("400px", 10, 40, "Battleship");
const instructBlurb =
  "How To Play... <br><br> Click a letter.  Select squares next to each other in rows or columns.  Click Build Ship.  To delete a ship, press its letter again, and rebuild it.  When all ships are built, click Switch Players.  Press Attack and select squares to sink the fleet. Press Reset to play again.";
bsBoard.makeInstructions(instructBlurb);
bsBoard.makeBtns();
