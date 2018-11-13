/************************ I N T R O   /   I N F O ****************************/
/* Object Oriented Pong by Mattie KA
   Based on starter code by Pippin Barr.

   Arrow keys control the right hand paddle, left arrow for right hand powerup.
   W and S control the left hand paddle, D for left hand powerup.

Written with JavaScript OOP.*/

/************************** V A R I A B L E S ********************************/
// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;
var titleDone = false;

// variables for playing field (not counting player zone)
var fieldWidth = 640;
var fieldHeight = 480;

// variables for images
var starImage;
var roboArmsRight;
var roboArmsLeft;

// variables for avatar pictures
// juanita
var juanitaHappy;
var juanitaMad;
// fyve
var fyveHappy;
var fyveMad;

//variables for sounds
var charaSelect;

// variable to track which sprite is displayed
var leftAvatar;
var rightAvatar;

// variable to track which character was selected by which player
var rightCharacter;
var leftCharacter;

// variables related to powerups
var timer;
var ballColorChange = 0;
var powerUpMeter = 10;
var starSetupDone = false;
var starPositionReset = false;
var roboArmsActive = false;


/**************************** P R E L O A D  *********************************/
/* preloads images */
function preload() {

  //images
  juanitaHappy = loadImage("assets/images/sprites/juanitaHappy.png");
  juanitaMad = loadImage("assets/images/sprites/juanitaMad.png");
  fyveHappy = loadImage("assets/images/sprites/fyveHappy.png");
  fyveMad = loadImage("assets/images/sprites/fyveMad.png");
  starImage = loadImage("assets/images/sprites/star.png");
  roboArmsRight = loadImage("assets/images/sprites/roboArmRight.png");
  roboArmsLeft = loadImage("assets/images/sprites/roboArmLeft.png");

  //sounds
  charaSelect = new Audio("assets/sounds/charaselect.wav");
}

/*********************** S E T U P   F U N C T I O N *************************/

// Creates the ball and paddles
function setup() {
  imageMode(CENTER);
  angleMode(DEGREES);

  createCanvas(640,680);
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,13,5);
  // Create the right paddle with UP and DOWN as controls
  // Initialize score at 0
  rightPaddle = new Paddle(width-10,height/2,this.vx,this.vy,10,60,10,DOWN_ARROW,UP_ARROW,0,10);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  // Initialize score at 0
  leftPaddle = new Paddle(0,height/2,this.vx,this.vy,10,60,10,83,87,0,10);

  if (titleDone === true) {
    // initialize avatars
    if (leftCharacter === "juanita") {
      leftAvatar = juanitaHappy;
      rightAvatar = fyveHappy;
    }

    if (rightCharacter === "juanita") {
      leftAvatar = fyveHappy;
      rightAvatar = juanitaHappy;
    }


    roboArmsSetup();
    starFallSetup();
    timerSetup();

  }

}

/************************ D R A W    F U N C T I O N *************************/

// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  if (titleDone === false) {
    titleScreen();
  }
  else {
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

  if (roboArmsActive === false && leftCharacter === "juanita" || leftTimer.timerState === "off" || leftCharacter === "fyve") {
    leftPaddle.display();
  }

  if (roboArmsActive === false && rightCharacter === "juanita" || rightTimer.timerState === "off" || rightCharacter === "fyve") {
    rightPaddle.display();
  }


  checkPowerUp();

  ball.determineWinner();
  }
}

/*************************** F U N C T I O N S *******************************/

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
    textSize(25);
    textAlign(CENTER);
    text("TP: "+leftPaddle.powerUpMeter,leftAvatar.width,fieldHeight+(height-fieldHeight)-10);
    text("TP: "+rightPaddle.powerUpMeter,width-rightAvatar.width,fieldHeight+(height-fieldHeight)-10);
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
          roboArmsActive = true;
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
          roboArmsActive = true;
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

/********************** T I M E R    F U N C T I O N S **********************/
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
      textAlign(CENTER);
      textSize(30);
      fill("#000000");
      if (this.paddle === leftPaddle) {
        text(this.timer,leftAvatar.width,fieldHeight+(height-fieldHeight)-leftAvatar.height-40);
      }
      if (this.paddle === rightPaddle) {
        text(this.timer,width-rightAvatar.width,fieldHeight+(height-fieldHeight)-rightAvatar.height-40);
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
/*
Art (character icons and robo arms): Me! I drew them.
Sounds:
Character Select: https://opengameart.org/content/mouse-click
/*
