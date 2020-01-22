import { GraphicObjectContainer } from './graphic-object-container.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';
import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';
import { JsonObject, JsonProperty } from 'json2typescript';
import { TextfieldStyle } from './textfield-style.class';
import { AdditionnalPanel } from '../data/interfaces/aditionnal-panels/additionnal-panel.interface';
import { PanelEntryType } from '../data/interfaces/aditionnal-panels/panel-entry-type.enum';

@JsonObject("Textfield")
export class Textfield extends GraphicObjectContainer {

    additionnalPanels: AdditionnalPanel[] = [
        {
            name: "Text settings",
            entries: [
                {
                    id: "text",
                    name: "Text",
                    type: PanelEntryType.LONG_STRING
                }
            ]
        }
    ];

    textObject: Phaser.GameObjects.Text;

    @JsonProperty("style", TextfieldStyle)
    style = new TextfieldStyle();

    @JsonProperty("text", String)
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
            color: this.style.color,
            fontFamily: this.style.fontFamily,
            fontSize: this.style.fontSize + "px",
            align: this.style.align
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