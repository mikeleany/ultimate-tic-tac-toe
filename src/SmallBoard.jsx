import { Square } from './Square';

export function SmallBoard({ board, turn, lastMove, isActive, setSquare }) {
  const tdClasses = ['board'];
  if (board.isComplete) {
    tdClasses.push(board.winner ? board.winner.color : 'draw');
  }

  const tableClass = (isActive) ? `active-${turn.color}` : null;

  return (
    <td className={tdClasses.join(' ')}>
      <table className={tableClass}>
        <tbody>
          {
            board.grid.map((squares, row) =>
              <tr key={row}>
                {
                  squares.map((square, col) =>
                    <Square
                      key={col}
                      owner={square}
                      turn={turn}
                      isLastMove={lastMove && lastMove.row === row && lastMove.col === col}
                      isActive={isActive}
                      select={() => setSquare(row, col)}
                    />
                  )
                }
              </tr>
            )
          }
        </tbody>
      </table>
    </td>
  )
}
