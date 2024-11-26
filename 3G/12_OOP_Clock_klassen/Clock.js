console.log('Clock is here')

//Når en klasses objekter kan opføre sig forskelligt afhængig af argumenter i contructoren 
//Kaldes det POLYMORFI
class Clock {
    //constructoren er klassens "setup" funktion, som kaldes når nye objekter fra klassen oprettes 
    constructor(type, bgColor, txtColor, alarmTime){
        this.alarmSound = alarmSound
        this.alarmTime = alarmTime
        this.sStart = second()
        this.type = type
        this.div = createDiv()
        this.div.parent(select( this.type == 'clock' ? '#clocksDiv' : '#alarmsDiv'))
        this.bgColor = bgColor
        this.txtColor = txtColor
        this.hDiv = createDiv()
        this.mDiv = createDiv()
        this.sDiv = createDiv()
        this.btnDiv = createDiv()
        this.div.child(this.hDiv)
        this.div.child(this.mDiv)
        this.div.child(this.sDiv)
        this.div.child(this.btnDiv)
        this.interval
        this.btn = createButton("Slet")
        this.btn.parent(this.btnDiv)
        this.btn.addClass('rmBtn')
        this.btnDiv.addClass('rmBtnDiv')
        this.btn.mousePressed(() => {
            this.stop()
            this.div.remove()
            clocks.pop(clocks[clocks.findIndex((ele) => ele == null)])
            alarms.pop(clocks[clocks.findIndex((ele) => ele == null)])
        })
        this.div.style(
            `
            width:24rem;
            height:7.5rem;
            border: 4px dotted color-mix(in srgb, gray 60%, ${this.txtColor} 40%);
            display:grid;
            grid-template-columns: 1fr 1fr 1fr;
            padding: 1rem;
            border-radius: 2rem;
            place-items:center;
            font-size:2.5rem;
            background:${this.bgColor};
            color:${this.txtColor}
            `
        )

        
    }
    start(){
        if (this.type == 'clock') {
            this.interval = setInterval( ()=>{
                this.hDiv.html( hour() < 10 ? '0' + hour() : hour() )
                this.mDiv.html( minute() < 10 ? '0' + minute() : minute() )
                this.sDiv.html( second() < 10 ? '0' + second() : second() )
            }, 1000)
        }
        else {
            this.interval = setInterval( () => {
                this.hDiv.html( this.alarmTime[0] + this.alarmTime[1])
                this.mDiv.html( this.alarmTime[3] + this.alarmTime[4])
                this.sDiv.html( this.alarmTime[6] + this.alarmTime[7])
                if(this.alarmTime[0] + this.alarmTime[1] == ( hour() < 10 ? '0' + hour() : hour() ) && this.alarmTime[3] + this.alarmTime[4] == ( minute() < 10 ? '0' + minute() : minute() ) && this.alarmTime[6] + this.alarmTime[7] == ( second() < 10 ? '0' + second() : second() )) {
                    this.stop()
                    this.alarmSound.play()
                }
            }, 500)
        }
    }
    stop(){
        clearInterval(this.interval)
        if(this.type == "alarm") {this.alarmSound.stop()}
    }
}