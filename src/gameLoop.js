import { CollisionDetection } from './collision.js';
import { FRAMETIME } from './constants.js';
// import { GameOverScreen } from './levels/gameOverScreen.js';




export class GameLoop {

    ctx;
    scales;
    ropes;
    objects;

    keysPressed = [];
    keysUp = [];
    events = [];

    interval;
    listener;

    spaceDown = false;
    spacePushedTime = 0;

    constructor(ctx, listener) {
        console.log('lll', listener);
        this.ctx = ctx;
        this.listener = listener;
        this.listener.addListening(this);
        this.listener.resetKeys();
        this.constructLevel();
        // this.addEventListeners();
        // this.addEventListeners(false);
        console.log('$$$$', this);
    }

    constructLevel() {
        console.log('looks i dont have a level constructLevel!');
    }


    // addEventListeners(add = true) {

        // const fRegisterKeyDown = (ev) => {
        //     this.registerKey(ev, true);
        // }

        // const fRegisterKeyUp = (ev) => {
        //     this.registerKey(ev, false);
        // }

        // if (add == true) {
        //     document.addEventListener('keydown', fRegisterKeyDown);
        //     document.addEventListener('keyup', fRegisterKeyUp);
        // } else {
        //     // document.removeEventListener('keydown', fRegisterKeyDown);
        //     // document.removeEventListener('keyup', fRegisterKeyUp);
        // }

    // }

    // fRegisterKeyDown(ev) {
    // this.registerKey(ev, true);
    // }

    // fRegisterKeyUp(ev) {
    // this.registerKey(ev, false);
    // }


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

        if (this.keysUp.length > 0) {
            if (this.keysUp.pop() == 'Space') {
                this.spaceDown = false;
                this.setStartV();
            }
            this.keysUp = [];
        }

        if (this.spaceDown) {
            this.spacePushedTime += frameTime;
            console.log('collected v', this.spacePushedTime);
        }

        if (this.events.includes('lostgame')) {
            console.log('im lost!');
            this.events = [];
            this.lostgame();
        }

    }

    setStartV() {
        this.objects[0].vVector = [2, Math.floor(this.spacePushedTime / -100)];
        console.log(this.objects[0].vVector);
    }

    lostgame() { 
    }

    startNextLevel(level) {
        console.log('startNextLevel ! ', level);
        clearInterval(this.interval);
        let newInterval = setInterval(() => { level.loop(FRAMETIME) }, FRAMETIME);
        level.passInterval(newInterval);
    }
}