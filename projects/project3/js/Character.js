/* -------------------------- CHARACTER OBJECT ----------------------------- */

//all functions pertaining to the player character

var speed = 5;
var playerCharacterVX;
var playerCharacterVY;

/* ------------------------------ SETUP --------------------------------- */

function setupCharacter() {
  playerCharacter = createSprite(width/2,height/2,32,32);
  playerCharacter.addImage(loadImage("assets/images/sprites/walkSprites/down/fyveDown_0.png"))
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
  //collision with wall
  //left wall
  if (playerCharacter.position.x <= 0) {
    wallCollideText();
    playerCharacter.position.x = playerCharacter.width/2;
    playerCharacterVX = 0;
  //right wall
  } else if (playerCharacter.position.x >= width) {
      wallCollideText();
      playerCharacter.position.x = width - playerCharacter.width/2;
      playerCharacterVX = 0;
  //top wall
  } else if (playerCharacter.position.y >=height) {
      wallCollideText();
      playerCharacter.position.y = height - playerCharacter.height/2;
      playerCharacterVY = 0;
  //bottom wall
  } else if (playerCharacter.position.y <= 0) {
      wallCollideText();
      playerCharacter.position.y = playerCharacter.height/2;
      playerCharacterVY = 0;
  }
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
  playerCharacter.collide(rocks,rockCollision);
  playerCharacter.collide(ponds,pondCollision);
  playerCharacter.collide(juanita.sprite,juanita.collision.bind(juanita));
  playerCharacter.collide(ereth.sprite,ereth.collision.bind(ereth));
  playerCharacter.collide(dudes.sprite,dudes.collision.bind(dudes));
}

/* ------------------------- TALKSWITCH CHECK ---------------------------- */

function checkTalkSwitch() {
  // juanita.showDialogue();
  // ereth.showDialogue();
  dudes.showDialogue();
}

/* -------------------------- WALL COLLIDE TEXT ----------------------------- */

function wallCollideText() {
  textAlign(CENTER);
  textSize(50);
  fill("#FFFFFF");
  text("hey thats the wall",width/2,50);
}

/* ---------------------------- RUN CHARACTER ------------------------------ */
function runCharacter() {
  handleInput();
  playerMove();
  checkCollisions();
  checkTalkSwitch();
}
