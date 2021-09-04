/**
 * @class User
 *
 * @param {Int} id id.
 * @param {String} username username.
 * @param {String} name name.
 */
class User {
  #id = "";
  #username = "";
  #name = "";

  constructor(props) {
    this.#id = props.id;
    this.#name = props.name;
    this.#username = props.username;
  }

  get id() {
    return this.#id;
  }

  get username() {
    return this.#username;
  }

  get name() {
    return this.#name;
  }
}

export default User;
