var song, fft;
var mic;
function preload() {
  song = loadSound("chase.mp3");
}

function setup() {
  createCanvas(800, 800);
  fft = new p5.FFT();
   song.play();
  //  mic = new p5.AudioIn();
  //  fft.setInput(mic);
  // mic.start();
}

function draw() {
  background(0, 0, 0);
  fft.analyze();
  bassVal = (int)(fft.getEnergy("bass"));
  lMidVal = (int)(fft.getEnergy("lowMid"));
  midVal = (int)(fft.getEnergy("mid"));
  hMidVal = (int)(fft.getEnergy("highMid"));
  trebVal = (int)(fft.getEnergy("treble"));

  noStroke();
  fill(255, 186, 73);
  ellipse(width / 2, height / 2, bassVal* 2 , bassVal*2 );

  noStroke();
  fill(32, 163, 158);
  ellipse(width / 2, height / 2, lMidVal * 2, lMidVal * 2);

  noStroke();
  fill(135, 195, 143);
  ellipse(width / 2, height / 2, midVal * 2, midVal * 2);

  noStroke();
  fill(239, 91, 91);
  ellipse(width / 2, height / 2, hMidVal * 4, hMidVal * 4);

  noStroke();
  fill(79, 0, 75);
  ellipse(width / 2, height / 2, trebVal * 2, trebVal * 2);

}