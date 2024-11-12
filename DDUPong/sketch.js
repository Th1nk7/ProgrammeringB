let font
let client
let state
let blockLeftY = 400
let blockRightY = 400
let readyLeft
let readyRight
let ongoingCountdown
let ballX
let ballY
let blockLeftX = 700
let blockRightX = 100
let ballSize = 5
let blockWidth = 15
let blockHeight = 100
let ballSpeedX
let ballSpeedY
let scoreLeft = 0
let scoreRight = 0
let hasShocked = true
let hasChanged = false

function preload(){
  FontP2 = loadFont('./PressStart2P-Regular.ttf')
}

function setup(){
  createCanvas(800, 800)
  textFont(FontP2)
  frameRate(60)
  textAlign(CENTER, CENTER)
  textSize(100)
  rectMode(CENTER)
  ellipseMode(CENTER,)
  doSetup()
  client = mqtt.connect('wss://mqtt.nextservices.dk')
  client.on('connect', function(svar){
  console.log(svar, 'serveren er klar til mqtt kommunikation')
  })
  client.subscribe('blockLeftY_pong')
  client.subscribe('blockRightY_pong')
  client.subscribe('state_pong')
  client.on('message', function(emne, besked){
    if(emne == 'blockLeftY_pong'){
      blockLeftY = Number(besked)
    }
    else if(emne == 'blockRightY_pong'){
      blockRightY = Number(besked)
    }
    else if(emne == 'state_pong' && state == 'setup'){
      switch (besked.toString()) {
        case 'readyLeft':
          readyLeft = true
          startCountdown()
          break
        case 'readyRight':
          readyRight = true
          startCountdown()
          break
        case 'abortLeft':
          readyLeft = false
          break
        case 'abortRight':
          readyRight = false
          break
        case 'hasShocked':
          hasShocked = true
          break
        default:
          console.log("Defaulted on state_pong message")
          break
      }
    }
  })
}

function doSetup(){
  if(ceil(random(0,2))==1){
    ballSpeedX = 6
  }
  else{
    ballSpeedX = -6
  }
  ballSpeedY = round(random(4,6))
  ballX = 400
  ballY = 400
  blockLeftY = 400
  blockRightY = 400
  state = 'setup'
  readyLeft = false
  readyRight = false
  ongoingCountdown = false
  if(scoreRight >= 3){
    scoreLeft = 0
    scoreRight = 0
    fill('white')
    push()
    textSize(30)
    translate(600,-200)
    rotate(radians(90))
    text('You win!', 600, 400)
    pop()
    hasChanged = true
  }
  else if(scoreLeft >= 3){
    scoreLeft = 0
    scoreRight = 0
    fill('white')
    push()
    textSize(30)
    translate(200,1000)
    rotate(radians(270))
    text('You win!', 600, 400)
    pop()
    hasChanged = true
  }
}

async function startCountdown(){
  if(!ongoingCountdown && state == 'setup' && readyLeft && readyRight && hasShocked){
    ongoingCountdown = true
    background('black')
    fill('white')
    push()
    translate(800,800)
    rotate(radians(180))
    textSize(100)
    text('3',400,400)
    pop()
    await sleep(1000)
    if(readyLeft && readyRight && ongoingCountdown){
      background('black')
      fill('white')
      push()
      translate(800,800)
      rotate(radians(180))
      textSize(100)
      text('2',400,400)
      pop()
      await sleep(1000)
      if(readyLeft && readyRight && ongoingCountdown){
        background('black')
        fill('white')
        push()
        translate(800,800)
        rotate(radians(180))
        textSize(100)
        text('1',400,400)
        pop()
        await sleep(1000)
        if(readyLeft && readyRight && ongoingCountdown){
          client.publish('state_pong', 'game')
          state = 'game'
        }
      }
    }
    ongoingCountdown = false
  }
}

function drawObjects(){
  ellipse(ballX,ballY,ballSize)
  rect(blockLeftX,blockLeftY,blockWidth,blockHeight)
  rect(blockRightX,blockRightY,blockWidth,blockHeight)
}

function tickGame(){
  ballX += ballSpeedX
  ballY += ballSpeedY
  if((ballY >= 800 && ballSpeedY >= 0) || (ballY <= 0 && ballSpeedY <= 0)){
    ballSpeedY *= -1
  }
  if((ballSpeedX > 0) && (ballX >= (blockLeftX-(blockWidth/2))) && (ballX <= (blockLeftX+(blockWidth))) && (ballY >= (blockLeftY-(blockHeight/2))) && (ballY <= (blockLeftY+(blockHeight/2)))){
    ballSpeedX *= -1.05
    ballSpeedY = round(map((ballY - blockLeftY), -50, 50, -10, 10))
  }
  else if(ballSpeedX < 0 && ballX <= (blockRightX+(blockWidth/2)) && ballX >= (blockRightX-(blockWidth)) && ballY >= (blockRightY-(blockHeight/2)) && ballY <= (blockRightY+(blockHeight/2))){
    ballSpeedX *= -1.05
    ballSpeedY = round(map((ballY - blockRightY), -50, 50, -10, 10))
  }
  if(ballX >= 800 && hasShocked == true){
    client.publish('state_pong', 'setup')
    hasShocked = false
    scoreRight++
    client.publish('state_pong', ('blockRightWin'.concat('',str(scoreRight))))
    select('#scoreboard').html(str(scoreLeft).concat('', ' - '.concat('', str(scoreRight))))
    doSetup()
  }
  else if(ballX <= 0 && hasShocked == true){
    client.publish('state_pong', 'setup')
    hasShocked = false
    scoreLeft++
    client.publish('state_pong', ('blockLeftWin'.concat('',str(scoreLeft))))
    select('#scoreboard').html(str(scoreLeft).concat('', ' - '.concat('', str(scoreRight))))
    doSetup()
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function draw(){
  if(hasShocked == true && hasChanged == true){
    hasChanged = false
    select('#scoreboard').html(str(scoreLeft).concat('', ' - '.concat('', str(scoreRight))))
  }
  if(frameCount%600==0 && hasShocked == true && ongoingCountdown == false){
    clear()
  }
  if(frameCount%4==0 && hasShocked == true){
    if((!readyLeft || !readyRight) || state == 'game'){
      background('black')
      fill("black")
      stroke(255)
      strokeWeight(10)
      rect(400,400,800,800)
      fill('white')
      strokeWeight(3)
      drawingContext.setLineDash([5,15])
      line(400,0,400,800)
      drawingContext.setLineDash([0,0])
      if(scoreLeft+scoreRight==0&&state=='setup'){
        fill('white')
        push()
        translate(800,800)
        stroke(1)
        rotate(radians(180))
        textSize(25)
        text('Hold all buttons to start',400,400)
        pop()
      }
    }
    else if(ongoingCountdown && (!readyLeft || !readyRight)){
      ongoingCountdown = false
    }
    if(state == 'game'){
      tickGame()
      drawObjects()
    }
  }
}
