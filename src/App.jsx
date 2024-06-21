import { useState } from 'react'
import './App.css'
import { GameBoard } from './GameBoard'
import { Navbar } from './Navbar'

function App() {
  const [gameNumber, setGameNumber] = useState(0);

  return (
    <>
      <Navbar newGame={() => setGameNumber(gameNumber + 1)} />
      <GameBoard key={gameNumber} />
    </>
  )
}

export default App
