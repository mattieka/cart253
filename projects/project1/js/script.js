/******************************************************

Game - Face your Fears
Mattie KA

Collect crystals to drive back the dark and regain your courage.
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
var playerMaxSpeed = 2;
// Player health
var playerCourage;
var playerMaxCourage = 100;

//Light crystal variables
var crystalX;
var crystalY;

// Fear Variables
// fear position, size, velocity, colour
var fearX;
var fearY;
var fearW = 30;
var fearH = 30;
var fearVX;
var fearVY;
var fearMaxSpeed;
var fearFill;

// noise value that changes width and height with perlin noise
var tWidth = 0;
var tHeight = 0;

// ----------------------------- S E T    U P ------------------------------ //

function setup() {
  createCanvas(500,500);
  setupPlayer();
  setupFear();
  setupCrystal();

}

// ----------------------------- D R A W ----------------------------------- //

function draw() {
  background("#00FFFF");
  handleInput();
  movePlayer();
  drawCrystal();
  moveFear();
  drawPlayer();
}

// NEXT HANDLE THE PLAYER AND CRYSTAL AND FEAR COLLISIONS, SET CRYSTAL
//TO REGEN COURAGE BASED ON ITS SIZE, OR SOMETHING

// --------------------------- F U N C T I O N S ---------------------------- //

// SETUP PLAYER : initializes position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerCourage = 33;
}
//-----------

// SETUP FEAR : intializes first enemy location and colour
function setupFear() {
  fearX = 100;
  fearY = 100;
  fearFill = ("#000000");
}
//-----------

// SETUP CRYSTAL : initializes random locations for a crystal to appear.
function setupCrystal() {
  crystalX = random(width/10,(width/10)*9);
  crystalY = random(height/10,(height/10)*9);
}
//-----------

// DRAW CRYSTAL : draws crystal
function drawCrystal(){
  fill("#8A2BE2");
  noStroke();
  ellipse(crystalX,crystalY,30,30);
}
//-----------

// MOVE FEAR : updates fear location, size, and colour

function moveFear() {
  /* fearW and fearH are initial enemy widths and heights and are used to
     generate a constantly-changing new width and height that depends on
     the player's courage level */
  fearW = map(playerCourage,0,100,200,10);
  fearH = map(playerCourage,0,100,200,10);

  var updateFearW = fearW + map(noise(tWidth),0,1,-100,100);
  var updateFearH = fearH + map(noise(tHeight),0,1,-100,100);
  tWidth = tWidth + 0.1;
  tHeight = tHeight + 0.2;
  fill (fearFill);
  ellipse(100,100,updateFearW,updateFearH);
}

//-----------


// HANDLE INPUT : checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
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

// DRAW PLAYER: draws the player as an ellipse
function drawPlayer() {
  fill("#000000");
  ellipse(playerX,playerY,playerRadius*2);
}
//-----------



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

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX += playerVX;
  playerY += playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    playerX += width;
  }
  else if (playerX > width) {
    playerX -= width;
  }

  if (playerY < 0) {
    playerY += height;
  }
  else if (playerY > height) {
    playerY -= height;
  }
}

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
