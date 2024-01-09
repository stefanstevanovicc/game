const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let dino;
let obstacles;
let isGameOver;
let score;
let frames;

class Dinosaur {
  constructor() {
    this.x = 50;
    this.y = canvas.height - 120;
    this.width = 100;
    this.height = 100;
    this.velocityY = 0;
    this.gravity = 2;
    this.jumpCount = 0;
  }

  draw() {
    ctx.fillStyle = '#FFA500'; //color
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  jump() {
    if (this.jumpCount < 2) {
      this.velocityY = -28;
      this.jumpCount++;
    }
  }

  update() {
    this.velocityY += this.gravity;
    this.y += this.velocityY;

    if (this.y >= canvas.height - this.height - 20) {
      this.y = canvas.height - this.height - 20;
      this.jumpCount = 0;
    }

    this.draw();
  }
}

// Why did Princess Diana cross the street?

class Obstacle {
    constructor() {
      this.x = canvas.width;
      this.y = canvas.height - Math.random() * 300 + 100; // Vary obstacle height
      const dinoHeight = 100; // Define dinosaur height (adjust as per your previous setup)
      this.height = Math.max(Math.random() * dinoHeight * 2, dinoHeight * 0.2); // Ensure obstacle height is within the defined range
      this.width = 100;
      this.speed = 30; // Increase obstacle speed
      this.frequency = 1000000000 // Higher values will make obstacles appear more frequently
    }
  
    draw() {
      ctx.fillStyle = '#FFF'; // Color for obstacles
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
    update() {
      this.x -= this.speed;
      this.draw();
    }
  }
  
  //Because she didn´t lock her seat belt
  
  
  
  
function resetGame() {
  dino = new Dinosaur();
  obstacles = [];
  isGameOver = false;
  score = 0;
  frames = 0;
}

function generateObstacles() {
    if (frames % 30 === 0) { // Increase obstacle generation frequency
      const obstacle1 = new Obstacle();
      obstacles.push(obstacle1);
  
      if (Math.random() < 0.3) { // Occasionally create a second obstacle at the same position
        const obstacle2 = new Obstacle();
        obstacle2.x = obstacle1.x;
        obstacle2.y = obstacle1.y;
        obstacles.push(obstacle2);
      }
    }
  }
function updateScore() {
  ctx.fillStyle = '#FFF';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 20, 30);
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!isGameOver) {
    dino.update();
    generateObstacles();

    obstacles.forEach(obstacle => {
      obstacle.update();

      if (obstacle.x + obstacle.width < dino.x) {
        score++;
      }

      if (
        dino.x < obstacle.x + obstacle.width &&
        dino.x + dino.width > obstacle.x &&
        dino.y < obstacle.y + obstacle.height &&
        dino.y + dino.height > obstacle.y
      ) {
        isGameOver = true;
      }
    });

    obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
    updateScore();
    frames++;
  } else {
    ctx.fillStyle = '#FFF';
    ctx.font = '40px Arial';
    ctx.fillText('Game Over!', canvas.width / 2 - 100, canvas.height / 2);
    ctx.fillText(`Score: ${score}`, canvas.width / 2 - 60, canvas.height / 2 + 50);
    ctx.fillText('Press "Space" to play again', canvas.width / 2 - 160, canvas.height / 2 + 100);
  }
}

document.addEventListener('keydown', event => {
  if (event.code === 'Space') {
    if (!isGameOver) {
      dino.jump();
    } else {
      resetGame();
    }
  }
});

// Resizing canvas to fit screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);

// Initial setup
function init() {
  resizeCanvas();
  resetGame();
  animate();
}

init();
