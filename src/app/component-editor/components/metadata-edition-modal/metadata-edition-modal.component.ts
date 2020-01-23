import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseData } from 'src/app/common/data/interfaces/base-data.interface';

@Component({
  selector: 'app-metadata-edition-modal',
  templateUrl: './metadata-edition-modal.component.html',
  styleUrls: ['./metadata-edition-modal.component.scss']
})
export class MetadataEditionModalComponent implements OnInit {

  name = "";
  description = ""; 

  constructor(
    private dialogRef: MatDialogRef<MetadataEditionModalComponent, BaseData>,
    @Inject(MAT_DIALOG_DATA) public data: BaseData,
  ) { }

  ngOnInit() {
    if (this.data) {
      this.name = this.data.name;
      this.description = this.data.description;
    }
  }

  validate() {
    this.dialogRef.close({
      name: this.name,
      description: this.description
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
