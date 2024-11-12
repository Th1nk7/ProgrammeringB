from m5stack import *
from m5ui import *
from uiflow import *
from easyIO import *
import unit


setScreenColor(0x111111)
neopixel_0 = unit.get(unit.NEOPIXEL, unit.PORTA, 21)

p = [0, 1, 2, 3]
l = 21
c = [0, 0, 0, 0]

speaker.setVolume(0.5)
notesList = [220,247,131,147,165,175,196,440,494,262,294,330,349,392,880,988,523,587,659,698,784,233,139,156,185,208,466,277,311,370,415,932,554,622,740,831]

neopixel_0.setBrightness(50)
rgb = [0x500000,0xFF0000,0x500000,0x005000,0x00FF00,0x005000,0x000050,0x0000FF,0x000050]

notesSongM = [10,10,17,7,30,13,12,10,12,13,9,9,17,7,30,13]
waitsSongM = [20,20,166,166*2,166,166,166,20,20,20,20,20,166,166*2,166]
  
notesSongE = [27,10,11,11,11,7,7,32,32,8,7,30,7,8,32,8,7]
waitsSongE = [166*5,166,166*3,166*3,166*3,166*3,166*3,166*3,166*5,166,166*15,166*3,166*3,166*15,166*5,166]

notesSongW = [12,16,8,16,8,16,8,16,30,12,12,30,16,32,30,32,33,16,32,16,32,16]
waitsSongW = [166*5,166,20,20,20,20,166,166,166*3,166*5,166,166,166,166*3,166*3,166*3,166*3,166,166,166,166]

def playSongE():
  for i in range(len(notesSongE)):
    speaker.sing(notesList[notesSongE[i]], 1/6)
    wait_ms(waitsSongE[i])

def playSongW():
  for i in range(len(notesSongW)):
    speaker.sing(notesList[notesSongW[i]], 1/8)
    wait_ms(waitsSongW[i]-(waitsSongW[i]//3))

def playSongM():
  for i in range(len(notesSongM)):
    speaker.sing(notesList[notesSongM[i]], 1/4)
    wait_ms(waitsSongM[i])

playSongM()

while True:
  if not digitalRead(26):
    neopixel_0.setColor(p[0],0x000000)
    neopixel_0.setColor(p[1],rgb[c[1]*3])
    neopixel_0.setColor(p[2],rgb[c[2]*3+1])
    neopixel_0.setColor(p[3],rgb[c[3]*3+2])
    for i in range(len(p)):
      p[i] += 1
      if p[i] == l+1:
        p[i] = 1
        c[i] += 1
        if c[i] == 3:
          c[i] = 0
  else:
    neopixel_0.setColorFrom(1, 10, 0x000000)
  wait_ms(40)