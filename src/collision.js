import { Ball, Platform, PlatformStop } from './objects.js';

export class CollisionDetection {
    objList;

    constructor(objList) {
        this.objList = objList;
    }

    getCollisions() {
        let collisions = [];

        for (let i = 0; i < this.objList.length; i++) {
            for (let j = 0; j < this.objList.length; j++) {
                if (i == j) continue;
                // comparedAlready.push(key);
                let myCollision = this.compare2(this.objList[i], this.objList[j]);
                if (myCollision) {
                    collisions.push(myCollision);
                }
            }
        }
        collisions = this.cleanDuplicateCollisions(collisions);
        return collisions;
    }

    compare2(o1, o2) {
        let [xStart1, yStart1] = o1.getPos(o2);
        let [xStart2, yStart2] = o2.getPos(o1);

        let xEnd1 = xStart1 + o1.width;
        let xEnd2 = xStart2 + o2.width;

        let yEnd1 = yStart1 + o1.height;
        let yEnd2 = yStart2 + o2.height;

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

    cleanDuplicateCollisions(collisions) {
        if (collisions.length == 0) return collisions;
        console.log('collision!');

        if (collisions.length > 0) {
            let firstEqSecond = collisions[0].objList[0].id == collisions[1].objList[1].id;
            let secondEqFirst = collisions[0].objList[1].id == collisions[1].objList[0].id;
            // console.log('ids', firstEqSecond, secondEqFirst);
            if (collisions[0].objList[0] instanceof PlatformStop
                || collisions[0].objList[1] instanceof PlatformStop) {


                // console.log('PlatformStop collisions', collisions.length);
                // console.log('PlatformStop collisions:', collisions);
                collisions.pop();

            }

        }
        return collisions;
    }
}

export class Collision {
    objList;
    constructor(objList) {
        this.objList = objList;
    }

    execute() {
        let moving;
        let notMoving;

        this.objList.forEach(o => {
            if (o.isMoving) {
                moving = o;
            } else {
                notMoving = o;
            }
        });
        if (moving == null) return;

        moving.vVector[1] = 0;

        moving.afterCollision(notMoving);
        notMoving.afterCollision(moving);
    }


}