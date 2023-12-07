var world = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,1,1,1,2,2,2,2,1,1,1,1,1,1,1,2],
    [2,1,2,1,1,1,1,1,1,1,2,2,2,1,1,2],
    [2,1,2,1,2,1,1,2,1,1,1,1,1,1,1,2],
    [2,1,2,1,2,1,1,2,1,1,1,1,1,2,1,2],
    [2,1,2,2,2,1,1,2,1,1,1,3,1,2,1,2],
    [2,1,1,1,1,1,1,2,1,1,1,1,1,2,1,2],
    [2,1,3,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];

var pacman = {
    x: 1,
    y: 1
};
var pacman2 = {
    x: 1,
    y: 2
};
var ghost = {
    x: 1,
    y: 6
};
var score = 0;
var gameActive = true;

function displayWorld() {
    var output = '';

    for (var i = 0; i < world.length; i++) {
        output += "\n<div class='row'>\n";
        for (var j = 0; j < world[i].length; j++) {
            if (world[i][j] == 2) {
                output += "<div class='brick'></div>";
            } else if (world[i][j] == 1) {
                output += "<div class='coin'></div>";
            } else if (world[i][j] == 0) {
                output += "<div class='empty'></div>";
            } else if (world[i][j] == 3) {
                output += "<div class='cereza'></div>";
            }
        }
        output += "\n</div>";
    }
    document.getElementById('world').innerHTML = output;
}

function displayPacman() {
    document.getElementById('pacman').style.top = pacman.y * 20 + "px";
    document.getElementById('pacman').style.left = pacman.x * 20 + "px";
    document.getElementById('pacman2').style.top = pacman2.y * 20 + "px";
    document.getElementById('pacman2').style.left = pacman2.x * 20 + "px";
}

function displayScore() {
    document.getElementById('score').innerHTML = score;
}

function displayGhost() {
    document.getElementById('ghost').style.top = ghost.y * 20 + "px";
    document.getElementById('ghost').style.left = ghost.x * 20 + "px";
}

function moveGhost() {
    var directions = ['up', 'down', 'left', 'right'];
    var randomDirection = directions[Math.floor(Math.random() * directions.length)];

    var ghostX = ghost.x;
    var ghostY = ghost.y;

    switch (randomDirection) {
        case 'up':
            if (world[ghost.y - 1] && world[ghost.y - 1][ghost.x] !== 2) {
                ghost.y--;
            }
            break;
        case 'down':
            if (world[ghost.y + 1] && world[ghost.y + 1][ghost.x] !== 2) {
                ghost.y++;
            }
            break;
        case 'left':
            if (world[ghost.y][ghost.x - 1] !== 2) {
                ghost.x--;
            }
            break;
        case 'right':
            if (world[ghost.y][ghost.x + 1] !== 2) {
                ghost.x++;
            }
            break;
    }

    // Verificar colisión después de actualizar la posición del fantasma
    if (ghost.x === pacman.x && ghost.y === pacman.y || ghost.x === pacman2.x && ghost.y === pacman2.y) {
        var ghostElement = document.getElementById('perdiste');
        ghostElement.innerHTML = "Perdiste";
        ghostElement.style.color = 'red';
        ghostElement.style.fontSize = '20px';
        ghostElement.style.backgroundColor = 'green';
        console.log("Game Over");
        gameActive = false;
        return; // Terminar la función si hay colisión
    }

    displayGhost();
}

function gameOver() {
    if ((pacman.x === ghost.x && pacman.y === ghost.y) ||
        (pacman2.x === ghost.x && pacman2.y === ghost.y)) {
        var ghostElement = document.getElementById('perdiste');
        ghostElement.innerHTML = "Perdiste";
        ghostElement.style.color = 'red';
        ghostElement.style.fontSize = '20px';
        ghostElement.style.backgroundColor = 'green';
        console.log("Game Over");
        gameActive = false;
    }
}

function handleKeyDown(e) {
    if (!gameActive) {
        return;
    }
    if (e.keyCode == 37 && world[pacman.y][pacman.x - 1] !== 2) {
        pacman.x--;
    } else if (e.keyCode == 39 && world[pacman.y][pacman.x + 1] !== 2) {
        pacman.x++;
    } else if (e.keyCode == 38 && world[pacman.y - 1] && world[pacman.y - 1][pacman.x] !== 2) {
        pacman.y--;
    } else if (e.keyCode == 40 && world[pacman.y + 1] && world[pacman.y + 1][pacman.x] !== 2) {
        pacman.y++;
    }
        // Movimiento de pacman2
    if (e.keyCode == 37 && world[pacman2.y][pacman2.x - 1] !== 2) {
        pacman2.x--;
    } else if (e.keyCode == 39 && world[pacman2.y][pacman2.x + 1] !== 2) {
        pacman2.x++;
    } else if (e.keyCode == 38 && world[pacman2.y - 1] && world[pacman2.y - 1][pacman2.x] !== 2) {
        pacman2.y--;
    } else if (e.keyCode == 40 && world[pacman2.y + 1] && world[pacman2.y + 1][pacman2.x] !== 2) {
        pacman2.y++;
    }
    if (world[pacman.y] && world[pacman.y][pacman.x]== 1) {
        world[pacman.y][pacman.x] = 0;
        score += 10;

    if(world[pacman2.y] && world[pacman2.y][pacman2.x] == 1) {
        world[pacman2.y][pacman2.x] = 0;
        score += 10;
    } 
    if (world[pacman.y] && world[pacman.y][pacman.x] == 3) {
        world[pacman.y][pacman.x] = 0;
        score += 50;

    }    
    if (world[pacman2.y] && world[pacman2.y][pacman2.x] == 3) {
        world[pacman2.y][pacman2.x] = 0;
        score += 50;
    }
    
    } 

    
    displayWorld();
    displayScore();
    displayPacman();
    moveGhost(); 
    displayGhost();
    gameOver();
}

displayWorld();
displayPacman();
displayScore();
displayGhost();
setInterval(moveGhost, 150);

document.onkeydown = handleKeyDown;
