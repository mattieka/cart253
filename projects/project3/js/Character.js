/* -------------------------- PLAYER CHARACTER  ----------------------------- */

//all functions pertaining to the player character

/* -------------------------- VARIABLES ----------------------------- */

var speed = 3;
var playerCharacterVX;
var playerCharacterVY;

//animation variables
var fyveLeft;
var fyveDown;
var fyveUp;
var fyveRight;

/* ------------------------------ SETUP --------------------------------- */

// sets up player animations, depth, collider, position
function setupCharacter() {
  playerCharacter = createSprite(width/2+16,150,32,32);
  playerCharacter.addAnimation("down",fyveDown);
  playerCharacter.addAnimation("up",fyveUp);
  playerCharacter.addAnimation("left",fyveLeft);
  playerCharacter.addAnimation("right",fyveRight);
  playerCharacter.setCollider("rectangle",0,16,32,32)
  //playerCharacter.debug = true;
  playerCharacter.depth = 2;
  console.log(playerCharacter.depth);
}

/* ---------------------------- CONSTRUCTOR -------------------------------- */
//no longer needed
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
// arrow key directional movement; also changes animation based on what
// direction the player is moving.
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
  // commented out because i don't need it anymore.
  //left wall
//   if (playerCharacter.position.x <= 32) {
//     wallCollideText();
//     playerCharacter.position.x = playerCharacter.width/2;
//     playerCharacterVX = 0;
//   //right wall
// } else if (playerCharacter.position.x >= width - 32) {
//       wallCollideText();
//       playerCharacter.position.x = width - playerCharacter.width/2;
//       playerCharacterVX = 0;
//   //top wall
// } else if (playerCharacter.position.y >= height - 32) {
//       wallCollideText();
//       playerCharacter.position.y = height - playerCharacter.height/2;
//       playerCharacterVY = 0;
//   //bottom wall
// } else if (playerCharacter.position.y <= 32) {
//       wallCollideText();
//       playerCharacter.position.y = playerCharacter.height;
//       playerCharacterVY = 0;
//   }

  //update position
  playerCharacter.position.x = playerCharacter.position.x + playerCharacterVX;
  playerCharacter.position.y = playerCharacter.position.y + playerCharacterVY;

  //prevent player from walking through walls
  playerCharacter.position.x = constrain(playerCharacter.position.x,56,width-56);
  playerCharacter.position.y = constrain(playerCharacter.position.y,112,height-64);

  //play animation while player is moving
  if (playerCharacterVX > 0 || playerCharacterVY > 0 || playerCharacterVX < 0 || playerCharacterVY < 0) {
    playerCharacter.animation.play()
  } else {
    //stops animation when player isnt moving, sets animation to frame 0.
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
  //playerCharacter.collide(rocks,rockCollision);
  //playerCharacter.collide(ponds,pondCollision);
  playerCharacter.collide(juanita.sprite,juanita.collision.bind(juanita));
  playerCharacter.collide(dudes.sprite,dudes.collision.bind(dudes));
  playerCharacter.collide(ereth.sprite,ereth.collision.bind(ereth));
  playerCharacter.collide(phor.sprite,phor.collision.bind(phor));
  playerCharacter.collide(ceese.sprite,ceese.collision.bind(ceese));

  playerCharacter.collide(bookCase.sprite,bookCase.collision.bind(bookCase));
  playerCharacter.collide(cuteTeddy.sprite,cuteTeddy.collision.bind(cuteTeddy));
  playerCharacter.collide(mitkerTheToad.sprite,mitkerTheToad.collision.bind(mitkerTheToad));
  playerCharacter.collide(tree.sprite,tree.collision.bind(tree));
  playerCharacter.collide(waxStatue.sprite,waxStatue.collision.bind(waxStatue));
}

/* ------------------------- TALKSWITCH CHECK ---------------------------- */

function checkTalkSwitch() {
  juanita.showDialogue();
  dudes.showDialogue();
  ereth.showDialogue();
  phor.showDialogue();
  ceese.showDialogue();

  bookCase.showDialogue();
  cuteTeddy.showDialogue();
  mitkerTheToad.showDialogue();
  tree.showDialogue();
  waxStatue.showDialogue();
}

/* -------------------------- WALL COLLIDE TEXT ----------------------------- */
//i dont use this anymore
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

/* ---------------------------- RUN CHARACTER ------------------------------ */

function runCharacter() {
  handleInput();
  playerMove();
  playerCharacter.animation.frameDelay = 7;
  checkCollisions();
  checkTalkSwitch();
}

/* -------------------------- END ----------------------------- */
