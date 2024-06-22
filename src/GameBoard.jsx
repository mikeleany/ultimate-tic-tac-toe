import { useEffect, useState } from 'react'
import { Coord } from './game/board';
import { Game } from './game/game';
import { SmallBoard } from './SmallBoard';

export function GameBoard({ players, difficulty }) {
  const [{ game, moveList }, setState] = useState({
    game: new Game({ index: 0, color: players[0].color, playing: 'X' }, { index: 1, color: players[1].color, playing: 'O' }),
    moveList: [],
  });
  const [aiWorker, setAiWorker] = useState(null);
  const [isThinking, setThinking] = useState(false);

  const turn = players[game.turn.index];

  useEffect(() => {
    const aiWorker = new Worker(new URL('./ai/monte.js', import.meta.url), { type: "module" });
    setAiWorker(aiWorker);

    aiWorker.onmessage = (e) => {
      const move = e.data;
      setSquare(move.board.row, move.board.col, move.square.row, move.square.col);
      setThinking(false);
    }

    return () => {
      aiWorker.terminate();
      setAiWorker(null);
      setThinking(false);
    }
  }, []);

  useEffect(() => {
    if (turn.type === 'ai' && !game.isComplete && aiWorker && !isThinking) {
      setThinking(true);
      aiWorker.postMessage({ difficulty, moveList });
    }
  }, [game, moveList, aiWorker, isThinking, players, difficulty]);

  function setSquare(boardRow, boardCol, squareRow, squareCol) {
    const move = { board: new Coord(boardRow, boardCol), square: new Coord(squareRow, squareCol) };
    let message;

    setState(({ game, moveList }) => {
      const newMoveList = [...moveList, move];

      const newGame = game.clone();
      console.assert(newGame.setSquare(move.board, move.square));

      return { game: newGame, moveList: newMoveList };
    });
  }

  let messageClass = turn.color;
  let message = `It's ${turn.name}'s turn (as ${turn.playing}).`;
  if (game.isComplete) {
    const winner = game.winner ? players[game.winner.index] : null;
    messageClass = winner && winner.color;
    message = (winner) ? `${winner.name} wins.` : 'The game is drawn.';
  }

  return (
    <main>
      <h2 className={messageClass}>{message}</h2>
      <table>
        <tbody>
          {
            game.grid.map((boards, row) =>
              <tr key={row}>
                {
                  boards.map((board, col) =>
                    <SmallBoard
                      key={col}
                      board={board}
                      turn={turn}
                      lastMove={(game.lastMove && game.lastMove.board.row === row && game.lastMove.board.col === col) ? game.lastMove.square : null}
                      isActive={game.isActive(new Coord(row, col))}
                      setSquare={(srow, scol) => setSquare(row, col, srow, scol)}
                    />
                  )
                }
              </tr>
            )
          }
        </tbody>
      </table>
    </main>
  )
}
