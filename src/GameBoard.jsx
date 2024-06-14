import { useState } from 'react'
import { Coord } from './game/board';
import { Game } from './game/game';
import { SmallBoard } from './SmallBoard';

export function GameBoard() {
  const [game, setGame] = useState(new Game);

  function setSquare(boardRow, boardCol, squareRow, squareCol) {
    const newGame = game.clone();
    newGame.setSquare(new Coord(boardRow, boardCol), new Coord(squareRow, squareCol));
    setGame(newGame);
  }

  let messageClass = game.turn;
  let message = `It's ${game.turn}'s turn.`;
  if (game.isComplete) {
    messageClass = game.winner;
    message = (game.winner) ? `${game.winner} wins.` : 'The game is drawn.' ;
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
                    <td key={col} className={'board ' + (board.isComplete ? board.winner : '')}>
                      <SmallBoard board={board} turn={game.turn} isActive={game.isActive(new Coord(row, col))} setSquare={(srow, scol) => setSquare(row, col, srow, scol)}/>
                    </td>
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
