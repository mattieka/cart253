// --------------------------- B A L L -------------------------------- //

// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles. also keeps track of score!

/******** CONSTRUCTOR *********/
// gives the ball all of its properties, like size/velocity/position/speed.
function Ball(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
}

/******** UPDATE *********/
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Ball.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y,0,height-this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;
    //NOTE put the sound effect back in:
    beepSFX.currentTime = 0;
    beepSFX.play();
  }
}

/******** OFFSCREEN CHECK *********/
// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Ball.prototype.isOffScreen = function () {
  // checks if the ball went offscreen, and if so, triggers reset function
  if (this.x + this.size < 0 || this.x > width) {
    return true;
  }
  else {
    return false;
  }
}


/******** DISPLAY *********/
// display()
//
// Draw the ball as a rectangle on the screen
Ball.prototype.display = function () {
  fill(255);
  rect(this.x,this.y,this.size,this.size);
}


/******** COLLISIONS *********/
// handleBallPaddleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball.prototype.handleBallPaddleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size/2 > paddle.x - paddle.w/2 && this.x - this.size/2 < paddle.x + paddle.w/2) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size/2 > paddle.y - paddle.h/2 && this.y - this.size/2 < paddle.y + paddle.h/2) {
      // If so, move ball back to previous position (by subtracting current velocity)
      this.x = this.x - this.vx;
      this.y = this.y - this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
      // NOTE: put the sound effect for the bounce back.
      beepSFX.currentTime = 0;
      beepSFX.play();
    }
  }
}


/******** RESET *********/
// reset()
// NOTE: FUNCTION ADDED/MODIFIED:
//triggered if ball is detected offscreen and checks which side
// then it adjusts score accordingly, and resets the ball back to the center,
// going toward the player who last scored

// Set position back to the middle of the screen
Ball.prototype.reset = function () {
  //       split up the offscreen function into left side and right side
  //       to better keep track of which side the ball went off
  if (this.x < 0) {
    rightPaddle.score = rightPaddle.score + 1;
    console.log("right score: " + rightPaddle.score);
    this.x = width/2;
    this.y = height/2;
    this.vx = random(3,10);
  } else if (this.x > width) {
    leftPaddle.score = leftPaddle.score + 1;
    this.x = width/2;
    this.y = height/2;
    this.vx = random(-10,-3);
    console.log("left score: " + leftPaddle.score);
  }
  this.x = width/2;
  this.y = height/2;
}

/******** DETERMINE WINNER *********/
//NOTE: FUNCTION ADDED!
//checks if a player's score is 4, and if so, declare them the WINNER

Ball.prototype.determineWinner = function () {
  // when the LEFT PADDLE is the first to reach a score of 4, declare them winner
  if (leftPaddle.score == 4) {
    // cover screen in black rectangle
    fill ("#000000");
    rect (width/2,height/2,width,height);
    //center ball so that it stops moving and doesnt add to the score
    this.vx = 0;
    this.vy = 0;
    this.x = width/2;
    this.y = height/2;
    // text and text color
    textSize(50);
    textAlign(CENTER);
    fill ("#ef3326");
    text("LOSE",width/4*3,height/2);
    fill ("#4de257");
    text("WIN",width/4,height/2);
    //reset message
    fill ("#ffffff");
    text ("press ENTER to try again!",width/2,height-50);
    wrongKey();
    if (keyIsDown(ENTER)) {
      restartSound.play();
      setup();
    }
  } else if (rightPaddle.score == 4) {
    fill ("#000000");
    rect (width/2,height/2,width,height);
    //center ball so that it stops moving and doesnt add to the score
    this.vx = 0;
    this.vy = 0;
    this.x = width/2;
    this.y = height/2;
    // text and text color
    textSize(50);
    textAlign(CENTER);
    fill ("#4de257");
    text("WIN",width/4*3,height/2);
    fill ("#ef3326");
    text("LOSE",width/4,height/2);
    //reset message
    fill ("#ffffff");
    text ("press ENTER to try again!",width/2,height-50);
    wrongKey();
    if (keyIsDown(ENTER)) {
      restartSound.play();
      setup();
    }
  }
}

// ------------------------------- E N D ----------------------------------- //
