console.log("canvaDimensions.js loaded");

// Récupération de la taille de l'écran avec un peu de marge
const canvasWidth = window.innerWidth - 30;
const canvasHeight = window.innerHeight - 30;

console.log(canvasWidth);
console.log(canvasHeight);

// Dimensionnement du canva en fonction de la taille de l'écran
const canvas = document.getElementById('canvasJeu');
console.log(canvas);
canvas.width = canvasWidth;
canvas.height = canvasHeight;