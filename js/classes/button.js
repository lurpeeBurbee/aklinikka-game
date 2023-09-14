export class Button {
  constructor(x, y, width, height, color, text, action) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.text = text;
    this.action = action;
  }
  draw(ctx) {
    this.color = this.action;
    // Draw the button on the canvas
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // Draw the text on the button
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      this.text,
      this.x + this.width / 2,
      this.y + this.height / 2 + 6
    );
  }
  Clicked(mouseX, mouseY) {
    return (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
    );
  }
}

// NOTE: The parameters differ a bit and we can give "extra" parameters to the drawButton
export function drawButton(
  canvas,
  ctx,
  x,
  y,
  width,
  height,
  color,
  text,
  action
) {
  // function changeColor(e) {
  //   const color = e.target.value;
  //   ctx.strokeStyle = color;
  // }

  const button = new Button(x, y, width, height, color, text, action);

  button.draw(ctx);

  const textInfo = document.querySelector(".textinfo p");
  //color.addEventListener("input", changeColor);

  canvas.addEventListener("mouseenter", () => {
    // Implement hover effect here, e.g., change the button color
    console.log("Mouse hovered over the canvas");
    //textInfo.textContent = button.text + " mouse hovered over!";
    //button.draw(ctx);
  });

  canvas.addEventListener("mouseleave", () => {
    // Revert hover effect here, e.g., change the button color back to the original color
    //button.draw(ctx);
  });

  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (button.Clicked(mouseX, mouseY)) {
      console.log(button.text + " clicked!" + " color is " + button.color);
      textInfo.textContent = button.text + " clicked!";
      button.draw(ctx);
    }
  });


  return button; // NOTE: return the values so they can be referenced in another button
}
