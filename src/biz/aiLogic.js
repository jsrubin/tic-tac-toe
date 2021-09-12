import { arrayOf } from "prop-types";

const algoFirstOpen = ({ boardDimension, isSpaceOpen }) => {
  const length = boardDimension;
  for (let i = 0; i < length[0]; i++) {
    for (let j = 0; j < length[1]; j++) {
      const cell = `${i},${j}`;
      if (isSpaceOpen(cell)) {
        return cell;
      }
    }
  }
};

const algoRandom = ({ boardDimension, isSpaceOpen }) => {
  const openCells = [];
  const length = boardDimension;
  for (let i = 0; i < length[0]; i++) {
    for (let j = 0; j < length[1]; j++) {
      const cell = `${i},${j}`;
      if (isSpaceOpen(cell)) {
        openCells.push(cell);
      }
    }
  }
  const randomIndex = Math.floor(Math.random() * openCells.length);
  return openCells[randomIndex];
};

// [ [0,0] ]
const recurr = (arr) => {
  if (Array.isArray(arr)) {
    for (let i = 0; i < arr.length; i++) {
      return recurr(arr[i]);
    }
  }
  console.log(`found val: ${arr}`);
  return arr;
};

const algoDefensiveAlternate = ({
  board,
  winConditions,
  oppoenentPiece,
  boardDimension,
  isSpaceOpen,
  turnCount
}) => {
  const blockMove = winConditions.reduce((acc, winCondition) => {
    if (acc) {
      return acc;
    }
    let spaces = [];
    for (let row = 0; row < winCondition.length; row++) {
      const spaceLocation = [];
      for (let col = 0; col < winCondition[row].length; col++) {
        spaceLocation.push(winCondition[row][col]);
      }
      // find condition on the game board
      let boardSpace = board;
      spaceLocation.forEach((space) => {
        boardSpace = boardSpace[space];
      });
      spaces.push(boardSpace);
    }

    const space1 = spaces[0];
    const space2 = spaces[1];
    const space3 = spaces[2];
    // block 3rd win space
    if (
      oppoenentPiece === space1.value &&
      oppoenentPiece === space2.value &&
      !space3.value
    ) {
      acc = space3.cell;
    }
    // block 1st win space
    if (
      oppoenentPiece === space2.value &&
      oppoenentPiece === space3.value &&
      !space1.value
    ) {
      acc = space1.cell;
    }
    // block 2st win space
    if (
      oppoenentPiece === space1.value &&
      oppoenentPiece === space3.value &&
      !space2.value
    ) {
      acc = space2.cell;
    }
    return acc;
  }, "");

  if (!blockMove) {
    // first move try middle
    if (isSpaceOpen("1,1") && turnCount < 2) {
      return "1,1";
    }
    // first move try corner
    if (isSpaceOpen("0,0") && turnCount < 2) {
      return "0,0";
    }
    // second move try a side
    if (isSpaceOpen("0,1") && turnCount > 2) {
      return "0,1";
    }
    return algoRandom({ boardDimension, isSpaceOpen });
  }
  return blockMove;
};

const algoDefensive = ({
  board,
  winConditions,
  oppoenentPiece,
  boardDimension,
  isSpaceOpen
}) => {
  const blockCondition = winConditions.find((winCondition) => {
    const space1 = board[winCondition[0][0]][winCondition[0][1]].value;
    const space2 = board[winCondition[1][0]][winCondition[1][1]].value;
    const space3 = board[winCondition[2][0]][winCondition[2][1]].value;
    if (oppoenentPiece === space1 && oppoenentPiece === space2 && !space3) {
      return true;
    }
    if (oppoenentPiece === space2 && oppoenentPiece === space3 && !space1) {
      return true;
    }
    if (oppoenentPiece === space1 && oppoenentPiece === space3 && !space2) {
      return true;
    }
    return false;
  });
  if (!blockCondition) {
    // first move try middle
    if (isSpaceOpen("1,1")) {
      return "1,1";
    }
    // first move try corner
    if (isSpaceOpen("0,0")) {
      return "0,0";
    }
    // second move try a side
    if (isSpaceOpen("0,1")) {
      return "0,1";
    }
    return algoRandom({ boardDimension, isSpaceOpen });
  }
  const space1 = board[blockCondition[0][0]][blockCondition[0][1]];
  const space2 = board[blockCondition[1][0]][blockCondition[1][1]];
  const space3 = board[blockCondition[2][0]][blockCondition[2][1]];
  // block 3rd space
  if (
    oppoenentPiece === space1.value &&
    oppoenentPiece === space2.value &&
    !space3.value
  ) {
    return space3.cell;
  }
  // block 1st space
  if (
    oppoenentPiece === space2.value &&
    oppoenentPiece === space3.value &&
    !space1.value
  ) {
    return space1.cell;
  }
  // block 2st space
  if (
    oppoenentPiece === space1.value &&
    oppoenentPiece === space3.value &&
    !space2.value
  ) {
    return space2.cell;
  }
};

export const useAiLogic = () => {
  return {
    algoFirstOpen,
    algoRandom,
    algoDefensive
  };
};
