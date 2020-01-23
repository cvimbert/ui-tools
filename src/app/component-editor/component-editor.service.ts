import { Injectable } from '@angular/core';
import { ComponentEditorComponent } from './components/component-editor/component-editor.component';
import { GraphicObjectContainer } from '../common/graphic/graphic-object-container.class';
import { MatDialog } from '@angular/material/dialog';
import { DeletionModalComponent } from './components/deletion-modal/deletion-modal.component';
import { DataProviderService } from './services/data-provider.service';
import { SceneState } from '../common/graphic/states/scene-state.class';
import { GraphicObjectState } from '../common/graphic/states/graphic-object-state.class';
import { ValueUnitPair } from '../common/geometry/value-unit-pair.class';
import { MetadataEditionModalComponent } from './components/metadata-edition-modal/metadata-edition-modal.component';
import { BaseData } from '../common/data/interfaces/base-data.interface';

@Injectable({
  providedIn: 'root'
})
export class ComponentEditorService {

  selectedObject: GraphicObjectContainer;
  editorComponent: ComponentEditorComponent;

  graphicObjects: GraphicObjectContainer[];

  constructor(
    private dialog: MatDialog,
    private dataProvider: DataProviderService
  ) { }

  selectObject(object: GraphicObjectContainer) {
        
    if (this.selectedObject && object !== this.selectedObject) {
      this.selectedObject.selected = false;
    }

    object.selected = true;
    this.selectedObject = object;   
  }

  tryToDeleteObject(object: GraphicObjectContainer) {
    this.dialog.open(DeletionModalComponent).afterClosed().subscribe((resp: boolean) => {
      if (resp) {
        this.deleteObject(object);
      }
    });
  }

  deleteObject(object: GraphicObjectContainer) {
    object.destroy();
    this.selectedObject = null;
    this.dataProvider.getBank("scene-objects").delete(object);
  }

  createState() {

    this.dialog.open(MetadataEditionModalComponent).afterClosed().subscribe((data: BaseData) => {
      if (data) {
        let sceneState = SceneState.fromObjectsArray(this.sceneObjects);

        this.dataProvider.getBank("scene-states").pushAfterCreation(sceneState, data);
      }
    });
  }

  applySceneState(state: SceneState) {
    state.states.forEach(state => this.applyObjectState(state));
  }

  applyObjectState(state: GraphicObjectState) {

    let object = this.sceneObjects.find(object => object.id === state.targetObjectId);
    let updatedProperties: string[] = [];

    GraphicObjectState.animatedProperties.forEach(prop => {
      if (object[prop] instanceof ValueUnitPair) {
        if (!object[prop].equals(state[prop])) {
          object[prop].setTo(state[prop]);
          updatedProperties.push(prop);
        }
      } else {
        // ne devrait pas se produire pour le moment
      }
    });

    if (updatedProperties.length > 0) {
      object.render();
    }
  }

  get sceneStates(): SceneState[] {
    return this.dataProvider.getBank("scene-states").items;
  }

  get sceneObjects(): GraphicObjectContainer[] {
    return this.dataProvider.getBank("scene-objects").items;
  }
}
