// I copied this from etom on the Odin Project website.

// returns null if the move is off the board
function validateMove(pos, path) {
  if (pos[0] < 0 || pos[0] > 7 || pos[1] < 0 || pos[1] > 7) {
    return null;
  }
  return { pos, path };
}

function knightMoves([x, y], [a, b]) {
  // q is a queue of valid moves
  const q = [validateMove([x, y], [[x, y]])];
  let currentPosition = q.shift();

  // while the current node is not the target square,
  // calculate possible moves from the current position
  while (currentPosition.pos[0] !== a || currentPosition.pos[1] !== b) {
    const moves = [
      [currentPosition.pos[0] + 2, currentPosition.pos[1] - 1],
      [currentPosition.pos[0] + 2, currentPosition.pos[1] + 1],
      [currentPosition.pos[0] - 2, currentPosition.pos[1] - 1],
      [currentPosition.pos[0] - 2, currentPosition.pos[1] + 1],
      [currentPosition.pos[0] + 1, currentPosition.pos[1] - 2],
      [currentPosition.pos[0] + 1, currentPosition.pos[1] + 2],
      [currentPosition.pos[0] - 1, currentPosition.pos[1] - 2],
      [currentPosition.pos[0] - 1, currentPosition.pos[1] + 2],
    ];
    // for each possible move, check if it is on the board
    // and add it to the path and the queue
    moves.forEach((move) => {
      const node = validateMove(move, currentPosition.path.concat([move]));
      if (node) {
        q.push(node);
      }
    });
    // move to the next position in the queue
    currentPosition = q.shift();
  }
  // output the length and path
  console.log(`${currentPosition.path.length - 1} moves:`);
  currentPosition.path.forEach((pos) => {
    console.log(pos);
  });
}
knightMoves([0, 0], [1, 1]);
knightMoves([0, 0], [7, 7]);
