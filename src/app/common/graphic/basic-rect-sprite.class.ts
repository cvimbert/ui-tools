import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';
import { GraphicObjectContainer } from './graphic-object-container.class';
import { JsonObject, JsonProperty } from 'json2typescript';
import { AdditionnalPanel } from '../data/interfaces/aditionnal-panels/additionnal-panel.interface';
import { PanelEntryType } from '../data/interfaces/aditionnal-panels/panel-entry-type.enum';
import { LayoutModes } from 'src/app/component-editor/layout/layout-modes.class';

@JsonObject("BasicRectSprite")
export class BasicRectSprite extends GraphicObjectContainer {

    panels: AdditionnalPanel[] = [
        {
            name: "Rectangle",
            entries: [
                {
                    name: "Background color",
                    type: PanelEntryType.COLOR,
                    getter: () => this.backgroundColor,
                    setter: (value: string) => {
                        this.backgroundColor = parseInt(value.substr(1), 16);
                        this.setRectStyle();
                    }
                },
                {
                    name: "Border color",
                    type: PanelEntryType.COLOR,
                    getter: () => this.borderColor,
                    setter: (value: string) => {
                        this.borderColor = parseInt(value.substr(1), 16);
                        this.setRectStyle();
                    }
                },
                {
                    name: "Border width",
                    type: PanelEntryType.NUMBER,
                    getter: () => this.borderWidth,
                    setter: (value: number) => {
                        this.borderWidth = value;
                        this.setRectStyle();
                    }
                }
            ]
        }
    ];


    private sprite: Phaser.GameObjects.Rectangle;

    @JsonProperty("backgroundColor", Number)
    backgroundColor = 0xff0000;

    @JsonProperty("borderColor", Number)
    borderColor = 0x000000;

    @JsonProperty("borderWidth", Number)
    borderWidth = 0;

    constructor() {
        super();
        this.pushPanels(this.panels);
    }

    initObject(
        scene: ComponentEditorScene,
        rect?: Rectangle,
        parent?: FlexibleRectangle
    ) {
        super.initWithScene(scene, rect, parent);
        
        this.sprite = this.scene.add.rectangle(this.x.value, this.y.value, this.width.value, this.height.value, this.backgroundColor).setOrigin(this.xOrigin.value, this.yOrigin.value);
        
        this.sprite.active = true;
        
        this.afterInit();


        this.mainContainer.add(this.sprite);


        this.setRectStyle();

        this.render();
    }

    setRectStyle() {
        this.sprite.fillColor = this.backgroundColor;
        this.sprite.setStrokeStyle(this.borderWidth, this.borderColor);
    }

    render() {  
        this.calculate();        

        // if (this.parentContainer.layoutMode === LayoutModes.FREE) {
            this.sprite.x = this.x.value;
            this.sprite.y = this.y.value;
        // }

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