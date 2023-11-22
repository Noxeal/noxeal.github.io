// Récupère le canevas et son contexte
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;

// Récupère le sélecteur de couleur
const colorPicker = document.getElementById('colorPicker');
let selectedColor = colorPicker.value;

// Change la couleur sélectionnée
colorPicker.addEventListener('change', function () {
  selectedColor = colorPicker.value;
});

// Fonction pour commencer le dessin
function startDrawing(e) {
  isDrawing = true;
  draw(e);
}

// Fonction pour arrêter le dessin
function stopDrawing() {
  isDrawing = false;
  ctx.beginPath();
}

// Fonction pour dessiner
function draw(e) {
  if (!isDrawing) return;

  // Position du curseur
  const x = e.clientX - canvas.offsetLeft;
  const y = e.clientY - canvas.offsetTop;

  // Dessine un cercle (point) de la couleur sélectionnée
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.strokeStyle = selectedColor;
  ctx.beginPath();
  ctx.arc(x, y, 3, 0, Math.PI * 2);
  ctx.fillStyle = selectedColor;
  ctx.fill();
  ctx.stroke();
}


// Clear le canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }


// Ajoute un gestionnaire d'événements sur tout le document pour détecter le relâchement du clic de souris
document.addEventListener('mouseup', function() {
    isDrawing = false;
    ctx.beginPath();
  });
  
  // Rétablit le curseur par défaut et arrête le dessin si la souris quitte la fenêtre
  window.addEventListener('mouseleave', function() {
    isDrawing = false;
    ctx.beginPath();
    canvas.style.cursor = 'auto';
  });

// Fonction pour générer un dessin aléatoire avec des traits de couleurs aléatoires
function generateConfettis() {
    const width = canvas.width;
    const height = canvas.height;
  
    const maxColors = 3; // Nombre maximal de couleurs
    const linesToDraw = Math.floor((width + height) * 0.1); // 10% des lignes à dessiner
  
    const colors = [];
    for (let i = 0; i < maxColors; i++) {
      colors.push(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`);
    }
  
    for (let i = 0; i < linesToDraw; i++) {
      const x1 = Math.random() * width;
      const y1 = Math.random() * height;
      const x2 = x1 + Math.random() * 40 - 20; // Longueur maximale d'un trait : 40 pixels
      const y2 = y1 + Math.random() * 40 - 20;
  
      const randomColor = colors[Math.floor(Math.random() * maxColors)];
  
      ctx.strokeStyle = randomColor;
      ctx.lineWidth = Math.random() * 5; // Épaisseur du trait aléatoire
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }


// Fonction pour générer un dessin aléatoire avec des formes et motifs
function generateRandomDrawing() {
    const width = canvas.width;
    const height = canvas.height;
  
    const maxShapes = 8; // Nombre maximal de formes à dessiner
  
    for (let i = 0; i < maxShapes; i++) {
      const shapeType = Math.random();
  
      if (shapeType < 0.4) {
        // Crée un rectangle
        const x = Math.random() * width;
        const y = Math.random() * height;
        const rectWidth = Math.random() * 50 + 20;
        const rectHeight = Math.random() * 50 + 20;
  
        const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  
        ctx.fillStyle = randomColor;
        ctx.fillRect(x, y, rectWidth, rectHeight);
      } else if (shapeType < 0.8) {
        // Crée un cercle
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 30 + 10;
  
        const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  
        ctx.fillStyle = randomColor;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Crée une ligne diagonale
        const x1 = Math.random() * width;
        const y1 = Math.random() * height;
        const x2 = Math.random() * width;
        const y2 = Math.random() * height;
  
        const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  
        ctx.strokeStyle = randomColor;
        ctx.lineWidth = Math.random() * 5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    }
  }
  

  // Gère le clic sur le bouton pour générer un dessin aléatoire
const confettisButton = document.getElementById('confettisButton');
confettisButton.addEventListener('click', generateConfettis);

// Gère le clic sur le bouton pour générer un dessin aléatoire
const randomDrawingButton = document.getElementById('randomDrawingButton');
randomDrawingButton.addEventListener('click', generateRandomDrawing);
  
  // Événement du bouton clear
  var bouton_clear = document.getElementById('clear');
  bouton_clear.addEventListener('click', clearCanvas);
  
  // Événements de la souris
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mousemove', draw);