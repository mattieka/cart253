/*****************

Grid-based movement and interactions with other objects.
By Mattie KA

******************/

/* -------------------------- V A R I A B L E S ----------------------------- */

var playerCharacter;

/* ---------------------------- P R E L O A D ------------------------------- */
// Description of preload

function preload() {
}


/* ------------------------------ S E T U P --------------------------------- */

// Description of setup

function setup() {
  createCanvas(800,512);
  setupCharacter();
}


/* ------------------------------- D R A W ---------------------------------- */
// Description of draw()

function draw() {
  background(0);
  grid();
  runCharacter();

}

/* -------------------------- F U N C T I O N S ---------------------------- */

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

//SETUP CHARACTER
function setupCharacter() {
  playerCharacter = new Character(width/2,height/2,32,32,16,this.vx,this.vy);
}

//CHARACTER CONSTRUCTOR
function Character(x,y,w,h,speed,vx,vy) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.vx = vx;
  this.vy = vy;
}

//handle character input
Character.prototype.handleInput = function() {
  if(keyIsDown(UP_ARROW)) {
    this.vy = -this.speed;
  }

  else if(keyIsDown(DOWN_ARROW)) {
    this.vy = this.speed;
  }

  else if (keyIsDown(LEFT_ARROW)) {
    this.vx = -this.speed;
  }

  else if (keyIsDown(RIGHT_ARROW)) {
    this.vx = this.speed;
  }

  else {
    this.vy = 0;
    this.vx = 0;
  }
}

// handle character movement
Character.prototype.move = function() {
  this.y = this.y + this.vy;
  this.x = this.x + this.vx;
}

Character.prototype.display = function() {
  noStroke();
  fill("#A847C9");
  rect(this.x,this.y,this.w,this.h);
}

// player character functions
//grouped together to not clutter the draw function

function runCharacter() {
  playerCharacter.handleInput();
  playerCharacter.move();
  playerCharacter.display();
}
