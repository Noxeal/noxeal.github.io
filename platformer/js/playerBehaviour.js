const labyrinth = document.getElementById('labyrinth');
const ball = document.getElementById('ball');

let rotation = 0;
let isRotating = false;
let rotationSpeed = 3; // Vitesse de rotation du labyrinthe

const cellSize = 80; // Taille d'une cellule du labyrinthe

function generateLabyrinth() {
    const width = 1200
    const height = 1200
    
    console.log(width, height);

    // Créer une grille remplie de murs
    const grid = [];
    for (let i = 0; i < height; i++) {
      grid.push([]);
      for (let j = 0; j < width; j++) {
        grid[i][j] = { top: true, right: true, bottom: true, left: true };
      }
    }
  
    // Appliquer l'algorithme de la division binaire
    divide(grid, 0, 0, width, height);
  
    // Afficher le labyrinthe dans le DOM
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        cell.style.position = 'absolute'; // Assure-toi que chaque cellule a une position absolue
  
        // Ajouter les classes des murs en fonction de la configuration de la grille
        if (grid[i][j].top) cell.classList.add('wall-top');
        if (grid[i][j].right) cell.classList.add('wall-right');
        if (grid[i][j].bottom) cell.classList.add('wall-bottom');
        if (grid[i][j].left) cell.classList.add('wall-left');
  
        cell.style.left = `${j * cellSize}px`;
        cell.style.top = `${i * cellSize}px`;
        labyrinth.appendChild(cell);
      }
    }
  }
  

// Fonction récursive pour diviser le labyrinthe
function divide(grid, x, y, width, height) {
  if (width < 2 || height < 2) return;

  const horizontal = Math.random() < 0.5;

  if (horizontal) {
    const wallY = Math.floor(Math.random() * (height - 1)) + y;
    const passageX = Math.floor(Math.random() * width) + x;

    for (let i = x; i < x + width; i++) {
      if (i !== passageX) {
        grid[wallY][i].bottom = false;
        grid[wallY + 1][i].top = false;
      }
    }

    divide(grid, x, y, width, wallY - y + 1);
    divide(grid, x, wallY + 1, width, height - (wallY - y + 1));
  } else {
    const wallX = Math.floor(Math.random() * (width - 1)) + x;
    const passageY = Math.floor(Math.random() * height) + y;

    for (let i = y; i < y + height; i++) {
      if (i !== passageY) {
        grid[i][wallX].right = false;
        grid[i][wallX + 1].left = false;
      }
    }

    divide(grid, x, y, wallX - x + 1, height);
    divide(grid, wallX + 1, y, width - (wallX - x + 1), height);
  }
}

// Écouteur d'événement pour le mouvement de la souris
document.addEventListener('mousemove', e => {
  if (isRotating) {
    const x = e.clientX - labyrinth.getBoundingClientRect().left;
    const y = e.clientY - labyrinth.getBoundingClientRect().top;
    const centerX = labyrinth.offsetWidth / 2;
    const centerY = labyrinth.offsetHeight / 2;

    const angleRad = Math.atan2(y - centerY, x - centerX);
    const angleDeg = angleRad * (180 / Math.PI);

    const newRotation = angleDeg - 90;
    labyrinth.style.transform = `rotate(${newRotation}deg)`;
    rotation = newRotation;
  }
});

// Démarrer la rotation lorsqu'on clique sur le labyrinthe
labyrinth.addEventListener('mousedown', () => {
  isRotating = true;
});

// Arrêter la rotation lorsque le clic est relâché
document.addEventListener('mouseup', () => {
  isRotating = false;
});


// Écouteur d'événement pour les touches du clavier
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
      rotateLabyrinth(-rotationSpeed);
    } else if (e.key === 'ArrowRight') {
      rotateLabyrinth(rotationSpeed);
    }
  });
  
  // Fonction pour faire tourner le labyrinthe
  function rotateLabyrinth(angle) {
    rotation += angle;
    labyrinth.style.transform = `rotate(${rotation}deg)`;
  }

// Boucle de jeu (rafraîchissement toutes les 16ms)
setInterval(() => {
  applyGravity();
  checkCollision();
}, 16);

// Génération du labyrinthe au chargement de la page
generateLabyrinth();

// Détection de collision avec les murs
function checkCollision() {
  const walls = document.querySelectorAll('.wall');
  const ballRect = ball.getBoundingClientRect();

  walls.forEach(wall => {
    const wallRect = wall.getBoundingClientRect();

    if (
      ballRect.bottom >= wallRect.top &&
      ballRect.top <= wallRect.bottom &&
      ballRect.right >= wallRect.left &&
      ballRect.left <= wallRect.right
    ) {
      // Collision détectée, gérer la réaction de la balle ici
      // Par exemple, arrêter le mouvement vers le bas
      ball.style.bottom = `${wallRect.top - ballRect.height}px`;
    }
  });
}

// Gestion de la gravité
function applyGravity() {
  const ballRect = ball.getBoundingClientRect();
  if (ballRect.bottom < labyrinth.getBoundingClientRect().bottom) {
    ball.style.bottom = `${ballRect.bottom + 5}px`; // Vitesse de descente de la balle
  }
}
