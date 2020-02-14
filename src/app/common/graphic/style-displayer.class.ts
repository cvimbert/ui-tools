import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';
import { GraphicObjectContainer } from './graphic-object-container.class';

export class StyleDisplayer extends Phaser.GameObjects.Graphics {

  constructor(
    public scene: ComponentEditorScene,
    private object: GraphicObjectContainer,
    container: Phaser.GameObjects.Container
  ) {
    super(scene);

    container.add(this);    

    this.alpha = 0.3;
    this.draw();
  }

  draw() {
    this.clear();

    let style = this.object.objectStyle;

    this.setDefaultStyles({
      fillStyle: {
        color: 0xff0000
      }
    });

    let widthWithBorder = this.object.width.value + style.marginLeft + style.marginRight;

    let xv = -this.object.width.value * this.object.xOrigin.value;
    let yv = -this.object.height.value * this.object.yOrigin.value;

    this.fillRect(-style.marginLeft + xv, -style.marginTop + yv, widthWithBorder, style.marginTop);
    this.fillRect(this.object.width.value + xv,  + yv, style.marginRight, this.object.height.value);
    this.fillRect(-style.marginLeft + xv, this.object.height.value + yv, widthWithBorder, style.marginBottom);
    this.fillRect(-style.marginLeft + xv,  + yv, style.marginLeft, this.object.height.value);

    this.setDefaultStyles({
      fillStyle: {
        color: 0x0000ff
      }
    });

    let heightWithoutPadding = this.object.height.value - style.paddingTop - style.paddingBottom;
    this.fillRect(xv, yv, this.object.width.value, style.paddingTop);
    this.fillRect(this.object.width.value - style.paddingRight + xv, style.paddingTop + yv, style.paddingRight, heightWithoutPadding);
    this.fillRect(xv, this.object.height.value - style.paddingBottom + yv, this.object.width.value, style.paddingBottom);
    this.fillRect(xv, style.paddingTop + yv, style.paddingLeft, heightWithoutPadding);
  }
}