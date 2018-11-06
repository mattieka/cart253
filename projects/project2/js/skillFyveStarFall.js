/************************* PLAYER SKILLS: FYVE ***************************/

/* All code pertaining to the player "Fyve" is kept here. This includes:

1) their sprites/artwork
2) functions/behaviors for their special ability: StarFall
     - StarFall sends stars shooting from their paddle that make the other
       lose points.

/**************************** V A R I A B L E S ******************************/

var stars = [];

/**************************** STAR CONSTRUCTOR ******************************/
/* sets constructor properties and their arguments*/

function Star (paddle,minAngle,maxAngle) {
  this.paddle = paddle;
  this.minAngle = minAngle;
  this.maxAngle = maxAngle;

  this.x = paddle.x;
  this.y = paddle.y + paddle.h/2;
  this.angle = random(minAngle,maxAngle);
  this.w = 32;
  this.h = 32;
  this.speed = 5;

  this.move = function() {
    this.x = this.x + this.speed;
    this.y = this.y + this.angle;
    if (this.x > width) {
      this.x = paddle.x;
      this.y = paddle.y;
    }
  };

  this.display = function() {
    fill("#be8bdd");
    push();
      rectMode(CENTER);
      rect(this.x,this.y,this.w,this.h);
    pop();
  };
}

/************************ S E T U P   F U N C T I O N  **********************/
/* sets up stars if player chooses fyve */

starFallSetup = function() {
  if (rightCharacter === "fyve") {
    for (var i=0; i<50; i++) {
      stars.push(new Star(rightPaddle,170,-170));
    }
  }
  if (leftCharacter === "fyve") {
    for (var i=0; i<50; i++) {
      stars.push(new Star(leftPaddle,10,-10));
    }
  }
}

/************************ D R A W    F U N C T I O N  **********************/
/* draws stars*/

starFallDraw = function() {
  for (var i = 0; i<stars.length; i++) {
    stars[i].move();
    stars[i].display();
  }
}
