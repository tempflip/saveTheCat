class AnyObject {
    pos;
    vVector;
    constructor([x, y]) {
        this.pos = [x, y];
        this.vVector = [0,0];
    }

    execute(frameTime) {
        let s = 1000 / frameTime;
        this.pos[0] += this.vVector[0];
        this.pos[1] += this.vVector[1];
    }


}

export class Ball extends AnyObject {

    constructor([x, y]) {
        super([x,y]);
        this.r = 20;
        this.width = this.r;
        this.height = this.r;
    }

    draw(ctx) {
        ctx.fillStyle = 'brown';
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.arc(...this.pos, this.r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }

}

export class Platform extends AnyObject {
    constructor([x, y], w, h) {
        super([x,y]);
        this.width = w;
        this.height = h;
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(...this.pos, this.width, this.height);
    }
}