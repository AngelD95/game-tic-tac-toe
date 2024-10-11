/* eslint-disable react/prop-types */
import { useState } from "react"

const Turns = {
	X: 'x',
	O: 'o'
}

const Square = ({ children, isSelected, updateBoard, index }) => {
	const className = `square ${isSelected ? 'is-selected': ''}`

	const handleClick = () => {
		updateBoard(index)
	}

	return (
		<div onClick={handleClick} className={className}>
			{children}
		</div>
	)
}

const WINNER_COMBOS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

function App() {
	const [board, setBoard] = useState(
		Array(9).fill(null)
	)

	const [turn, setTurn] = useState(Turns.X)
	// null es que no hay ganador, falsees que hay un empate
	const [winner, setWinner] = useState(null)

	const checkWinner = (boardToCheck) => {
		// Revisamos todas las conbinaciones ganadoras
		// para ver si X u O ganó
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
		// Si no hay ganador
		return null
	}

	const resetGame = () => {
		setBoard(Array(9).fill(null))
		setTurn(Turns.X)
		setWinner(null)
	}

	const checkEndGame = (newBoard) => {
		return newBoard.every((square) => square !== null)
	}

	const updateBoard = (index) => {
		// No actualizamos esta posición
		// si ya tiene algo
		if (board[index] || winner) return
		// Actualizar el tablero
		const newBoard = [...board]
		newBoard[index] = turn
		setBoard(newBoard)
		// Cambiar el turno
		const newTurn = turn === Turns.X ? Turns.O : Turns.X
		setTurn(newTurn)
		// revisar si hay ganador
		const newWinner = checkWinner(newBoard)
		if (newWinner) {
			setWinner(newWinner)
		} else if (checkEndGame(newBoard)) {
			setWinner(false)
		}

	}

	return (
		<main className='board'>
			<h1>Tic tac toe</h1>
			<button onClick={resetGame}>Emprezar de Nuevo</button>
			<section className="game">
				{
					board.map((square, index) => {
						return (
							<Square
								key={index}
								index={index}
								updateBoard={updateBoard}
							>
								{square}
							</Square>
						)
					})
				}
			</section>
			<section className="turn">
				<Square isSelected={turn === Turns.X}>
					{Turns.X}
				</Square>
				<Square isSelected={turn === Turns.O}>
					{Turns.O}
				</Square>
			</section>
			{
				winner !== null && (
					<section className="winner">
						<div className="text">
							<h2>
								{
									winner === false
										? 'Empate'
										: 'Ganó'
								}
							</h2>
							<header className="win">
								{winner && <Square>{winner}</Square>}
							</header>
							<footer>
								<button onClick={resetGame}>Empezar de Nuevo</button>
							</footer>
						</div>
					</section>
				)
			}
		</main>
	)
}

export default App
