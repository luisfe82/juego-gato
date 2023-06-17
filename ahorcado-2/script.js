var words = ["ahorcado", "javascript", "html", "css"];
var selectedWord = words[Math.floor(Math.random() * words.length)];
var attemptsLeft = 6;
var guessedLetters = [];

function initializeWord() {
  var wordContainer = document.getElementById("word");
  for (var i = 0; i < selectedWord.length; i++) {
    var letter = document.createElement("span");
    letter.innerText = "_";
    wordContainer.appendChild(letter);
  }
}

function updateWord(guess) {
  var wordContainer = document.getElementById("word");
  for (var i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === guess) {
      wordContainer.childNodes[i].innerText = guess;
    }
  }
}

function updateHangman() {
  var hangman = document.getElementById("hangman");
  hangman.style.backgroundImage = "url('img/hangman_" + (6 - attemptsLeft) + ".png')";
}

function updateLetters(letter) {
  var lettersContainer = document.getElementById("letters");
  var letterSpan = document.createElement("span");
  letterSpan.innerText = letter;
  lettersContainer.appendChild(letterSpan);
}

function checkLetter(letter) {
  if (selectedWord.includes(letter)) {
    updateWord(letter);
    if (!guessedLetters.includes(letter)) {
      guessedLetters.push(letter);
    }
    if (!document.getElementById("word").innerText.includes("_")) {
      alert("¡Felicidades! ¡Ganaste!");
      resetGame();
    }
  } else {
    attemptsLeft--;
    updateHangman();
    if (attemptsLeft === 0) {
      alert("¡Oh no! ¡Perdiste! La palabra era: " + selectedWord);
      resetGame();
    }
  }
  updateLetters(letter);
}

function resetGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  attemptsLeft = 6;
  guessedLetters = [];
  document.getElementById("word").innerHTML = "";
  document.getElementById("letters").innerHTML = "";
  initializeWord();
  updateHangman();
}

function handleGuess(event) {
  var guess = event.target.innerText;
  event.target.disabled = true;
  checkLetter(guess);
}

window.onload = function () {
  initializeWord();
  updateHangman();

  var letterButtons = document.querySelectorAll("#letters span");
  for (var i = 0; i < letterButtons.length; i++) {
    letterButtons[i].addEventListener("click", handleGuess);
  }
};
