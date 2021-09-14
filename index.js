const gridEl = document.querySelector(".grid")

const startBtn = document.getElementById("start")
const scoreEl = document.getElementById("score")

let squareArr = []
let mySnake = [2,1,0]
let direction = 1
let width = 10
let appleIndex = 0
let score = 0
let timeInteral = 1000
let speed = .9
let timerId = 0

function createGrid(){

    for ( let i = 0; i < 100; i++){
        const square = document.createElement("div")
        gridEl.appendChild(square)
        square.classList.add("square")
        squareArr.push(square)
    }
    console.log(squareArr)
}

createGrid()

mySnake.forEach(i => squareArr[i].classList.add("snake"))

function startGame(){
    mySnake.forEach(i => squareArr[i].classList.remove("snake"))
    squareArr[appleIndex].classList.remove("apple")
    clearInterval(timerId)
    score = 0
    scoreEl.textContent = score
    direction = 1
    mySnake = [2,1,0]
    timeInteral = 1000

    generateApples()
    mySnake.forEach(i => squareArr[i].classList.add("snake"))
    timerId = setInterval(move, timeInteral)
}

startBtn.addEventListener("click", startGame)

function move(){

    if (
        (mySnake[0] + width >= width*width && direction === width) || 
        (mySnake[0] - width < 0 && direction === -width) || 
        (mySnake[0] % width === 0 && direction === -1) || 
        (mySnake[0] % width === width - 1 && direction === 1) || 
        squareArr[mySnake[0] + direction].classList.contains("snake") 
    )
        return clearInterval(timerId)

    const tail = mySnake.pop()
    squareArr[tail].classList.remove("snake")
    mySnake.unshift(mySnake[0] + direction)

    if (squareArr[mySnake[0]].classList.contains("apple") ) {
        squareArr[mySnake[0]].classList.remove("apple")       
        squareArr[tail].classList.add("snake")          
        mySnake.push(tail)                       
        generateApples()                                        
        score++
        scoreEl.textContent = score
        clearInterval(timerId)
        timeInteral = timeInteral * speed
        timerId = setInterval(move, timeInteral)
    }


    squareArr[mySnake[0]].classList.add("snake")
}

function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squareArr.length)
    } while (squareArr[appleIndex].classList.contains("snake"))
    squareArr[appleIndex].classList.add("apple")
}
generateApples()

function control(e) {
    if (e.keyCode === 39) {
        
        direction = 1
    } else if (e.keyCode === 38) {
        
        direction = -width
    } else if (e.keyCode === 37) {
        
        direction = -1
    } else if (e.keyCode === 40) {
        
        direction = +width
    }
}
document.addEventListener('keydown', control)
 
