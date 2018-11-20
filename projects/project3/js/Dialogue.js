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

/* ------------------------ TEXT BOX CONSTRUCTOR --------------------------- */

function Dialogue(dialogueArray,currentText) {
  this.dialogueArray = dialogueArray;
  this.currentText = currentText;
}

/* -------------------------- DISPLAY FUNCTION ----------------------------- */

Dialogue.prototype.display = function() {
  image(textBox,textBoxX,textBoxY);
  text(this.dialogueArray[currentText],textStartX,textStartY,textBoxWidth,textBoxHeight);
}

Dialogue.prototype.avatarDisplay = function() {
  image(textBox,textBoxX,textBoxY);
  image(avatar,avatarStartX,avatarStartY);
  text(this.dialogueArray[currentText],avatarTextStartX,avatarTextStartY,textBoxWidth,textBoxHeight)
}


function updateTextBoxDimensions() {
  textBoxY = height - 192;
  textStartX = textBoxX + 32;
  textStartY = textBoxY + 16;
  textBoxWidth = textBox.width-32;
  textBoxHeight = textBox.height-16;
  avatarStartX = textStartX;
  avatarStartY = textStartY;
  avatarTextStartX = avatarStartX + avatar.width + 16;
  avatarTextStartY = textStartY;
}
