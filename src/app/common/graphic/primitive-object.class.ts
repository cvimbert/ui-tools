import { GraphicObjectContainer } from './graphic-object-container.class';
import { AdditionnalPanel } from '../data/interfaces/aditionnal-panels/additionnal-panel.interface';
import { PanelEntryType } from '../data/interfaces/aditionnal-panels/panel-entry-type.enum';
import { JsonProperty, JsonObject } from 'json2typescript';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';
import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';

@JsonObject("PrimitiveObject")
export class PrimitiveObject extends GraphicObjectContainer {

  @JsonProperty("backgroundColor", Number)
  backgroundColor = 0xff0000;

  @JsonProperty("borderColor", Number)
  borderColor = 0x000000;

  @JsonProperty("borderWidth", Number)
  borderWidth = 0;

  additionnalPanels: AdditionnalPanel[] = [
    {
      name: "Rectangle",
      entries: [
        {
          name: "Background color",
          type: PanelEntryType.COLOR,
          getter: () => this.backgroundColor,
          setter: (value: string) => {
            this.backgroundColor = parseInt(value.substr(1), 16);
            this.setStyle();
          }
        },
        {
          name: "Border color",
          type: PanelEntryType.COLOR,
          getter: () => this.borderColor,
          setter: (value: string) => {
            this.borderColor = parseInt(value.substr(1), 16);
            this.setStyle();
          }
        },
        {
          name: "Border width",
          type: PanelEntryType.NUMBER,
          getter: () => this.borderWidth,
          setter: (value: number) => {
            this.borderWidth = value;
            this.setStyle();
          }
        }
      ]
    }
  ];

  /* initWithScene(
    scene: ComponentEditorScene,
    rect?: Rectangle,
    parent?: FlexibleRectangle
  ) {
      super.initWithScene(scene, rect, parent);
  } */

  setStyle() {

  }

}