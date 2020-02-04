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
    return this.editorService.sceneObjectsBank.items;
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

  toggleVisibility(object: GraphicObjectContainer) {
    object.toggleVisibility();
  }
}
