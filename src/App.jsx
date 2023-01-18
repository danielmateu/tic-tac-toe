
import './App.css'

import { useState } from 'react'
import { Square } from './components/Square'

const TURNS = {
  X: 'x',
  O: 'o'

}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  /**
   * If the board has a value at the first index of a winning combo, and that value is the same as the
   * value at the second index of the winning combo, and that value is the same as the value at the
   * third index of the winning combo, then return the value at the first index of the winning combo
   * @returns The winner of the game.
   */
  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    return null
  }

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
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner)
    }// Check if game is over
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main className="board">
      <h1 className="text-4xl">Tic Tac Toe</h1>
      <section className="game">
        {
          board.map((_, index) => (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          ))
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false ? 'Empate' : 'Ganó'
                }
              </h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>

              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
