import { Component, OnInit, Inject } from '@angular/core';
import { GraphicObjectState } from 'src/app/common/graphic/states/graphic-object-state.class';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SceneState } from 'src/app/common/graphic/states/scene-state.class';
import { EditSceneStateData } from '../../interfaces/edit-scene-state-data.interface';
import { ComponentEditorService } from '../../component-editor.service';

@Component({
  selector: 'app-edit-scene-state-modal',
  templateUrl: './edit-scene-state-modal.component.html',
  styleUrls: ['./edit-scene-state-modal.component.scss']
})
export class EditSceneStateModalComponent implements OnInit {

  usage: EditSceneStateData[] = [];

  constructor(
    private dialogRef: MatDialogRef<EditSceneStateModalComponent, EditSceneStateData[]>,
    private editorService: ComponentEditorService,
    @Inject(MAT_DIALOG_DATA) public sceneState: SceneState
  ) { }

  ngOnInit() {
    this.sceneState.states.forEach(objectState => {
      this.usage.push({
        objectState: objectState,
        used: true
      });
    });
  }

  getTargetName(state: GraphicObjectState): string {    
    let object = this.editorService.sceneObjectsBank.getItemById(state.targetObjectId);
    return object.name;
  }

  deleteState(item: EditSceneStateData) {
    let index = this.usage.indexOf(item);
    this.usage.splice(index, 1);
  }

  validate() {
    this.dialogRef.close(this.usage);
  }

  cancel() {
    this.dialogRef.close();
  }
}
