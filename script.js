/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */

const Gameboard = () => {
  const board = new Array(9).fill(""); // board state

  const resetBoard = () => new Array(9).fill("");

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
    if (win === null) return false;
    return true;
  }; // not working

  const getBoard = () => [...board];

  return {
    resetBoard,
    setCell,
    checkForWin,
    getBoard,
  };
};

const Player = (mark, name) => {
  const getMark = () => mark;
  const getName = () => name;

  return {
    getMark,
    getName,
  };
};

const Cell = () => {
  let value = 0;
  const addMark = (mark) => {
    value = mark;
  };
  const getValue = () => value;
  return {
    addMark,
    getValue,
  };
};

const Game = () => {
  const board = Gameboard();

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

  const playRound = (clickedCell) => {
    console.log(`It is ${currentPlayer.getName()}'s turn.`);
    board.setCell(clickedCell, currentPlayer.getMark()); // not working
    console.log(currentPlayer.getMark());
    board.checkForWin(currentPlayer.getMark());
    console.log(board.checkForWin());
    // check for tie
    switchPlayer();
  };

  const getCurrentPlayerName = () => currentPlayer.getName();

  return {
    switchPlayer,
    playRound,
    getCurrentPlayerName,
    setCell: board.setCell,
    getBoard: board.getBoard,
    // display winner
  };
};

const showUI = (() => {
  const game = Game();
  let boardDiv = document.querySelector(".game-board");
  let playerTurnDiv = document.querySelector("p");
  const restartButton = document.querySelector("#restartButton");

  let currentPlayer = game.getCurrentPlayerName();
  const board = game.getBoard(); // not working
  board.forEach((cell, index) => {
    const cellBtn = document.createElement("button");
    cellBtn.classList.add("cell");
    cellBtn.dataset.cell = index;
    boardDiv.appendChild(cellBtn);
  });

  const clickHandlerBoard = (e) => {
    const clickedCell = e.target.dataset.cell;
    if (!clickedCell) return;

    game.playRound(clickedCell);
  };

  const cells = Array.from(boardDiv.children);
  cells.forEach((cell) => {
    cell.addEventListener("click", clickHandlerBoard);
  });

  const displayPlayer = () => {
    playerTurnDiv.textContent = `${currentPlayer}'s turn!`;
  };

  const resetScreen = () => {
    // clear the board on screen
    boardDiv.textContent = "";
  };

  return {
    displayPlayer,
    resetScreen,
  };
})();

showUI.displayPlayer();
