/******************************************************

Game - Face your Fears
Mattie KA

Collect crystals to drive back your fear and regain your courage.
Avoid the fear.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/

// -------------------------- V A R I A B L E S ---------------------------- //

// Track whether the game is over
var gameOver = false;


// Player variables
// Player position, size, velocity
var playerX;
var playerY;
var playerRadius = 25;
var playerVX = 0;
var playerVY = 0;
var playerMaxSpeed = 1;
var playerMaxSprint = 5;
// Player health
var playerCourage;
var playerMaxCourage = 100;

//Crystal variables (position, size, and amount collected)
var crystalImage;
var crystalX;
var crystalY;
var crystalW;
var crystalH;
var crystalsCollected = 0;

// Fear Variables
var fearImage;
var fearX;                     // fear position, size, velocity, colour
var fearY;
var fearW = 30;
var fearH = 30;
var updateFearW = 30;         //updated sizes here so that other functions can
var updateFearH = 30;         // access them as well
var fearFill;
var tWidth = 0;                // time value that changes width, height, and
var tHeight = 0;               // xy positions with perlin noise

// Sound variables
var courageZero;
var crystalPickup;

// --------------------------- P R E L O A D ------------------------------- //

function preload() {
  loadImages();
  courageZero = new Audio("assets/sounds/couragezero.wav");
  crystalPickup = new Audio("assets/sounds/crystalpickup.wav");
}

// ----------------------------- S E T    U P ------------------------------ //

function setup() {
  createCanvas(500,500);
  setupPlayer();
  setupFear();
  setupCrystal();
  gameOver = false;
  crystalsCollected = 0;
}

// ----------------------------- D R A W ----------------------------------- //

function draw() {
  image(floorImage,0,0,width,height); //draw background image
  handleInput();                     //detects player input and wall collisions
  displayCourage ();
  movePlayer();                      //updates player position
  drawCrystal();                     //draws crystal
  drawPlayer();                       //draws player
  moveFear();                        //updates enemy position/size
  courageDecline();                 // lowers courage (health) as time goes on
  checkEating();                     // detects collision with crytals and restores health
  fearCollide();                     // detects collision with fear
}

// --------------------------- F U N C T I O N S ---------------------------- //

// SETUP PLAYER : initializes position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  constrain(playerCourage,0,100);
  //player courage starts at 40% so that the game isnt too easy
  playerCourage = 50;
  playerRadius = 25;
}
//-----------

function loadImages() {
  crystalImage = loadImage("assets/images/crystal.png");
  floorImage = loadImage("assets/images/floor.png");
  fearImage = loadImage("assets/images/fear.png");
}

//-----------

// SETUP FEAR : intializes first enemy location and colour
function setupFear() {
  // FEAR LOCATION : sets a random location for the enemy between 0,0 and the player
  tWidth = 0;
  tHeight = 0;
  fearX = random(0,playerX-50); //random(0,width);
  fearY = random(0,playerY-50); //random(0,height);
  /*  var d = dist(fearX,fearY,playerX,playerY);
    console.log (d);
    if (d < fearW + playerRadius && d < fearH + playerRadius) {
      fearX = random(0,width);
      fearY = random(0,height);
      console.log("overlap occurred");
    } */
  }

//-----------

// SETUP CRYSTAL : initializes random locations for a crystal to appear.
function setupCrystal() {
  crystalX = random(width/10,(width/10)*9);
  crystalY = random(height/10,(height/10)*9);
  crystalW = random(10,30);
  crystalH = random(20,40);
}
//-----------

// DRAW CRYSTAL : draws crystal
function drawCrystal(){
  image(crystalImage,crystalX,crystalY,crystalW,crystalH);
//  fill("#8A2BE2");
//  noStroke();
//  ellipse(crystalX,crystalY,crystalW,crystalH);
}
//-----------

