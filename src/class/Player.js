import User from "./User";

/**
 * @class Player
 *
 * @param {Object} user userObject.
 *    @param {Int} id id.
 *    @param {String} username username.
 *    @param {String} name name.
 * @param {String} piece Piece name.
 */
class Player extends User {
  #wins = 0;
  #losses = 0;
  #ties = 0;

  constructor(props) {
    super(props.user);
    this.piece = props.piece || "";
  }

  get wins() {
    return this.#wins;
  }

  get losses() {
    return this.#losses;
  }

  get ties() {
    return this.#ties;
  }

  incrementWin() {
    this.#wins = this.#wins + 1;
  }

  incrementLoss() {
    this.#losses = this.#losses + 1;
  }

  incrementTie() {
    this.#ties = this.#ties + 1;
  }
}

export default Player;
