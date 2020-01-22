import { GraphicObjectContainer } from './graphic-object-container.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';
import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject("Textfield")
export class Textfield extends GraphicObjectContainer {

    textObject: Phaser.GameObjects.Text;

    @JsonProperty("text")
    text = "";

    constructor() {
        super();
    }

    initObject(
        scene: ComponentEditorScene,
        text: string,
        rect?: Rectangle,
        parent?: FlexibleRectangle
    ) {
        super.initWithScene(scene, rect, parent);

        this.text = text;

        this.textObject = this.scene.add.text(this.x.value, this.y.value, text, {
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "20px",
            align: "center"
        });

        this.width.value = this.textObject.width;
        this.height.value = this.textObject.height;

        this.render();
    }

    render() {
        this.calculate();        

        this.textObject.setFixedSize(this.width.value, this.height.value);
        this.textObject.updateText();
        this.textObject.setPosition(this.x.value, this.y.value);
        this.textObject.setOrigin(this.xOrigin.value, this.yOrigin.value);
        this.textObject.alpha = this.alpha.value;
        this.textObject.rotation = this.rotation.value;

        super.render();
    }

    destroy() {
        this.textObject.destroy();
        super.destroy();
    }
}