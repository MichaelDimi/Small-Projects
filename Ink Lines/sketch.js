let canvasWidth = 1000;
let canvasHeight = 700;

function setup() {
  // put setup code here
  createCanvas(canvasWidth, canvasHeight)
  // rectMode(CENTER);
  translate(width/1.2, 0);
  rotate(PI / 2.0)
  background("#FCF5E5");
  for (let i = -20; i < 21; i++) {
    inkLine(50, canvasHeight/2 + 15*i, canvasWidth/1.6, canvasHeight/2 + 15*i, random(8,20))
  }

  // Add 5000 paint splatters across canvas
  splatter(20000);
}

function draw() {
  // put drawing code here
}

function splatter(splatters) {

  for (let i = 0; i < splatters; i++) {
    // Get a random position
    let pointX = random(0, canvasWidth);
    let pointY = random(0, canvasHeight);
    // Draw a dot 
    stroke(255, random(0, 200));
    strokeWeight(random(0.2, 1));
    let lx = random(0, 2);
    line(pointX, pointY, pointX + lx, pointY);
  }
}

function inkLine(x1, y1, x2, y2, weight) {
  x1 += random(0,30);
  x2 += random(0,30);
  // Use distance formula to get length
  let length = Math.sqrt((x1-x2)**2 + (y1-y2)**2); 

  strokeWeight(weight);
  // determine grayness by decending exponential of weight
  let grayness = -(1.3**weight) + 40
  stroke(grayness); 
  strokeCap(ROUND);
  
  // Segment the line drawing into pieces based on length
  let perlinPos = random(0, 200);
  let stretchedPerlinNoise = random(0, 200);
  for (let i = 0; i < length/4; i++) {
    perlinPos += 0.1
    stretchedPerlinNoise += 0.05
    // change the width based on perlin noise
    let segmentWeight = noise(perlinPos) * weight*1.2 + 1;
    strokeWeight(segmentWeight)
    // Draw the segmented line - with vertical squiggle
    let s = noise(stretchedPerlinNoise) * 5 * random(-0.1,0.1);
    line(x1, y1+s, x1+4, y1+s);
    x1 = x1+4;
  }
}