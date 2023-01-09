let w = 600;
let h = 400;
let rows = w;
let cols = w;

let res = 20;

function setup() {
  // put setup code here
  createCanvas(w, h)
  background("white");
  noStroke();

  let xoff = 0
  for (let i = 0; i < w; i+=res) {
    xoff += 0.01
    let yoff = 0
    for (let j = 0; j < h; j+=res) {
      yoff += 0.01
      let x = 8*noise(xoff/20);
      let y = 8*noise(yoff/20);
      
      stroke(0);
      line(i, j, i+10*Math.cos(x*360), j+10*Math.sin(y*360));
    }
  }
  t+=0.03
}

t = 0
function draw() {
  
}