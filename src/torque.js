
const DIFF_CONST = 200;
class Scale {
    torqueLeft;
    torqueRight;
    leftLift;

    wLeftPer;
    wRightPer;

    fulcrum;

    fLeft_;
    fRight_;

    pushLeft;
    pushRight;


    constructor() {
        this.wLeftPer = 1;
        this.wRightPer = 1;
        this.pushLeft=0;
        this.pushRight=0        
    }

    set fLeft(v) {
        this.fLeft_ = v;
    }

    get fLeft() {
        return this.fLeft_ * this.wLeftPer;
    }

    set fRight(v) {
        this.fRight_ = v;
    }

    get fRight() {
        return this.fRight_ * this.wRightPer;
    }

    get wLeft() {
        return this.torqueLeft * this.fLeft + this.pushLeft;
    }

    get wRight() {
        return this.torqueRight * this.fRight + this.pushRight;
    }

    get fDiff() { // how much more power on the left side => add to the left y
        return this.wLeft - this.wRight;
    }
    
    get leftXy() {
        let b = this.getB(this.leftLift, this.torqueLeft);
        return [this.fulcrum[0] - b, this.fulcrum[1] - this.leftLift];
    }

    get rightXy() {
        let b = this.getB(this.leftLift, this.torqueRight);
        return [this.fulcrum[0] + b, this.fulcrum[1] + this.leftLift];
    }

    get wLeftXy() {
        let b = this.getB(this.leftLift * this.wLeftPer, this.torqueLeft * this.wLeftPer);
        return [this.fulcrum[0] - b, this.fulcrum[1] - this.leftLift * this.wLeftPer];
    }

    get wRightXy() {
        let b = this.getB(this.leftLift * this.wRightPer, this.torqueRight * this.wRightPer);
        return [this.fulcrum[0] + b, this.fulcrum[1] + this.leftLift * this.wRightPer];
    }

    getB(a,c) {
        let b = Math.sqrt(
            Math.pow(c, 2) - Math.pow(a, 2)
        );
        return b;
    }

    draw(ctx) {

        ctx.fillStyle = 'blue';
        ctx.fillRect(this.fulcrum[0]-5, this.fulcrum[1]-5, 10, 10);

        ctx.strokeStyle = 'pink';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(...this.leftXy);
        ctx.lineTo(...this.rightXy);
        ctx.stroke();

        ctx.fillRect(...this.leftXy, 7,7);
        ctx.fillRect(...this.rightXy, 7,7 );

        ctx.fillStyle = 'red';
        ctx.fillRect(...this.wLeftXy, 5,5);
        ctx.fillRect(...this.wRightXy, 5,5);

        ctx.font = '15px monospace';
        ctx.fillText(`${Math.floor(this.wLeft)}`, ...this.wLeftXy);
        ctx.fillText(`${Math.floor(this.wRight)}`, ...this.wRightXy);

        ctx.font = '12px monospace';
        ctx.fillStyle = 'black'
        ctx.fillText(`${Math.floor(this.fLeft * this.torqueLeft)} + ${this.pushLeft}`, this.wLeftXy[0], this.leftXy[1]+20);
        ctx.fillText(`${Math.floor(this.fRight * this.torqueRight)} + ${this.pushRight}`, this.wRightXy[0], this.wRightXy[1]+20);


        ctx.fillStyle = 'pink';
        ctx.fillText(`${Math.floor(this.fDiff)}`, this.fulcrum[0], this.fulcrum[1] + 20);
    }

    behave() {
        this.setLift();
        // this.wLeftPer = this.wLeftPer * 0.95;
    }

    setLift() {
        this.leftLift = -1 * this.fDiff * 0.01;
    }
}

class Rope {
    scale1;
    scale2;

    constructor(scale1, scale2) {
        this.scale1 = scale1;
        this.scale2 = scale2;
    }

    execute() {
        this.scale2.pushLeft = - this.scale1.fDiff;
    }

}

let s = new Scale();
s.torqueLeft = 100;
s.torqueRight = 100;

s.fulcrum = [200,150];
s.fLeft = 110;
s.fRight = 100;

let s2 = new Scale();
s2.torqueLeft = 100;
s2.torqueRight = 120;

s2.fulcrum = [400,300];
s2.fLeft = 5;
s2.fRight = 5;
s2.pushLeft = 0;

let rope = new Rope(s, s2);

const loop = (ctx) => () => {

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 640, 400);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, 0);
    ctx.lineTo(100, 400);
    ctx.stroke();


    ctx.beginPath();
    ctx.moveTo(300, 0);
    ctx.lineTo(300, 400);
    ctx.stroke();
 
    rope.execute();
    s.draw(ctx);
    s2.draw(ctx);
    s.behave();
    s2.behave();

    s.pushLeft+=100;
};

const main = () => {
    const canvas = document.querySelector('#can');
    const ctx = canvas.getContext('2d');

    let interval = setInterval(loop(ctx), 500);

}
main();