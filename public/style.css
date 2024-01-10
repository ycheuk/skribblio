// words for the game
const wordList = ["music", "apple", "snow", "rain"];

let currentWord; // stores the current word chosen to be drawn

// starts a new round
function startRound() {
  currentWord = getRandomWord();
  // clearCanvas();
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

startRound()

/* 


space

hehe


*/

var myCanvas = document.querySelector('canvas');
var myContext = myCanvas.getContext('2d');

myCanvas.height = .8 * window.innerHeight;
myCanvas.width = .8 * window.innerWidth;

let drawing = false;

let posX = 0;
let posY = 0;

myCanvas.addEventListener('mousedown', (e) => {
  init(e);
  drawing = true;
});

myCanvas.addEventListener('mouseup', () => {
  drawing = false;

});

myCanvas.addEventListener('mousemove', (e) => {
  draw(e);
});

function init(e) {
  posX = e.offsetX;
  posY = e.offsetY;
}

function draw(e) {
  if (drawing) {
    myContext.beginPath();

    myContext.moveTo(posX, posY);
    myContext.lineTo(e.offsetX, e.offsetY);
    myContext.stroke();

    myContext.closePath();

    init(e);
  }
}

// color btns
const blackBtn = document.getElementById('black');
const pinkBtn = document.getElementById('pink');
const clearBtn = document.getElementById('clear');

clearBtn.addEventListener('click', () => {
  myContext.clearRect(0,0,myCanvas.width,myCanvas.height);
});

blackBtn.addEventListener('click', () => {
  myContext.strokeStyle = '#000000';
});

pinkBtn.addEventListener('click', () => {
  myContext.strokeStyle = '#ffa6c9';
});
