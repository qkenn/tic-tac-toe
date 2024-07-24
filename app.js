const game = (function game() {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  const currentPlayer = { id: 1, symbol: 'x' };

  let gameOver = false;

  return { board, currentPlayer };
})();

function player(id, name, symbol) {
  const changeName = function (newName) {
    this.name = newName;
  };

  return { id, name, symbol, changeName };
}

const play = (function () {
  function checkGameOver() {
    // checkColumns
    for (let i = 0; i < 3; i++) {
      if (
        game.board[i][0] == game.board[i][1] &&
        game.board[i][1] == game.board[i][2] &&
        game.board[i][0] != ''
      ) {
        return true;
      }
    }

    // checkRows
    for (let i = 0; i < 3; i++) {
      if (
        game.board[0][i] == game.board[1][i] &&
        game.board[1][i] == game.board[2][i] &&
        game.board[0][i] != ''
      ) {
        return true;
      }
    }

    // checkDiagnols
    if (
      (game.board[0][0] == game.board[1][1] &&
        game.board[1][1] == game.board[2][2] &&
        game.board[0][0] != '') ||
      (game.board[0][2] == game.board[1][1] &&
        game.board[1][1] == game.board[2][0] &&
        game.board[0][2] != '')
    ) {
      return true;
    }

    return false;
  }

  function changePlayers() {
    game.currentPlayer.id == 1
      ? (game.currentPlayer.id = 2)
      : (game.currentPlayer.id = 1);

    game.currentPlayer.symbol == 'x'
      ? (game.currentPlayer.symbol = 'o')
      : (game.currentPlayer.symbol = 'x');
  }

  function playOneRound(row, col, cell) {
    if (checkGameOver()) return;

    // mark symbol on the cell
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        if (i == row && j == col) {
          game.board[row - 1][col - 1] = game.currentPlayer.symbol;
        }
      }
    }

    displayController.displayMove(cell);

    if (play.checkGameOver()) {
      play.getGameStats();

      return;
    }

    play.changePlayers();
  }

  function getGameStats() {
    console.log(`You won ${game.currentPlayer.symbol}`);
  }

  return { checkGameOver, changePlayers, playOneRound, getGameStats };
})();

const player1 = player(1, 'erik', 'o');
const player2 = player(2, 'stan', 'x');

console.log(game.board);

const displayController = (function () {
  const gameBoardEl = document.getElementById('gameboard');

  const displayMove = function (cell) {
    if (!cell.dataset.checked) {
      cell.textContent = game.currentPlayer.symbol;
      cell.dataset.checked = true;
    }
  };

  const initiateGame = function () {
    gameBoardEl.addEventListener('click', function (e) {
      // listen for a click event only on cells
      if (!e.target.classList.contains('cell')) return;

      // extract data
      const currentCell = e.target;
      const row = e.target.dataset.row;
      const col = e.target.dataset.col;

      // avoid playing on same cell twice
      if (!currentCell.dataset.checked) {
        play.playOneRound(row, col, currentCell);
      }
      console.log(game.board);
    });
  };

  return { initiateGame, displayMove };
})();

displayController.initiateGame();
