/**
 * Object Based Three.js Game Engine.
 * Requires Three.js and GameEngine.js to operate.
 * (This 3D engine was developed at the start of the project.)
 * @author Ryandw11
 * @version 1.3
*/
import { EventHandler, UpdateEvent, GameEngine, GameObjects, MouseDownEvent, MouseMoveEvent, KeyHandler } from '../MainEngine/GameEngine.js';
import * as THREE from '../../three/src/Three.js';

var oldTime = 0;

/**
 * The main ThreeEngine class.
 */
class ThreeEngine {
    constructor() { }

    static scene;
    static renderer;
    static camera;
    static ui;
    static alive = true;
    static lighting = false;

    /**
     * Start the engine.
     */
    start() {
        ThreeEngine.scene = new THREE.Scene();
        ThreeEngine.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        ThreeEngine.renderer = new THREE.WebGLRenderer();
        var renderer = ThreeEngine.renderer;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.autoClear = false;
        document.body.appendChild(renderer.domElement);
        this.canvas = renderer.domElement;
        ThreeEngine.alive = true;
        requestAnimationFrame(animate);
        ThreeEngine.ui = new UI();
        ThreeEngine.renderer.render(ThreeEngine.scene, ThreeEngine.camera);
        ThreeEngine.renderer.render(ThreeEngine.getUI().scene, ThreeEngine.getUI().camera);
        GameEngine.canvas = ThreeEngine.ui.canvas.getContext('2d');
        window.addEventListener("keydown", function (e) {
            if (!KeyHandler.keysDown.includes(e.key))
                KeyHandler.keysDown.push(e.key);
        });
        window.addEventListener("keyup", function (e) {
            KeyHandler.keysDown.splice(KeyHandler.keysDown.indexOf(e.key), 1);
        });
        window.addEventListener("mousedown", e => {
            var canvBound = ThreeEngine.ui.canvas.getBoundingClientRect();
            var x = e.clientX - canvBound.left;
            var y = e.clientY - canvBound.top;
            if (x < 0 || x > GameEngine.width) return;
            if (y < 0 || y > GameEngine.height) return;
            EventHandler.fireEvent(MouseDownEvent, new MouseDownEvent(x, y));
        });

        window.addEventListener("mousemove", e => {
            var canvBound = ThreeEngine.ui.canvas.getBoundingClientRect();
            var x = e.clientX - canvBound.left;
            var y = e.clientY - canvBound.top;
            if (x < 0 || x > GameEngine.width) return;
            if (y < 0 || y > GameEngine.height) return;
            EventHandler.fireEvent(MouseMoveEvent, new MouseMoveEvent(x, y));
        });
    }

    /**
     * Stop the engine.
     */
    stop() {
        ThreeEngine.alive = false;
    }

    /**
     * The UI component.
     */
    static getUI() {
        return ThreeEngine.ui;
    }

    enableLighting(light) {
        ThreeEngine.lighting = light;
    }

    /**
     * Load data from the scene.
     * @param {Scene} scene The scene to change to.
     * @param {boolean} reset If all data in the game window should be cleared.
     */
    setScene(scene, reset = true) {
        if (reset) {
            while (ThreeEngine.scene.children.length > 0) {
                ThreeEngine.scene.remove(ThreeEngine.scene.children[0]);
            }
        }
        else {
            for (let i in this.currentScene.listOfObjects) {
                ThreeEngine.scene.remove(this.currentScene.listOfObjects[i].getMesh());
            }
        }
        for (let i in scene.listOfObjects) {
            ThreeEngine.scene.add(scene.listOfObjects[i].getMesh());
        }
        this.currentScene = scene;
    }

    /**
     * Update the scene.
     * @param {boolean} reset If all data in the game window should be cleared.
     */
    updateCurrentScene(reset = false) {
        if (reset) {
            while (ThreeEngine.scene.children.length > 0) {
                ThreeEngine.scene.remove(ThreeEngine.scene.children[0]);
            }
        }
        else {
            for (let i in this.currentScene.listOfObjects) {
                ThreeEngine.scene.remove(this.currentScene.listOfObjects[i].getMesh());
            }
        }
        for (let i in this.currentScene.listOfObjects) {
            ThreeEngine.scene.add(this.currentScene.listOfObjects[i].getMesh());
        }
    }

