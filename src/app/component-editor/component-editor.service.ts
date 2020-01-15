import { Injectable } from '@angular/core';
import { BasicRectSprite } from '../common/graphic/basic-rect-sprite.class';
import { ComponentEditorComponent } from './components/component-editor/component-editor.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentEditorService {

  selectedObject: BasicRectSprite;
  editorComponent: ComponentEditorComponent;

  constructor() { }

  selectObject(object: BasicRectSprite) {

    if (this.selectedObject) {
      this.selectedObject.unselect();
    }

    object.select();
    this.selectedObject = object;   
    
    // this.editorComponent.update();
  }
}
