import { Component, OnInit } from '@angular/core';
import { Assets } from '../../assets.class';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-asset-based-object-edit-modal',
  templateUrl: './asset-based-object-edit-modal.component.html',
  styleUrls: ['./asset-based-object-edit-modal.component.scss']
})
export class AssetBasedObjectEditModalComponent implements OnInit {

  name: string;
  description: string;
  selectedAsset: string;

  constructor(
    private dialogRef: MatDialogRef<AssetBasedObjectEditModalComponent>
  ) { }

  ngOnInit() {
  }

  get images(): string[] {
    return Assets.images;
  }

  validate() {

  }

  cancel() {
    this.dialogRef.close();
  }

}
