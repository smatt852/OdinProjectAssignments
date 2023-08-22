import "./style.css";

const fleet = {
  A: [],
  B: [],
  C: [],
  D: [],
  E: [],
};

const shots = [];
let type = "";
let num = 0;

// make a board of buttons
function gameboard() {
  return {
    makeTitle: function () {
      const title = document.createElement("div");
      title.id = "title";
      title.textContent = "Battleship";
      title.style.width = "400px";
      document.body.appendChild(title);
    },
    makeInstructions: function () {
      const instr = document.createElement("div");
      instr.id = "instructions";
      instr.innerHTML =
        "How To Play... <br><br> Click a letter.  Select squares.  To change your selection, press the letter again.  Click Build Ship.  When all ships are built, click Switch Players.  Press Attack and select squares. Press Reset to play again.";
      document.body.appendChild(instr);
    },

    makeBoard: function () {
      const board = document.createElement("div");
      board.id = "board";
      const squares = 10;
      board.style.width = "400px";
      const squareSize = 40;
      for (let row = 0; row < squares; row++) {
        for (let col = 0; col < squares; col++) {
          const square = document.createElement("button");
          square.className = "square";
          square.style.width = `${squareSize}px`;
          square.style.height = `${squareSize}px`;
          square.id = `${col}, ${squares - 1 - row}`;
          square.onclick = function () {
            shotOrNot(square.id, type);
          };
          board.appendChild(square);
        }
      }
      document.body.appendChild(board);
    },

    // make buttons to build ships and attack and reset
    makeBtns: function () {
      const btna = document.createElement("button");
      btna.textContent = "A = 2";
      btna.classList.add("controls");
      btna.onclick = () => {
        type = "A";
        num = 2;
        fleet.A = [];
        refreshBoard();
      };
      const btnb = document.createElement("button");
      btnb.textContent = "B = 3";
      btnb.classList.add("controls");
      btnb.onclick = () => {
        type = "B";
        num = 3;
        fleet.B = [];
        refreshBoard();
      };
      const btnc = document.createElement("button");
      btnc.textContent = "C = 3";
      btnc.classList.add("controls");
      btnc.onclick = () => {
        type = "C";
        num = 3;
        fleet.C = [];
        refreshBoard();
      };
      const btnd = document.createElement("button");
      btnd.textContent = "D = 4";
      btnd.classList.add("controls");
      btnd.onclick = () => {
        type = "D";
        num = 4;
        fleet.D = [];
        refreshBoard();
      };
      const btne = document.createElement("button");
      btne.textContent = "E = 5";
      btne.classList.add("controls");
      btne.onclick = () => {
        type = "E";
        num = 5;
        fleet.E = [];
        refreshBoard();
      };
      const btnBuild = document.createElement("button");
      btnBuild.textContent = "Build Ship";
      btnBuild.classList.add("controls");
      btnBuild.onclick = () => {
        build(type, num);
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
    },
  };
}

// when a square is clicked, if it is a shot,
// change the class and save the id to shots array,
// otherwise just change the class
function shotOrNot(id, type) {
  const shotTaken = document.getElementById(id);
  if (type === "shot") {
    shotTaken.classList.remove("A");
    shotTaken.classList.remove("B");
    shotTaken.classList.remove("C");
    shotTaken.classList.remove("D");
    shotTaken.classList.remove("E");
    shotTaken.classList.add(type);
    shots.push(shotTaken.id);
    hits(shotTaken.id);
  } else {
    shotTaken.classList.add(type);
    shotTaken.textContent = type;
  }
}

// build a ship
function build(type, num) {
  const slots = [];
  // put the ids of all the squares of the type in an array
  const temp = document.getElementsByClassName(type);
  for (let i = 0; i < temp.length; i++) {
    slots.push(temp[i].id);
  }
  // put the ids into the ships coordinates
  for (let j = 0; j < slots.length; j++) {
    const newx = parseFloat(slots[j].charAt(0));
    const newy = parseFloat(slots[j].charAt(3));
    if (type === "A") {
      fleet.A.push({ x: newx, y: newy, hit: false });
    } else if (type === "B") {
      fleet.B.push({ x: newx, y: newy, hit: false });
    } else if (type === "C") {
      fleet.C.push({ x: newx, y: newy, hit: false });
    } else if (type === "D") {
      fleet.D.push({ x: newx, y: newy, hit: false });
    } else if (type === "E") {
      fleet.E.push({ x: newx, y: newy, hit: false });
    }
  }
  // make sure there is the right number of spots per ship
  if (type === "A") {
    fleet.A = fleet.A.slice(-num);
    if (fleet.A.length !== num) {
      alert(`Ship A must occupy ${num} squares`);
    }
  }
  if (type === "B") {
    fleet.B = fleet.B.slice(-num);
    if (fleet.B.length !== num) {
      alert(`Ship B must occupy ${num} squares`);
    }
  }
  if (type === "C") {
    fleet.C = fleet.C.slice(-num);
    if (fleet.C.length !== num) {
      alert(`Ship C must occupy ${num} squares`);
    }
  }
  if (type === "D") {
    fleet.D = fleet.D.slice(-num);
    if (fleet.D.length !== num) {
      alert(`Ship D must occupy ${num} squares`);
    }
  }
  if (type === "E") {
    fleet.E = fleet.E.slice(-num);
    if (fleet.E.length !== num) {
      alert(`Ship E must occupy ${num} squares`);
    }
  }
  refreshBoard();
  validateSpots(type);
}

// sorts the x and y corrdinates in an array,
// called by validateSpots()
function sortSpots(type) {
  let tempx = [];
  let tempy = [];
  if (type === "B") {
    for (let i = 0; i < fleet.B.length; i++) {
      tempx[i] = fleet.B[i].x;
      tempy[i] = fleet.B[i].y;
    }
  }
  if (type === "C") {
    for (let i = 0; i < fleet.C.length; i++) {
      tempx[i] = fleet.C[i].x;
      tempy[i] = fleet.C[i].y;
    }
  }
  if (type === "B") {
    for (let i = 0; i < fleet.B.length; i++) {
      tempx[i] = fleet.B[i].x;
      tempy[i] = fleet.B[i].y;
    }
  }
  if (type === "D") {
    for (let i = 0; i < fleet.D.length; i++) {
      tempx[i] = fleet.D[i].x;
      tempy[i] = fleet.D[i].y;
    }
  }
  if (type === "E") {
    for (let i = 0; i < fleet.E.length; i++) {
      tempx[i] = fleet.E[i].x;
      tempy[i] = fleet.E[i].y;
    }
  }
  tempx = tempx.sort(function (a, b) {
    return b - a;
  });
  tempy = tempy.sort(function (a, b) {
    return b - a;
  });
  return { sortedx: tempx, sortedy: tempy };
}

// check that the spots selected for the ships are
// next to each other in a row or column
function validateSpots(type) {
  let valid = false;
  if (type === "A") {
    // if the x coordinates are equal check that the y coordinates
    // are within in 1 of each other
    if (fleet.A[0].x === fleet.A[1].x) {
      if (
        fleet.A[0].y === fleet.A[1].y + 1 ||
        fleet.A[0].y === fleet.A[1].y - 1
      ) {
        valid = true;
      } else {
        valid = false;
      }
      // if the y coordinates are equal check that the x coordinates
      // are within in 1 of each other
    } else if (fleet.A[0].y === fleet.A[1].y) {
      if (
        fleet.A[0].x === fleet.A[1].x + 1 ||
        fleet.A[0].x === fleet.A[1].x - 1
      ) {
        valid = true;
      } else {
        valid = false;
      }
    }
  }
  // and so on for each ship type...
  if (type === "B") {
    const s = sortSpots(type);
    console.log(s);
    const allEqual = (arr) => arr.every((v) => v === arr[0]);
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
  if (type === "C") {
    const s = sortSpots(type);
    const allEqual = (arr) => arr.every((v) => v === arr[0]);
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
  if (type === "D") {
    const s = sortSpots(type);
    const allEqual = (arr) => arr.every((v) => v === arr[0]);
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
  if (type === "E") {
    const s = sortSpots(type);
    const allEqual = (arr) => arr.every((v) => v === arr[0]);
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
    alert("Select squares next to each other, in either rows or columns.");
  }
}

function refreshBoard() {
  const tempA = [];
  const tempB = [];
  const tempC = [];
  const tempD = [];
  const tempE = [];

  // make an array of the ships coordinates
  for (let i = 0; i < fleet.A.length; i++) {
    tempA[i] = `${fleet.A[i].x}, ${fleet.A[i].y}`;
  }
  for (let i = 0; i < fleet.B.length; i++) {
    tempB[i] = `${fleet.B[i].x}, ${fleet.B[i].y}`;
  }
  for (let i = 0; i < fleet.C.length; i++) {
    tempC[i] = `${fleet.C[i].x}, ${fleet.C[i].y}`;
  }
  for (let i = 0; i < fleet.D.length; i++) {
    tempD[i] = `${fleet.D[i].x}, ${fleet.D[i].y}`;
  }
  for (let i = 0; i < fleet.E.length; i++) {
    tempE[i] = `${fleet.E[i].x}, ${fleet.E[i].y}`;
  }
  // reset the board
  const all = document.getElementsByClassName("square");
  Array.from(all).forEach((el) => {
    el.classList.remove("A");
    el.classList.remove("B");
    el.classList.remove("C");
    el.classList.remove("D");
    el.classList.remove("E");
    el.textContent = "";
  });
  // put the ships on the board
  for (let i = 0; i < tempA.length; i++) {
    const sq = document.getElementById(tempA[i]);
    sq.classList.add("A");
    sq.textContent = "A";
  }
  for (let i = 0; i < tempB.length; i++) {
    const sq = document.getElementById(tempB[i]);
    sq.classList.add("B");
    sq.textContent = "B";
  }
  for (let i = 0; i < tempC.length; i++) {
    const sq = document.getElementById(tempC[i]);
    sq.classList.add("C");
    sq.textContent = "C";
  }
  for (let i = 0; i < tempD.length; i++) {
    const sq = document.getElementById(tempD[i]);
    sq.classList.add("D");
    sq.textContent = "D";
  }
  for (let i = 0; i < tempE.length; i++) {
    const sq = document.getElementById(tempE[i]);
    sq.classList.add("E");
    sq.textContent = "E";
  }
}

// if a shot is a hit, record it in the fleet object and change the class
// of the square
function hits(coord) {
  const shotx = parseFloat(coord.charAt(0));
  const shoty = parseFloat(coord.charAt(3));
  for (const ship in fleet) {
    const spots = fleet[ship];
    for (const c of spots) {
      if (c.x === shotx && c.y === shoty) {
        c.hit = true;
        document.getElementById(coord).classList.add("hit");
        document.getElementById(coord).textContent = ship;
        checkHits();
        break;
      }
    }
  }
}

// check to see if the fleet is sunk
// if it is, disable the board squares
function checkHits() {
  for (const ship in fleet) {
    if (!fleet[ship].every((c) => c.hit)) {
      return false;
    }
  }
  alert("Fleet is sunk");
  const temp3 = document.getElementsByClassName("square");
  for (let i = 0; i < temp3.length; i++) {
    temp3[i].disabled = true;
  }
  return true;
}
gameboard().makeTitle();
gameboard().makeInstructions();
gameboard().makeBoard();
gameboard().makeBtns();
