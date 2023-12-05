console.log("Wall.js loaded");

class Wall extends GameObject {
    constructor(context, x, y, width, height, thickness) {
        super(context, x, y, 0, 0, 10);
        this.width = width;
        this.height = height;
        this.thickness = thickness;
    }

    draw() {
        this.context.fillStyle = '#000'; // Couleur des murs
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
}
