console.log("GameWorld.js loaded");

// Set a restitution, a lower value will lose more energy when colliding
var restitution = 0.9;

// Set a friction, a lower value will slow down the object faster
var friction = 0;

// Set the mass of the ball
var generalMass = 400;

// Set the rotation of the walls
var rotationAngle = 0;

var audio = new Audio('audio/BounceSoundv2.mp3');
// var audio = new Audio('audio/rien.mp3');

class GameWorld {

    constructor(canvasId){
        this.canvas = null;
        this.context = null;
        this.secondsPassed = 0;
        this.oldTimeStamp = 0;
        this.gameObjects = [];
        this.resetCounter = 0;

        this.init(canvasId);
    }

    init(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');

        this.createWorld();

        // Request an animation frame for the first time
        // The gameLoop() function will be called as a callback of this request
        window.requestAnimationFrame((timeStamp) => {this.gameLoop(timeStamp)});
    }

    createWorld() {
        this.gameObjects = [
            // new Ball(this.context, 100, 50, 100, 100, 400),
            new Ball (this.context, canvasWidth / 2 + 300, 0, 1000, 0, generalMass, 20),
        ];
        // // Génération de balles de taille, vitesse et masse aléatoire
        // for (let i = 0; i < 10; i++) {
        //     this.gameObjects[i] = new Ball(this.context, Math.random() * canvasWidth, Math.random() * canvasHeight, Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 50 + 20, Math.random() * 50 + 20)
        // }

        // this.gameObjects[10] = new Ball(this.context, 100, 50, 100, 100, 0);
        // this.gameObjects[11] = new Square(this.context, 100, 50, 100, 100, 0);

        // console.log(this.gameObjects);

        this.walls = [
            // new Wall(this.context, 0, 0, 10, this.canvas.height, 100, 100),
            // new Wall(this.context, 0, 0, this.canvas.width, 10, 100, 100),
            // new Wall(this.context, this.canvas.width - 10, 0, 10, this.canvas.height, 100, 100),
            // new Wall(this.context, 0, this.canvas.height - 10, this.canvas.width, 10, 100, 100),

            // // Murs 
            // new Wall(this.context, 100, 100, 10, 600, 100, 100),
            // new Wall(this.context, 100, 100, 600, 10, 100, 100),
            // new Wall(this.context, 100, 700, 600, 10, 100, 100),
            // new Wall(this.context, 700, 100, 10, 600, 100, 100),

            // Mur horizontal au milieu
            new Wall(this.context, 0, 0, canvasWidth / 3, canvasHeight / 3),

            // Mur horizontal au milieu
            new Wall(this.context, 0, canvasHeight / 2, canvasWidth, 20),

            // Voir pour murs penchés
            
        ];

    }

    gameLoop(timeStamp) {
        // Calculate how much time has passed
        this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = timeStamp;

        // Loop over all game objects to update
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update(this.secondsPassed);
        }

        this.detectCollisions();

        this.detectEdgeCollisions();

        this.detectCollisionsWithWalls();

        updateSliders();

        this.clearCanvas();

