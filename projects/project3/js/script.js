/*****************

Grid-based movement and interactions with other objects.
An attempt at dialogue was made

Uses p5.play library

NOTE: when you collide with the wall the text flashes a lot so if youre
sensitive to flashing lights please be careful!!!!!

By Mattie KA

******************/

/* -------------------------- V A R I A B L E S ----------------------------- */

var gridSize = 16;
var playerCharacter;
var rock1;
var textBox;


/* ---------------------------- P R E L O A D ------------------------------- */
// Description of preload

function preload() {
  textBox = loadImage("assets/images/text/textbox.png");
  testDialogue = loadJSON("dialogueJSON/testDialogue.json");

  dudesRaw = loadJSON("dialogueJSON/dudesDialogue.json");
  preloadPortraits();
  preloadAnimations();
  preloadWalkAnimations();

  }

/* ------------------------------ S E T U P --------------------------------- */

// Description of setup

function setup() {
  createCanvas(800,512);
  setupCharacter();
  setupRock();
  setupPond();
  setupDialogue();
  setupFriend();
  updateTextBoxDimensions();
  setSpriteBoundingBoxes();
}


/* ------------------------------- D R A W ---------------------------------- */
// Description of draw()

function draw() {
  background(70);
  grid();
  drawSprites();
  runCharacter();
  allCheckDepth();

}

/* -------------------------- F U N C T I O N S ---------------------------- */

//DRAW GRID
function grid() {
  for (var x = 0; x < width; x = x + width/50) {
    for (var y = 0; y < height; y = y + height/32) {
      stroke(255);
      strokeWeight(1);
      line(x,0,x,height);
      line(0,y,width,y);
    }
  }
}

//KEY PRESSED
function keyPressed(){
  juanita.keyPressed();
  dudes.keyPressed();
  ereth.keyPressed();
  phor.keyPressed();
  ceese.keyPressed();
}
