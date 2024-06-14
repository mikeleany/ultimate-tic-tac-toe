import { Square } from './Square';

export function SmallBoard({ board, turn, isActive, setSquare }) {
  const activeClass = (isActive) ? `active-${turn}` : null;

  return (
    <table className={activeClass}>
      <tbody>
        {
          board.grid.map((squares, row) =>
            <tr key={row}>
              {
                squares.map((square, col) =>
                  <Square key={col} owner={square} turn={turn} isActive={isActive} select={() => setSquare(row, col)}/>
                )
              }
            </tr>
          )
        }
      </tbody>
    </table>
  )
}
