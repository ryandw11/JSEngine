import { Vector3D, Collider3D, ObjectManager } from "./ThreeEngine.js";
import { EventHandler, UpdateEvent } from "../MainEngine/GameEngine.js";
class Collision {
    onRegister(obj) {
        this.obj = obj;
    }
}

class BoxCollider extends Collision {
    constructor() {
        super();
        this.lastMovement = new Vector3D(0, 0, 0);
        this.deltaMovement = new Vector3D(0, 0, 0);
    }

    onUpdate() {
        this.deltaMovement = this.obj.getPosition().subtract(this.lastMovement);
        this.lastMovement = this.obj.getPosition();
        var objs = getObjectsWithCollision(this.obj);
        if (objs == []) return;
        if (Collider3D.isCollidingList(this.obj, objs)) {
            let curDelt = new Vector3D(0, 0, 0).subtract(this.deltaMovement);
            this.obj.translateBy(curDelt);
            this.obj.setPosition(this.obj.getPosition().add(curDelt));
        }
    }

}

function getObjectsWithCollision(inst) {
    var output = [];
    for (let i in ObjectManager.listOfObject) {
        if (ObjectManager.listOfObject[i] == inst) continue;
        if (ObjectManager.listOfObject[i].hasCollision()) output.push(ObjectManager.listOfObject[i]);
    }
    return output;
}

export { Collision, BoxCollider };