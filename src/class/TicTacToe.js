import Game from "./Game";

/**
 * @class Game
 *
 * @param {String} name Name.
 */
class TicTacToe extends Game {
  #name = "TicTacToe";
  #winner = false;
  #winState = false;

  constructor(props) {
    if (!props || !props.players || !props.board) {
      throw Error("Required constructor params missing: players, board");
    }
    super(props);
    this.players = props.playersObj;
    this.counter = props.counterObj;
    this.GameBoard = props.GameBoard;
  }

  // turn logic
  turn(cell) {
    console.log(`Turn ${this.#name} on ${cell}`);
    // is move allowed
    if (this.GameBoard.isSpaceOpen(cell)) {
      // place piece
      this.GameBoard.update(cell, currentPlayer.piece);
      this.counter.increment();
    }
    // check for end game
    const winStateFound = this.GameBoard.hasWinner();
    if (winStateFound) {
      this.#winner = this.players.currentPlayer.name;
      this.#winState = winStateFound;
    } else if (this.GameBoard.isBoardFilled()) {
      // check for more moves, else tie
      this.#winner = "tie";
    } else {
      // next turn
      this.players.switchPlayer();
    }
  }
}

export default TicTacToe;
