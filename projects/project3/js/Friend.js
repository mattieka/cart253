/* -------------------------- FRIEND OBJECT ----------------------------- */

//all functions pertaining to the characters that are available to interact with

/* ---------------------------- VARIABLES -------------------------------- */

//variables for animations
var juanitaAnimation;
var dudesAnimation;
var erethAnimation;
var phorAnimation;
var ceeseAnimation;

//variables for each friend
var juanita;
var dudes;
var ereth;
var phor;
var ceese;
var talkSwitch;

/* ------------------------- FRIEND CONSTRUCTOR ---------------------------- */
// function that adds a new friend object and loads the appropriate sprite
function Friend(x,y,friendImage,talkSwitch,dialogueLink) {
  this.x = x;
  this.y = y;
  this.friendImage = friendImage;
  this.talkSwitch = talkSwitch;
  this.dialogueLink = dialogueLink;
  //console.log(dialogueLink);


  this.sprite = createSprite(this.x,this.y);
  this.sprite.addAnimation("label",this.friendImage);
  //this.sprite.addImage(friendImage);
  this.sprite.position.x = round(this.sprite.position.x/gridSize)*gridSize;
  this.sprite.position.y = round(this.sprite.position.y/gridSize)*gridSize;
}

/* ------------------------------ ANIMATION PRELOAD --------------------------------- */

function preloadAnimations() {
  juanitaAnimation = loadAnimation("assets/images/sprites/juanitaIdle/juanita_00.png","assets/images/sprites/juanitaIdle/juanita_11.png");
  dudesAnimation = loadAnimation("assets/images/sprites/dudesIdle/dudes_00.png","assets/images/sprites/dudesIdle/dudes_10.png");
  erethAnimation = loadAnimation("assets/images/sprites/erethIdle/ereth_0.png","assets/images/sprites/erethIdle/ereth_8.png");
  phorAnimation = loadAnimation("assets/images/sprites/phorIdle/phor_00.png","assets/images/sprites/phorIdle/phor_18.png");
  ceeseAnimation = loadAnimation("assets/images/sprites/ceeseIdle/ceese_00.png","assets/images/sprites/ceeseIdle/ceese_11.png");
}

/* ------------------------------ FRIEND SETUP/CREATION --------------------------------- */

function setupFriend() {

  juanita = new Friend(200,200,juanitaAnimation,"off",juanitaDialogue);
  ereth = new Friend (300,300,erethAnimation,"off",erethDialogue);
  dudes = new Friend (300,400,dudesAnimation,"off",dudesDialogue);
  phor = new Friend (450,450,phorAnimation,"off",dudesDialogue);
  ceese = new Friend(400,150,ceeseAnimation,"off",dudesDialogue);
}

/* ------------------------- FRIEND COLLISION ---------------------------- */
//function meant to trigger dialogue-starting switch when a specific friend is collided with

Friend.prototype.collision = function() {
  // console.log(this)
  this.talkSwitch = "on";
  // console.log(this.talkSwitch);
  // console.log(this.dialogueLink);
}

/* ------------------------- DIALOGUE KEYPRESS  ---------------------------- */
//allows player to press the spacebar to get to the next dialogue box

Friend.prototype.keyPressed = function() {
  if (this.talkSwitch === "on") {

      if (this.dialogueLink.currentText <= this.dialogueLink.dialogueArray.length && keyCode === 32) {
        this.dialogueLink.currentText = this.dialogueLink.currentText + 1;
    }
  }
}

/* ---------------------- DISPLAY FRIEND DIALOGUE -------------------------- */
// function that displays first dialogue box in an interaction of a character.
Friend.prototype.showDialogue = function() {
  //console.log(this.talkSwitch,this.dialogueLink.currentText,this.dialogueLink.dialogueArray);
  if (this.talkSwitch === "on" && this.dialogueLink.currentText < this.dialogueLink.dialogueArray.length) {
    speed = 0;

    //this.dialogueLink.display();
    this.dialogueLink.jsonDisplay();
    //console.log(this.dialogueLink,this.dialogueLink.currentText)
  } else if (this.dialogueLink.currentText >= this.dialogueLink.dialogueArray.length) {
    this.talkSwitch = "off";
    speed = 5;
    this.dialogueLink.currentText = 0;
  } else if (this.talkSwitch === "off") {
  //do nothing
  }
}
