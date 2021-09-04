import Game from "./Game";

/**
 * @class Game
 *
 * @param {String} name Name.
 */
class TicTacToe extends Game {
  #name = "TicTacToe";

  constructor(props) {
    super(props);
  }

  turn() {
    console.log(`Turn ${this.#name}`);
    // turn logic
    // is allowed
    // place piece
    // check for win
    // check for more moves, else tie
    // next turn
  }
}

export default TicTacToe;
