const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game variables
let player = { x: 100, y: 500, width: 40, height: 40, health: 100, score: 0 };
let bullets = [];
let explosions = [];
let enemies = [];

// Load images
const playerSprite = new Image();
playerSprite.src = "/assets/player.png";

const bulletSprite = new Image();
bulletSprite.src = "/assets/bullet.png";

const explosionSprite = new Image();
explosionSprite.src = "/assets/explosion.png";

const enemySprite = new Image();
enemySprite.src = "/assets/enemy.png"; // Use an enemy sprite image

// Movement
let keys = {};
document.addEventListener("keydown", (event) => {
  keys[event.key] = true;
});
document.addEventListener("keyup", (event) => {
  keys[event.key] = false;
});

function movePlayer() {
  if (keys["a"]) player.x -= 5;
  if (keys["d"]) player.x += 5;
  if (keys["w"]) player.y -= 5;
  if (keys["s"]) player.y += 5;
}

// Create enemy objects with random movement
function createEnemy() {
  const enemy = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    width: 40,
    height: 40,
    health: 50,
    dx: Math.random() * 2 - 1, // Random horizontal speed
    dy: Math.random() * 2 - 1, // Random vertical speed
  };
  enemies.push(enemy);
}

// Handle enemy movement
function moveEnemies() {
  enemies.forEach((enemy) => {
    enemy.x += enemy.dx;
    enemy.y += enemy.dy;

    // Keep enemies within canvas bounds
    if (enemy.x < 0 || enemy.x > canvas.width) enemy.dx = -enemy.dx;
    if (enemy.y < 0 || enemy.y > canvas.height) enemy.dy = -enemy.dy;
  });
}

// Shooting
function shootBullet() {
  bullets.push({ x: player.x + player.width / 2, y: player.y, dx: 10 });
}

// Handle bullet collision with enemies
function checkBulletCollisions() {
  bullets.forEach((bullet, bulletIndex) => {
    enemies.forEach((enemy, enemyIndex) => {
      if (
        bullet.x < enemy.x + enemy.width &&
        bullet.x + 10 > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + 10 > enemy.y
      ) {
        // Bullet hit the enemy
        enemy.health -= 25;
        bullets.splice(bulletIndex, 1); // Remove bullet
        createExplosion(enemy.x, enemy.y); // Explosion on hit

        if (enemy.health <= 0) {
          enemies.splice(enemyIndex, 1); // Remove enemy if dead
          player.score += 10; // Increase score
        }
      }
    });
  });
}

// Explosion effects
function createExplosion(x, y) {
  explosions.push({ x, y, timer: 10 });
}

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player movement
  movePlayer();

  // Draw player
  ctx.drawImage(playerSprite, player.x, player.y, player.width, player.height);

  // Handle bullets
  bullets.forEach((bullet, index) => {
    bullet.x += bullet.dx;
    ctx.drawImage(bulletSprite, bullet.x, bullet.y, 10, 10);
    if (bullet.x > canvas.width) {
      bullets.splice(index, 1); // Remove bullet if it goes off-screen
    }
  });

  // Handle explosions
  explosions.forEach((explosion, index) => {
    ctx.drawImage(explosionSprite, explosion.x, explosion.y, 50, 50);
    explosion.timer--;
    if (explosion.timer <= 0) explosions.splice(index, 1);
  });

  // Move and draw enemies
  moveEnemies();
  enemies.forEach((enemy) => {
    ctx.drawImage(enemySprite, enemy.x, enemy.y, enemy.width, enemy.height);
  });

  // Check for bullet collisions with enemies
  checkBulletCollisions();

  // Draw HUD
  document.getElementById("health").textContent = player.health;
  document.getElementById("score").textContent = player.score;

  requestAnimationFrame(gameLoop);
}
// Shooting event listener
document.addEventListener("keydown", (event) => {
  if (event.key === " ") shootBullet(); // Space to shoot
});

// Simulate explosions for bullet impacts
setInterval(() => {
  bullets.forEach((bullet, index) => {
    if (bullet.x >= canvas.width) {
      createExplosion(bullet.x, bullet.y);
      bullets.splice(index, 1);
    }
  });
}, 50);

// Create initial set of enemies at random positions
setInterval(createEnemy, 2000); // Create an enemy every 2 seconds

gameLoop();
