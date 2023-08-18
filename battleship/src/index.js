import "./style.css";

// function checkForArray(arr, farr) {
//   if (JSON.stringify(arr).includes(JSON.stringify(farr))) return true;
//   return false;
// }

// function ship(type, spots) {
//   return {
//     type,
//     spots,
//     hits: function (shots) {
//       let hits = 0;
//       for (let i = 0; i < this.length; i++) {
//         if (shots.includes(this.spots[i])) {
//           hits++;
//         }
//       }
//       return hits;
//     },
//     isSunk: function (shots) {
//       if (this.hits(shots) === this.spots.length) {
//         alert(`${this.type} is sunk!`);
//         return true;
//       } else {
//         return false;
//       }
//     },
//   };
// }

const fleet = {
  shipA: [{ x: 0, y: 0, hit: false }],
  shipB: [{ x: 0, y: 0, hit: false }],
  shipC: [{ x: 0, y: 0, hit: false }],
  shipD: [{ x: 0, y: 0, hit: false }],
  shipE: [{ x: 0, y: 0, hit: false }],
};

const shots = [];
let type = "";
let num = 0;

function gameboard() {
  return {
    shots,

    makeBtns: function () {
      const btna = document.createElement("button");
      btna.textContent = "A";
      btna.onclick = () => {
        type = "A";
        num = 2;
      };
      const btnb = document.createElement("button");
      btnb.textContent = "B";
      btnb.onclick = () => {
        type = "B";
        num = 3;
      };
      const btnc = document.createElement("button");
      btnc.textContent = "C";
      btnc.onclick = () => {
        type = "C";
        num = 3;
      };
      const btnd = document.createElement("button");
      btnd.textContent = "D";
      btnd.onclick = () => {
        type = "D";
        num = 4;
      };
      const btne = document.createElement("button");
      btne.textContent = "E";
      btne.onclick = () => {
        type = "E";
        num = 5;
      };
      const btnBuild = document.createElement("button");
      btnBuild.textContent = "Build Ship";
      btnBuild.onclick = () => {
        build(type, num);
      };
      const btnAttack = document.createElement("button");
      btnAttack.textContent = "Attack";
      btnAttack.onclick = () => {
        type = "shots";
      };

      const board = document.getElementById("board");
      board.appendChild(btna);
      board.appendChild(btnb);
      board.appendChild(btnc);
      board.appendChild(btnd);
      board.appendChild(btne);
      board.appendChild(btnBuild);
      board.appendChild(btnAttack);
    },

    makeBoard: function () {
      const board = document.createElement("div");
      board.id = "board";
      const squares = 8;
      board.style.width = "400px";
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
            coordinates(square.id, type);
          };
          // square.addEventListener("mouseover", function () {
          //   return (this.style.border = "7px solid rgb(248, 206, 67)");
          // });
          // square.addEventListener("mouseout", function () {
          //   return (this.style.border = "1px solid black");
          // });
          board.appendChild(square);
        }
      }
      document.body.appendChild(board);
    },
  };
}

function coordinates(id, type) {
  const shotTaken = document.getElementById(id);
  if (type !== "shots") {
    shotTaken.classList.add(type);
    shotTaken.textContent = type;
  } else if (type === "shots") {
    shotTaken.classList.remove("spots");
    shotTaken.classList.add("shots");
    shots.push(shotTaken.id);
  }
}

function build(type, num) {
  const slots = [];
  const temp = document.getElementsByClassName(type);
  for (let i = 0; i < temp.length; i++) {
    slots.push(temp[i].id);
  }
  for (let j = 0; j < slots.length; j++) {
    const newx = parseFloat(slots[j].charAt(0));
    const newy = parseFloat(slots[j].charAt(3));
    if (type === "A") {
      fleet.shipA.push({ x: newx, y: newy, hit: false });
    } else if (type === "B") {
      fleet.shipB.push({ x: newx, y: newy, hit: false });
    } else if (type === "C") {
      fleet.shipC.push({ x: newx, y: newy, hit: false });
    } else if (type === "D") {
      fleet.shipD.push({ x: newx, y: newy, hit: false });
    } else if (type === "E") {
      fleet.shipE.push({ x: newx, y: newy, hit: false });
    }
  }
  if (type === "A") {
    fleet.shipA = fleet.shipA.slice(-num);
    if (fleet.shipA.length !== num) {
      alert(`Ship A must occupy ${num} continuous squares`);
    }
    console.log(fleet.shipA);
  }

  if (type === "B") {
    fleet.shipB = fleet.shipB.slice(-num);
    if (fleet.shipB.length !== num) {
      alert(`Ship B must occupy ${num} continuous squares`);
    }
    console.log(fleet.shipB);
  }

  if (type === "C") {
    fleet.shipC = fleet.shipC.slice(-num);
    if (fleet.shipC.length !== num) {
      alert(`Ship C must occupy ${num} continuous squares`);
    }
    console.log(fleet.shipC);
  }

  if (type === "D") {
    fleet.shipD = fleet.shipD.slice(-num);
    if (fleet.shipD.length !== num) {
      alert(`Ship D must occupy ${num} continuous squares`);
    }
    console.log(fleet.shipD);
  }

  if (type === "E") {
    fleet.shipE = fleet.shipE.slice(-num);
    if (fleet.shipE.length !== num) {
      alert(`Ship E must occupy ${num} continuous squares`);
    }
    console.log(fleet.shipE);
  }
}

//           for (let j = 0; j < slots.length; j++) {
//             const sq = document.getElementById(slots[j]);
//             sq.textContent = "";
//             sq.classList.remove("spots");
//           }
//           alert("Select the correct number of squares for each ship type");
//         }
//       };
// }

gameboard().makeBoard();
gameboard().makeBtns();