    /**
     * Get the current scene.
     */
    getCurrentScene() {
        return this.currentScene;
    }

    /**
     * Clear all objects from the game.
     */
    clear() {
        while (ThreeEngine.scene.children.length > 0) {
            ThreeEngine.scene.remove(ThreeEngine.scene.children[0]);
        }
    }
}

/**
 * Handle Vector 3D calculations
 */
class Vector3D {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getZ() {
        return this.z;
    }
    /**
     * Add a vector or 3 numbers.
     * @param {*} vec 
     * @param {*} y 
     * @param {*} z 
     */
    add(vec, y = 0, z = 0) {
        if (vec instanceof Vector3D) {
            this.x += vec.x;
            this.y += vec.y;
            this.z += vec.z;
        } else {
            this.x += vec;
            this.y += y;
            this.z += z;
        }
        return this;
    }
    /**
     * Subtract a vector or 3 numbers.
     * @param {*} vec A vector or number
     * @param {Number} y A number (not required if a vector is used in first param)
     * @param {Number} z A number (not required if a vector is used in first param)
     */
    subtract(vec, y = 0, z = 0) {
        if (vec instanceof Vector3D) {
            this.x -= vec.x;
            this.y -= vec.y;
            this.z -= vec.z;
        } else {
            this.x -= vec;
            this.y -= y;
            this.z -= z;
        }
        return this;
    }
}

/**
 * Handles the Game Camera
 */
class Camera {
    static setPosition(vec, y = 0, z = 0) {
        if (vec instanceof Vector3D) {
            ThreeEngine.camera.position.x = vec.getX();
            ThreeEngine.camera.position.y = vec.getY();
            ThreeEngine.camera.position.z = vec.getZ();
        } else {
            ThreeEngine.camera.position.x = vec;
            ThreeEngine.camera.position.y = y;
            ThreeEngine.camera.position.z = z;
        }
    }
    static translateBy(vec, y = 0, z = 0) {
        if (vec instanceof Vector3D) {
            ThreeEngine.camera.position.x += vec.getX();
            ThreeEngine.camera.position.y += vec.getY();
            ThreeEngine.camera.position.z += vec.getZ();
        } else {
            ThreeEngine.camera.position.x += vec;
            ThreeEngine.camera.position.y += y;
            ThreeEngine.camera.position.z += z;
        }
    }
    static getPosition() {
        return new Vector3D(ThreeEngine.camera.position.x, ThreeEngine.camera.position.y, ThreeEngine.camera.position.z);
    }

    static setRotation(vec) {
        ThreeEngine.camera.rotation.x = vec.getX();
        ThreeEngine.camera.rotation.y = vec.getY();
        ThreeEngine.camera.rotation.z = vec.getZ();
    }
    static rotateBy(vec) {
        ThreeEngine.camera.rotation.x += vec.getX();
        ThreeEngine.camera.rotation.y += vec.getY();
        ThreeEngine.camera.rotation.z += vec.getZ();
    }
    static getRotation() {
        return new Vector3D(ThreeEngine.camera.rotation.x, ThreeEngine.camera.rotation.y, ThreeEngine.camera.rotation.z);
    }
}

/**
 * Handles Collision in a three-dimensonal space.
 */
class Collider3D {
    /**
     * If an object is colliding with another
     * @param {*} obj1 object 1
     * @param {*} obj2 object 2
     */
    static isColliding(obj1, obj2) {
        for (var vertexIndex = 0; vertexIndex < obj1.getMesh().geometry.vertices.length; vertexIndex++) {
            var localVertex = obj1.getMesh().geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4(obj1.getMesh().matrix);
            var directionVector = globalVertex.sub(obj1.getMesh().position);

            var ray = new THREE.Raycaster(obj1.getMesh().position, directionVector.clone().normalize());
            var collisionResults = ray.intersectObjects([obj2.getMesh()]);
            if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
                return true;
            }
        }
    }

    /**
     * If collding with a list of objects.
     * @param {Object} obj1 
     * @param {Array} list 
     */
    static isCollidingList(obj1, list) {
        for (var vertexIndex = 0; vertexIndex < obj1.getMesh().geometry.vertices.length; vertexIndex++) {
            var localVertex = obj1.getMesh().geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4(obj1.getMesh().matrix);
            var directionVector = globalVertex.sub(obj1.getMesh().position);

            var ray = new THREE.Raycaster(obj1.getMesh().position, directionVector.clone().normalize());
            var collisionResults = ray.intersectObjects(Utils3D.convertGObjecttoMeshList(list));
            if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
                return true;
            }
        }
    }

    /**
     * Returns an array of objects that the object1 is colldiing with if any.
     * @param {Object} obj1  Object 1
     * @param {Array} list The list of objects.
     */
    static getCollidingObjects(obj1, list) {
        let output = [];
        for (let v in list) {
            if (Collider3D.isColliding(obj1, list[v])) {
                output.push(list[v]);
            }
        }
        return output;
    }
}

