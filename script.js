/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */

const Gameboard = () => {
  const board = Array(9).fill("");

  const resetBoard = () => board.fill("");

  const setCell = (index, mark) => {
    board[index] = mark;
    console.log(board);
  };

  const checkForWin = (mark) => {
    console.log("mark", mark);
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

    // return [0, 1, 2].every((index) => board[index] === mark);

    const win = winConditions.find((winCondition) =>
      winCondition.every((index) => board[index] === mark)
    );
    if (win === undefined) {
      return false;
    }
    return true;
  };

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

// const Cell = () => {
//   let value = 0;
//   const addMark = (mark) => {
//     value = mark;
//   };
//   const getValue = () => value;
//   return {
//     addMark,
//     getValue,
//   };
// };

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

  const playRound = (clickedCellIndex) => {
    console.log(`It is ${currentPlayer.getName()}'s turn.`);
    board.setCell(clickedCellIndex, currentPlayer.getMark()); // not working
    console.log(currentPlayer.getMark());
    const foo = board.checkForWin(currentPlayer.getMark());
    console.log(foo);
    console.log(board.getBoard());
    // check for tie
    switchPlayer();
    // board.resetBoard(); reset if win or tie
  };

  const getCurrentPlayerName = () => currentPlayer.getName();
  const getCurrentPlayerMark = () => currentPlayer.getMark();

  return {
    switchPlayer,
    playRound,
    getCurrentPlayerMark,
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

  const currentPlayer = game.getCurrentPlayerName();
  const currentPlayerMark = game.getCurrentPlayerMark();

  console.log("showUI");
  let board = game.getBoard();
  board.forEach((cell, index) => {
    const cellBtn = document.createElement("button");
    cellBtn.classList.add("cell");
    cellBtn.dataset.cell = index;
    boardDiv.appendChild(cellBtn);
  });

  const clickHandlerBoard = (e) => {
    const clickedCellIndex = e.target.dataset.cell;
    console.log(clickedCellIndex);

    // document.querySelector(`[data-cell='${clickedCellIndex}']`).textContent =
    //   game.getCurrentPlayerMark();
    updateScreen(clickedCellIndex);
    // debugger;

    game.playRound(clickedCellIndex);

    // updateScreen();
  };

  const cells = Array.from(boardDiv.children);
  cells.forEach((cell) => {
    cell.addEventListener("click", clickHandlerBoard);
  });

  const updateScreen = (clickedCellIndex) => {
    // boardDiv.textContent = "";
    document.querySelector(`[data-cell='${clickedCellIndex}']`).textContent =
      game.getCurrentPlayerMark();
    playerTurnDiv.textContent = `${game.getCurrentPlayerMark()}'s turn!`;
  };

  return {
    game,
    board,
    clickHandlerBoard,
    currentPlayer,
    updateScreen,
  };
})();
