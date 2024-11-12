from m5stack import *
from m5ui import *
from uiflow import *
from m5mqtt import M5mqtt
import time
from easyIO import *
import json
import unit
import wifiCfg
import ntptime
import random

def fun_random_pong_(topic_data):
  if random.randint(0,1) == 1:
    relay_0.on()
    wait_ms(150)
    relay_0.off()
  pass

def fun_timestamp_pong_(topic_data):
  if target == True:
    while str(ntp.getTimestamp()) != topic_data:
      wait_ms(5)
      pass
    wait_ms(50)
    relay_0.on()
    wait_ms(150)
    relay_0.off()
    wait_ms(300)
    relay_0.on()
    wait_ms(150)
    relay_0.off()
    wait_ms(350)
    relay_0.on()
    wait_ms(150)
    relay_0.off()
  pass

def fun_state_pong_(topic_data):
  global state, blockRightY, target
  if topic_data == "setup":
    state = "setup"
    blockRightY = 400
    readyRight = False
  elif topic_data == "game":
    state = "game"
  elif topic_data == "targetLeft":
    target = False
  elif topic_data == "targetRight":
    target = True
  if topic_data == "shock1" and target == True:
    relay_0.on()
    wait_ms(75)
    relay_0.off()
  elif topic_data == "shock2" and target == True:
    relay_0.on()
    wait_ms(150)
    relay_0.off()
  pass

speaker.setVolume(6)
notesList = [220,247,131,147,165,175,196,440,494,262,294,330,349,392,880,988,523,587,659,698,784,233,139,156,185,208,466,277,311,370,415,932,554,622,740,831]
notesSongM = [10,10,17,7,30,13,12,10,12,13,9,9,17,7,30,13,12,9,12,13]
waitsSongM = [20,20,166,166*2,166,166,166,20,20,20,20,20,166,166*2,166,166,166,20,20,20]

def playSongM():
  for i in range(len(notesSongM)):
    speaker.sing(notesList[notesSongM[i]], 1/4)
    wait_ms(waitsSongM[i])
 
target = False
ntp = ntptime.client(host='dk.pool.ntp.org', timezone=8)
relay_0 = unit.get(unit.RELAY, unit.PORTA)
relay_0.off()
shouldPublish = False
state = "setup"
blockRightY = 400
pinUp = 0
pinDown = 26
readyRight = False
blockSpeed = 8
setScreenColor(0x111111)
axp.setLcdBrightness(0)
playSongM()
wifiCfg.doConnect('Next-Guest', '')
while not (wifiCfg.wlan_sta.isconnected()):
  pass

m5mqtt = M5mqtt('', 'mqtt.nextservices.dk', 0, '', '', 300, ssl = True)
m5mqtt.subscribe('timestamp_pong', fun_timestamp_pong_)
m5mqtt.subscribe('state_pong', fun_state_pong_)
m5mqtt.subscribe('random_pong', fun_random_pong_)
m5mqtt.start()

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
      blockRightY = min(blockRightY + blockSpeed, 750)
      shouldPublish = True
    if digitalRead(pinUp):
      blockRightY = max(blockRightY - blockSpeed, 50)
      shouldPublish = True
    if shouldPublish:
      m5mqtt.publish('blockRightY_pong', blockRightY, 0)
      shouldPublish = False
  wait_ms(30)








