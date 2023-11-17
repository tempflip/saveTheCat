export class Rope {
    scale1;
    scale2;

    s1Left;
    s2Left;

    constructor(scale1, scale2) {

        this.s1Left = true;
        this.s2Left = true;

        
        this.scale1 = scale1;
        this.scale2 = scale2;
    }

    execute() {
        if (this.s1Left == true) {
            if (this.s2Left == true) {
                this.scale2.pushLeft = this.scale1.fDiff;
            }

            if (this.s2Left == false) {
                this.scale2.pushRight = this.scale1.fDiff;
            }
        }

        if (this.s1Left == false) {
            if (this.s2Left == true) {
                this.scale2.pushLeft = - this.scale1.fDiff;
            }

            if (this.s2Left == false) {
                this.scale2.pushRight = - this.scale1.fDiff;
            }
        }

        
    }

    draw(ctx) {
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = 'blue';
        ctx.beginPath();

        if (this.s1Left == true) {
            ctx.moveTo(...this.scale1.leftXy);
            if (this.s2Left == true) {
                ctx.lineTo(...this.scale2.leftXy);
            }

            if (this.s2Left == false) {
                ctx.lineTo(...this.scale2.rightXy);
            }
        }

        if (this.s1Left == false) {
            ctx.moveTo(...this.scale1.rightXy);
            if (this.s2Left == true) {
                ctx.lineTo(...this.scale2.leftXy);
            }

            if (this.s2Left == false) {
                ctx.lineTo(...this.scale2.rightXy);
            }
        }

        ctx.stroke();

    }

}