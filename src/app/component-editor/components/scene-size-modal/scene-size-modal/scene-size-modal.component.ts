import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SceneSize } from '../scene-size.interface';

@Component({
  selector: 'app-scene-size-modal',
  templateUrl: './scene-size-modal.component.html',
  styleUrls: ['./scene-size-modal.component.scss']
})
export class SceneSizeModalComponent implements OnInit {

  width: number;
  height: number;

  constructor(
    private ref: MatDialogRef<SceneSizeModalComponent, SceneSize>,
    @Inject(MAT_DIALOG_DATA) public data: SceneSize
  ) { }

  ngOnInit() {
    this.width = this.data.width;
    this.height = this.data.height;
  }

  validate() {
    this.ref.close({
      width: this.width,
      height: this.height
    });
  }
}
