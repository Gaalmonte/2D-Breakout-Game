import Paddle from '/assets/paddle.js';
import InputHandler from '/assets/Input.js';
import Ball from '/assets/ball.js';
// import Brick from '/assets/brick.js';
import {buildLevel, level1, level2, level3, level4} from '/assets/levels.js';


const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4,
    WIN: 5,
};

var music = {
    backgroundm: new Howl ({
        src: [
            '/assets/sound/background.mp3',
        ], loop:true
    }),
    winm: new Howl({
        src: [
            '/assets/sound/win.mp3',
        ]
    }),
    lossm: new Howl({
        src: [
            '/assets/sound/loss.mp3'
        ]
    })
};

export default class Game {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gamestate = GAMESTATE.MENU;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.gameObjects = [];
        this.bricks = []
        this.score = 0;
        this.lives = 3;
        this.levels = [level1, level2, level3, level4];
        this.currentLevel = 0;
        this.mute = false;
        this.uiLevel = document.getElementById('levels');
        new InputHandler(this.paddle, this);

    }
    start(){
        if(this.gamestate !== GAMESTATE.MENU && 
        this.gamestate !== GAMESTATE.NEWLEVEL) 
        return;
        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset();
        this.gameObjects = [
            this.ball,
            this.paddle
        ];
        this.gamestate = GAMESTATE.RUNNING;
    }

    update(deltaTime){
        if(this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;
        if(this.score === 80) this.gamestate = GAMESTATE.WIN;

        if(this.gamestate === GAMESTATE.RUNNING  && this.mute === false){
            if(!music.backgroundm.playing()){music.backgroundm.play()};
        }
        if(this.gamestate === GAMESTATE.PAUSED  || this.mute === true){
            music.backgroundm.pause();
        }
        if(this.gamestate === GAMESTATE.WIN  && this.mute === false){
            music.backgroundm.stop();
            if(!music.winm.playing()){music.winm.play()};
        }
        if(this.gamestate === GAMESTATE.WIN  && this.mute === true){
            music.winm.pause(); 
        }
        if(this.gamestate === GAMESTATE.GAMEOVER && this.mute === false){
            music.backgroundm.stop();
            if(!music.lossm.playing()){music.lossm.play()};
        }
        if(this.gamestate === GAMESTATE.GAMEOVER  && this.mute === true){
            music.lossm.pause(); 
        }
        
        if(this.gamestate === GAMESTATE.PAUSED || 
        this.gamestate === GAMESTATE.MENU ||
        this.gamestate === GAMESTATE.GAMEOVER ||
        this.gamestate === GAMESTATE.WIN)
        return;
        if(this.bricks.length === 0){
            this.currentLevel++;
            this.gamestate = GAMESTATE.NEWLEVEL;
            this.start();
            this.uiLevel.textContent = `Level: ${this.currentLevel}`
        }

        [...this.gameObjects, ...this.bricks].forEach((object) => object.update(deltaTime));
        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
    }
    draw(ctx){
        [...this.gameObjects,...this.bricks].forEach(object => object.draw(ctx));
        if(this.gamestate == GAMESTATE.PAUSED){
        ctx.rect(0,0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textalign = "center";
        ctx.fillText("Paused", this.gameWidth/2, this.gameHeight/2);
        };
        if(this.gamestate == GAMESTATE.MENU){
            ctx.rect(0,0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();
            ctx.font = "20px Arial";
            ctx.fillStyle = "white";
            ctx.textalign = "center";
            ctx.fillText("Press SPACEBAR to start", this.gameWidth/2, this.gameHeight/2);
        };
        if(this.gamestate == GAMESTATE.GAMEOVER){
            ctx.rect(0,0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();
            ctx.font = "20px Arial";
            ctx.fillStyle = "white";
            ctx.textalign = "center";
            ctx.fillText("Game over!", this.gameWidth / 2, this.gameHeight / 2);
        };
        if(this.gamestate == GAMESTATE.WIN){
                ctx.rect(0,0, this.gameWidth, this.gameHeight);
                ctx.fillStyle = "rgba(0,0,0,1)";
                ctx.fill();
                ctx.font = "20px Arial";
                ctx.fillStyle = "white";
                ctx.textalign = "center";
                ctx.fillText("You won!", this.gameWidth / 2, this.gameHeight / 2);
        }
}

    togglePause(){
        if(this.gamestate == GAMESTATE.PAUSED){
            this.gamestate = GAMESTATE.RUNNING;
        } else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }

    btn() {

            document.querySelector(".play-music").addEventListener("click", () => {
                this.mute = false;
            })
            document.querySelector(".stop-music").addEventListener("click", () => {
                this.mute = true;
            })
            
    }
}
