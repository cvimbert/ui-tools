import { BasicRectSprite } from '../common/graphic/basic-rect-sprite.class';
import { ComponentEditorService } from './component-editor.service';
import { FlexibleRectangle } from '../common/geometry/flexible-rectangle.class';
import { CoordinatesMode } from '../common/geometry/coordinates-modes.enum';
import { NineSliceImage } from '../common/graphic/nine-slice-image.class';
import { load } from '@angular/core/src/render3';
import { Image } from '../common/graphic/image.class';

export class ComponentEditorScene extends Phaser.Scene {

    private tempRects: FlexibleRectangle[] = [];

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
        this.load.image("t1", "tmp/button.png");
        this.load.image("arrow", "tmp/arrow.png");
    }

    create() {
        console.log("Creating...");

        let rect = new BasicRectSprite(this, {
            x: 0,
            y: 0,
            height: 40,
            width: 40
        }, this.viewport);

        rect.mode = CoordinatesMode.TRBL;
        rect.name = "Basic rect 1";

        let rect2 = new BasicRectSprite(this, {
            x: 120,
            y: 100,
            height: 40,
            width: 40
        }, this.viewport);

        rect2.mode = CoordinatesMode.TRBL;
        rect2.name = "Basic rect 2";

        rect2.top = 5;
        rect2.bottom = 5;
        rect2.left = 40;
        rect2.right = 30;

        this.tempRects.push(rect, rect2);

        let nslc = new NineSliceImage(this, "t1", 10, {
            x: 20,
            y: 20,
            width: 160,
            height: 100
        }, this.viewport);

        nslc.mode = CoordinatesMode.TRBL;
        nslc.right = 15;
        nslc.left = 15;
        nslc.top = 15;
        nslc.bottom = 15;

        this.tempRects.push(nslc);

        let img = new Image(this, "arrow", {
            x: 20,
            y: 100
        }, this.viewport);

        img.mode = CoordinatesMode.TRBL;
        img.rotation = Math.PI;
        img.right = 5;

        this.tempRects.push(img);

        this.render();
    }

    render() {
        this.tempRects.forEach(rect => rect.render());
    }
}