function drawGrid(context, gridSize, canvasWidth, canvasHeight) {
    context.beginPath();
    context.strokeStyle = '#DDD'; // Couleur de la grille
    
    // Lignes verticales
    for (let x = 0; x <= canvasWidth; x += gridSize) {
        context.moveTo(x, 0);
        context.lineTo(x, canvasHeight);
    }
    
    // Lignes horizontales
    for (let y = 0; y <= canvasHeight; y += gridSize) {
        context.moveTo(0, y);
        context.lineTo(canvasWidth, y);
    }

    context.stroke();
    context.closePath();
    
    // Ajouter les indications de coordonnées
    context.font = '10px Arial';
    context.fillStyle = '#000'; // Couleur des indications
    for (let x = 0; x <= canvasWidth; x += gridSize) {
        for (let y = 0; y <= canvasHeight; y += gridSize) {
            context.fillText(`(${x},${y})`, x + 5, y + 10);
        }
    }
}
