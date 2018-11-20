/* -------------------------- POND OBJECT ----------------------------- */

//all functions pertaining to the ponds

/* ---------------------------- VARIABLE -------------------------------- */

var aPond;
var pondText = [
  "oh yeah thats a pond if i ever saw one"
];

/* ------------------------------ SETUP PONDS --------------------------------- */

function setupPond() {
  ponds = new Group();
  for (var i = 0; i < 2; i++) {
    var aPond = createSprite(random(0,width),random(0,height));
    aPond.addImage(loadImage("assets/images/sprites/pond.png"));
    aPond.position.x = round(aPond.position.x/gridSize)*gridSize;
    aPond.position.y = round(aPond.position.y/gridSize)*gridSize;
    console.log(width/3,height/3);
    console.log(aPond.position.x,aPond.position.y);
    pondDialogue = new Dialogue(pondText,0);
    ponds.add(aPond);
  }
}

function pondCollision() {
  textAlign(LEFT);
  textSize(32);
  fill("#FFFFFF");
  showPondDialogue();
}

function showPondDialogue() {
  pondDialogue.display();
}
