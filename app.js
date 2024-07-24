const game = (function game() {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  const currentPlayer = { id: 1, symbol: 'x' };
  let gameOver = false;
  let winner = '';
  let tie = false;

  return { board, currentPlayer, tie, gameOver, winner };
})();

// function player(id, name, symbol) {
//   const changeName = function (newName) {
//     this.name = newName;
//   };

//   return { id, name, symbol, changeName };
// }

const play = (function () {
  function checkMatch() {
    const checkCol = function () {
      for (let i = 0; i < 3; i++) {
        if (
          game.board[i][0] == game.board[i][1] &&
          game.board[i][1] == game.board[i][2] &&
          game.board[i][0] != ''
        ) {
          game.gameOver = true;
          game.winner = game.currentPlayer.symbol;
          return true;
        }
      }
    };

    const checkRow = function () {
      for (let i = 0; i < 3; i++) {
        if (
          game.board[0][i] == game.board[1][i] &&
          game.board[1][i] == game.board[2][i] &&
          game.board[0][i] != ''
        ) {
          game.gameOver = true;
          game.winner = game.currentPlayer.symbol;
          return true;
        }
      }
    };

    const checkDiagnol = function () {
      if (
        (game.board[0][0] == game.board[1][1] &&
          game.board[1][1] == game.board[2][2] &&
          game.board[0][0] != '') ||
        (game.board[0][2] == game.board[1][1] &&
          game.board[1][1] == game.board[2][0] &&
          game.board[0][2] != '')
      ) {
        game.gameOver = true;
        game.winner = game.currentPlayer.symbol;
        return true;
      }
    };

    if (checkCol()) return true;
    if (checkRow()) return true;
    if (checkDiagnol()) return true;
  }

  const changeGameBoard = function (row, col) {
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        if (i == row && j == col) {
          game.board[row - 1][col - 1] = game.currentPlayer.symbol;
        }
      }
    }
  };

  const changePlayers = function () {
    game.currentPlayer.symbol == 'x'
      ? (game.currentPlayer.symbol = 'o')
      : (game.currentPlayer.symbol = 'x');
  };

  const makeMove = function (row, col, cell) {
    if (game.gameOver || game.tie) {
      return;
    }

    play.changeGameBoard(row, col);

    play.checkMatch();
    play.checkTie();

    if (game.gameOver || game.tie) {
      displayController.displayStats(
        `GameOver: ${game.gameOver}, Tie: ${game.tie}, Winner: ${game.winner}`
      );
    }

    displayController.displayMove(cell);
    play.changePlayers();
  };

  const checkTie = function () {
    let checkedElements = 0;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (game.board[i][j] != '') checkedElements++;
      }
    }

    // tie when all cells are checked but no match
    if (checkedElements == 9) {
      game.tie = true;
      game.gameOver = true;
      return true;
    }
  };

  return {
    checkMatch,
    changePlayers,
    makeMove,
    checkTie,
    changeGameBoard,
  };
})();

const displayController = (function () {
  const gameBoardEl = document.getElementById('gameboard');
  const statsEl = document.getElementById('stats');

  const displayMove = function (cell) {
    if (!cell.dataset.checked) {
      cell.textContent = game.currentPlayer.symbol;
      cell.dataset.checked = true;
    }
  };

  const displayStats = function (stats) {
    statsEl.textContent = stats ?? '';
  };

  const initiateGame = function () {
    gameBoardEl.addEventListener('click', function (e) {
      // listen for a click events only on cells
      if (!e.target.classList.contains('cell')) return;

      // extract data
      const currentCell = e.target;
      const row = e.target.dataset.row;
      const col = e.target.dataset.col;

      // avoid playing on same cell twice
      if (!currentCell.dataset.checked && !game.gameOver && !game.tie) {
        play.makeMove(row, col, currentCell);
      }
    });
  };

  return { initiateGame, displayMove, displayStats };
})();

displayController.initiateGame();
