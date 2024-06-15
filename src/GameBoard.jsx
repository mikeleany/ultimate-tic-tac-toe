import { useState } from 'react'
import { Coord } from './game/board';
import { Game } from './game/game';
import { SmallBoard } from './SmallBoard';

export function GameBoard() {
  const players = [
    {name: "Player 1", type: "local", color: 'red'},
    {name: "Player 2", type: "local", color: 'blue'},
  ];
  const [game, setGame] = useState(new Game(players));

  function setSquare(boardRow, boardCol, squareRow, squareCol) {
    const newGame = game.clone();
    newGame.setSquare(new Coord(boardRow, boardCol), new Coord(squareRow, squareCol));
    setGame(newGame);
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
