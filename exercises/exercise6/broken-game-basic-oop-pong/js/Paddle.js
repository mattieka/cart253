// Paddle
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

////////////////////////////////////////////////////// FIXED!!!!!!! x3 !!
//Paddle constructor
//Sets the properties with the provided arguments or defaults
function Paddle(x,y,vx,vy,w,h,speed,downKey,upKey) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  ////////////////////////////////////////////////////// FIXED!!!!!!!
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
}

// handleInput()
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {
  ////////////////////////////////////////////////////// FIXED!!!!!!! x2
  if (keyIsDown(upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(downKey)) {
    this.vy = -this.speed;
  }
}
// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  ////////////////////////////////////////////////////// FIXED!!!!!!! x2!!!
  this.y = constrain(this.y,0,height-this.h);
}

// display()
// Draw the paddle as a rectangle on the screen
//////////////////////////////////////////////////////// FIXED!!!!!!! x2!!!!!
Paddle.prototype.display = function() {
  rect(this.x,this.y,this.w,this.h);
}
