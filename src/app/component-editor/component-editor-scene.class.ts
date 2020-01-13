import { BasicRectSprite } from '../common/graphic/basic-rect-sprite.class';

export class ComponentEditorScene extends Phaser.Scene {

    private tempRects: BasicRectSprite[] = [];

    constructor() {
        super({
            key: "ComponentEditorScene"
        });
    }

    preload() {
        this.load.setBaseURL("./assets/");
    }

    create() {
        let rect = new BasicRectSprite(this, {
            x: 0,
            y: 0,
            height: 40,
            width: 40
        });

        let rect2 = new BasicRectSprite(this, {
            x: 120,
            y: 100,
            height: 40,
            width: 40
        });

        this.tempRects.push(rect, rect2);
    }
}