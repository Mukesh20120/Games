import React, { useState } from "react";
import {
  checkWinner,
  findBestMove,
  getWinningCombination,
} from "../../../utils/TicTacToeAlgorithm";
import { useLocation } from "react-router";

const initializeArray = new Array(9).fill(null);

export default function TicTacToe() {
  const location = useLocation();
  const {difficulty,playerSymbol,botSymbol} = location.state;
  // console.log({gameMode,difficulty,playerSymbol});
  const [allSquare, setAllSquare] = useState(initializeArray);
  const [isPlayerTurn, setPlayerTurn] = useState(true);
  const [isWinner, setIsWinner] = useState(null);
  const [winningSquares, setWinningSquares] = useState([]);
  const [isDraw, setIsDraw] = useState(false);

  const handleOnClick = (index) => {
    if (allSquare[index] !== null || isWinner || !isPlayerTurn) return;

    const newSquares = [...allSquare];
    newSquares[index] = playerSymbol;

    const winner = checkWinner(newSquares);
    setAllSquare(newSquares);

    if (winner) {
      setIsWinner(winner);
      setWinningSquares(getWinningCombination(newSquares, winner));
      return;
    }
    if (!newSquares.includes(null)) {
      setIsDraw(true);
      return;
    }
    setPlayerTurn(false); // now it's bot's turn

    setTimeout(() => {
      const botMove = findBestMove(newSquares,difficulty,playerSymbol,botSymbol);
      if (botMove === -1) return;

      newSquares[botMove] = botSymbol;
      const winnerAfterBot = checkWinner(newSquares);

      setAllSquare(newSquares);

      if (winnerAfterBot) {
        setIsWinner(winnerAfterBot);
        setWinningSquares(getWinningCombination(newSquares, winnerAfterBot));
      } else if (!newSquares.includes(null)) {
        setIsDraw(true);
      } else {
        setPlayerTurn(true);
      }
    }, 400);
  };

  const handleOnReset = () => {
    setAllSquare(initializeArray);
    setPlayerTurn(true);
    setIsWinner(null);
    setWinningSquares([]);
    setIsDraw(false);
  };

  let statusMessage = "";
  let statusClass = "";

  if (isWinner) {
    statusMessage = `🎉 Winner: ${isWinner} 🥇`;
    statusClass = "text-green-600";
  } else if (isDraw) {
    statusMessage = `🤝 It’s a Draw!`;
    statusClass = "text-yellow-600";
  } else if (!isPlayerTurn) {
    statusMessage = `🤖 Bot is thinking...`;
    statusClass = "text-blue-500 animate-pulse";
  } else {
    statusMessage = `Turn: Player (${playerSymbol})`;
    statusClass = "text-blue-600";
  }

  return (
    <div className="flex flex-col justify-center items-center h-full bg-slate-50 p-6">
      <div className="text-center mb-6 min-h-[48px] flex items-center justify-center">
        <h1 className={`text-2xl font-bold ${statusClass}`}>{statusMessage}</h1>
      </div>

      <div className="grid grid-cols-3 gap-3 my-5">
        {allSquare.map((square, index) => (
          <div
            key={index}
            className={`w-24 h-24 rounded-lg flex justify-center items-center text-4xl font-bold cursor-pointer border-2 transition 
              ${
                winningSquares.includes(index)
                  ? "border-green-500 bg-green-100 text-green-700"
                  : "border-gray-300 bg-white hover:bg-blue-50"
              }`}
            onClick={() => handleOnClick(index)}
          >
            {square}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition"
          onClick={handleOnReset}
        >
          🔄 Reset Game
        </button>
      </div>
    </div>
  );
}
