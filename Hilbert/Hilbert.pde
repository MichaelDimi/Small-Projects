int order = 5;
int N = int(pow(2, order)); // num quadrants
int total = N * N; // num points

PVector[] path = new PVector[total];  // path has total points length

void setup() {
  //fullScreen();
  size(512, 512);
  colorMode(HSB, 360, 255, 255);
  background(0);

  for (int i = 0; i < total; i++ ) {
    path[i] = hilbert(i);  // using the hilbert object to draw our path
    float len = height / N;
    path[i].mult(len);  // scale the shape
    path[i].add(len/2, len/2);   // translate every point so it is centered
  }
}

PVector hilbert(int i) {
  PVector[] points = {
    new PVector(0, 0),
    new PVector(0, 1),
    new PVector(1, 1),
    new PVector(1, 0)
  };


  int index = i & 3; // bit masking - read more
  //3 -- 0011     1 and 1 is 1 // 0 and 1 is 0
  //      &
  //7 -- 0111
  //---------
  //3 -- 0011
  PVector v = points[index];

  for (int j = 1; j < order; j++) {

    i = i >>> 2;  // binary shifting
    index = i & 3;  // basically we are now getting the first two digits and mapping that to the quadrant index

    float len = pow(2, j);
    if (index == 0) {
      float temp = v.x;
      v.x = v.y;
      v.y = temp;
    } else if (index == 1) {
      v.y += len;
    } else if (index == 2) {
      v.x += len;
      v.y += len;
    } else if (index == 3) {
      float temp = len-1-v.x;
      v.x = len-1-v.y;
      v.y = temp;
      v.x += len;
    }
  }

  return v;
}

int counter = 0;
void draw() {
  background(0);

  noFill();
  stroke(255);
  strokeWeight(2);
  //beginShape();
  for (int i = 0; i < counter; i++) {
    float h = map(i, 0, path.length, 0, 360);
    stroke(h, 255, 255);
    //vertex(path[i].x, path[i].y);
    line(path[i].x, path[i].y, path[i+1].x, path[i+1].y);
  }
  //endShape();
  if (counter < path.length-10) {
    counter += 10;
  } else {
    counter++;
  }
  if (counter >= path.length) {
    noLoop();  // stop
    //counter = 0;  // restart
    
  }
}
