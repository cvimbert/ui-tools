import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';
import { GraphicObjectContainer } from './graphic-object-container.class';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject("Image")
export class Image extends GraphicObjectContainer {

    image: Phaser.GameObjects.Image;

    @JsonProperty("textureId", String)
    textureId = "";

    constructor() {
        super();
    }

    initObject(
        textureId: string,
        scene: ComponentEditorScene,
        rect?: Rectangle,
        parent?: FlexibleRectangle
    ) {
        super.initWithScene(scene, rect, parent);

        this.textureId = textureId;
        
        this.image = scene.add.image(this.x.value, this.y.value, textureId).setOrigin(this.xOrigin.value, this.yOrigin.value);
        this.width.value = this.image.width;
        this.height.value = this.image.height;

        this.afterInit();

        this.mainContainer.add(this.image);

        this.render();
    }

    render() {
        this.calculate();
        
        this.image.x = this.x.value;
        this.image.y = this.y.value;
        this.image.rotation = this.rotation.value;
        this.image.alpha = this.alpha.value;

        this.image.setOrigin(this.xOrigin.value, this.yOrigin.value);
        this.image.setScale(this.scaleX.value, this.scaleY.value);
        this.image.setDisplaySize(this.width.value, this.height.value);

        // this.scaleX.value = this.image.scaleX;
        // this.scaleY.value = this.image.scaleY;

        super.render();
    }

    destroy() {
        this.image.destroy();
        super.destroy();
    }
}