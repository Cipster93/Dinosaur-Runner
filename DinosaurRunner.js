let board = document.getElementById('board');
let dino = document.getElementById('din');
let colors = ['Turquoise', 'Coral', 'Lavender', 'Crimson', 'Lilac', 'Teal', 'Violet'];
let dinoPosition = 150;
let dinoSpeed = 5;
let hightJump = false;
let isOn  = true;
let keyStates = {};
let points = 0;
let changeSizeObst = 0;

document.addEventListener('keydown', function(event) {
    keyStates[event.key] = true;
});
document.addEventListener('keyup', function(event) {
    keyStates[event.key] = false;
});

function jumpDino() {
    if (isOn === true) {
        if (keyStates['ArrowUp'] && dinoPosition >= 70 && !hightJump) {
            dinoPosition -= dinoSpeed;
            if (dinoPosition === 70) {
                hightJump = true;
                dino.classList.add('rotate');
            }
        } else if (dinoPosition <= 150) {
            dinoPosition += dinoSpeed;
            if (dinoPosition == 150) {
                hightJump = false;
                dino.classList.remove('rotate');
            }
        }
        dino.style.top = dinoPosition + 'px';
        console.log(dinoPosition);
    }
}

setInterval(jumpDino, 18);

function createClouds() {
    let cloud = document.createElement('div');
    cloud.className = 'cloud';
    cloud.style.left = (board.offsetWidth - 100) + 'px';
    board.appendChild(cloud); 
}

createClouds();
setInterval(createClouds, 20000);

function movingClouds() {
    let clouds = document.querySelectorAll('.cloud');
    for (let i = 0; i < clouds.length; ++i) {
        let cloudsPosition = parseInt(clouds[i].style.left);
        cloudsPosition -= 1;
        if (cloudsPosition > 6) {
            clouds[i].style.left = cloudsPosition + 'px';
        } else {
            clouds[i].remove();
        }
    }
}

setInterval(movingClouds, 80);

function randomInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createObst() {
    if (isOn === true) {
        changeSizeObst += 5;
        let obst = document.createElement('div');
        obst.className = 'obst';
        obst.style.left = (board.offsetWidth - 3) + 'px';
        board.appendChild(obst);
        let interval = randomInterval(500, 2000);
        if (changeSizeObst % 3 === 0) {
            obst.style.marginTop = -50 + 'px';
            obst.style.height = 30 + 'px';
        }
        setTimeout(createObst, interval);
    }
}

setTimeout(createObst, 0);

function moveObst() {
    if (isOn === true) {
        let obstacles = document.querySelectorAll('.obst');
        for (let i = 0; i < obstacles.length; ++i) {
            let obstaclesPosition = parseInt(obstacles[i].style.left) || 0;
            obstaclesPosition -= 1;
            if (isColliding(dino, obstacles[i])) {
                gameOver();
                isOn = false;
            } 
            if (obstaclesPosition > 6) {
                obstacles[i].style.left = obstaclesPosition + 'px';
            } else {
                obstacles[i].remove();
                points += 10;
                document.getElementById('score').innerHTML = "Score " + points;
                changeColor();
            }
        }
    }
}

setInterval(moveObst, 1);

function changeColor() {
    let chosenColor = '';
    chosenColor = colors[Math.floor(Math.random() * colors.length)];
    dino.style.background = chosenColor;
}

function isColliding(elem1, elem2) {
    let rect1 = elem1.getBoundingClientRect();
    let rect2 = elem2.getBoundingClientRect();
    return !(rect1.right < rect2.left || 
        rect1.left > rect2.right || 
        rect1.bottom < rect2.top || 
        rect1.top > rect2.bottom);
}

function gameOver() {
    alert("Congratualtion! Your score is " + points);
    setTimeout(function() {
        location.reload()
    }, 2000);
}
