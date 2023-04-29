let currentPlayer = "X";
let moves = 0;
let boxes = document.querySelectorAll(".box");
let gameOver = false;

function playMove(box) {
  if (!gameOver && box.textContent === "") {
    box.classList.add('presionado');
    box.textContent = currentPlayer;
    moves++;
    checkForWinner();
    togglePlayer();
  }
}

function togglePlayer() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
}

function checkForWinner() {
  if (
    boxes[0].textContent !== "" &&
    boxes[0].textContent === boxes[1].textContent &&
    boxes[1].textContent === boxes[2].textContent
  ) {
    endGame(boxes[0].textContent);
  } else if (
    boxes[3].textContent !== "" &&
    boxes[3].textContent === boxes[4].textContent &&
    boxes[4].textContent === boxes[5].textContent
  ) {
    endGame(boxes[3].textContent);
  } else if (
    boxes[6].textContent !== "" &&
    boxes[6].textContent === boxes[7].textContent &&
    boxes[7].textContent === boxes[8].textContent
  ) {
    endGame(boxes[6].textContent);
  } else if (
    boxes[0].textContent !== "" &&
    boxes[0].textContent === boxes[3].textContent &&
    boxes[3].textContent === boxes[6].textContent
  ) {
    endGame(boxes[0].textContent);
  } else if (
    boxes[1].textContent !== "" &&
    boxes[1].textContent === boxes[4].textContent &&
    boxes[4].textContent === boxes[7].textContent
  ) {
    endGame(boxes[1].textContent);
  } else if (
    boxes[2].textContent !== "" &&
    boxes[2].textContent === boxes[5].textContent &&
    boxes[5].textContent === boxes[8].textContent
  ) {
    endGame(boxes[2].textContent);
  } else if (
    boxes[0].textContent !== "" &&
    boxes[0].textContent === boxes[4].textContent &&
    boxes[4].textContent === boxes[8].textContent
  ) {
    endGame(boxes[0].textContent);
  } else if (
    boxes[2].textContent !== "" &&
    boxes[2].textContent === boxes[4].textContent &&
    boxes[4].textContent === boxes[6].textContent
  ) {
    endGame(boxes[2].textContent);
  } else if (moves === 9) {
    endGame("draw");
  }
}

function endGame(winner) {
  gameOver = true;
  if (winner === "draw") {
    alert("Empate");
  } else {
    alert("Ganó el jugador " + winner);
  }
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    playMove(box);
  });
});