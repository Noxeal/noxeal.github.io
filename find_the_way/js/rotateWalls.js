console.log("rotateWalls.js loaded");
console.log("gameWorld : " + gameWorld);

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        // Rotation vers la gauche (sens antihoraire)
        rotationAngle -= Math.PI / 36; // Modifier l'angle de rotation comme souhaité
        rotateWalls(rotationAngle); // Appliquer la rotation aux murs
    } else if (event.key === 'ArrowRight') {
        // Rotation vers la droite (sens horaire)
        rotationAngle += Math.PI / 36; // Modifier l'angle de rotation comme souhaité
        rotateWalls(rotationAngle); // Appliquer la rotation aux murs
    }
});

// Fonction pour appliquer la rotation aux murs
function rotateWalls(angle) {
    // Appliquer la transformation de rotation à tous les murs du canvas
    for (let i = 0; i < gameWorld.walls.length; i++) {
        gameWorld.walls[i].rotation = angle; // Modifier la propriété de rotation des murs (selon ta logique)
        // Autres opérations pour appliquer la rotation aux murs
    }
}