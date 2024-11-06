let client
let block1pos, block2pos, ballX, ballY, state

function setup(){
  state = "setup"
  createCanvas(1440, 1080)
  client = mqtt.connect('wss://mqtt.nextservices.dk')

  client.on('connect', function(svar){
  console.log(svar, 'serveren er klar til mqtt kommunikation')
  })

  
  client.subscribe('electric_pong')

  client.on('message', function(emne, besked){
      console.log(emne)
      console.log(besked.toString())
      try {
        const json = JSON.parse(besked)
        if(json.blockNum == "3"){
          ballX = int(json.ballX)
          ballY = int(json.ballY)
        }
        if(json.blockNum == "1"){
          block1pos = int(json.block1pos)
        }
        if(json.blockNum == "2"){
          block2pos = int(json.block2pos)
        }
      } catch (e) {
        console.log(e)
        if(besked.toString() == "game"){
          state = "game"
        }
        else if(besked.toString() == "setup"){
          state = "setup"
        }
        else if(besked.toString() == "countdown"){
          
        }
      }
    
  })
}

function draw(){
  background("black")
  noStroke()
  fill("white")
  if(state == "setup"){
    block1pos = 540
    block2pos = 540
    ballX = 720
    ballY = 540
  }
  else if(state == "game"){
    ellipse(ballX,ballY,20)
    rect(240,block1pos,30,180)
    rect(1200,block2pos,30,180) 
  }
}
