/***************************** TITLE SCREEN *********************************/
/* it's the title screen. runs before the game. */
/* lets player choose character, sets variables accordingly. */

function titleScreen () {
  background(0);
  textSize(30);
  textAlign(CENTER);
  fill ("#ffffff");
  text("Right-side Player, choose your character!",width/2,height/4);

  imageMode(CENTER);
  image(spriteJuanita,width/3,height/2);
  image(spriteYellowHappy,width/3*2,height/2);
    if (keyIsDown(LEFT_ARROW) || rightCharacter === "juanita") {

      leftCharacter = "fyve";

      rightCharacter = "juanita";
      topRoboArm = new roboArms (fieldWidth-10,100,this.vx,this.vy,10,60,10,DOWN_ARROW,UP_ARROW,rightPaddle.score);
      midRoboArm = new roboArms (fieldWidth-10,fieldHeight/2-30,this.vx,this.vy,10,60,10,DOWN_ARROW,UP_ARROW,rightPaddle.score);
      bottomRoboArm = new roboArms (fieldWidth-10,fieldHeight-160,this.vx,this.vy,10,60,10,DOWN_ARROW,UP_ARROW,rightPaddle.score);
      push();
        rectMode(CENTER);
        strokeWeight(5);
        noFill();
        stroke("#ead2f7");
        rect(width/3,height/2,spriteJuanita.width+5,spriteJuanita.height+5);
      pop();
      text("Now hit enter to play!",width/2,height/4*3);
        if (keyIsDown(ENTER)) {
          titleDone = true;
        }
      }
    if (keyIsDown(RIGHT_ARROW) || rightCharacter === "fyve") {
      leftCharacter = "juanita";
        topRoboArm = new roboArms (0,100,this.vx,this.vy,10,60,10,83,87,leftPaddle.score);
        midRoboArm = new roboArms (0,fieldHeight/2-30,this.vx,this.vy,10,60,10,83,87,leftPaddle.score);
        bottomRoboArm = new roboArms (0,fieldHeight-160,this.vx,this.vy,10,60,10,83,87,leftPaddle.score);

      rightCharacter = "fyve";
      push();
        rectMode(CENTER);
        strokeWeight(5);
        noFill();
        stroke("#ead2f7");
        rect(width/3*2,height/2,spriteGreenHappy.width+5,spriteGreenHappy.height+5);
      pop();
      text("Now hit enter to play!",width/2,height/4*3);
        if (keyIsDown(ENTER)) {
          titleDone = true;
      }
    }
    console.log(rightCharacter);
    //starFallSetup();
}
