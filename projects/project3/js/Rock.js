/* -------------------------- EXTRA OBJECTS ----------------------------- */

//all functions pertaining to the rocks
//used during testing, no longer being used

/* ---------------------------- VARIABLE -------------------------------- */

var rockText =
  [
    "ow a rock!!!",
    "stop hitting rocks!!"
  ];


/* ------------------------------ SETUP ROCK --------------------------------- */


function setupRock() {
  rocks = new Group();
  for (var i = 0; i < 5; i++) {
    var aRock = createSprite(random(0,width),random(0,height));
    aRock.addImage(loadImage("assets/images/sprites/rock.png"));
    aRock.position.x = round(aRock.position.x/gridSize)*gridSize;
    aRock.position.y = round(aRock.position.y/gridSize)*gridSize;
    console.log(width/3,height/3);
    console.log(aRock.position.x,aRock.position.y);
    rockDialogue = new Dialogue(rockText,0);
    rocks.add(aRock);
  }
}

function rockCollision() {
  textAlign(LEFT);
  textSize(32);
  fill("#FFFFFF");
  showRockDialogue();
}

function showRockDialogue() {
  rockDialogue.display();
}
