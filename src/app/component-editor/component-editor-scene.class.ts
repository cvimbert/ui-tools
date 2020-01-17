import { BasicRectSprite } from '../common/graphic/basic-rect-sprite.class';
import { ComponentEditorService } from './component-editor.service';
import { FlexibleRectangle } from '../common/geometry/flexible-rectangle.class';
import { CoordinatesMode } from '../common/geometry/coordinates-modes.enum';
import { NineSliceImage } from '../common/graphic/nine-slice-image.class';
import { load } from '@angular/core/src/render3';
import { Image } from '../common/graphic/image.class';

export class ComponentEditorScene extends Phaser.Scene {

    private background: Phaser.GameObjects.Graphics;
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

        this.drawBackground();

        // return;

        let rect = new BasicRectSprite(this, {
            x: 0,
            y: 0,
            height: 40,
            width: 40,
            xOrigin: 0.5,
            yOrigin: 0.5
        }, this.viewport);

        rect.mode = CoordinatesMode.TRBL;
        rect.name = "Basic rect 1";

        return;

        let rect2 = new BasicRectSprite(this, {
            x: 120,
            y: 100,
            height: 40,
            width: 40
        }, this.viewport);

        rect2.mode = CoordinatesMode.TRBL;
        rect2.name = "Basic rect 2";

        rect2.top.value = 5;
        rect2.bottom.value = 5;
        rect2.left.value = 40;
        rect2.right.value = 30;

        this.tempRects.push(rect, rect2);

        let nslc = new NineSliceImage(this, "t1", 10, {
            x: 20,
            y: 20,
            width: 160,
            height: 100
        }, this.viewport);

        nslc.mode = CoordinatesMode.TRBL;
        nslc.right.value = 15;
        nslc.left.value = 15;
        nslc.top.value = 15;
        nslc.bottom.value = 15;

        this.tempRects.push(nslc);

        let img = new Image(this, "arrow", {
            x: 20,
            y: 100
        }, this.viewport);

        img.mode = CoordinatesMode.TRBL;
        img.rotation.value = Math.PI;
        img.right.value = 5;

        this.tempRects.push(img);

        this.render();
    }

    drawBackground() {
        if (this.background) {
            this.background.clear();
        } else {
            this.background = this.add.graphics({
                x: 0,
                y: 0
            });
        }

        let w = this.game.scale.width;
        let h = this.game.scale.height;
        let cw = 0;
        let ch = 0;

        const size = 10;
        let even = true;

        while (ch < h) {
            while (cw < w) {
                if (even) {
                    this.background.fillStyle(0xeeeeee);
                } else {
                    this.background.fillStyle(0xcccccc);
                }
    
                this.background.fillRect(cw, ch, size, size);
                even = !even;
                cw += size;
            }

            cw = 0;
            ch += size;
            even = !even;
        }
    }

    render() {
        this.drawBackground();
        this.editorService.editorComponent.onResize();
        this.tempRects.forEach(rect => rect.render());
    }
}