// MOVE FEAR : updates fear size, location, and colour (didnt get the tint to work like i wanted)
function moveFear() {
  /* SIZE: fearW and fearH are initial enemy widths and heights and are used to
     generate a constantly-changing new width and height that depends on
     the player's courage level */
  fearW = map(playerCourage,1,100,100,10);
  fearH = map(playerCourage,1,100,100,10);
  //console.log("courage level: " + playerCourage);
  if (playerCourage > 66){
    updateFearW = fearW + map(noise(tWidth),0,1,-20,20);
    updateFearH = fearH + map(noise(tHeight),0,1,-20,20);
    tWidth = tWidth + 0.01;
    tHeight = tHeight + 0.02;
//    fearFill = 120;
//    tint(255,fearFill);

  } else if (playerCourage >= 33) {
      updateFearW = fearW + map(noise(tWidth),0,1,-86,86);
      updateFearH = fearH + map(noise(tHeight),0,1,-86,86);
      tWidth = tWidth + 0.03;
      tHeight = tHeight + 0.04;
//      fearFill = 170;
//      tint(255,fearFill);

  } else if(playerCourage < 33) {
      updateFearW = fearW + map(noise(tWidth),0,1,-200,200);
      updateFearH = fearH + map(noise(tHeight),0,1,-200,200);
      tWidth = tWidth + 0.05;
      tHeight = tHeight + 0.06;
  //    fearFill = 255;
  //    tint(255,fearFill);

  }

  // change fear position based on noise
  fearX = fearX + map(noise(tWidth),0,1,-tWidth,tWidth);
  fearY = fearY + map(noise(tHeight),0,1,-tHeight,tHeight);
  //console.log(fearX,fearY);
  // SCREEN WRAPPING : yes, the enemies can screen wrap and the players can't
  if (fearX < 0) {
    fearX += width;
  }
  else if (fearX > width) {
    fearX -= width;
  }

  if (fearY < 0) {
    fearY += height;
  }
  else if (fearY > height) {
    fearY -= height;
  }
  image(fearImage,fearX,fearY,updateFearW,updateFearH);
//  ellipse(fearX,fearY,updateFearW,updateFearH);
}

//-----------
// HANDLE INPUT : checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(SHIFT) && keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed*3;
  }
  else if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(SHIFT) && keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed*3;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(SHIFT) && keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed*3;
  }
  else if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(SHIFT) && keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed*3;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }
}
//-----------


// MOVE PLAYER : updates player's position based on velocity. stops player at the edge of the canvas.
function movePlayer() {
  // Player stops at the sides of the screen.
  if (playerX <= playerRadius) {
    playerVX = -playerVX;
    playerVY = -playerVY;
    playerX = playerRadius + 1;
  }
  else if (playerX >= width - playerRadius) {
    playerVX = -playerVX;
    playerVY = -playerVY;
    playerX = width - playerRadius - 1;
  }

// Player stops at the top and bottom of the screen.
  if (playerY < playerRadius) {
    playerVX = -playerVX;
    playerVY = -playerVY;
    playerY = playerRadius + 1;
  }
  else if (playerY > height - playerRadius) {
    playerVX = -playerVX;
    playerVY = -playerVY;
    playerY = height - playerRadius - 1;
  }
// Update player position (note: i know it's easier/faster with += but i am easily confused so i do it the long way.)
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;
}

//-----------

