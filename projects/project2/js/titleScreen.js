/***************************** TITLE SCREEN *********************************/
/* it's the title screen. runs before the game. */

/* lets player see special ability information and choose character, sets variables accordingly.
    when done, game restarts from setup so that setup functions requiring updated
    variables can run properly */

function titleScreen () {
  //sets background and text size for character selection message
  background(0);
  textSize(30);
  textAlign(CENTER);
  fill ("#ffffff");
  text("Right-side Player, choose your character!",width/2,70);

  // TP and special ability info/controls
  push();
    textSize(20);
    text("Each character has a SPECIAL ABILITY that you can use when your TP is at 10! Press 'd' or '<--' to use it!",width/2-width/4-10,height/5,350);
  pop();

  //display character sprites
  imageMode(CENTER);
  image(juanitaHappy,width/3,height/2-40);
  image(fyveHappy,width/3*2,height/2-40);

  //display box around icon and special ability info if player chooses juanita
    if (rightCharacter === "juanita") {
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
      //instructions for starting the game
      textSize(30);
      text("Now hit enter to play!",width/2,height-50);
      }
  //display box around icon and special ability info if player chooses fyve
    if (rightCharacter === "fyve") {
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
      //instructions for starting the game
      textSize(30);
      text("Now hit enter to play!",width/2,height-50);
    }
}

/*************************** KEYPRESS FUNCTION *******************************/

//when an arrow key is pressed, variables change and a sound plays.
function keyPressed() {
  if (titleDone === false) {
    if (keyCode === LEFT_ARROW) {
      charaSelect.currentTime = 0;
      charaSelect.play();
      leftCharacter = "fyve";
      rightCharacter = "juanita";
    } else if (keyCode === RIGHT_ARROW) {
      charaSelect.currentTime = 0;
      charaSelect.play();
      leftCharacter = "juanita";
      rightCharacter = "fyve";
    } else if (keyCode === ENTER) {
      startGame.currentTime = 0;
      startGame.play();
      titleDone = true;
      setup();
    }
  }
}

/********************************* E N D *************************************/
