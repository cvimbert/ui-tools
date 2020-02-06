import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';
import { GraphicObjectContainer } from './graphic-object-container.class';
import { JsonObject, JsonProperty } from 'json2typescript';
import { AdditionnalPanel } from '../data/interfaces/aditionnal-panels/additionnal-panel.interface';
import { PanelEntryType } from '../data/interfaces/aditionnal-panels/panel-entry-type.enum';

@JsonObject("BasicRectSprite")
export class BasicRectSprite extends GraphicObjectContainer {

    additionnalPanels: AdditionnalPanel[] = [
        {
            name: "Rectangle",
            entries: [
                {
                    name: "Background color",
                    type: PanelEntryType.COLOR,
                    getter: () => this.backgroundColor,
                    setter: (value: number) => {
                        this.backgroundColor = value;
                    }
                },
                {
                    name: "Border color",
                    type: PanelEntryType.COLOR,
                    getter: () => this.borderColor,
                    setter: (value: number) => {
                        this.borderColor = value;
                    }
                },
                {
                    name: "Border width",
                    type: PanelEntryType.NUMBER,
                    getter: () => this.borderWidth,
                    setter: (value: number) => {
                        this.borderWidth = value;
                    }
                }
            ]
        }
    ];


    private sprite: Phaser.GameObjects.Rectangle;
    scene: ComponentEditorScene;

    @JsonProperty("backgroundColor", Number)
    backgroundColor = 0xff0000;

    @JsonProperty("borderColor", Number)
    borderColor = 0x000000;

    @JsonProperty("borderWidth", Number)
    borderWidth = 0;

    constructor() {
        super();
    }

    initWithScene(
        scene: ComponentEditorScene,
        rect?: Rectangle,
        parent?: FlexibleRectangle
    ) {
        super.initWithScene(scene, rect, parent);
        
        this.sprite = this.scene.add.rectangle(this.x.value, this.y.value, this.width.value, this.height.value, 0xffff00, 1).setOrigin(this.xOrigin.value, this.yOrigin.value);
        this.afterInit();

        this.mainContainer.add(this.sprite);

        this.render();
    }

    render() {  
        this.calculate();        

        this.sprite.x = this.x.value;
        this.sprite.y = this.y.value;
        this.sprite.rotation = this.rotation.value;
        this.sprite.setOrigin(this.xOrigin.value, this.yOrigin.value);

        this.sprite.alpha = this.alpha.value;
        this.sprite.setDisplaySize(this.width.value, this.height.value);

        super.render();
    }

    destroy() {
        this.sprite.destroy();
        super.destroy();
    }
}