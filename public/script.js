// words for the game
const wordList = ["music", "apple", "snow", "rain"];

let currentWord; // stores the current word chosen to be drawn

// starts a new round
function startRound() {
  currentWord = getRandomWord();
  clearCanvas();
}

// get a random word from wordList
function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
}

// math to handle player guesses
function handleGuess() {
  // if player's guess === currentWord
    // add points, display message saying congrats or something
  // else
    // displsy message they guessed (incorrect) word
}

// send messages
function sendMessage() {

}

// drawing on canvas
function drawOnCanvas() {

}

startRound()
