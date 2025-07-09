import React, { useState } from "react";
import { useNavigate } from "react-router";

const GameSettings = () => {
  const [gameMode, setGameMode] = useState("Player vs AI");
  const [difficulty, setDifficulty] = useState("");
  const [playerSymbol, setPlayerSymbol] = useState("");
  const navigate = useNavigate();
  const handleStartGame = () => {
    const botSymbol = playerSymbol === 'X'?'O':'X';
    navigate('/tictactoe/play',{state: {gameMode,difficulty,playerSymbol,botSymbol}});
  };

  return (
    <div
      className="relative flex min-h-screen flex-col bg-slate-50 overflow-x-hidden"
      style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
    >
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="flex flex-col w-[512px] max-w-[512px] py-5 flex-1">
          <h2 className="text-[28px] font-bold text-center pb-3 pt-5">
            Game Mode
          </h2>

          <div className="flex px-4 py-3">
            <div className="flex h-10 flex-1 items-center justify-center rounded-xl bg-[#e7edf4] p-1">
              {["Player vs AI", "Player vs Player"].map((mode) => (
                <label
                  key={mode}
                  className={`flex cursor-pointer h-full grow items-center justify-center rounded-xl px-2 text-sm font-medium ${
                    gameMode === mode
                      ? "bg-slate-50 shadow-[0_0_4px_rgba(0,0,0,0.1)] text-[#0d141c]"
                      : "text-[#49739c]"
                  }`}
                >
                  <span className="truncate">{mode}</span>
                  <input
                    type="radio"
                    name="gameMode"
                    className="hidden"
                    value={mode}
                    checked={gameMode === mode}
                    onChange={() => setGameMode(mode)}
                  />
                </label>
              ))}
            </div>
          </div>

          <h3 className="text-lg font-bold px-4 pb-2 pt-4">AI Difficulty</h3>
          <div className="flex flex-wrap gap-3 p-4">
            {["Easy", "Medium", "Hard"].map((level) => (
              <label
                key={level}
                className={`text-sm font-medium flex items-center justify-center rounded-xl border border-[#cedbe8] px-4 h-11 text-[#0d141c] cursor-pointer ${
                  difficulty === level
                    ? "border-[3px] border-[#3d98f4] px-3.5"
                    : ""
                }`}
              >
                {level}
                <input
                  type="radio"
                  name="difficulty"
                  className="hidden"
                  value={level}
                  checked={difficulty === level}
                  onChange={() => setDifficulty(level)}
                />
              </label>
            ))}
          </div>

          <h3 className="text-lg font-bold px-4 pb-2 pt-4">Player Symbol</h3>
          <div className="flex flex-wrap gap-3 p-4">
            {["X", "O"].map((symbol) => (
              <label
                key={symbol}
                className={`text-sm font-medium flex items-center justify-center rounded-xl border border-[#cedbe8] px-4 h-11 text-[#0d141c] cursor-pointer ${
                  playerSymbol === symbol
                    ? "border-[3px] border-[#3d98f4] px-3.5"
                    : ""
                }`}
              >
                {symbol}
                <input
                  type="radio"
                  name="playerSymbol"
                  className="hidden"
                  value={symbol}
                  checked={playerSymbol === symbol}
                  onChange={() => setPlayerSymbol(symbol)}
                />
              </label>
            ))}
          </div>

          <div className="flex px-4 py-3 justify-center">
            <button
              onClick={handleStartGame}
              className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-[#3d98f4] text-slate-50 text-sm font-bold tracking-[0.015em]"
            >
              <span className="truncate">Start Game</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSettings;