/**
 * Handles the User Interface.
 */
class UI {
    constructor() {
        var canvas = document.createElement('canvas');
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        GameEngine.canvas = this.canvas.getContext('2d');
        this.canvas.getContext('2d').fillStyle = "rgba(245,245,245,0.75)";
        this.canvas.getContext('2d').fillText('Initializing...', width / 2, height / 2);

        var hudTexture = new THREE.Texture(this.canvas);
        hudTexture.needsUpdate = true;
        this.hudTexture = hudTexture;
        this.hudTexture.minFilter = THREE.LinearFilter;

        var material = new THREE.MeshBasicMaterial({ map: this.hudTexture });
        material.transparent = true;

        var width = window.innerWidth;
        var height = window.innerHeight;

        var sceneHUD = new THREE.Scene();
        var cameraHud = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0, 30);
        this.scene = sceneHUD;
        this.camera = cameraHud;

        this.material = material;
        var planeGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
        var plane = new THREE.Mesh(planeGeometry, this.material);
        this.scene.add(plane);
    }
    draw() {

    }
}

class Utils3D {
    /**
     * Convert a list of gameobjects to a list of meshes.
     * @param {*} list 
     */
    static convertGObjecttoMeshList(list) {
        var output = [];
        for (var l in list) {
            output.push(list[l].getMesh());
        }
        return output;
    }
}

/**
 * The cube shape
 */
class Cube {
    /**
     * Construct the cube.
     * @param {*} vSize The size of the cube (**required**)
     * @param {*} material The material used.
     */
    constructor(vSize, material = {
        color: 0x00ff00
    }) {
        this.geom = new THREE.BoxGeometry(vSize.getX(), vSize.getY(), vSize.getZ());
        if (!ThreeEngine.lighting)
            this.material = new THREE.MeshBasicMaterial(material);
        else
            this.material = new THREE.MeshPhongMaterial(material);
        this.cube = new THREE.Mesh(this.geom, this.material);
    }

    setPosition(vec, y = 0, z = 0) {
        if (vec instanceof Vector3D) {
            this.cube.position.x = vec.getX();
            this.cube.position.y = vec.getY();
            this.cube.position.z = vec.getZ();
        } else {
            this.cube.position.x = vec;
            this.cube.position.y = y;
            this.cube.position.z = z;
        }
        return this;
    }
    setSize(vec) {
        this.cube.scale.x = vec.getX();
        this.cube.scale.y = vec.getY();
        this.cube.scale.z = vec.getZ();
        return this;
    }
    setRotation(vec) {
        this.cube.rotation.x = vec.getX();
        this.cube.rotation.y = vec.getY();
        this.cube.rotation.z = vec.getZ();
        return this;
    }
    setMaterial(material) {
        this.cube.material = new THREE.MeshBasicMaterial(material);
    }
    translateBy(vec) {
        this.cube.position.x += vec.getX();
        this.cube.position.y += vec.getY();
        this.cube.position.z += vec.getZ();
        return this;
    }
    rotateBy(vec) {
        this.cube.rotation.x += vec.getX();
        this.cube.rotation.y += vec.getY();
        this.cube.rotation.z += vec.getZ();
        return this;
    }
    getPosition() {
        return new Vector3D(this.cube.position.x, this.cube.position.y, this.cube.position.z);
    }
    getRotation() {
        return new Vector3D(this.cube.rotation.x, this.cube.rotation.y, this.cube.rotation.z);
    }
    getSize() {
        return new Vector3D(this.cube.scale.x, this.cube.scale.y, this.cube.scale.z);
    }
    getMesh() {
        return this.cube;
    }

