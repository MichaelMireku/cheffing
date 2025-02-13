// Retro FPS using Three.js

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gameCanvas") });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Pointer Lock Controls for FPS
const controls = new THREE.PointerLockControls(camera, document.body);
document.addEventListener("click", () => controls.lock());

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Ground with pixelated texture
const groundTexture = new THREE.TextureLoader().load("textures/ground.png");
groundTexture.magFilter = THREE.NearestFilter; // Pixelated effect
const groundMaterial = new THREE.MeshStandardMaterial({ map: groundTexture });

const ground = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Player Settings
camera.position.set(0, 2, 5);
let velocity = new THREE.Vector3();
const speed = 0.1;

// Movement Keys
const keys = {};
document.addEventListener("keydown", (event) => (keys[event.code] = true));
document.addEventListener("keyup", (event) => (keys[event.code] = false));

// Shooting Mechanic
let ammo = 10;
document.addEventListener("mousedown", shoot);

function shoot() {
    if (ammo <= 0) return;
    ammo--;
    document.getElementById("ammo").innerText = "Ammo: " + ammo;

    const bullet = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    bullet.position.copy(camera.position);
    bullet.velocity = new THREE.Vector3(
        -Math.sin(camera.rotation.y),
        0,
        -Math.cos(camera.rotation.y)
    ).multiplyScalar(0.5);

    scene.add(bullet);
    bullets.push(bullet);
}

// Enemy AI
const enemies = [];
for (let i = 0; i < 3; i++) {
    const enemyTexture = new THREE.TextureLoader().load("textures/enemy.png");
    enemyTexture.magFilter = THREE.NearestFilter;

    const enemyMaterial = new THREE.MeshStandardMaterial({ map: enemyTexture });
    const enemy = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), enemyMaterial);
    enemy.position.set(Math.random() * 20 - 10, 1, Math.random() * 20 - 10);
    scene.add(enemy);
    enemies.push(enemy);
}

// Player Health
let health = 100;

// Game Loop
const bullets = [];
function animate() {
    requestAnimationFrame(animate);

    // Movement
    if (keys["KeyS"]) velocity.z -= speed;
    if (keys["KeyW"]) velocity.z += speed;
    if (keys["KeyA"]) velocity.x -= speed;
    if (keys["KeyD"]) velocity.x += speed;

    controls.moveRight(velocity.x);
    controls.moveForward(velocity.z);

    velocity.x *= 0.9;
    velocity.z *= 0.9;

    // Enemy AI Movement
    enemies.forEach((enemy) => {
        const direction = new THREE.Vector3();
        direction.subVectors(camera.position, enemy.position).normalize();
        enemy.position.addScaledVector(direction, 0.02);
        
        // Damage Player if Close
        if (enemy.position.distanceTo(camera.position) < 1) {
            health -= 1;
            document.getElementById("health").innerText = "Health: " + health;
            if (health <= 0) alert("Game Over");
        }
    });

    // Bullet Movement
    bullets.forEach((bullet, index) => {
        bullet.position.add(bullet.velocity);
        if (bullet.position.length() > 50) {
            scene.remove(bullet);
            bullets.splice(index, 1);
        }

        // Check for enemy hit
        enemies.forEach((enemy, enemyIndex) => {
            if (bullet.position.distanceTo(enemy.position) < 1) {
                scene.remove(enemy);
                enemies.splice(enemyIndex, 1);
            }
        });
    });

    renderer.render(scene, camera);
}
animate();