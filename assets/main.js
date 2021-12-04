import Game from "/assets/game.js";

//GAME BORDER
let canvas = document.getElementById('gameOutline');
// DEFINES GAME AS 2D
let ctx = canvas.getContext('2d');

// GAME LAYOUT SIZE
const GAME_WIDTH = 1200;
const GAME_HEIGHT = 600;

// PLACES PADDLE
let game = new Game(GAME_WIDTH,GAME_HEIGHT);
// game.start();


let lastTime = 0 ;

function gameLoop(timestamp){
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
     // REMOVES OLD TILES TO NOT CLUTTER SCREEN
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);