    /**
     * Display the cube.
     */
    show() {
        ThreeEngine.scene.add(this.cube);
        return this;
    }

    /**
     * Hide the cube.
     */
    hide() {
        ThreeEngine.scene.remove(this.cube);
        return this;
    }
}

/**
 * The Sphere object.
 */
class Sphere {
    /**
     * Construct the sphere (No params are required)
     * @param {*} radius The radius of the sphere
     * @param {*} widthSeg The width segmant (Default 32)
     * @param {*} heightSeg The height segmant (Default 32)
     * @param {*} material The material
     */
    constructor(radius = 1, widthSeg = 32, heightSeg = 32, material = {
        color: 0x8E40BC
    }) {
        this.geom = new THREE.SphereGeometry(radius, widthSeg, heightSeg);
        if (!ThreeEngine.lighting)
            this.material = new THREE.MeshBasicMaterial(material);
        else
            this.material = new THREE.MeshPhongMaterial(material);
        this.sphere = new THREE.Mesh(this.geom, this.material);
    }

    setPosition(vec) {
        this.sphere.position.x = vec.getX();
        this.sphere.position.y = vec.getY();
        this.sphere.position.z = vec.getZ();
    }
    setSize(vec) {
        this.sphere.scale.x = vec.getX();
        this.sphere.scale.y = vec.getY();
        this.sphere.scale.z = vec.getZ();
    }
    setRotation(vec) {
        this.sphere.rotation.x = vec.getX();
        this.sphere.rotation.y = vec.getY();
        this.sphere.rotation.z = vec.getZ();
    }
    translateBy(vec) {
        this.sphere.position.x += vec.getX();
        this.sphere.position.y += vec.getY();
        this.sphere.position.z += vec.getZ();
    }
    rotateBy(vec) {
        this.sphere.rotation.x += vec.getX();
        this.sphere.rotation.y += vec.getY();
        this.sphere.rotation.z += vec.getZ();
    }
    getPosition() {
        return new Vector3D(this.sphere.position.x, this.sphere.position.y, this.sphere.position.z);
    }
    getRotation() {
        return new Vector3D(this.sphere.rotation.x, this.sphere.rotation.y, this.sphere.rotation.z);
    }
    getSize() {
        return new Vector3D(this.sphere.scale.x, this.sphere.scale.y, this.sphere.scale.z);
    }
    getMesh() {
        return this.sphere;
    }
    show() {
        ThreeEngine.scene.add(this.sphere);
        return this;
    }
    hide() {
        ThreeEngine.scene.remove(this.sphere);
        return this;
    }
}

/**
 * Make 3D Text.
 * @deprecated No longer in use. Do not use.
 */
class Text3 {
    constructor(text = "Default Text", parameters = { color: 0x00FF11 }, font = '../Fonts/helvetiker_regular.typeface.json') {
        var loader = new THREE.FontLoader();
        var inst = this;
        loader.load(font, function (font) {
            inst.text = text;
            inst.parameters = parameters;
            inst.geom = new THREE.TextGeometry(inst.text, { font: font, size: 80 });
            ThreeEngine.add(inst.geom);
        });
    }
}

function animate() {
    if (ThreeEngine.alive) requestAnimationFrame(animate);
    EventHandler.fireEvent(UpdateEvent, new UpdateEvent());
    ThreeEngine.getUI().canvas.getContext('2d').clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i in GameObjects.getGameObjects()) {
        GameObjects.getGameObjects()[i].draw();
    }

    ThreeEngine.ui.hudTexture.needsUpdate = true;

    ThreeEngine.renderer.render(ThreeEngine.scene, ThreeEngine.camera);
    ThreeEngine.renderer.render(ThreeEngine.ui.scene, ThreeEngine.ui.camera);

    var currentTime = Date.now();
    GameEngine.deltaTime = currentTime - oldTime;
    oldTime = currentTime;
}

export { ThreeEngine, Vector3D, Camera, Collider3D, UI, Cube, Sphere };