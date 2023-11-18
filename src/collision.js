import {Ball, Platform} from './objects.js';

export class CollisionDetection {
    objList;

    constructor(objList) {
        this.objList = objList;
    }

    getCollisions() {
        let collisions = [];

        let comparedAlready = [];

        for (let i = 0; i < this.objList.length; i++) {
            for (let j = 0; j < this.objList.length; j++) {
                if (i == j) continue;

                let key = `${i}--${j}`;

                if (comparedAlready.includes(key)) continue;
                
                comparedAlready.push(key);
                let myCollision = this.compare2(this.objList[i], this.objList[j]);
                if (myCollision) collisions.push(myCollision);
            }
        }

        return collisions;
    }

    compare2(o1, o2) {
        let [xStart1, yStart1] = o1.pos;
        let [xStart2, yStart2] = o2.pos;

        let xEnd1 = xStart1 + o1.width;
        let xEnd2 = xStart2 + o2.width;

        let yEnd1 = yStart1 + o1.width;
        let yEnd2 = yStart2 + o2.width;

        let xCollide = false;
        if (xEnd1 > xStart2 && xEnd1 < xEnd2) {
            xCollide = true;
        }
        if (xEnd2 > xStart1 && xEnd2 < xEnd1) {
            xCollide = true;
        }

        let yCollide = false;
        if (yEnd1 > yStart2 && yEnd1 < yEnd2) {
            yCollide = true;
        }
        if (yEnd2 > yStart1 && yEnd2 < yEnd1) {
            yCollide = true;
        }

        // console.log(xCollide, yCollide);
        if (yCollide && xCollide) {
                return new Collision([o1, o2])
        }
        return undefined;
    }
}

export class Collision {
    objList;
    constructor(objList) {
        this.objList = objList;
    }
    
    execute() {
        let moving;
        let platform;

        this.objList.forEach(o => {
            if (o instanceof Ball) {
                moving = o;
            }
            if (o instanceof Platform) {
                platform = o;
            }
        })

        moving.vVector[1] = 0;
        console.log('cccc', this);
    }


}