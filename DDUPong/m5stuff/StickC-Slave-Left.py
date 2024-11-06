from m5stack import *
from m5ui import *
from uiflow import *
from m5mqtt import M5mqtt
import time
from easyIO import *
import json

def fun_state_pong_(topic_data):
  global state, blockLeftY
  if topic_data == "setup":
    state = "setup"
    blockLeftY = 400
    readyLeft = False
  elif topic_data == "game":
    state = "game"
  pass

def fun_shock_pong_(topic_data):
  # global params
  pass

state = "setup"
blockLeftY = 400
pinUp = 0
pinDown = 26
readyLeft = False
blockSpeed = 5

setScreenColor(0x111111)
axp.setLcdBrightness(0)

m5mqtt = M5mqtt('', 'mqtt.nextservices.dk', 0, '', '', 300, ssl = True)
m5mqtt.subscribe('state_pong', fun_state_pong_)
m5mqtt.subscribe('shock_pong', fun_shock_pong_)
m5mqtt.start()
m5mqtt.publish('state_pong', 'setup', 0)

while True:
  if state == "setup":
    if readyLeft == False and digitalRead(pinDown) and digitalRead(pinUp):
      readyLeft = True
      m5mqtt.publish('state_pong', 'readyLeft', 0)
    elif readyLeft == True and (not digitalRead(pinDown) or not digitalRead(pinUp)):
      readyLeft = False
      m5mqtt.publish('state_pong', 'abortLeft', 0)
  elif state == "game":
    if digitalRead(pinDown):
      blockLeftY += blockSpeed
    if digitalRead(pinUp):
      blockLeftY -= blockSpeed
    m5mqtt.publish('slave2master_pong', json.dumps({"blockLeftY": blockLeftY}))
  wait_ms(50)







