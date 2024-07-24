console.log('hooked');

const gameBoard = (function gameBoard() {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  function playMove(row, col) {
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        if (i == row && j == col) {
          this.board[row - 1][col - 1] = 'x';
        }
      }
    }
  }

  return { board, playMove };
})();

gameBoard.playMove(1, 2);
gameBoard.playMove(3, 3);

console.log(gameBoard.board);
