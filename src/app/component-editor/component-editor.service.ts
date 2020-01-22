import { Injectable } from '@angular/core';
import { ComponentEditorComponent } from './components/component-editor/component-editor.component';
import { GraphicObjectContainer } from '../common/graphic/graphic-object-container.class';
import { MatDialog } from '@angular/material/dialog';
import { DeletionModalComponent } from './components/deletion-modal/deletion-modal.component';
import { DataProviderService } from './services/data-provider.service';

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
}
