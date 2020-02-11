import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EditorComponent } from '../../editor-component.class';
import { DataProviderService } from '../../services/data-provider.service';
import { ComponentReference } from 'src/app/common/graphic/components/component-reference.class';

@Component({
  selector: 'app-component-instance-edition-modal',
  templateUrl: './component-instance-edition-modal.component.html',
  styleUrls: ['./component-instance-edition-modal.component.scss']
})
export class ComponentInstanceEditionModalComponent implements OnInit {

  name = "";
  description = "";
  reference = "";

  constructor(
    private dialogRef: MatDialogRef<ComponentInstanceEditionModalComponent, ComponentReference>,
    private dataProvider: DataProviderService
  ) { }

  ngOnInit() {

  }

  get components(): EditorComponent[] {
    return this.dataProvider.getBank("components").items;
  }

  cancel() {
    this.dialogRef.close();
  }

  validate() {
    let item = this.createInstance();
    this.dialogRef.close(item);
  }

  createInstance(): ComponentReference {
    let item = new ComponentReference();
    item.componentId = this.reference;
        
    this.dataProvider.getBank("scene-objects").pushAfterCreation(item, {
      name: this.name,
      description: this.description,
      type: "componentReference"
    });

    return item;
  }

}
