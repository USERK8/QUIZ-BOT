const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
    x: 50,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    speed: 5,
    jumpHeight: 15,
    velocityY: 0,
    jumping: false
};

let obstacles = [];
let score = 0;

function drawPlayer() {
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function createObstacle() {
    const obstacleWidth = 50;
    const obstacleHeight = Math.random() * (100 - 30) + 30;
    const obstacleX = canvas.width;
    const obstacleY = canvas.height - obstacleHeight;
    obstacles.push({ x: obstacleX, y: obstacleY, width: obstacleWidth, height: obstacleHeight });
}

function drawObstacles() {
    ctx.fillStyle = "green";
    obstacles.forEach((obstacle, index) => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        obstacle.x -= 5; // Move obstacles left
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(index, 1); // Remove off-screen obstacles
        }
    });
}

function handlePlayerMovement() {
    if (player.jumping) {
        player.velocityY += 1; // Gravity
        player.y += player.velocityY;

        if (player.y >= canvas.height - 100) {
            player.y = canvas.height - 100;
            player.jumping = false;
            player.velocityY = 0;
        }
    }
}

function jump() {
    if (!player.jumping) {
        player.jumping = true;
        player.velocityY = -player.jumpHeight;
    }
}

function detectCollisions() {
    obstacles.forEach(obstacle => {
        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            gameOver();
        }
    });
}

function gameOver() {
    alert("Game Over! Your score: " + score);
    obstacles = [];
    score = 0;
}

function updateScore() {
    score++;
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 20, 40);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawObstacles();
    handlePlayerMovement();
    detectCollisions();
    updateScore();

    if (Math.random() < 0.01) {
        createObstacle(); // Randomly create obstacles
    }

    requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
        jump();
    }
});

gameLoop();
