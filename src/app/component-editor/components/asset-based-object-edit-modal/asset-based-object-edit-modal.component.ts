import { Component, OnInit, Inject } from '@angular/core';
import { Assets } from '../../assets.class';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetBasedData } from '../../interfaces/assets-based-data.interface';
import { ComponentEditorService } from '../../component-editor.service';

@Component({
  selector: 'app-asset-based-object-edit-modal',
  templateUrl: './asset-based-object-edit-modal.component.html',
  styleUrls: ['./asset-based-object-edit-modal.component.scss']
})
export class AssetBasedObjectEditModalComponent implements OnInit {

  name = "";
  description = "";
  selectedAsset = "";

  constructor(
    private dialogRef: MatDialogRef<AssetBasedObjectEditModalComponent, AssetBasedData>,
    private editorService: ComponentEditorService,
    @Inject(MAT_DIALOG_DATA) public data: AssetBasedData
  ) { }

  ngOnInit() {
    if (this.data) {
      this.name = this.data.name;
      this.description = this.data.description;
      this.selectedAsset = this.data.asset;
    }
  }

  get images(): string[] {
    return Assets.images.concat(this.editorService.mainScene.images);
  }

  validate() {
    this.dialogRef.close({
      name: this.name,
      description: this.description,
      asset: this.selectedAsset
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
