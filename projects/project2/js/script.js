/************************ I N T R O   /   I N F O ****************************/
/* Object Oriented Pong by Mattie KA
   Based on starter code by Pippin Barr.

   Arrow keys control the right hand paddle
   W and S control the left hand paddle.

Written with JavaScript OOP.*/

/************************** V A R I A B L E S ********************************/
// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;

// variables for playing field (not counting player zone)
var fieldWidth = 640;
var fieldHeight = 480;

// variables for avatar pictures
var spriteGreenHappy;
var spriteGreenMad;
var spriteYellowHappy;
var spriteYellowMad;

// variable to track which sprite is displayed
var leftAvatar;
var rightAvatar;

// variable to track which character was selected by which player
var rightCharacter;
var leftCharacter;

// variables related to powerups
var timer;
var powerUpMeter = 10;


/**************************** P R E L O A D  *********************************/
/* preloads images */
function preload() {
  spriteGreenHappy = loadImage("assets/images/placeholderSprites/spriteGreenHappy.png");
  spriteGreenMad = loadImage("assets/images/placeholderSprites/spriteGreenMad.png");
  spriteYellowHappy = loadImage("assets/images/placeholderSprites/spriteYellowHappy.png");
  spriteYellowMad = loadImage("assets/images/placeholderSprites/spriteYellowMad.png");
}

/*********************** S E T U P   F U N C T I O N *************************/

// Creates the ball and paddles
function setup() {
  imageMode(CENTER);
  angleMode(DEGREES);


  rightCharacter = "juanita";
  leftCharacter = "fyve";
  createCanvas(640,680);
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,10,5);
  // Create the right paddle with UP and DOWN as controls
  // Initialize score at 0
  rightPaddle = new Paddle(width-10,height/2,this.vx,this.vy,10,60,10,DOWN_ARROW,UP_ARROW,0,10);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  // Initialize score at 0
  leftPaddle = new Paddle(0,height/2,this.vx,this.vy,10,60,10,83,87,0,0);

  // initialize avatars
  leftAvatar = spriteYellowHappy;
  rightAvatar = spriteGreenHappy;

  roboArmsSetup();
  starFallSetup();
  timerSetup();
}

/************************ D R A W    F U N C T I O N *************************/

// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);
  avatarZone();
  drawScore();
  drawPowerUpMeter();
  displayTimer();


  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  if (ball.isOffScreen()) {
    ball.reset();
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  drawAvatar();


  ball.display();
  leftPaddle.display();
  rightPaddle.display();

  checkPowerUp();

}

/*************************** F U N C T I O N S *******************************/
/* mad science zone.
   for testing new functions that dont concern the ball/paddle */

//creates avatar area by drawing a rectangle
function avatarZone() {
  fill("#ead2f7");
  rect(0,fieldHeight,width,height-fieldHeight);
}

//draws avatar based on who previously scored
function drawAvatar() {
  image(rightAvatar,width-rightAvatar.width,fieldHeight+(height-fieldHeight)/2);
  image(leftAvatar,leftAvatar.width,fieldHeight+(height-fieldHeight)/2);
}

//function that draws the score onscreen
function drawScore() {
  push();
    fill("#000000");
    textSize(32);
    text(rightPaddle.score,width-40,fieldHeight+(height-fieldHeight)/2);
    text(leftPaddle.score,20,fieldHeight+(height-fieldHeight)/2);
  pop();
}

//function that displays TP (power up meter), tells player if they can use special ability
function drawPowerUpMeter() {
console.log(leftPaddle.powerUpMeter,rightPaddle.powerUpMeter);
  push();
    fill("#000000");
    textSize(32);
    text(leftPaddle.powerUpMeter,40,height-50);
    text(rightPaddle.powerUpMeter,width-40,height-50);
  pop();
}

//function that checks if a powerup is ready, and if it is, if the trigger key is pressed
function checkPowerUp() {
  //left paddle juanita
      if (leftPaddle.powerUpMeter >= 10 && leftCharacter === "juanita") {
        if (keyCode === 68 && leftTimer.timerState === "off") {
          leftTimer.timerState = "on";
        }
        if (leftTimer.timerState === "on") {
          leftTimer.startTimer();
          leftTimer.checkTimer();
          roboArmsDraw();
        }
      }
  // right paddle juanita
      if (rightPaddle.powerUpMeter >= 10 && rightCharacter === "juanita") {
        if (keyCode === LEFT_ARROW && rightTimer.timerState === "off") {
          rightTimer.timerState = "on";
        }
        if (rightTimer.timerState === "on") {
          rightTimer.startTimer();
          rightTimer.checkTimer();
          roboArmsDraw();
        }
      }
  // left paddle fyve
      if (leftPaddle.powerUpMeter >= 10 && leftCharacter === "fyve") {
        if (keyCode === 68 && leftTimer.timerState === "off") {
          leftTimer.timerState = "on";
        }
        if (leftTimer.timerState === "on") {
          leftTimer.startTimer();
          leftTimer.checkTimer();
          starFallDraw();
        }
      }
  // right paddle fyve
      if (rightPaddle.powerUpMeter >= 10 && rightCharacter === "fyve") {
        if (keyCode === LEFT_ARROW && rightTimer.timerState === "off") {
          rightTimer.timerState = "on";
        }
        if (rightTimer.timerState === "on") {
          rightTimer.startTimer();
          rightTimer.checkTimer();
          starFallDraw();
        }
      }
}

/************************ T I M E R    F U N C T I O N  **********************/
//implements timer into powerup

function Timer(paddle,timerState,timer) {
  this.paddle = paddle;
  this.timerState = timerState;
  this.timer = timer;

  this.startTimer = function() {
    if (frameCount % 60 === 0 && this.timer > 0) {
      this.timer-- ;
    }
  }

  this.checkTimer = function() {
    if (this.timer === 0) {
      paddle.powerUpMeter = 0;
      this.timerState = "off";
      this.timer = 10;
    }
  }

  this.drawTimer = function() {
    push();
      textSize(50);
      fill("#FFFFFF");
      if (paddle.x < width) {
        text(this.timer,paddle.x+10,paddle.y + paddle.w);
      }
      if (paddle.x > width-40) {
        text(this.timer,paddle.x-60,paddle.y);
      }
    pop();
  }
}

// sets up each player's timer
timerSetup = function() {
  rightTimer = new Timer (rightPaddle,"off",10);
  leftTimer = new Timer (leftPaddle,"off",10);
}

displayTimer = function() {
  rightTimer.drawTimer();
  leftTimer.drawTimer();
}


/**************************** C R E D I T S **********************************/
