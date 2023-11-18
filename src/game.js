import {Scale} from './scale.js';
import {Rope} from './rope.js';
import {GameLoop} from './gameLoop.js';
import {Ball, Platform} from './objects.js';

const FRAMETIME = 50;

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
    s2.fLeft = 20;
    s2.fRight = 20;

    let rope = new Rope(s, s2);
    rope.s1Left = false;
    rope.s2Left = true;

    let ball = new Ball([30, 30]);
    ball.vVector = [2,3];


    let ball2 = new Ball([200, 40]);
    ball2.vVector = [2,3];

    let platform1 = new Platform([100, 200], 400, 20);

    const canvas = document.querySelector('#can');
    const ctx = canvas.getContext('2d');

    let gameLoop = new GameLoop(ctx, 
                [s, s2], 
                [rope],
                [platform1, ball, ball2]
                );

    document.addEventListener('keydown', (ev) => {
        gameLoop.registerKey(ev);
    });


    let interval = setInterval(() => {gameLoop.loop(FRAMETIME)}, FRAMETIME);

}
main();