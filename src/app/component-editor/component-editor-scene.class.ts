import { BasicRectSprite } from '../common/graphic/basic-rect-sprite.class';
import { ComponentEditorService } from './component-editor.service';
import { FlexibleRectangle } from '../common/geometry/flexible-rectangle.class';
import { CoordinatesMode } from '../common/geometry/coordinates-modes.enum';
import { DataProviderService } from './services/data-provider.service';
import { DataBank } from '../common/data/data-bank.class';

export class ComponentEditorScene extends Phaser.Scene {

    private background: Phaser.GameObjects.Graphics;
    private tempRects: FlexibleRectangle[] = [];

    constructor(
        public editorService: ComponentEditorService,
        public dataProvider: DataProviderService,
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

        this.viewport.init();

        this.drawBackground();
        
        let bank: DataBank<BasicRectSprite> = this.dataProvider.getBank("base");

        bank.items.forEach(item => item.initWithScene(this, null, this.viewport));
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