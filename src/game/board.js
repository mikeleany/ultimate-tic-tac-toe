export class Coord {
  row;
  col;

  constructor(row, col) {
    this.row = parseInt(row);
    this.col = parseInt(col);
  }
}

export class Board {
  #grid;
  #remaining;
  #winner;

  constructor() {
    this.#grid = [
      Array.from({ length: 3 }),
      Array.from({ length: 3 }),
      Array.from({ length: 3 }),
    ];
    this.#remaining = 9;
  }

  get grid() {
    return this.#grid;
  }

  get isComplete() {
    return this.#winner || !this.#remaining;
  }

  get winner() {
    return this.#winner;
  }

  get isDraw() {
    return !this.#winner || !this.#remaining;
  }

  get remaining() {
    const remaining = [];

    for (const row in this.#grid) {
      for (const col in this.#grid[row]) {
        if (this.#grid[row][col] === undefined) {
          remaining.push(new Coord(row, col));
        }
      }
    }

    return remaining;
  }

  clone() {
    const clone = new Board;
    clone.#grid = [
      [...this.#grid[0]],
      [...this.#grid[1]],
      [...this.#grid[2]],
    ];
    clone.#remaining = this.#remaining;
    clone.#winner = this.#winner;

    return clone;
  }

  setSquare(coord, player) {
    if (!this.isComplete && player !== undefined && this.#grid[coord.row][coord.col] === undefined) {
      this.#grid[coord.row][coord.col] = player;
      this.#remaining--;

      // check for win or draw
      const grid = this.#grid;
      if ((grid[coord.row][0] === grid[coord.row][1] && grid[coord.row][1] === grid[coord.row][2])
        || (grid[0][coord.col] === grid[1][coord.col] && grid[1][coord.col] === grid[2][coord.col])) {
        this.#winner = player;
      } else if ((grid[coord.row][coord.col] === grid[1][1])
        && ((grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2])
          || (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]))) {
        this.#winner = player;
      } else if (!this.#remaining) {
        this.#winner = null;
      }

      return true;
    } else {
      return false;
    }
  }
}
