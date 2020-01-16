import { BasicRectSprite } from '../common/graphic/basic-rect-sprite.class';
import { ComponentEditorService } from './component-editor.service';
import { FlexibleRectangle } from '../common/geometry/flexible-rectangle.class';

export class ComponentEditorScene extends Phaser.Scene {

    private tempRects: BasicRectSprite[] = [];

    constructor(
        public editorService: ComponentEditorService,
        public viewport: FlexibleRectangle
    ) {
        super({
            key: "ComponentEditorScene"
        });
    }

    preload() {
        console.log("Preloading...");
        
        this.load.setBaseURL("./assets/");
        this.load.image("t1", "tmp/button.png")
    }

    create() {
        console.log("Creating...");

        let rect = new BasicRectSprite(this, {
            x: 0,
            y: 0,
            height: 40,
            width: 40
        }, this.viewport);

        rect.name = "Basic rect 1";

        let rect2 = new BasicRectSprite(this, {
            x: 120,
            y: 100,
            height: 40,
            width: 40
        }, this.viewport);

        rect2.name = "Basic rect 2";

        this.tempRects.push(rect, rect2);

        /*let dlg = this.add.nineslice(
            0, 0,   // this is the starting x/y location
            300, 80,   // the width and height of your object
            't1', // a key to an already loaded image
            10, 4         // the width and height to offset for a corner slice
          );*/

    }
}