from m5stack import *
from m5ui import *
from uiflow import *
import json
from libs.json_py import *
from m5mqtt import M5mqtt
import math
import time
import unit
import wifiCfg
from easyIO import *
import ntptime

def fun_state_pong_(topic_data):
  global blockRightY, blockLeftY, state, readyLeft, readyRight, t, ntp, shockLong, shocking
  if topic_data == "setup":
    doSetup()
  elif topic_data == "game":
    state = "game"
  elif topic_data == "readyLeft" and state == "setup":
    readyLeft = True
  elif topic_data == "abortLeft" and state == "setup":
    readyLeft = False
    neopixel_0.setColorFrom(1, 21, 0x000000)
  elif topic_data == "readyRight" and state == "setup":
    readyRight = True
  elif topic_data == "abortRight" and state == "setup":
    readyRight = False
    neopixel_0.setColorFrom(1, 21, 0x000000)
  if "Win" in topic_data:
    shocking = True
    if "Left" in topic_data:
      m5mqtt.publish('state_pong', 'targetLeft', 0)
    else:
      m5mqtt.publish('state_pong', 'targetRight', 0)
    wait_ms(100)
    if "3" in topic_data:
      t = ntp.getTimestamp() + 4
      m5mqtt.publish('timestamp_pong', str(t), 0)
      shockLong = True
    else:
      playSongShockShort()
      if "2" in topic_data:
        m5mqtt.publish('state_pong', 'shock2', 0)
      else:
        m5mqtt.publish('state_pong', 'shock1', 0)
      shocking = False
      m5mqtt.publish('state_pong', 'hasShocked', 0)
  pass

ntp = ntptime.client(host='dk.pool.ntp.org', timezone=8)
shockLong = False
shocking = False
  
def doSetup():
  global state, readyLeft, readyRight, brightnessArr, brightnessPointer, brightnessDirection, idlePhase, idleArr, idlePointer, idleColors, idleColorPointer, idleLoopCount, gameArr, gameLoopCount
  state = "setup"
  readyLeft = False
  readyRight = False
  lcd.setBrightness(0)
  neopixel_0.setColorFrom(1, 21, 0x000000)
  speaker.setVolume(6)
  neopixel_0.setBrightness(100)
  brightnessArr = [255,170,113,75,50,35,23,15,15,15]
  brightnessPointer = 0
  brightnessDirection = 1
  idlePhase = 0
  idleArr = [0x0000ff]
  idleColorPointer = 1
  idlePointer = 1
  idleColors = [0xff00ff, 0x0000ff, 0xffffff]
  idleLoopCount = 0
  gameArr = [0xff00ff,0x0000ff,0xffffff,0xff00ff,0x0000ff,0xffffff,0xff00ff,0x0000ff,0xffffff,0xff00ff,0x0000ff,0xffffff,0xff00ff,0x0000ff,0xffffff,0xff00ff,0x0000ff,0xffffff,0xff00ff,0x0000ff]
  gameLoopCount = 0
  for _ in range(19):
    idleArr.append(0xff00ff)
  pass

notesList = [220,247,131,147,165,175,196,440,494,262,294,330,349,392,880,988,523,587,659,698,784,233,139,156,185,208,466,277,311,370,415,932,554,622,740,831]

notesSongEva = [2,23,5,23,5,5,21,25,6,5,6,6,21,9,5,23,21,6,21,21,9]
waitsSongEva = [166*3,166*3,166*2,166*2,166,166*3,166,166,20,166,166*4,166*3,166*3,166*2,166*2,166,166*3,166,166,166*2,20]

notesSongE = [27,10,11,11,11,7,7,32,32,8,7,30,7,8,32,8,7]
waitsSongE = [166*5,166,166*3,166*3,166*3,166*3,166*3,166*3,166*5,166,166*15,166*3,166*3,166*15,166*5,166,20]

notesSongSC = [7,9,10,10,26,7,10]
waitsSongSC = [7,3,2,9,3,3,3]

notesSongW = [12,16,8,16,8,16,8,16,30,12,12,30,16,32,30,32,33,16,32,16,32,16]
waitsSongW = [166*5,166,20,20,20,20,166,166,166*3,166*5,166,166,166,166*3,166*3,166*3,166*3,166,166,166,166,20]
iSongW = [12,16,8,16,8,16,8,16,19,12,12,19,16,21,19,21,21,16,21,16,21,16]

