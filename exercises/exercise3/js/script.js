/******************************************************************************
Where's Sausage Dog? An Improvement (?)
by Mattie Alrod

Where's Waldo, but with a dog, and a computer made it.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// ----------------------- V A R I A B L E S --------------------------------//

// variables for the position, speed, velocity, and of the image of the sausage dog we're searching for
var targetX;
var targetY;
var targetImage;
var targetSpeed = 5;
var targetVelocity = targetSpeed;

// The ten decoy images
var decoyImage1;
var decoyImage2;
var decoyImage3;
var decoyImage4;
var decoyImage5;
var decoyImage6;
var decoyImage7;
var decoyImage8;
var decoyImage9;
var decoyImage10;

// default number of decoys to show on the screen, randomly
// chosen from the decoy images
var numDecoys = 100;

// Keep track of whether they've won
var gameOver = false;

// guide rectangle variables
var guideWidth; // guide rectangle width
var guideHeight; // guide rectangle height
var guideX; //guide rectangle x-position
var guideY; // guide rectangle y-position

//variables for the image of the dog in the rectangle and its width and height
var targetGuide = {
  image: undefined,
  x: guideX+guideWidth/2,
  y: guideY+guideHeight/2,
};

// ------------------------- P R E L O A D --------------------------------- //

// Loads the target, guide, and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");
  targetGuide.image = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}

// --------------------------- S E T U P ---------------------------------- //

// Creates the canvas, sets basic modes, draws random number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#ffff00");
  imageMode(CENTER);
//randomize number of decoys
  numDecoys = random(50,900);
  console.log(numDecoys);

  // Use a for loop to draw as many decoys as we need
  for (var i = 0; i < numDecoys; i++) {
    // Choose a random location for this decoy
    var x = random(0,width);
    var y = random(0,height);
    // Generate a random number we can use for probability
    var r = random();
    // generate random size for decoys
    var w = decoyImage1.width*random(0.05,1);
    var h = w;

    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    if (r < 0.1) {
      image(decoyImage1,x,y,w,h);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y,w,h);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y,w,h);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y,w,h);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y,w,h);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y,w,h);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y,w,h);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y,w,h);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y,w,h);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y,w,h);
    }
  }

// G U I D E   W I N D O W

  // set guide window and guide dog image positions and sizes
  guideWidth = targetGuide.image.width+10;
  guideHeight = targetGuide.image.height+10;
  guideX = windowWidth/4*3;
  guideY = windowHeight/12;
  targetGuide.x = guideX+guideWidth/2,
  targetGuide.y = guideY+guideHeight/2,
  targetGuide.sizeX = targetGuide.sizeX-guideHeight/2,
  targetGuide.sizeY = targetGuide.sizeY-guideWidth/2,

  // make rectagle shape of the guide for the image we're looking for //
  fill("#FFF9B2");
  rect(guideX,guideY,guideWidth,guideHeight);

  // set guide image inside
  image(targetGuide.image,targetGuide.x,targetGuide.y);

  // set guide text
  textSize(18);
  fill("#000000");
  textAlign(CENTER);
  text("Find This Dog!",targetGuide.x,targetGuide.y+targetGuide.image.height/2);

  // Choose a location for the target
  targetX = random(0,width);
  targetY = random(0,height);

// make it so that the dog never shows up over the guide image box
  while (targetX + targetImage.width/2 > guideX && targetX - targetImage.width/2 < guideX + guideWidth && targetY + targetImage.height/2 > guideY && targetY - targetImage.height/2 < guideY+guideHeight) {
    // And draw it (this means it will always be on top)
    targetX = random(0,width);
    targetY = random(0,height);
    console.log("he was under box");
  }
    // draw! that! dog!
    image(targetImage,targetX,targetY);
}

// ----------------------------- D R A W ----------------------------------- //

function draw() {

// what happens when the dog is found
  if (gameOver) {
    background("#ffff00");
    // Prepare our typography
    textFont("Helvetica");
    textSize(128);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));
    // Tell them they won!
    text("FOUND HIM!!!",width/2,height/2);

    // function for moving the dog around upon the player's victory
    victoryDance();
  }
}

// ------------------------- M O U S E     C H E C K ----------------------- //

// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // Check if the mouse is in the x range of the target
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the mouse is also in the y range of the target
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}

function victoryDance() {
//circle around dog
  noFill();
  stroke(random(255));
  strokeWeight(10);
  ellipse(targetX,targetY,targetImage.width,targetImage.height);
  image(targetImage,targetX,targetY);


//dog bounces back and forth on either sides of the screen
  targetX = targetX + targetVelocity;
  if (targetX + targetImage.width/2 > windowWidth-1) {
    targetVelocity = -targetSpeed;
    targetX = targetX + targetVelocity;
  }
  if (targetX - targetImage.width/2 < 1) {
    targetVelocity = targetSpeed;
    targetX = targetX + targetVelocity;
  }
}
// ---------------------------- T H E     E N D --------------------------- //
