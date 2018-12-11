/*****************

Grid-based movement and interactions with other objects.
Uses p5.play library

By Mattie KA

******************/

/* -------------------------- V A R I A B L E S ----------------------------- */

// variable for the grid size
var gridSize = 16;

// player character variable
var playerCharacter;
//var rock1;

// text box variable
var textBox;

// game state variable; initialized at "intro"
var gameState =  "intro";

// variable containing string containing the text for the intro and outro
var introString;

// variable for the background image
var backgroundImage;


/* ---------------------------- P R E L O A D ------------------------------- */
// preloads background, dialogue, character portraits, animations, and other images

function preload() {
  preloadBackground();
  preloadDialogue();
  preloadPortraits();
  preloadAnimations();
  preloadWalkAnimations();

  }

/* ------------------------------ S E T U P --------------------------------- */

// sets up canvas size, dialogue, friends, updates text box dimensions, and
// sets custom sprite bounding boxes (colliders)
function setup() {
  createCanvas(800,512);
  setupCharacter();
  //setupRock();
  //setupPond();
  setupDialogue();
  setupFriend();
  updateTextBoxDimensions();
  setSpriteBoundingBoxes();
}


/* ------------------------------- D R A W ---------------------------------- */

function draw() {
  background(70);
// enables grid
  grid();

// if game is in intro state, run intro
// if game is in game state, run game
// if game is in outro state, run ending
  if (gameState === "intro") {
    intro();
  } else if (gameState === "game") {
    image(backgroundImage,0,0);
    checkForTextBoxPosition();
    drawSprites();
    runCharacter();
    allCheckDepth();
    checkTalked();
  } else if (gameState === "outro") {
    outro();
  }
}

/* -------------------------- F U N C T I O N S ---------------------------- */

/* -------------------------- GRID ----------------------------- */
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

/* -------------------------- PRELOAD BACKGROUND ----------------------------- */

function preloadBackground() {
  backgroundImage = loadImage("assets/images/background.png");
}

/* -------------------------- CHARACTER KEY PRESSED FUNCTIONS ----------------------------- */
//KEY PRESSED
function keyPressed(){
  juanita.keyPressed();
  dudes.keyPressed();
  ereth.keyPressed();
  phor.keyPressed();
  ceese.keyPressed();
  bookCase.keyPressed();
  cuteTeddy.keyPressed();
  mitkerTheToad.keyPressed();
  tree.keyPressed();
  waxStatue.keyPressed();
}

/* -------------------------- CHECK FOR TEXT POSITION ----------------------------- */
// if the player is on the top half of the screen, display text box on the bottom.
// if the player is on the bottom half of the screen, display text box on the top.
function checkForTextBoxPosition() {
  if (playerCharacter.position.y > height/2) {
    textBoxY = 0;
    updateTextBoxDimensions();
  } else {
    textBoxY = height - 192;
    updateTextBoxDimensions();
  }
}

/* -------------------------- INTRO FUNCTION ----------------------------- */
// shows text for intro, changes gamestate, displays instructions
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

/* -------------------------- CHECKED TALKED ----------------------------- */
//checks how many characters the player has interacted with. once all five
//characters have been spoken to, the game ends.

function checkTalked() {
  if (friendsTalkedTo === 5) {
    gameState = "outro";
  }
}

/* -------------------------- OUTRO FUNCTION ----------------------------- */
//displays ending text, lets player start over if they so choose.
//resets dialogue, friendsTalkedTo, and player position.
//also sets game state back to intro
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
    playerCharacter.position.x = width/2+16;
    playerCharacter.position.y = 150;
    console.log(gameState);
  }
}

/* -------------------------- END ----------------------------- */
