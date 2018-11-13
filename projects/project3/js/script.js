/*****************

Grid-based movement and interactions with other objects.
By Mattie KA

******************/

// preload()
//
// Description of preload

function preload() {
}


// setup()
//
// Description of setup

function setup() {

  createCanvas(800,512);
}


// draw()
//
// Description of draw()

function draw() {
  background(0);
  grid();

}

//FUNCTIONS

//DRAW GRID
function grid() {
  for (var x = 0; x < width; x = x + width/50) {
    for (var y = 0; y < height; y = y + height/32) {
      stroke(255);
      strokeWeight(1);
      line(x,0,x,height);
      line(0,y,width,y);
    }
  }
}
