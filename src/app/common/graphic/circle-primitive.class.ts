import { JsonObject } from 'json2typescript';
import { GraphicObjectContainer } from './graphic-object-container.class';
import { PrimitiveObject } from './primitive-object.class';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';
import { Rectangle } from 'electron';
import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';

@JsonObject("CirclePrimitive")
export class CirclePrimitive extends PrimitiveObject {

  sprite: Phaser.GameObjects.Graphics;

  initWithScene(
    scene: ComponentEditorScene,
    rect?: Rectangle,
    parent?: FlexibleRectangle
  ) {
    super.initWithScene(scene, rect, parent);

    // this.sprite = this.scene.add.rectangle(this.x.value, this.y.value, this.width.value, this.height.value, 0xffff00, 1).setOrigin(this.xOrigin.value, this.yOrigin.value);
    this.sprite = this.scene.add.graphics();
    

    this.afterInit();

    this.mainContainer.add(this.sprite);

    this.setStyle();

    this.render();
  }

  setStyle() {
    this.sprite.fillStyle(this.backgroundColor);
  }
}