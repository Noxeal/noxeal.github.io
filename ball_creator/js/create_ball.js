document.addEventListener('click', function (e) {

    posX = e.pageX;
    posY = e.pageY;

    console.log(posX, posY);

    var shape = document.createElement('div');

    shape_list = ['ball', 'square', 'triangle'];

    // On choisi une forme aléatoire
    var shapeChosen = Math.floor(Math.random() * shape_list.length);
    console.log(shapeChosen);

    shapeChosen = shape_list[shapeChosen];
    console.log(shape);

    // On met à jour la forme de la balle
    shape.className = shapeChosen;

    // Une fois que la balle est apparue, on la fait bouger dans une direction aléatoire
    // On crée un vecteur de mouvement de la balle (direction et vitesse) aléatoire 
    var direction = Math.floor(Math.random() * 4);

    // On choisi une vitesse aléatoire différente de 0
    var vitesse = Math.floor(Math.random() * 10) + 1;
    console.log(vitesse);

    // On choisi une taille aléatoire
    var taille = Math.floor(Math.random() * 100);
    console.log(taille);

    // On met à jour la taille de la balle
    shape.style.width = taille + 'px';
    shape.style.height = taille + 'px';

    // Position de la balle au niveau de la souris
    shape.style.left = posX - taille / 2 + 'px';
    shape.style.top = posY - taille / 2 + 'px';    

    // On choisi une couleur aléatoire
    var couleur = Math.floor(Math.random() * 360);
    console.log(couleur);
    // On met à jour la couleur de la balle
    shape.style.backgroundColor = 'hsl(' + couleur + ', 100%, 50%)';

    
    // Mise en mouvenement de la balle
    // On utilise la fonction setInterval pour faire bouger la balle toutes les 10 millisecondes
    var id = setInterval(function () {
        // On récupère la position actuelle de la balle
        var posX = parseInt(shape.style.left);
        var posY = parseInt(shape.style.top);


        // On bouge la balle en fonction de la direction
        switch (direction) {
            case 0:
                posY -= vitesse;
                break;
            case 1:
                posX += vitesse;
                break;
            case 2:
                posY += vitesse;
                break;
            case 3:
                posX -= vitesse;
                break;
        }

        // On met à jour la position de la balle
        shape.style.left = posX + 'px';
        shape.style.top = posY + 'px';

        // On vérifie si la balle est sortie de l'écran
        if (posX < 0 || posX > window.innerWidth || posY < 0 || posY > window.innerHeight) {
            // On supprime la balle
            shape.remove();
            // On arrête le mouvement
            clearInterval(id);
        }
    }, 10);


    console.log(shape.style.left, shape.style.top);

    document.body.appendChild(shape);
    

}, false);