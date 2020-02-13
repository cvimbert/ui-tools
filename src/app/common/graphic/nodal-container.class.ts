import { GraphicObjectContainer } from './graphic-object-container.class';
import { JsonObject, JsonProperty } from 'json2typescript';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';
import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';
import { AdditionnalPanel } from '../data/interfaces/aditionnal-panels/additionnal-panel.interface';
import { PanelEntryType } from '../data/interfaces/aditionnal-panels/panel-entry-type.enum';
import { LayoutModes } from 'src/app/component-editor/layout/layout-modes.class';

@JsonObject("NodalContainer")
export class NodalContainer extends GraphicObjectContainer {

  container: Phaser.GameObjects.Container;
  children: GraphicObjectContainer[] = [];

  @JsonProperty("layoutMode", String, true)
  layoutMode = LayoutModes.FREE;

  @JsonProperty("fitToContent", Boolean, true)
  fitToContent = false;
  
  additionnalPanels: AdditionnalPanel[] = [
    {
      name: "Layout",
      entries: [
        {
          name: "Fit to content",
          type: PanelEntryType.BOOLEAN,
          getter: () => this.fitToContent,
          setter: (value: boolean) => {
            this.fitToContent = value;
            this.updateFitting();
          }
        },
        {
          name: "Mode",
          type: PanelEntryType.SELECT,
          selectValues: [
              LayoutModes.FREE,
              LayoutModes.HORIZONTAL,
              LayoutModes.VERTICAL
          ],
          getter: () => this.layoutMode,
          setter: (value: string) => {
              this.layoutMode = value;
              this.updateLayout();
          }
        }
      ]
    }
  ];

  initObject(
    scene: ComponentEditorScene,
    rect?: Rectangle,
    parent?: FlexibleRectangle
  ) {
      super.initWithScene(scene, rect, parent);

      this.container = scene.add.container(this.x.value, this.y.value);

      this.afterInit();

      this.mainContainer.add(this.container);

      this.render();
  }

  updateLayout() {
    switch (this.layoutMode) {
      case LayoutModes.FREE:
        this.children.forEach(child => child.render());
        break;

      case LayoutModes.HORIZONTAL:
        console.log("Horizontal");
        this.children.forEach(child => {
          child.y.value = 0;
          child.render();
        });
        break;

      case LayoutModes.VERTICAL:

        break;
    }
  }

  updateFitting() {

  }

  render() {
    this.calculate();

    this.container.x = this.x.value;
    this.container.y = this.y.value;
    this.container.rotation = this.rotation.value;
    this.container.alpha = this.alpha.value;
    this.container.setScale(this.scaleX.value, this.scaleY.value);

    // console.log("alpha", this.alpha.value, this.container);

    // this.children.forEach(child => child.mainContainer.alpha = this.alpha.value);

    // Ces méthodes n'existent pas dans l'objet container
    // this.container.resize(this.width.value, this.height.value);
    // this.container.setOrigin(this.xOrigin.value, this.yOrigin.value);

    this.container.setScale(this.scaleX.value, this.scaleY.value);

    // Utile ??
    this.children.forEach(child => child.render());

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
    
    console.log("add object: " + object.id + " in " + this.id);

    this.container.add(object.mainContainer);

    // console.log(this.container);
    

    // TODO : ajustement potentiel de sa position (ou pas...)

    object.parent = this;
    object.render();
    
    this.children.push(object);

    // Pas l'air de marcher
    this.scene.editorService.treePanel.update();
  }

  removeObjectFromContainer(object: GraphicObjectContainer) {
    // console.log("remove object: " + object.id);

    this.scene.add.existing(object.mainContainer);

    object.parent = this.scene.viewport;

    let index = this.children.indexOf(object);

    if (index != -1) {
      this.children.splice(index, 1);
    }

    object.render();

    // Pas l'air de marcher
    this.scene.editorService.treePanel.update();
  }

  destroy() {
      this.container.destroy();
      super.destroy();
  }

}