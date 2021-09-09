import Game from "./Game";

/**
 * @class Game
 *
 * @param {String} name Name.
 */
class TicTacToe extends Game {
  #name = "Tic Tac Toe";
  #winner = false;
  #winState = false;
  #playerTurn;

  constructor(props) {
    if (!props || !props.players || !props.GameBoard) {
      throw Error("Required constructor params missing: players, GameBoard");
    }
    super(props);

    this.players = props.players;
    this.GameBoard = props.GameBoard;
    this.#playerTurn = this.players[0];
    this.incrementTurn = props.incrementTurn;
    this.onWinner = props.onWinner;

    super.start();
  }

  get name() {
    return this.#name;
  }

  increment() {
    this.incrementTurn();
  }

  get currentPlayer() {
    return this.#playerTurn;
  }

  get winner() {
    return this.#winner;
  }

  get winState() {
    return this.#winState;
  }

  // turn logic
  turn(cell) {
    if (super.status === "ended") {
      return "game has ended";
    }
    console.log(`Turn ${this.#name} on ${cell}`);
    // is move allowed
    if (this.GameBoard.isSpaceOpen(cell)) {
      // place piece
      this.GameBoard.update(cell, this.#playerTurn.piece);
      this.increment();
    } else {
      return "space has been taken";
    }
    // check for end game
    const winStateFound = this.GameBoard.hasWinner();
    if (winStateFound) {
      this.#winner = this.#playerTurn.name;
      this.#winState = winStateFound;
      this.onWinner(true);
      super.end();
    } else if (this.GameBoard.isBoardFilled()) {
      // check for more moves, else tie
      this.#winner = "tie";
      this.onWinner(true);
      super.end();
    } else {
      // next turn
      this.nextTurn();
    }
  }

  nextTurn() {
    this.#playerTurn = this.players.find(
      (player) => player.id !== this.#playerTurn.id
    );
  }
}

export default TicTacToe;
