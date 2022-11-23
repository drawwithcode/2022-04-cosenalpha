// Initialize the Image Classifier method with DoodleNet.
let classifier;

let labelSpan;

let clearButton;
let blackButton;
let redButton;
let blueButton;
let yelButton;
let greenButton;

let canvas;
let color = 0;
let timer = 7;


function preload() {
  classifier = ml5.imageClassifier('DoodleNet');
}

function setup() {
  canvas = createCanvas(windowWidth*0.8, windowHeight*0.8);
  background("#FAF6EE");


  // Create a clear canvas button and the color buttons
  clearButton = select("#clearBtn");
  clearButton.mousePressed(clearCanvas);

  blackButton = select("#blackCol");
  blackButton.mousePressed(colBlack);

  redButton = select("#redCol");
  redButton.mousePressed(colRed);

  blueButton = select("#blueCol");
  blueButton.mousePressed(colBlue);

  yelButton = select("#yellowCol");
  yelButton.mousePressed(colYel);

  greenButton = select("#greenCol");
  greenButton.mousePressed(colGreen);

  labelSpan = select("#time");
}


function draw() {
  strokeWeight(10);
  stroke(color);
   if (mouseIsPressed) {
      line(pmouseX, pmouseY, mouseX, mouseY);
    }

  if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer --;
    labelSpan.html(timer);
  }

  if (timer == 0) {
    console.log("gameover");
    classifier.classify(canvas, gotResult);
    noLoop(); //thanks to the noLoop function the code stops looping and finding new results
  }
}


function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
    return;
  }


  // The results are in an array ordered by confidence.
  console.log(results);
  let risp = 'I see: '+results[0].label;
  /* The message shown on the banner and spoken by the voice 
  is the most probable guess of what the drawing is, since
  it's the first word of the array. Because of (maybe??)
  canvas sizing reasons/ml5 issues, the guess is pretty
  much never correct, and it always says rain or stitches */


  speech = new p5.Speech();
  speech.setLang("en-GB");

  labelSpan.html(risp); //the labelSpan and the voice show the same message 
  speech.speak(risp);
  noLoop(); //the noLoop function makes it so that the code doesn't keep running,
  // and repeating the same sentence over and over again
}

/* This series of functions makes the color buttons work */
function colBlack() {
  color = "black";
}

function colRed() {
  color = "red";
}

function colBlue() {
  color = "blue";
}

function colYel() {
  color = "#F9E708";
}

function colGreen() {
  color = "#06DB00";
}

// this function erases the whole canva by restoring the background to
// its original color
function clearCanvas() {
  background("#FAF6EE");
  timer = 7;
  loop(); //the loop function makes the game restart
}