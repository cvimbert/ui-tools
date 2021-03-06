import { Injectable } from '@angular/core';
import { ComponentEditorComponent } from './components/component-editor/component-editor.component';
import { GraphicObjectContainer } from '../common/graphic/graphic-object-container.class';
import { MatDialog } from '@angular/material/dialog';
import { DeletionModalComponent } from './components/deletion-modal/deletion-modal.component';
import { DataProviderService } from './services/data-provider.service';
import { SceneState } from '../common/graphic/states/scene-state.class';
import { MetadataEditionModalComponent } from './components/metadata-edition-modal/metadata-edition-modal.component';
import { BaseData } from '../common/data/interfaces/base-data.interface';
import { DataBank } from '../common/data/data-bank.class';
import { SceneTransition } from '../common/graphic/transitions/scene-transition.class';
import { SceneTransitionEditModalComponent } from './components/scene-transition-edit-modal/scene-transition-edit-modal.component';
import { ComponentEditorScene } from './component-editor-scene.class';
import { ComponentTreePanelComponent } from './components/component-tree-panel/component-tree-panel.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentEditorService {

  selectedObject: GraphicObjectContainer;
  editorComponent: ComponentEditorComponent;

  graphicObjects: GraphicObjectContainer[];

  mainScene: ComponentEditorScene;

  componentId: string;
  treePanel: ComponentTreePanelComponent;

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
    this.treePanel.update();
  }

  createState() {
    this.dialog.open(MetadataEditionModalComponent).afterClosed().subscribe((data: BaseData) => {
      if (data) {
        let sceneState = SceneState.fromObjectsArray(this.sceneObjects);

        this.dataProvider.getBank("scene-states").pushAfterCreation(sceneState, data);
      }
    });
  }

  deleteSceneState(state: SceneState) {
    this.dialog.open(DeletionModalComponent).afterClosed().subscribe((deletion: boolean) => {
      if (deletion) {
        this.dataProvider.getBank("scene-states").delete(state);
      }
    });
  }

  get sceneStates(): SceneState[] {
    return this.dataProvider.getBank("scene-states").items;
  }

  get sceneObjects(): GraphicObjectContainer[] {
    return this.dataProvider.getBank("scene-objects").items;
  }

  get sceneTransitionsBank(): DataBank<SceneTransition> {
    return this.dataProvider.getBank("scene-transitions");
  }

  get sceneObjectsBank(): DataBank<GraphicObjectContainer> {
    return this.dataProvider.getBank("scene-objects");
  }

  get sceneStatesBank(): DataBank<SceneState> {
    return this.dataProvider.getBank("scene-states");
  }

  get sceneTransitions(): SceneTransition[] {
    return this.sceneTransitionsBank.items;
  }

  createComponent() {

  }

  createSceneTransition() {
    this.dialog.open(SceneTransitionEditModalComponent).afterClosed().subscribe((transition: SceneTransition) => {
      if (transition) {
        this.sceneTransitionsBank.pushAfterCreation(transition);
      }
    });
  }

  deleteSceneTransition(transition: SceneTransition) {
    this.dialog.open(DeletionModalComponent).afterClosed().subscribe((deletion: boolean) => {
      if (deletion) {
        this.dataProvider.getBank("scene-transitions").delete(transition);
      }
    });
  }
}
