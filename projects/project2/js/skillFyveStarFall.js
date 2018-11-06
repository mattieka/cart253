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

function Star () {
  this.x = leftPaddle.x;
  this.y = leftPaddle.y + leftPaddle.h/2;
  this.angle = random(-10,10);
  this.w = 32;
  this.h = 32;
  this.speed = 5;

  this.move = function() {
    this.x = this.x + this.speed;
    this.y = this.y + this.angle;
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
  if (rightCharacter === "fyve" || leftCharacter === "fyve") {
    for (var i=0; i<50; i++) {
      stars.push(new Star());
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
