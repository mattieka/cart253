/* -------------------------- ROCK OBJECT ----------------------------- */

//all functions pertaining to the rocks

/* ---------------------------- CONSTRUCTOR -------------------------------- */

function Rock (x,y,w,h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}

/* ------------------------------ DISPLAY --------------------------------- */

Rock.prototype.display = function() {
  noStroke();
  fill("#666699");
  rectMode(CENTER);
  rect(round(this.x/gridSize)*gridSize,round(this.y/gridSize)*gridSize,this.w,this.h)
}

function setupRock() {
  rock1 = new Rock(width/3,height/2,32,32)
}
