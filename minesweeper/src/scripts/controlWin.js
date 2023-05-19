export function controlWin(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (!board[i][j].isOpened && !board[i][j].isBomb) {
        return false;
      }
    }
  }
  return true;
}