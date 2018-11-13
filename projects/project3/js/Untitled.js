var gridSize = 50;
var playerCharacter;

function setup() {
  createCanvas(800, 600);
  noFill();
  setupCharacter();
}

function draw() {
  background(255);

  if (mouseIsPressed) {
    playerCharacter.x = mouseX;
    playerCharacter.y = mouseY;
  } else {
    playerCharacter.x = round(playerCharacter.x/gridSize)*gridSize;
    playerCharacter.y = round(playerCharacter.y/gridSize)*gridSize;
  }

  for (var i = 0; i < width/gridSize; i++)
    line(i*gridSize, 0, i*gridSize, height);
  for (var i = 0; i < height/gridSize; i++)
    line(0, i*gridSize, width, i*gridSize);
    noStroke();
    fill("#A847C9");
    rectMode(CENTER);
    rect(this.x,this.y,this.w,this.h);;
}


//SETUP CHARACTER
function setupCharacter() {
  playerCharacter = new Character(width/2,height/2,32,32,8,this.vx,this.vy);
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
