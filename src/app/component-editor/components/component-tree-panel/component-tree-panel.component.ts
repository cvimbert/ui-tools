import { Component, OnInit } from '@angular/core';
import { ComponentEditorService } from '../../component-editor.service';
import { DataProviderService } from '../../services/data-provider.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { GraphicObjectContainer } from 'src/app/common/graphic/graphic-object-container.class';
import { TreeElement } from 'src/app/common/data/interfaces/tree-element.interface';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'component-tree-panel',
  templateUrl: './component-tree-panel.component.html',
  styleUrls: ['./component-tree-panel.component.scss']
})
export class ComponentTreePanelComponent implements OnInit {

  hierarchy: TreeElement[] = [];

  constructor(
    public editorService: ComponentEditorService,
    public dataProvider: DataProviderService
  ) { }

  ngOnInit() {
    this.update();
  }


  // Doit y avoir plus judicieux comme algo que ce qui suit...

  getHierarchy(): TreeElement[] {
    let elements: TreeElement[] = [];
    let containersDic: { [key: string]: TreeElement } = {};

    // pas forcément une bonne idée !!

    this.editorService.sceneObjectsBank.items.filter((item: GraphicObjectContainer) => {
      return item.objectType === "nodalContainer";
    }).forEach((item: GraphicObjectContainer) => {
      containersDic[item.id] = {
        children: [],
        element: item,
        depth: 0
      };
    });

    this.editorService.sceneObjectsBank.items.forEach((item: GraphicObjectContainer) => {
      let element: TreeElement;

      if (item.objectType === "nodalContainer") {
        element = containersDic[item.id];
      } else {
        element = {
          element: item
        };
      }

      if (item.parentContainerId != "") {
        element.depth = containersDic[item.parentContainerId].depth + 1;
        containersDic[item.parentContainerId].children.push(element);
      } else {
        element.depth = 0;
        elements.push(element);
      }
    });
    
    console.log(elements);

    // applatissage de la liste

    let flatten: TreeElement[] = [];

    elements.forEach(element => flatten.push(...this.getFlatten(element)));

    console.log(flatten);
    
    
    return flatten;
  }

  getFlatten(element: TreeElement): TreeElement[] {
    let flatten: TreeElement[] = [];

    flatten.push({
      element: element.element,
      depth: element.depth
    });

    if (element.children) {
      element.children.forEach(sel => flatten.push({
        element: sel.element,
        depth: sel.depth
      }))
    };

    return flatten;
  }

  update() {
    this.hierarchy = this.getHierarchy();
  }

  get items(): GraphicObjectContainer[] {    
    return this.editorService.sceneObjectsBank.items;
  }

  set items(value: GraphicObjectContainer[]) {
    this.editorService.sceneObjectsBank.items = value;
  }




}
