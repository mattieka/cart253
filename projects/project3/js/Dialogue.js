/* -------------------------- DIALOGUE OBJECT ----------------------------- */

//all functions pertaining to testing dialogue

/* ---------------------------- VARIABLE -------------------------------- */

// variable for current line of text
var currentText = 0;

// textbox dimension variables
var textBoxX = 0;
var textBoxY = 512 - 192;
var textStartX;
var textStaryY;
var avatarStartX;
var avatarStartY;
var avatarTextStartX;
var avatarTextStartY;

// variable that tracks which character is speaking
var currentSpeaker;

// friend dialogue variables
var juanitaDialogue;
var dudesDialogue;
var erethDialogue;
var phorDialogue;
var ceeseDialogue;

var bookCaseDialogue;
var cuteTeddyDialogue;
var mitkerTheToadDialogue;
var treeDialogue;
var waxStatueDialogue;

// raw json data
var juanitaRaw;
var dudesRaw;
var erethRaw;
var phorRaw;
var ceeseRaw;

// dialogue is stored in these arrays.
var juanitaArray = [];
var dudesArray = [];
var erethArray = [];
var phorArray = [];
var ceeseArray = [];

// NOTE : variables for object arrays moved to bottom so they don't take up so much room here

/* ------------------------ DIALOGUE CONSTRUCTOR --------------------------- */

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

  bookCaseDialogue = new Dialogue(bookCaseArray,0);
  cuteTeddyDialogue = new Dialogue (cuteTeddyArray,0);
  mitkerTheToadDialogue = new Dialogue(mitkerTheToadArray,0);
  treeDialogue = new Dialogue(treeArray,0);
  waxStatueDialogue = new Dialogue(waxStatueArray,0);

}

/* -------------------------- DISPLAY FUNCTION ----------------------------- */
//display text in text box ,as well as character portrait (when applicable)
Dialogue.prototype.display = function() {
  image(textBox,textBoxX,textBoxY);
  textSettings();
  text(this.dialogueArray[this.currentText],textStartX,textStartY,textBoxWidth,textBoxHeight);
  //console.log(this.dialogueArray,this.currentText,"just PLEASE DISPLAY");
}

//no longer need this
// //display both avatar/portrait of character and text in text box
// Dialogue.prototype.avatarDisplay = function() {
//   image(textBox,textBoxX,textBoxY);
//   //image(avatar,avatarStartX,avatarStartY);
//   textSettings();
//   text(this.dialogueArray[this.currentText],avatarTextStartX,avatarTextStartY,textBoxWidth,textBoxHeight)
// }

//display text pulled from json file
Dialogue.prototype.jsonDisplay = function() {
  image(textBox,textBoxX,textBoxY);
  textSettings();
  this.detectSpeaker();
  image(currentSpeaker,avatarStartX,avatarStartY);
  text(this.dialogueArray[this.currentText].text,avatarTextStartX,avatarTextStartY,textBoxWidth,textBoxHeight);
  //console.log(currentSpeaker);
}

/* -------------------------- UPDATE TEXT BOX DIMENSIONS  ----------------------------- */

//updates text box size and margins for text
function updateTextBoxDimensions() {
  //textBoxY = height - 192;
  textStartX = textBoxX + 32;
  textStartY = textBoxY + 32;
  textBoxWidth = textBox.width-fyvePortrait.width-64;
  textBoxHeight = textBox.height-16;
  avatarStartX = textStartX;
  avatarStartY = textStartY;
  avatarTextStartX = avatarStartX + fyvePortrait.width + 16;
  avatarTextStartY = textStartY;
}

/* -------------------------- PRELOAD DIALOGUE ----------------------------- */

function preloadDialogue() {
  introString = loadStrings("dialogueJSON/introString.txt");
  textBox = loadImage("assets/images/text/textbox.png");
  juanitaRaw = loadJSON("dialogueJSON/juanitaDialogue.json");
  dudesRaw = loadJSON("dialogueJSON/dudesDialogue.json");
  erethRaw = loadJSON("dialogueJSON/erethDialogue.json");
  phorRaw = loadJSON("dialogueJSON/phorDialogue.json");
  ceeseRaw = loadJSON("dialogueJSON/ceeseDialogue.json");
}

/* -------------------------- RESET DIALOGUE ----------------------------- */
//resets dialogue at the end of the game, as well as interact counters.
function resetDialogue() {
  //reset dialogue
  juanitaDialogue.currentText = 0;
  dudesDialogue.currentText = 0;
  erethDialogue.currentText = 0;
  phorDialogue.currentText = 0;
  ceeseDialogue.currentText = 0;

  bookCaseDialogue.currentText = 0;
  cuteTeddyDialogue.currentText = 0;
  mitkerTheToadDialogue.currentText = 0;
  treeDialogue.currentText = 0;
  waxStatueDialogue.currentText = 0;

  //reset interaction counter
  juanita.interactCounter = 0;
  dudes.interactCounter = 0;
  ereth.interactCounter = 0;
  phor.interactCounter = 0;
  ceese.interactCounter = 0;

  bookCase.interactCounter = 0;
  cuteTeddy.interactCounter = 0;
  mitkerTheToad.interactCounter = 0;
  tree.interactCounter = 0;
  waxStatue.interactCounter = 0;
}

/* -------------------------- TEXT SETTINGS ----------------------------- */

//function that stores text alignment/size/etc for easy access
function textSettings() {
  textAlign(LEFT);
  textSize(24);
  fill("#FFFFFF");
}

/* -------------------------- DETECT SPEAKER  ----------------------------- */

//detect image by checking who is speaking, indicated by the current speaker variable.
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

/* -------------------------- OBJECT DIALOGUE ----------------------------- */

//dialogue for the objects
  var bookCaseArray = [
    "It's an old bookcase.",
    "Ereth has vandalized at least half of these books with doodles.",
    "You spent many hours hanging out in the lobby way back when, reading quietly."
  ];
  var cuteTeddyArray = [
    "It's a 'cute' teddy bear.",
    "Dudes has had this thing kickin' around in the giftshop for years now.",
    "She may be missing buttons and have stuffing leaking out of her gut, but she's still beautiful.",
  ];
  var mitkerTheToadArray = [
    "It's Mitker the Toad!",
    "Mitker was always Juanita's favorite. In fact, you got this very Mitker puppet for her on her 17th birthday.",
    "Mitker...so purple, so cute... "
  ];
  var treeArray = [
    "It's a potted plant.",
    "Potted tree?",
    "Whatever. You and Fate brought this tree in a few years ago.",
    "Fate dropped the big heavy flowerpot on her foot once. She claimed it was a fate worse than death."
  ];
  var waxStatueArray = [
    "A wax statue with an... interesting set of facial features, and dismembered limbs.",
    "This must be another one of Zephorya's experimental wax-melting sculptures.",
    "They certainly are... unique. And maybe just a liiiiiiiiiittle macabre."
  ];

  /* -------------------------- END ----------------------------- */
