/***************************** TITLE SCREEN *********************************/
/* it's the title screen. runs before the game. */
/* lets player choose character, sets variables accordingly. */

function titleScreen () {
  background(0);
  textSize(30);
  textAlign(CENTER);
  fill ("#ffffff");
  text("Right-side Player, choose your character!",width/2,70);
  push();
    textSize(20);
    text("Each character has a SPECIAL ABILITY that you can use when your TP is at 10! Press 'd' or '<--' to use it!",width/2-width/4-10,height/5,350);
  pop();
  imageMode(CENTER);
  image(juanitaHappy,width/3,height/2-40);
  image(fyveHappy,width/3*2,height/2-40);
    if (keyIsDown(LEFT_ARROW) || rightCharacter === "juanita") {

      leftCharacter = "fyve";
      rightCharacter = "juanita";

      push();
        rectMode(CENTER);
        strokeWeight(5);
        noFill();
        stroke("#ead2f7");
        rect(width/3,height/2-40,juanitaHappy.width+5,juanitaHappy.height+5);
      pop();
      text("JUANITA", width/2,height/3*2-10);
      textSize(20);
      text("Juanita's special ability is ROBOARMS, which gives her two extra paddles! The ROBOARMS are immune to Fyve's special ability!",width/2-width/4-10,height/2+150,350);
      textSize(30);
      text("Now hit enter to play!",width/2,height-50);
        if (keyIsDown(ENTER)) {
          titleDone = true;
          setup();
        }
      }
    if (keyIsDown(RIGHT_ARROW) || rightCharacter === "fyve") {

      leftCharacter = "juanita";
      rightCharacter = "fyve";

      push();
        rectMode(CENTER);
        strokeWeight(5);
        noFill();
        stroke("#ead2f7");
        rect(width/3*2,height/2-40,fyveHappy.width+5,fyveHappy.height+5);
      pop();
      text("FYVE", width/2,height/3*2-10);
      textSize(20);
      text("Fyve's special ability is STARFALL, which sends stars shooting at the other player! If their paddle is hit by a star, they LOSE POINTS!",width/2-width/4-10,height/2+150,350);
      textSize(30);
      text("Now hit enter to play!",width/2,height-50);
        if (keyIsDown(ENTER)) {
          titleDone = true;
          setup();
      }
    }
}
