import { detectCollision } from "./collisionDetection.js";


var sfx = {
    brickdestroy: new Howl ({
        src: [
            './assets/sound/destroy.wav',
        ],volume: 0.25,
    }),
};
export default class Brick {
    constructor(game, position){
        this.image = document.getElementById('img_brick');
        this.uiScore = document.getElementById('score');
        this.game = game;
        this.position = position;
        this.width = 135;
        this.height = 80;
        this.markedForDeletion = false;
    }
    update(){
        if(detectCollision(this.game.ball, this)) {
            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.markedForDeletion = true;
            this.game.score += 20;
            this.uiScore.textContent = `Score: ${this.game.score}`
            sfx.brickdestroy.play();
        }
    }
    draw(ctx){
        ctx.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
        );
    }
    
}