import { Random } from "random-js";
import { Game } from "../game/game";

const random = new Random();

console.log("hello");

function findBestMove(moveList) {
  const game = new Game(['X', 'O']);
  for (const move of moveList) {
    game.setSquare(move.board, move.square);
  }

  const move = random.pick(game.possibleMoves);

  return move;
}

onmessage = (e) => {
  setTimeout(() => postMessage(findBestMove(e.data)), 500);
}