def playSongW():
  for i in range(len(notesSongW)):
    neopixel_0.setColorFrom(2,iSongW[i],0xffffff)
    speaker.sing(notesList[notesSongW[i]], 1/8)
    wait_ms(waitsSongW[i]-(waitsSongW[i]//3))
    neopixel_0.setColorFrom(2,21,0x0000ff)
  return
  
def playSongE():
  for i in range(len(notesSongE)):
    speaker.sing(notesList[notesSongE[i]], 1/6)
    wait_ms(waitsSongE[i])
  return

def playSongEva():
  for i in range(len(notesSongEva)):
    speaker.sing(notesList[notesSongEva[i]], 1/4)
    wait_ms(waitsSongEva[i]-(waitsSongEva[i]//3))
  return

def playSongShockLong():
  global gameArr, ntp, t, notesSongSC, waitsSongSC
  while t-3 != ntp.getTimestamp():
    wait_ms(5)
  for i in range(len(notesSongSC)):
    if i < 4:
      neopixel_0.setColorFrom(2,21,0xff00ff)
      speaker.sing(notesList[notesSongSC[i]], (1/4)*waitsSongSC[i])
      neopixel_0.setColorFrom(2,21,0x000ff)
      wait_ms(50)
    else:
      neopixel_0.setColorFrom(2,21,0xffffff)
      speaker.sing(notesList[notesSongSC[i]], (1/4)*waitsSongSC[i])
      neopixel_0.setColorFrom(2,21,0x0000ff)
      wait_ms(125)
  m5mqtt.publish('state_pong', 'hasShocked', 0)
  pass

def playSongShockShort():
  # ADD RANDOM HERE
  playSongW()
  pass

def tickBrightness():
  global brightnessPointer, brightnessDirection, brightnessArr
  brightnessPointer += brightnessDirection
  if brightnessPointer >= 9:
    brightnessDirection = -1
  elif brightnessPointer <= 0:
    brightnessDirection = 1
  brightnessArr[brightnessPointer] = 150
  for i in range(len(brightnessArr)):
    brightnessArr[i] = max(brightnessArr[i] - 15, 0)
  pass

neopixel_0 = unit.get(unit.NEOPIXEL, unit.PORTA, 21)
setScreenColor(0x000000)

wifiCfg.doConnect('Next-Guest', '')
while not (wifiCfg.wlan_sta.isconnected()):
  pass

m5mqtt = M5mqtt('', 'mqtt.nextservices.dk', 0, '', '', 300, ssl = True)
m5mqtt.subscribe(str('state_pong'), fun_state_pong_)
m5mqtt.start()
doSetup()
playSongEva()

while True:
  if shocking == True:
    if shockLong == True:
      shockLong = False
      playSongShockLong()
      m5mqtt.publish('state_pong', 'hasShocked', 0)
      shocking = False
  
  elif state == "game":
    for i in range(len(gameArr)):
      neopixel_0.setColor(i+2,gameArr[i])
    if gameLoopCount >= 10:
      gameArr.append(gameArr.pop(0))
    gameLoopCount += 1
    wait_ms(20)
    
  elif state == "setup":
    if readyLeft | readyRight:
      if readyLeft and readyRight:
        neopixel_0.setColorFrom(2, 21, (int((math.remap(math.sin((time.ticks_ms()) / 180), (-1), 1, 0, 255)))) << 8)
      elif readyLeft:
        tickBrightness()
        for i in range(len(brightnessArr)):
          neopixel_0.setColor(i+12, brightnessArr[i] << 16 | brightnessArr[i] << 8)
          neopixel_0.setColor(11-i, brightnessArr[i] << 16)
      elif readyRight:
        tickBrightness()
        for i in range(len(brightnessArr)):
          neopixel_0.setColor(11-i, brightnessArr[i] << 16 | brightnessArr[i] << 8 )
          neopixel_0.setColor(i+12, brightnessArr[i] << 16)
      wait_ms(30)
      
    else:
      if idlePhase == 0:
        for i in range(len(idleArr)):
          neopixel_0.setColor(i+2, idleArr[i])
        if idlePointer < 20 and idleArr[idlePointer] != 0x0000ff:
          idleArr[idlePointer-1] = 0xff00ff
          idleArr[idlePointer] = 0x0000ff
          idlePointer += 1
        elif 0xff00ff not in idleArr:
          idlePointer = 1
          idleArr[0] = 0xffffff
          idlePhase = 1
        else:
          idlePointer = 1
          idleArr[0] = 0x0000ff
        wait_ms(5)
          
      elif idlePhase == 1:
        for i in range(len(idleArr)):
          neopixel_0.setColor(i+2, idleArr[i])
        if idlePointer < 20 and idleArr[idlePointer] != 0xffffff:
          idleArr[idlePointer-1] = 0x0000ff
          idleArr[idlePointer] = 0xffffff
          idlePointer += 1
        elif 0x0000ff not in idleArr:
          idlePointer = 1
          idleArr[0] = 0xff00ff
          idlePhase = 2
        else:
          idlePointer = 1
          idleArr[0] = 0xffffff
        wait_ms(5)
          
      elif idlePhase == 2:
        for i in range(len(idleArr)):
          neopixel_0.setColor(i+2, idleArr[i])
        if idlePointer < 20 and idleArr[idlePointer] != 0xff00ff:
          idleArr[idlePointer-1] = 0xffffff
          idleArr[idlePointer] = 0xff00ff
          idlePointer += 1
        elif 0xffffff not in idleArr:
          idlePointer = 1
          idlePhase = 3
        else:
          idlePointer = 1
          idleArr[0] = 0xff00ff
        wait_ms(5)
      
      elif idlePhase == 3:
        neopixel_0.setColorFrom(2,21,idleColors[0])
        if idlePointer <= 20:
          neopixel_0.setColor(idlePointer+1,idleColors[idleColorPointer])
          neopixel_0.setColor(22-idlePointer,idleColors[idleColorPointer])
          idlePointer += 1
        else:
          idlePointer = 1
          idleLoopCount += 1
        if idlePointer == 11:
          idleColorPointer += 1
        if idleColorPointer >= 3:
          idleColorPointer = 1
        if idleLoopCount >= 10:
          idlePointer = 1
          idleArr[0] = 0xff00ff
          idlePhase = 0
        wait_ms(30)







