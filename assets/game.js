import Paddle from '/assets/paddle.js';
import InputHandler from '/assets/Input.js';
import Ball from '/assets/ball.js';
import Brick from '/assets/brick.js';
import {buildLevel, level1} from '/assets/levels.js';

export default class Game {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

    }
    start(){
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        let bricks = buildLevel(this,level1);
        this.gameObjects = [
            this.ball,
            this.paddle, ...bricks
        ];
        new InputHandler(this.paddle);
    }

    update(deltaTime){
        this.gameObjects.forEach((object) => object.update(deltaTime));
    }
    draw(ctx){
        this.gameObjects.forEach(object => object.draw(ctx));
    }
}