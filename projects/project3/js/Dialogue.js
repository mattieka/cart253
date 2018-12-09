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
var juanitaDialogue;
var dudesDialogue;
var erethDialogue;
var phorDialogue;
var ceeseDialogue;

var juanitaRaw;
var dudesRaw;
var erethRaw;
var phorRaw;
var ceeseRaw;

var juanitaArray = [];
var dudesArray = [];
var erethArray = [];
var phorArray = [];
var ceeseArray = [];

/* ------------------------ DIALOGUECONSTRUCTOR --------------------------- */

function Dialogue(dialogueArray,currentText) {
  this.dialogueArray = dialogueArray;
  this.currentText = currentText;
}

/* ------------------------ DIALOGUE SETUP --------------------------- */

function setupDialogue() {
  juanitaArray = juanitaRaw.juanitaConvo;
  dudesArray = dudesRaw.dudesConvo;
  erethArray = erethRaw.erethConvo;
  phorArray = phorRaw.phorConvo;
  ceeseArray = ceeseRaw.ceeseConvo;

  juanitaDialogue = new Dialogue(juanitaArray,0);
  dudesDialogue = new Dialogue(dudesArray,0);
  erethDialogue = new Dialogue(erethArray,0);
  phorDialogue = new Dialogue(phorArray,0);
  ceeseDialogue = new Dialogue(ceeseArray,0);
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
  textStartY = textBoxY + 32;
  textBoxWidth = textBox.width-fyvePortrait.width-64;
  textBoxHeight = textBox.height-16;
  avatarStartX = textStartX;
  avatarStartY = textStartY;
  avatarTextStartX = avatarStartX + fyvePortrait.width + 16;
  avatarTextStartY = textStartY;
}


function preloadDialogue() {
  textBox = loadImage("assets/images/text/textbox.png");
  juanitaRaw = loadJSON("dialogueJSON/juanitaDialogue.json");
  dudesRaw = loadJSON("dialogueJSON/dudesDialogue.json");
  erethRaw = loadJSON("dialogueJSON/erethDialogue.json");
  phorRaw = loadJSON("dialogueJSON/phorDialogue.json");
  ceeseRaw = loadJSON("dialogueJSON/ceeseDialogue.json");
}
//function that stores text alignment/size/etc for easy access
function textSettings() {
  textAlign(LEFT);
  textSize(24);
  fill("#FFFFFF");
}

//detect image
Dialogue.prototype.detectSpeaker = function() {
  if (this.dialogueArray[this.currentText].name === "fyve" || this.dialogueArray[this.currentText].name === "none") {
      currentSpeaker = fyvePortrait;
    }
    else if (this.dialogueArray[this.currentText].name === "juanita") {
      currentSpeaker = juanitaPortrait;
    }
    else if (this.dialogueArray[this.currentText].name === "dudes") {
      currentSpeaker = dudesPortrait;
    }
    else if (this.dialogueArray[this.currentText].name === "ereth") {
      currentSpeaker = erethPortrait;
    }
    else if (this.dialogueArray[this.currentText].name === "phor") {
      currentSpeaker = phorPortrait;
    }
    else if (this.dialogueArray[this.currentText].name === "ceese") {
      currentSpeaker = ceesePortrait;
    }
  }
