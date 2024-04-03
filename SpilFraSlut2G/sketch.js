let isStarted = false;
let score = 0;
let walls = [];
let player;
let maxVelocity = 25;
let initialJumpForce = 20;
let jumpForce = 15;
let gravity = 1.2;
let isDead = 0;
let gap = 3;
let wallSpeed = 6;
let heartsLeft = 6;
let heartText1
let heartText2
let heartText3

function preload(){
  imgHeart = loadImage('heart.png')
}

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
    bottomHeight:windowHeight,
    isHit:false
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

  if(isDead == 1){
    isStarted = false
    background("black")
    deadText = createElement("h1","Click to restart!")
    deadText.style("color","white")
    deadText.center()
    isDead = 2
  }

  if(mouseIsPressed){
    if(isDead == 0){
      isStarted = true
      startText.hide()
    }
    else{
      window.location.reload()
    }
  }

  if(isStarted){
    background(220);
    player.velocity = constrain(player.velocity + gravity,-maxVelocity,maxVelocity)
    player.y = player.y + player.velocity
    
    if(player.y > windowHeight || player.y < 0){
      isDead = 1;
      switch(heartsLeft){
        case 6&&5:
          heartText3.hide();
          break;
        
        case 4&&3:
          heartText2.hide();
          break;
        
        case 2&&1:
          heartText1.hide();
          break;
      }
    }

    fill("blue")
    ellipse(player.x, player.y, player.size)

    
    if(frameCount%90==0 && isStarted){
      createWall()
    }
    for(i in walls){
      walls[i].topX = walls[i].topX -wallSpeed
      walls[i].bottomX = walls[i].bottomX -wallSpeed
      if(walls[i].isHit == false){
        fill("green")
      }
      else{
        fill("red")
      }
      rect(walls[i].topX, walls[i].topY, walls[i].topWidth, walls[i].topHeight)
      rect(walls[i].bottomX, walls[i].bottomY, walls[i].bottomWidth, walls[i].bottomHeight)
      
      if(walls[i].topX-player.x < player.size/2 && walls[i].topX > player.x-player.size/2 && ((walls[i].topHeight+player.size/2)-player.y >  0 || (walls[i].bottomY-player.size/2)-player.y < 0) && walls[i].isHit == false){
        heartsLeft --
        console.log("hit")
        walls[i].isHit = true
        if(heartsLeft == 0){
          isDead = 1
        }
      }
    }
    image(imgHeart,windowWidth-140,40,100,100)
    if(heartsLeft%2 == 0 && isDead == 0){
      switch(heartsLeft){
        case 6:
          heartText3 = createElement("h1","3");
          heartText3.style("color","white");
          heartText3.center();
          heartText3.position(windowWidth-97,47)
          heartsLeft--;
          break;

        case 4:
          heartText2 = createElement("h1","2");
          heartText2.style("color","white");
          heartText2.center();
          heartText2.position(windowWidth-97,47)
          heartsLeft--;
          heartText3.hide()
          break;
        
        case 2:
          heartText1 = createElement("h1","1");
          heartText1.style("color","white");
          heartText1.center();
          heartText1.position(windowWidth-97,47)
          heartsLeft--;
          heartText2.hide()
          break;
        
        default:
          heartText1.hide()
          heartsLeft--;
          break;

      }
      
    }
  }
}
