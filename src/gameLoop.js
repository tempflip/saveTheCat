import {CollisionDetection} from './collision.js';
export class GameLoop {

    ctx;
    scales;
    ropes;
    objects;

    keysPressed = [];

    constructor(ctx, scales, ropes, objects) {
        this.ctx = ctx;
        this.scales = scales;
        this.ropes = ropes;
        this.objects = objects;
        console.log('$$$$', this);
    }

    registerKey(ev) {
        this.keysPressed.push(ev.code);
    }

    loop(frameTime) {
        // console.log('ev', this);
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, 640, 400);

        [...this.scales, ...this.ropes, ...this.objects].forEach(s => {
            s.draw(this.ctx);
            s.execute(frameTime);
        });

        let cDet = new CollisionDetection(this.objects);
        let collisions = cDet.getCollisions();

        console.log('collisions', collisions.length);
        collisions.forEach(c => {c.execute()});


        if (this.keysPressed.length > 0) {
            console.log('.');
            // this.scales[0].pushLeft += 100;
            this.scales[0].pushLeft += 100;
            this.keysPressed = [];

        }

        // s.pushLeft += 10;
    }
}