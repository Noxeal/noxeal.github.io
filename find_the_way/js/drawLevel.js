let canvas = document.getElementById('canvasJeu');
let ctx = canvas.getContext('2d');

let isDrawing = false;
let points = [];

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    points.push({ x: e.clientX, y: e.clientY });
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        points.push({ x: e.clientX, y: e.clientY });
        draw();
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.closePath();
    ctx.stroke();
}

