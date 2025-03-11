import Ball from './Ball.js';

let balls = [];
let draggingBall = null;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background('lightblue');
  noStroke();
  fill('green');
  rect(0, height - 50, width, 50); // Ground

  for (let ball of balls) {
    ball.update();
    ball.display();
  }
}

function mousePressed() {
  if (mouseButton === RIGHT) {
    balls.push(new Ball(mouseX, mouseY, 50));
  } else if (mouseButton === LEFT) {
    for (let ball of balls) {
      let d = dist(mouseX, mouseY, ball.x, ball.y);
      if (d < ball.diameter / 2) {
        ball.startDragging();
        draggingBall = ball;
        break;
      }
    }
  }
}

function mouseReleased() {
  if (draggingBall) {
    draggingBall.stopDragging();
    draggingBall = null;
  }
}

function mouseDragged() {
  if (draggingBall) {
    draggingBall.drag(mouseX, mouseY);
  }
}

window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.mouseReleased = mouseReleased;
window.mouseDragged = mouseDragged;