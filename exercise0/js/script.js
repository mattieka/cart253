// Exercise 0 - Spiritual Self-Portrait
// Mattie Alrod
// 6 September 2018
//
// our first assignment, where Mattie has made a beautiful self-portrait

// setup()

function setup() {

  // setup canvas so that it's a good purple

  createCanvas(500,500);
  background("#b599e3");

//HEAD SHAPE STARTS HERE ----------------------------------------

fill("#debea6");

//first i set points that i use for reference w/ the curves later

strokeWeight(5);
  point(100,50);
  point(200,30);
  point(300,50);
  point(315,150);
  point(200,250);
  point(75,200);

//theres my vaguely potato head, i didnt just want to do a circle
beginShape();
  curveVertex(100,50);
  curveVertex(200,30);
  curveVertex(300,50);
  curveVertex(315,150);
  curveVertex(200,250);
  curveVertex(75,200);
  curveVertex(100,50);
  curveVertex(200,30);
  curveVertex(300,50);
endShape();

//HEAD SHAPE ENDS HERE-------------------------------------------

//GLASSES STARTS HERE--------------------------------------------

//frames are just rectangles
fill("#ffffff");
  rect(55,90,90,40,3);
  rect(185,90,90,40,3);

//i made a bezier curve for the bridge of the glasses
//because i dont understand how the arc function works
//anyway here are the reference points that control the curve
noFill();
  strokeWeight(0);
    point(147,107); //lower left
    point(147,99);  //upper left
    point(185,99);  //lower right
    point(185,107); //upper right

//heres the actual curve
  strokeWeight(5);
    beginShape();
      vertex(147,107);
      bezierVertex(147,99,185,99,185,107);
    endShape();

//GLASSES ENDS HERE ---------------------------------------------

//MOUTH STARTS HERE ---------------------------------------------

//cute little v-shaped mouth using the stroke join settings

  strokeWeight(5);
    strokeJoin(MITER);
      beginShape();
        vertex(150,150);
        vertex(160,170);
        vertex(175,150);
      endShape();

//MOUTH ENDS HERE -----------------------------------------------

//HAIR STARTS HERE ----------------------------------------------

//make my hair the correct colour
  fill("#c473dc");

//block in shapes with ellipses
  //fringe
  ellipse(180,45,250,75);

  //left side
  ellipse(65,135,55,200);

  //right side
  ellipse(290,135,80,200);

  //ellipses to hide some of the lines
  noStroke();
  ellipse(75,50,40,40); //left
  ellipse(278,53,49,49); //right

//HAIR ENDS HERE -------------------------------------------------

//ARMS START HERE ------------------------------------------------

  //ellipses partially hidden by the body are arms!
  fill("#402867");
  stroke("#000000");
    ellipse(87,290,50,150); //left arm
    ellipse(270,290,50,150); //right arm

//ARMS END HERE --------------------------------------------------

//LEGS START HERE ------------------------------------------------

  fill("#616b8a");
  rect(90,380,70,100); //left
  rect(190,380,70,100); //right
  rect(90,350,170,50,10); //top

  //these are to cover up some lines
  noStroke();
  rect(93,385,63,30);
  rect(193,385,65,30);

//LEGS END HERE --------------------------------------------------

//BODY STARTS HERE -----------------------------------------------
stroke("#000000");
  fill("#402867");
  rect(85,200,180,180,29);

//BODY ENDS HERE -------------------------------------------------

//SHOES START HERE -----------------------------------------------

  //shoes are just rectangles with some corners rounded more than others
    fill("#000000")
    rect(70,450,94,30,15,3,5,5); //left foot
    rect(180,455,80,30,15,15,5,5); //right foot

//SHOES END HERE -------------------------------------------------

//SCARF STARTS HERE ----------------------------------------------

//colours
  stroke("#000000");
  fill("#d57182");

//top part
    rect(85,200,175,60,10);

//bottom part
  translate(0,20);
    rect(85,200,175,60,10);

//part that sticks out
  angleMode(DEGREES);
  rotate(20);
  translate(200,-120);
    rect(85,200,175,60,10);

//SCARF ENDS HERE ------------------------------------------------

}

function draw() {
  // i dont even know what this does but it's in the template
  // so i guess i'll just leave it here for now
}
