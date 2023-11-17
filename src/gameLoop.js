export class GameLoop {

    ctx;
    scales;
    ropes;

    keysPressed = [];

    constructor(ctx, scales, ropes) {
        this.ctx = ctx;
        this.scales = scales;
        this.ropes = ropes;
        console.log('$$$$', this);
    }

    registerKey(ev) {
        this.keysPressed.push(ev.code);
    }

    loop(ev) {
        // console.log('ev', this);
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, 640, 400);

        // ctx.strokeStyle = 'black';
        // ctx.lineWidth = 2;
        // ctx.beginPath();
        // ctx.moveTo(100, 0);
        // ctx.lineTo(100, 400);
        // ctx.stroke();

        // ctx.beginPath();
        // ctx.moveTo(300, 0);
        // ctx.lineTo(300, 400);
        // ctx.stroke();


        this.scales.forEach(s => {
            s.draw(this.ctx);
            s.behave();
        });
        this.ropes.forEach(r => {
            r.draw(this.ctx);
            r.execute();
        });

        // s.draw(ctx);
        // s2.draw(ctx);
        // rope.draw(ctx);

        // rope.execute();
        // s.behave();
        // s2.behave();

        if (this.keysPressed.length > 0) {
            console.log('.');
            // this.scales[0].pushLeft += 100;
            this.scales[0].pushRight += 100;
            this.scales[1].pushLeft += 100;
            this.keysPressed = [];

        }

        // s.pushLeft += 10;
    }
}