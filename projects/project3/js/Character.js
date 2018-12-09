/* -------------------------- CHARACTER OBJECT ----------------------------- */

//all functions pertaining to the player character

var speed = 3;
var playerCharacterVX;
var playerCharacterVY;
var fyveLeft;
var fyveDown;
var fyveUp;
var fyveRight;

/* ------------------------------ SETUP --------------------------------- */

function setupCharacter() {
  playerCharacter = createSprite(width/2,height/2,32,32);
  playerCharacter.addAnimation("down",fyveDown);
  playerCharacter.addAnimation("up",fyveUp);
  playerCharacter.addAnimation("left",fyveLeft);
  playerCharacter.addAnimation("right",fyveRight);
  playerCharacter.setCollider("rectangle",0,16,32,32)
  playerCharacter.debug = true;
  playerCharacter.depth = 2;
  console.log(playerCharacter.depth);
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
    playerCharacterVX = 0;
    playerCharacter.changeAnimation("up",fyveUp);
  }

  else if(keyIsDown(DOWN_ARROW)) {
    playerCharacterVY = speed;
    playerCharacterVX = 0;
    playerCharacter.changeAnimation("down",fyveDown);
  }

  else if (keyIsDown(LEFT_ARROW)) {
    playerCharacterVX = -speed;
    playerCharacterVY = 0;
    playerCharacter.changeAnimation("left",fyveLeft);
  }

  else if (keyIsDown(RIGHT_ARROW)) {
    playerCharacterVX = speed;
    playerCharacterVY = 0;
    playerCharacter.changeAnimation("right",fyveRight);
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
  //update position
  playerCharacter.position.x = playerCharacter.position.x + playerCharacterVX;
  playerCharacter.position.y = playerCharacter.position.y + playerCharacterVY;

  if (playerCharacterVX > 0 || playerCharacterVY > 0 || playerCharacterVX < 0 || playerCharacterVY < 0) {
    playerCharacter.animation.play()
  } else {
    //stops animation
    playerCharacter.animation.playing = false;
    playerCharacter.animation.goToFrame(0);
  }
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
  playerCharacter.collide(dudes.sprite,dudes.collision.bind(dudes));
  playerCharacter.collide(ereth.sprite,ereth.collision.bind(ereth));
  playerCharacter.collide(phor.sprite,phor.collision.bind(phor));
  playerCharacter.collide(ceese.sprite,ceese.collision.bind(ceese));
}

/* ------------------------- TALKSWITCH CHECK ---------------------------- */

function checkTalkSwitch() {
  juanita.showDialogue();
  dudes.showDialogue();
  ereth.showDialogue();
  phor.showDialogue();
  ceese.showDialogue();
}

/* -------------------------- WALL COLLIDE TEXT ----------------------------- */

function wallCollideText() {
  textAlign(CENTER);
  textSize(50);
  fill("#FFFFFF");
  text("hey thats the wall",width/2,50);
}

/* -------------------------- PRELOAD WALK ANIMATIONS ----------------------------- */

function preloadWalkAnimations() {
  fyveDown = loadAnimation("assets/images/sprites/walkSprites/down/fyveDown_0.png","assets/images/sprites/walkSprites/down/fyveDown_3.png");
  fyveLeft = loadAnimation("assets/images/sprites/walkSprites/left/fyveLeft_0.png","assets/images/sprites/walkSprites/left/fyveLeft_3.png");
  fyveRight = loadAnimation("assets/images/sprites/walkSprites/right/fyveRight_0.png","assets/images/sprites/walkSprites/right/fyveRight_3.png");
  fyveUp = loadAnimation("assets/images/sprites/walkSprites/up/fyveUp_0.png","assets/images/sprites/walkSprites/up/fyveUp_3.png");
}

/* ---------------------------- CHECK CHARACTER DEPTH ------------------------------ */
function checkDepth() {
  if (playerCharacter.position.y > juanita.y) {
    juanita.sprite.depth = 1;
  } if (playerCharacter.position.y > dudes.y) {
    dudes.sprite.depth = 1;
  }
}

/* ---------------------------- RUN CHARACTER ------------------------------ */
function runCharacter() {
  handleInput();
  playerMove();
  playerCharacter.animation.frameDelay = 7;
  checkCollisions();
  checkTalkSwitch();
}
