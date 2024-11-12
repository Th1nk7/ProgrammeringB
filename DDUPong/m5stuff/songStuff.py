from m5stack import *
from m5ui import *
from uiflow import *


setScreenColor(0x000000)

speaker.setVolume(0.5)
notesList = [220,247,131,147,165,175,196,440,494,262,294,330,349,392,880,988,523,587,659,698,784,233,139,156,185,208,466,277,311,370,415,932,554,622,740,831]
# No dash = 20ms
# Dash = 166ms * dashes
notesSongE = [27,10,11,11,11,7,7,32,32,8,7,30,7,8,32,8,7]
waitsSongE = [166*5,166,166*3,166*3,166*3,166*3,166*3,166*3,166*5,166,166*15,166*3,166*3,166*15,166*5,166]

notesSongW = [12,16,8,16,8,16,8,16,30,12,12,30,16,32,30,32,33,16,32,16,32,16]
waitsSongW = [166*5,166,20,20,20,20,166,166,166*3,166*5,166,166,166,166*3,166*3,166*3,166*3,166,166,166,166]

notesSongM = [10,10,17,7,30,13,12,10,12,13,9,9,17,7,30,13,12,9,12,13]
waitsSongM = [20,20,166,166*2,166,166,166,20,20,20,20,20,166,166*2,166,166,166,20,20,20]

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
    speaker.sing(notesList[notesSongM[i]], 1/6)
    wait_ms(waitsSongM[i])

# CHECK OTHER DOC FOR NOTES
(11 | 52 | 11)
#Some other stuff
speaker.setVolume(0.5)
notesList = [220,247,131,147,165,175,196,440,494,262,294,330,349,392,880,988,523,587,659,698,784,233,139,156,185,208,466,277,311,370,415,932,554,622,740,831]

notesSongM = [10,10,17,7,30,13,12,10,12,13,9,9,17,7,30,13,12,9,12,13]
waitsSongM = [20,20,166,166*2,166,166,166,20,20,20,20,20,166,166*2,166,166,166,20,20,20]
  
notesSongE = [27,10,11,11,11,7,7,32,32,8,7,30,7,8,32,8,7]
waitsSongE = [166*5,166,166*3,166*3,166*3,166*3,166*3,166*3,166*5,166,166*15,166*3,166*3,166*15,166*5,166]

notesSongW = [12,16,8,16,8,16,8,16,30,12,12,30,16,32,30,32,33,16,32,16,32,16]
waitsSongW = [166*5,166,20,20,20,20,166,166,166*3,166*5,166,166,166,166*3,166*3,166*3,166*3,166,166,166,166]

notesSongEva = [2,23,5,23,5,5,21,25,6,5,6,6,21,9,5,23,21,6,21,21,9]
waitsSongEva = [166*3,166*3,166*2,166*2,166,166*3,166,166,20,166,166*4,166*3,166*3,166*2,166*2,166,166*3,166,166,166*2]

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

def playSongEva():
  for i in range(len(notesSongEva)):
    speaker.sing(notesList[notesSongEva[i]], 1/4)
    wait_ms(waitsSongEva[i])
