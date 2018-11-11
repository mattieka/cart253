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

  this.display = function() {
    fill("#be8bdd");
    push();
      imageMode(CENTER);
      image(starImage,this.x,this.y,starImage.width/2,starImage.height/2);
    pop();
  };

  this.paddleCollide = function() {
    //check if star overlaps the paddle or the robo arms on the x axis
    var distancePaddle = dist(this.x,this.y,this.oppositePaddle.x+this.oppositePaddle.w/2,this.oppositePaddle.y+this.oppositePaddle.h/2);
    if (distancePaddle < 10) {
      this.oppositePaddle.score = this.oppositePaddle.score - 1;
      console.log(this.oppositePaddle.score);
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
