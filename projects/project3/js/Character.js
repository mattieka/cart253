/* -------------------------- CHARACTER OBJECT ----------------------------- */

//all functions pertaining to the player character

var speed = 5;
var playerCharacterVX;
var playerCharacterVY;

/* ------------------------------ SETUP --------------------------------- */

function setupCharacter() {
  playerCharacter = createSprite(width/2,height/2,32,32);
  playerCharacter.addImage(loadImage("assets/images/sprites/playerSprite.png"))
}

/* ---------------------------- CONSTRUCTOR -------------------------------- */

// function Character(x,y,w,h,speed,vx,vy) {
//   this.x = x;
//   this.y = y;
//   this.w = w;
//   this.h = h;
//   this.speed = speed;
//   this.vx = vx;
//   this.vy = vy;
// }

/* ---------------------------- HANDLE INPUT ------------------------------- */

function handleInput() {
  if(keyIsDown(UP_ARROW)) {
    playerCharacterVY = -speed;
  }

  else if(keyIsDown(DOWN_ARROW)) {
    playerCharacterVY = speed;
  }

  else if (keyIsDown(LEFT_ARROW)) {
    playerCharacterVX = -speed;
  }

  else if (keyIsDown(RIGHT_ARROW)) {
    playerCharacterVX = speed;
  }

  else {
    //snaps player to grid
    playerCharacter.position.x = round(playerCharacter.position.x/gridSize)*gridSize;
    playerCharacter.position.y = round(playerCharacter.position.y/gridSize)*gridSize;
    //sets velocity to 0
    playerCharacterVY = 0;
    playerCharacterVX = 0;
  }
}

/* ------------------------------ MOVEMENT --------------------------------- */

function playerMove() {
  playerCharacter.position.x = playerCharacter.position.x + playerCharacterVX;
  playerCharacter.position.y = playerCharacter.position.y + playerCharacterVY;
}
// /* ------------------------------ DISPLAY --------------------------------- */
//
// Character.prototype.display = function() {
//   noStroke();
//   fill("#A847C9");
//   rectMode(CENTER);
//   rect(this.x,this.y,this.w,this.h);
// }
/* ---------------------------- COLLISION CHECK ------------------------------ */
function checkCollisions() {
  playerCharacter.collide(rocks);
}

/* ---------------------------- RUN CHARACTER ------------------------------ */
function runCharacter() {
  handleInput();
  playerMove();
  checkCollisions();
}
