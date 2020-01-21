import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';
import { NineSlice } from 'phaser3-nineslice';
import { GraphicObjectContainer } from './graphic-object-container.class';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject("NineSliceImage")
export class NineSliceImage extends GraphicObjectContainer {

    @JsonProperty("textureName", String)
    textureName = "";

    @JsonProperty("sliceSize", Number)
    sliceSize: number = null;

    image: NineSlice;

    constructor() {
        super();
    }

    initObject(
        scene: ComponentEditorScene,
        textureName: string,
        sliceSize: number,
        rect?: Rectangle,
        parent?: FlexibleRectangle
    ) {
        super.initWithScene(scene, rect, parent);

        this.textureName = textureName;
        this.sliceSize = sliceSize;

        this.image = scene.add.nineslice(
            this.x.value, this.y.value,
            this.width.value, this.height.value,
            textureName,
            sliceSize, sliceSize
        ).setOrigin(this.xOrigin.value, this.yOrigin.value);

        this.render();
    }

    render() {
        this.calculate();

        this.image.x = this.x.value;
        this.image.y = this.y.value;
        this.image.rotation = this.rotation.value;

        this.image.resize(this.width.value, this.height.value);
    }
}