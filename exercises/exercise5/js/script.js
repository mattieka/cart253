// ------------------------ I N T R O  /  I N F O -------------------------- //

/**
object oriented pong, by mattie k.a.

colour-based scoring system, arrow keys control the right hand paddle,
W and S control the left hand paddle.

more or less the same as the previous iteration of pong that i made, but this
one's been OOPed . ooped. hahah
**/

// --------------------------- V A R I A B L E S --------------------------- //

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;

// variable to keep paddle away from the very edge
var paddleInset = 20;

// variables for sounds
var beepSFX;
var restartSound;

// ---------------------------- P R E L O A D ------------------------------ //

function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  restartSound = new Audio("assets/sounds/winner.wav");
}

// ----------------------------- S E T U P --------------------------------- //

// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
  //make sure rectangles have their origin point at the center
  rectMode(CENTER);
  noStroke();
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,10,5);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-paddleInset,height/2,0,0,20,70,10,DOWN_ARROW,UP_ARROW,0,this.scoreColor);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(paddleInset,height/2,0,0,20,70,10,83,87,0,this.scoreColor);
}

// ------------------------------ D R A W ---------------------------------- //

// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  backgroundGradient();

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  if (ball.isOffScreen()) {
    ball.reset();
  }

  ball.handleBallPaddleCollision(leftPaddle);
  ball.handleBallPaddleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();
  ball.determineWinner();
}

// ---------------------------- F U N C T I O N S -------------------------- //
// for functions that are not related to the paddle OR the ball

/******** BACKGROUND COLOR *********/
//NOTE: FUNCTION ADDED!
// background color changes hue based on the position of the ball.
function backgroundGradient() {
  if (ball.x < width) {
    push();
      colorMode(HSB,255);
      background(map(ball.x,0,width,0,255),180,200);
    pop();
  }
}

/******** WRONG KEY! *********/
//NOTE: FUNCTION ADDED!
// i keep accidentally hitting shift instead of enter, made a function about it
// for funsies
function wrongKey () {
  if (keyIsDown(SHIFT)) {
    push();
      console.log("shift pressed")
      textSize(10);
      fill("#ffffff");
      text("that is the shift key, dingus",width/2,height/4);
    pop();
    }
}

/** SOUND SOURCE: https://opengameart.org/content/completion-sound **/

// ------------------------------- E N D ----------------------------------- //
