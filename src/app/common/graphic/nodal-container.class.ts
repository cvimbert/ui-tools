import { GraphicObjectContainer } from './graphic-object-container.class';
import { JsonObject } from 'json2typescript';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';
import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';

@JsonObject("NodalContainer")
export class NodalContainer extends GraphicObjectContainer {

  container: Phaser.GameObjects.Container;

  initObject(
    scene: ComponentEditorScene,
    rect?: Rectangle,
    parent?: FlexibleRectangle
  ) {
      super.initWithScene(scene, rect, parent);

      this.container = scene.add.container(this.x.value, this.y.value);

      this.afterInit();
      this.render();
  }

  render() {
    this.calculate();

    this.container.x = this.x.value;
    this.container.y = this.y.value;
    this.container.rotation = this.rotation.value;
    this.container.alpha = this.alpha.value;

    // Ces méthodes n'existent pas dans l'objet container
    // this.container.resize(this.width.value, this.height.value);
    // this.container.setOrigin(this.xOrigin.value, this.yOrigin.value);

    this.container.setScale(this.scaleX.value, this.scaleY.value);

    super.render();
  }

  setVisibility(value: boolean) {
      this.container.visible = value;
      super.setVisibility(value);
  }

  setDepth(value: number) {
      this.container.depth = value;
      super.setDepth(value);
  }

  addObjectToContainer(object: GraphicObjectContainer) {
    console.log("add object");
  }

  destroy() {
      this.container.destroy();
      super.destroy();
  }

}