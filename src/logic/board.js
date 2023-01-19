import { WINNER_COMBOS } from '../constants'

/**
  * If the board has a value at the first index of a winning combo, and that value is the same as the
  * value at the second index of the winning combo, and that value is the same as the value at the
  * third index of the winning combo, then return the value at the first index of the winning combo
  * @returns The winner of the game.
  */
export const checkWinnerFrom = (boardToCheck) => {
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

export const checkEndGameFrom = (newBoard) => {
  // revisamos si hay un empate
  // Si no hay más espacios vacios en el tablero
  return newBoard.every((square) => square !== null)
}
