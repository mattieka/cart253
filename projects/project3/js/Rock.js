/* -------------------------- ROCK OBJECT ----------------------------- */

//all functions pertaining to the rocks

/* ---------------------------- VARIABLE -------------------------------- */

var aRock;

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
    rocks.add(aRock);
  }
}
