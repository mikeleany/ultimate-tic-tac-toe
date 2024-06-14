export function Square({ owner, turn, isActive, select }) {
  const activeClass = (isActive && !owner) ? 'active' : null;
  const handleClick = (isActive && !owner) ? select : null;

  return (
    <td className={`square ${owner} ${activeClass}`} onClick={handleClick}>
      {owner}
    </td>
  )
}