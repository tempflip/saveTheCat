// import { Scale } from './scale.js';
// import { Rope } from './rope.js';
import { StartScreen } from './levels/startScreen.js';
import { Listener } from './listener.js';
// import { GameOverScreen } from './levels/gameOverScreen.js';
// import { GameOverScreen } from './levels/gameOverScreen.js';
// import { Level1 } from './levels/level1.js';
import {FRAMETIME} from './constants.js';
import { GameOverScreen } from './levels/gameOverScreen.js';

const main = () => {

    const canvas = document.querySelector('#can');
    const ctx = canvas.getContext('2d');

    let listener = new Listener();

    let gameLoop = new GameOverScreen(ctx, listener);

    let interval = setInterval(() => { gameLoop.loop(FRAMETIME) }, FRAMETIME);
    gameLoop.passInterval(interval);

}
main();



