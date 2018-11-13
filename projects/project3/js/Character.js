/* -------------------------- CHARACTER OBJECT ----------------------------- */

//all functions pertaining to the player character 

/* ---------------------------- CONSTRUCTOR -------------------------------- */

function Character(x,y,w,h,speed,vx,vy) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.vx = vx;
  this.vy = vy;
}

/* ---------------------------- HANDLE INPUT ------------------------------- */

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
    //snaps player to grid
    playerCharacter.x = round(playerCharacter.x/gridSize)*gridSize;
    playerCharacter.y = round(playerCharacter.y/gridSize)*gridSize;
    //sets velocity to 0
    this.vy = 0;
    this.vx = 0;
  }
}

/* ------------------------------ MOVEMENT --------------------------------- */

Character.prototype.move = function() {
  this.y = this.y + this.vy;
  this.x = this.x + this.vx;
}
/* ------------------------------ DISPLAY --------------------------------- */

Character.prototype.display = function() {
  noStroke();
  fill("#A847C9");
  rectMode(CENTER);
  rect(this.x,this.y,this.w,this.h);
}

/* ------------------------------ SETUP --------------------------------- */

function setupCharacter() {
  playerCharacter = new Character(width/2,height/2,32,32,4,this.vx,this.vy);
}

/* ---------------------------- RUN CHARACTER ------------------------------ */
function runCharacter() {
  playerCharacter.handleInput();
  playerCharacter.move();
  playerCharacter.display();
}
