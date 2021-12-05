import { detectCollision } from '/collisionDetection.js';

var sfx = {
    minuslive: new Howl ({
        src: [
            '/sound/sad.wav',
        ],
    }),
    bounce: new Howl ({
        src: ['/sound/bounce.wav'],
    }),
};



export default class Ball {
    constructor(game){
        this.image = document.getElementById('img_ball');
        this.uiLives = document.getElementById('lives');
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;
        this.size = 40;
        this.reset();
    }
    reset(){
        this.position = {x:10, y:400};
        this.speed = {x: 2, y: -2};
    }
    draw(ctx){
        ctx.drawImage(
            this.image, 
            this.position.x, 
            this.position.y, 
            this.size, 
            this.size);
    }
    update(deltaTime){
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // Wall on left or right
        if(this.position.x + this.size > this.gameWidth || this.position.x < 0) {
            this.speed.x = -this.speed.x;
            sfx.bounce.play();
        }

        // Wall top or bottom
        if (this.position.y <0) {
            this.speed.y = -this.speed.y;
            sfx.bounce.play();
        }

        // bottom of game
        if(this.position.y + this.size > this.gameHeight){
            sfx.minuslive.play();
            this.game.lives--;
            this.uiLives.textContent = `Lives: ${this.game.lives}`;
            this.reset();
        }
       if(detectCollision(this, this.game.paddle )){
       this.speed.y = -this.speed.y;
       this.position.y = this.game.paddle.position.y - this.size;
       sfx.bounce.play();
    }}
}