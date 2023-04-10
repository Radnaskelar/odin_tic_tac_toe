/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */

const gameboard = (() => {
  const board = Array(9).fill(null);

  const resetBoard = () => board.fill(null);

  const setCell = (index, mark) => {
    board[index] = mark;
  };

  const checkForWin = (mark) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const win = winConditions.find((winCondition) =>
      winCondition.every((index) => board[index] === mark)
    );
    if (win === undefined) {
      return false;
    }
    displayController.displayWinner();
    return true;
  };

  const checkForTie = (board) => {
    if (board.every((cell) => cell !== null)) {
      alert("Tie.");
      return true;
    }
  };

  const getBoard = () => [...board];

  return {
    resetBoard,
    setCell,
    checkForWin,
    checkForTie,
    getBoard,
  };
})();

const Player = (mark, name) => {
  const getMark = () => mark;
  const getName = () => name;

  return {
    getMark,
    getName,
  };
};

const gameController = (() => {
  const board = gameboard;

  const playerX = Player("X", "Player 1");
  const playerO = Player("O", "Player 2");

  let currentPlayer = playerX;

  const switchPlayer = () => {
    if (currentPlayer === playerX) {
      currentPlayer = playerO;
    } else {
      currentPlayer = playerX;
    }
  };

  const playRound = (clickedCellIndex) => {
    board.setCell(clickedCellIndex, currentPlayer.getMark());
    if (board.checkForWin(currentPlayer.getMark())) {
      displayController.restartDisplay();
      return;
    }
    if (board.checkForTie(board.getBoard())) {
      displayController.restartDisplay();
      return;
    }
    displayController.display();
    switchPlayer();
  };

  const getCurrentPlayerName = () => currentPlayer.getName();
  const getCurrentPlayerMark = () => currentPlayer.getMark();

  const restartGame = () => {
    gameboard.resetBoard();
    currentPlayer = playerX;
  };

  return {
    switchPlayer,
    playRound,
    getCurrentPlayerMark,
    getCurrentPlayerName,
    restartGame,
    setCell: board.setCell,
    getBoard: board.getBoard,
    checkForWin: board.checkForWin,
    // display winner
  };
})();

const displayController = (() => {
  const game = gameController;
  let boardDiv = document.querySelector(".game-board");
  let playerTurnDiv = document.querySelector("p");
  display();

  const restartDisplay = () => {
    game.restartGame();
    cells.forEach((cell) => (cell.textContent = ""));
    // run display
    display();
  };

  function display() {
    playerTurnDiv.textContent = `${game.getCurrentPlayerName()}'s turn.`;
  }

  const displayWinner = () => {
    alert(`${game.getCurrentPlayerName()} won!`);
  };

  const restartButton = document.querySelector("#restartButton");
  restartButton.addEventListener("click", restartDisplay);

  let board = game.getBoard();
  board.forEach((cell, index) => {
    const cellBtn = document.createElement("button");
    cellBtn.classList.add("cell");
    cellBtn.dataset.cell = index;
    boardDiv.appendChild(cellBtn);
  });

  const clickHandlerBoard = (e) => {
    if (e.target.textContent === "") {
      const clickedCellIndex = e.target.dataset.cell;
      updateScreen(clickedCellIndex);

      game.playRound(clickedCellIndex);
      // run display
      display();
    }
  };

  const cells = Array.from(boardDiv.children);
  cells.forEach((cell) => {
    cell.addEventListener("click", clickHandlerBoard);
  });

  const updateScreen = (clickedCellIndex) => {
    document.querySelector(`[data-cell='${clickedCellIndex}']`).textContent =
      game.getCurrentPlayerMark();
  };

  return {
    display,
    displayWinner,
    restartDisplay,
    clickHandlerBoard,
    updateScreen,
  };
})();

// player names as inputs
// color mark winner as green
