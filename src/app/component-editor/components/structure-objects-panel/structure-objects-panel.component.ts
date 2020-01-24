import { Component, OnInit } from '@angular/core';
import { ComponentEditorService } from '../../component-editor.service';

@Component({
  selector: 'structure-objects-panel',
  templateUrl: './structure-objects-panel.component.html',
  styleUrls: ['./structure-objects-panel.component.scss']
})
export class StructureObjectsPanelComponent implements OnInit {

  selectedTabId = "scene-states";

  constructor(
    public editorService: ComponentEditorService
  ) { }

  ngOnInit() {
  }

}
