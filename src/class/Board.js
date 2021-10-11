import config from "../config/default.json";
const { boardDimension, defaultWinStates, defaultMatch } = config;

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
    this.winConditions = props.winStates || defaultWinStates;
    this.matchInRow = props.defaultMatch || defaultMatch;
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
    if (typeof cell !== "string") {
      return false;
    }
    const dim = cell.split(",").map((val) => parseInt(val));
    return !this.board[dim[0]][dim[1]].value ? true : false;
  }

  /*
      [
        [0, 3] = use first to set pieceValue
        [1, 2]
        [2, 1]
        [3, 0]
      ]
  */
  hasWinner() {
    return this.winConditions.find((winCondition) => {
      const pieceValue =
        this.board[winCondition[0][0]][winCondition[0][1]].value;
      if (!pieceValue) {
        return false;
      }
      const hasMatch = Array.from(Array(this.matchInRow), (x, i) => i).reduce(
        (acc, i) => {
          if (winCondition.length > i + 1) {
            if (
              pieceValue !==
              this.board[winCondition[i + 1][0]][winCondition[i + 1][1]].value
            ) {
              return false;
            }
          }
          return acc;
        },
        true
      );
      return hasMatch;
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
