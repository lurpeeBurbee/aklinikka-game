// NOTE: We don't need to import Button class, since it's already included in the drawButton
import { drawButton, Button } from "/js/classes/button.js";
import {
  handleKeyDown,
  handleKeyUp,
  acceleration,
  dx,
  dy,
} from "/js/modules/input.js";
import { infotext } from "/js/modules/info.js";
import { backgrounds } from "/js/modules/backgrounds.js";

// Define variables:
// Get the canvas element and its 2D rendering context:
let canvas = document.getElementById("gameCanvasMobile"); // Set initial value to canvasMobile
let ctx = canvas.getContext("2d");
const canvasMobile = document.getElementById("gameCanvasMobile");
const ctxMobile = canvasMobile.getContext("2d");
const canvasDesktop = document.getElementById("gameCanvasDesktop");
let outerCanvasSizeWidth;
let outerCanvasSizeHeight;

window.addEventListener("load", () => {
  outerCanvasSizeWidth =
    document.getElementById("gameCanvasWrapper").offsetWidth;
  outerCanvasSizeHeight =
    document.getElementById("gameCanvasWrapper").offsetHeight;
});

window.addEventListener("resize", () => {
  outerCanvasSizeWidth =
    document.getElementById("gameCanvasWrapper").offsetWidth;
  outerCanvasSizeHeight =
    document.getElementById("gameCanvasWrapper").offsetHeight;
});

const canvasVisibilityChangeEvent = new Event("canvasVisibilityChange");
// NOTE: Get the canvas elements and their 2D rendering contexts only once

function checkCanvasVisibility() {
  if (canvasMobile.style.display === "block") {
    //NOTE: Can also add a class with certain properties (display: block).
    console.log("Mobile is visible");
    // canvasMobile.dispatchEvent(canvasVisibilityChangeEvent); // INFO: .dispatchEvent is handy sometimes
  } else if (canvasDesktop.style.display === "block") {
    console.log("Desktop is visible");
    // canvasDesktop.dispatchEvent(canvasVisibilityChangeEvent);
  }
}
// const mobileCanvas = document.getElementById('gameCanvasMobile');
// const desktopCanvas = document.getElementById('gameCanvasDesktop');

function updateCanvasVisibility() {
  // Show mobile
  if (window.innerWidth <= 767) {
    canvasMobile.classList.add("visible");
    canvasDesktop.classList.remove("visible");
    canvasMobile.style.backgroundImage =
      "url(images/background/tokyo-streets.png)";
    canvasMobile.style.backgroundPosition = "center";
    //canvasMobile.style.backgroundColor = "#218000";
  } else {
    // Show desktop
    canvasMobile.classList.remove("visible");
    canvasDesktop.classList.add("visible");
    canvasDesktop.style.backgroundImage = "";
    canvasMobile.style.backgroundSize = "cover";
    canvasDesktop.style.backgroundColor = "#341000";
  }
  // Dispatch the event on the whole document, not on the individual canvases
  document.dispatchEvent(canvasVisibilityChangeEvent);
}

// Add only one event listener to the 'canvasVisibilityChange' event
document.addEventListener("canvasVisibilityChange", function () {
  if (canvasMobile.classList.contains("visible")) {
    canvas = canvasMobile;
    ctx = ctxMobile;
  } else {
    canvas = canvasDesktop;
  }

  // NOTE: game canvas size
  canvas.width = outerCanvasSizeWidth * 0.95;
  canvas.height = outerCanvasSizeHeight * 0.95;
});
// Call the function when the page loads
window.addEventListener("load", updateCanvasVisibility);
// Call the function when the window is resized
window.addEventListener("resize", updateCanvasVisibility);

canvasMobile.addEventListener("canvasVisibilityChange", function () {
  console.log("mobile visibility changed");
  canvas = canvasDesktop;
});
canvasDesktop.addEventListener("canvasVisibilityChange", function () {
  console.log("desktop visibility changed");
  canvas = canvasMobile;
  ctx = ctxMobile;
});

// Player sprite image
const player = new Image(); // Create new img element
player.src = "/images/sprites/animation-template.png";
let playerX = 0;
let playerY = 0;
let playerWidth = 0;
let playerHeight = 0;
let startFrameIndex = 0;
let timer = 0;

// Player animation spritesheet control:

