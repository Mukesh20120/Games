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

function findWinnerScore(allSquare = []){
  const winner = checkWinner(allSquare);
  if(winner==='X')return -10;
  else if(winner === 'O')return 10;
  return null;
}

function MinMaxAlgo(board=[],isMax){
   //base
   let score  = findWinnerScore(board);
   if(score)return score;
   if(!board.includes(null))return 0;

   if(isMax){
     let best = -Infinity;
     for(let i=0;i<9;i++){
        if(!board[i]){
            board[i] = 'O';//bot
            let botScore = MinMaxAlgo(board,false);
            board[i] = null;
            best = Math.max(best,botScore);
        }
     }
    return best;
   }
   else{
     let best = Infinity;
     for(let i=0;i<9;i++){
        if(!board[i]){
            board[i] = 'X';//player
            let playerScore = MinMaxAlgo(board,true);
            board[i] = null;
            best = Math.min(best,playerScore);
        }
     }
    return best;
   }
}
export function findBestMove(board = []){
    let bestScore = - Infinity;
    let bestIndex = -1;

    for(let i=0;i<9;i++){
        if(board[i]===null){
            board[i] = 'O';
            let score = MinMaxAlgo(board,false);
            board[i] = null;
            if(score > bestScore){
                bestScore = score;
                bestIndex = i;
            }
        }
    }

    return bestIndex;
}