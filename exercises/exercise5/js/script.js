// ------------------------ I N T R O  /  I N F O -------------------------- //

/**
object oriented pong, by mattie k.a.

// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.
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

// ---------------------------- P R E L O A D ------------------------------ //

function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
}

// ----------------------------- S E T U P --------------------------------- //

// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
  //make sure rectangles have their origin point at the center
  rectMode(CENTER);
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
  background(0);

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
}
