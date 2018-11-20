/* -------------------------- ROCK OBJECT ----------------------------- */

//all functions pertaining to the rocks

/* ---------------------------- VARIABLES -------------------------------- */

var juanita;
var juanitaText = [
  "hewwo?????"
];

/* ------------------------------ SPRITE SETUP --------------------------------- */

function setupFriend() {
  friends = new Group();
  var juanita = createSprite(width/2,height/2);
  juanita.addImage(loadImage("assets/images/sprites/juanita.png"));
  juanita.position.x = round(juanita.position.x/gridSize)*gridSize;
  juanita.position.y = round(juanita.position.y/gridSize)*gridSize;
  juanitaDialogue = new Dialogue(juanitaText,0);
  friends.add(juanita);
}

function juanitaCollision() {
  textAlign(LEFT);
  textSize(32);
  fill("#FFFFFF");
  showJuanitaDialogue();
}

function showJuanitaDialogue() {
  juanitaDialogue.avatarDisplay();
}
