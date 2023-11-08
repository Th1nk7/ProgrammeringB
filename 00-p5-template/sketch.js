let pageHeader, htmlPageheader
let showRedCircle = true

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pageHeader = createElement('h1', 'Hejsa for eksempel')
  pageHeader.position(50,40)
  htmlPageheader = select('#htmlPageheader')
    .position(50,150)  
    .html('Nu har p5 overtaget overskriften')
    .mouseClicked(() => showRedCircle = !showRedCircle)
}

function draw() {
  background(220);
  if(showRedCircle == true){
    fill("red")
    ellipse(100,300,100)
  }
}
