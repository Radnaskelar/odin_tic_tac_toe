const gameBoard = (() => {
  //   const board = ["X", "O", "X", "O"];

  const gameButtons = Array.from(
    document.querySelector(".game-board").children
  );

  //   const render = () => {
  //     gameButtons.forEach((button) => {
  //       let index = gameButtons.indexOf(button);
  //       button.textContent = board[index];
  //     });
  //   };

  const controllerBtns = Array.from(
    document.querySelector(".controller").getElementsByTagName("button")
  );

  let chosenMark = "";
  function chooseMark(event) {
    chosenMark = event.target.textContent;
    return chosenMark;
  }

  controllerBtns.forEach((controllerBtn) =>
    controllerBtn.addEventListener("click", chooseMark)
  );

  function addMark(event) {
    if (event.target.textContent === "") {
      event.target.textContent = chosenMark;
    }
  }

  gameButtons.forEach((button) => {
    button.addEventListener("click", addMark);
  });

  return {
    chooseMark,
    addMark,
  };
})();

// const Player = () => {};

// const game = (() => {})();
