import { Component, OnInit, Input } from '@angular/core';
import { SceneState } from 'src/app/common/graphic/states/scene-state.class';
import { ComponentEditorService } from '../../component-editor.service';
import { MatDialog } from '@angular/material/dialog';
import { EditSceneStateModalComponent } from '../edit-scene-state-modal/edit-scene-state-modal.component';
import { EditSceneStateData } from '../../interfaces/edit-scene-state-data.interface';
import { GraphService } from 'src/app/logical-graph/graph.service';

@Component({
  selector: 'scene-state-displayer',
  templateUrl: './scene-state-displayer.component.html',
  styleUrls: ['./scene-state-displayer.component.scss']
})
export class SceneStateDisplayerComponent implements OnInit {

  @Input() state: SceneState;

  constructor(
    public editorService: ComponentEditorService,
    public graphService: GraphService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  applyState() {
    this.graphService.applySceneState(this.state);
  }

  deleteState() {
    this.editorService.deleteSceneState(this.state);
  }

  editState() {
    this.dialog.open(EditSceneStateModalComponent, {
      data: this.state
    }).afterClosed().subscribe((statesData: EditSceneStateData[]) => {
      if (statesData) {
        this.state.states = statesData.map(st => st.objectState);
      }
    });
  }
}
