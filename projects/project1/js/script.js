/******************************************************

Game - Face your Fears
Mattie KA

Collect crystals to drive back your fear and regain your courage.
Avoid the fear.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

STUFF LEFT TO DO:
1) change visuals and sounds

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
var playerMaxSpeed = 2;
var playerMaxSprint = 5;
// Player health
var playerCourage;
var playerMaxCourage = 100;

//Crystal variables (position, size, and amount collected)
var crystalX;
var crystalY;
var crystalW;
var crystalH;
var crystalsCollected = 0;

// Fear Variables
var fearX;                     // fear position, size, velocity, colour
var fearY;
var fearW = 30;
var fearH = 30;
var updateFearW = 30;         //updated sizes here so that other functions can
var updateFearH = 30;         // access them as well
var fearFill;
var tWidth = 0;                // time value that changes width, height, and
var tHeight = 0;               // xy positions with perlin noise

// ----------------------------- S E T    U P ------------------------------ //

function setup() {
  createCanvas(500,500);
  setupPlayer();
  setupFear();
  setupCrystal();
  gameOver = false;
}

// ----------------------------- D R A W ----------------------------------- //

function draw() {
  background("#00FFFF");
  handleInput();                     //detects player input and wall collisions
  displayCourage ();
  movePlayer();                      //updates player position
  drawCrystal();                     //draws crystal
  moveFear();                        //updates enemy position/size
  drawPlayer();                       //draws player
  courageDecline();                 // lowers courage (health) as time goes on
  checkEating();                     // detects collision with crytals and restores health
  fearCollide();                     // detects collision with fear
}

// NEXT HANDLE THE PLAYER AND CRYSTAL AND FEAR COLLISIONS, S

// --------------------------- F U N C T I O N S ---------------------------- //

// SETUP PLAYER : initializes position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  constrain(playerCourage,0,100);
  playerCourage = 100;
  playerRadius = 25;
}
//-----------

// SETUP FEAR : intializes first enemy location and colour
function setupFear() {
  // FEAR LOCATION : sets a random location for the enemy that isnt overlapping with the player
  fearX = random(0,width);
  fearY = random(0,height);
    var d = dist(fearX,fearY,playerX,playerY);
    console.log (d);
    if (d < fearW + playerRadius*2 && d < fearH + playerRadius*2) {
      fearX = random(0,width);
      fearY = random(0,height);
      console.log("overlap occurred");
    }
    fearFill = ("#000000");
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
  fill("#8A2BE2");
  noStroke();
  ellipse(crystalX,crystalY,crystalW,crystalH);
}
//-----------

// MOVE FEAR : updates fear size, location, and colour
function moveFear() {
  /* SIZE: fearW and fearH are initial enemy widths and heights and are used to
     generate a constantly-changing new width and height that depends on
     the player's courage level */
  fearW = map(playerCourage,1,100,200,10);
  fearH = map(playerCourage,1,100,200,10);
  //console.log("courage level: " + playerCourage);
  if (playerCourage > 66){
    updateFearW = fearW + map(noise(tWidth),0,1,-20,20);
    updateFearH = fearH + map(noise(tHeight),0,1,-20,20);
    tWidth = tWidth + 0.001;
    tHeight = tHeight + 0.002;
    fearFill = 120;
  } else if (playerCourage >= 33) {
      updateFearW = fearW + map(noise(tWidth),0,1,-66,66);
      updateFearH = fearH + map(noise(tHeight),0,1,-66,66);
      tWidth = tWidth + 0.005;
      tHeight = tHeight + 0.006;
      fearFill = 170;
  } else if(playerCourage < 33) {
      updateFearW = fearW + map(noise(tWidth),0,1,-200,200);
      updateFearH = fearH + map(noise(tHeight),0,1,-200,200);
      tWidth = tWidth + 0.02;
      tHeight = tHeight + 0.03;
      fearFill = 255;
  }

  // change fear position based on noise
  fearX = width * noise(tWidth);
  fearY = height * noise(tHeight);
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
  fill(0,0,0,fearFill);
  ellipse(fearX,fearY,updateFearW,updateFearH);
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
    crystalsCollected = crystalsCollected + 1;
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
  if (d < playerRadius + updateFearW/2 && d < playerRadius + updateFearH/2) {
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
    // Check if the player is dead
    if (playerCourage === 0) {
      // If so, the game is over
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
  text("courage: " + floor(playerCourage) + "%", width - 140,height-20);
}


//-----------
// DRAW PLAYER: draws the player as an ellipse
function drawPlayer() {
  fill("#000000");
  ellipse(playerX,playerY,playerRadius*2);
}
//-----------
// GAME OVER : shows game over screen
// Display text about the game being over. gives option to try again
function showGameOver() {
    playerMaxSpeed = 0;
    fill("#000000");
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



/****
// Prey variables
// Prey position, size, velocity
var preyX;
var preyY;
var preyRadius = 25;
var preyVX;
var preyVY;
var preyMaxSpeed = 4;
// Prey health
var preyHealth;
var preyMaxHealth = 100;
// Prey fill color
var preyFill = 200;

// score variables
// Amount of health obtained per frame of "eating" the prey
var eatHealth = 10;
// Number of prey eaten during the game
var preyEaten = 0;

// ----------------------------- S E T    U P ------------------------------ //

// Sets up the basic elements of the game
function setup() {
  createCanvas(500,500);

  noStroke();

  setupPrey();
  setupPlayer();
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width/5;
  preyY = height/2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerHealth = playerMaxHealth;
}

// ----------------------------- D R A W ----------------------------------- //

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background(100,100,200);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
  }
  else {
    showGameOver();
  }
}

// --------------------------- F U N C T I O N S ---------------------------- //

// updateHealth()
//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health, constrain to reasonable range
  playerHealth = constrain(playerHealth - 0.5,0,playerMaxHealth);
  // Check if the player is dead
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(playerX,playerY,preyX,preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);

    // Check if the prey died
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0,width);
      preyY = random(0,height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten++;
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames
  if (random() < 0.05) {
    // Set velocity based on random values to get a new direction
    // and speed of movement
    // Use map() to convert from the 0-1 range of the random() function
    // to the appropriate range of velocities for the prey
    preyVX = map(random(),0,1,-preyMaxSpeed,preyMaxSpeed);
    preyVY = map(random(),0,1,-preyMaxSpeed,preyMaxSpeed);
  }

  // Update prey position based on velocity
  preyX += preyVX;
  preyY += preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX += width;
  }
  else if (preyX > width) {
    preyX -= width;
  }

  if (preyY < 0) {
    preyY += height;
  }
  else if (preyY > height) {
    preyY -= height;
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  fill(preyFill,preyHealth);
  ellipse(preyX,preyY,preyRadius*2);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha based on health
function drawPlayer() {
  fill(playerFill,playerHealth);
  ellipse(playerX,playerY,playerRadius*2);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  textSize(32);
  textAlign(CENTER,CENTER);
  fill(0);
  var gameOverText = "GAME OVER\n";
  gameOverText += "You ate " + preyEaten + " prey\n";
  gameOverText += "before you died."
  text(gameOverText,width/2,height/2);
}
**/
