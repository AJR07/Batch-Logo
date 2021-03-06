var shade1 = 20, shade2 = 20, shade3 = 50; //shades for the colour rgb
let ran1 = Math.floor(Math.random() * 500) + 1, ran2 = Math.floor(Math.random() * 250) + 250;

function setup() {
  createCanvas(500, 500);
  background(0);
  rectMode(CENTER);
  textAlign(CENTER);
  noLoop();
  draw();
  pixelDensity(1)
}

/*
FUNCTIONS FOR DRAWING STUFF
*/

function FillRect(width1, height1, width2, height2, fill1, roundedCorner) {
  fill(fill1);
  rect(width1, height1, width2, height2, roundedCorner, roundedCorner, roundedCorner, roundedCorner);
}

function drawSky() {
  noStroke();
  //draws the dark blue to light blue gradient
  for (i = 0; i < 100; i++) {
    FillRect(width / 2, height / 2, width - 2 * i, height - 2 * i, color(shade1, shade2, shade3 + i * 2), 120);
  }
  shade3 = 250;
  //transitions the light blue to orange
  for (i = 0; i < 50; i++) {
    FillRect(width / 2, height / 2, width - 2 * i - 200, height - 2 * i - 200, color(shade1 + (148 / 50) * i, shade2 + (109 / 50) * i, shade3 - i * 4), 120);
  }
  shade1 = 168;
  shade2 = 129;
  shade3 = 50;
  //transitions the orange to bright yellow
  for (i = 0; i < 50; i++) {
    FillRect(width / 2, height / 2, width - 2 * i - 300, height - 2 * i - 300, color(shade1, shade2 + i * 2, shade3), 120);
  }
  stroke(1);
}

function pebble() {
  //creates 10000 dots that are meant to represent pebbles
  for (i = 0; i < 10000; i++) {
    strokeWeight(50);
    fill("black");
    circle(ran1, ran2, 1);
    ran1 = Math.floor(Math.random() * 500) + 1;
    ran2 = Math.floor(Math.random() * 250) + 250;
  }
}

function drawRoad() {
  //drawing the road to the sun
  noStroke();
  push();
  FillRect(width / 2, height * 3 / 4, width, height / 2 + 1, color("grey"), 10);
  filter(BLUR, 5);
  pop();
  fill("white");
  //pebble the road
  pebble();
  strokeWeight(10);
  stroke("black");
  //create road
  triangle(40, height, width / 2 - 40, height / 2 + 10, width / 2 - 40, height);
  triangle(width - 40, height, width / 2 + 40, height / 2 + 10, width / 2 + 40, height);
  rect(width / 2, height * 3 / 4, 80, height / 2 - 5);
  //outline for road
  stroke("white");
  strokeWeight(7);
  line(40, height, width / 2 - 40, height / 2);
  line(width - 40, height, width / 2 + 40, height / 2);
  line(width/2 - 40, height/2, width / 2 + 40, height / 2);
  fill("white");
  stroke("black");
  textSize(40);

  //HORIZON AND 2025
  horizion2025();
}

function horizion2025() {
  //creates the horizon and 2025 texts
  text("N", width / 2, height - 10);
  text("O", width / 2, height - 45);
  text("Z", width / 2, height - 80);
  text("I", width / 2, height - 115);
  text("R", width / 2, height - 150);
  text("O", width / 2, height - 185);
  text("H", width / 2, height - 220);
  fill("green")
  text("2", width / 2 - 30, height - 45);
  text("5", width / 2 + 60, height - 45);
  text("2", width / 2 + 30, height - 45);
}

function drawBorder() {
  //draws the logo border
  noFill();
  strokeWeight(5);
  stroke("black");
  circle(width/2, height/2, width)
}

function Manipulate() {
    //pixel manipulation for crop
  loadPixels();
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      // assuming height == width
      if (dist(i, j, width / 2, height / 2) > width / 2) {
        const idx = (i + j * width) * 4;
        pixels[idx + 0] = 0;
        pixels[idx + 1] = 0;
        pixels[idx + 2] = 0;
        pixels[idx + 3] = 0;

      }
    }
  }
  updatePixels();
}

/*
Actual Code itself
*/

function draw() {
  shade1 = 20;
  shade2 = 20;
  shade3 = 50;
  fill("black")
  drawSky();
  drawRoad();
  noStroke();
  fill("white")
  Manipulate();
  drawBorder();

}