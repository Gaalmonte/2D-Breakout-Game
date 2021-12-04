import { detectCollision } from "/assets/collisionDetection.js";
export default class Brick {
    constructor(game, position){
        this.image = document.getElementById('img_brick');
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
        }
        // if(this.markedForDeletion === true){}
        // this.game.score++;
        // this.uiLives.textContent = `Score: ${this.game.score}`;
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