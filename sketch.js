let sound;
let songList = ['audio/Ruine-Goesting.wav', 'audio/Rettenbachklamm.wav', 'audio/Murauen.wav', 'audio/Lend-Balkon.wav', 'audio/Hirzmannssperre.wav', 'audio/Flachwasserzone-Mur.wav', 'audio/Eustachio-Wald.wav', 'audio/Bienenstock-Murauen.wav', 'audio/0.wav'];

let yoff = 0.0;
let angle = 0;
let H;

function preload() {
  sound = loadSound(songList[4]); //change song input
}

function setup() {
  createCanvas(1080, 1920);
  sound.loop();
  fft = new p5.FFT();
  sound.amp(0.2);
  colorMode(HSB, 360, 100, 100, 100);
  H = random(0,360);
}

function draw() {
  background(255);

  fft.analyze();
  bassVal = (int)(fft.getEnergy("bass"));
  lMidVal = (int)(fft.getEnergy("lowMid"));
  midVal = (int)(fft.getEnergy("mid"));
  hMidVal = (int)(fft.getEnergy("highMid"));
  trebVal = (int)(fft.getEnergy("treble"));


  noStroke();
  fill(H, 100, 50, 25);

  let size = 10;
  drawShape(bassVal, size);
  drawShape(lMidVal, size);
  drawShape(midVal, size);
  drawShape(hMidVal, size);
  drawShape(trebVal, size);

//HUE SHIFT
  H += 0.1;
  if (H >= 360) {
    H = 0;
  }
}


function drawShape(freq, rad) {
  let radius = rad / freq;
  let detail = 0.1;
  let ampMin = freq * 2;
  let ampMax = freq * 4;
  let turnSpeed = 0.0001 * freq;

  push();
  translate(width / 2, height / 2);
  rotate(angle);

  beginShape();
  var xoff = 0;
  for (var a = 0; a < TWO_PI; a += detail) {
    var offset = map(noise(xoff, yoff), 0, 1, ampMin, ampMax);
    var r = radius + offset;
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x, y);
    xoff += 0.1;
  }
  endShape();
  pop();
  yoff += 0.01;
  angle += turnSpeed;
}