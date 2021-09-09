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
  constructor(props) {
    super(props.user);
    this.piece = props.piece || "";
  }
}

export default Player;
