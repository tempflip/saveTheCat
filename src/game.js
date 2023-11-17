import {Scale} from './scale.js';
import {Rope} from './rope.js';
import {GameLoop} from './gameLoop.js';

const main = () => {

    let s = new Scale();
    s.torqueLeft = 100;
    s.torqueRight = 100;

    s.fulcrum = [200,150];
    s.fLeft = 10;
    s.fRight = 10;

    let s2 = new Scale();
    s2.torqueLeft = 100;
    s2.torqueRight = 100;

    s2.fulcrum = [400,300];
    s2.fLeft = 10;
    s2.fRight = 10;

    let rope = new Rope(s, s2);
    rope.s1Left = true;
    rope.s2Left = true;

    const canvas = document.querySelector('#can');
    const ctx = canvas.getContext('2d');

    let gameLoop = new GameLoop(ctx, 
                [s, s2], 
                []);

    document.addEventListener('keydown', (ev) => {
        gameLoop.registerKey(ev);
    });


    let interval = setInterval(() => {gameLoop.loop()}, 200);

}
main();