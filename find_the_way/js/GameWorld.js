console.log("GameWorld.js loaded");


// Set a restitution, a lower value will lose more energy when colliding
const restitution = 1.1;

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
            new Ball(this.context, 250, 50, 0, 100, 1),
            // new Ball (this.context, 150, 50, 0, 100, 1),
            // new Wall(this.context, 100, 100, 10, 600, 100, 100),
        ];

        // console.log(this.gameObjects);

        this.walls = [
            new Wall(this.context, 0, 0, 10, this.canvas.height, 100, 100),
            new Wall(this.context, 0, 0, this.canvas.width, 10, 100, 100),
            new Wall(this.context, this.canvas.width - 10, 0, 10, this.canvas.height, 100, 100),
            new Wall(this.context, 0, this.canvas.height - 10, this.canvas.width, 10, 100, 100),

            // Murs 
            new Wall(this.context, 100, 100, 10, 600, 100, 100),
            new Wall(this.context, 100, 100, 600, 10, 100, 100),
            new Wall(this.context, 100, 700, 600, 10, 100, 100),
            new Wall(this.context, 700, 100, 10, 600, 100, 100),
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

        // this.detectCollisionsWithWalls();

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
                    obj1.isColliding = true;
                    obj2.isColliding = true;

                    let vCollision = {x: obj2.x - obj1.x, y: obj2.y - obj1.y};
                    let distance = Math.sqrt((obj2.x-obj1.x)*(obj2.x-obj1.x) + (obj2.y-obj1.y)*(obj2.y-obj1.y));
                    let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
                    let vRelativeVelocity = {x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy};

                    let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

                    speed *= Math.min(obj1.restitution, obj2.restitution);

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

    clearCanvas() {
        // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    detectCollisionsWithWalls() {
        // Dans la méthode gameLoop de GameWorld après la détection des collisions entre les objets
        // Ajoute une détection de collision entre la balle et les murs
        for (let i = 0; i < this.gameObjects.length; i++) {
            const gameObject = this.gameObjects[i];

            if (gameObject instanceof Ball) {
                for (let j = 0; j < this.walls.length; j++) {
                    const wall = this.walls[j];
                    if (this.collisionCheckCircleRect(
                        gameObject, wall
                    )) {
                        console.log("Collision détectée");
                        // // Collision détectée
                        // // Calcul du point d'impact le plus proche
                        // let closestX = clamp(gameObject.x, wall.x, wall.x + wall.width);
                        // let closestY = clamp(gameObject.y, wall.y, wall.y + wall.height);

                        // // Calcul du vecteur entre le centre de la balle et le point d'impact
                        // let normalVector = { x: gameObject.x - closestX, y: gameObject.y - closestY };

                        // // Normalise le vecteur
                        // let length = Math.sqrt(normalVector.x * normalVector.x + normalVector.y * normalVector.y);
                        // normalVector.x /= length;
                        // normalVector.y /= length;

                        // // Calcule la composante de la vitesse de la balle dans la direction normale
                        // let speedNormal = gameObject.vx * normalVector.x + gameObject.vy * normalVector.y;

                        // // Calcule la nouvelle vitesse après rebond en inversant la composante normale
                        // gameObject.vx -= 2 * speedNormal * normalVector.x;
                        // gameObject.vy -= 2 * speedNormal * normalVector.y;
                        // }
                    }
                }
            }
        }
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
            }else if (obj.x > canvasWidth - obj.radius){
                obj.vx = -Math.abs(obj.vx) * restitution;
                obj.x = canvasWidth - obj.radius;
            }

            // Check for bottom and top
            if (obj.y < obj.radius){
                obj.vy = Math.abs(obj.vy) * restitution;
                obj.y = obj.radius;
            } else if (obj.y > canvasHeight - obj.radius){
                obj.vy = -Math.abs(obj.vy) * restitution;
                obj.y = canvasHeight - obj.radius;
            }
        }
    }
    
}