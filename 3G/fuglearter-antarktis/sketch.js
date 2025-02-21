let birds = []
let familyColors = []
let store

function preload() {
  loadJSON('./birdsAndDetails.json', loadBirds);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}
function draw() {
  background("#9090ff");
  for (let bird of birds) {
    bird.render();
  }
}

function loadBirds(birdData) {
  if (store == null) {
    store = birdData
  }

  for (let bird of birdData) {
    let size = bird.size * 2; // 2x size for more text space
    let name = bird.name;
    let family = bird.family;
    let x = int(random(size / 2, windowWidth - size / 2));
    let y = int(random(size / 2, windowHeight - size / 2));
    let color = null

    let overlapping;
    do {
      overlapping = false;
      for (let b of birds) {
        if (dist(b.pos.x, b.pos.y, x, y) < (b.size / 2 + size / 2)) {
          x = int(random(size / 2, windowWidth - size / 2));
          y = int(random(size / 2, windowHeight - size / 2));
          overlapping = true;
          break;
        }
      }
    } while (overlapping);

    birds.push(new Bird(x, y, size, name, family));
  }
}

class Bird {
  constructor(x, y, size, name, family) {
    this.pos = createVector(x, y);
    this.size = size;
    this.name = name;
    this.family = family;
    this.moveVector = p5.Vector.fromAngle(random(0, 360));
    this.speed = 1;
    this.color = random(50,255)
  }

  render() {
    let nextPos = p5.Vector.add(this.pos, p5.Vector.mult(this.moveVector, this.speed));

    if (nextPos.x < this.size / 2 || nextPos.x > windowWidth - this.size / 2) {
      this.moveVector.rotate(180);
    }
    if (nextPos.y < this.size / 2 || nextPos.y > windowHeight - this.size / 2) {
      this.moveVector.rotate(180);
    }

    for (let b of birds) {
      if (b !== this && dist(nextPos.x, nextPos.y, b.pos.x, b.pos.y) < (b.size / 2 + this.size / 2)) {
        this.moveVector.rotate(random([90, -90]));
        break;
      }
    }

    this.pos.add(p5.Vector.mult(this.moveVector, this.speed));

    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
    fill('black')
    textSize(18)
    textAlign(CENTER)
    text(`${this.name}\n${this.family}`, this.pos.x, this.pos.y)
  }
}