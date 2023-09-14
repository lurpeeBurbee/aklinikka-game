
const imgBlue = new Image();
imgBlue.src = "images/smiley-icon-blue.png";

//Put this inside any eventlistener: canvas.addEventListener('click', function (event) {..});

const originalImgSrc = "images/smiley-icon.png";
let opacity = 0;
const fadeInterval = setInterval(() => {
  opacity += 0.03;
  ctx.globalAlpha = opacity;
  ctx.drawImage(imgBlue, playerX, playerY, playerWidth, playerHeight);
  ctx.globalAlpha = 1;
  if (opacity >= 1) {
    clearInterval(fadeInterval);
    img.src = "images/smiley-icon-blue.png";
    setTimeout(() => {
      img.src = originalImgSrc;
    }, 500);
  }
}, 20);