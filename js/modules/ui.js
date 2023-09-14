



// 1. Define a Button class to represent each button:

export class Button {
  constructor(x, y, width, height, text, onClick) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.onClick = onClick;
  }
  draw(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    // Calculate the x-coordinate to center the text
    const textWidth = ctx.measureText(this.text).width;
    const textX = this.x + (this.width - textWidth) / 2;
    // Calculate the y-coordinate to center the text
    const textY = this.y + this.height / 2;
    ctx.fillText(this.text, textX, textY);
  }
  isClicked(mouseX, mouseY) {
    return (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
    );
  }
}
export function UIbuttons(canvas,ctx, x, y, width, height, Button, action) {

  // 2. Create instances of the Button class and add them to an array:
  const buttons = [];
  const button1 = new Button(canvas, ctx, x, y, width, height, Button, action, () => {
    console.log(action);
  });
  // const button2 = new Button(button1.x + 200, button1.y, button1.width, button1.height,
  const button2 = new Button(canvas, ctx, x, y, width, height, Button, action, () => { 
      console.log(action + " elementistä: " + button2 );
  });
  buttons.push(button1, button2);

  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    buttons.forEach((button) => {
      if (button.isClicked(mouseX, mouseY)) {
        button.onClick();
        
      }
    });
  });
  // Draw the buttons on the canvas
  function drawButtons() {
    buttons.forEach((button) => {
      button.draw(ctx);
    });
  }

  // Call the drawButtons function to initially draw the buttons
  drawButtons();
}