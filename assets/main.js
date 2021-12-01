// GAME PLATFORM
import Paddle from '/assets/paddle.js';
import InputHandler from '/assets/Input.js';
import Ball from '/assets/ball.js';

//GAME BORDER
let canvas = document.getElementById('gameOutline');
// DEFINES GAME AS 2D
let ctx = canvas.getContext('2d');

// GAME LAYOUT SIZE
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

// PLACES PADDLE
let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
let ball = new Ball();

new InputHandler(paddle);

let lastTime = 0 ;

function gameLoop(timestamp){
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
     // REMOVES OLD TILES TO NOT CLUTTER SCREEN
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    paddle.update(deltaTime);
    paddle.draw(ctx);
    ball.draw(ctx)
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);