const playerStartFrames = [0, 90, 180];
// INFO: The variables if you want to scale the player width in a loop. The idle animation code is commented out below.
// let playerExtraWidth = 0;
// let canIncrease = true;
//----------------------
const coordinatesInfo = document.querySelector(".coordinatesinfo p");

// Create game object images
function drawStaticPlayerImage() {
  // INFO: Clear the drawn image in one frame using the area defined with parameters:
  ctx.clearRect(playerX, playerY, playerWidth, playerHeight);
  //playerWidth = 120 + playerExtraWidth; INFO: For the idle animation
  playerWidth = 270;
  playerHeight = 90;

  //INFO: Show the player coordinates in the element below the game canvas
  coordinatesInfo.textContent = ` Player location: x: ${Math.round(
    playerX
  )} y: ${Math.round(playerY)}`;

  // WARNING: Objects stack up on each other, thus the BG-image must be drawn first.
  // Otherwise the first image will cover everything.
  // Correct hierarchy:
  // ctx.drawImage(background-image);
  // ctx.drawImage(player);
  // ctx.drawImage(smoke-in-front);
  ctx.drawImage(player, playerX, playerY, playerWidth, playerHeight); //INFO: Parameters: Image to draw, x- and y-coordinates, width and height

  // Create animation on the lower Player:
  timer++;
  if (timer >= 30) {
    timer = 0;
    startFrameIndex++;
  }

  if (startFrameIndex == 3) {
    startFrameIndex = 0;
  }
  ctx.drawImage(
    player,
    playerStartFrames[startFrameIndex],
    0,
    90,
    90,
    playerX,
    playerY + 100,
    90,
    playerHeight
  );

  // if (playerX > canvas.width - 100) { // Player hits the right side of the game canvas
  //   playerX = 0; // Return back to original position
  // }

  // INFO: Idle animation using width-scaling:

  // if (playerWidth <= 170 && canIncrease) {
  //   playerExtraWidth++;
  // }
  // if (playerWidth >= 120 && !canIncrease) {
  //   playerExtraWidth--;
  //   if (playerWidth <= 120) {
  //     canIncrease = true;
  //   }
  // }
  // if (playerWidth >= 170) {
  //   canIncrease = false;
  // }
}

let index = 1;
export function drawBackgroundImage() {
  canvasMobile.style.backgroundImage = backgrounds[index].path;
  //"url(images/background/tokyo-streets.png)";
  canvasMobile.style.backgroundPosition = "center";
  //ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  if (index == 2) {
    index = 0;
  } else {
    index++;
  }
}

// NOTE: Specific case to send and get this to work in index.html:
// Usually all the elements are inside game loop but in this case the buttons
//are built once in index.html. Decide yourself which suits better for your project.
window.drawBackgroundImage = drawBackgroundImage; //<-- creates a global window variable

// Export into index.html:
export function movePlayerLeft() {
  playerX -= 2;
}

export function movePlayerRight() {
  playerX += 2;
}

window.movePlayerLeft = movePlayerLeft;
window.movePlayerRight = movePlayerRight;
// NOTE: this is needed as a hack to make the functions run in index.html.
//HTML expects the movePlayerLeft to be on the global window object. The new JavaScript module system
//doesn't add anything to the global namespace to avoid namespace pollution.

function canvasButtons() {
  const firstbutton = drawButton(
    canvas,
    ctx,
    canvas.width * 0.08,
    canvas.height * 0.78,
    canvas.width * 0.4,
    canvas.height * 0.1,
    "#FF0000",
    "Kyllä-button inside game loop",
    movePlayerLeft
  );

  const secondbutton = drawButton(
    canvas,
    ctx,
    firstbutton.x + firstbutton.width * 1.1,
    firstbutton.y, //Replicates the y-position of firstbutton
    firstbutton.width,
    firstbutton.height,
    firstbutton.color,
    "Ei-button inside game loop",
    movePlayerRight
  );
}

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
//-------------GAME LOOP -------------------//

function updateGame() {
  playerX += dx; // INFO: moves the player
  playerY += dy;
  console.log("dx: " + dx + " dy: " + dy);
  checkCanvasVisibility();
  // Clear the whole canvas. You can also define specific areas to clear to avoid "overcleaning".
  // Usually you clear only the areas that are drawn onto within the same drawing function.
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawStaticPlayerImage();
  canvasButtons();

  requestAnimationFrame(updateGame);

  // Draw the UI button using the drawButton function

  // Call the updateGame function again using requestAnimationFrame
}
//----------------------------------------//

requestAnimationFrame(updateGame);
