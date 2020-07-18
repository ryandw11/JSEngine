import {GameObject2D, Vector} from '../MainEngine/GameEngine.js';

class Prefab extends GameObject2D{
    constructor(posX = 0, posY = 0){
        super();
        this.posX = posX;
        this.posY = posY;
        this.children = [];
        this.colX = 10;
        this.colY = 10;
    }

    setPosition(x, y = 0){
        if(x instanceof Vector){
            this.posX = x.getX();
            this.posY = x.getY();
            return this;
        }
        this.posX = x;
        this.posY = y;
        return this;
    }

    setCollisonBox(x, y = 0){
        if(x instanceof Vector){
            this.colX = x.getX();
            this.colY = x.getY();
            return this;
        }
        this.colX = x;
        this.colY = y;
        return this;
    }

    /**
     * This if for internal use only. This returns the size of the collision box.
     */
    getScale(){
        return new Vector(this.colX, this.colY);
    }

    getPosition(){
        return new Vector(this.posX, this.posY);
    }

    add(object){
        this.children.push(object);
        return this;
    }

    translateBy(x, y=0){
        if(x instanceof Vector){
            this.posX += x.getX();
            this.posY += x.getY();
            return this;
        }
        this.posX += x;
        this.posY += y;
        return this;
    }

    draw(){
        for(let i in this.children){
            this.children[i].offsetX = this.posX;
            this.children[i].offsetY = this.posY;
            this.children[i].draw();
        }
    }


}

export {Prefab};