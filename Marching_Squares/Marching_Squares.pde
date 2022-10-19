float[][] field;

int rez = 10;
int cols, rows;
float zoff = 0;
float increment = 0.1;

OpenSimplexNoise noise;

void setup() {
  fullScreen(P2D);
  noise = new OpenSimplexNoise();
  cols = 1 + width / rez;
  rows = 1 + height / rez;
  field = new float[cols][rows];
}

void line(PVector v1, PVector v2) {
  line(v1.x, v1.y, v2.x, v2.y); 
}

void draw() {
  background(0);
  float xoff = 0;
  for (int i = 0; i < cols; i++) {
    xoff += increment;
    float yoff = 0;
    for (int j = 0; j < rows; j++) {
      field[i][j] = (float)(noise.eval(xoff, yoff, zoff));
      yoff += increment;
    }
  }
  zoff += 0.01;

  //for (int i = 0; i < cols; i++) {
  //  for (int j = 0; j < rows; j++) {
  //    fill(field[i][j]*255);
  //    noStroke();
  //    rect(i*rez, j*rez, rez, rez);
  //  }
  //}

  // Calculate the iso lines
  for (int i = 0; i < cols - 1; i++) {
    for (int j = 0; j < rows - 1; j++) {
      float x = i * rez;
      float y = j * rez;
      
      float f0 = field[i][j];
      float f1 = field[i + 1][j];
      float f2 = field[i + 1][j + 1];
      float f3 = field[i][j + 1];
      
      PVector a = new PVector(x + rez * f0 / (f0 - f1), y        );
      PVector b = new PVector(x + rez  , y + rez * f1 / (f1 - f2));
      PVector c = new PVector(x + rez * (1 - f2 / (f2 - f3)), y + rez  );
      PVector d = new PVector(x        , y + rez * (1 - f3 / (f3 - f0)));
      
      int state = getState(ceil(field[i][j]), ceil(field[i+1][j]), ceil(field[i+1][j+1]), ceil(field[i][j+1]));
      strokeWeight(2);
      stroke(0, 255, 0);
      switch(state) {
        case 1:
          line(d, c);
          break;
        case 2:
          line(b, c);
          break;
        case 3:
          line(d, b);
          break;
        case 4:
          line(a, b);
          break;
        case 5:
          line(d, a);
          line(b, c);
          break;
        case 6:
          line(c, a);
          break;
        case 7:
          line(d, a);
          break;
        case 8:
          line(d, a);
          break;
        case 9:
          line(c, a);
          break;
        case 10:
          line(b, a);
          line(d, c);
          break;
        case 11:
          line(b, a);
          break;
        case 12:
          line(d, b);
          break;
        case 13:
          line(c, b);
          break;
        case 14:
          line(d, c);
          break;
        case 15:
          break;
      }
    }
  }
}

int getState(int a, int b, int c, int d) {
  return a * 8 + b * 4 + c * 2 + d * 1;
}
