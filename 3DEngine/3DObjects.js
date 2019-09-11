import * as THREE from '../../three/src/Three.js';
import { Vector3D, ThreeEngine, ObjectManager } from './ThreeEngine.js';
import { Collision } from './CollisionManager.js';
/**
 * Holds 3D Objects.
 * @author Ryandw11
 * @since 1.1.0
 */
class GameObject {
    /**
     * Set the type of collision on an object.
     * @param {Collision} collider 
     */
    setCollision(collider) {
        this.collision = collider;
        this.collision.onRegister(this);
    }
    /**
     * Get the collision of an object.
     * @returns the collision
     */
    getCollision() {
        return this.collision;
    }
    /**
     * If the object has collisions.
     */
    hasCollision() {
        return this.collision != null && this.collision != undefined;
    }
}

/**
 * The cube shape
 */
class Cube extends GameObject {
    /**
     * Construct the cube.
     * @param {*} vSize The size of the cube (**required**)
     * @param {*} material The material used.
     */
    constructor(vSize, material = {
        color: 0x00ff00
    }) {
        super();
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
        ObjectManager.add(this);
        return this;
    }

    /**
     * Hide the cube.
     */
    hide() {
        ObjectManager.remove(this);
        return this;
    }
}

/**
 * The Sphere object.
 */
class Sphere extends GameObject {
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
        super();
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
        ObjectManager.add(this);
        return this;
    }
    hide() {
        ObjectManager.remove(this);
        return this;
    }
}

export { Cube, Sphere, GameObject };