const game = (function game() {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  let currentPlayer = { id: 1, symbol: 'x' };
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
  const changeGameProperties = function () {
    game.gameOver = true;
    game.winner = game.currentPlayer.symbol;
    return true;
  };

  const checkMatch = function () {
    // colomns match
    const checkCol = function () {
      for (let i = 0; i < 3; i++) {
        if (
          game.board[i][0] == game.board[i][1] &&
          game.board[i][1] == game.board[i][2] &&
          game.board[i][0] != ''
        ) {
          play.changeGameProperties();
        }
      }
    };

    // rows match
    const checkRow = function () {
      for (let i = 0; i < 3; i++) {
        if (
          game.board[0][i] == game.board[1][i] &&
          game.board[1][i] == game.board[2][i] &&
          game.board[0][i] != ''
        ) {
          play.changeGameProperties();
        }
      }
    };

    // diagnols match
    const checkDiagnol = function () {
      if (
        game.board[0][0] == game.board[1][1] &&
        game.board[1][1] == game.board[2][2] &&
        game.board[0][0] != ''
      ) {
        play.changeGameProperties();
      }

      if (
        game.board[0][2] == game.board[1][1] &&
        game.board[1][1] == game.board[2][0] &&
        game.board[0][2] != ''
      ) {
        play.changeGameProperties();
      }
    };

    // checks for matching in minimal attemps
    if (checkCol()) return;
    if (checkRow()) return;
    if (checkDiagnol()) return;
  };

  // mark moves on interal gameboard
  const changeGameBoard = function (row, col) {
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        if (i == row && j == col) {
          game.board[row - 1][col - 1] = game.currentPlayer.symbol;
        }
      }
    }
  };

  // swap between default players
  const changePlayers = function () {
    game.currentPlayer.symbol == 'x'
      ? (game.currentPlayer.symbol = 'o')
      : (game.currentPlayer.symbol = 'x');
  };

  const makeMove = function (row, col, cell) {
    // stops the game when maching or ties
    if (game.gameOver || game.tie) {
      return;
    }

    // change internal gameboard
    play.changeGameBoard(row, col);

    // check for matches and ties
    play.checkMatch();
    play.checkTie();

    // display cell symbol
    displayController.displayMove(cell);

    // change players
    play.changePlayers();

    // display stats
    if (game.gameOver || game.tie) {
      displayController.displayStats(
        `GameOver: ${game.gameOver}, Tie: ${game.tie}, Winner: ${
          game.tie ? null : game.winner
        }`
      );
    }
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
    }
  };

  return {
    checkMatch,
    changePlayers,
    makeMove,
    checkTie,
    changeGameBoard,
    changeGameProperties,
  };
})();

const displayController = (function () {
  const gameBoardEl = document.getElementById('gameboard');
  const statsEl = document.getElementById('stats');

  const displayMove = function (cell) {
    // mark cell as checked after displaying symbol
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
      if (!currentCell.dataset.checked) {
        play.makeMove(row, col, currentCell);
      }
    });
  };

  return { initiateGame, displayMove, displayStats };
})();

displayController.initiateGame();
