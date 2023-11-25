import { GameLoop } from '../gameLoop.js';
import { Ball, Platform, PlatformStop, PlatformBended, PlatformBendedOther, Cat } from '../objects.js';
import { GameOverScreen } from './gameOverScreen.js';
export class Level1 extends GameLoop {

    constructLevel() {
        let platform1 = new Platform([100, 150], 150, 20);
        let platform2 = new Platform([250, 200], 300, 20);
        let platform3 = new Platform([25, 200], 50, 20);

        let myBall = new Ball([50, 10]);
        myBall.vVector = [0, 0];
    
        let myCat = new Cat([300, 150]);
    
        this.scales = [];
        this.ropes = [];
        this.objects = [
            myBall, myCat,
            platform1, platform2, platform3,
            
        ];
    }

    lostgame() { 
        this.startNextLevel(new GameOverScreen(this.ctx, this.listener));
    }


}