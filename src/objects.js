const BASICSPEED = 20;
const GRAVITY = BASICSPEED / 2;
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
        this.updatePosition(frameTime);
        this.updateV(frameTime);
    }

    
    updatePosition(frameTime) {
        let s = 1000 / frameTime;
        this.pos[0] += this.vVector[0] * (BASICSPEED / s);
        this.pos[1] += this.vVector[1] * (BASICSPEED / s);
    }

    updateV(frameTime) {
    }

    afterCollision(otherObject) {
    }

    getPos(obj) {
        return this.pos;
    }

    ballPlatformBendedCollision(otherObject) {
        let V = 3;
        let VProp = otherObject.height / otherObject.width;
        this.vVector = [V, V * VProp];

        if (otherObject instanceof PlatformBendedOther) {
            this.vVector = [V * -1, V * VProp];
        }
    }

    ballPlatformCollision(otherObject) {
        this.vVector[1] = 0;
    }

    ballPlaformStopCollision(otherObject) {
        this.vVector[0] = this.vVector[0] * -1;
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

    updateV(frameTime) {
        let s = 1000 / frameTime;
        this.vVector[1] += GRAVITY / s;
    }

    afterCollision(otherObject) {
        if (otherObject instanceof Platform) {
            if (otherObject instanceof PlatformBended) {
                this.ballPlatformBendedCollision(otherObject);
            } else {
                this.ballPlatformCollision(otherObject)
            }
        }

        if (otherObject instanceof PlatformStop) {
            this.plaformStopCollision(otherObject)
        }
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

        ctx.font = '12px monospace';
        ctx.fillStyle = 'black'
        ctx.fillText(`${Math.floor(this.pos[0])}, ${Math.floor(this.pos[1])}`, ...this.pos);

    }

    afterCollision(otherObject) {
        // console.log('CAT COLLIDE!');

        if (otherObject instanceof Platform) {
            if (otherObject instanceof PlatformBended) {
                this.ballPlatformBendedCollision(otherObject);

                // let V = 3;
                // let VProp = otherObject.height / otherObject.width;
                // this.vVector = [V, V * VProp];

                // if (otherObject instanceof PlatformBendedOther) {
                //     // this.vVector = [V * -1, V * VProp];
                // }

            } else {
                this.ballPlatformCollision(otherObject)
                // this.pos[1] -= 1;
                // this.vVector = [5, 0];
            }
        }

        if (otherObject instanceof PlatformStop) {
            this.plaformStopCollision(otherObject)
            // this.vVector[0] = this.vVector[0] * -1;
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
    isOther = false;


    constructor([x1, y1], [x2, y2]) {
        super([x1, y1]);
        this.posEnd = [x2, y2];
        this.width = this.posEnd[0] - this.pos[0];
        this.height = this.posEnd[1] - this.pos[1];
    }

    get getIsDown() {
        return this.posEnd[1] > this.pos[1];
    }

    draw(ctx) {
        ctx.strokeStyle = 'green';
        ctx.strokeRect(...this.pos, this.width, this.height);

        ctx.strokeStyle = 'blue';

        ctx.beginPath();

        if (!this.isOther) {
            ctx.moveTo(...this.pos);
            ctx.lineTo(...this.posEnd);
        } else {
            ctx.strokeStyle = 'red';
            ctx.moveTo(this.pos[0], this.posEnd[1]);
            ctx.lineTo(this.posEnd[0], this.pos[1]);
        }
        ctx.stroke();

        ctx.font = '12px monospace';
        ctx.fillStyle = 'black'
        ctx.fillText(`${Math.floor(this.pos[0])}, ${Math.floor(this.pos[1])}`, ...this.pos);
        ctx.fillText(`${this.width}, ${this.height}`, this.pos[0], this.pos[1] + 20);
        ctx.fillText(`${Math.floor(this.posEnd[0])}, ${Math.floor(this.posEnd[1])}`, ...this.posEnd);

    }

    getPos(obj) {
        if (obj.pos[0] > this.pos[0] + this.width) return this.pos;
        let [objPosX, objPosy] = obj.pos;
        let xRelativToMe = objPosX - this.pos[0];
        if (xRelativToMe < 0) {// || xRelativToMe) {
            return this.pos;
        }
        if (this.isOther) xRelativToMe = this.width - xRelativToMe;

        let addToY = Math.floor(this.height * xRelativToMe / this.width);

        // if (!this.getIsDown()) addToY *= -1;

        console.log('addToY', addToY);
        return [this.pos[0], this.pos[1] + addToY];
    }

}

export class PlatformBendedOther extends PlatformBended {
    constructor([x1, y1], [x2, y2]) {
        super([x1, y1], [x2, y2]);
        this.isOther = true;

    }
}

