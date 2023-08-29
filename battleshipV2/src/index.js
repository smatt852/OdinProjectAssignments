/* eslint-disable prefer-const */
/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
/* eslint-disable quotes */

import "./style.css";

// The game is made from 3 classes, Gameboard(), SquareClick() and Ship().
// Once the board is set up, all play results from clicking buttons
// on the DOM.

let shots = [];
let fleet = [];
let type = "";
let size = 0;

// make the board
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
        // each button has an id that serves as coordinates for the ships
        square.id = `${col}, ${squares - 1 - row}`;
        // when a square is click a new object is made that directs gameplay
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
    // when a letter button is clicked, the corresponding ship is deleted
    // and the other ships' locations are refreshed, type and size are set
    // to change the class of subsequently selected squares
    const btna = document.createElement("button");
    btna.textContent = "A = 2";
    btna.classList.add("controls");
    btna.onclick = () => {
      type = "A";
      size = 2;
      this.removeType("A");
      this.refreshShips();
    };
    const btnb = document.createElement("button");
    btnb.textContent = "B = 3";
    btnb.classList.add("controls");
    btnb.onclick = () => {
      type = "B";
      size = 3;
      this.removeType("B");
      this.refreshShips();
    };
    const btnc = document.createElement("button");
    btnc.textContent = "C = 3";
    btnc.classList.add("controls");
    btnc.onclick = () => {
      type = "C";
      size = 3;
      this.removeType("C");
      this.refreshShips();
    };
    const btnd = document.createElement("button");
    btnd.textContent = "D = 4";
    btnd.classList.add("controls");
    btnd.onclick = () => {
      type = "D";
      size = 4;
      this.removeType("D");
      this.refreshShips();
    };
    const btne = document.createElement("button");
    btne.textContent = "E = 5";
    btne.classList.add("controls");
    btne.onclick = () => {
      type = "E";
      size = 5;
      this.removeType("E");
      this.refreshShips();
    };
    // the ids of the squares selected are used to make a new ship
    const btnBuild = document.createElement("button");
    btnBuild.textContent = "Build Ship";
    btnBuild.classList.add("controls");
    btnBuild.onclick = () => {
      let newShip = new Ship(type, size);
      fleet.push(newShip);
    };
    // type is changed to shot
    const btnAttack = document.createElement("button");
    btnAttack.textContent = "Attack";
    btnAttack.classList.add("controls");
    btnAttack.onclick = () => {
      type = "shot";
    };
    // the page is refreshed to reset the game
    const btnReset = document.createElement("button");
    btnReset.textContent = "Reset";
    btnReset.classList.add("controls");
    btnReset.onclick = () => {
      window.location.reload();
    };
    // the board is blanked so the opponent can't see the ships
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
    // a blank button for nicer design
    const btnBlank = document.createElement("button");
    btnBlank.classList.add("controls");
    // the div to hold the buttons
    const btns = document.createElement("div");
    btns.id = "btns";
    btns.style.width = "400px";
    // everything is added to the board
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

  // the board is blanked and the ships are reloaded from the fleet array
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

  // removes ships of a certain type from the fleet,
  // called by the letter buttons onclick functions
  removeType(kind) {
    const itemToRemoveIndex = fleet.findIndex(function (item) {
      return item.type === kind;
    });
    if (itemToRemoveIndex !== -1) {
      fleet.splice(itemToRemoveIndex, 1);
    }
  }
}

// when a square is clicked
class SquareClick {
  constructor(id, type) {
    this.coord = id;
    this.type = type;
    this.shotTaken = document.getElementById(this.coord);
    this.shotOrNot();
  }

  shotOrNot() {
    // if the click is a shot change the class
    // and save it to an array
    if (this.type === "shot") {
      this.shotTaken.classList.remove("A");
      this.shotTaken.classList.remove("B");
      this.shotTaken.classList.remove("C");
      this.shotTaken.classList.remove("D");
      this.shotTaken.classList.remove("E");
      this.shotTaken.classList.add(this.type);
      shots.push(this.coord);
      this.hitOrNot();
      this.sunkOrNot();
      // if the click is a ship coordinate, not a shot,
      // just change the class and add the type as textContent
    } else {
      this.shotTaken.classList.add(this.type);
      this.shotTaken.textContent = this.type;
    }
  }

  // check if the shot is a hit
  hitOrNot() {
    const shotx = parseFloat(this.coord.charAt(0));
    const shoty = parseFloat(this.coord.charAt(3));
    for (let i = 0; i < fleet.length; i++) {
      for (let j = 0; j < fleet[i].spots.length; j++) {
        if (fleet[i].spots[j].x === shotx) {
          if (fleet[i].spots[j].y === shoty) {
            fleet[i].spots[j].hit = true;
            this.shotTaken.classList.remove("shot");
            this.shotTaken.classList.add("hit");
            this.shotTaken.textContent = fleet[i].type;
          }
        }
      }
    }
  }

  // check if all spots in the fleet are hit
  sunkOrNot() {
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
    // if the fleet is sunk, end the game
    if (sunk === fleet.length) {
      alert(`The fleet is sunk in ${shots.length} shots!`);
      const temp3 = document.getElementsByClassName("square");
      for (let z = 0; z < temp3.length; z++) {
        temp3[z].disabled = true;
      }
    }
  }
}

// build a ship object
class Ship {
  constructor(type, size) {
    this.type = type;
    this.size = size;
    // coordinates for the ship
    this.spots = [];

    // put the ids of all the squares of the type
    // into the ships coordinates
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

  // check if spots occur next to each other in a row or column
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
      const s = this.sortSpots(this.spots, type);
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
      const s = this.sortSpots(this.spots, type);
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
      const s = this.sortSpots(this.spots, type);
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
        "Select squares next to each other, in either rows or columns. Press the ship's letter button to try again"
      );
    }
  }

  // sorts the x and y coordinates in an array,
  // called by ship.validateSpots()
  sortSpots(arr, type) {
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
}

// game setup
let bdSquares = 10;
let bdTitle = "Battleship";
let bdSize = "400";
let bdSqSize = 40;
if (screen.width < 420) {
  bdSize = "300";
  bdSqSize = 30;
}
const bsBoard = new Gameboard(bdSize, bdSquares, bdSqSize, bdTitle);
const instructBlurb =
  "Sink the fleet in the fewest shots... <br><br> Select a letter. &nbsp;  Click on the specified number of squares, adjacent to each other in rows or columns.  &nbsp; Press 'Build Ship'. &nbsp; To delete a ship, press its letter again, and rebuild it. &nbsp; When all ships are built, click 'Switch Players' and change players. &nbsp; Press 'Attack' and select squares to sink the fleet. &nbsp; Press 'Reset' to play again.";
bsBoard.makeInstructions(instructBlurb);
bsBoard.makeBtns();
