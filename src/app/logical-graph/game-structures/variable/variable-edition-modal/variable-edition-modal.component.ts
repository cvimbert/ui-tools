import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Variable } from '../variable.class';
import { GraphService } from 'src/app/logical-graph/graph.service';

@Component({
  selector: 'app-variable-edition-modal',
  templateUrl: './variable-edition-modal.component.html',
  styleUrls: ['./variable-edition-modal.component.scss']
})
export class VariableEditionModalComponent implements OnInit {

  type: string = "string";
  value: any;
  item: Variable;
  name: string = "";

  constructor(
    private graphService: GraphService,
    private dialogRef: MatDialogRef<VariableEditionModalComponent, Variable>,
    @Inject(MAT_DIALOG_DATA) data: Object
  ) {
    if (data["item"]) {
      this.item = data["item"];
      this.value = this.item.value;
      this.type = this.item.type;
      this.name = this.item.name;
    }
  }

  ngOnInit() {
    
  }

  validate() {

    if (!this.item) {
      this.item = this.graphService.variableItems.createItem({
        name: this.name,
        description: ""
      });
    } else {
      this.item.name = this.name;
    }
    
    this.item.type = this.type;
    this.item.value = this.value;

    this.dialogRef.close(this.item);
  }
}
