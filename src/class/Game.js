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

  get status() {
    return this.#status;
  }

  start() {
    this.#status = StatusesEnum.ACTIVE;
    console.log(`Start game. Status ${this.#status}`);
  }
  end() {
    this.#status = StatusesEnum.ENDED;
    console.log(`End game. Status ${this.#status}`);
  }
}

export default Game;
