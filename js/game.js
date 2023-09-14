// Imported modules, functions and variables

//import { drawBallTrail } from '/modules/ballTrail.js'; // Doesn't work without a "/"

//import { tester } from '/js/modules/input.js';


//import { drawCircle } from '/js/modules/drawcircle.js'

import { touchHandler, handleKeyUp, handleKeyDown, dx, dy, acceleration,
maxSpeed } from '/js/modules/input.js';
import { UIbuttons, Button } from '/js/modules/ui.js';


// Get the canvas element and its 2D rendering context
let canvas = document.getElementById('gameCanvasMobile'); // Set initial value to canvasMobile
let ctx = canvas.getContext('2d');
 const canvasMobile = document.getElementById('gameCanvasMobile');
 const ctxMobile = canvasMobile.getContext('2d');
 const canvasDesktop = document.getElementById('gameCanvasDesktop');
 const ctxDesktop = canvasDesktop.getContext('2d');

const canvasVisibilityChangeEvent = new Event('canvasVisibilityChange');
 // Get the canvas elements and their 2D rendering contexts only once

function checkCanvasVisibility() {
  if (canvasMobile.style.display === 'block') {
    console.log("Mobile is a visible");
    canvasMobile.dispatchEvent(canvasVisibilityChangeEvent);
  } else if (canvasDesktop.style.display === 'block') {
    console.log("Desktop is a visible");
    canvasDesktop.dispatchEvent(canvasVisibilityChangeEvent);
  }
}
// const mobileCanvas = document.getElementById('gameCanvasMobile');
// const desktopCanvas = document.getElementById('gameCanvasDesktop');


function updateCanvasVisibility() {

  if (window.innerWidth <= 767) {
    canvasMobile.classList.add('visible');
    canvasDesktop.classList.remove('visible');
canvasMobile.style.backgroundImage = 'url(images/background/tokyo-streets.png)';
canvasMobile.style.backgroundPosition = "center";
    //canvasMobile.style.backgroundColor = "#218000";
  } else {
    canvasMobile.classList.remove('visible');
    canvasDesktop.classList.add('visible');
canvasDesktop.style.backgroundImage = 'url(images/background/tokyo-streets.png)';
canvasMobile.style.backgroundSize = "cover";
    //canvasDesktop.style.backgroundColor = "#341000";
  }
    // Dispatch the event on the document, not on the individual canvases
    document.dispatchEvent(canvasVisibilityChangeEvent);
}

// Add only one event listener for the 'canvasVisibilityChange' event
document.addEventListener('canvasVisibilityChange', function () {
  console.log("canvas visibility changed");
  if (canvasMobile.classList.contains('visible')) {
    canvas = canvasMobile;
    ctx = ctxMobile;
  } else {
    canvas = canvasDesktop;
    ctx = ctxDesktop;
  }
  canvas.width = innerWidth * 0.5;
  canvas.height = innerHeight * 0.8;
});
// Call the function when the page loads
window.addEventListener('load', updateCanvasVisibility);
// Call the function when the window is resized
window.addEventListener('resize', updateCanvasVisibility);


canvasMobile.addEventListener('canvasVisibilityChange', function () {
  console.log("mobile visibility changed");
  canvas = canvasDesktop;
  
  ctx = ctxDesktop;
  // canvas.width = innerWidth * 1;
  // canvas.height = innerHeight * 1;

});
canvasDesktop.addEventListener('canvasVisibilityChange', function () {
  console.log("desktop visibility changed");
  canvas = canvasMobile;
  ctx = ctxMobile;
  // canvas.width = innerWidth * 0.5;
  // canvas.height = innerHeight * 0.5;
});
console.log("canvas is " + canvas);


// Show or hide the trails
let trailsVisible = true;

// Set the initial position and velocity of the player
let x = canvas.width / 2;
let y = canvas.height / 1.2;

let itemX = 0;
let itemY = 0;


// Player sprite image
const player = new Image(); // Create new img element
player.src = "images/sprites/smiley-icon.png";

// Background image
// const backgroundImage = new Image();
// backgroundImage.src = "images/background/tokyo-streets.png";

// Falling item
const fallingitem = new Image();
fallingitem.src = "images/sprites/smiley-icon-blue.png";

