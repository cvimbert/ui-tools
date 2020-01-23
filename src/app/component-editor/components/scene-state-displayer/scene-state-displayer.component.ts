import { Component, OnInit, Input } from '@angular/core';
import { SceneState } from 'src/app/common/graphic/states/scene-state.class';
import { ComponentEditorService } from '../../component-editor.service';

@Component({
  selector: 'scene-state-displayer',
  templateUrl: './scene-state-displayer.component.html',
  styleUrls: ['./scene-state-displayer.component.scss']
})
export class SceneStateDisplayerComponent implements OnInit {

  @Input() state: SceneState;

  constructor(
    public editorService: ComponentEditorService
  ) { }

  ngOnInit() {
  }

  applyState() {
    this.editorService.applySceneState(this.state);
  }
}
