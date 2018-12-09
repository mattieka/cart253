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
var gameState =  "intro";
var introString;


/* ---------------------------- P R E L O A D ------------------------------- */
// Description of preload

function preload() {

  preloadDialogue();
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

  if (gameState === "intro") {
    intro();
  } else if (gameState === "game") {
    drawSprites();
    runCharacter();
    allCheckDepth();
    checkTalked();
  } else if (gameState === "outro") {
    outro();
  }
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

function intro() {
  background(0);
  textSettings();
  textAlign(CENTER);
  text(introString[0],width/2,height/5);
  text(introString[1],width/2,height/5*2);
  text(introString[2],width/2,height/5*3);
  text(introString[3],width/2,height/5*4);
  if (keyWentDown(32) === true && gameState === "intro") {
    console.log(gameState);
    gameState = "game";
    console.log(gameState);
  }
}

function checkTalked() {
  if (friendsTalkedTo === 5) {
    gameState = "outro";
  }
}

function outro() {
  background(0);
  textSettings();
  textAlign(CENTER);
  text(introString[5],width/2,height/5*2);
  text(introString[6],width/2,height/5*3);
  if (keyWentDown(32) === true && gameState === "outro") {
    console.log(gameState);
    gameState = "intro";
    friendsTalkedTo = 0;
    resetDialogue();
    console.log(gameState);
  }
}
