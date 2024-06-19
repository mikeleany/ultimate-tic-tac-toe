import { Random } from "random-js";
import { Game } from "../game/game";

const random = new Random();

function findBestMove(game) {
  const move = random.pick(game.possibleMoves);

  return move;
}

onmessage = (e) => {
  const game = new Game;
  for (const move of e.data) {
    game.setSquare(move.board, move.square);
  }

  setTimeout(() => postMessage(findBestMove(game)), 500);
}
