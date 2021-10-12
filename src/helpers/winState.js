const findXWins = ({
  fixedIndex,
  startIndex = 0,
  range,
  matchInRow,
  winCells = [],
  rowOrCol
}) => {
  // if not enough cells to make a win then return
  if (range - startIndex < matchInRow) {
    return winCells;
  }
  let cnt = 0;
  let cells = [];
  // find an x in a row/col win
  for (let i = startIndex; i < range; i++) {
    if (cnt < matchInRow) {
      if (rowOrCol === "row") {
        cells.push([fixedIndex, i]);
      } else {
        cells.push([i, fixedIndex]);
      }
    }
    cnt++;
    if (cnt === matchInRow) {
      // push a win
      winCells.push(cells);
    }
  }
  // recursively look for more wins
  return findXWins({
    fixedIndex,
    startIndex: startIndex + 1,
    range,
    matchInRow,
    winCells,
    rowOrCol
  });
};

const findWin = ({ fixedIndex, range, matchInRow, rowOrCol }) => {
  let winCells = [];
  if (matchInRow === range) {
    const cells = [];
    // fixed row index, all cells in range must match
    for (let i = 0; i < range; i++) {
      if (rowOrCol === "row") {
        cells.push([fixedIndex, i]);
      } else {
        cells.push([i, fixedIndex]);
      }
    }
    winCells.push(cells);
  } else {
    const multiWinCells = findXWins({
      fixedIndex,
      range,
      matchInRow,
      rowOrCol
    });
    winCells = [...multiWinCells];
  }
  return winCells;
};

const findWins = ({ range, matchInRow, rowOrCol }) => {
  let winCells = [];
  for (let i = 0; i < range; i++) {
    const wins = findWin({
      fixedIndex: i,
      range,
      matchInRow,
      rowOrCol
    });
    winCells = [...winCells, ...wins];
  }
  return winCells;
};

const recursiveFindDiagonalWins = ({
  startIndex = 0,
  range,
  matchInRow,
  winCells = [],
  rowOrCol
}) => {
  // if not enough cells remain to make a win then return
  if (range - startIndex < matchInRow) {
    return winCells;
  }
  let cnt = 0;
  let cells = [];
  for (let idx = startIndex; idx < range; idx++) {
    if (cnt < matchInRow) {
      if (rowOrCol === "rightDiagonal") {
        cells.push([idx, idx]);
      } else {
        cells.push([idx, range - 1 - idx]);
      }
    }
    cnt++;
    if (cnt === matchInRow) {
      // push a win
      winCells.push(cells);
    }
  }
  // recursively look for more wins
  return recursiveFindDiagonalWins({
    startIndex: startIndex + 1,
    range,
    matchInRow,
    winCells,
    rowOrCol
  });
};

const findDiagonalWin = ({ range, matchInRow, rowOrCol }) => {
  let winCells = [];
  if (matchInRow === range) {
    const cells = [];
    for (let idx = 0; idx < range; idx++) {
      if (rowOrCol === "rightDiagonal") {
        cells.push([idx, idx]);
      } else {
        cells.push([idx, range - 1 - idx]);
      }
    }
    winCells.push(cells);
  } else {
    const wins = recursiveFindDiagonalWins({
      range,
      matchInRow,
      rowOrCol
    });
    winCells = [...wins];
  }
  return winCells;
};

const buildWinStates = (boardDimension, match) => {
  if (
    !boardDimension ||
    !Array.isArray(boardDimension) ||
    boardDimension.length < 1
  ) {
    throw Error("Required param must be an array: boardDimension");
  }
  const range = boardDimension[0];
  const matchInRow = match || boardDimension[0];
  let wins = [];
  const rowWinws = findWins({ range, matchInRow, rowOrCol: "row" });
  const colWinws = findWins({ range, matchInRow, rowOrCol: "col" });
  const leftDiagonalWinws = findDiagonalWin({
    range,
    matchInRow,
    rowOrCol: "rightDiagonal"
  });
  const rightDiagonalWinws = findDiagonalWin({
    range,
    matchInRow,
    rowOrCol: "leftDiagonal"
  });

  wins = [
    ...rowWinws,
    ...colWinws,
    ...leftDiagonalWinws,
    ...rightDiagonalWinws
  ];

  return wins;
};

export { buildWinStates };
