let circleX, circleY;
let circleDiameter = 50;
let bounce = 0.5;
let circleDrag = 0.47;
let circleMass = 10;
let gravity = 9.82;
let circleVelocity = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  circleX = width/2;
  circleY = height/10;
}

function draw() {
  background('lightblue');
  noStroke();
  fill('green');
  rect(0, height-100, width, 100);
  calculatePhysics();
  stroke(10)
  fill('red');
  ellipse(circleX, circleY, circleDiameter);
}

function calculatePhysics() {
  let gravityForce = circleMass * gravity;
  let frictionForce = circleDrag * (circleDiameter/2*(circleVelocity**2)/2)*//IDK YET;
  let netForce = gravityForce - frictionForce;
  let acceleration = netForce / circleMass;
  circleY += acceleration;
  
  if (circleY > height - circleDiameter/2) {
    circleY = height - circleDiameter/2;
    circleY *= -bounce;
  }
}