import { BasicRectSprite } from '../common/graphic/basic-rect-sprite.class';
import { ComponentEditorService } from './component-editor.service';
import { FlexibleRectangle } from '../common/geometry/flexible-rectangle.class';
import { DataProviderService } from './services/data-provider.service';
import { DataBank } from '../common/data/data-bank.class';
import { Image } from '../common/graphic/image.class';
import { NineSliceImage } from '../common/graphic/nine-slice-image.class';
import { Textfield } from '../common/graphic/textfield.class';

export class ComponentEditorScene extends Phaser.Scene {

    private background: Phaser.GameObjects.Graphics;

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
        
        let bank: DataBank<any> = this.dataProvider.getBank("scene-objects");

        bank.items.forEach(item => {
            switch(item.objectType) {
                case "baseRect":
                    (<BasicRectSprite>item).initWithScene(this, null, this.viewport);
                    break;
                
                case "image":
                    let im = <Image>item;
                    im.initObject(im.textureId, this, null, this.viewport);
                    break;

                case "nineSliceImage":
                    let nim = <NineSliceImage>item;

                    // comme pour image, le cas est un peu bizarre. A étudier.
                    nim.initObject(this, nim.textureName, nim.sliceSize, null, this.viewport);
                    break;

                case "textfield":
                    let tim = <Textfield>item;
                    tim.initObject(this, tim.text, null, this.viewport);
            }
           
        });

        this.editorService.graphicObjects = bank.items;
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

        let bank: DataBank<BasicRectSprite> = this.dataProvider.getBank("scene-objects");
        bank.items.forEach(item => item.render());
    }
}