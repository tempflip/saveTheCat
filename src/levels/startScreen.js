import { GameLoop } from '../gameLoop.js';
// import { Ball, Platform, PlatformStop, PlatformBended, PlatformBendedOther, Cat } from '../objects.js';
import { Level1 } from './level1.js';
import { GameOverScreen } from './gameOverScreen.js';

export class StartScreen extends GameLoop {

    constructLevel() {
        console.log('this.nextLevel', this.nextLevel);
        console.log('StartScreen', this);
    }

    loop(frameTime) {
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(0, 0, 640, 480);

        this.ctx.font = '64px monospace';
        this.ctx.fillStyle = 'pink';
        this.ctx.fillText('Hello', 100, 200);

        this.ctx.font = '23px monospace';
        this.ctx.fillText('Press space to start', 100, 250);

        if (this.keysUp.length > 0) {
            if (this.keysUp.pop() == 'Space') {
                console.log('startsceen space !');
                this.startNextLevel(new Level1(this.ctx, this.listener));
                // this.startNextLevel(new GameOverScreen(this.ctx));
            }
            this.keysUp = [];
        }
    }

    gameLost(ev) {
        console.log('StartScreen gameLost: i should not be here!')
    }


}