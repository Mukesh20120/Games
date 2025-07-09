import React, { useCallback, useEffect, useState } from "react";
import { generateSudokuPuzzle, isSafe } from "../../../utils/SudokuAlgorithm";

export default function Sudoku() {
  const [sudokuBoard, setSudokuBoard] = useState(generateSudokuPuzzle("easy"));
  const [selectedCoords, setSelectedCoords] = useState({ x: 1, y: 1 });
  const [currentCoords, setCurrentCoords] = useState({ x: 1, y: 1 });
  const [difficulty, setDifficulty] = useState("easy");
  const [isSolving, setIsSolving] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const solveSudoku = async (board) => {
    const findEmpty = (board) => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col].value === null) {
            return { row, col };
          }
        }
      }
      return null;
    };

    const solveRecursive = async (currentBoard) => {
      const emptyCell = findEmpty(currentBoard);
      if (!emptyCell) return true; // done

      const { row, col } = emptyCell;
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      for (let num of numbers) {
        if (isSafe(currentBoard, row, col, num)) {
          // clone board
          const newBoard = currentBoard.map((r) => r.map((c) => ({ ...c })));
          newBoard[row][col].value = num;
          newBoard[row][col].error = false;

          // update board in UI
          setSudokuBoard(newBoard);
          await sleep(20);

          const solved = await solveRecursive(newBoard);
          if (solved) return true;

          // backtrack: set to null
          newBoard[row][col].value = null;
          setSudokuBoard(newBoard);
          await sleep(20);
        }
      }

      return false;
    };

    return await solveRecursive(board);
  };

  //handling the click
  const handleValueClick = useCallback(
    (val) => {
      const { x, y } = selectedCoords;
      const selectedCell = sudokuBoard[x][y];
      if (!selectedCell.editable) return;

      // Validate the value and update errors
      const isValid = isSafe(sudokuBoard, x, y, val);

      const newBoard = sudokuBoard.map((row, ri) =>
        row.map((cell, ci) =>
          ri === x && ci === y
            ? {
                ...cell,
                value: val === "x" ? null : val,
              }
            : cell
        )
      );

      newBoard[x][y].error = !isValid;

      setSudokuBoard(newBoard);
    },
    [sudokuBoard, selectedCoords]
  );

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= "1" && e.key <= "9") {
        handleValueClick(Number(e.key));
      } else if (["Backspace", "Delete", "x", "X"].includes(e.key)) {
        handleValueClick("x");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleValueClick]);

  // Utility function for cell classNames
  const getCellClassNames = (ri, ci) => {
    const isSelected = selectedCoords.x === ri && selectedCoords.y === ci;
    const isCurrent = currentCoords.x === ri || currentCoords.y === ci;
    const { error, editable } = sudokuBoard[ri][ci];

    let baseClasses =
      "w-12 h-12 flex items-center justify-center text-lg font-semibold border cursor-pointer transition-all duration-300 rounded-sm";

    // Grid border lines
    const borders = [
      (ci + 1) % 3 === 0 && ci !== 8 ? "border-r-2 border-r-indigo-500" : "",
      ci % 3 === 0 && ci !== 0 ? "border-l-2 border-l-indigo-500" : "",
      (ri + 1) % 3 === 0 && ri !== 8 ? "border-b-2 border-b-indigo-500" : "",
      ri % 3 === 0 && ri !== 0 ? "border-t-2 border-t-indigo-500" : "",
      ci === 0 ? "border-black border-l-2" : "",
      ri === 0 ? "border-black border-t-2" : "",
      ci === 8 ? "border-black border-r-2" : "",
      ri === 8 ? "border-black border-b-2" : "",
    ].join(" ");

    // Priority states
    let stateClasses = "";
    if (isSelected) {
      stateClasses = "bg-indigo-500 border-black text-white";
    } else if (error) {
      stateClasses = "bg-red-500 border-black text-white";
    } else if (isCurrent) {
      stateClasses = "bg-indigo-100";
    } else if (!editable) {
      stateClasses = "bg-gray-200 border-black text-gray-700";
    } else {
      stateClasses = "bg-white text-gray-700";
    }

    return `${baseClasses} ${borders} ${stateClasses}`;
  };

  //reset the board
  const handleResetBoard = () => {
    const newBoard = sudokuBoard.map((row) =>
      row.map((cell) => (cell.editable ? { ...cell, value: null } : cell))
    );
    setSudokuBoard(newBoard);
  };

  return (
    <div className="flex bg-gray-100 overflow-hidden">
      {/* Left control panel */}
      <div className="flex flex-col gap-4 p-6 bg-white shadow-md border-r border-gray-200 w-64">
        <h2 className="text-2xl font-bold text-indigo-700">Controls</h2>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Difficulty:
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        <button
          disabled={isSolving}
          onClick={handleResetBoard}
          className={`px-5 py-2 rounded-md bg-red-500 text-white font-medium transition-all shadow-sm 
        ${isSolving ? "cursor-not-allowed opacity-60" : "hover:bg-red-600"}
      `}
        >
          Reset
        </button>

        <button
          disabled={isSolving}
          onClick={() => setSudokuBoard(generateSudokuPuzzle(difficulty))}
          className={`px-5 py-2 rounded-md bg-blue-500 text-white font-medium transition-all shadow-sm 
        ${isSolving ? "cursor-not-allowed opacity-60" : "hover:bg-blue-600"}
      `}
        >
          Random Fill
        </button>

        <button
          disabled={isSolving}
          onClick={async () => {
            setIsSolving(true);
            await new Promise((resolve) => setTimeout(resolve, 0));
            await solveSudoku(sudokuBoard);
            setIsSolving(false);
          }}
          className="px-5 py-2 rounded-md bg-green-500 text-white font-medium hover:bg-green-600 transition-all shadow-sm 
        cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSolving ? "Solving..." : "Solve"}
        </button>
      </div>

      {/* Right content area */}
      <div className="flex flex-col items-center justify-center flex-1 gap-6">
        <h1 className="text-3xl font-bold text-indigo-700 drop-shadow-sm">
          Sudoku Board
        </h1>

        {/* Sudoku Board */}
        <div className="p-3 bg-white shadow-lg border border-gray-300">
          {sudokuBoard.map((row, ri) => (
            <div key={ri} className="flex">
              {row.map((col, ci) => (
                <div
                  key={ci}
                  onMouseOver={() => {
                    if (!isSolving) setCurrentCoords({ x: ri, y: ci });
                  }}
                  onClick={() => {
                    if (!isSolving) setSelectedCoords({ x: ri, y: ci });
                  }}
                  className={`${getCellClassNames(ri, ci)} ${
                    isSolving
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer"
                  }`}
                >
                  {col.value || ""}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Number Buttons */}
        <div className="flex flex-wrap gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "x"].map((val, idx) => (
            <button
              key={idx}
              disabled={isSolving}
              onClick={() => handleValueClick(val)}
              className={`px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 font-medium transition-all shadow-sm
            ${
              isSolving
                ? "cursor-not-allowed opacity-60"
                : "hover:bg-indigo-500 hover:text-white"
            }
          `}
            >
              {val}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
