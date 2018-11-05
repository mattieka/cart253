/****************************** P A D D L E **********************************/

/* A class to define how a paddle behaves. Includes:
      - player input (arrow keys and "W"/"S" keys),
      - moves paddle up or down based on player input */

/************************ C O N S T R U C T O R ******************************/

/* sets constructor properties and their arguments */
function Paddle(x,y,vx,vy,w,h,speed,downKey,upKey,score) {
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
}

/********************** U P D A T E    F U N C T I O N ***********************/

/* update function does the following:
      - updates y position based on velocity
      - constrains the resulting position to be within the playing field */

Paddle.prototype.update = function() {
  this.y = this.y + this.vy;
  this.y = constrain(this.y,0,fieldHeight-this.h);
}

/********************* D I S P L A Y   F U N C T I O N  **********************/

// Draws the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
  fill(255);
  rect(this.x,this.y,this.w,this.h);
}
