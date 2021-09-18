const gridEl = document.querySelector(".grid")

const startBtn = document.getElementById("start")
const restartBtn = document.getElementById("restart")
const pauseBtn = document.getElementById("pause")
const resumeBtn = document.getElementById("resume")
const scoreEl = document.getElementById("score")

let squareArr = []
let mySnake = [2,1,0]
let direction = 1
let width = 35
let appleIndex = 0
let score = 0
let timeInteral = 1000
let speed = .9
let timerId = 0

function createGrid(){

    for ( let i = 0; i < width*width; i++){
        const square = document.createElement("div")
        gridEl.appendChild(square)
        square.classList.add("square")
        squareArr.push(square)
    }
}

createGrid()

mySnake.forEach(index => squareArr[index].classList.add("snake"))

function startGame(){
    mySnake.forEach(index => squareArr[index].classList.remove("snake"))
    squareArr[appleIndex].classList.remove("apple")
    clearInterval(timerId)
    score = 0
    scoreEl.textContent = score
    direction = 1
    mySnake = [2,1,0]
    timeInteral = 1000

    generateApples()
    mySnake.forEach(index => squareArr[index].classList.add("snake"))
    timerId = setInterval(move, timeInteral)
    restartBtn.style.display = "block"
    pauseBtn.style.display = "block"
    startBtn.style.display = "none"
}

function pauseGame(){
    clearInterval(timerId)
    resumeBtn.style.display = "block"
    pauseBtn.style.display = "none"
}

function resumeGame(){
    timerId = setInterval(move, timeInteral)
    resumeBtn.style.display = "none"
    pauseBtn.style.display = "block"
}
startBtn.addEventListener("click", startGame)
restartBtn.addEventListener("click", startGame)
pauseBtn.addEventListener("click", pauseGame)
resumeBtn.addEventListener("click", resumeGame)

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
 
