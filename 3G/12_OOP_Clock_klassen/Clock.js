console.log('Clock is here')

//Når en klasses objekter kan opføre sig forskelligt afhængig af argumenter i contructoren 
//Kaldes det POLYMORFI
class Clock {
    //constructoren er klassens "setup" funktion, som kaldes når nye objekter fra klassen oprettes 
    constructor(div, style){
        this.div = div
        this.style = style
        //div's for hours, minutes, seconds
        this.hDiv = createDiv()
        this.mDiv = createDiv()
        this.sDiv = createDiv()
        this.div.child(this.hDiv)
        this.div.child(this.mDiv)
        this.div.child(this.sDiv)
        //interval til at sætte tiden ind 
        this.interval
        //styles 
        this.div.style(
            `
            width:24rem;
            height:7.5rem;
            border: 4px dotted gray;
            display:grid;
            grid-template-columns: 1fr 1fr 1fr;
            padding: 1rem;
            border-radius: 2rem;
            place-items:center;
            font-size:2.5rem;
            `
        )

        //reager på argumentet style fra constructoren
         switch(style){
            case 'pink': 
                this.div.style('background', 'hotpink')
                break
            case 'black':
                this.div.style('background', 'black')
                this.div.style('color', 'white')
                break
            default:
                this.div.style('background', 'rgba(0,0,0,0)')
         }

        
    }
    start(){
        this.interval = setInterval( ()=>{
            //den her komapkte linje kode, betyder at vi SPØRGER om hour() funktionen returnerer 
            //et tal UNDER ti - hvis ja, sætter vi et nul foran 
            this.hDiv.html( hour() < 10 ? '0' + hour() : hour() )
            this.mDiv.html( minute() < 10 ? '0' + minute() : minute() )
            this.sDiv.html( second() < 10 ? '0' + second() : second() )
        }, 1000)
    }
    stop(){
        clearInterval(this.interval)
    }
}