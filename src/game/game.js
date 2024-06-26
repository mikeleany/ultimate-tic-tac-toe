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
            this.#activeBoards.push(new Coord(row, col));
          }
        }
      }
    }
  }

  constructor(player1 = 'X', player2 = 'O') {
    console.assert(player1, "players IDs cannot be falsy");
    console.assert(player2, "players IDs cannot be falsy");

    this.#players = [player1, player2]
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

  get lastMove() {
    return this.#lastMove;
  }

  get possibleMoves() {
    let moves = [];

    for (const board of this.#activeBoards) {
      for (const square of this.#grid[board.row][board.col].remaining) {
        moves.push({ board, square });
      }
    }

    return moves;
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
    const clone = new Game(this.#players[0], this.#players[1]);

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
        this.#turn = +!this.#turn;

        if (!this.#board.isComplete) {
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
