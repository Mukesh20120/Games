// Create an empty Sudoku board with cell objects
export function InitializeArray() {
  const initialArray = [];
  for (let i = 0; i < 9; i++) {
    initialArray.push(
      new Array(9).fill(0).map(() => ({
        value: null,
        editable: true,
        error: false,
      }))
    );
  }
  return initialArray;
}
// Check if placing num at (row, col) is safe
export function isSafe(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x].value === num) return false;
    if (board[x][col].value === num) return false;

    const boxStartRow = 3 * Math.floor(row / 3) + Math.floor(x / 3);
    const boxStartCol = 3 * Math.floor(col / 3) + (x % 3);
    if (board[boxStartRow][boxStartCol].value === num) return false;
  }
  return true;
}
// Generate a fully solved Sudoku board
export function generateCompleteSudoku() {
  const board = InitializeArray();

  const fillBoard = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col].value === null) {
          const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(
            () => Math.random() - 0.5
          );

          for (let num of numbers) {
            if (isSafe(board, row, col, num)) {
              board[row][col].value = num;
              board[row][col].editable = false;

              if (fillBoard()) return true;
              board[row][col].value = null;
            }
          }

          return false; // no valid number found
        }
      }
    }
    return true; // fully filled
  };

  fillBoard();
  return board;
}
// Generate a puzzle by removing cells based on difficulty
export function generateSudokuPuzzle(difficulty = "easy") {
  const fullBoard = generateCompleteSudoku();

  let cellsToRemove;
  switch (difficulty) {
    case "easy":
      cellsToRemove = 35;
      break;
    case "medium":
      cellsToRemove = 45;
      break;
    case "hard":
      cellsToRemove = 55;
      break;
    case "expert":
      cellsToRemove = 60;
      break;
    default:
      cellsToRemove = 35;
  }

  while (cellsToRemove > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (fullBoard[row][col].value !== null) {
      fullBoard[row][col].value = null;
      fullBoard[row][col].editable = true;
      cellsToRemove--;
    }
  }

  return fullBoard;
}
