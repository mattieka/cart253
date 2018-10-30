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

/*********************** S E T U P   F U N C T I O N *************************/

// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,10,5);
  // Create the right paddle with UP and DOWN as controls
  // Initialize score at 0
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW,0);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  // Initialize score at 0
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87,0);
}

/************************ D R A W    F U N C T I O N *************************/

// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

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

  ball.display();
  leftPaddle.display();
  rightPaddle.display();
}

/**************************** C R E D I T S **********************************/
