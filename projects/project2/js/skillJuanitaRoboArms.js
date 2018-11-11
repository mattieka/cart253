/************************* PLAYER SKILLS: JUANITA ***************************/

/* All code pertaining to the player "Juanita" is kept here. This includes:

1) her sprites/artwork
2) functions/behaviors for her special ability: Robo Arms
     - Robo Arms increase the amount of paddles she has.

/**************************** V A R I A B L E S ******************************/

var topRoboArm;
var midRoboArm;
var bottomRoboArm;

/************************** ROBO ARMS CONSTRUCTOR ****************************/
/* sets constructor properties and their arguments; same as paddles*/

function roboArms(x,y,vx,vy,w,h,speed,downKey,upKey,score) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  this.score = score;
}

/*********************** H A N D L E   I N P U T  ****************************/

/* checks if the up or down keys are pressed and updates velocity accordingly */
/* same as paddles */

roboArms.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  }
  else {
    this.vy = 0;
  }
}

/********************** U P D A T E    F U N C T I O N ***********************/

/* update function; mostly the same as paddle, but allows the paddles to wrap
   around the screen.

update function does the following:
      - updates y position based on velocity
      - lets paddles wrap */

roboArms.prototype.update = function() {
  //bounces
  if (this.y <= 0) {
    this.y = fieldHeight-this.h;
  }
  this.y = this.y + this.vy;
  if (this.y >= fieldHeight-this.h) {
    this.y = 0;
  }
    this.y = this.y + this.vy;
}

/************************ S E T U P   F U N C T I O N  **********************/
/* sets up robo arms if player chooses juanita */
/* top arm is 100 px down, middle is in middle, bottom is 100 px up
/* carries score from corresponding paddle */

roboArmsSetup = function() {
  if (rightCharacter === "juanita") {
    topRoboArm = new roboArms (fieldWidth-10,100,this.vx,this.vy,10,60,10,DOWN_ARROW,UP_ARROW,rightPaddle.score);
    midRoboArm = new roboArms (fieldWidth-10,fieldHeight/2-30,this.vx,this.vy,10,60,10,DOWN_ARROW,UP_ARROW,rightPaddle.score);
    bottomRoboArm = new roboArms (fieldWidth-10,fieldHeight-160,this.vx,this.vy,10,60,10,DOWN_ARROW,UP_ARROW,rightPaddle.score);

  }
  if (leftCharacter === "juanita") {
    topRoboArm = new roboArms (0,100,this.vx,this.vy,10,60,10,83,87,leftPaddle.score);
    midRoboArm = new roboArms (0,fieldHeight/2-30,this.vx,this.vy,10,60,10,83,87,leftPaddle.score);
    bottomRoboArm = new roboArms (0,fieldHeight-160,this.vx,this.vy,10,60,10,83,87,leftPaddle.score);
  }
  else {
  }
}

/********************* D I S P L A Y   F U N C T I O N  **********************/

// Draws three robo arm paddles on the screen.
roboArms.prototype.display = function() {
  fill("#4286f4");
  rect(this.x,this.y,this.w,this.h);
}

/***************** A L L   J U A N I T A   F U N C T I O N S *****************/
//all grouped together into a single draw function so that it doesn't clutter
//the script function

function roboArmsDraw() {

  ball.handleCollision(topRoboArm);
  ball.handleCollision(midRoboArm);
  ball.handleCollision(bottomRoboArm);

  topRoboArm.handleInput();
  midRoboArm.handleInput();
  bottomRoboArm.handleInput();

  topRoboArm.update();
  midRoboArm.update();
  bottomRoboArm.update();

  topRoboArm.display();
  midRoboArm.display();
  bottomRoboArm.display();


}
