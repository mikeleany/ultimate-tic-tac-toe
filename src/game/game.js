import { Board, Coord } from "./board";

export class Game {
  #players;
  #turn;
  #board;
  #grid;
  #lastMove;
  #activeBoards;

  #updateActiveBoards() {
    if (this.#lastMove && !this.#grid[this.#lastMove.square.row][this.#lastMove.square.col].isComplete) {
      this.#activeBoards = [this.#lastMove.square];
    } else {
      this.#activeBoards = [];
      for (const row in this.#grid) {
        for (const col in this.#grid[row]) {
          if (!this.#grid[row][col].isComplete) {
            this.#activeBoards.push(new Coord(parseInt(row), parseInt(col)));
          }
        }
      }
    }
  }

  constructor(players) {
    players[0].playing = 'X';
    players[1].playing = 'O';

    this.#players = players;
    this.#turn = 0;
    this.#board = new Board;

    this.#grid = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => (new Board)));

    this.#lastMove = null;
    this.#updateActiveBoards();
  }

  get turn() {
    return this.#players[this.#turn];
  }

  get grid() {
    return this.#grid;
  }

  get isComplete() {
    return this.#board.isComplete;
  }

  get winner() {
    return this.#board.winner;
  }

  get isDraw() {
    return !this.#board.isDraw;
  }

  clone() {
    const clone = new Game(this.#players);

    clone.#turn = this.#turn;
    clone.#board = this.#board.clone();
    for (const row in this.#grid) {
      for (const col in this.#grid[row]) {
        clone.#grid[row][col] = this.#grid[row][col].clone()
      }
    }

    return clone;
  }

  isActive(board) {
    for (const active of this.#activeBoards) {
      if (board.row === active.row && board.col === active.col) {
        return true;
      }
    }

    return false;
  }

  setSquare(board, square) {
    if (this.isActive(board)) {
      if (this.#grid[board.row][board.col].setSquare(square, this.turn)) {
        this.#lastMove = { board, square };
        if (this.#grid[board.row][board.col].isComplete) {
          this.#board.setSquare(board, this.#grid[board.row][board.col].winner);
        }

        if (!this.#board.isComplete) {
          this.#turn = +!this.#turn;
          this.#updateActiveBoards();
        } else {
          this.#activeBoards = [];
        }

        return true;
      }
    }

    return false;
  }
}
