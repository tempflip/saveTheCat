
const DIFF_CONST = 200;
class Scale {
    torqueLeft;
    torqueRight;
    absTorqueRight;
    absTorqueLeft;
    leftLift;

    fLeft;
    fRight;

    fulcrum;

    getFRight() {
        return this.torqueLeft * this.fLeft / this.torqueRight;
    }

    get fDiff() { // how much more power on the left side => add to the left y
        return this.torqueLeft * this.fLeft - this.torqueRight * this.fRight;
    }
    
    get leftXy() {
        let a = this.leftLift;
        let c = this.torqueLeft;
        let b = Math.sqrt(
            Math.pow(c, 2) - Math.pow(a, 2)
        );

        return [this.fulcrum[0] - b, this.fulcrum[1] - a];
    }

    get rightXy() {
        let a = this.leftLift;
        let c = this.torqueRight;

        let b = Math.sqrt(
            Math.pow(c, 2) - Math.pow(a, 2)
        );
        return [this.fulcrum[0] + b, this.fulcrum[1] + a];
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

        ctx.fillRect(...this.leftXy, 5,5);
        ctx.fillRect(...this.rightXy, 5,5);


        ctx.font = '15px monospace';
        ctx.fillText(`${this.torqueLeft * this.fLeft}`, ...this.leftXy);
        ctx.fillText(`${this.torqueRight * this.fRight}`, ...this.rightXy);

    }
}

let s = new Scale();
s.torqueLeft = 100;
s.torqueRight = 100;
s.leftLift = 1;

s.fulcrum = [200,200];
s.fLeft = 100;
s.fRight = 50;

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
 


    s.draw(ctx);
    s.leftLift+=3;

};

const main = () => {
    const canvas = document.querySelector('#can');
    const ctx = canvas.getContext('2d');

    let interval = setInterval(loop(ctx), 500);

}
main();