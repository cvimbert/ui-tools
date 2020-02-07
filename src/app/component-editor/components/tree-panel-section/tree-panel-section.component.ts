import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { TreeElement } from 'src/app/common/data/interfaces/tree-element.interface';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { GraphicObjectContainer } from 'src/app/common/graphic/graphic-object-container.class';
import { ComponentEditorService } from '../../component-editor.service';

@Component({
  selector: 'tree-panel-section',
  templateUrl: './tree-panel-section.component.html',
  styleUrls: ['./tree-panel-section.component.scss']
})
export class TreePanelSectionComponent implements OnInit, OnChanges {

  @Input() elements: TreeElement[] = [];
  @Input() depth = 0;
  @Output() updated = new EventEmitter<void>();

  constructor(
    private editorService: ComponentEditorService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    
  }

  drop(evt: CdkDragDrop<TreeElement[]>) {
    console.log(evt);
    
    let moved = this.elements[evt.previousIndex];
    let target = this.elements[evt.currentIndex];

    if (evt.previousIndex < evt.currentIndex) {
      this.elements.splice(evt.currentIndex + 1, 0, moved);
      this.elements.splice(evt.previousIndex, 1);
    } else {
      this.elements.splice(evt.currentIndex, 0, moved);
      this.elements.splice(evt.previousIndex + 1, 1);
    }

    this.setAllDepths();
    this.updated.emit();

    console.log(target.element.name); 
  }

  isSelected(item: GraphicObjectContainer): boolean {
    return item === this.editorService.selectedObject;
  }

  toggleVisibility(object: GraphicObjectContainer, evt: MouseEvent) {
    object.toggleVisibility();
    evt.stopPropagation();
  }

  selectItem(item: GraphicObjectContainer) {
    this.editorService.selectObject(item);
  }

  deleteItem(item: GraphicObjectContainer, evt: MouseEvent) {
    this.editorService.tryToDeleteObject(item);
    evt.stopPropagation();
  }

  setAllDepths() {
    this.elements.forEach((element, index) => element.element.setDepth(index + 1));
  }

  get items(): GraphicObjectContainer[] {
    return this.editorService.sceneObjectsBank.items;
  }

  set items(value: GraphicObjectContainer[]) {
    this.editorService.sceneObjectsBank.items = value;
  }
}
