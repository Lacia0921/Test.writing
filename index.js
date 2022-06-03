let previousState;

let stateIndex = 0;
let bg;

function preload() {
  bg = loadImage("square.png");
  //bg = 0;
}

function setup() {
  let canvas = createCanvas(700, 700);
  canvas.parent('sketch-holder');
  background(255)
  // image(bg,0,0);

  distance = 10;
  spring = 0.8;
  friction = 0.6;
  size = 25;
  diff = size / size;
  x = y = ax = ay = a = r = f = 0;
  //
  fill(265, 123, 18);
  textSize(20);
  // save state at beginning for blank canvas
  saveState();
}

function draw() {
  oldR = r;
  if (mouseIsPressed) {
    mX = mouseX;
    mY = mouseY;
    if (!f) {
      f = 1;
      x = mX;
      y = mY;
    }
    ax += (mX - x) * spring;
    ay += (mY - y) * spring;
    ax *= friction;
    ay *= friction;
    a += sqrt(ax * ax + ay * ay) - a;
    a *= 0.6;
    r = size - a;

    for (i = 0; i < distance; ++i) {
      oldX = x;
      oldY = y;
      x += ax / distance;
      y += ay / distance;
      oldR += (r - oldR) / distance;
      if (oldR < 1) oldR = 1;
      strokeWeight(oldR + diff);
      line(x, y, oldX, oldY);
      strokeWeight(oldR);
      line(x + diff * 2, y + diff * 2, oldX + diff * 2, oldY + diff * 2);
      line(x - diff, y - diff, oldX - diff, oldY - diff);
    }
  } else if (f) {
    ax = ay = f = 0;
  }
}

function keyPressed(e) {
  // check if the event parameter (e) has Z (keycode 90) and ctrl or cmnd
  if (e.keyCode == 90 && (e.ctrlKey || e.metaKey)) {
    undoToPreviousState();
  }

  if (key == char(32)) {
    // spacebar
    clear();
    // image(bg,0,0);
    background(255)

  }
  if (key == "s") {
    saveCanvas(canvas, "character-script", "jpg");
  }
}

function undoToPreviousState() {
  // if previousState doesn't exist ie is null
  // return without doing anything
  if (!previousState) {
    return;
  }
  // else draw the background (in this case white)
  // and draw the previous state
  // image(bg,0,0);
  background(255)

  image(previousState, 0, 0);
  // then set previous state to null
  previousState = null;
}

function mousePressed() {
  // the moment input is detect save the state
  saveState();
}

function saveState() {
  // save state by taking image of background
  // for more info look at reference for get
  previousState = get();
}

function windowResized() {
  resizeCanvas(windowWidth / 2, windowWidth / 2);
  // image(bg,0,0);
  background(255)


}