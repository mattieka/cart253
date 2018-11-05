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
var fieldWidth = 680;
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

  var rightCharacter = "juanita";
  var leftCharacter;
  createCanvas(640,680);
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,10,5);
  // Create the right paddle with UP and DOWN as controls
  // Initialize score at 0
  rightPaddle = new Paddle(width-10,height/2,this.vx,this.vy,10,60,10,DOWN_ARROW,UP_ARROW,0);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  // Initialize score at 0
  leftPaddle = new Paddle(0,height/2,this.vx,this.vy,10,60,10,83,87,0);

  // initialize avatars
  leftAvatar = spriteYellowHappy;
  rightAvatar = spriteGreenHappy;

  roboArmsSetup();
}

/************************ D R A W    F U N C T I O N *************************/

// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);
  avatarZone();

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

  //juanita's robo arms

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


/**************************** C R E D I T S **********************************/
