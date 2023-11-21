import { CollisionDetection } from './collision.js';
export class GameLoop {

    ctx;
    scales;
    ropes;
    objects;

    keysPressed = [];
    interval;

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

    passInterval(interval) {
        this.interval = interval;
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

        collisions.forEach((c, i) => {
            // console.log('c:', i, c);
            c.execute()
        });


        if (this.keysPressed.length > 0) {
            global
            if (this.scales.length > 0) {
                this.scales[0].pushLeft += 100;
            }
            clearInterval(this.interval);
            this.keysPressed = [];

        }

        // s.pushLeft += 10;
    }
}