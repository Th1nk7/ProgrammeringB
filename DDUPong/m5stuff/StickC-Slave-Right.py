from m5stack import *
from m5ui import *
from uiflow import *
from m5mqtt import M5mqtt
import time
from easyIO import *
import json

def fun_state_pong_(topic_data):
  global state, blockRightY
  if topic_data == "setup":
    state = "setup"
    blockRightY = 400
    readyRight = False
  elif topic_data == "game":
    state = "game"
  pass

def fun_shock_pong_(topic_data):
  # global params
  pass

state = "setup"
blockRightY = 400
pinUp = 0
pinDown = 26
readyRight = False
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
    if readyRight == False and digitalRead(pinDown) and digitalRead(pinUp):
      readyRight = True
      m5mqtt.publish('state_pong', 'readyRight', 0)
    elif readyRight == True and (not digitalRead(pinDown) or not digitalRead(pinUp)):
      readyRight = False
      m5mqtt.publish('state_pong', 'abortRight', 0)
  elif state == "game":
    if digitalRead(pinDown):
      blockRightY += blockSpeed
    if digitalRead(pinUp):
      blockRightY -= blockSpeed
    m5mqtt.publish('slave2master_pong', json.dumps({"blockRightY": blockRightY}))
  wait_ms(50)







