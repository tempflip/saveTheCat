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

export class CollisioDetection {
    objList;

    constructor(objList) {
        this.objList = objList;
    }

    getCollisions() {

        let [xStart1, yStart1] = this.objList[0].pos;
        let [xStart2, yStart2] = this.objList[1].pos;
        
        let xEnd1 = xStart1 + this.objList[0].width;
        let xEnd2 = xStart2 + this.objList[1].width;

        let yEnd1 = yStart1 + this.objList[0].width;
        let yEnd2 = yStart2 + this.objList[1].width;


        let xCollide = false;
        if (xEnd1 > xStart2 && xEnd1 < xEnd2) {
            xCollide = true;
        }
        if (xEnd2 > xStart1 &&  xEnd2 < xEnd1) {
            xCollide = true;
        }

        let yCollide = false;
        if (yEnd1 > yStart2 && yEnd1 < yEnd2) {
            yCollide = true;
        }
        if (yEnd2 > yStart1 &&  yEnd2 < yEnd1) {
            yCollide = true;
        }

        // if (xCollide && yCollide) alert('ah!');


    }

}