console.log("Polygon.js loaded");

class Polygon {
    constructor(points) {
        this.points = points; // Liste des points définissant le polygone
    }

    // Vérifier si un point est à l'intérieur du polygone
    pointInside(x, y) {
        let inside = false;
        for (let i = 0, j = this.points.length - 1; i < this.points.length; j = i++) {
            const xi = this.points[i].x, yi = this.points[i].y;
            const xj = this.points[j].x, yj = this.points[j].y;
            const intersect = ((yi > y) !== (yj > y)) &&
                (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }
}

// Usage:
// Créer un polygone avec une liste de points
const poly = new Polygon([
    { x: 100, y: 100 },
    { x: 200, y: 100 },
    { x: 200, y: 200 },
    { x: 100, y: 200 }
]);

// Vérifier si un point est à l'intérieur du polygone (par exemple, la balle)
const pointInside = poly.pointInside(150, 150);
console.log("Point inside polygon:", pointInside);
