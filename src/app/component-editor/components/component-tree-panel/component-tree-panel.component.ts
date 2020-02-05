import { Component, OnInit } from '@angular/core';
import { ComponentEditorService } from '../../component-editor.service';
import { DataProviderService } from '../../services/data-provider.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { GraphicObjectContainer } from 'src/app/common/graphic/graphic-object-container.class';

@Component({
  selector: 'component-tree-panel',
  templateUrl: './component-tree-panel.component.html',
  styleUrls: ['./component-tree-panel.component.scss']
})
export class ComponentTreePanelComponent implements OnInit {

  constructor(
    public editorService: ComponentEditorService,
    public dataProvider: DataProviderService
  ) { }

  ngOnInit() {
  }

  get items(): GraphicObjectContainer[] {
    return this.editorService.sceneObjectsBank.items.sort((it1: GraphicObjectContainer, it2: GraphicObjectContainer) => {
      return it1.depth - it2.depth;
    });
  }

  set items(value: GraphicObjectContainer[]) {
    this.editorService.sceneObjectsBank.items = value;
  }

  drop(evt: CdkDragDrop<string[]>) {
    let moved = this.items[evt.previousIndex];
    let target = this.items[evt.currentIndex];
    this.items[evt.currentIndex] = moved;
    this.items[evt.previousIndex] = target;
  }

  isSelected(item: GraphicObjectContainer): boolean {
    return item === this.editorService.selectedObject;
  }

  toggleVisibility(object: GraphicObjectContainer) {
    object.toggleVisibility();
  }

  selectItem(item: GraphicObjectContainer) {
    this.editorService.selectObject(item);
  }

  deleteItem(item: GraphicObjectContainer) {
    this.editorService.tryToDeleteObject(item);
  }
}
