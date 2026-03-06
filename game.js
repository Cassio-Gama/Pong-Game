const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const paddleWidth = 10
const paddleHeight = 100

let player = {
x:20,
y:200,
score:0
}

let ai = {
x:770,
y:200,
score:0
}

let ball = {
x:400,
y:250,
vx:4,
vy:3,
size:10
}

let keys = {}

window.addEventListener("keydown",e=>{
keys[e.key] = true
})

window.addEventListener("keyup",e=>{
keys[e.key] = false
})

function resetBall(){

ball.x = 400
ball.y = 250

ball.vx *= -1
ball.vy = (Math.random()*4)-2

}

function drawRect(x,y,w,h){
ctx.fillStyle="white"
ctx.fillRect(x,y,w,h)
}

function drawBall(){

ctx.beginPath()
ctx.arc(ball.x,ball.y,ball.size,0,Math.PI*2)
ctx.fillStyle="white"
ctx.fill()

}

function drawNet(){

for(let i=0;i<canvas.height;i+=30){

ctx.fillRect(395,i,10,20)

}

}

function movePlayer(){

if(keys["w"]) player.y -= 6
if(keys["s"]) player.y += 6

}

function moveAI(){

let center = ai.y + paddleHeight/2

if(center < ball.y){
ai.y += 4
}
else{
ai.y -= 4
}

}

function updateBall(){

ball.x += ball.vx
ball.y += ball.vy

if(ball.y < 0 || ball.y > canvas.height){
ball.vy *= -1
}

if(
ball.x < player.x + paddleWidth &&
ball.y > player.y &&
ball.y < player.y + paddleHeight
){

ball.vx *= -1

}

if(
ball.x > ai.x &&
ball.y > ai.y &&
ball.y < ai.y + paddleHeight
){

ball.vx *= -1

}

if(ball.x < 0){

ai.score++
resetBall()

}

if(ball.x > canvas.width){

player.score++
resetBall()

}

}

function drawScore(){

ctx.font="40px Arial"
ctx.fillText(player.score,200,50)
ctx.fillText(ai.score,580,50)

}

function gameLoop(){

ctx.clearRect(0,0,canvas.width,canvas.height)

drawNet()

movePlayer()
moveAI()

updateBall()

drawRect(player.x,player.y,paddleWidth,paddleHeight)
drawRect(ai.x,ai.y,paddleWidth,paddleHeight)

drawBall()

drawScore()

requestAnimationFrame(gameLoop)

}

gameLoop()
