class AnyObject {
    pos;
    vVector;
    isMoving;
    id;

    constructor([x, y]) {
        this.pos = [x, y];
        this.vVector = [0, 0];
        this.isMoving = false;
        this.id = 'id_' + Math.floor(Math.random() * 100000);
    }

    execute(frameTime) {
        let s = 1000 / frameTime;
        this.pos[0] += this.vVector[0];
        this.pos[1] += this.vVector[1];
    }

    afterCollision(otherObject) {
        // console.log('its a collision!');
    }

    getPos(obj) {
        return this.pos;
    }

}

export class Ball extends AnyObject {

    constructor([x, y]) {
        super([x, y]);
        this.isMoving = true;
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

export class Cat extends AnyObject {
    constructor([x, y]) {
        super([x, y]);
        this.isMoving = true;
        this.width = 30;
        this.height = 25;
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(...this.pos, this.width, this.height);
    }

    afterCollision(otherObject) {
        // console.log('CAT COLLIDE!');

        if (otherObject instanceof Platform) {
            if (otherObject instanceof PlatformBended) {
                let VProp = otherObject.height / otherObject.width;
                let V = 7;
                this.vVector = [V, V*VProp];
            } else {
                this.pos[1] -= 1;
                this.vVector = [5, 0];
            }
        }

        if (otherObject instanceof PlatformStop) {
            // alert('x');
            this.vVector[0] = this.vVector[0] * -1;
            console.log('change v', this.vVector);
            // this.pos[0] -= 20;
        }

    }
}

export class Platform extends AnyObject {
    constructor([x, y], w, h) {
        super([x, y]);
        this.width = w;
        this.height = h;
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(...this.pos, this.width, this.height);
    }
}

export class PlatformStop extends AnyObject {
    constructor([x, y], w, h) {
        super([x, y]);
        this.width = w;
        this.height = h;
    }

    draw(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(...this.pos, this.width, this.height);
    }
}

export class PlatformBended extends Platform {
    posEnd;

    constructor([x1, y1], [x2, y2]) {
        super([x1, y1]);
        this.posEnd = [x2, y2];
        this.width = this.posEnd[0] - this.pos[0];
        this.height = this.posEnd[1] - this.pos[1];
    }

    draw(ctx) {
        ctx.strokeStyle = 'green';
        ctx.strokeRect(...this.pos, this.width, this.height);

        ctx.strokeStyle = 'blue';

        ctx.beginPath();
        ctx.moveTo(...this.pos);
        ctx.lineTo(...this.posEnd);
        ctx.stroke();
    }

    getPos(obj) {
        let [objPosX, objPosy] = obj.pos;
        let xRelativToMe = objPosX - this.pos[0];
        if (xRelativToMe < 0 || xRelativToMe > this.width) return this.pos;
        let addToY = Math.floor(this.height * xRelativToMe / this.width);
        return [this.pos[0], this.pos[1] + addToY];
    }
}

