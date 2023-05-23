export function createGameBoard(board, gameBoard) {
  for (let i = 0; i < board.length; i += 1) {
    const row = document.createElement('div');
    row.classList.add('game-board__row');
    for (let j = 0; j < board[0].length; j += 1) {
      const unit = document.createElement('div');
      unit.classList.add('game-board__unit');
      unit.dataset.row = i;
      unit.dataset.col = j;
      row.appendChild(unit);
    }
    gameBoard.appendChild(row);
  }
}
