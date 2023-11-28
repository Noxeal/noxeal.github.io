document.addEventListener("DOMContentLoaded", () => {
  const labyrinth = document.getElementById('labyrinth');
  const gridSize = 10; // Taille du labyrinthe (10x10 cases dans cet exemple)
  let playerPosition = { x: 0, y: 0 }; // Position initiale du joueur

  function generateLabyrinth() {
    const cells = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
      cells.push({ x: i % gridSize, y: Math.floor(i / gridSize), walls: { top: true, right: true, bottom: true, left: true } });

      // Create a new .cell element for each cell object
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      labyrinth.appendChild(cellElement);

    }

    console.log(cells);
  
    divide(cells, 0, 0, gridSize, gridSize);
    cells.forEach(cell => {
      const cellElement = document.querySelector(`.cell:nth-child(${cell.y * gridSize + cell.x + 1})`);
      if (cell.walls.top) cellElement.style.borderTop = '1px solid #ccc';
      if (cell.walls.right) cellElement.style.borderRight = '1px solid #ccc';
      if (cell.walls.bottom) cellElement.style.borderBottom = '1px solid #ccc';
      if (cell.walls.left) cellElement.style.borderLeft = '1px solid #ccc';
    });
  }
  
  function divide(cells, x, y, width, height) {
    if (width < 2 || height < 2) {
      return;
    }
  
    const horizontal = height > width;
    const wallX = x + (horizontal ? 0 : Math.floor(Math.random() * (width - 1)));
    const wallY = y + (horizontal ? Math.floor(Math.random() * (height - 1)) : 0);
    const passageX = wallX + (horizontal ? Math.floor(Math.random() * width) : 0);
    const passageY = wallY + (horizontal ? 0 : Math.floor(Math.random() * height));
  
    cells.forEach(cell => {
      if ((horizontal && cell.x === wallX && cell.y === passageY) ||
          (!horizontal && cell.x === passageX && cell.y === wallY)) {
        if (horizontal && cell.x !== passageX) {
          cell.walls.right = false;
          cell.walls.left = false;
        } else if (!horizontal && cell.y !== passageY) {
          cell.walls.top = false;
          cell.walls.bottom = false;
        }
      }
    });
  
    divide(cells, x, y, horizontal ? width : wallX - x + 1, horizontal ? wallY - y + 1 : height);
    divide(cells, horizontal ? x : wallX + 1, horizontal ? wallY + 1 : y, horizontal ? width : x + width - wallX - 1, horizontal ? height - wallY - 1 : height);
  }
  
  function renderPlayer() {
    const playerCell = document.querySelector(`.cell:nth-child(${playerPosition.y * gridSize + playerPosition.x + 1})`);
    playerCell.classList.add('player');
  }

  function movePlayer(direction) {
    const newPosition = { ...playerPosition };

    if (direction === 'left' && playerPosition.x > 0) {
      newPosition.x -= 1;
    } else if (direction === 'right' && playerPosition.x < gridSize - 1) {
      newPosition.x += 1;
    } else if (direction === 'down' && playerPosition.y < gridSize - 1) {
      newPosition.y += 1;
    } else if (direction === 'up' && playerPosition.y > 0) {
      newPosition.y -= 1;
    }
      

    const currentCell = document.querySelector(`.cell:nth-child(${playerPosition.y * gridSize + playerPosition.x + 1})`);
    currentCell.classList.remove('player');

    playerPosition = newPosition;
    renderPlayer();
  }

  function handleKeyDown(event) {
    switch (event.key) {
      case 'ArrowLeft':
        movePlayer('left');
        break;
      case 'ArrowRight':
        movePlayer('right');
        break;
      case 'ArrowDown':
        movePlayer('down');
        break;

      case 'ArrowUp':
        movePlayer('up');
        break;
    }
  }

  document.addEventListener('keydown', handleKeyDown);

  generateLabyrinth();
  renderPlayer();
});
