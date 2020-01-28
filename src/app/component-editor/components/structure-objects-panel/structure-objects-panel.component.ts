import { Component, OnInit } from '@angular/core';
import { ComponentEditorService } from '../../component-editor.service';
import { DataBank } from 'src/app/common/data/data-bank.class';

@Component({
  selector: 'structure-objects-panel',
  templateUrl: './structure-objects-panel.component.html',
  styleUrls: ['./structure-objects-panel.component.scss']
})
export class StructureObjectsPanelComponent implements OnInit {

  selectedTabId = "graph";
  providers: { [key: string]: DataBank<any> } = {};

  constructor(
    public editorService: ComponentEditorService
  ) { }

  ngOnInit() {
    this.providers = {
      transition: this.editorService.sceneTransitionsBank,
      sceneState: this.editorService.sceneStatesBank,
      sceneObject: this.editorService.sceneObjectsBank
    };
  }

}
