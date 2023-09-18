HEAD

const bgcanvas = document.getElementById("background-canvas");
const uicanvas = document.getElementById("ui-canvas");
const bgctx = bgcanvas.getContext("2d");
const uictx = uicanvas.getContext("2d");

let x = bgcanvas.width / 2;
let y = bgcanvas.height;

let outerCanvasSizeWidth;
let outerCanvasSizeHeight;

window.addEventListener("load", () => {
  outerCanvasSizeWidth =
    document.getElementById("background-canvas").offsetWidth;
  outerCanvasSizeHeight =
    document.getElementById("background-canvas").offsetHeight;
});

window.addEventListener("resize", () => {
  outerCanvasSizeWidth =
    document.getElementById("background-canvas").offsetWidth;
  outerCanvasSizeHeight =
    document.getElementById("background-canvas").offsetHeight;
});

let speedY = 0;

function drawBall() {
  bgctx.clearRect(0, 0, bgcanvas.width, bgcanvas.height);

  bgctx.beginPath();
  bgctx.arc(x, y, bgcanvas.width * 0.02, 0, 2 * Math.PI);
  bgctx.fillStyle = "green";
  bgctx.fill();
  bgctx.closePath();

  y += speedY;

  if (y < -bgcanvas.width * 0.05) {
    y = bgcanvas.height;
  }

  requestAnimationFrame(drawBall);
}

function resetBall(startX) {
  x = startX;
  y = bgcanvas.height;
}
// GAME LOOP:
function gameloop() {
  drawBall();
  drawButtons();
}
requestAnimationFrame(gameloop);

function drawButtons() {
  uictx.clearRect(0, 0, uicanvas.width, uicanvas.height);

  const buttonWidth = uicanvas.width * 0.4;
  const buttonHeight = uicanvas.height * 0.3;
  const buttonMargin = uicanvas.width * 0.05;
  const startX1 = (uicanvas.width - buttonWidth * 2 - buttonMargin) / 2;
  const startX2 = startX1 + buttonWidth + buttonMargin;

  uictx.beginPath();
  uictx.rect(
    startX1,
    (uicanvas.height - buttonHeight) / 2,
    buttonWidth,
    buttonHeight
  );
  uictx.fillStyle = "blue";
  uictx.fill();
  uictx.closePath();

  uictx.beginPath();
  uictx.rect(
    startX2,
    (uicanvas.height - buttonHeight) / 2,
    buttonWidth,
    buttonHeight
  );
  uictx.fillStyle = "red";
  uictx.fill();
  uictx.closePath();

  uictx.font = `${uicanvas.height * 0.1}px Arial`;
  uictx.fillStyle = "white";
  uictx.textAlign = "center";

  uictx.fillText(
    "Auta häntä",
    startX1 + buttonWidth / 2,
    (uicanvas.height + buttonHeight * 0.2) / 2
  );
  uictx.fillText(
    "Jatka juomista",
    startX2 + buttonWidth / 2,
    (uicanvas.height + buttonHeight * 0.2) / 2
  );
}

function handleButtonHover(event) {
  const rect = uicanvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const buttonWidth = uicanvas.width * 0.4;
  const buttonHeight = uicanvas.height * 0.3;
  const startX1 = (uicanvas.width - buttonWidth * 2) / 2;
  const startX2 = startX1 + buttonWidth;

  // Check if Button 1 is hovered
  if (
    mouseX >= startX1 &&
    mouseX <= startX1 + buttonWidth &&
    mouseY >= (uicanvas.height - buttonHeight) / 2 &&
    mouseY <= (uicanvas.height - buttonHeight) / 2 + buttonHeight
  ) {
    uictx.fillStyle = "lightblue";
    uictx.fillRect(
      startX1,
      (uicanvas.height - buttonHeight) / 2,
      buttonWidth,
      buttonHeight
    );
  }

  // Check if Button 2 is hovered
  if (
    mouseX >= startX2 &&
    mouseX <= startX2 + buttonWidth &&
    mouseY >= (uicanvas.height - buttonHeight) / 2 &&
    mouseY <= (uicanvas.height - buttonHeight) / 2 + buttonHeight
  ) {
    uictx.fillStyle = "pink";
    uictx.fillRect(
      startX2,
      (uicanvas.height - buttonHeight) / 2,
      buttonWidth,
      buttonHeight
    );
  }

  function handleButtonClick(event) {
    const rect = uicanvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Check if Button 1 is clicked
    if (mouseX >= startX1 && mouseX <= startX1 + buttonWidth) {
      handleButtonClick();
    }

    // Check if Button 2 is clicked
    if (mouseX >= startX2 && mouseX <= startX2 + buttonWidth) {
      handleButtonClick();
    }
  }
  uicanvas.addEventListener("mousemove", handleButtonHover);
  uicanvas.addEventListener("click", handleButtonClick);
}

