// the shortest path a knight can travel between two squares
// I got the basic idea to use a queue from etom on the Odin Project website

// each node is the knights path
class Node {
  constructor(soFar, next) {
    this.path = soFar.concat([next]);
  }
}

function knightMoves(start, end) {
  const path = new Node([], start);
  // a queue holds the possible paths
  const q = [];
  let found = false;
  q.push(path);
  // loop as long as the end is not found and
  // there are paths in the queue
  while (q.length > 0 && found === false) {
    // take the next path off the queue
    const current = q.shift();
    // figure out possible moves
    const lastMove = current.path[current.path.length - 1];
    const nextMoves = [
      [lastMove[0] + 2, lastMove[1] + 1],
      [lastMove[0] + 2, lastMove[1] - 1],
      [lastMove[0] - 2, lastMove[1] + 1],
      [lastMove[0] - 2, lastMove[1] - 1],
      [lastMove[0] + 1, lastMove[1] + 2],
      [lastMove[0] + 1, lastMove[1] - 2],
      [lastMove[0] - 1, lastMove[1] + 2],
      [lastMove[0] - 1, lastMove[1] - 2],
    ];
    // only retain the moves that keep the knight on the board
    const validMoves = [];
    nextMoves.forEach((element) => {
      if (
        element[0] < 8 &&
        element[0] > -1 &&
        element[1] < 8 &&
        element[1] > -1
      ) {
        validMoves.push(element);
      }
    });
    // for each valid move check if the move equals the end
    // if it does return the path and stop the loop with found=true
    validMoves.forEach((element) => {
      if (arraysEqual(element, end)) {
        const temp = current.path.concat([element]);
        found = true;
        return console.log(temp);
      }
    });
    // if the end is not found, make a new node for each valid move
    // where the path is the current path plus the valid move
    for (let i = 0; i < validMoves.length; i++) {
      const temp = new Node(current.path, validMoves[i]);
      // push the new paths into the queue
      q.push(temp);
    }
  }
}
// returns true if two arrays are identical
function arraysEqual(a, b) {
  a = Array.isArray(a) ? a : [];
  b = Array.isArray(b) ? b : [];
  return a.length === b.length && a.every((el, ix) => el === b[ix]);
}

knightMoves([0, 0], [5, 2]);
knightMoves([0, 0], [7, 7]);
