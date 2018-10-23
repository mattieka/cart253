// --------------------------- P A D D L E  -------------------------------- //

// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
function Paddle(x,y,w,h,speed,downKey,upKey,score,scoreColor) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  this.score = score;
  this.scoreColor = scoreColor;
}


/******** PLAYER INPUT *********/
// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  }
  else {
    this.vy = 0;
  }

  //NOTE: FUNCTION ADDED! stops paddle from going offscreen if player sends it
  //      too far up or down. did this last time, now im OOP-ing (??) it.
  //      ooping. haha. anyway, this function detects when the paddle passes
  //      the edges of the screen, sets the velocity to 0, then sends it back
  //      onto the screen by adjusting its y-position.

  // block paddle at the top of the screen
  if (this.y = this.h/2 <= 0) {
    this.vy = 0;
    this.y = this.y + this.h/2;
  }

  //block paddle at the top of the screen
  if (this.y + this.h/2 >= height) {
    this.vy = 0;
    this.y = this.y - this.h/2;
  }

}


/******** UPDATE *********/
// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y,0,height-this.h);
}


/******** DISPLAY *********/
// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
  fill(255);
  rect(this.x,this.y,this.w,this.h);
}
