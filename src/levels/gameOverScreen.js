import { GameLoop } from '../gameLoop.js';
import { StartScreen } from './startScreen.js';

export class GameOverScreen extends GameLoop {
    loop(frameTime) {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, 640, 480);

        this.ctx.font = '64px monospace';
        this.ctx.fillStyle = 'pink';
        this.ctx.fillText('Game Over', 100, 200);

        this.ctx.font = '23px monospace';
        this.ctx.fillText('Press Space for restart', 100, 250);

        if (this.keysPressed.length > 0) {
            if (this.keysUp.pop() == 'Space') {
                console.log('gameover space !');
                this.startNextLevel(new StartScreen(this.ctx, this.listener));
            }
            this.keysUp = [];
        }

    }

}