//CRYSTAL COLLISION CHECK : check if the player overlaps the crystal and restores the player's courage
function checkEating() {
  // Get distance of player to crystal
  var d = dist(playerX,playerY,crystalX,crystalY);
  // Check if it's an overlap
  if (d < playerRadius + crystalW/2 && d < playerRadius + crystalH/2) {
    // Increase the player health
    console.log("collision detected");
    // declare variable for the amount of courage that player gets back.
    //the amount depends on the player's current courage. the lower the courage
    //the more courage is restored
    var courageRestore;
    constrain(playerCourage,0,100);
    console.log("current courage is" + playerCourage);
    if (playerCourage > 66) {
      courageRestore = playerMaxCourage/10;
      playerCourage = playerCourage + courageRestore;
    }
    else if (playerCourage >= 33) {
      courageRestore = playerMaxCourage/5;
      playerCourage = playerCourage + courageRestore;
    }
    else if (playerCourage < 33) {
      courageRestore = playerMaxCourage/2;
      playerCourage = playerCourage + courageRestore;
    }
    //track how many crystals are collected
    crystalPickup.play();
    crystalsCollected = crystalsCollected + 1;
    //slow fear down so it doesnt accumulate speed even if courage is high
    tWidth = tWidth - tWidth/3;
    tHeight = tHeight - tHeight/3;
    console.log("crystals collected " + crystalsCollected);
    // reset new crystal to a different location
    setupCrystal();
    console.log("courage restored to " + playerCourage);
  }
}
//-----------
//FEAR COLLISION CHECK
function fearCollide() {
  //calculate distance between player and fear, game over if they overlap.
  var d = dist(playerX,playerY,fearX,fearY);
  if (d < playerRadius/2 + updateFearW && d < playerRadius/2 + updateFearH) {
    courageZero.play();
    playerCourage = 0;
    gameOver = true;
    console.log ("game is over: " + gameOver);
    showGameOver();
  }
}

//-----------
//COURAGE DECLINE
function courageDecline () {
    // Reduce player courage/health, constrain to reasonable range
    // Spriting causes courage to drop more quickly
    if (keyIsDown(SHIFT)) {
      playerCourage = playerCourage - 0.5;
      constrain(playerCourage - 0.5,0,playerMaxCourage);
      constrain(playerCourage,0,100);
    } else {
      playerCourage = constrain(playerCourage - 0.05,0,playerMaxCourage);
      }
    //console.log(playerCourage);
    // Check if courage is at zero
    if (playerCourage > 0 && playerCourage < 1) {
      courageZero.play();
    }
    if (playerCourage === 0) {
      // If so, the game is over
      playerCourage = playerCourage;
      gameOver = true;
      showGameOver();
    }
}

//-----------
// DISPLAY COURAGE : shows amount of courage left onscreen
function displayCourage() {
  constrain(playerCourage,0,100);
  textAlign("RIGHT");
  textFont("Helvetica");
  textSize(20);
  fill("#54CDFA");
  text("courage: " + floor(playerCourage) + "%", width - 140,height-20);
}


//-----------
// DRAW PLAYER: draws the player as an ellipse
function drawPlayer() {
  fill("#54CDFA");
  strokeWeight(5);
  ellipse(playerX,playerY,playerRadius);
}
//-----------
// GAME OVER : shows game over screen
// Display text about the game being over. gives option to try again
function showGameOver() {
  fill("#000000");
  fearX = 0;
  fearY = 0;
  rect(0,0,width,height);
  textSize(32);
  textAlign(CENTER,CENTER);
  var gameOverText = "fear won out in the end.\n";
  gameOverText += "you collected " + crystalsCollected + " crystals\n";
  gameOverText += "before your courage died."
  fill("#FFFFFF");
  text(gameOverText,width/2,height/2);
  text("press ENTER to try again.",width/2,height*0.66);
  if (keyIsDown(ENTER)) {
    setup();
  }
}

// ---------------- I M A G E / S O U N D     S O U R C E S ---------------- //
/***
crystal: https://ubisafe.org/explore/gem-vector-hexagon/#gal_post_7174_clipped-clipart-gem-6.png
ground: https://opengameart.org/content/handpainted-stone-floor-texture
orb used as fear: https://opengameart.org/content/orbs-and-plats
pickup crystal: https://opengameart.org/content/beep-tone-sound-sfx
courage zero: https://opengameart.org/content/bad-sound-2
***/
