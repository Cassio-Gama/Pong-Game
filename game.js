const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const paddleWidth = 10
const paddleHeight = 100

let player1 = { x: 20, y: 200, score: 0 }
let player2 = { x: 770, y: 200, score: 0 }

let ball = { x: 400, y: 250, vx: 4, vy: 3, size: 10 }

let keys = {}

window.addEventListener("keydown", e => {
    keys[e.key] = true
})

window.addEventListener("keyup", e => {
    keys[e.key] = false
})

function resetBall() {
    ball.x = 400
    ball.y = 250
    ball.vx *= -1
    ball.vy = (Math.random() * 4) - 2
}

function drawRect(x, y, w, h) {
    ctx.fillStyle = "white"
    ctx.fillRect(x, y, w, h)
}

function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
    ctx.fillStyle = "white"
    ctx.fill()
}

function drawNet() {
    for (let i = 0; i < canvas.height; i += 30) {
        ctx.fillRect(395, i, 10, 20)
    }
}

function movePlayers() {

    if (keys["w"]) player1.y -= 6
    if (keys["s"]) player1.y += 6

    if (keys["ArrowUp"]) player2.y -= 6
    if (keys["ArrowDown"]) player2.y += 6

}

function updateBall() {

    ball.x += ball.vx
    ball.y += ball.vy

    if (ball.y < 0 || ball.y > canvas.height) {
        ball.vy *= -1
    }

    if (
        ball.x < player1.x + paddleWidth &&
        ball.y > player1.y &&
        ball.y < player1.y + paddleHeight
    ) {
        ball.vx *= -1
    }

    if (
        ball.x > player2.x &&
        ball.y > player2.y &&
        ball.y < player2.y + paddleHeight
    ) {
        ball.vx *= -1
    }

    if (ball.x < 0) {
        player2.score++
        resetBall()
    }

    if (ball.x > canvas.width) {
        player1.score++
        resetBall()
    }

}

function drawScore() {

    ctx.font = "40px Arial"
    ctx.fillStyle = "white"

    ctx.fillText(player1.score, 200, 50)
    ctx.fillText(player2.score, 580, 50)

}

function gameLoop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawNet()

    movePlayers()

    updateBall()

    drawRect(player1.x, player1.y, paddleWidth, paddleHeight)
    drawRect(player2.x, player2.y, paddleWidth, paddleHeight)

    drawBall()

    drawScore()

    requestAnimationFrame(gameLoop)

}

gameLoop()
