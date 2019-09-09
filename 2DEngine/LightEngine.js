/**
    Basic Lighting Engine included with the game engine.  
    For other lighting use a custom light engine.  
  
    @author Ryandw11
    @version 1.1
*/

import { GameEngine, EventHandler, UpdateEvent } from '../MainEngine/GameEngine.js';



/**
 * Light Canvas Object.
 * TODO: Add ability to change lighting color
 */
class Light {
    /**
     * Create a light canvas object.
     * 
     * @param {Number} posX The x position
     * @param {Number} posY The y position
     * @param {Number} radius The radius of the circle
     */
    constructor(posX, posY, radius, light = [[0.3, 'rgba(242, 245, 57, 0.5)'], [0.5, 'rgba(190, 190, 80, 0.5)'], [0.9, 'rgba(114, 114, 12, 0.2)']]) {
        this.rad = radius;
        this.x = posX;
        this.y = posY;
        this.light = light;
    }

    setRadius(rad) {
        this.rad = rad;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        GameEngine.canvas.save();
        GameEngine.canvas.globalCompositeOperation = 'lighter';
        var rnd = 0.05 * Math.sin(1.1 * Date.now() / 1000);
        this.radius = this.radius * (1 + rnd);
        var radialGradient = GameEngine.canvas.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.rad);
        this.light.forEach(val => { radialGradient.addColorStop(val[0] + rnd, val[1]) });
        // radialGradient.addColorStop(0.3 + rnd, 'rgba(245, 242, 57, 0.5)');
        // radialGradient.addColorStop(0.5 + rnd, 'rgba(190, 190, 80, 0.5)');
        // radialGradient.addColorStop(0.9 + rnd, 'rgba(114, 114, 12, 0.2)');
        // radialGradient.addColorStop(0.3, "rgba(255, 255, 255, 0.3)");
        // radialGradient.addColorStop(0.90, 'rgba(17, 17, 0, 0.418)');
        // radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0.486)');
        GameEngine.canvas.fillStyle = radialGradient;
        GameEngine.canvas.beginPath();
        GameEngine.canvas.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
        GameEngine.canvas.fill();
        GameEngine.canvas.restore();
        GameEngine.canvas.globalCompositeOperation = 'source-over';
    }
}

/**
 * A shadow element.
 */
class Shadow {
    /**
     * Create a shadow canvas object. (Make sure it is added last.)
     * @param {*} x The x position
     * @param {*} y The y position
     * @param {*} width The width of the shadow
     * @param {*} height The height of the shadow
     * @param {*} color The color of the shadow
     * @param {*} amount The opacity of the shadow.
     */
    constructor(x, y, width, height, color, amount) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.amount = amount;
    }

    draw() {
        GameEngine.canvas.fillStyle = this.color;
        GameEngine.canvas.globalAlpha = this.amount;
        GameEngine.canvas.fillRect(this.x, this.y, this.width, this.height);
        GameEngine.canvas.globalAlpha = 1;
    }
}

/**
 * The Basic Light Engine included with the GameEngine.
 */
class LightEngine {
    static stopOne = "rgba(245, 242, 57, 0.5)";
    static stopTwo = "rgba(190, 190, 80, 0.5)";
    static stopThree = "rgba(114, 114, 12, 0.2)";
    static shadow;

    /**
     * Enable the lighting engine.
     * @param {Number} alpha Opacity of the shadow 
     */
    static enable(alpha = 0.3) {
        LightEngine.shadow = new Shadow(0, 0, GameEngine.width, GameEngine.height, "black", alpha);
        // GameObjects.addGameObject(LightEngine.shadow);
        EventHandler.registerHandler(UpdateEvent, update);
    }

    /**
     * Disable the lighting engine.
     */
    static disable() {
        LightObjects.lightObjects = [];
    }

    static getShadow() {
        return LightEngine.shadow;
    }
}

class LightObjects {
    static lightObjects = [];

    static add(light) {
        LightObjects.lightObjects.push(light);
        // GameObjects.add(light);
    }

    static remove(light) {
        LightObjects.lightObjects.splice(LightObjects.lightObjects.indexOf(light), 1);
        // GameObjects.remove(light);
    }

    static getNumberOfLights() {
        return LightObjects.lightObjects.length;
    }
}

/**
 * Premade values for light color.
 */
const LightColor = {
    red: [[0.3, 'rgba(245, 63, 57, 0.5)'], [0.5, 'rgba(252, 101, 96, 0.37)'], [0.9, 'rgba(252, 101, 96, 0.2)']],
    blue: [[0.3, 'rgba(57, 139, 245, 0.5)'], [0.4, 'rgba(57, 139, 245, 0.3)'], [0.6, 'rgba(57, 139, 245, 0.2)'], [0.9, 'rgba(57, 139, 245, 0.1)']],
    yellow: [[0.3, 'rgba(242, 245, 57, 0.5)'], [0.5, 'rgba(190, 190, 80, 0.5)'], [0.9, 'rgba(114, 114, 12, 0.2)']],
    green: [[0.3, 'rgba(57, 245, 57, 0.5)'], [0.4, 'rgba(57, 245, 57, 0.3)'], [0.6, 'rgba(57, 245, 57, 0.2)'], [0.9, 'rgba(57, 245, 57, 0.1)']],
    purple: [[0.3, 'rgba(200, 95, 248, 0.5)'], [0.5, 'rgba(204, 112, 247, 0.37)'], [0.9, 'rgba(204, 112, 247, 0.2)']]
}

function update(e) {
    LightEngine.shadow.draw();
    LightObjects.lightObjects.forEach(light => light.draw());
}

export { Light, LightEngine, LightObjects, Shadow, LightColor };