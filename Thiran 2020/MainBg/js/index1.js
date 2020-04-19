(function(global) {
  
// Define global properties
let width, height;
const flakeCount = 200;  
  
  // Define the canvas
const canvas = document.querySelector("#canvas");

// Define canvas styles
canvas.style.position = "fixed";
canvas.style.zIndex = "1";
//canvas.style.background = "#272727";

// Define canvas size
const setCanvasSize = () => {
  width = global.innerWidth;
  height = global.innerHeight;

  canvas.width = width;
  canvas.height = height;
};

// Create canvas context
const c = canvas.getContext("2d");

// Check for window request animation frame
// Taken from https://gist.github.com/mrdoob/838785
if (!global.requestAnimationFrame) {
  global.requestAnimationFrame = (function() {
    return (
      global.webkitRequestAnimationFrame ||
      global.mozRequestAnimationFrame ||
      global.oRequestAnimationFrame ||
      global.msRequestAnimationFrame ||
      function(
        /* function FrameRequestCallback */ callback,
        /* DOMElement Element */ element
      ) {
        global.setTimeout(callback, 10000 / 20);
      }
    );
  })();
}
  
// Define resize event on window object
global.onresize = () => {
  setCanvasSize();
};

// Create circle object
class Snowflake {
  constructor() {
    this.start = true;
    this.radius = Math.round(Math.random() * 3);
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
  }

  generateProperties(yPos) {
    this.radius = Math.round(Math.random() * 4);
    this.x = Math.round(Math.random() * width);
    this.y = yPos || Math.round(Math.random() * -height);
    this.dx = Math.round((Math.random() - 0.5) * 2);
    this.dy =
      Math.round(
        (Math.random() - 0.5) * (5 + this.radius - (2 + this.radius))
      ) +
      (2 + this.radius);
  }

  draw() {
    const grd = c.createRadialGradient(
      this.x,
      this.y,
      0.4,
      this.x,
      this.y,
      this.radius
    );
    grd.addColorStop(0, "white");
    grd.addColorStop(1, "rgba(255,255,255, .6)");

    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

    c.fillStyle = grd;
    c.fill();
  }

  updatePosition() {
    // Drow the circle
    this.draw();

    // Check for y position
    if (this.y + this.radius > height + 10) {
      this.generateProperties(-10);
    }

    // Check for start animation
    if (this.start) {
      this.generateProperties();
      this.start = false;
    }

    // Update position properties
    this.x += this.dx;
    this.y += this.dy;
  }
}

// Define circles creator function
const createCircles = count => {
  // Define array for save each new circle
  const circlesArray = [];

  // Generate new circles
  for (let i = 0; i < count; i++) {
    circlesArray.push(new Snowflake());
  }

  // Return the collected circles array
  return circlesArray;
};

// Create circles
const circles = createCircles(flakeCount);

// Define animation function
const animate = () => {
  // Clear cnavas area
  c.clearRect(0, 0, width, height);

  // loop throw circles
  for (let i = 0; i < circles.length; i++) {
    circles[i].updatePosition();
  }

  // Reexecute animation
  requestAnimationFrame(animate);
};
  
// Draw canvas
setCanvasSize();

animate();
  
})(window);