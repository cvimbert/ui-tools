import { GraphicObjectContainer } from '../graphic-object-container.class';
import { JsonObject, JsonProperty } from 'json2typescript';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';
import { Rectangle } from '../../geometry/interfaces/rectangle.interface';
import { FlexibleRectangle } from '../../geometry/flexible-rectangle.class';

@JsonObject("ComponentReference")
export class ComponentReference extends GraphicObjectContainer {

  constructor() {
    super();
  }

  @JsonProperty("componentId", String)
  componentId = "";

  initObject(
    scene: ComponentEditorScene,
    rect?: Rectangle,
    parent?: FlexibleRectangle
  ) {
      super.initWithScene(scene, rect, parent);

      // this.container = scene.add.container(this.x.value, this.y.value);

      this.afterInit();

      // this.mainContainer.add(this.container);

      this.render();
  }
}