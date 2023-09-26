document.addEventListener("touchstart", touchHandler);
document.addEventListener("touchmove", touchHandler);

// Touchscreen input:
function touchHandler(e, playerX, playerY) {
  if (e.touches) {
    playerX = e.touches[0].pageX - canvas.offsetLeft - playerWidth / 2;
    playerY = e.touches[0].pageY - canvas.offsetTop - playerHeight / 2;
    output.textContent = `Touch:  x: ${playerX}, y: ${playerY}`;
    e.preventDefault();
  }
}

export let dx = 0;
export let dy = 0;

// Set the acceleration and maximum speed of the player
const acceleration = 1;
const maxSpeed = 5;

// Function to handle keydown events
function handleKeyDown(event) {
  if (event.key === "ArrowUp") {
    dy -= acceleration;
  } else if (event.key === "ArrowDown") {
    dy += acceleration;
  } else if (event.key === "ArrowLeft") {
    dx -= acceleration;
  } else if (event.key === "ArrowRight") {
    dx += acceleration;
  }
}

// Function to handle keyup events
function handleKeyUp(event) {
  if (
    event.key === "ArrowUp" ||
    event.key === "ArrowDown" ||
    event.key === "ArrowLeft" ||
    event.key === "ArrowRight"
  ) {
    dx = 0;
    dy = 0;
  }
}
// Function to limit the speed of the player
export function limitSpeed() {
  const speed = Math.sqrt(dx * dx + dy * dy);
  if (speed > maxSpeed) {
    const factor = maxSpeed / speed;
    dx *= factor;
    dy *= factor;
  }
}

export { handleKeyUp };
export { handleKeyDown };
export { touchHandler };
