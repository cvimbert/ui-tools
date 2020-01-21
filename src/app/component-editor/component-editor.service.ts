import { Injectable } from '@angular/core';
import { BasicRectSprite } from '../common/graphic/basic-rect-sprite.class';
import { ComponentEditorComponent } from './components/component-editor/component-editor.component';
import { GraphicObjectContainer } from '../common/graphic/graphic-object-container.class';

@Injectable({
  providedIn: 'root'
})
export class ComponentEditorService {

  selectedObject: GraphicObjectContainer;
  editorComponent: ComponentEditorComponent;

  graphicObjects: GraphicObjectContainer[];

  constructor() { }

  selectObject(object: BasicRectSprite) {

    /* if (this.selectedObject) {
      this.selectedObject.unselect();
    } */

    // object.select();
    this.selectedObject = object;   
    
    // this.editorComponent.update();
  }
}
