let currentPage = 1
let pages
function setup(){
    console.log('P5.js er loadedd')
    pages = selectAll('.page')
}

function shiftPage(num){
    if(num == 'ArrowRight'){
        num = currentPage + 1
    }
    if(num == 'ArrowLeft'){
        num = currentPage - 1
    }
    if(isNaN(num) || num <= 0 || num > pages.length){
        return
    }
    select("#page"+currentPage).removeClass('visible')
    currentPage = num
    select("#page"+currentPage).addClass('visible')
}

function keyPressed(){
    shiftPage(key)
}