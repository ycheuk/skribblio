var socket = io();

/*


code for chat ⬇️


*/


// prompt for user's name
const name = prompt("Please enter your name:");

// emit the user's name to the server
socket.emit('sendName', name);

const form = document.getElementById('form');
const input = document.getElementById('input');
const messagesContainer = document.getElementById('messages-container');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', { name, message: input.value });
    input.value = '';
  }
});

socket.on('chat message', (data) => {
  const item = document.createElement('li');
  const bubbleClass = data.name === name ? 'bubble sent' : 'bubble';
  item.innerHTML = `
    <div class="name-bubble">${data.name}</div>
    <div class="${bubbleClass}">${data.message}</div>
  `;
  messages.appendChild(item);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

/*


code for canvas feature ⬇️


*/

// setting up some helpful shortcut variables
var myCanvas = document.querySelector('canvas');
var myContext = myCanvas.getContext('2d');

var myColor = "#000000"; // setting default as black, will update when color picked changes

myCanvas.height = .8 * window.innerHeight; // making it 80% the height/width
myCanvas.width = .8 * window.innerWidth;

let drawing = false; // checking to see if user is drawing

// init some coordinates
let posX = 0;
let posY = 0;

myCanvas.addEventListener('mousedown', (e) => {
  init(e); // sets mouse position
  drawing = true; // is drawing!! bc mouse is down
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
  if (drawing) { // if mousedown
    myContext.beginPath();

    myContext.moveTo(posX, posY); // starting position = own position
    myContext.lineTo(e.offsetX, e.offsetY); // ending position = drawing event's recorded offset!
    myContext.stroke();

    myContext.closePath();

    // now triggering the socket.io event 'drawn', sharing this drawing information to every user
    socket.emit('drawn', {
      // sharing current coordinates, offset coordinates, and the current pen color
      posX: posX,
      posY: posY,

      offsetX: e.offsetX,
      offsetY: e.offsetY,

      color: myColor
    })

  }

}

// when the server emits the 'drawn' event
socket.on('drawn', (data) => {
  myContext.strokeStyle = `${data.color}`; // setting the color = the color used by the other user

  // same code as draw() function, just using the data object instead
  myContext.beginPath();

  myContext.moveTo(data.posX, data.posY);
  myContext.lineTo(data.offsetX, data.offsetY);
  myContext.stroke();

  myContext.closePath();

  // init() but again with the data object
  posX = data.offsetX;
  posY = data.offsetY;

});

// color button code!

// setting up button shortcut variables
const blackBtn = document.getElementById('black');
const redBtn = document.getElementById('red');
const orangeBtn = document.getElementById('orange');
const yellowBtn = document.getElementById('yellow');
const greenBtn = document.getElementById('green');
const blueBtn = document.getElementById('blue');
const purpleBtn = document.getElementById('purple');
const pinkBtn = document.getElementById('pink');
const clearBtn = document.getElementById('clear');


// for the clear button
clearBtn.addEventListener('click', () => {
  myContext.clearRect(0,0,myCanvas.width,myCanvas.height);

  socket.emit('cleared'); // trigger 'clear' event!
});

// when receiving clear event
socket.on('cleared', () => {
  myContext.clearRect(0,0,myCanvas.width,myCanvas.height); // same thing as the regular 'onclick' event
});

// for every color button
blackBtn.addEventListener('click', () => { // when clicked,
  myColor = '#000000'; // update the myColor variable (so the info can be shared in 'drawn')
  myContext.strokeStyle = '#000000'; // and actually change the pen color!
});

redBtn.addEventListener('click', () => {
  myColor = '#FAA0A0';
  myContext.strokeStyle = '#FAA0A0';
});

orangeBtn.addEventListener('click', () => {
  myColor = '#FFC69A';
  myContext.strokeStyle = '#FFC69A';
});

yellowBtn.addEventListener('click', () => {
  myColor = '#F8EC7C';
  myContext.strokeStyle = '#F8EC7C';
});

greenBtn.addEventListener('click', () => {
  myColor = '#D0F2C7';
  myContext.strokeStyle = '#D0F2C7';
});

blueBtn.addEventListener('click', () => {
  myColor = '#BAEBE5';
  myContext.strokeStyle = '#BAEBE5';
});

purpleBtn.addEventListener('click', () => {
  myColor = '#E1CAF8';
  myContext.strokeStyle = '#E1CAF8';
});

pinkBtn.addEventListener('click', () => {
  myColor = '#F4C9DE';
  myContext.strokeStyle = '#F4C9DE';
});
