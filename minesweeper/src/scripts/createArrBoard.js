export function createArrBoard(rows, cols, bombs) {
  let arrBoard = [];
  for (let i = 0; i < rows; i++) {
   arrBoard.push([]);
    for (let j = 0; j < cols; j++) {
      arrBoard[i].push({
        row: i,
        col: j,
        isBomb: false,
        isOpened: false,
        isFlagged: false,
        bombsAround: 0
      });
    }
  }
  let bombsPlaced = 0;
  while (bombsPlaced < bombs) {
    let randomRow = Math.floor(Math.random() * rows);
    let randomCol = Math.floor(Math.random() * cols);
    if (!arrBoard[randomRow][randomCol].isBomb) {
      arrBoard[randomRow][randomCol].isBomb = true;
      bombsPlaced++;
    }
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let bombsAround = 0;
      if (i > 0 && j > 0 && arrBoard[i - 1][j - 1].isBomb) {
        bombsAround++;
      }
      if (i > 0 && arrBoard[i - 1][j].isBomb) {
        bombsAround++;
      }
      if (i > 0 && j < cols - 1 && arrBoard[i - 1][j + 1].isBomb) {
        bombsAround++;
      }
      if (j > 0 && arrBoard[i][j - 1].isBomb) {
        bombsAround++;
      }
      if (j < cols - 1 && arrBoard[i][j + 1].isBomb) {
        bombsAround++;
      }
      if (i < rows - 1 && j > 0 && arrBoard[i + 1][j - 1].isBomb) {
        bombsAround++;
      }
      if (i < rows - 1 && arrBoard[i + 1][j].isBomb) {
        bombsAround++;
      }
      if (i < rows - 1 && j < cols - 1 && arrBoard[i + 1][j + 1].isBomb) {
        bombsAround++;
      }
      arrBoard[i][j].bombsAround = bombsAround;
    }
  }
  return arrBoard;
}