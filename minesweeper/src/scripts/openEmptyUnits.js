export function openEmptyUnits(theme, board, row, col) {
  if (row < 0 || col < 0 || row >= board.length || col >= board[0].length) {
    return;
  }
  if (board[row][col].isOpened || board[row][col].isFlagged || board[row][col].isBomb)
  {
    return;
  }
  board[row][col].isOpened = true;
  
  let units = document.querySelectorAll('.game-board__unit');
  for (let i = 0; i < units.length; i++) {
    let row1 = parseInt(units[i].dataset.row);
    let col1 = parseInt(units[i].dataset.col);
    if(row1 === row && col1 === col) {
      units[i].innerText = board[row][col].bombsAround;
      if(theme === 'light') {
        units[i].classList.add('game-board__unit_opened');
        units[i].classList.remove('game-board__unit_flagged');
      } else {
        units[i].classList.add('game-board__unit_opened-dark');
        units[i].classList.remove('game-board__unit_flagged-dark');
      }

      if(board[row][col].bombsAround === 0) {
       units[i].classList.add('game-board__unit_opened-null');
     }
     if(board[row][col].bombsAround === 1) {
      units[i].classList.add('game-board__unit_opened-one');
     }
     if(board[row][col].bombsAround === 2) {
      units[i].classList.add('game-board__unit_opened-two');
     }
     if(board[row][col].bombsAround === 3) {
      units[i].classList.add('game-board__unit_opened-three');
     }
     if(board[row][col].bombsAround === 4) {
      units[i].classList.add('game-board__unit_opened-four');
     }
     if(board[row][col].bombsAround === 5) {
      units[i].classList.add('game-board__unit_opened-five');
     }
     if(board[row][col].bombsAround === 6) {
      units[i].classList.add('game-board__unit_opened-six');
     }
     if(board[row][col].bombsAround === 7) {
      units[i].classList.add('game-board__unit_opened-seven');
     }
     if(board[row][col].bombsAround === 8) {
      units[i].classList.add('game-board__unit_opened-eight');
     }
    }
  }
  if (board[row][col].bombsAround === 0) {
    openEmptyUnits(theme, board, row - 1, col - 1);
    openEmptyUnits(theme, board, row - 1, col);
    openEmptyUnits(theme, board, row - 1, col + 1);
    openEmptyUnits(theme, board, row, col - 1);
    openEmptyUnits(theme, board, row, col + 1);
    openEmptyUnits(theme, board, row + 1, col - 1);
    openEmptyUnits(theme, board, row + 1, col);
    openEmptyUnits(theme, board, row + 1, col + 1);
  }
}