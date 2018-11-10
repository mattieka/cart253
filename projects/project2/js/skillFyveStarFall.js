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
  this.speed = 5;

  this.resetPosition = function () {
    if (starPositionReset === false){
      if (rightCharacter === "fyve") {
        this.paddle = rightPaddle;
        this.minAngle = 170;
        this.maxAngle = -170
        this.oppositePaddle = leftPaddle;
        this.x = paddle.x;
        this.y = paddle.y + paddle.h/2;
      }
      if (leftCharacter === "fyve") {
        this.paddle = leftPaddle;
        this.minAngle = 10;
        this.maxAngle = -10;
        this.oppositePaddle = rightPaddle;
        this.x = paddle.x;
        this.y = paddle.y + paddle.h/2;
      }
      starPositionReset = true;
    }
  }

  this.move = function() {
    if (leftCharacter === "fyve") {
      function keyPressed() {
        if (keycode === 68) {
          for (var i=0; i<20; i++) {
            stars.push(new Star(leftPaddle,10,-10,rightPaddle));
          }
        }
      }
      this.x = this.x + this.speed;
      this.y = this.y + this.angle;
      if (this.x > width) {
        this.x = paddle.x;
        this.y = paddle.y;
      }
    }

    if (this.paddle === rightPaddle) {
      this.x = this.x - this.speed;
      this.y = this.y - this.angle;
      if (this.x < 0) {
        this.x = paddle.x;
        this.y = paddle.y;
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
    // on multiple lines for clarity
    if (this.x + starImage.width/2 > oppositePaddle.x && this.x < oppositePaddle.x + oppositePaddle.w
        ||
        this.x + starImage.width/2 > roboArms.x && this.x < roboArms.x + roboArms.w) {
          // check if ball overlaps paddle or robo arms on y axis
          if (this.y + starImage.height/2 > oppositePaddle.y && this.y < oppositePaddle.x + oppositePaddle.h
              ||
              this.y + starImage.height/2 > roboArms.y && this.y < roboArms.y + roboArms.h) {
                oppositePaddle.score = oppositePaddle.score - 1;
              }
        }
  };
}

/************************ S E T U P   F U N C T I O N  **********************/
/* sets up stars if player chooses fyve */

starFallSetup = function() {
  if (rightCharacter === "fyve") {
    for (var i=0; i<20; i++) {
      stars.push(new Star(rightPaddle,90,-90,leftPaddle));
    }
  }
  if (leftCharacter === "fyve") {
    for (var i=0; i<3; i++) {
      stars.push(new Star(leftPaddle,10,-10,rightPaddle));
    }
  }
}

/************************ D R A W    F U N C T I O N  **********************/
/* draws stars*/

starFallDraw = function() {
  for (var i = 0; i<stars.length; i++) {
    stars[i].resetPosition();
    stars[i].move();
    stars[i].display();
  //  stars[i].paddleCollide();
  }
}
