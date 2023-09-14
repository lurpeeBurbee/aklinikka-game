


function drawBallTrail(x, y, canvas, ctx, isOn) {
   
  if(isOn) {
    alert("wodks");
    let positionXrandom = Math.random(0.1, 2);
    let positionYrandom = Math.random(0.1, 2);

    // Calculate circle position and size based on canvas dimensions
    const circleX = x * (canvas.width / window.innerWidth * positionXrandom);
    const circleY = y * (canvas.height / window.innerHeight * positionYrandom);
    const circleSize = 10 * (canvas.width / window.innerWidth);
  
    // Draw the circle on the canvas using the calculated position and size
    ctx.beginPath();
    ctx.arc(circleX, circleY, circleSize, 0, Math.PI * 2);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();
  }
  }
  

  export { drawBallTrail };

