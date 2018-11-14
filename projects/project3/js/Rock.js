/* -------------------------- ROCK OBJECT ----------------------------- */

//all functions pertaining to the rocks

/* ---------------------------- VARIABLE -------------------------------- */

var aRock;

/* ------------------------------ SETUP ROCK --------------------------------- */

function setupRock() {
  rocks = new Group();
  for (var i = 0; i < 1; i++) {
    var aRock = createSprite(width/3,height/3,32,32);
    aRock.addImage(loadImage("assets/images/sprites/rock.png"));
    aRock.position.x = round(aRock.position.x/gridSize)*gridSize;
    aRock.position.y = round(aRock.position.y/gridSize)*gridSize;
    console.log(width/3,height/3);
    console.log(aRock.position.x,aRock.position.y);
    rocks.add(aRock);
  }
}