        // Loop over all game objects to draw
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw();
        }

        // Loop over all walls to draw
        for (let i = 0; i < this.walls.length; i++) {
            this.walls[i].draw();
        }

        // The loop function has reached it's end
        // Keep requesting new frames
        window.requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
    }

    detectCollisions() {
        let obj1;
        let obj2;

        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].isColliding = false;
        }

        for (let i = 0; i < this.gameObjects.length; i++)
        {
            obj1 = this.gameObjects[i];
            for (let j = i + 1; j < this.gameObjects.length; j++)
            {
                obj2 = this.gameObjects[j];

                if (this.circleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)) {

                    audio.play();

                    obj1.isColliding = true;
                    obj2.isColliding = true;

                    let vCollision = {x: obj2.x - obj1.x, y: obj2.y - obj1.y};
                    let distance = Math.sqrt((obj2.x-obj1.x)*(obj2.x-obj1.x) + (obj2.y-obj1.y)*(obj2.y-obj1.y));
                    let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
                    let vRelativeVelocity = {x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy};

                    let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

                    // speed *= Math.min(obj1.restitution, obj2.restitution);

                    if (speed < 0) {
                        break;
                    }

                    let impulse = 2 * speed / (obj1.mass + obj2.mass);
                    obj1.vx -= (impulse * obj2.mass * vCollisionNorm.x);
                    obj1.vy -= (impulse * obj2.mass * vCollisionNorm.y);
                    obj2.vx += (impulse * obj1.mass * vCollisionNorm.x);
                    obj2.vy += (impulse * obj1.mass * vCollisionNorm.y);
                }
            }
        }
    }

    rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {

        // Check x and y for overlap
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
            return false;
        }

        return true;
    }

    circleIntersect(x1, y1, r1, x2, y2, r2) {
        // Calculate the distance between the two circles
        let squareDistance = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);

        // When the distance is smaller or equal to the sum
        // of the two radius, the circles touch or overlap
        return squareDistance <= ((r1 + r2) * (r1 + r2));
    }

    circleIntersectRect(circleX, circleY, circleRadius, rectX, rectY, rectWidth, rectHeight) {
            
            // Temporary variables to set edges for testing
            let testX = circleX;
            let testY = circleY;
    
            // Which edge is closest?
            if (circleX < rectX)         testX = rectX;      // test left edge
            else if (circleX > rectX+rectWidth) testX = rectX+rectWidth;   // right edge
            if (circleY < rectY)         testY = rectY;      // top edge
            else if (circleY > rectY+rectHeight) testY = rectY+rectHeight;   // bottom edge
    
            // Get distance from closest edges
            let distX = circleX-testX;
            let distY = circleY-testY;
            let distance = Math.sqrt( (distX*distX) + (distY*distY) );
    
            // If the distance is less than the radius, collision!
            if (distance <= circleRadius) {
                console.log("Collision !");
                return true;
            }
            return false;
        }

    clearCanvas() {
        // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    detectEdgeCollisions(){

        let obj;
        for (let i = 0; i < this.gameObjects.length; i++)
        {
            obj = this.gameObjects[i];

            // Check for left and right
            if (obj.x < obj.radius){
                obj.vx = Math.abs(obj.vx) * restitution;
                obj.x = obj.radius;
                // audio.play();

            }else if (obj.x > canvasWidth - obj.radius){
                obj.vx = -Math.abs(obj.vx) * restitution;
                obj.x = canvasWidth - obj.radius;
                // audio.play();

            }

            // Check for bottom and top
            if (obj.y < obj.radius){
                obj.vy = Math.abs(obj.vy) * restitution;
                obj.y = obj.radius;
                // audio.play();

            } else if (obj.y > canvasHeight - obj.radius){
                obj.vy = -Math.abs(obj.vy) * restitution;
                obj.y = canvasHeight - obj.radius;
                // audio.play();

            }
        }
    }


    detectCollisionsWithWalls() {
        let ball;
        let wall;
        
        for (let i = 0; i < this.gameObjects.length; i++) {
            ball = this.gameObjects[i];
            for (let j = 0; j < this.walls.length; j++) {
                wall = this.walls[j];

                // Si la balle touche un mur
                if (this.circleIntersectRect(ball.x, ball.y, ball.radius, wall.x, wall.y, wall.width, wall.height)) {

                    // Calcul de la direction de la balle par rapport au mur et sa rotation
                    const dx = (ball.x < wall.x) ? wall.x - ball.x : (ball.x > wall.x + wall.width) ? ball.x - (wall.x + wall.width) : 0;
                    const dy = (ball.y < wall.y) ? wall.y - ball.y : (ball.y > wall.y + wall.height) ? ball.y - (wall.y + wall.height) : 0;

                    // Détermination du rebond en fonction de la direction
                    if (dx > dy) {
                        ball.vx *= -restitution; // Rebond horizontal
                        // Ajuster la position horizontalement
                        ball.x += ball.vx > 0 ? -1 : 1;
                    } else {
                        ball.vy *= -restitution; // Rebond vertical
                        // Ajuster la position verticalement
                        ball.y += ball.vy > 0 ? -1 : 1;
                    }

                    // Ajuster la position de la balle pour qu'elle ne pénètre pas dans le mur
                    if (ball.x < wall.x) {
                        ball.x = wall.x - ball.radius;
                    } else if (ball.x > wall.x + wall.width) {
                        ball.x = wall.x + wall.width + ball.radius;
                    } else if (ball.y < wall.y) {
                        ball.y = wall.y - ball.radius;
                    } else if (ball.y > wall.y + wall.height) {
                        ball.y = wall.y + wall.height + ball.radius;
                    }

                    // Appliquer la friction avec tous les murs
                    ball.vx *= (1 - friction);

                    // Arrêter le mouvement si la vitesse devient très faible
                    if (Math.abs(ball.vx) < 0.1) {
                        ball.vx = 0;
                    }
                }
            }
        }
    }

    

}
