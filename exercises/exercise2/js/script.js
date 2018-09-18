//---------------------------- I N T R O ----------------------------------//

//Exercise 2 - The Artful Dodger
//Pippin Barr

//Starter code for exercise 2.

// --------------------------- V A R I A B L E S ---------------------------//

// The position and size of our avatar circle
var avatarX;
var avatarY;
var avatarSize = 50;

// The speed and velocity of our avatar circle
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;

// The position and size of the enemy circle
var enemyX;
var enemyY;
var enemySize = 50;
// How much bigger the enemy circle gets with each successful dodge
var enemySizeIncrease = 5;

// The speed and velocity of our enemy circle
var enemySpeed = 5;
var enemyVX = 5;
// How much bigger the enemy circle gets with each successful dodge
var enemySpeedIncrease = 0.5;

// How many dodges the player has made
var dodges = 0;

// --------------------------- S E T U P -----------------------------------//

// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500,500);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
}

// ---------------------------- D R A W -------------------------------------//

function draw() {

// B A C K G R O U N D //
  background(255,220,220);

// D E F A U L T      V E L O C I T Y //
  avatarVX = 0;
  avatarVY = 0;

// M O V E M E N T :   L E F T     A N D    R I G H T //
      // checks which arrow is pressed and determines/sets velocity //
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

// M O V E M E N T :    U P   A N D    D O W N //
      //separate if-statements//
      //so you can move vertically and horizontally at once//
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }
// M O V E M E N T :   P O S I T I O N    B A S E D    O N    V E L O C I T Y
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

// E N E M Y     S P E E D    A N D    P O S I T I O N //
    // The enemy always moves at enemySpeed (which increases)
  enemyVX = enemySpeed;

    // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

// C O L L I S I O N   C H E C K //
      // Check if the enemy and avatar overlap - if they do the player loses
      // We do this by checking if the distance between the centre of the enemy
      // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {

// i made a reset function. see 'other functions' section .
    reset ();
  }

//--------------------- O T H E R    F U N C T I O N S ----------------------//

              // ** ----- R E S E T    F U N C T I O N ------- ** //

  function reset() {
// Tell the player they lost
    console.log("YOU LOSE!");

// P O S I T I O N      R E S E T
      // enemy position
  enemyX = 0;
  enemyY = random(0,height);

      // enemy size and speed
  enemySize = 50;
  enemySpeed = 5;

    // avatar position
  avatarX = width/2;
  avatarY = height/2;

// S C O R E    R E S E T //
    // Reset the dodge counter
  dodges = 0;
  }

              // ** ----- O F F S C R E E N     C H E C K ----- ** //

  // Check if the avatar has gone off the screen
if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    reset();
  }

// ?? code explanation in english sentences ?? //
  // if avatar's X-coord is less than zero
      // OR X-coord is more than canvas width
      // OR Y-coord is less than zero
      // OR Y-coord is more than canvas height
  // THEN reset everything as though collision occured with reset function //


            // ** ----- S U C C E S S F U L    D O D G E ----- ** //

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {

    // This means the player dodged so add 1 to the dodge variable
    dodges = dodges + 1;

    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");

    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);

    // Increase the enemy's speed and size to make the game harder
    enemySpeed = enemySpeed + enemySpeedIncrease;
    enemySize = enemySize + enemySizeIncrease;
  }

            // ** ----- C O N S O L E     D I S P L A Y ----- ** //

  // Display the current number of successful in the console
  console.log(dodges);

          // ** ----- P L A Y E R     A P P E A R A N C E ----- ** //

  // The player is black
  fill(0);
  // Draw the player as a circle
  ellipse(avatarX,avatarY,avatarSize,avatarSize);

  // The enemy is red
  fill(255,0,0);
  // Draw the enemy as a circle
  ellipse(enemyX,enemyY,enemySize,enemySize);

}

// ------------------------- T H E    E N D ----------------------------------//
