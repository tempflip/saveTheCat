import { Scale } from './scale.js';
import { Rope } from './rope.js';
import { GameLoop } from './gameLoop.js';
import { Ball, Platform, PlatformStop, PlatformBended, Cat } from './objects.js';

const FRAMETIME = 50;

const main = () => {

    let s = new Scale();
    s.torqueLeft = 100;
    s.torqueRight = 100;

    s.fulcrum = [200, 150];
    s.fLeft = 10;
    s.fRight = 10;

    let s2 = new Scale();
    s2.torqueLeft = 100;
    s2.torqueRight = 100;

    s2.fulcrum = [400, 300];
    s2.fLeft = 20;
    s2.fRight = 20;

    let rope = new Rope(s, s2);
    rope.s1Left = false;
    rope.s2Left = true;

    let ball = new Ball([30, 30]);
    ball.vVector = [0, 0];

    let ball2 = new Ball([100, 100]);
    ball2.vVector = [3, 3];

    // let platBended1 = new PlatformBended([100, 100], [200, 170]);
    let platBended1 = new PlatformBended([100, 100], [200, 200]);
    let platBended2 = new PlatformBended([200, 250], [400, 270]);

    let platform1 = new Platform([1, 330], 630, 20);
    let platformStop1 = new PlatformStop([1, 300], 20, 30);
    let platformStop2 = new PlatformStop([580, 300], 20, 30);


    let cat = new Cat([100, 0]);
    cat.vVector = [0, 10];

    const canvas = document.querySelector('#can');
    const ctx = canvas.getContext('2d');


    // /platBended1
    let gameLoop = new GameLoop(ctx,
        [],// [s, s2],
        [], // [rope],platBended2
        [cat,


         platBended1,platBended2,
         platform1, platformStop1, platformStop2
        ]

    );

    document.addEventListener('keydown', (ev) => {
        gameLoop.registerKey(ev);
    });


    let interval = setInterval(() => { gameLoop.loop(FRAMETIME) }, FRAMETIME);
    gameLoop.passInterval(interval);

}
main();