/**
 * @class
 * Board
 *
 * @param {Array} dimension Dimension (w,h) for board.
 */
class Board {
  constructor(props) {
    this.boardDimension =
      props &&
      props.dimension &&
      Array.isArray(props.dimension) &&
      props.dimension.length === 2
        ? props.dimension
        : [3, 3];
    // initialize board
    this.board = this.generateBoard(this.boardDimension);
    this.totalTurns = this.boardDimension[0] * this.boardDimension[1];
  }

  // build board
  generateBoard() {
    const board = [];
    for (let row = 0; row < this.boardDimension[0]; row++) {
      const cols = [];
      for (let col = 0; col < this.boardDimension[1]; col++) {
        cols.push({ cell: `${row},${col}`, value: "" });
      }
      board.push(cols);
    }
    return board;
  }

  isBoardFilled() {
    return this.board.reduce((acc, row) => {
      if (row.find((col) => !col.value)) {
        acc = false;
      }
      return acc;
    }, true);
  }

  isSpaceOpen(cell) {
    const dim = cell.split(",").map((val) => parseInt(val));
    return !this.board[dim[0]][dim[1]].value ? true : false;
  }

  // re-initialize board
  reset() {
    this.board = this.generateBoard(this.boardDimension);
  }
}

export default Board;
