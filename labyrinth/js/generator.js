const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startPoint = document.getElementById('startPoint');
const endPoint = document.getElementById('endPoint');
const obstaclesCount = 10; // Nombre d'obstacles à générer
const obstacles = [];

// Génération aléatoire des obstacles
for (let i = 0; i < obstaclesCount; i++) {
    const obstacle = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      width: Math.random() * 50 + 20, // Largeur aléatoire entre 20 et 70
      height: Math.random() * 50 + 20, // Hauteur aléatoire entre 20 et 70
    };
    obstacles.push(obstacle);
  }
  
  // Positionnement des points de départ et d'arrivée
  startPoint.style.left = '10px';
  startPoint.style.top = (canvas.height / 2 - 10) + 'px';
  
  endPoint.style.left = (canvas.width - 30) + 'px';
  endPoint.style.top = (canvas.height / 2 - 10) + 'px';
  
  // Dessin des obstacles
  function drawObstacles() {
    obstacles.forEach(obstacle => {
      ctx.fillStyle = 'black';
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
  }
  
  drawObstacles();


let isDrawing = false;
let path = [];

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', drawPath);
canvas.addEventListener('mouseup', endDrawing);

function startDrawing(event) {
  isDrawing = true;
  path = [];
  const { offsetX, offsetY } = event;
  path.push({ x: offsetX, y: offsetY });
}

function drawPath(event) {
  if (isDrawing) {
    const { offsetX, offsetY } = event;
    path.push({ x: offsetX, y: offsetY });
    drawLine();
  }
}

function endDrawing() {
  isDrawing = false;
  moveBall();
}

function drawLine() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(path[0].x, path[0].y);
  // Épaisseur de la ligne
  ctx.lineWidth = 100;
  for (let i = 1; i < path.length; i++) {
    ctx.lineTo(path[i].x, path[i].y);
  }
  ctx.stroke();
}


const speedSlider = document.getElementById('speedSlider');
let speed = parseInt(speedSlider.value);

speedSlider.addEventListener('input', () => {
  speed = parseInt(speedSlider.value);
});

function moveBall() {
  let progress = 0; // Pour suivre la progression le long du segment
  let currentIndex = 0;

  function animate() {
    if (currentIndex < path.length - 1) {
      const startX = path[currentIndex].x;
      const startY = path[currentIndex].y;
      const endX = path[currentIndex + 1].x;
      const endY = path[currentIndex + 1].y;

      const dx = endX - startX;
      const dy = endY - startY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const ratio = progress / distance;

      if (progress <= distance) {
        const x = startX + dx * ratio;
        const y = startY + dy * ratio;

        ball.style.left = x + 'px';
        ball.style.top = y + 'px';

        console.log(`Balle en position (${x}, ${y}) sur le segment ${currentIndex + 1} sur ${path.length - 1}`);

        progress += speed;
      } else {
        progress = 0;
        currentIndex++;
      }

      requestAnimationFrame(animate);
    } else {
      console.log('Animation terminée.');
    }
  }

  console.log('Début de l\'animation...');
  animate();
}

moveBall();