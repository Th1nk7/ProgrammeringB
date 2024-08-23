let currentPage = 1
let pages
function setup(){
    console.log('P5.js er loadedd')
    pages = selectAll('.page')
    select('#item1').mouseClicked( () => shiftPage('1') )
    select('#item2').mouseClicked( () => shiftPage('2') )
    select('#item3').mouseClicked( () => shiftPage('3') )
    select('#item4').mouseClicked( () => shiftPage('4') )
}

function shiftPage(num){
    /*
    if(num == 'ArrowRight'){
        num = currentPage + 1
    }
    if(num == 'ArrowLeft'){
        num = currentPage - 1
    }
    if(isNaN(num) || num <= 0 || num > pages.length){
        return
    }
    */
    select("#page"+currentPage).removeClass('visible')
    currentPage = num
    select("#page"+currentPage).addClass('visible')
}
/*
function keyPressed(){
    shiftPage(key)
}
*/