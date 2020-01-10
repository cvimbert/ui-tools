import { BasicRectSprite } from '../common/graphic/basic-rect-sprite.class';

export class ComponentEditorScene extends Phaser.Scene {

    private tempRects: BasicRectSprite[] = [];

    constructor() {
        super({
            key: "ComponentEditorScene"
        });
    }

    preload() {
        console.log("preload");
        
        this.load.setBaseURL("./assets/");
    }

    create() {
        console.log("create");
        
        let rect = new BasicRectSprite(this, {
            x: 40,
            y: 40,
            height: 40,
            width: 50
        });

        this.tempRects.push(rect);
    }
}