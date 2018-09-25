//---------------------------- I N T R O ----------------------------------//

//Exercise 2 - The Artful Dodger
//Mattie K . A .

//Code for exercise 2.

// --------------------------- V A R I A B L E S ---------------------------//

// The position of our avatar circle
var avatarX;
var avatarY;

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

// How many lives the player has
var lives = 3

// Variables for images
var starbg; //background
var asteroid; //asteroid
var ufo; //player ufo
var heart; // heart image

// position and size of first heart
var heartX;
var heartY;
var heartWidth;
var heartHeight;

// --------------------------- P R E L O A D ------------------------------- //

// preload background, asteroids, player, and heart images
function preload() {
  starbg = loadImage('assets/stars.jpg');
  asteroid = loadImage('assets/asteroid.png');
  ufo = loadImage('assets/ufo.png');
  heart = loadImage('assets/heart.png');
}
// --------------------------- S E T U P ----------------------------------- //

// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500, 500);

  // Put the avatar in the centre
  avatarX = width / 2;
  avatarY = height / 2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0, height);

  // H E A R T S     P O S I T I O N  //
  heartX = width/20;
  heartY = height/35;
  heartWidth = heart.width/20;
  heartHeight = heart.height/20;
}

// ---------------------------- D R A W -------------------------------------//

function draw() {

  // B A C K G R O U N D //
  image(starbg, 0, 0, starbg.width * .25, starbg.height * .25);

  // A S T E R O I D //
  image(asteroid, enemyX, enemyY, enemySize, enemySize);

  // P L A Y E R //
  image(ufo, avatarX, avatarY);

  // D E F A U L T      V E L O C I T Y //
  avatarVX = 0;
  avatarVY = 0;

  // M O V E M E N T :   L E F T     A N D    R I G H T //
  // checks which arrow is pressed and determines/sets velocity //
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // M O V E M E N T :    U P   A N D    D O W N //
  //separate if-statements//
  //so you can move vertically and horizontally at once//
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  } else if (keyIsDown(DOWN_ARROW)) {
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
  if (dist(enemyX, enemyY, avatarX, avatarY) < enemySize / 2 + ufo.width / 4.5) {
    // reduce life count by 1
    lives = lives-1;
    console.log(lives + " lives remaining");
    // reset asteroid position
    enemyX = 0;
    enemyY = random(0, height);
  }

  // D E A T H     C H E C K // i made a reset function: see other functions
  if (lives <= 0) {
    reset();
  }

    // L I V E S
    if (lives =3) {
      image(heart,heartX,heartY,heartWidth,heartHeight);
      image(heart,heartX + (heartWidth*1.5),heartY,heartWidth,heartHeight);
      image(heart,heartX + (heartWidth*1.5) + (heartWidth*1.5),heartY,heartWidth,heartHeight);
    } else if (lives =2) {
      image(heart,heartX,heartY,heartWidth,heartHeight);
      image(heart,heartX + (heartWidth*1.5),heartY,heartWidth,heartHeight);
        alpha(0);
      image(heart,heartX + (heartWidth*1.5) + (heartWidth*1.5),heartY,heartWidth,heartHeight);
    } else if (lives = 1){
      image(heart,heartX,heartY,heartWidth,heartHeight);
    } else if (lives <=0){
  }



  //--------------------- O T H E R    F U N C T I O N S ----------------------//

  // ** ----- R E S E T    F U N C T I O N ------- ** //

  function reset() {
    // Tell the player they lost
    console.log("YOU LOSE!");

    // P O S I T I O N      R E S E T
    // enemy position
    enemyX = 0;
    enemyY = random(0, height);

    // enemy size and speed
    enemySize = 50;
    enemySpeed = 5;

    // avatar position
    avatarX = width / 2;
    avatarY = height / 2;

    // S C O R E       A N D     L I F E     R E S E T //
    // Reset the dodge counter
    dodges = 0;
    lives = 3;
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
    enemyY = random(0, height);

    // Increase the enemy's speed and size to make the game harder
    enemySpeed = enemySpeed + enemySpeedIncrease;
    enemySize = enemySize + enemySizeIncrease;
  }

  // ** ----- O N S C R E E N      T E X T ----- ** //

  fill("#8a59d7");
  text(dodges + " dodges!", 2.5 * width / 4, height / 8);
  textSize(32);
}

// --------------------- I M A G E     C R E D I T ------------------------- //

//background image: https://unsplash.com/photos/Knwea-mLGAg
//asteroid image: https://opengameart.org/content/brown-asteroid
//ufo image: i made that one
//heart icon: https://pixabay.com/en/pixel-heart-heart-pixel-symbol-red-2779422/

// ------------------------- T H E    E N D ----------------------------------//
