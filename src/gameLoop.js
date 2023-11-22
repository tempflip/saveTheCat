import { CollisionDetection } from './collision.js';
export class GameLoop {

    ctx;
    scales;
    ropes;
    objects;

    keysPressed = [];
    keysUp = [];
    interval;

    spaceDown = false;
    spacePushedTime = 0;

    constructor(ctx, scales, ropes, objects) {
        this.ctx = ctx;
        this.scales = scales;
        this.ropes = ropes;
        this.objects = objects;
        console.log('$$$$', this);
    }

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
        // console.log('ev', this);
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, 640, 480);

        [...this.scales, ...this.ropes, ...this.objects].forEach(s => {
            s.draw(this.ctx);
            s.execute(frameTime);
        });

        let cDet = new CollisionDetection(this.objects);
        let collisions = cDet.getCollisions();

        collisions.forEach((c, i) => {
            // console.log('c', c);
            c.execute()
        });


        if (this.keysPressed.length > 0) {
            if (this.keysPressed.pop() == 'Space') {
                this.spaceDown = true;
            }
            this.keysPressed = [];
        }

        if(this.keysUp.length > 0) {
            if (this.keysUp.pop() == 'Space') {
                this.spaceDown = false;
                this.setStartV();                
            }
            this.keysUp = [];
        }

        if(this.spaceDown) {
            this.spacePushedTime+= frameTime;
            console.log('collected v', this.spacePushedTime);
        }
    }

    setStartV() {
        this.objects[0].vVector = [2, Math.floor(this.spacePushedTime / -100 )];
        console.log(this.objects[0].vVector);
    }
}