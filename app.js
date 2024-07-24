const gameBoard = (function gameBoard() {
  const board = [
    ['x', '', ''],
    ['x', '', ''],
    ['x', '', ''],
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

  function checkGameOver() {
    // checkColumns
    // [0][0], [0][1], [0][2]
    // [1][0], [1][1], [1][2]
    // [2][0], [2][1], [2][2]
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] == this.board[i][1] &&
        this.board[i][1] == this.board[i][2] &&
        this.board[i][0] != ''
      ) {
        return true;
      }
    }

    // checkRows
    // [0][0], [1][0], [2][0]
    // [0][1], [1][1], [2][1]
    // [0][2], [1][2], [2][2]
    for (let i = 0; i < 3; i++) {
      if (
        this.board[0][i] == this.board[1][i] &&
        this.board[1][i] == this.board[2][i] &&
        this.board[0][i] != ''
      ) {
        return true;
      }
    }

    // checkDiagnols
    // 0][0], [1][1], [2][2]
    // [0][2], [1][1], [2][0]
    if (
      (this.board[0][0] == this.board[1][1] &&
        this.board[1][1] == this.board[2][2] &&
        this.board[0][0] != '') ||
      (this.board[0][2] == this.board[1][1] &&
        this.board[1][1] == this.board[2][0] &&
        this.board[0][2] != '')
    ) {
      return true;
    }

    return false;
  }

  return { board, playMove, checkGameOver };
})();

console.log(gameBoard.board);

console.log(gameBoard.checkGameOver());