UIbuttons.addEventListener(
  "load",
  () => {

alert(UIbuttons);
  },
  false
);
function itemFalls() {
  itemY += 2;
 itemX += 1.5 * 0.2;
 if((itemY > 400) || (itemX > 400)) {
  itemY = 0;

 }
}
fallingitem.addEventListener("load", () => {

  setInterval(
    itemFalls
    , 5);

}, false);

// Click the player to show infotext
canvas.addEventListener('click', function (event) {
  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;
  const playerWidth = 150;
  const playerHeight = 150;
  const playerX = (canvas.width - playerWidth) / 2;
  const playerY = (canvas.height - playerHeight) / 2;
  if (
    clickX > playerX &&
    clickX < playerX + playerWidth &&
    clickY > playerY &&
    clickY < playerY + playerHeight
  ) {
    const textInfo = document.querySelector('.textinfo p');
    textInfo.textContent = 'Mitä ajattelit tehdä tänään?';
  }
});



// Create game object images
function drawPlayerImage() {

  ctx.clearRect(playerX, playerY, canvas.width, canvas.height);
  const playerWidth = 120;
  const playerHeight = 120;
  const playerX = (canvas.width - playerWidth) / 2; // Calculate the x-coordinate for centering
  const playerY = (canvas.height - playerHeight) / 2; // Calculate the y-coordinate for centering

  // NOTE: Objects stack up on each other, thus the BG-image must be drawn first. Otherwise it will cover everything.
  //ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(player, x, y, playerWidth, playerHeight);// Parameters: Image to draw, x- and y-coordinates, width and height

  ctx.drawImage(fallingitem, itemX, itemY, 100, 100);
  if(playerX < 200) {playerX += 2;}
}







// Function to update the position of the circle based on velocity
function updatePosition() {
  x += dx;
  y += dy;

  // Limit the circle's speed to the maximum speed
  if (Math.abs(dx) > maxSpeed) {
    dx = Math.sign(dx) * maxSpeed;
  }
  if (Math.abs(dy) > maxSpeed) {
    dy = Math.sign(dy) * maxSpeed;
  }

  // Limit the circle's position to stay within the canvas
  if (x < 20) {
    x = 20;
  }
  if (x > canvas.width - 20) {
    x = canvas.width - 20;
  }
  if (y < 20) {
    y = 20;
  }
  if (y > canvas.height - 20) {
    y = canvas.height - 20;
  }
  const coordinatesInfo = document.querySelector('.coordinatesinfo p');
  coordinatesInfo.textContent = ` Game canvas size: x: ${canvas.width} y: ${canvas.height} - Touch:  x: ${x}, y: ${y}`;
}

// document.addEventListener("touchstart", touchHandler);
// document.addEventListener("touchmove", touchHandler);
// function touchHandler(e) {
//   if (e.touches) {
//     x = e.touches[0].pageX - canvas.offsetLeft - playerWidth / 2;
//     y = e.touches[0].pageY - canvas.offsetTop - playerHeight / 2;
//     output.textContent = `Touch:  x: ${x}, y: ${y}`;
//     drawImage();
//     e.preventDefault();
//   }
// }

// All functions outside update run here:

// Function to update the game state and redraw the canvas
function updateGame() {
  checkCanvasVisibility();
  updatePosition();
  drawPlayerImage();
  //Add an event listener to handle mouse clicks on the canvas:
  UIbuttons(canvas, ctx, Button, itemX);
  const playerX = x * (canvas.width / window.innerWidth);
  const playerY = y * (canvas.height / window.innerHeight);
  const circleSize = 20 * (canvas.width / window.innerWidth);

  //touchHandler(e, playerX, playerY);


  // Calculate circle position and size based on canvas dimensions


  // Draw the circle on the canvas using the calculated position and size
  //drawCircle();

  //drawBallTrail(x, y, canvas, ctx, trailsVisible);// imported from ballTrail.js
}

// Add event listeners for keydown and keyup events
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

// Update the game state every 5 milliseconds
//requestAnimationFrame(updateGame); <-- doesn't work like this
setInterval(updateGame, 30);

// setInterval(() => { // Anonymous function must be used in setInterval with a function using parameters.
//   drawBallTrail(x, y, canvas, ctx, trailsVisible);
// }, 5);
