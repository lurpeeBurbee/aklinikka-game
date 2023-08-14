const bgcanvas = document.getElementById("background-canvas");
const uicanvas = document.getElementById("ui-canvas");
const bgctx = bgcanvas.getContext("2d");
const uictx = uicanvas.getContext("2d");

let x = bgcanvas.width / 2;
let y = bgcanvas.height;

let speedY = -2;

function drawBall() {
  bgctx.clearRect(0, 0, bgcanvas.width, bgcanvas.height);

  bgctx.beginPath();
  bgctx.arc(x, y, bgcanvas.width * 0.02, 0, 2 * Math.PI);
  bgctx.fillStyle = "green";
  bgctx.fill();
  bgctx.closePath();

  y += speedY;

  if (y < -bgcanvas.width * 0.02) {
    y = bgcanvas.height;
  }

  requestAnimationFrame(drawBall);
}

function resetBall(startX) {
  x = startX;
  y = bgcanvas.height;
}

function resizeCanvas() {
  bgcanvas.width = window.innerWidth * 0.8;
  bgcanvas.height = window.innerHeight * 0.75;
  uicanvas.width = window.innerWidth * 0.8;
  uicanvas.height = window.innerHeight * 0.25;

  drawBall();
  drawButtons();
}

function drawButtons() {
  uictx.clearRect(0, 0, uicanvas.width, uicanvas.height);

  const buttonWidth = uicanvas.width * 0.2;
  const buttonHeight = uicanvas.height * 0.4;
  const buttonMargin = uicanvas.width * 0.03;
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

  uictx.font = `${uicanvas.height * 0.2}px Arial`;
  uictx.fillStyle = "white";
  uictx.textAlign = "center";
  uictx.fillText(
    "Start here",
    startX1 + buttonWidth / 2,
    (uicanvas.height + buttonHeight * 0.2) / 2
  );
  uictx.fillText(
    "Start here",
    startX2 + buttonWidth / 2,
    (uicanvas.height + buttonHeight * 0.2) / 2
  );
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
