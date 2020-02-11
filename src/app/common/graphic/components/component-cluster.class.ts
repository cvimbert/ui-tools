import { ElectronService } from 'ngx-electron';
import { DataProvider } from '../../data/data-provider.class';
import { ComponentReference } from './component-reference.class';
import { DataBank } from '../../data/data-bank.class';
import { GraphicObjectContainer } from '../graphic-object-container.class';
import { BasicRectSprite } from '../basic-rect-sprite.class';
import { Image } from '../image.class';
import { NineSliceImage } from '../nine-slice-image.class';
import { Textfield } from '../textfield.class';
import { NodalContainer } from '../nodal-container.class';
import { FlexibleRectangle } from '../../geometry/flexible-rectangle.class';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';

export class ComponentCluster {

  dataProvider: DataProvider;

  constructor(
    private electronService: ElectronService,
    public reference: ComponentReference,
    private viewport: FlexibleRectangle,
    private scene: ComponentEditorScene
  ) {
    this.dataProvider = new DataProvider(electronService);
    this.dataProvider.loadAll(reference.componentId);

    console.log(this.dataProvider);
    
    let bank: DataBank<GraphicObjectContainer> = this.dataProvider.getBank("scene-objects");

    bank.items.forEach(item => {
      switch (item.objectType) {
        case "baseRect":
          (<BasicRectSprite>item).initObject(scene, null, this.viewport);
          break;

        case "image":
          let im = <Image>item;
          im.initObject(im.textureId, scene, null, this.viewport);
          break;

        case "nineSliceImage":
          let nim = <NineSliceImage>item;
          nim.initObject(scene, nim.textureName, nim.sliceSize, null, this.viewport);
          break;

        case "textfield":
          let tim = <Textfield>item;
          tim.initObject(scene, tim.text, null, this.viewport);
          break;

        case "nodalContainer":
          let nodalCont = <NodalContainer>item;
          nodalCont.initObject(scene, null, this.viewport);
          break;

        // Pas de récursivité pour le moment, en attendant la fin des tests sur un niveau
        /* case "componentReference":
          let compRef = <ComponentReference>item;
          compRef.initObject(scene, null, this.viewport);
          let cluster = new ComponentCluster(this.electronService, compRef, compRef, scene);
          break; */
      }
    });

    bank.items.forEach((item: GraphicObjectContainer) => {
      if (!item.parentContainerId) {
        reference.addObjectToContainer(item);
      } else {
        let pItem = <NodalContainer>bank.getItemById(item.parentContainerId);
        pItem.addObjectToContainer(item);
      }
    });    
  }
}