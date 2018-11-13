/************************* PLAYER SKILLS: FYVE ***************************/

/* All code pertaining to the player "Fyve"'s
  functions/behaviors for their special ability: StarFall
  StarFall sends stars shooting from their paddle that make the other
  lose points. */

/**************************** V A R I A B L E S ******************************/

// variable for star array
var stars = [];

/**************************** STAR CONSTRUCTOR ******************************/
/* sets constructor properties and their arguments*/

function Star (paddle,minAngle,maxAngle,oppositePaddle) {
  this.paddle = paddle;
  this.minAngle = minAngle;
  this.maxAngle = maxAngle;
  this.oppositePaddle = oppositePaddle;

  this.x = paddle.x;
  this.y = paddle.y + paddle.h/2;
  this.angle = random(minAngle,maxAngle);
  this.w = 32;
  this.h = 32;
  this.speed = 7;

/* STAR MOVEMENT FUNCTION : -------------------------------------
    - checks which paddle the stars belong to
    - moves horizontally at 'speed' or '-speed' based on which paddle stars belong to
    - moves vertically based on the angle it is assigned, divided by 7 so that they
      dont immidiately shoot off the screen
    - when the stars go offscreen, their position is reset to their corresponding
      paddle and a new angle is chosen randomly so that the stars don't always
      have the same angle
*/
  this.move = function() {
    if (this.paddle === leftPaddle) {
      this.x = this.x + this.speed;
      this.y = this.y + this.angle/7;
      if (this.x > width) {
        this.x = paddle.x;
        this.y = paddle.y;
        this.angle = random(minAngle,maxAngle);
      }
    }

    if (this.paddle === rightPaddle) {
      this.x = this.x - this.speed;
      this.y = this.y + this.angle/7;
      if (this.x < 0) {
        this.x = paddle.x;
        this.y = paddle.y;
        this.angle = random(minAngle,maxAngle);
      }
    }
  };

/* STAR DISPLAY FUNCTION : -------------------------------------
    - sets image mode to center, displays star image at their current x and y positions
    - image shrunk down a bit so they are not gigantic
*/
  this.display = function() {
    push();
      imageMode(CENTER);
      image(starImage,this.x,this.y,starImage.width/2,starImage.height/2);
    pop();
  };

/* STAR COLLISION FUNCTION : -------------------------------------
    - calculates distance between star and paddle, and if theres an overlap,
      reduce score. if score is already 0, leave it at zero.
*/
  this.paddleCollide = function() {
    //check if star overlaps the paddle
    var distancePaddle = dist(this.x,this.y,this.oppositePaddle.x+this.oppositePaddle.w/2,this.oppositePaddle.y+this.oppositePaddle.h/2);
    if (distancePaddle < 10) {
      if (this.oppositePaddle.score >= 1) {
        this.oppositePaddle.score = this.oppositePaddle.score - 1;
      } else if (this.oppositePaddle.score <= 0) {
          this.oppositePaddle.score = 0;
      }
    }
  };
}

/************************ S E T U P   F U N C T I O N  **********************/
/* sets up stars if player chooses fyve */

starFallSetup = function() {
  if (rightCharacter === "fyve") {
    for (var i=0; i<40; i++) {
      stars.push(new Star(rightPaddle,-120,120,leftPaddle));
    }
  }
  if (leftCharacter === "fyve") {
    for (var i=0; i<40; i++) {
      stars.push(new Star(leftPaddle,-45,45,rightPaddle));
    }
  }
}

/************************ D R A W    F U N C T I O N  **********************/
/* draws stars*/

starFallDraw = function() {
  for (var i = 0; i<stars.length; i++) {
    stars[i].move();
    stars[i].display();
    stars[i].paddleCollide();
  }
}

/********************************* E N D *************************************/
