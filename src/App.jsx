
import './App.css'
import confetti from 'canvas-confetti'
import { useState } from 'react'
import { Square } from './components/Square'
import { TURNS } from './constants'
import { WinnerModal } from './components/WinnerModal'
import { checkEndGameFrom, checkWinnerFrom } from './logic/board'
import { Board } from './components/Board'

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    //No actualizar la posicion si ya hay algo o hay ganador
    if (board[index] || winner) return
    //Actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn)

    //revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    }else if(checkEndGameFrom(newBoard)){
      setWinner(false) //Empate
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main className="board">
      <h1 className="text-4xl">Tic Tac Toe</h1>

      <Board board={board} updateBoard={updateBoard}/>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <button onClick={resetGame}>Resetear Juego</button>

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
