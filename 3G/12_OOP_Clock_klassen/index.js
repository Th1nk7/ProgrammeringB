let clocks = []
let alarms = []
let maxClocks = 9
let maxAlarms = 9
let alarmSound

function preload(){
    alarmSound = loadSound('https://cdn.pixabay.com/audio/2024/11/20/audio_659d575689.mp3')
}

function setup(){
    timePicker = createInput('00:00:00', 'time')
    timePicker.id('timePicker')
    timePicker.style("font-size: 20px")
    timePicker.center()
    timePicker.position(windowWidth/100*73.75,windowHeight/5)
    timePicker.attribute('step', 2)

    bgColor = createColorPicker('deeppink')
    bgColor.center()
    bgColor.position(windowWidth/100*19.5,windowHeight/7)
    
    txtColor = createColorPicker('black')
    txtColor.center()
    txtColor.position(windowWidth/100*24.1,windowHeight/7)
    
    typeSelect = createSelect()
    typeSelect.center()
    typeSelect.id('typeSelect')
    typeSelect.position(windowWidth/100*74.75,windowHeight/7)
    typeSelect.option('Ur')
    typeSelect.option('Alarm')
    typeSelect.selected('Ur')
    typeSelect.changed(() => timePicker.toggleClass('show'))
    
    newBtn = createButton("Kilk mig!")
    newBtn.center()
    newBtn.id('newBtn')
    newBtn.position(this.position,windowHeight/4)
    newBtn.style("background-color:limegreen;color:black;border-color:black;")
    newBtn.mousePressed(() => {
        if(typeSelect.selected() == "Ur" && clocks.length < max(maxClocks)) {
            append(clocks, new Clock('clock', bgColor.value(), txtColor.value()))
            clocks[clocks.length-1].start()
        }
        else if(typeSelect.selected() == "Alarm" && alarms.length < max(maxAlarms)) {
            append(alarms, new Clock('alarm', bgColor.value(), txtColor.value(), timePicker.value()))
            alarms[alarms.length-1].start()
        }
    })
}
