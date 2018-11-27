/* -------------------------- DIALOGUE OBJECT ----------------------------- */

//all functions pertaining to testing dialogue

/* ---------------------------- VARIABLE -------------------------------- */

var currentText = 0;
var textBoxX = 0;
var textBoxY;
var textStartX;
var textStaryY;
var avatarStartX;
var avatarStartY;
var avatarTextStartX;
var avatarTextStartY;


var currentSpeaker;
var erethDialogue;
var juanitaDialogue;
var dudesDialogue;

var fyvePortrait;
var dudesPortrait;

var dudesRaw;
var dudesArray = [];

var juanitaArray = [
  "hewwo?????"
];

var erethArray = [
  "is this thing on",
  "hello???",
  "i really hope this works"
];

/* ------------------------ DIALOGUECONSTRUCTOR --------------------------- */

function Dialogue(dialogueArray,currentText) {
  this.dialogueArray = dialogueArray;
  this.currentText = currentText;
}

/* ------------------------ DIALOGUE SETUP --------------------------- */

function setupDialogue() {
  dudesArray = dudesRaw.dudesConvo;
  juanitaDialogue = new Dialogue(juanitaArray,0);
  erethDialogue = new Dialogue(erethArray,0);
  dudesDialogue = new Dialogue(dudesArray,0);
}

/* -------------------------- DISPLAY FUNCTION ----------------------------- */
//display text in text box
Dialogue.prototype.display = function() {
  image(textBox,textBoxX,textBoxY);
  textSettings();
  text(this.dialogueArray[this.currentText],textStartX,textStartY,textBoxWidth,textBoxHeight);
  //console.log(this.dialogueArray,this.currentText,"just PLEASE DISPLAY");
}

//display both avatar/portrait of character and text in text box
Dialogue.prototype.avatarDisplay = function() {
  image(textBox,textBoxX,textBoxY);
  //image(avatar,avatarStartX,avatarStartY);
  textSettings();
  text(this.dialogueArray[this.currentText],avatarTextStartX,avatarTextStartY,textBoxWidth,textBoxHeight)
}

//display text pulled from json file
Dialogue.prototype.jsonDisplay = function() {
  image(textBox,textBoxX,textBoxY);
  textSettings();
  this.detectSpeaker();
  image(currentSpeaker,avatarStartX,avatarStartY);
  text(this.dialogueArray[this.currentText].text,avatarTextStartX,avatarTextStartY,textBoxWidth,textBoxHeight);
  console.log(currentSpeaker);
}

//updates text box size and margins for text
function updateTextBoxDimensions() {
  textBoxY = height - 192;
  textStartX = textBoxX + 32;
  textStartY = textBoxY + 16;
  textBoxWidth = textBox.width-32;
  textBoxHeight = textBox.height-16;
  avatarStartX = textStartX;
  avatarStartY = textStartY + 16;
  avatarTextStartX = avatarStartX + fyvePortrait.width + 16;
  avatarTextStartY = textStartY;
}

//function that stores text alignment/size/etc for easy access
function textSettings() {
  textAlign(LEFT);
  textSize(32);
  fill("#FFFFFF");
}

//detect image
Dialogue.prototype.detectSpeaker = function() {
  if (this.dialogueArray[this.currentText].name === "fyve") {
      currentSpeaker = fyvePortrait;
    }
    else if (this.dialogueArray[this.currentText].name === "dudes") {
      currentSpeaker = dudesPortrait;
    }
  }
