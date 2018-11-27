/* -------------------------- FRIEND OBJECT ----------------------------- */

//all functions pertaining to the characters that are available to interact with

/* ---------------------------- VARIABLES -------------------------------- */

var juanita;
var ereth;
var talkSwitch;

/* ------------------------- FRIEND CONSTRUCTOR ---------------------------- */
// function that adds a new friend object and loads the appropriate sprite
function Friend(x,y,friendImage,talkSwitch,dialogueLink) {
  this.x = x;
  this.y = y;
  this.friendImage = friendImage;
  this.talkSwitch = talkSwitch;
  this.dialogueLink = dialogueLink;
  console.log(dialogueLink);


  this.sprite = createSprite(this.x,this.y);
  this.sprite.addImage(friendImage);
  this.sprite.position.x = round(this.sprite.position.x/gridSize)*gridSize;
  this.sprite.position.y = round(this.sprite.position.y/gridSize)*gridSize;
}

/* ------------------------------ FRIEND SETUP/CREATION --------------------------------- */

function setupFriend() {

  juanita = new Friend(200,200,juanitaImage,"off",juanitaDialogue);
  ereth = new Friend (300,300,erethImage,"off",erethDialogue);
  dudes = new Friend (300,400,dudesImage,"off",dudesDialogue);
}

/* ------------------------- FRIEND COLLISION ---------------------------- */
//function meant to trigger dialogue-starting switch when a specific friend is collided with
//doesnt work

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
