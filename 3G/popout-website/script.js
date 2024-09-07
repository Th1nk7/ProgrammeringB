open = false
active = 0
function setup(){
    select('#sticky1').mouseClicked( () => shiftPage('1') )
    select('#sticky2').mouseClicked( () => shiftPage('2') )
    select('#sticky3').mouseClicked( () => shiftPage('3') )
    select('#sticky4').mouseClicked( () => shiftPage('4') )
    select('#sticky5').mouseClicked( () => shiftPage('5') )
    select('#sticky6').mouseClicked( () => shiftPage('6') )
    select('#closeBtn').mouseClicked( () => closeNote() )
}

function shiftPage(num){
    if (open == false) {
        select('#extended'+num).addClass("shown")
        select('#notePage'+num).addClass("shown")
        select('#sticky'+num).addClass("shown")
        setTimeout(() => {
        select('#vid'+num).play()
        }, 3500);
        active = num
        open = true
    }
}

function closeNote(){
    if (open == true){
        select('#extended'+active).removeClass("shown")
        select('#notePage'+active).removeClass("shown")
        select('#vid'+active).pause()
        setTimeout(() => {
            select('#sticky'+active).removeClass("shown")
        }, 4000);
        open = false
    }
}