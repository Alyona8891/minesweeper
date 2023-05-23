export function createArrBoard(rows, cols, bombs) {
  const arrBoard = [];
  for (let i = 0; i < rows; i += 1) {
    arrBoard.push([]);
    for (let j = 0; j < cols; j += 1) {
      arrBoard[i].push({
        row: i,
        col: j,
        isBomb: false,
        isOpened: false,
        isFlagged: false,
        bombsAround: 0,
      });
    }
  }
  let bombsPlaced = 0;
  while (bombsPlaced < bombs) {
    const randomRow = Math.floor(Math.random() * rows);
    const randomCol = Math.floor(Math.random() * cols);
    if (!arrBoard[randomRow][randomCol].isBomb) {
      arrBoard[randomRow][randomCol].isBomb = true;
      bombsPlaced += 1;
    }
  }
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      let bombsAround = 0;
      if (i > 0 && j > 0 && arrBoard[i - 1][j - 1].isBomb) {
        bombsAround += 1;
      }
      if (i > 0 && arrBoard[i - 1][j].isBomb) {
        bombsAround += 1;
      }
      if (i > 0 && j < cols - 1 && arrBoard[i - 1][j + 1].isBomb) {
        bombsAround += 1;
      }
      if (j > 0 && arrBoard[i][j - 1].isBomb) {
        bombsAround += 1;
      }
      if (j < cols - 1 && arrBoard[i][j + 1].isBomb) {
        bombsAround += 1;
      }
      if (i < rows - 1 && j > 0 && arrBoard[i + 1][j - 1].isBomb) {
        bombsAround += 1;
      }
      if (i < rows - 1 && arrBoard[i + 1][j].isBomb) {
        bombsAround += 1;
      }
      if (i < rows - 1 && j < cols - 1 && arrBoard[i + 1][j + 1].isBomb) {
        bombsAround += 1;
      }
      arrBoard[i][j].bombsAround = bombsAround;
    }
  }
  return arrBoard;
}
