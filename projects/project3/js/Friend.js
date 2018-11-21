/* -------------------------- FRIEND OBJECT ----------------------------- */

//all functions pertaining to the characters that are available to interact with

/* ---------------------------- VARIABLES -------------------------------- */

var juanita;
var ereth;
var talkSwitch;


/* ------------------------- FRIEND CONSTRUCTOR ---------------------------- */
// function that adds a new friend object and loads the appropriate sprite
function Friend(x,y,friendImage,talkSwitch,dialogueArray) {
  this.x = x;
  this.y = y;
  this.friendImage = friendImage;
  this.talkSwitch = talkSwitch;


  this.sprite = createSprite(this.x,this.y);
  this.sprite.addImage(friendImage);
  this.sprite.position.x = round(this.sprite.position.x/gridSize)*gridSize;
  this.sprite.position.y = round(this.sprite.position.y/gridSize)*gridSize;

  // this.pullDialogue = function(){
  //   this.dialogueArray = new Dialogue(this.dialogueArray,0);
  // }
}

/* ------------------------------ FRIEND SETUP/CREATION --------------------------------- */

function setupFriend() {

  juanita = new Friend(200,200,juanitaImage,"off",juanitaArray);
  ereth = new Friend (300,300,erethImage,"off",erethArray);
  //console.log(ereth.dialogueArray)
}

/* ------------------------- FRIEND COLLISION ---------------------------- */
//function meant to trigger dialogue-starting switch when a specific friend is collided with
//doesnt work

Friend.prototype.collision = function() {
  //speed = 0;
  this.talkSwitch = "on";
  console.log(this.talkSwitch);
}

/* ---------------------- DISPLAY FRIEND DIALOGUE -------------------------- */
// function meant to display first dialogue box in an interaction of a character.
//also doesnt work :/
Friend.prototype.showDialogue = function() {
  if (this.talkSwitch === "on") {
    this.dialogueArray.display();
  }
}

/* ------------------------- DIALOGUE KEYPRESS  ---------------------------- */
//meant to allow player to press the spacebar to get to the next dialogue box
// in a shocking turn of events, it doesnt work

// Friend.prototype.textBoxInput = function() {
//   if (this.talkSwitch === "on") {
//     function keyPressed() {
//       if (this.dialogueArray.currentText <= this.dialogueArray.length && keyCode === 32) {
//         this.dialogueArray.currentText = this.dialogueArray.currentText + 1;
//         console.log("key was pressed")
//       }
//     }
//   }
// }



/* ------------------------- INDIVIDUAL FRIEND COLLISIONS ---------------------------- */
//individual text box triggers
function juanitaCollision() {
  juanitaArray.avatarDisplay();
}

function erethCollision() {
  erethArray.display();
}
