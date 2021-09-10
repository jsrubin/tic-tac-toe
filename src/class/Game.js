const Statuses = { NEW: "new", ACTIVE: "active", ENDED: "ended" };
const StatusesEnum = Object.freeze(Statuses);

/**
 * @class Game
 *
 * @param {String} name Name.
 */
class Game {
  #id = new Date().getTime();
  #status = StatusesEnum.NEW;
  #name = "";

  constructor(props) {
    this.#name = props.name;
  }

  get status() {
    return this.#status;
  }

  get name() {
    return this.#name;
  }

  start() {
    this.#status = StatusesEnum.ACTIVE;
    console.log(`Start ${this.#name} game. Status: ${this.#status}`);
  }
  end() {
    this.#status = StatusesEnum.ENDED;
    console.log(`End ${this.#name} game. Status: ${this.#status}`);
  }
}

export default Game;
