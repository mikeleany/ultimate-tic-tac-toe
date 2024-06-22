import './Navbar.css'

export function Navbar({ newGame, undo, openSettings }) {
  return (
    <header className='app-header'>
      <div className='app-title'>
        <span>Ultimate Tic-Tac-Toe</span>
      </div>
      <div className='app-header-links'>
        <button className='icon-button' title='New game' onClick={newGame}>
          <span className='material-icons'>restart_alt</span>
        </button>
        <button className='icon-button' title='Undo' onClick={undo} disabled>
          <span className='material-icons'>undo</span>
        </button>
        <button className='icon-button' title='Settings' onClick={openSettings}>
          <span className='material-icons'>settings</span>
        </button>
      </div>
    </header>
  )
}
