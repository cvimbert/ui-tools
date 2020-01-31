import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SceneTransition } from 'src/app/common/graphic/transitions/scene-transition.class';
import { SceneState } from 'src/app/common/graphic/states/scene-state.class';
import { DataProviderService } from '../../services/data-provider.service';
import { Easings } from 'src/app/common/graphic/transitions/easings.class';

@Component({
  selector: 'app-scene-transition-edit-modal',
  templateUrl: './scene-transition-edit-modal.component.html',
  styleUrls: ['./scene-transition-edit-modal.component.scss']
})
export class SceneTransitionEditModalComponent implements OnInit {

  states: SceneState[];

  name = "";
  description = "";
  easing = "";
  target = "";
  duration = 0;

  constructor(
    private dialogRef: MatDialogRef<SceneTransitionEditModalComponent, SceneTransition>,
    private dataProvider: DataProviderService,
    @Inject(MAT_DIALOG_DATA) public transition: SceneTransition
  ) { }

  ngOnInit() {
    if (this.transition) {
      this.name = this.transition.name;
      this.description = this.transition.description;
      this.easing = this.transition.easing;
      this.target = this.transition.targetStateId;
      this.duration = this.transition.duration;
    }

    this.states = this.dataProvider.getBank("scene-states").items;
  }

  validate() {
    if (!this.transition) {
      this.transition = new SceneTransition();
    }

    this.transition.name = this.name;
    this.transition.description = this.description;
    this.transition.easing = this.easing;
    this.transition.targetStateId = this.target;
    this.transition.duration = this.duration;

    this.dialogRef.close(this.transition);
  }

  get easings(): string[] {
    return Easings.EASINGS;
  }

  cancel() {
    this.dialogRef.close();
  }

}
