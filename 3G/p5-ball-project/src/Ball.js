export default class Ball {
  constructor(x, y, diameter) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.mass = diameter / 10;
    this.gravity = createVector(0, 0.1 * this.mass);
    this.bounce = -0.7;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    if (!this.dragging) {
      this.applyForce(this.gravity);
      this.velocity.add(this.acceleration);
      this.y += this.velocity.y;
      this.acceleration.mult(0);

      if (this.y + this.diameter / 2 > height - 50) {
        this.y = height - 50 - this.diameter / 2;
        this.velocity.y *= this.bounce;
      }
    }
  }

  display() {
    fill('red');
    ellipse(this.x, this.y, this.diameter);
  }

  startDragging() {
    this.dragging = true;
    this.offsetX = this.x - mouseX;
    this.offsetY = this.y - mouseY;
  }

  stopDragging() {
    this.dragging = false;
  }

  drag(x, y) {
    if (this.dragging) {
      this.x = x + this.offsetX;
      this.y = y + this.offsetY;
    }
  }
}