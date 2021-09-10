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

export const useAiLogic = () => {
  return {
    algoFirstOpen,
    algoRandom
  };
};
