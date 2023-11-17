
// const DIFF_CONST = 200;

export class Scale {
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
        this.pushLeft = 0;
        this.pushRight = 0
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

    get fDiffRatio() {
        if (this.fDiff == 0) return 0;
        return  (this.fDiff) / (this.wLeft + this.wRight);
        // return this.wLeft / this.wRight;
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

    getB(a, c) {
        let b = Math.sqrt(
            Math.pow(c, 2) - Math.pow(a, 2)
        );
        return b;
    }

    draw(ctx) {

        ctx.fillStyle = 'blue';
        ctx.fillRect(this.fulcrum[0] - 5, this.fulcrum[1] - 5, 10, 10);

        ctx.strokeStyle = 'pink';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(...this.leftXy);
        ctx.lineTo(...this.rightXy);
        ctx.stroke();

        ctx.fillRect(...this.leftXy, 7, 7);
        ctx.fillRect(...this.rightXy, 7, 7);

        ctx.fillStyle = 'red';
        ctx.fillRect(...this.wLeftXy, 5, 5);
        ctx.fillRect(...this.wRightXy, 5, 5);

        ctx.font = '15px monospace';
        ctx.fillText(`${Math.floor(this.wLeft)}`, ...this.wLeftXy);
        ctx.fillText(`${Math.floor(this.wRight)}`, ...this.wRightXy);

        ctx.font = '12px monospace';
        ctx.fillStyle = 'black'
        ctx.fillText(`${Math.floor(this.fLeft * this.torqueLeft)} + ${this.pushLeft}`, this.wLeftXy[0], this.leftXy[1] + 20);
        ctx.fillText(`${Math.floor(this.fRight * this.torqueRight)} + ${this.pushRight}`, this.wRightXy[0], this.wRightXy[1] + 20);


        ctx.fillStyle = 'pink';
        ctx.fillText(`fDiff: ${Math.floor(this.fDiff)}`, this.fulcrum[0], this.fulcrum[1] + 20);
        ctx.fillText(`fDiffR ${Math.floor(this.fDiffRatio * 100) / 100}`, this.fulcrum[0], this.fulcrum[1] + 30);
        ctx.fillText(`leftLift ${Math.floor(this.leftLift)}`, this.fulcrum[0], this.fulcrum[1] + 50);
    }

    behave() {
        this.setLift();
        // this.wLeftPer = this.wLeftPer * 0.95;
    }

    setLift() {
        const LIFT_CONTANT = 100;
        this.leftLift = LIFT_CONTANT * (this.fDiffRatio)
    }
}


