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
    // Draw the button on the canvas
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // Draw the text on the button

    const maxWidth = 150; // Maximum width for each line

    function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
      const words = text.split(" ");
      let line = "";

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && i > 0) {
          ctx.fillText(line, x, y);
          line = words[i] + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      }

      ctx.fillText(line, x, y);
    }

    // Usage:
    const text = this.text;
    const textX = 100;
    const textY = 100;
    const lineHeight = 20;

    ctx.font = "16px Arial";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";

    wrapText(
      ctx,
      text,
      this.x + this.width / 2,
      this.y + this.height / 2,
      maxWidth,
      lineHeight
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

// NOTE: These buttons are drawn into the canvas, not as fixed element in the index.html.
// The parameters differ a bit and we can give "extra" parameters to the drawButton
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
  const button = new Button(x, y, width, height, color, text, action);
  const originalColor = button.color;
  //console.log(originalColor);

  button.draw(ctx);

  const textInfo = document.querySelector(".textinfo p");

  //color.addEventListener("input", changeColor);

  canvas.addEventListener("mouseenter", () => {
    // Implement hover effect here, change the button color etc.
    // Here it just recognizes if the cursor is over the canvas.
    console.log("Mouse hovered over the canvas");

    button.draw(ctx);

    // Something like this could work:
    // const buttonHoverColor = "#000000";
    // function changeColor(e) {
    //   const color = e.target.value;
    //   ctx.strokeStyle = buttonHoverColor;
    // }
  });

  canvas.addEventListener("mouseleave", () => {
    // Revert hover effect here, e.g., change the button color back to the original color
    button.color = originalColor; // Revert to the original color
    button.draw(ctx);
  });

  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (button.Clicked(mouseX, mouseY)) {
      const buttonHoverColor = "#ff0000";
      button.color = buttonHoverColor; // Apply the hover color
      console.log(button.text + " clicked!" + " color is " + button.color);
      textInfo.textContent = button.text + " clicked!";

      action();
      button.draw(ctx);
    }
  });

  return button; // NOTE: return the values so they can be referenced in another button if needed
}
