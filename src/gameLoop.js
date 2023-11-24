import { CollisionDetection } from './collision.js';
import {FRAMETIME} from './constants.js';

export class GameLoop {

    ctx;
    scales;
    ropes;
    objects;

    keysPressed = [];
    keysUp = [];
    interval;

    spaceDown = false;
    spacePushedTime = 0;
    nextLevel;

    constructor(ctx) {
        this.ctx = ctx;
        this.constructLevel();
        console.log('$$$$', this);
    }

    constructLevel() {
        console.log('looks i dont have a level constructLevel!');
    }

    registerKey(ev, isDown) {
        if (isDown) {
            this.keysPressed.push(ev.code);
        } else {
            this.keysUp.push(ev.code);
        }
    }

    passInterval(interval) {
        this.interval = interval;
    }

    loop(frameTime) {
        this.ctx.fillStyle = 'pink';
        this.ctx.fillRect(0, 0, 640, 480);

        [...this.scales, ...this.ropes, ...this.objects].forEach(s => {
            s.draw(this.ctx);
            s.execute(frameTime);
        });

        let cDet = new CollisionDetection(this.objects);
        let collisions = cDet.getCollisions();

        collisions.forEach((c, i) => {
            c.execute()
        });


        if (this.keysPressed.length > 0) {
            if (this.keysPressed.pop() == 'Space') {
                this.spaceDown = true;
            }
            this.keysPressed = [];
        }

        if(this.keysUp.length > 0) {
            if (this.keysUp.pop() == 'Space') {
                this.spaceDown = false;
                this.setStartV();                
            }
            this.keysUp = [];
        }

        if(this.spaceDown) {
            this.spacePushedTime+= frameTime;
            console.log('collected v', this.spacePushedTime);
        }

    }

    gameOverLoop(frameTime) {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, 640, 480);

        this.ctx.font = '64px monospace';
        this.ctx.fillStyle = 'pink';
        this.ctx.fillText('Game Over', 100, 200);

        this.ctx.font = '23px monospace';
        this.ctx.fillText('Press Space for restart', 100, 250);

        if (this.keysPressed.length > 0) {
            if (this.keysPressed.pop() == 'Space') {
                this.spaceDown = true;
                clearInterval(this.interval);

                this.constructLevel();
                this.interval = setInterval(() => { this.loop(FRAMETIME) }, FRAMETIME);

            }
            this.keysPressed = [];
        }

    }

    setStartV() {
        this.objects[0].vVector = [2, Math.floor(this.spacePushedTime / -100 )];
        console.log(this.objects[0].vVector);
    }

    gameLost() {
        clearInterval(this.interval);
        this.interval = setInterval(() => { this.gameOverLoop(FRAMETIME) }, FRAMETIME);
    }

    startNextLevel() {
        console.log('startNextLevel ! ', this.nextLevel);
        clearInterval(this.interval);
        this.interval = setInterval(() => { this.nextLevel.loop(FRAMETIME) }, FRAMETIME);
    }
}