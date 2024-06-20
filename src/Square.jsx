export function Square({ owner, turn, isLastMove, isActive, select }) {
  let classes = ['square'];
  let handleClick = null;

  if (owner) {
    classes.push(owner.color);
  }
  if (isLastMove) {
    classes.push('last-move');
  }
  if (isActive && !owner) {
    classes.push(`active-${turn.color}`);
    if (turn.type === 'local') {
      classes.push('clickable');
      handleClick = select;
    }
  }

  return (
    <td className={classes.join(' ')} onClick={handleClick}>
      {owner && owner.playing}
    </td>
  )
}
