import config from "../config/default.json";
const { boardDimension, winStates } = config;

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
        : boardDimension;
    this.winConditions = props.winStates || winStates;
    // initialize board
    this.board = this._generateBoard(this.boardDimension);
    this.totalTurns = this.boardDimension[0] * this.boardDimension[1];
  }

  // build board
  _generateBoard() {
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

  hasWinner() {
    return this.winConditions.find((winCondition) => {
      const pieceValue =
        this.board[winCondition[0][0]][winCondition[0][1]].value;
      const compare1 = this.board[winCondition[1][0]][winCondition[1][1]].value;
      const compare2 = this.board[winCondition[2][0]][winCondition[2][1]].value;
      if (pieceValue && pieceValue === compare1 && pieceValue === compare2) {
        return true;
      }
      return false;
    });
  }

  update(cell, value) {
    const dim = cell.split(",").map((val) => parseInt(val));
    this.board[dim[0]][dim[1]].value = value;
  }

  // re-initialize board
  reset() {
    this.board = this._generateBoard(this.boardDimension);
  }
}

export default Board;
