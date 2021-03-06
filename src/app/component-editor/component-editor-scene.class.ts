import { BasicRectSprite } from '../common/graphic/basic-rect-sprite.class';
import { ComponentEditorService } from './component-editor.service';
import { FlexibleRectangle } from '../common/geometry/flexible-rectangle.class';
import { DataProviderService } from './services/data-provider.service';
import { DataBank } from '../common/data/data-bank.class';
import { Image } from '../common/graphic/image.class';
import { NineSliceImage } from '../common/graphic/nine-slice-image.class';
import { Textfield } from '../common/graphic/textfield.class';
import { GraphicObjectContainer } from '../common/graphic/graphic-object-container.class';
import { Assets } from './assets.class';
import { DistortPipeline } from '../common/pipelines/distort-pipeline.class';
import { NodalContainer } from '../common/graphic/nodal-container.class';
import { ElectronService } from 'ngx-electron';
import { ComponentReference } from '../common/graphic/components/component-reference.class';
import { ComponentCluster } from '../common/graphic/components/component-cluster.class';
import { GraphService } from '../logical-graph/graph.service';

export class ComponentEditorScene extends Phaser.Scene {

    private background: Phaser.GameObjects.Graphics;
    distortPipeline: DistortPipeline;
    images: string[];

    constructor(
        public editorService: ComponentEditorService,
        public dataProvider: DataProviderService,
        public viewport: FlexibleRectangle,
        public electronService: ElectronService,
        public graphService: GraphService
    ) {
        super({
            key: "ComponentEditorScene"
        });
    }

    preload() {
        console.log("Preloading...");
        
        this.load.setBaseURL("./assets/images");

        this.images = [];

        Assets.images.forEach(imagePath => this.load.image(imagePath, imagePath));

        // chargement des images du dossier images
        if (this.electronService.isElectronApp) {
            let fs = this.electronService.remote.require("fs");

            let imagesPath = "src/assets/images/upload"
            if (fs.existsSync(imagesPath)) {
                let content = fs.readdirSync(imagesPath);
                this.images.push(...content);

                this.images.forEach(image => this.load.image(image, "upload" + "/" + image));
            }
        }
    }

    create() {
        console.log("Creating...");

        this.viewport.initRect();

        this.drawBackground();
        
        let bank: DataBank<GraphicObjectContainer> = this.dataProvider.getBank("scene-objects");

        // let jj = (<Phaser.Renderer.WebGL.WebGLRenderer>this.game.renderer).addPipeline('Distort', new DistortPipeline(this.game));
        // jj.setFloat2('resolution', <number>this.game.config.width, <number>this.game.config.height);
        // this.cameras.main.setRenderToTexture("Distort");

        bank.items.forEach(item => {
            switch(item.objectType) {
                case "baseRect": 
                    (<BasicRectSprite>item).initObject(this, null, this.viewport);
                    break;
                
                case "image":
                    let im = <Image>item;
                    im.initObject(im.textureId, this, null, this.viewport);
                    break;

                case "nineSliceImage":
                    let nim = <NineSliceImage>item;
                    nim.initObject(this, nim.textureName, nim.sliceSize, null, this.viewport);
                    break;

                case "textfield":
                    let tim = <Textfield>item;
                    tim.initObject(this, tim.text, null, this.viewport);
                    break;

                case "nodalContainer":
                    let nodalCont = <NodalContainer>item;
                    nodalCont.initObject(this, null, this.viewport);
                    break;

                case "componentReference":
                    let compRef = <ComponentReference>item;
                    compRef.initObject(this, null, this.viewport);
                    let cluster = new ComponentCluster(this.electronService, compRef, compRef, this, this.graphService);
                    break;
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

        let start = true;

        const size = 10;
        let even = start;

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
            start = !start;
            even = start;
        }
    }

    render() {
        this.drawBackground();
        this.editorService.editorComponent.onResize();

        let bank: DataBank<GraphicObjectContainer> = this.dataProvider.getBank("scene-objects");
        bank.items.forEach(item => item.render());
    }
}