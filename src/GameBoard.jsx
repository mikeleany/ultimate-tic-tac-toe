import { useEffect, useState } from 'react'
import { Coord } from './game/board';
import { Game } from './game/game';
import { SmallBoard } from './SmallBoard';

export function GameBoard() {
  const players = [
    {name: "Player 1", type: "local", color: 'red', playing: 'X'},
    {name: "Monte", type: "ai", color: 'blue', playing: 'O'},
  ];
  const [{game, moveList}, setState] = useState({
    game: new Game(players[0], players[1]),
    moveList: [],
  });
  const [aiWorker, setAiWorker] = useState(null);

  useEffect(() => {
    const aiWorker = new Worker(new URL('./ai/monte.js', import.meta.url), {type: "module"});
    setAiWorker(aiWorker);

    aiWorker.onmessage = (e) => {
      const move = e.data;
      console.log(move.board, move.square);
      setSquare(move.board.row, move.board.col, move.square.row, move.square.col);
    }

    return () => {
      aiWorker.terminate();
      setAiWorker(null);
    }
  }, []);

  useEffect(() => {
    if (game.turn.type === 'ai' && !game.isComplete && aiWorker) {
      aiWorker.postMessage(moveList);
    }
  }, [game, moveList, aiWorker]);

  function setSquare(boardRow, boardCol, squareRow, squareCol) {
    const move = {board: new Coord(boardRow, boardCol), square: new Coord(squareRow, squareCol)};
    let message;

    setState(({game, moveList}) => {
      const newMoveList = [...moveList, move];

      const newGame = game.clone();
      console.assert(newGame.setSquare(move.board, move.square));

      return {game: newGame, moveList: newMoveList};
    });
  }

  let messageClass = game.turn.color;
  let message = `It's ${game.turn.name}'s turn (as ${game.turn.playing}).`;
  if (game.isComplete) {
    messageClass = game.winner && game.winner.color;
    message = (game.winner) ? `${game.winner.name} wins.` : 'The game is drawn.' ;
  }

  return (
    <>
      <h2 className={messageClass}>{message}</h2>
      <table>
        <tbody>
          {
            game.grid.map((boards, row) =>
              <tr key={row}>
                {
                  boards.map((board, col) =>
                    <SmallBoard key={col} board={board} turn={game.turn} isActive={game.isActive(new Coord(row, col))} setSquare={(srow, scol) => setSquare(row, col, srow, scol)}/>
                  )
                }
              </tr>
            )
          }
        </tbody>
      </table>
    </>
  )
}
