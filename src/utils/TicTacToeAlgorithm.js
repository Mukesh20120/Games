const winnerPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const getWinningCombination = (squares) => {
  for (let pattern of winnerPattern) {
    const [a, b, c] = pattern;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return pattern;
    }
  }
  return [];
};


export function checkWinner(allSquare = []) {
  for (let i = 0; i < winnerPattern.length; i++) {
    const [a, b, c] = winnerPattern[i];
    if (
      allSquare[a] &&
      allSquare[a] === allSquare[b] &&
      allSquare[a] === allSquare[c]
    ) {
      return allSquare[a];
    }
  }
  return null;
}

export function findWinnerScore(board, player, bot) {
  for (let pattern of winnerPattern) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      if (board[a] === bot) return 10;
      if (board[a] === player) return -10;
    }
  }
  return null;
}


function MinMaxAlgo(board = [], depth, isMax, player, bot) {
  const score = findWinnerScore(board, player, bot);
  if (score !== null) return score;
  if (!board.includes(null) || depth === 0) return 0;

  if (isMax) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = bot;
        let botScore = MinMaxAlgo(board, depth - 1, false, player, bot);
        board[i] = null;
        best = Math.max(best, botScore);
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = player;
        let playerScore = MinMaxAlgo(board, depth - 1, true, player, bot);
        board[i] = null;
        best = Math.min(best, playerScore);
      }
    }
    return best;
  }
}

export function findBestMove(board = [], diff, player, bot) {
  let depth = 9;
  if (diff === "Easy") {
    depth = 2;
  } else if (diff === "Medium") {
    depth = 4;
  } else if (diff === "Hard") {
    depth = 9;
  }
 
  let bestScore = -Infinity;
  let bestIndex = -1;

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = bot;
      let score = MinMaxAlgo(board, depth, false, player, bot);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestIndex = i;
      }
    }
  }

  return bestIndex;
}