import { useRef, useState } from 'react'
import './App.css'
import { GameBoard } from './GameBoard'
import { Navbar } from './Navbar'
import { Settings } from './Settings';

function App() {
  const [gameNumber, setGameNumber] = useState(0);
  const [settings, setSettings] = useState({ mode: 'single-player', difficulty: 10 });
  const settingsDialog = useRef(null);

  const players = [
    { name: "Player 1", type: "local", color: 'red', playing: 'X' },
    { name: "Player 2", type: "local", color: 'blue', playing: 'O' },
  ];

  if (settings.mode !== 'two-player') {
    players[1] = { name: 'Monte', type: 'ai', color: 'blue', playing: 'O' };
  }

  if (settings.mode === 'demo') {
    players[0] = { name: 'Monte', type: 'ai', color: 'red', playing: 'X' };
    players[1].name = 'Carlo';
  }

  return (
    <>
      <Navbar
        newGame={() => setGameNumber(gameNumber + 1)}
        openSettings={() => settingsDialog.current.showModal()}
      />
      <GameBoard key={gameNumber} players={players} difficulty={settings.difficulty} />
      <Settings settings={settings} setSettings={setSettings} settingsDialog={settingsDialog} />
    </>
  )
}

export default App
