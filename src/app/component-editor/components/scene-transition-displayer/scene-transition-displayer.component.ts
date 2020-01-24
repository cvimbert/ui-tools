import { Component, OnInit, Input } from '@angular/core';
import { SceneTransition } from 'src/app/common/graphic/transitions/scene-transition.class';
import { ComponentEditorService } from '../../component-editor.service';
import { MatDialog } from '@angular/material/dialog';
import { SceneTransitionEditModalComponent } from '../scene-transition-edit-modal/scene-transition-edit-modal.component';

@Component({
  selector: 'scene-transition-displayer',
  templateUrl: './scene-transition-displayer.component.html',
  styleUrls: ['./scene-transition-displayer.component.scss']
})
export class SceneTransitionDisplayerComponent implements OnInit {

  @Input()
  transition: SceneTransition;

  constructor(
    private editorService: ComponentEditorService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  transitionTo() {
    // TODO
  }

  editTransition() {
    this.dialog.open(SceneTransitionEditModalComponent, {
      data: this.transition
    });
  }

  deleteTransition() {
    this.editorService.deleteSceneTransition(this.transition);
  }

}
