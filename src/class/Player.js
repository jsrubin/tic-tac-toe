import User from "./User";

/**
 * @class Player
 *
 * @param {String} piece Piece name.
 */
class Player extends User {
  constructor(props) {
    super(props);
    this.piece = props.piece || "";
  }
}

/**
 * @class PlayerMoves
 */
export class PlayerMoves extends Player {
  place(field) {
    // get board from memory
    // check space is available on board
    // place piece
    console.log(`Placing piece ${this.piece} on ${field}`);
  }
}

export default Player;
