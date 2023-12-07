console.log("Wall.js loaded");

class Wall extends GameObject {
    constructor(context, x, y, width, height, rotation) {
        super(context, x, y, 0, 0, 10);
        this.width = width;
        this.height = height;
        this.rotation = rotation || 0;
    }

    draw() {
        this.context.save(); // Sauvegarde l'état actuel du contexte

        this.context.translate(this.x + this.width / 2, this.y + this.height / 2); // Place le point d'origine au centre du mur
        this.context.rotate(this.rotation); // Applique la rotation

        // Dessine le mur
        this.context.fillStyle = '#000';
        this.context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height); // Dessine le mur à partir du point d'origine

        this.context.restore(); // Restaure l'état précédent du contexte
    }
}
