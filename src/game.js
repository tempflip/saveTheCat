// import { Scale } from './scale.js';
// import { Rope } from './rope.js';
import { StartScreen } from './levels/startScreen.js';
import {FRAMETIME} from './constants.js';
console.log('FRAMETIME', FRAMETIME);
const main = () => {

    
    // let s = new Scale();
    // s.torqueLeft = 100;
    // s.torqueRight = 100;

    // s.fulcrum = [200, 150];
    // s.fLeft = 10;
    // s.fRight = 10;

    // let s2 = new Scale();
    // s2.torqueLeft = 100;
    // s2.torqueRight = 100;

    // s2.fulcrum = [400, 300];
    // s2.fLeft = 20;
    // s2.fRight = 20;

    // let rope = new Rope(s, s2);
    // rope.s1Left = false;
    // rope.s2Left = true;

    
    // let platBended1 = new PlatformBended([100, 100], [200, 170]);
    // let platBended1 = new PlatformBendedOther([200, 40], [500, 150]);
    // let platBended2 = new PlatformBended([40, 170], [500, 300]);

    // let platformStop1 = new PlatformStop([1, 300], 20, 30);
    // let platformStop2 = new PlatformStop([580, 300], 20, 30);

    //////////////////////////////////////////////



    const canvas = document.querySelector('#can');
    const ctx = canvas.getContext('2d');
    

    let gameLoop = new StartScreen(ctx);

    document.addEventListener('keydown', (ev) => {
        gameLoop.registerKey(ev, true);
    });

    document.addEventListener('keyup', (ev) => {
        gameLoop.registerKey(ev, false);
    });

    document.addEventListener('lostgame', (ev) => {
        gameLoop.gameLost();
    });


    let interval = setInterval(() => { gameLoop.loop(FRAMETIME) }, FRAMETIME);
    gameLoop.passInterval(interval);

}
main();



