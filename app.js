const gameBoard = (function gameBoard() {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  let currentPlayerId = 1;

  let currentPlayerSymbol = 'x';

  return { board, currentPlayerId, currentPlayerSymbol };
})();

function player(id, name, symbol) {
  const changeName = function (newName) {
    gameBoard.name = newName;
  };

  return { id, name, symbol, changeName };
}

const play = (function () {
  function checkGameOver() {
    // checkColumns
    // [0][0], [0][1], [0][2]
    // [1][0], [1][1], [1][2]
    // [2][0], [2][1], [2][2]
    for (let i = 0; i < 3; i++) {
      if (
        gameBoard.board[i][0] == gameBoard.board[i][1] &&
        gameBoard.board[i][1] == gameBoard.board[i][2] &&
        gameBoard.board[i][0] != ''
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
        gameBoard.board[0][i] == gameBoard.board[1][i] &&
        gameBoard.board[1][i] == gameBoard.board[2][i] &&
        gameBoard.board[0][i] != ''
      ) {
        return true;
      }
    }

    // checkDiagnols
    // 0][0], [1][1], [2][2]
    // [0][2], [1][1], [2][0]
    if (
      (gameBoard.board[0][0] == gameBoard.board[1][1] &&
        gameBoard.board[1][1] == gameBoard.board[2][2] &&
        gameBoard.board[0][0] != '') ||
      (gameBoard.board[0][2] == gameBoard.board[1][1] &&
        gameBoard.board[1][1] == gameBoard.board[2][0] &&
        gameBoard.board[0][2] != '')
    ) {
      return true;
    }

    return false;
  }

  function changePlayers() {
    gameBoard.currentPlayerId == 1
      ? (gameBoard.currentPlayerId = 2)
      : (gameBoard.currentPlayerId = 1);

    gameBoard.currentPlayerSymbol == 'x'
      ? (gameBoard.currentPlayerSymbol = 'o')
      : (gameBoard.currentPlayerSymbol = 'x');
  }

  function playOneRound(row, col) {
    // mark move on the bord
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        if (i == row && j == col) {
          gameBoard.board[row - 1][col - 1] = gameBoard.currentPlayerSymbol;
        }
      }
    }

    if (this.checkGameOver()) console.log('game over');

    this.changePlayers();
  }

  return { checkGameOver, changePlayers, playOneRound };
})();

const player1 = player(1, 'erik', 'o');
const player2 = player(2, 'stan', 'x');

console.log(player1);

play.playOneRound(1, 2);
play.playOneRound(2, 2);
play.playOneRound(1, 1);
play.playOneRound(3, 1);
play.playOneRound(3, 3);
play.playOneRound(1, 3);

console.log(gameBoard.board);
