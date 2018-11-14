/* -------------------------- POND OBJECT ----------------------------- */

//all functions pertaining to the ponds

/* ---------------------------- VARIABLE -------------------------------- */

var aPond;

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
    ponds.add(aPond);
  }
}

function pondCollision() {
  textAlign(CENTER);
  textSize(50);
  fill("#FFFFFF");
  text("oh its a pond",width/2,50);
}
