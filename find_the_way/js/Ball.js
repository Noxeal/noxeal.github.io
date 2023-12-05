console.log("Ball.js loaded");

const g = 9.81;

class Ball extends GameObject {

    constructor(context, x, y, vx, vy, mass, radius) {
        super(context, x, y, vx, vy, mass);
        this.radius = radius || 50; // Définis un rayon par défaut si aucun n'est spécifié
    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.context.fillStyle = this.isColliding ? '#ff8080' : '#0099b0';
        this.context.fill();
        this.context.closePath();
        // Draw heading vector
        this.context.beginPath();
        this.context.moveTo(this.x, this.y);
        this.context.lineTo(this.x + this.vx, this.y + this.vy);
        this.context.stroke();
    }

    update(secondsPassed) {
        // Apply acceleration
        this.vy += g * secondsPassed;

        // Move with set velocity
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;

        // console.log("Ball x: " + this.x + " y: " + this.y + " vx: " + this.vx + " vy: " + this.vy);

    }
}
