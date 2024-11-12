from m5stack import *
from m5ui import *
from uiflow import *
from easyIO import *
import unit


setScreenColor(0x111111)
neopixel_0 = unit.get(unit.NEOPIXEL, unit.PORTA, 10)

p = [0, 1, 2, 3, 4]
l = 10
c = [0, 0, 0, 0, 0]
yellowFront = [0,1,2,3]
yellowBack = [10,9,8,7]
state = 0
bValue = 100
bDirection = 0

rgb = [0xFF0000,0x00FF00,0x0000FF]
neopixel_0.setBrightness(100)

while True:
  if digitalRead(26) and digitalRead(0):
    if state != 2:
      neopixel_0.setColorFrom(1,l,0x000000)
      state = 2
      
    neopixel_0.setColorFrom(1,l,0x00FF00)
    neopixel_0.setBrightness(bValue)
    
    if bDirection == 0:
      bValue -= 10
      
    else:
      bValue += 10
      
    if bValue > 150:
      bDirection = 0
      
    elif bValue < 15:
      bDirection = 1
      
    wait_ms(30)
    
  elif digitalRead(26) or digitalRead(0):
    
    if state != 1:
      neopixel_0.setColorFrom(1,l, 0x000000)
      state = 1
      neopixel_0.setBrightness(100)
      
    neopixel_0.setColor(yellowFront[0],0x000000)
    neopixel_0.setColor(yellowBack[0],0x000000)
    neopixel_0.setColor(yellowFront[1],0xFFFF00)
    neopixel_0.setColor(yellowFront[2],0xFFFF00)
    neopixel_0.setColor(yellowBack[1],0xFFFF00)
    neopixel_0.setColor(yellowBack[2],0xFFFF00)
    neopixel_0.setColor(yellowBack[3],0xFFFF00)
    neopixel_0.setColor(yellowFront[3],0xFFFF00)
    
    for i in range(len(yellowFront)):
      yellowFront[i] += 1
      yellowBack[i] -= 1
      
      if yellowFront[i] == l+1:
        yellowFront[i] = 1
        
      if yellowBack[i] == 0:
        yellowBack[i] = 10
        
  else:
    if state != 0:
      neopixel_0.setColorFrom(1,l, 0x000000)
      state = 0
      neopixel_0.setBrightness(100)
      
    neopixel_0.setColor(p[0],0x000000)
    neopixel_0.setColor(p[1],rgb[c[1]])
    neopixel_0.setColor(p[2],rgb[c[2]])
    neopixel_0.setColor(p[3],rgb[c[3]])
    neopixel_0.setColor(p[4],rgb[c[4]])
    
    for i in range(len(p)):
      p[i] += 1
      
      if p[i] == l+1:
        p[i] = 1
        c[i] += 1
        
        if c[i] == 3:
          c[i] = 0
        
  wait_ms(60)