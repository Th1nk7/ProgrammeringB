let isStarted = false;
let score = 0;
let walls = [];
let player;
let maxVelocity = 25;
let initialJumpForce = 20;
let jumpForce = 15;
let gravity = 1.2;
let isDead = false;
let gap = 3;
let wallSpeed = 6;

function setup() {
  frameRate(60)
  let cnv = createCanvas(windowWidth,windowHeight)
    player = {
    x:windowWidth/10,
    y:windowHeight/2,
    velocity:0,
    size:50
  }
  background("black")
  startText = createElement("h1","Clappy Bird")
  startText.style("color","white")
  startText.center()
}

function createWall(){
  tempHeightTop = random(windowHeight/10,windowHeight/10*(9-gap))
  tempYBot = tempHeightTop+windowHeight/10*gap
  walls.push({
    topX:windowWidth,
    topY:0,
    topWidth:50,
    topHeight:tempHeightTop,
    bottomX:windowWidth,
    bottomY:tempYBot,
    bottomWidth:50,
    bottomHeight:windowHeight
  })
}

function keyPressed(){
  if(key==" "&&isStarted){
    if(player.velocity<-5){
      player.velocity = constrain(player.velocity-jumpForce,-maxVelocity,maxVelocity)
    }
    else{
      player.velocity = -initialJumpForce
    }
  }
}

function draw() {
  if(mouseIsPressed){
    isStarted = true
    startText.hide()
  }

  if(isStarted){
    background(220);
    fill("red")
    player.velocity = constrain(player.velocity + gravity,-maxVelocity,maxVelocity)
    player.y = player.y + player.velocity
    
    if(player.y > windowHeight || player.y < 0){
      isDead = true;
    }

    if(isDead == true){

    }

    ellipse(player.x, player.y, player.size)
    
    if(frameCount%90==0 && isStarted){
      createWall()
    }
    for(i in walls){
      walls[i].topX = walls[i].topX -wallSpeed
      walls[i].bottomX = walls[i].bottomX -wallSpeed
      rect(walls[i].topX, walls[i].topY, walls[i].topWidth, walls[i].topHeight)
      rect(walls[i].bottomX, walls[i].bottomY, walls[i].bottomWidth, walls[i].bottomHeight)
      
      if(walls[i].topX-player.x < player.size && walls[i].topX > player.x-player.size && ((walls[i].topHeight+player.size/2)-player.y >  0 || (walls[i].bottomY-player.size/2)-player.y < 0)){
        isDead = true;
        console.log("hit")
      }
    }
  }
}
