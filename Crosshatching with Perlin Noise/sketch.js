function setup() {
  // createCanvas(500, 500);
  createCanvas(displayWidth, displayHeight)
  rectMode(CENTER)
  colorMode(RGB)
}

let zoff = 0;

increment = 0.01;
function draw() {
  background(255);
  let spacing = 10;
  let size = 30
  let rez = 0.2;
  
  let xoff = 0;
  for (x = 0; x < width + spacing; x += spacing) {
    xoff += increment;
    let yoff = 0;
    for (y = 0; y < height + spacing; y += spacing) {
      yoff += increment;

      let c = noise(xoff/rez, yoff/rez, zoff);

      stroke(0,200,200);
      strokeWeight(3);

      if (c<0.5) {
        line(x,y, x+size, y+size);
      } else if (c>=0.5) {
        line(x+size,y, x, y+size);
      }
    }
  }
  zoff += increment
}