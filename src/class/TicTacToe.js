import Game from "./Game";

/**
 * @class Game
 *
 * @param {String} name Name.
 */
class TicTacToe extends Game {
  #winner = false;
  #winState = false;
  #playerTurn;

  constructor(props) {
    if (!props || !props.players || !props.GameBoard) {
      throw Error("Required constructor params missing: players, GameBoard");
    }
    super({ ...props, name: "Tic Tac Toe" });

    this.players = props.players;
    this.GameBoard = props.GameBoard;
    this.#playerTurn = this.players[0];
    this.incrementTurn = props.incrementTurn;
    this.onWinner = props.onWinner;

    super.start();
  }

  increment() {
    this.incrementTurn();
  }

  get currentPlayer() {
    return this.#playerTurn;
  }

  get winner() {
    return this.#winner.name;
  }

  get winState() {
    return this.#winState;
  }

  // turn logic
  turn(cell) {
    if (super.status === "ended") {
      return "game has ended";
    }

    // is move allowed
    if (this.GameBoard.isSpaceOpen(cell)) {
      // place piece
      this.GameBoard.update(cell, this.#playerTurn.piece);
    } else {
      return "space has been taken";
    }
    // check for end game
    const winStateFound = this.GameBoard.hasWinner();
    if (winStateFound) {
      this.#winner = this.#playerTurn;
      this.#winState = winStateFound;
      this.end();
    } else if (this.GameBoard.isBoardFilled()) {
      // check for more moves, else tie
      this.#winner = { name: "tie" };
      this.end();
    } else {
      // next turn
      this.nextTurn();
      this.increment(); // trigger state change
    }
  }

  nextTurn() {
    this.#playerTurn = this.players.find(
      (player) => player.id !== this.#playerTurn.id
    );
  }

  end() {
    super.end();
    if (this.#winner.name === "tie") {
      this.players.forEach((player) => player.incrementTie());
    } else {
      this.players.forEach((player) => {
        if (this.#winner.id === player.id) {
          player.incrementWin();
        } else {
          player.incrementLoss();
        }
      });
    }
    this.onWinner(true);
  }
}

export default TicTacToe;
