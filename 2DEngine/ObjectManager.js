import { GameObjects } from '../MainEngine/GameEngine.js';
/**
 * Handles the Object System.  
 * For use in the 2D engine.
 * Used to match the 3D engine counter part.
 * @since 1.1.0
 */
class ObjectManager {
    /**
     * Add a game object/
     * @param {*} obj 
     */
    static add(obj) {
        GameObjects.add(obj);
    }
    /**
     * Remove a game object
     * @param {*} obj 
     */
    static remove(obj) {
        GameObjects.remove(obj);
    }
    /**
     * Clear all of the game objects.
     */
    static clear() {
        GameObjects.clear();
    }
    /**
     * Remove a type of object. Ex: Rectangle
     * @param {*} type 
     */
    static removeType(type) {
        GameObjects.removeType(type);
    }

    /**
     * Get a list of game objects.
     * @returns The list of all of the active game objects.
     */
    static getObjects() {
        return GameObjects.getGameObjects();
    }
}

export { ObjectManager };