import React, { useState } from "react";
import { checkWinner, findBestMove } from "./utils/Algorithm";

const initalizeArray = new Array(9).fill(null);

const player = "X";
const bot = "O";

export default function App() {
  const [allSquare, setAllSquare] = useState(initalizeArray);
  const [isPlayerTurn, setPlayerTurn] = useState(true);
  const [isWinner, setIsWinner] = useState(null);

  const handleOnClick = (index) => {
    //player move
    if (allSquare[index] !== null || isWinner || !isPlayerTurn) return;

    const newSquare = [...allSquare];
    newSquare[index] = player;
    const winner = checkWinner(newSquare);
    setAllSquare(newSquare);
    if (winner) {
      setIsWinner(winner);
      return;
    }

    setTimeout(() => {
      const botMove = findBestMove(newSquare);
      if (botMove === -1) return;

      newSquare[botMove] = bot;
      const winner = checkWinner(newSquare);
      setAllSquare(newSquare);

      if (winner) {
        setIsWinner(winner);
        return;
      } else {
        setPlayerTurn((prev) => !prev);
      }
    }, 500);

    setPlayerTurn((prev) => !prev);
  };

  const handleOnReset = () => {
    setAllSquare(initalizeArray);
    setPlayerTurn(true);
    setIsWinner(null);
  };

  return (
    <div className=" flex flex-col justify-center items-center h-screen">
      <div className="text-center">
        {!isWinner ? (
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Turn:{" "}
            <span className="text-blue-600">{isPlayerTurn ? player : bot}</span>
          </h1>
        ) : (
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            🎉 Winner: {isWinner} 🥇
          </h1>
        )}
      </div>
      <div className="my-5 grid grid-cols-3 grid-3">
        {allSquare.map((square, index) => (
          <div
            key={index}
            className="w-20 h-20 bg-white border border-gray-300 rounded-lg flex justify-center items-center text-3xl font-bold text-gray-700 cursor-pointer hover:bg-blue-50 transition"
            onClick={() => {
              handleOnClick(index);
            }}
          >
            {square !== null && square}
            {/* {index} */}
          </div>
        ))}
      </div>
      <div className="mt-5 ">
        <button
          className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition"
          onClick={handleOnReset}
        >
          🔄 Reset Game
        </button>
      </div>
    </div>
  );
}
