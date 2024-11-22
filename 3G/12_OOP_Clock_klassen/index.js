let clocks = []
let maxClocks = 9

function setup(){
    newBtn = createButton("Kilk mig!")
    newBtn.center()
    newBtn.position(this.position,windowHeight/4)
    newBtn.style("background-color:limegreen;color:black;border-color:black;")
    newBtn.mousePressed(() => {
        if(clocks.length < max(maxClocks)){
            div = createDiv()
            div.parent(select('#clocksDiv'))
            append(clocks, new Clock(div))
            clocks[clocks.length-1].start()
        }
    })
}