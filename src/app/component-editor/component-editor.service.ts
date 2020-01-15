import { Injectable } from '@angular/core';
import { BasicRectSprite } from '../common/graphic/basic-rect-sprite.class';

@Injectable({
  providedIn: 'root'
})
export class ComponentEditorService {

  selectedObject: BasicRectSprite;

  constructor() { }

  selectObject(object: BasicRectSprite) {

    if (this.selectedObject) {
      this.selectedObject.unselect();
    }

    object.select();
    this.selectedObject = object;    
  }
}
