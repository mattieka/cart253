
/************************* PLAYER SKILLS: FYVE ***************************/

/* All code pertaining to the player "Fyve" is kept here. This includes:

NOTE: PREVIOUS VERSION OF STARFALL - NO LONGER NEEDED 


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

/* sets stars' initial xy positions to be on their respective paddles,
   their angle to be a random value between min and max, and speed to 5 */
  this.x = paddle.x;
  this.y = paddle.y + paddle.h/2;
  this.w = 32;
  this.h = 32;
  this.angle = random(minAngle,maxAngle);
  this.speed = 5;

  this.shoot = function() {
    function keyPressed() {
      if (keycode === 68 && leftCharacter === "fyve") {
        for (var i=0; i<20; i++) {
          stars.push(new Star(leftPaddle,10,-10,rightPaddle));
        }
      }
      if (keycode === LEFT_ARROW && rightCharacter === "fyve") {
        for (var i=0; i<20; i++) {
          stars.push(new Star(rightPaddle,90,-90,leftPaddle));
        }
      }
    }
  };

  this.move = function() {
    if (this.paddle === leftPaddle) {
      this.x = this.x + this.speed;
      this.y = this.y + this.angle;
    }

    if (this.paddle === rightPaddle) {
      this.x = this.x - this.speed;
      this.y = this.y + this.angle;
    }
  };

  this.display = function() {
      imageMode(CENTER);
      image(starImage,this.x,this.y,starImage.width/2,starImage.height/2);
  };
}

/************************ D R A W    F U N C T I O N  **********************/
/* draws stars*/

starFallDraw = function () {
  for (var i = 0; i<stars.length; i++) {
    stars[i].shoot();
    stars[i].move();
    stars[i].display();
  }
}
