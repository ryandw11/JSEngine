/**
 * Handles Scenes in both 3D and 2D mode.
 */
class Scene {
    constructor() {
        this.listOfObjects = [];
    }
    add(obj) {
        this.listOfObjects.push(obj);
    }
    remove(obj) {
        this.listOfObjects.splice(this.listOfObjects.indexOf(obj), 1);
    }
    clear() {
        this.listOfObjects = [];
    }
}

export { Scene };