import * as tengine from './ThreeEngine.js';
import * as THREE from '../../three/src/Three.js';

class Light {
    constructor(color = 0xff0000, intensity = 1, distance = 100) {
        this.light = new THREE.PointLight(color, intensity, distance);
    }

    setPosition(vec) {
        this.light.position.set(vec.getX(), vec.getY(), vec.getZ());
        return this;
    }

    getPosition() {
        return new tengine.Vector3D(this.light.position.x, this.light.position.y, this.light.position.z);
    }

    getMesh() {
        return this.light;
    }

    show() {
        tengine.ThreeEngine.scene.add(this.light);
    }

    hide() {
        tengine.ThreeEngine.scene.remove(this.light);
    }
}

class BackgroundLight {
    constructor(color = 0xFFFFFF, intensity = 1) {
        this.light = new THREE.AmbientLight(color, intensity);
    }

    getMesh() {
        return this.light;
    }

    show() {
        tengine.ThreeEngine.scene.add(this.light);
    }
    hide() {
        tengine.ThreeEngine.scene.remove(this.light);
    }
}

export { Light, BackgroundLight };